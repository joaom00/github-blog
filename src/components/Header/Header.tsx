import styles from './styles.module.scss'

export const Header = () => {
  return (
    <header className={styles.container}>
      <img src="/logo.svg" alt="GitHub Blog" />
    </header>
  )
}
