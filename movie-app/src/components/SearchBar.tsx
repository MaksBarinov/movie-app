import { debounce } from 'lodash'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  // Создаем мемоизированную debounce-функцию
  const debouncedSearch = useMemo(
    () =>
      debounce((searchQuery: string) => {
        onSearch(searchQuery)
      }, 500),
    [onSearch] // Зависимости для пересоздания debounce
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      debouncedSearch(e.target.value)
    },
    [debouncedSearch] // debouncedSearch не меняется благодаря useMemo
  )

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <input
      type='text'
      placeholder='Поиск фильмов...'
      value={query}
      onChange={handleChange}
      className='w-full p-2 border border-gray-300 rounded mb-6'
    />
  )
}

export default memo(SearchBar)
