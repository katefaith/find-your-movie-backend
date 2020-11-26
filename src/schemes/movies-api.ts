import Joi from 'joi';

export const getMoviesSchema = Joi.object({
    request: Joi.string().required(),
    type: Joi.string().required()
});

export const getMovieSchema = Joi.object({
    movieId: Joi.string().required()
});

export const postMovieSchema = Joi.object({
    Type: Joi.string()
        .required(),
    Title: Joi.string()
        .min(2)
        .max(50)
        .required(),
    Poster: Joi.string()
        .uri()
        .required(),
    imdbID: Joi.string()
        .min(3)
        .max(10)
        .required(),
    Genre: Joi.string()
        .min(3)
        .max(50)
        .allow(''),
    Year: Joi.string()
        .regex(/^[0-9]+$/, 'numbers')
        .min(4)
        .max(4)
        .allow(''),
    Runtime: Joi.string()
        .min(3)
        .max(20)
        .allow(''),
    Plot: Joi.string()
        .min(10)
        .max(200)
        .allow(''),
    Director: Joi.string()
        .min(3)
        .max(30)
        .allow(''),
    Actors: Joi.string()
        .min(4)
        .max(200)
        .allow('')
});
