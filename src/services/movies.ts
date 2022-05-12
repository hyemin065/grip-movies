import axios from 'axios'
import { IMovies } from 'types/movies'

const MOVIES_BASE_URL = 'http://www.omdbapi.com/'

export interface Params {
  title: string
  page: number
}

export const getMoviesApi = async (params: Params) => {
  try {
    const response = await axios.get<IMovies>(`${MOVIES_BASE_URL}`, {
      params: {
        apikey: process.env.REACT_APP_MOVIES_APP_KEY,
        s: params.title,
        page: params.page,
      },
    })
    const { data } = response
    return data
  } catch (error) {
    throw new Error('실패')
  }
}
