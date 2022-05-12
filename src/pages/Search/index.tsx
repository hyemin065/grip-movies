import MoviesItem from 'components/MoviesItem'
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getMoviesApi } from 'services/movies'
import { movieDataState, movieInputState, moviePageState } from 'store/movies'
import styles from './search.module.scss'

const Search = () => {
  const [movies, setMovies] = useRecoilState(movieDataState)
  const [pageNumber, setPageNumber] = useRecoilState(moviePageState)
  // const [isLoading, setIsLoading] = useState(true)
  const inputValue = useRecoilValue(movieInputState)
  const ref = useRef<HTMLDivElement>(null)

  // const getMovies = async (page: number) => {
  //   const res = await getMoviesApi({ title: inputValue, page })
  //   const newMovies = res.Search
  //   setMovies((movie) => [...movie, ...newMovies])
  //   console.log('sdfsdf')
  // }

  useEffect(() => {
    const apiCall = async () => {
      if (pageNumber > 1) {
        const res = await getMoviesApi({ title: inputValue, page: pageNumber })
        const newMovies = res.Search

        if (String(res.Response) === 'True' && res.Search) {
          setMovies((movie) => [...movie, ...newMovies])
        }
      }
    }
    apiCall()
  }, [pageNumber])

  console.log('page', pageNumber)

  // const loadMore = () => {
  //   setPageNumber((prev) => prev + 1)
  // }

  useEffect(() => {
    if (!ref.current) return
    console.log(ref.current)

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prev) => prev + 1)
      }
    })
    // if (ref.current) {
    observer.observe(ref.current)
    // }
  }, [movies])

  return (
    <main className={styles.searchResultWrapper}>
      {movies.length === 0 ? (
        <div className={styles.noResultsWrap}>
          <p className={styles.noResults}>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <>
          <ul className={styles.movies}>
            {movies.map((item) => (
              <MoviesItem key={item.imdbID} {...item} />
            ))}
          </ul>
          <div ref={ref}>로딩로딩로딩로딩로딩로딩로딩로딩로딩로딩</div>
        </>
      )}
    </main>
  )
}

export default Search
