import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { useSearchMoviesQuery } from '../store/moviesApi'
import type { Movie } from '../types/movie'

const Search = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [allMovies, setAllMovies] = useState<Movie[]>([])

  const { data, isLoading, isFetching, error } = useSearchMoviesQuery(
    { query, page },
    { skip: !query.trim() }
  )

  useEffect(() => {
    // Сброс при новом поиске
    if (page === 1) {
      setAllMovies([])
    }
  }, [query, page])

  useEffect(() => {
    // Добавляем новые фильмы к существующим
    if (data?.Search) {
      setAllMovies(prev => [...prev, ...data.Search])
    }
  }, [data])

  const loadMore = () => {
    if (!isFetching) {
      setPage(prev => prev + 1)
    }
  }

  const errorMessage = error
    ? 'status' in error
      ? (error.data as { Error?: string })?.Error || 'Ошибка при загрузке'
      : error.message || 'Неизвестная ошибка'
    : ''

  return (
    <div className='container mx-auto px-4 py-8'>
      <input
        type='text'
        placeholder='Поиск фильмов...'
        value={query}
        onChange={e => {
          setQuery(e.target.value)
          setPage(1)
        }}
        className='w-full p-2 border border-gray-300 rounded mb-6'
      />

      {isLoading && <div className='text-center py-8'>Загрузка...</div>}

      {error && (
        <div className='text-center py-8 text-red-500'>{errorMessage}</div>
      )}

      {allMovies.length > 0 && (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {allMovies.map((movie, index) => (
              <MovieCard
                key={`${movie.imdbID}-${index}`}
                imdbID={movie.imdbID}
                Title={movie.Title}
                Year={movie.Year}
                Poster={movie.Poster}
              />
            ))}
          </div>

          {data?.totalResults &&
            allMovies.length < parseInt(data.totalResults) && (
              <div className='text-center mt-8'>
                <button
                  onClick={loadMore}
                  disabled={isFetching}
                  className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400'
                >
                  {isFetching ? 'Загрузка...' : 'Показать ещё'}
                </button>
                <p className='text-gray-500 mt-2'>
                  Показано {allMovies.length} из {data.totalResults} результатов
                </p>
              </div>
            )}
        </>
      )}

      {!isLoading && !error && query && allMovies.length === 0 && (
        <div className='text-center py-8 text-gray-500'>
          Ничего не найдено. Попробуйте другой запрос.
        </div>
      )}
    </div>
  )
}
export default Search
