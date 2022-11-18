import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const movies = await prisma.movie.findMany()
      res.status(200).json(movies)
    } catch (error) {
      res.status(500).json({ error: 'Oops, something went wrong! ' })
    }
  } else if (req.method === 'POST') {
    const { title, ratings, year, director, starring } = req.body
    try {
      const movie = await prisma.movie.create({
        data: { title, ratings, year, director, starring },
      })
      res.status(200).json(movie)
    } catch (error) {
      res.status(500).json({ error: 'Error' })
    }
  } else {
    res.status(404)
  }
}
