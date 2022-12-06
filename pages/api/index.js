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
    try {
      const movies = await prisma.movie.findMany()
      res.status(200).json(movies)
    } catch (error) {
      res.status(500).json({ error: 'Oops, something went wrong! ' })
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
