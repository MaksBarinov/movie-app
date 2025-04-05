// components/Header.tsx
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='bg-blue-600 text-white p-4 shadow-md'>
      <nav className='container mx-auto flex gap-4'>
        <Link to='/' className='hover:underline'>
          Главная
        </Link>
        <Link to='/search' className='hover:underline'>
          Поиск
        </Link>
      </nav>
    </header>
  )
}
