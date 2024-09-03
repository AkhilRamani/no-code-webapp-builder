import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

export default async function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerSession()
    if (!session) {
        redirect("/signin")
    }

    return <>
        {children}
    </>
}