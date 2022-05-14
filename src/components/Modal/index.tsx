import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { moviesID, modalState, bookMarkDataState, movieDataState } from 'store/movies'
import { IMovie } from 'types/movies'
import styles from './modal.module.scss'

interface IProps {
  movie: IMovie
}

const Modal = ({ movie }: IProps) => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const bookMarkID = useRecoilValue(moviesID)
  const movies = useRecoilValue(movieDataState)
  const modalRef = useRef<HTMLDivElement>(null)
  const [bookMarkMoviesData, setBookMarkMoviesData] = useRecoilState(bookMarkDataState)
  const bookMarkIndex = bookMarkMoviesData.findIndex((item) => item.imdbID === bookMarkID)

  const closeModal = () => {
    setShowModal((prev) => !prev)
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside)

    return () => {
      document.removeEventListener('mousedown', clickModalOutside)
    }
  })

  const clickModalOutside = (e: any) => {
    if (!modalRef.current) return
    if (showModal && !modalRef.current.contains(e.target)) {
      closeModal()
    }
  }

  const handleAddBookMark = (id: string) => {
    const bookMarkMovie = movies.filter((item) => item.imdbID === id)
    setBookMarkMoviesData([...bookMarkMoviesData, ...bookMarkMovie])
    localStorage.setItem('movie', JSON.stringify([...bookMarkMoviesData, ...bookMarkMovie]))
    closeModal()
  }

  const handleRemoveBookMark = (id: string) => {
    const bookMarkMovie = bookMarkMoviesData.filter((item) => item.imdbID !== id)
    setBookMarkMoviesData([...bookMarkMovie])
    localStorage.removeItem('movie')
    localStorage.setItem('movie', JSON.stringify([...bookMarkMovie]))
    closeModal()
    console.log('a', bookMarkMovie)
  }

  return showModal
    ? ReactDOM.createPortal(
        <div className={styles.modalContainer}>
          <div className={styles.modalContents} ref={modalRef}>
            {movie.imdbID === bookMarkID && <p key={movie.imdbID}>{movie.Title}</p>}
            <div className={styles.buttonWrap}>
              {bookMarkIndex !== -1 ? (
                <button type='button' onClick={() => handleRemoveBookMark(bookMarkID)}>
                  즐겨찾기 해제
                </button>
              ) : (
                <button type='button' onClick={() => handleAddBookMark(bookMarkID)}>
                  즐겨찾기 추가
                </button>
              )}

              <button type='button' onClick={closeModal}>
                취소
              </button>
            </div>
          </div>
        </div>,
        document.querySelector('#modal') as HTMLElement
      )
    : null
}

export default Modal
