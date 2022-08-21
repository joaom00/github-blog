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
import Head from 'next/head'

export interface CommentProp {
  id: number
  body: string
  created_at: string
  author: {
    username: string
    avatar: string
    bio: string
  }
  reactions: {
    '+1': number
    '-1': number
    laugh: number
    hooray: number
    confused: number
    heart: number
    rocket: number
    eyes: number
  }
}

interface PostProps {
  post: {
    title: string
    number: number
    created_at: string
    body: MDXRemoteSerializeResult
    author: string
    numberOfComments: number
    url: string
    comments: Array<CommentProp>
  }
}

export default function IssueNumberPage({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>GitHub Blog | {post.title}</title>
      </Head>

      <Layout>
        <PostHeader
          title={post.title}
          commentsCount={post.numberOfComments}
          author={post.author}
          date={post.created_at}
          url={post.url}
        />

        <Post body={post.body} />

        <Comments comments={post.comments} />
      </Layout>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

interface Comment {
  id: number
  body: string
  created_at: string
  user: {
    url: string
    login: string
    avatar_url: string
  }
  reactions: {
    '+1': number
    '-1': number
    laugh: number
    hooray: number
    confused: number
    heart: number
    rocket: number
    eyes: number
  }
}

async function getUserBio(profileUrl: string) {
  const { data } = await axios.get(profileUrl)
  return data.bio
}

export const getStaticProps: GetStaticProps<{}, { issueNumber: string }> = async ({ params }) => {
  const issueNumber = params?.issueNumber
  const { data } = await axios.get(
    `https://api.github.com/repos/joaom00/github-blog/issues/${issueNumber}`
  )
  const { data: comments } = await axios.get<Array<Comment>>(data.comments_url)

  const mdxSource = await mdxToHtml(data.body)

  function makeComments() {
    return comments.map(async (comment) => ({
      id: comment.id,
      body: comment.body,
      created_at: comment.created_at,
      reactions: comment.reactions,
      author: {
        username: comment.user.login,
        bio: await getUserBio(comment.user.url),
        avatar: comment.user.avatar_url
      }
    }))
  }

  const post = {
    title: data.title,
    number: data.number,
    created_at: formatDistanceToNow(new Date(data.created_at), { addSuffix: true, locale: ptBR }),
    body: mdxSource,
    author: data.user.login,
    numberOfComments: data.comments,
    url: data.html_url,
    comments: await Promise.all(makeComments())
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 60 * 3 // 3 hours
  }
}
