import React from 'react'
import axios from 'axios'
import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { Search } from '../components/Search'
import { UserCard } from '../components/UserCard'
import useDebounce from '../hooks/useDebounce'
import Head from 'next/head'
import { useSearchQuery } from '../hooks/useSearchQuery'

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

const Home = ({ user }: HomeProps) => {
  const [search, setSearch] = React.useState('')
  const debouncedSearch = useDebounce(search)
  const { data, isLoading } = useSearchQuery(debouncedSearch)

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
