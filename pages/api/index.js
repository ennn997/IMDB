import prisma from '../../lib/prisma'

const Joi = require('joi')

const movieSchema = Joi.object().keys({
  title: Joi.string().required(),
  ratings: Joi.number().min(0).max(10).precision(1).required(),
  year: Joi.number().integer().positive().max(2022).required(),
  director: Joi.string().required(),
  starring: Joi.string().required(),
})

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { start, size, globalFilter, rating, year } = req.query

    try {
      let movies = await prisma.movie.findMany()

      if (globalFilter) {
        movies = movies.filter(
          (row) =>
            row.title?.toString()?.toLowerCase()?.includes?.(globalFilter.toLowerCase()) ||
            row.director?.toString()?.toLowerCase()?.includes?.(globalFilter.toLowerCase()) ||
            row.starring?.toString()?.toLowerCase()?.includes?.(globalFilter.toLowerCase())
        )
      }

      if (rating) {
        movies = movies.filter((row) => row.ratings >= rating && row.ratings <= rating + 1)
      }

      if (year) {
        movies = movies.filter((row) => row.year >= year.slice(0, 4) && row.year <= year.slice(5))
      }

      res.status(200).json(movies.slice(parseInt(start), parseInt(start) + parseInt(size)) ?? [])
    } catch (error) {
      res.status(500).json({ error: 'Oops, something went wrong!' })
    }
  } else if (req.method === 'POST') {
    const { error, value } = movieSchema.validate(req.body)
    try {
      if (error) {
        res.status(400).json({ error: 'All fields must be filled out' })
      } else {
        const movie = await prisma.movie.create({
          data: {
            title: value.title,
            ratings: value.ratings,
            year: value.year,
            director: value.director,
            starring: value.starring,
          },
        })
        res.status(200).json(movie)
      }
    } catch (error) {
      res.status(500).json({ error: 'Error' })
    }
  } else {
    res.status(404)
  }
}
