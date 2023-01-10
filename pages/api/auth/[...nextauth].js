import nextAuth from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        password: { type: 'password', label: 'Password' },
      },
      async authorize(credentials, req) {
        const admin = { name: process.env.ADMIN_NAME, password: process.env.ADMIN_PASSWORD }

        if (admin) {
          return admin
        } else {
          return null
        }
      },
      secret: process.env.NEXTAUTH_SECRET,
      jwt: {
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60 * 24 * 30,
        async encode() {},
        async decode() {},
      },
    }),
  ],
}

export default nextAuth(authOptions)
