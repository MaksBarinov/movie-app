import { FilmIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm'>
      <div className='container mx-auto px-4 py-3'>
        <nav className='flex items-center justify-between'>
          <Link
            to='/'
            className='flex items-center space-x-2 text-gray-800 hover:text-blue-400 transition-colors'
          >
            <FilmIcon className='w-6 h-6 text-blue-400' />
            <span className='font-serif font-bold text-xl'>MovieHub</span>
          </Link>

          <div className='flex space-x-6'>
            <Link
              to='/'
              className='flex items-center space-x-1 text-gray-600 hover:text-blue-400 transition-colors'
            >
              <HomeIcon className='w-5 h-5' />
              <span>Главная</span>
            </Link>
            <Link
              to='/search'
              className='flex items-center space-x-1 text-gray-600 hover:text-blue-400 transition-colors'
            >
              <span>Поиск</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
