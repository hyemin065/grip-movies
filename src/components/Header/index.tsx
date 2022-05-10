import styles from './header.module.scss'

const Header = () => {
  return (
    <header>
      <form action='' className={styles.form}>
        <input type='text' placeholder='검색을 입력해주세요' />
        <button type='submit'>검색</button>
      </form>
    </header>
  )
}

export default Header
