/**
 * API Service Layer
 * Centralized service for external API calls
 * Uses mock data patterns when API keys are not available
 */

// Google Reviews Interface
export interface GoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
  profile_photo_url?: string
}

// Financial Market Data Interface
export interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

// Mock Google Reviews Service
export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  // TODO: Replace with actual Google Places API call when API key is available
  // const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`)

  // Mock data for development
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          author_name: 'John Smith',
          rating: 5,
          text: 'Outstanding legal representation. The team at RBE provided exceptional service and achieved excellent results for our business.',
          relative_time_description: '2 weeks ago',
        },
        {
          author_name: 'Sarah Johnson',
          rating: 5,
          text: 'Professional, knowledgeable, and responsive. Highly recommend Riley Bennett Egloff for any corporate legal needs.',
          relative_time_description: '1 month ago',
        },
        {
          author_name: 'Michael Chen',
          rating: 5,
          text: 'The attorneys at RBE are top-notch. They helped us navigate a complex merger with expertise and care.',
          relative_time_description: '2 months ago',
        },
        {
          author_name: 'Emily Rodriguez',
          rating: 5,
          text: 'Excellent communication and strategic advice. RBE has been our trusted legal partner for years.',
          relative_time_description: '3 months ago',
        },
        {
          author_name: 'David Thompson',
          rating: 5,
          text: 'Best law firm in Indiana. Their construction law expertise saved us significant time and money.',
          relative_time_description: '4 months ago',
        },
      ])
    }, 500)
  })
}

// Financial Market Data Service
export async function fetchMarketData(): Promise<MarketData[]> {
  // TODO: Replace with actual Finnhub or Alpha Vantage API when key is available
  // Example: https://finnhub.io/api/v1/quote?symbol=SPY&token=${API_KEY}

  // Mock data for development
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          symbol: 'SPY',
          name: 'S&P 500',
          price: 4523.45,
          change: 12.34,
          changePercent: 0.27,
        },
        {
          symbol: 'QQQ',
          name: 'NASDAQ',
          price: 15234.67,
          change: -45.23,
          changePercent: -0.30,
        },
        {
          symbol: 'DIA',
          name: 'Dow Jones',
          price: 34567.89,
          change: 89.12,
          changePercent: 0.26,
        },
        {
          symbol: 'TNX',
          name: '10-Year Treasury',
          price: 4.25,
          change: -0.05,
          changePercent: -1.16,
        },
      ])
    }, 500)
  })
}

// Calendly Integration Helper
export function getCalendlyUrl(attorneyCalendlyUrl?: string): string {
  // If attorney-specific URL is provided, use it
  if (attorneyCalendlyUrl) {
    return attorneyCalendlyUrl
  }

  // Default firm-wide scheduling URL
  return 'https://calendly.com/rbelaw/consultation'
}

