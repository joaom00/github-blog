import { CgSpinner } from 'react-icons/cg'
import styles from './styles.module.scss'

interface SearchProps {
  isLoading?: boolean
  postsCount?: number
  onChange?: (value: string) => void
}

export const Search = ({ onChange, isLoading = false, postsCount }: SearchProps) => {
  return (
    <>
      <div className={styles.header}>
        <h3>
          Publicações
          {isLoading && <CgSpinner />}
        </h3>
        <span>{postsCount} publicações</span>
      </div>

      <input
        type="search"
        placeholder="Buscar conteúdo"
        className={styles.search}
        onChange={(event) => onChange?.(event.currentTarget.value)}
      />
    </>
  )
}
