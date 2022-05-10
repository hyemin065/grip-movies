import axios from 'axios'
import { IMovies } from 'types/search'

const MOVIES_BASE_URL = 'http://www.omdbapi.com/'

export const getMoviesApi = (title: string, page: number) =>
  axios.get<IMovies>(`${MOVIES_BASE_URL}/?apikey=${process.env.REACT_APP_MOVIES_APP_KEY}&s=${title}&page=${page}`)
