/**
 * The Linker Utility
 * Zero-lag filtering of articles by author using useMemo
 * Provides optimized relationship between attorneys and their articles
 */

import { useMemo } from 'react'
import type { BlogPost } from '../types/content'

/**
 * Hook to get articles by author ID with zero-lag performance
 * Uses useMemo to prevent unnecessary recalculations
 */
export function useArticlesByAuthor(
  articles: BlogPost[],
  authorId: string | null,
  limit?: number
): BlogPost[] {
  return useMemo(() => {
    if (!authorId) return []
    
    const filtered = articles.filter(article => {
      // Match by authorId (preferred) or fall back to authorSlug
      return article.authorId === authorId || article.authorSlug === authorId
    })
    
    // Sort by date (newest first)
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
    
    // Apply limit if specified
    return limit ? sorted.slice(0, limit) : sorted
  }, [articles, authorId, limit])
}

/**
 * Hook to get article count by author with zero-lag performance
 */
export function useArticleCountByAuthor(
  articles: BlogPost[],
  authorId: string | null
): number {
  return useMemo(() => {
    if (!authorId) return 0
    
    return articles.filter(article => {
      return article.authorId === authorId || article.authorSlug === authorId
    }).length
  }, [articles, authorId])
}

/**
 * Hook to get all authors with article counts
 * Useful for Newsroom filters
 */
export function useAuthorsWithCounts(articles: BlogPost[]): Array<{
  id: string
  name: string
  count: number
}> {
  return useMemo(() => {
    const authorMap = new Map<string, { name: string; count: number }>()
    
    articles.forEach(article => {
      const authorId = article.authorId || article.authorSlug
      if (!authorId) return
      
      const existing = authorMap.get(authorId)
      if (existing) {
        existing.count++
      } else {
        authorMap.set(authorId, {
          name: article.author,
          count: 1
        })
      }
    })
    
    // Convert to array and sort by count (descending)
    return Array.from(authorMap.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
  }, [articles])
}

/**
 * Hook to filter articles by multiple criteria with zero-lag performance
 */
export function useFilteredArticles(
  articles: BlogPost[],
  filters: {
    searchQuery?: string
    authorId?: string
    category?: string
    tags?: string[]
  }
): BlogPost[] {
  return useMemo(() => {
    let filtered = articles
    
    // Filter by author
    if (filters.authorId) {
      filtered = filtered.filter(article => {
        return article.authorId === filters.authorId || 
               article.authorSlug === filters.authorId
      })
    }
    
    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(article => {
        return article.categories.includes(filters.category!)
      })
    }
    
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(article => {
        return filters.tags!.some(tag => article.tags.includes(tag))
      })
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(article => {
        return (
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query)
        )
      })
    }
    
    return filtered
  }, [articles, filters])
}
