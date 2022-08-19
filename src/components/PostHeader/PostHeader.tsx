import Link from 'next/link'
import { FaExternalLinkAlt, FaChevronLeft, FaGithub, FaCalendar, FaComment } from 'react-icons/fa'

import styles from './styles.module.scss'

interface PostHeaderProps {
  title: string
  commentsCount: number
  author: string
  date: string
  url: string
}

export const PostHeader = ({ title, commentsCount, author, date, url }: PostHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/">
          <a className={styles.link}>
            <FaChevronLeft size="12px" />
            Voltar
          </a>
        </Link>

        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Ver no GitHub <FaExternalLinkAlt size="12px" />
        </a>
      </div>

      <h1>{title}</h1>

      <div className={styles.iconsContainer}>
        <span className={styles.iconContainer}>
          <FaGithub size="18px" />
          {author}
        </span>
        <span className={styles.iconContainer}>
          <FaCalendar size="18px" />
          {date}
        </span>
        <span className={styles.iconContainer}>
          <FaComment size="18px" />
          {commentsCount} comentários
        </span>
      </div>
    </div>
  )
}
