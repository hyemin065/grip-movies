import Modal from 'components/Modal'
import MoviesItem from 'components/MoviesItem'
import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getMoviesApi } from 'services/movies'
import { movieDataState, movieInputState, moviePageState, moviesID } from 'store/movies'
import styles from './search.module.scss'

const Search = () => {
  const [movies, setMovies] = useRecoilState(movieDataState)
  const [pageNumber, setPageNumber] = useRecoilState(moviePageState)
  const inputValue = useRecoilValue(movieInputState)
  const bookMarkID = useRecoilValue(moviesID)
  const pageRef = useRef<HTMLDivElement>(null)

  console.log('movie', movies)
  console.log('page', pageNumber)
  useEffect(() => {
    const getMovies = async () => {
      if (pageNumber > 1) {
        const res = await getMoviesApi({ title: inputValue, page: pageNumber })
        const newMovies = res.Search

        if (String(res.Response) === 'True' && newMovies) {
          setMovies((movie) => [...movie, ...newMovies])
        }
      }
    }
    getMovies()
  }, [inputValue, pageNumber, setMovies])

  useEffect(() => {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prev) => prev + 1)
      }
    })
    if (pageRef.current) {
      observer.observe(pageRef.current)
    }

    return () => {
      if (pageRef.current) {
        observer.unobserve(pageRef.current)
      }
    }
  }, [movies, setPageNumber])

  const clickMovie = movies.filter((movie) => movie.imdbID === bookMarkID)

  return (
    <main className={styles.searchResultWrapper}>
      {movies.length === 0 ? (
        <div className={styles.noResultsWrap}>
          <p className={styles.noResults}>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <>
          <h2>검색결과</h2>
          <ul className={styles.movies}>
            {movies.map((item) => (
              <MoviesItem key={item.imdbID} {...item} />
            ))}
          </ul>
          {movies.length % 10 === 0 && (
            <div className={styles.more} ref={pageRef}>
              Load More...
            </div>
          )}
        </>
      )}
      <Modal movie={clickMovie[0]} />
    </main>
  )
}

export default Search
