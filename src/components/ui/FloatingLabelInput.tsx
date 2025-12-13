import * as React from 'react'
import { cn } from '../../lib/utils'

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, error, id, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const hasValue = value !== '' && value !== undefined && value !== null

    return (
      <div className="relative">
        <input
          id={id}
          ref={ref}
          className={cn(
            'peer h-14 w-full rounded-sm border bg-white px-4 pt-6 pb-2 text-sm',
            'ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-burgundy focus-visible:ring-offset-0',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-200',
            error ? 'border-red-500' : 'border-neutral-300 focus:border-primary-burgundy',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'absolute left-4 transition-all duration-200 pointer-events-none',
            isFocused || hasValue
              ? 'top-2 text-xs text-primary-burgundy font-medium'
              : 'top-4 text-sm text-neutral-500'
          )}
        >
          {label}
        </label>
        {error && (
          <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
        )}
      </div>
    )
  }
)
FloatingLabelInput.displayName = 'FloatingLabelInput'

