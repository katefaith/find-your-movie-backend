import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export namespace MoviesApi {
    export interface GetMoviesSchema extends ValidatedRequestSchema {
        [ContainerTypes.Query]: {
            request: string;
            type: string;
        };
    }

    export interface GetMovieSchema extends ValidatedRequestSchema {
        [ContainerTypes.Params]: {
            movieId: string;
        };
    }

    export interface PostMovieSchema extends ValidatedRequestSchema {
        [ContainerTypes.Body]: {
            Type: string;
            Title: string;
            Poster: string;
            imdbID: string;
            Genre: string;
            Year: string;
            Runtime: string;
            Plot: string;
            Director: string;
            Actors: string;
        };
    }
}
