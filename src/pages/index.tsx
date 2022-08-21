import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { Search } from '../components/Search'
import { UserCard } from '../components/UserCard'
import useDebounce from '../hooks/useDebounce'
import Head from 'next/head'

export interface User {
  name: string
  company: string
  bio: string
  followers: number
  url: string
  avatar: string
  login: string
}

interface HomeProps {
  user: User
}

interface PostsQuery {
  items: Array<{
    title: string
    number: number
    created_at: string
    body: string
  }>
  total_count: number
}

const Home = ({ user }: HomeProps) => {
  const [search, setSearch] = React.useState('')
  const debouncedSearch = useDebounce(search)

  async function fetchPosts(query: string) {
    const { data } = await axios.get(`https://api.github.com/search/issues`, {
      params: { q: `repo:joaom00/github-blog ${query}` }
    })
    return data
  }

  const { data, isLoading } = useQuery<PostsQuery>(
    ['post', debouncedSearch],
    () => fetchPosts(debouncedSearch),
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false, staleTime: 1000 * 60 * 60 }
  )

  return (
    <>
      <Head>
        <title>GitHub Blog</title>
      </Head>
      <Layout>
        <UserCard user={user} />
        <Search onChange={setSearch} isLoading={isLoading} postsCount={data?.items.length} />
        <Posts posts={data?.items} />
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const { data } = await axios.get(`https://api.github.com/users/joaom00`)

  const user = {
    name: data.name,
    company: data.company,
    bio: data.bio,
    followers: data.followers,
    url: data.html_url,
    avatar: data.avatar_url,
    login: data.login
  }

  return {
    props: {
      user
    },
    revalidate: 60 * 60 * 3 // 3 hours
  }
}

export default Home
