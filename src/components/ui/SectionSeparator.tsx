import { PrestigePath } from '@/components/ui/PrestigePath'
import { cn } from '@/lib/utils/cn'

export type SectionSeparatorVariant = 'prestigePath' | 'brandRule'

interface SectionSeparatorProps {
  variant?: SectionSeparatorVariant
  /** Applies to the outer wrapper. */
  className?: string
  /** Applies to the inner container for the chosen variant. */
  innerClassName?: string

  /** PrestigePath options (only used when variant="prestigePath") */
  prestigeDirection?: 'swooping' | 'left-to-right' | 'right-to-left'
  prestigeOffsetY?: number
  /** Height of the prestige separator wrapper (Tailwind class). */
  prestigeHeightClassName?: string
}

/**
 * SectionSeparator
 * - prestigePath: scroll-triggered, subtle animated arc line
 * - brandRule: static gradient rule with a centered gold dot
 */
export function SectionSeparator({
  variant = 'brandRule',
  className,
  innerClassName,
  prestigeDirection = 'left-to-right',
  prestigeOffsetY = -50,
  prestigeHeightClassName = 'h-24',
}: SectionSeparatorProps) {
  if (variant === 'prestigePath') {
    return (
      <div className={cn('w-full', className)} aria-hidden="true">
        <div className={cn('relative w-full overflow-hidden', prestigeHeightClassName, innerClassName)}>
          <PrestigePath direction={prestigeDirection} offsetY={prestigeOffsetY} />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)} aria-hidden="true">
      <div className={cn('section-container py-10', innerClassName)}>
        <div className="relative h-px bg-gradient-to-r from-transparent via-primary-navy/30 to-transparent">
          <span className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-2 rounded-full bg-accent-gold shadow-sm" />
        </div>
      </div>
    </div>
  )
}

