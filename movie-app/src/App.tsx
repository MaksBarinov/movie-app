import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { MovieDetails } from './pages/MovieDetails'
import { Search } from './pages/Search'

export const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/movie/:id' element={<MovieDetails />} />
    </Routes>
  </BrowserRouter>
)
