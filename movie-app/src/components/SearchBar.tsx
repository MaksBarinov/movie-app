import { useEffect, useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => onSearch(query), 500)
    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <input
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={e => setQuery(e.target.value)}
      className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
  )
}

export default SearchBar
