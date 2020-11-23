import { Router } from 'express';
import fs from 'fs';
import movies from './data/data.json';

export const router = Router();

router.get('/', (_req, res) => {
    res.send(movies.Search);
});

// http://localhost:3000/search?type=${searchType}&request=${request}
router.get('/search', (req, res) => {
    const { request, type } = req.query;

    res.send(movies.Search.filter(
        (movie) => movie.Title.toLowerCase().search((request as string)?.toLowerCase()) !== -1 && // npm query-string
        // (movie) => movie.Title.toLowerCase().includes((request as string).toLowerCase()) &&
                   movie.Type === type));
});

router.get('/movie/:movieId', (req, res) => {
    const { movieId } = req.params;

    res.send(movies.Search.find((movie) => movie.imdbID === movieId));
});

router.post('/add-movie', (req, res) => {
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
