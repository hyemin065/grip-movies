import Header from 'components/Header'
import Tab from 'components/Tab'
import styles from './moviesApp.module.scss'

interface props {
  children: JSX.Element
}
const MoviesApp = ({ children }: props) => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Header />
        {children}
        <Tab />
      </div>
    </div>
  )
}

export default MoviesApp
