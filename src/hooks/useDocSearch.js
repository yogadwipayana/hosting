import { useState, useEffect, useCallback } from 'react'
import { documentationApi } from '@/lib/documentationApi'

export function useDocSearch(debounceMs = 300) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const search = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    setIsSearching(true)
    try {
      const response = await documentationApi.searchDocs(searchQuery)
      setResults(response.data?.results || [])
    } catch (err) {
      console.error('Search failed:', err)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => search(query), debounceMs)
    return () => clearTimeout(timer)
  }, [query, debounceMs, search])

  return { query, setQuery, results, isSearching }
}
