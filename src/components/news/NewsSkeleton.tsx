/**
 * News Skeleton Component
 * Shimmer skeleton loader for blog posts and news items
 */

import { motion } from 'framer-motion'

interface NewsSkeletonProps {
  count?: number
}

export function NewsSkeleton({ count = 3 }: NewsSkeletonProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} index={index} />
      ))}
    </div>
  )
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group rounded-lg border border-gray-200 bg-white overflow-hidden"
    >
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-3">
        {/* Date and Category */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-4 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
          <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
        </div>
        
        {/* Excerpt */}
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
          <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
          <div className="h-4 w-2/3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
        </div>
        
        {/* Read More Button */}
        <div className="pt-4">
          <div className="h-5 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
        </div>
      </div>
    </motion.div>
  )
}
