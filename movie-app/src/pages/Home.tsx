import { useEffect, useMemo, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { useGetPopularMoviesQuery } from '../store/moviesApi'
import type { Movie } from '../types/movie'

const Home = () => {
  const [page, setPage] = useState(1)
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const { data, isLoading, error, isFetching } = useGetPopularMoviesQuery(page)

  // Сохраняем все загруженные фильмы
  useEffect(() => {
    if (data?.Search) {
      setAllMovies(prev => {
        // Убираем дубликаты
        const newMovies = data.Search.filter(
          newMovie => !prev.some(movie => movie.imdbID === newMovie.imdbID)
        )
        return [...prev, ...newMovies]
      })
    }
  }, [data])

  // Фильм дня (на основе даты)
  const dailyMovie = useMemo(() => {
    if (allMovies.length === 0) return null

    const today = new Date().toDateString()
    const storedMovie = localStorage.getItem('dailyMovie')
    const storedDate = localStorage.getItem('dailyMovieDate')

    if (storedMovie && storedDate === today) {
      return JSON.parse(storedMovie) as Movie
    }

    const seed = today
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const movie = allMovies[seed % allMovies.length]

    localStorage.setItem('dailyMovie', JSON.stringify(movie))
    localStorage.setItem('dailyMovieDate', today)
    return movie
  }, [allMovies])

  const loadMore = () => {
    if (!isFetching) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Фильм дня */}
        {dailyMovie && (
          <div className='mb-12 bg-white p-6 rounded-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.05)]'>
            <div className='flex flex-col md:flex-row gap-6 items-center'>
              <div className='md:w-1/3'>
                <MovieCard
                  imdbID={dailyMovie.imdbID}
                  Title={dailyMovie.Title}
                  Year={dailyMovie.Year}
                  Poster={dailyMovie.Poster}
                />
              </div>
              <div className='md:w-2/3'>
                <h2 className='font-serif font-bold text-2xl text-gray-800 mb-2'>
                  Фильм дня: {dailyMovie.Title}
                </h2>
                <p className='text-gray-500 mb-4'>{dailyMovie.Year}</p>
                {dailyMovie.Plot && (
                  <p className='text-gray-700'>{dailyMovie.Plot}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Популярные фильмы */}
        <div className='flex justify-between items-center mb-6'>
          <h1 className='font-serif font-bold text-3xl text-gray-800'>
            Популярные фильмы
          </h1>
          {data?.totalResults && (
            <p className='text-gray-500'>Всего: {data.totalResults}</p>
          )}
        </div>

        {isLoading && page === 1 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className='bg-white rounded-2xl p-4 shadow animate-pulse h-80'
              />
            ))}
          </div>
        ) : error ? (
          <div className='text-center py-12'>
            <div className='text-red-500 text-lg mb-4'>Ошибка загрузки</div>
            <button
              onClick={() => window.location.reload()}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Попробовать снова
            </button>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {allMovies.map(movie => (
                <MovieCard
                  key={movie.imdbID}
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
                    className='px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-400 transition-colors'
                  >
                    {isFetching ? (
                      <span className='flex items-center justify-center'>
                        <svg
                          className='animate-spin h-5 w-5 mr-2'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Загрузка...
                      </span>
                    ) : (
                      'Показать ещё'
                    )}
                  </button>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home
