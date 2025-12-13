import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react'
import { fetchMarketData, type MarketData } from '@/services/api'

export function MarketTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMarketData().then((data) => {
      setMarketData(data)
      setIsLoading(false)
    })

    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      fetchMarketData().then(setMarketData)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="bg-neutral-900 py-2 border-b border-neutral-800">
        <div className="section-container">
          <p className="text-neutral-400 text-xs font-mono text-center">Loading market data...</p>
        </div>
      </div>
    )
  }

  // Add static firm message to the ticker
  const tickerItems = [
    ...marketData.map((item) => ({
      type: 'market' as const,
      data: item,
    })),
    {
      type: 'message' as const,
      text: 'RBE Law: Protecting Business Interests for 40+ Years',
    },
  ]

  return (
    <section className="bg-neutral-900 py-2 border-b border-neutral-800 overflow-hidden">
      <div className="section-container">
        <motion.div
          className="flex gap-8 items-center"
          animate={{
            x: [0, -tickerItems.length * 250],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <motion.div
              key={`ticker-${index}`}
              className="flex-shrink-0 flex items-center gap-4"
            >
              {item.type === 'market' ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400 text-xs font-mono font-semibold uppercase">
                      {item.data.symbol}
                    </span>
                    <span className="text-white text-xs font-mono">
                      {item.data.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xs font-mono font-semibold">
                      {item.data.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <div
                      className={`flex items-center gap-1 ${
                        item.data.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {item.data.change >= 0 ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span className="text-xs font-mono font-semibold">
                        {item.data.change >= 0 ? '+' : ''}
                        {item.data.change.toFixed(2)} ({item.data.changePercent >= 0 ? '+' : ''}
                        {item.data.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-accent-gold" />
                  <span className="text-accent-gold text-xs font-mono font-semibold">
                    {item.text}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

