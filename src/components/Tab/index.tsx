import cx from 'classnames'
import styles from './tab.module.scss'
import { NavLink } from 'react-router-dom'

const Tab = () => {
  return (
    <nav className={styles.tab}>
      <ul>
        <li>
          <NavLink to='todo' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            검색
          </NavLink>
        </li>
        <li>
          <NavLink to='weather' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            즐겨찾기
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Tab
