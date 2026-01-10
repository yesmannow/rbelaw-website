'use client'

import { ReactNode } from 'react'

interface EditorialWrapperProps {
  children: ReactNode
  sidebar?: ReactNode
  className?: string
}

/**
 * EditorialWrapper - Magazine Grid Layout Component
 * 
 * Implements an asymmetric 8-column content + 4-column sidebar layout
 * for a boutique law firm aesthetic with generous white space.
 * 
 * Features:
 * - 12-column magazine grid system
 * - Sticky sidebar for persistent widget display
 * - Responsive design that stacks on mobile
 * - High-contrast typography
 */
export function EditorialWrapper({ 
  children, 
  sidebar, 
  className = '' 
}: EditorialWrapperProps) {
  return (
    <div className={`editorial-section ${className}`}>
      <div className="magazine-layout">
        {/* Main Content - 8 columns */}
        <div className="magazine-content">
          <div className="editorial-body">
            {children}
          </div>
        </div>
        
        {/* Sticky Intelligence Sidebar - 4 columns */}
        {sidebar && (
          <aside className="magazine-sidebar" aria-label="Interactive tools and resources">
            <div className="space-y-6">
              {sidebar}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
