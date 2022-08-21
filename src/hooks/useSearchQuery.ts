import { QueryFunctionContext, useQuery, type UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'

interface PostsQuery {
  items: Array<{
    title: string
    number: number
    created_at: string
    body: string
  }>
  total_count: number
}

type Key = readonly [string, string]
type Options = UseQueryOptions<PostsQuery, unknown, PostsQuery, Key>
type Context = QueryFunctionContext<Key>

export const useSearchQuery = (search: string, options?: Options) => {
  async function fetchPosts(queryContext: Context) {
    const [, query] = queryContext.queryKey
    const { data } = await axios.get<PostsQuery>(`https://api.github.com/search/issues`, {
      params: { q: `repo:joaom00/github-blog ${query}` }
    })
    return data
  }

  return useQuery(['post', search], fetchPosts, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60,
    ...options
  })
}
