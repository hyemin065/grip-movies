import Search from 'pages/Search'
import { Routes, Route } from 'react-router-dom'
import MoviesApp from './_shared/MoviesApp'

const Router = () => {
  return (
    <MoviesApp>
      <Routes>
        <Route path='/' element={<Search />} />
      </Routes>
    </MoviesApp>
  )
}

export default Router
