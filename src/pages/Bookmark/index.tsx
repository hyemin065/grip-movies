import Modal from 'components/Modal'
import MoviesItem from 'components/MoviesItem'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { bookMarkDataState, moviesID } from 'store/movies'
import styles from './bookmark.module.scss'

const Bookmark = () => {
  const [bookMarkMoviesData, setBookMarkMoviesData] = useRecoilState(bookMarkDataState)
  const bookMarkID = useRecoilValue(moviesID)
  const bookMarkMovies = bookMarkMoviesData.filter((item) => item.imdbID === bookMarkID)

  const localStorageData = localStorage.getItem('movie')
  const localStorageMovieData = localStorageData && JSON.parse(localStorageData)

  useEffect(() => {
    if (bookMarkMoviesData.length === 0 && localStorage.length > 0) {
      setBookMarkMoviesData(localStorageMovieData)
    }
  }, [])

  return (
    <main className={styles.bookMarkWrapper}>
      {bookMarkMoviesData.length === 0 ? (
        <div className={styles.noResultsWrap}>
          <p className={styles.noResults}>즐겨찾기가 없습니다.</p>
        </div>
      ) : (
        <>
          <h2>내 즐겨찾기</h2>
          <ul>
            {bookMarkMoviesData.map((item) => {
              return <MoviesItem key={item.imdbID} {...item} />
            })}
          </ul>
          <Modal movie={bookMarkMovies[0]} />
        </>
      )}
    </main>
  )
}

export default Bookmark
