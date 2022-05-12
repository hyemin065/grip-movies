import { atom } from 'recoil'
import { IMovie } from 'types/movies.d'

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
