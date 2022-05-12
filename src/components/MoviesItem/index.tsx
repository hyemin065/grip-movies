import { IMovie } from 'types/movies.d'
import styles from './moviesItem.module.scss'

const MoviesItem = ({ Title, Year, Type, Poster }: IMovie) => {
  return (
    <li className={styles.movieItem}>
      <button type='button' className={styles.itemWrap}>
        <div className={styles.imgBox}>
          <img src={Poster} alt='' />
        </div>
        <div className={styles.detail}>
          <p>{Type}</p>
          <h2>
            {Title}
            <span>({Year})</span>
          </h2>
        </div>
      </button>
    </li>
  )
}

export default MoviesItem
