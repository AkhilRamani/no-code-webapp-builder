import { UserRepository } from "@/lib/server/repositories/user.repository";
import { UserRecord } from "@/types/db/user.types";
import { BadRequestException } from "../exceptions/badRequest.exception";
import { hash } from "bcryptjs";

export const createUserController = async (userData: Pick<UserRecord, 'firstName' | 'lastName' | 'email' | 'password'>) => {
    const { firstName, lastName, email, password } = userData

    const existingUser = await UserRepository.findByEmail(email)
    if (existingUser) {
        throw new BadRequestException('User already exists')
        // return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)

    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        // verifyCode,
        // verifyCodeExpiry: expiryDate,
        isVerified: true,   // TODO:
        // isAcceptingMessages: true,
        // messages: [],
    } as UserRecord

    const recordId = await UserRepository.create(newUser)

    return {
        userId: recordId,
    }
}