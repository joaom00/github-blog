import styles from './styles.module.scss'

interface SearchProps {
  isLoading?: boolean
  onChange?: (value: string) => void
}

export const Search = ({ onChange, isLoading = false }: SearchProps) => {
  return (
    <>
      <div className={styles.header}>
        <h3>
          Publicações
          {isLoading && 'Carregando...'}
        </h3>
        <span>6 publicações</span>
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
