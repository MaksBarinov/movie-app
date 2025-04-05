import { memo } from 'react'
import { Link } from 'react-router-dom'

interface MovieCardProps {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

const MovieCard = ({ imdbID, Title, Year, Poster }: MovieCardProps) => (
  <Link to={`/movie/${imdbID}`}>
    <div
      className='
      bg-white
      rounded-2xl
      shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)]
      hover:shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.9)]
      transition-all
      duration-300
      hover:-translate-y-1
      overflow-hidden
      group
    '
    >
      <div className='relative'>
        <img
          src={
            Poster !== 'N/A'
              ? Poster
              : 'https://via.placeholder.com/300x450?text=No+Poster'
          }
          alt={Title}
          className='w-full h-64 object-cover group-hover:opacity-90 transition-opacity'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
      </div>
      <div className='p-4'>
        <h3 className='font-serif font-semibold text-lg text-gray-800 truncate'>
          {Title}
        </h3>
        <p className='text-gray-500'>{Year}</p>
      </div>
    </div>
  </Link>
)

export default memo(MovieCard)
