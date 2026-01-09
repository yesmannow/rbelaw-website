/**
 * PrestigeMap Component
 * Responsive, branded Google Maps embed with dark mode styling
 * Matches Navy/Gold brand identity
 */

interface PrestigeMapProps {
  className?: string
  height?: string
}

export function PrestigeMap({ className = '', height = '450px' }: PrestigeMapProps) {
  const firmAddress = '255 E Carmel Dr Suite 200, Carmel, IN 46032'
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(firmAddress)}`
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3055.7890123456789!2d-86.1234567!3d39.9876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU5JzE1LjYiTiA4NsKwMDcnMjQuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus&q=${encodeURIComponent(firmAddress)}`

  return (
    <div className={`w-full ${className}`}>
      {/* Gold Border Top */}
      <div className="border-t-4 border-[#B8860B]" />
      
      {/* Map Container with Dark Mode Filter */}
      <div 
        className="relative w-full overflow-hidden bg-[#0A2540]"
        style={{ height }}
      >
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ 
            border: 0,
            // Dark mode filter to match Navy/Gold brand
            filter: 'grayscale(1) invert(90%) hue-rotate(180deg) brightness(90%) contrast(90%)'
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Riley Bennett Egloff Office Location"
          className="absolute inset-0"
        />
      </div>

      {/* Get Directions Button */}
      <div className="bg-white border-b border-x border-neutral-200 p-4">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8860B] transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
            />
          </svg>
          Get Directions
        </a>
      </div>

      {/* Office Address */}
      <div className="bg-neutral-50 border-b border-x border-neutral-200 p-4 text-sm text-neutral-700">
        <p className="font-semibold text-[#0A2540]">Riley Bennett Egloff LLP</p>
        <p>{firmAddress}</p>
      </div>
    </div>
  )
}
