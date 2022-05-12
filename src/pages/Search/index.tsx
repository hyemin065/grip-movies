import MoviesItem from 'components/MoviesItem'
import { useRecoilState, useRecoilValue } from 'recoil'
import { movieDataState, movieInputState, moviePageState } from 'store/movies'
import styles from './search.module.scss'

const Search = () => {
  const [movies, setMovies] = useRecoilState(movieDataState)
  const [pageNumber, setPageNumber] = useRecoilState(moviePageState)
  const inputValue = useRecoilValue(movieInputState)

  return (
    <main className={styles.searchResultWrapper}>
      {movies.length === 0 ? (
        <div className={styles.noResultsWrap}>
          <p className={styles.noResults}>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <ul className={styles.movies}>
          {movies.map((item) => (
            <MoviesItem key={item.imdbID} {...item} />
          ))}
        </ul>
      )}
    </main>
  )
}

export default Search
