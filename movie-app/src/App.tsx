import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'

// Ленивая загрузка страниц
const Home = lazy(() => import('./pages/Home'))
const Search = lazy(() => import('./pages/Search'))
const MovieDetails = lazy(() => import('./pages/MovieDetails'))

// Компонент для отображения во время загрузки
const LoadingSpinner = () => (
  <div className='flex justify-center items-center h-screen'>
    <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500'></div>
  </div>
)

export const App = () => (
  <BrowserRouter>
    <Header />
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)
