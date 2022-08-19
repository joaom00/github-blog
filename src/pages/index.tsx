import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { Search } from '../components/Search'
import { UserCard } from '../components/UserCard'
import useDebounce from '../hooks/useDebounce'

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

  async function fetchPosts(query: string) {
    const { data } = await axios.get(`https://api.github.com/search/issues`, {
      params: { q: `repo:github-blog ${query}` }
    })
    return data
  }

  const { data, isLoading } = useQuery(['post', debouncedSearch], () => fetchPosts(debouncedSearch))

  return (
    <Layout>
      <UserCard user={user} />
      <Search onChange={setSearch} isLoading={isLoading} />
      <Posts />
    </Layout>
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
