const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:3000' : 'https://imdb-7g6ik2j0y-ennn997.vercel.app'
