const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:3000' : 'https://imdb-git-dev-ennn997.vercel.app/'
