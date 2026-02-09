import { useState, useEffect, useCallback } from 'react'
import { documentationApi } from '@/lib/documentationApi'

export function useDocumentation() {
  const [docs, setDocs] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDocs = useCallback(async (params = {}) => {
    setIsLoading(true)
    setError(null)
    try {
      const [docsRes, categoriesRes] = await Promise.all([
        documentationApi.getDocs(params),
        documentationApi.getCategories()
      ])
      setDocs(docsRes.data?.docs || [])
      setCategories(categoriesRes.data?.categories || [])
    } catch (err) {
      setError(err.message || 'Failed to load documentation')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDocs()
  }, [fetchDocs])

  return { docs, categories, isLoading, error, refetch: fetchDocs }
}
