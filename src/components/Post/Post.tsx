import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'

import styles from './styles.module.scss'

interface PostProps {
  body: MDXRemoteSerializeResult
}

const CustomLink = (props: React.ComponentPropsWithoutRef<'a'>) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export const Post = ({ body }: PostProps) => {
  return (
    <div className={styles.container}>
      <MDXRemote {...body} components={{ a: CustomLink }} />
    </div>
  )
}
