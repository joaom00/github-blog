import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import removeMD from 'remove-markdown'

import styles from './styles.module.scss'

interface PostsProps {
  posts?: Array<{
    title: string
    number: number
    created_at: string
    body: string
  }>
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <div className={styles.container}>
      {posts?.map((post) => (
        <Link key={post.number} href={`/posts/${post.number}`}>
          <a>
            <article className={styles.post}>
              <header>
                <h3>{post.title}</h3>
                <span>
                  {formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </span>
              </header>
              <p>{removeMD(post.body)}</p>
            </article>
          </a>
        </Link>
      ))}
    </div>
  )
}
