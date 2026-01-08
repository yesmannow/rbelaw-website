import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, User, Search } from 'lucide-react'
import { attorneys } from '@/lib/data/attorney-helpers'
import { practiceAreas } from '@/lib/data/practiceAreas'
import newsArchive from '@/lib/data/news-archive.json'
import type { Attorney } from '@/lib/types'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

interface MatchResult {
  attorney?: Attorney
  practiceArea?: string
  article?: {
    title: string
    slug: string
  }
}

export function ConciergeWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm the RBE Concierge. How can I help you today? You can ask about practice areas, attorneys, or recent articles.",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Keyword matching logic
  const findMatches = (query: string): MatchResult => {
    const lowerQuery = query.toLowerCase()
    const result: MatchResult = {}

    // Search practice areas
    const matchedPracticeArea = practiceAreas.find((area) => {
      const areaName = area.name.toLowerCase()
      const areaDesc = area.description.toLowerCase()
      const subAreas = area.subAreas?.join(' ').toLowerCase() || ''
      return (
        areaName.includes(lowerQuery) ||
        areaDesc.includes(lowerQuery) ||
        subAreas.includes(lowerQuery) ||
        lowerQuery.includes(areaName) ||
        lowerQuery.includes(area.slug.replace('-', ' '))
      )
    })

    if (matchedPracticeArea) {
      result.practiceArea = matchedPracticeArea.name

      // Find attorneys in this practice area
      const matchedAttorneys = attorneys.filter((attorney) =>
        attorney.practiceAreas?.some((pa) => pa === matchedPracticeArea.id)
      )

      if (matchedAttorneys.length > 0) {
        // Prefer partners
        const partner = matchedAttorneys.find((a) => a.title?.toLowerCase().includes('partner'))
        result.attorney = partner || matchedAttorneys[0]
      }
    }

    // Search for specific attorney names
    if (!result.attorney) {
      const matchedAttorney = attorneys.find((attorney) =>
        attorney.name.toLowerCase().includes(lowerQuery)
      )
      if (matchedAttorney) {
        result.attorney = matchedAttorney
      }
    }

    // Search news articles
    const matchedArticle = newsArchive.find((article) => {
      const title = article.title.toLowerCase()
      const excerpt = article.excerpt.toLowerCase()
      const category = article.category.toLowerCase()
      return (
        title.includes(lowerQuery) ||
        excerpt.includes(lowerQuery) ||
        category.includes(lowerQuery)
      )
    })

    if (matchedArticle) {
      result.article = {
        title: matchedArticle.title,
        slug: matchedArticle.slug,
      }
    }

    return result
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const matches = findMatches(inputValue)
    let responseText = ''

    if (matches.attorney) {
      responseText = `I found a match! **${matches.attorney.name}** specializes in ${matches.practiceArea || 'this area'}. `
      if (matches.article) {
        responseText += `I also found a relevant article: "${matches.article.title}". `
      }
      responseText += `Would you like ${matches.attorney.name} to contact you about this?`
    } else if (matches.practiceArea) {
      responseText = `I found information about **${matches.practiceArea}**. `
      if (matches.article) {
        responseText += `I also found a relevant article: "${matches.article.title}". `
      }
      responseText +=
        'Would you like to speak with one of our attorneys who specializes in this area?'
    } else if (matches.article) {
      responseText = `I found a relevant article: **"${matches.article.title}"**. Would you like to read it or speak with an attorney about this topic?`
    } else {
      responseText =
        "I'd be happy to help! Could you provide more details about what you're looking for? For example, you could ask about 'non-compete agreements', 'construction law', or 'business formation'."
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'assistant',
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary-burgundy hover:bg-primary-burgundy/90 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors"
        aria-label="Open RBE Concierge"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden border border-neutral-200"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-navy to-primary-slate p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">RBE Concierge</h3>
                    <p className="text-white/80 text-xs">AI-Powered Legal Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary-burgundy text-white'
                          : 'bg-white text-neutral-800 border border-neutral-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-neutral-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary-navy" />
                        <span className="text-sm text-neutral-600">Typing...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-neutral-200">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about practice areas, attorneys, or articles..."
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-burgundy focus:border-transparent text-sm"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-primary-burgundy hover:bg-primary-burgundy/90 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mt-2 text-center">
                  Try: "non-compete", "construction law", or "Donald S. Smith"
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

