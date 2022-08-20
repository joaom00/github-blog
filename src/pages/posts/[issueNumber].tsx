import type { GetStaticProps } from 'next'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Layout } from '../../components/Layout'
import { Post } from '../../components/Post'
import { PostHeader } from '../../components/PostHeader'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { mdxToHtml } from '../../lib/mdx'
import { Comments } from '../../components/Comments'

interface PostProps {
  post: {
    title: string
    number: number
    created_at: string
    body: MDXRemoteSerializeResult
    author: string
    numberOfComments: number
    url: string
  }
}

export default function IssueNumberPage({ post }: PostProps) {
  return (
    <Layout>
      <PostHeader
        title={post.title}
        commentsCount={post.numberOfComments}
        author={post.author}
        date={post.created_at}
        url={post.url}
      />

      <Post body={post.body} />

      <Comments />
    </Layout>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<{}, { issueNumber: string }> = async ({ params }) => {
  const issueNumber = params?.issueNumber
  const { data } = await axios.get(
    `https://api.github.com/repos/joaom00/github-blog/issues/${issueNumber}`
  )

  const mdxSource = await mdxToHtml(data.body)

  const post = {
    title: data.title,
    number: data.number,
    created_at: formatDistanceToNow(new Date(data.created_at), { addSuffix: true, locale: ptBR }),
    body: mdxSource,
    author: data.user.login,
    numberOfComments: data.comments,
    url: data.html_url
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 60 * 3 // 3 hours
  }
}
