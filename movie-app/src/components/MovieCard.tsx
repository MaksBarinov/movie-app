import { memo } from 'react'

import { Link } from 'react-router-dom'

interface MovieCardProps {
  imdbID: string
  Title: string // С большой буквы (как в OMDB)
  Year: string
  Poster: string
}

export const MovieCard = ({ imdbID, Title, Year, Poster }: MovieCardProps) => (
  <Link to={`/movie/${imdbID}`}>
    <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
      <img
        src={
          Poster !== 'N/A'
            ? Poster
            : 'https://via.placeholder.com/300x450?text=No+Poster'
        }
        alt={Title}
        className='w-full h-64 object-cover'
      />
      <div className='p-4'>
        <h3 className='font-bold text-lg truncate text-gray-500'>{Title}</h3>
        <p className='text-gray-600'>{Year}</p>
      </div>
    </div>
  </Link>
)

export default memo(MovieCard)
