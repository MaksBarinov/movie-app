import { useState } from 'react'
import { useSearchMoviesQuery } from '../store/moviesApi'
// Стало
import { MovieCard } from '../components/MovieCard' // Убедитесь, что экспорт default
import { SearchBar } from '../components/SearchBar' // Убедитесь, что экспорт default

export const Search = () => {
  const [query, setQuery] = useState('')
  const { data, isLoading, error } = useSearchMoviesQuery(query, {
    skip: query.length < 3, // Не делать запрос при коротком запросе
  })

  return (
    <div className='container mx-auto px-4 py-8'>
      <SearchBar onSearch={setQuery} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.toString()}</p>}
      {data?.Search && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6'>
          {data.Search.map(movie => (
            <MovieCard key={movie.imdbID} {...movie} />
          ))}
        </div>
      )}
    </div>
  )
}
