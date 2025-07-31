import { NextResponse } from 'next/server'
import { users } from '@data/page.js'
async function authenticateUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password)
    return user
}

export async function POST(request) {
    try {
        const { email, password } = await request.json()
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
        }
        const user = await authenticateUser(email, password)
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
        }
        return NextResponse.json({
            success: true,
            message: 'Login successful!',
            user: { email: user.email }
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
    }
}
