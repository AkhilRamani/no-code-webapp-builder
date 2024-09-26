'use client'

import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'nextjs-toploader/app';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GemIcon, Loader2 } from 'lucide-react';

export function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            console.error(result.error)
            setIsLoading(false)
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='grid gap-2'>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <Button type="submit" disabled={isLoading} className='tracking-wide'>
                    {isLoading ?
                        <Loader2 className="h-5 w-5 animate-spin stroke-[2.5]" />
                        :
                        'Sign In'
                    }
                </Button>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <GemIcon className="mr-2 h-4 w-4" />
                )}{" "}
                GitHub
            </Button>
        </>
    )
}