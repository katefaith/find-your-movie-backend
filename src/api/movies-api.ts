import {
    Router, Response, Request
} from 'express';
import {
    createValidator, ValidatedRequest
} from 'express-joi-validation';
import fs from 'fs';
import { MoviesApi } from 'src/types/movies-api';
import * as schemes from '../schemes/movies-api';

import movies from '../data/data.json';

export const router = Router();
const validator = createValidator();

router.get('/', (_req: Request, res: Response) => {
    res.send(movies.Search);
});

router.get(
    '/search',
    validator.query(schemes.getMoviesSchema),
    (req: ValidatedRequest<MoviesApi.GetMoviesSchema>, res: Response) => {
        const { request, type } = req.query;

        res.send(movies.Search.filter(
            (movie) => (movie.Title.toLowerCase().includes((request as string).toLowerCase()) &&
                    movie.Type === type)));

    });

router.get(
    '/movie/:movieId',
    validator.params(schemes.getMovieSchema),
    (req: ValidatedRequest<MoviesApi.GetMovieSchema>, res: Response) => {
        const { movieId } = req.params;

        res.send(movies.Search.find((movie) => movie.imdbID === movieId));
    });

router.post(
    '/add-movie',
    validator.body(schemes.postMovieSchema),
    (req: ValidatedRequest<MoviesApi.PostMovieSchema>, res: Response) => {
        if (movies.Search.find((movie) => movie.imdbID === req.body.imdbID)) {
            res.status(200).send({
                text: `Movie with imdbID ${req.body.imdbID} already exists!`,
                status: 'error'
            });
        } else {
            movies.Search.push(req.body);
            const json = {
                Search: movies.Search
            };

            fs.writeFile('src/data/data.json', JSON.stringify(json, null, 2), (error) => {
                if (error) {
                    throw error;
                }
            });

            res.status(200).send({
                text: `Movie '${req.body.Title}' added!`,
                status: 'success'
            });
        }
    });
