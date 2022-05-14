import { StarIcon } from 'assets/svgs'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { moviesID, modalState, bookMarkDataState } from 'store/movies'
import { IMovie } from 'types/movies.d'
import styles from './moviesItem.module.scss'

const MoviesItem = ({ Title, Year, Type, Poster, imdbID }: IMovie) => {
  const setShowModal = useSetRecoilState(modalState)
  const setBookMark = useSetRecoilState(moviesID)
  const bookMarkMoviesData = useRecoilValue(bookMarkDataState)

  const bookMarkIndex = bookMarkMoviesData.findIndex((item) => item.imdbID === imdbID)

  const handleShowModal = (id: string) => {
    setBookMark(id)
    setShowModal(true)
  }
  return (
    <li className={styles.movieItem}>
      <button type='button' className={styles.itemWrap} onClick={() => handleShowModal(imdbID)}>
        <div className={styles.imgBox}>
          <img src={Poster} alt='' />
        </div>
        <div className={styles.detail}>
          <p>{Type}</p>
          <h2>
            {Title}
            <span>({Year})</span>
          </h2>
          {bookMarkIndex !== -1 ? (
            <StarIcon className={styles.activeBookMarkIcon} />
          ) : (
            <StarIcon className={styles.bookMarkIcon} />
          )}
        </div>
      </button>
    </li>
  )
}

export default MoviesItem
