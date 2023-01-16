import prisma from '../../lib/prisma'

export default async function (req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query
    const movieId = Number(id)

    const { title } = req.body

    try {
      const updateMovieTitle = await prisma.movie.update({ where: { id: movieId }, data: { title } })
      res.status(200).json(updateMovieTitle)
    } catch (error) {
      res.status(500).json({ error: 'Error' })
    }
  } else {
    res.status(404)
  }
}
