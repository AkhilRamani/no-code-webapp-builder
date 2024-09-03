import { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { UserRepository } from "@/lib/server/appDb/repositories/user.repository"

export const authConfig: NextAuthOptions = {
  // adapter: MongoDBAdapter(mongoClient),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        // const user = await authConfig.adapter?.getUser(credentials.email)
        const user = await UserRepository.findByEmail(credentials.email)

        console.log('=====', user)

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password as string, user.password)

        if (!isPasswordValid) {
          return null
        }

        return user as unknown as User;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.isVerified = user.isVerified;
        token.lastName = user.lastName;
        token.firstName = user.firstName;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.isVerified = token.isVerified
      }
      return session
    }
  },
  pages: {
    signIn: "/signin"
  }
}