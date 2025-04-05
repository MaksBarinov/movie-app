import { ArrowLeftIcon, FilmIcon } from '@heroicons/react/24/outline'
import { Link, useParams } from 'react-router-dom'
import { useGetMovieByIdQuery } from '../store/moviesApi'

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, error } = useGetMovieByIdQuery(id || '')

  if (isLoading)
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Загрузка фильма...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center max-w-md p-6 bg-white rounded-xl shadow'>
          <div className='text-red-500 font-medium mb-4'>Ошибка загрузки</div>
          <Link
            to='/'
            className='inline-flex items-center text-blue-500 hover:text-blue-700'
          >
            <ArrowLeftIcon className='w-5 h-5 mr-1' />
            Вернуться на главную
          </Link>
        </div>
      </div>
    )

  if (!movie)
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center max-w-md p-6 bg-white rounded-xl shadow'>
          <FilmIcon className='w-10 h-10 text-gray-400 mx-auto mb-4' />
          <div className='text-gray-600 mb-4'>Фильм не найден</div>
          <Link
            to='/'
            className='inline-flex items-center text-blue-500 hover:text-blue-700'
          >
            <ArrowLeftIcon className='w-5 h-5 mr-1' />
            Вернуться на главную
          </Link>
        </div>
      </div>
    )

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <Link
          to='/'
          className='inline-flex items-center text-blue-500 hover:text-blue-700 mb-6'
        >
          <ArrowLeftIcon className='w-5 h-5 mr-1' />
          Назад
        </Link>

        <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
          <div className='md:flex'>
            {/* Постер */}
            <div className='md:w-1/3 bg-gray-100 flex items-center justify-center p-6'>
              <img
                src={
                  movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/300x450?text=No+Poster'
                }
                alt={movie.Title}
                className='w-full h-auto max-h-[500px] object-contain rounded-lg'
              />
            </div>

            {/* Информация */}
            <div className='md:w-2/3 p-6'>
              <h1 className='font-serif font-bold text-3xl text-gray-900 mb-2'>
                {movie.Title}{' '}
                <span className='text-gray-500'>({movie.Year})</span>
              </h1>

              <div className='space-y-5 mt-6'>
                {movie.imdbRating && (
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      Рейтинг IMDb
                    </h3>
                    <p className='text-gray-700'>{movie.imdbRating}/10</p>
                  </div>
                )}

                {movie.Runtime && (
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      Длительность
                    </h3>
                    <p className='text-gray-700'>{movie.Runtime}</p>
                  </div>
                )}

                {movie.Genre && (
                  <div>
                    <h3 className='font-semibold text-gray-800'>Жанр</h3>
                    <p className='text-gray-700'>{movie.Genre}</p>
                  </div>
                )}

                {movie.Director && (
                  <div>
                    <h3 className='font-semibold text-gray-800'>Режиссер</h3>
                    <p className='text-gray-700'>{movie.Director}</p>
                  </div>
                )}

                {movie.Actors && (
                  <div>
                    <h3 className='font-semibold text-gray-800'>Актеры</h3>
                    <p className='text-gray-700'>{movie.Actors}</p>
                  </div>
                )}

                {movie.Plot && (
                  <div>
                    <h3 className='font-semibold text-gray-800'>Описание</h3>
                    <p className='text-gray-700'>{movie.Plot}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
