import { SearchIcon } from 'assets/svgs'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { getMoviesApi } from 'services/movies'
import { movieDataState, movieInputState } from 'store/movies'
import styles from './header.module.scss'

const Header = () => {
  const [searchValue, setSearchValue] = useRecoilState(movieInputState)
  const setMovies = useSetRecoilState(movieDataState)
  const resetState = useResetRecoilState(movieDataState)
  const handleClickSearch = async (e: any) => {
    e.preventDefault()
    const moviesData = await getMoviesApi({ title: searchValue, page: 1 })
    if (String(moviesData.Response) === 'False') {
      resetState()
      return
    }
    setMovies(moviesData.Search)
  }

  const handleChangeInput = (e: any) => {
    setSearchValue(e.currentTarget.value)
  }

  return (
    <header>
      <form action='' className={styles.form}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type='text'
          className={styles.input}
          value={searchValue}
          onChange={handleChangeInput}
          placeholder='검색을 입력해주세요'
        />
        <button type='submit' onClick={handleClickSearch}>
          검색
        </button>
      </form>
    </header>
  )
}

export default Header
