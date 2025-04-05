import { Link, useParams } from 'react-router-dom'
import { useGetMovieByIdQuery } from '../store/moviesApi'

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, error } = useGetMovieByIdQuery(id || '')

  if (isLoading) return <div className='text-center py-8'>Загрузка...</div>
  if (error) return <div className='text-center py-8'>Ошибка загрузки</div>
  if (!movie) return <div className='text-center py-8'>Фильм не найден</div>

  return (
    <div className='container mx-auto px-4 py-8'>
      <Link to='/' className='inline-block mb-4 text-blue-600 hover:underline'>
        ← Назад
      </Link>
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex flex-col md:flex-row gap-6'>
          <img
            src={
              movie.Poster !== 'N/A'
                ? movie.Poster
                : 'https://via.placeholder.com/300x450?text=No+Poster'
            }
            alt={movie.Title}
            className='w-full md:w-1/3 rounded'
          />
          <div className='text-gray-800'>
            {' '}
            {/* Добавлен класс text-gray-800 */}
            <h1 className='text-3xl font-bold text-gray-900'>
              {' '}
              {/* Темный цвет для заголовка */}
              {movie.Title} ({movie.Year})
            </h1>
            {movie.imdbRating && (
              <p className='text-gray-700 mt-2'>IMDb: {movie.imdbRating}/10</p>
            )}
            {movie.Runtime && (
              <p className='mt-2 text-gray-700'>
                Длительность: {movie.Runtime}
              </p>
            )}
            {movie.Genre && (
              <p className='mt-2 text-gray-700'>Жанр: {movie.Genre}</p>
            )}
            {movie.Director && (
              <p className='mt-2 text-gray-700'>Режиссер: {movie.Director}</p>
            )}
            {movie.Actors && (
              <p className='mt-2 text-gray-700'>Актеры: {movie.Actors}</p>
            )}
            {movie.Plot && (
              <div className='mt-4'>
                <h2 className='text-xl font-semibold text-gray-900'>
                  Описание
                </h2>
                <p className='text-gray-700'>{movie.Plot}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
