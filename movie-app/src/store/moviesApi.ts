import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiSearchResponse, Movie } from '../types/movie'

const API_KEY = '41710fef'; // Замените на реальный ключ
const BASE_URL = 'https://www.omdbapi.com/';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchMovies: builder.query<ApiSearchResponse, { query: string; page: number }>({
      query: ({ query, page }) => `?apikey=${API_KEY}&s=${query}&page=${page}`,
    }),
    getMovieById: builder.query<Movie, string>({
      query: (id) => `?apikey=${API_KEY}&i=${id}`,
    }),
		// В endpoints добавьте:
  getPopularMovies: builder.query<ApiSearchResponse, number>({
  query: (page) => `?apikey=${API_KEY}&s=movie&type=movie&page=${page}`,
}),
  }),
});

// Добавьте в экспорт:
export const { 
  useSearchMoviesQuery, 
  useGetMovieByIdQuery,
  useGetPopularMoviesQuery // Добавьте эту строку
} = moviesApi;