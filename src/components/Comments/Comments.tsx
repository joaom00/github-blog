import styles from './styles.module.scss'

export const Comments = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Comentários (5)</span>
      <div className={styles.commentsContainer}>
        <div className={styles.comment}>
          <img src="https://github.com/joaom00.png" alt="" />
          <div>
            <p>João Pedro Magalhães</p>
            <span>Dev Front-End</span>
          </div>
          <span>Há 2 horas</span>
          <p>Otima leitura</p>
        </div>

        <div className={styles.comment}>
          <img src="https://github.com/joaom00.png" alt="" />
          <div>
            <p>João Pedro Magalhães</p>
            <span>Dev Front-End</span>
          </div>
          <span>Há 2 horas</span>
          <p>Otima leitura</p>
        </div>
      </div>
    </div>
  )
}
