import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiSearchResponse, Movie } from '../types/movie'

const API_KEY = '41710fef'; // Замените на реальный ключ
const BASE_URL = 'https://www.omdbapi.com/';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchMovies: builder.query<ApiSearchResponse, string>({
      query: (query) => `?apikey=${API_KEY}&s=${query}`,
    }),
    getMovieById: builder.query<Movie, string>({
      query: (id) => `?apikey=${API_KEY}&i=${id}`,
    }),
		getPopularMovies: builder.query<ApiSearchResponse, void>({
			query: () => `?apikey=${API_KEY}&s=action&type=movie&page=1`,
		}),
  }),
});

// Добавьте в экспорт:
export const { 
  useSearchMoviesQuery, 
  useGetMovieByIdQuery,
  useGetPopularMoviesQuery // Добавьте эту строку
} = moviesApi;