import { Mail, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import type { Attorney } from '../../lib/types'

interface AttorneyCardProps {
  attorney: Attorney
  compact?: boolean
}

export function AttorneyCard({ attorney, compact = false }: AttorneyCardProps) {
  if (compact) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{attorney.name}</CardTitle>
          <p className="text-sm text-neutral-600">{attorney.title}</p>
        </CardHeader>
        <CardContent className="space-y-2">
          <a 
            href={`mailto:${attorney.email}`}
            className="flex items-center text-sm text-neutral-700 hover:text-accent-gold transition-colors"
          >
            <Mail className="h-4 w-4 mr-2" />
            <span className="truncate">{attorney.email}</span>
          </a>
          <a 
            href={`tel:${attorney.phone}`}
            className="flex items-center text-sm text-neutral-700 hover:text-accent-gold transition-colors"
          >
            <Phone className="h-4 w-4 mr-2" />
            {attorney.phone}
          </a>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{attorney.name}</CardTitle>
        <p className="text-neutral-600">{attorney.title}</p>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-700 mb-4 line-clamp-3">{attorney.bio}</p>
        <div className="space-y-2">
          <a 
            href={`mailto:${attorney.email}`}
            className="flex items-center text-sm text-neutral-700 hover:text-accent-gold transition-colors"
          >
            <Mail className="h-4 w-4 mr-2" />
            {attorney.email}
          </a>
          <a 
            href={`tel:${attorney.phone}`}
            className="flex items-center text-sm text-neutral-700 hover:text-accent-gold transition-colors"
          >
            <Phone className="h-4 w-4 mr-2" />
            {attorney.phone}
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
