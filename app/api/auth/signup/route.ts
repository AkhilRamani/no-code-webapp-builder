import { NextResponse } from 'next/server'
import { createUserController } from '@/lib/server/controllers/user/createUser.controller'

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, password } = await request.json()

        const res = await createUserController({ firstName, lastName, email, password })

        return NextResponse.json({ message: 'User created successfully', userId: res.userId })
    } catch (error) {
        console.error('Registration error:', error)
        if (error instanceof Error && 'code' in error) {
            const statusCode = (error as { code: number }).code
            return NextResponse.json({ error: error.message }, { status: statusCode })
        } else {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}