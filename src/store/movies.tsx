import { atom } from 'recoil'
import { IMovie } from 'types/movies.d'

export const bookMarkDataState = atom<IMovie[] | []>({
  key: 'bookMarkDataState',
  default: [],
})

export const moviesID = atom<string>({
  key: 'moviesID',
  default: '',
})

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
})

export const movieInputState = atom<string>({
  key: 'movieInputState',
  default: '',
})

export const movieDataState = atom<IMovie[] | []>({
  key: 'movieDataState',
  default: [],
})

export const moviePageState = atom<number>({
  key: 'moviePageState',
  default: 1,
})
