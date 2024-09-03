"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GemIcon, Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupFormSchema } from "@/lib/validationDef/signupDefinitions"
import { z } from "zod"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const form = useForm({
		resolver: zodResolver(SignupFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	});

	const router = useRouter();

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = async (data: z.infer<typeof SignupFormSchema>) => {
		setIsLoading(true);

		try {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (response.ok) {
				router.push('/signin')
			} else {
				const data = await response.json()
				console.error('Registration failed:', data.error)
			}
		} catch (error) {
			console.error('An error occurred:', error)
		}
		finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form} >
			<div className={cn("grid gap-6", className)} {...props}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<div className="grid gap-2">
						<div className="flex gap-2">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="First name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="Last name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Email" autoComplete="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>


						{/* <Input
							id="name"
							placeholder="Name"
							type="text"
							autoCapitalize="none"
							autoComplete="name"
							autoCorrect="off"
							disabled={isLoading}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							id="password"
							placeholder="Password"
							type="password"
							autoCapitalize="none"
							disabled={isLoading}
							onChange={(e) => setPassword(e.target.value)}
						/> */}
						<Button disabled={isLoading}>
							{isLoading && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Sign Up with Email
						</Button>
					</div>
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
			</div>
		</Form>
	)
}