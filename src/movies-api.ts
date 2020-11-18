import { Router } from 'express';

import movies from './data/data.json';

export const router = Router();

router.get('/', (_req, res) => {
    res.send(movies.Search);
});

// http://localhost:3000/search?type=${searchType}&request=${request}
router.get('/search', (req, res) => {
    const { request, type } = req.query;

    res.send(movies.Search.filter(
        (movie) => movie.Title.toLowerCase().includes((request as string).toLowerCase()) &&
                   movie.Type === type));
});

router.get('/movie/:movieId', (req, res) => {
    const { movieId } = req.params;

    res.send(movies.Search.find((movie) => movie.imdbID === movieId));
});
