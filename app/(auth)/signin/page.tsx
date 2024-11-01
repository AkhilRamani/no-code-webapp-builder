import Link from "next/link"
import { SignInForm } from "./signinForm"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthenticationPage() {
    const session = await getServerSession();

    if (session) {
        redirect("/dashboard");
    }

    return (
        <>
            <div className="container relative h-full flex-col items-center justify-center grid max-w-none md:grid-cols-2 px-0">
                <Link
                    href="/signup"
                    className="absolute right-4 top-4 md:right-8 md:top-8 hover:bg-secondary py-2 px-4 rounded-lg text-sm font-semibold tracking-wide bg-slate-50"
                >
                    Sign up
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r md:flex">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-sky-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Portals
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Building internal tools and web apps has never been easier. I can now create powerful yet beautiful business apps in minutes, without any tech knowledge. It&rsquo;s a must-have tool for any business.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="md:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Signin to your account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your credentials to login your account
                            </p>
                        </div>
                        <SignInForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}