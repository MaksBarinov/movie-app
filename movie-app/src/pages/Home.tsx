import { MovieCard } from '../components/MovieCard'
import { useGetPopularMoviesQuery } from '../store/moviesApi'

export const Home = () => {
  const { data, isLoading } = useGetPopularMoviesQuery()

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Популярные фильмы</h1>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data?.Search?.map(movie => (
            <MovieCard key={movie.imdbID} {...movie} />
          ))}
        </div>
      )}
    </div>
  )
}
