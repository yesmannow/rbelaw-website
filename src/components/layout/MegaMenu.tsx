import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { navData, iconMap, type NavigationSection } from '@/lib/data/navigation'
import { NewsMenu } from './NewsMenu'
import { useState } from 'react'

interface MegaMenuProps {
  onSearchTrigger?: () => void
}

export function MegaMenu({ onSearchTrigger }: MegaMenuProps) {
  const [activeValue, setActiveValue] = useState<string>('')

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null
    const Icon = iconMap[iconName]
    return Icon ? <Icon className="w-5 h-5 transition-transform group-hover:rotate-[15deg]" /> : null
  }

  const renderFeaturedCard = (featured: NavigationSection['featured']) => {
    if (!featured) return null
    
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-primary-burgundy to-primary-navy text-white p-6 rounded-lg"
      >
        <h3 className="text-lg font-serif font-bold mb-2">{featured.title}</h3>
        <p className="text-sm text-white/90 mb-4">{featured.description}</p>
        <Link
          to={featured.href}
          className="inline-block bg-white text-primary-burgundy px-4 py-2 rounded-sm text-sm font-semibold hover:bg-neutral-100 transition-colors"
        >
          {featured.buttonText}
        </Link>
      </motion.div>
    )
  }

  const renderAction = (action: NavigationSection['action']) => {
    if (!action) return null
    
    const Icon = action.icon ? iconMap[action.icon] : null
    
    const handleClick = () => {
      if (action.action === 'search' && onSearchTrigger) {
        onSearchTrigger()
      }
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-4 border-t border-neutral-200 mt-4"
      >
        <button
          onClick={handleClick}
          className="w-full flex items-center gap-3 p-4 bg-primary-burgundy text-white rounded-lg hover:bg-primary-burgundy/90 transition-colors group"
        >
          {Icon && <Icon className="w-5 h-5" />}
          <div className="text-left flex-1">
            <div className="font-semibold">{action.label}</div>
            <div className="text-sm text-white/80">{action.description}</div>
          </div>
        </button>
      </motion.div>
    )
  }

  const renderLinks = (section: NavigationSection) => {
    const columns = section.columns || 1
    const gridCols = columns === 3 ? 'grid-cols-3' : columns === 2 ? 'grid-cols-2' : 'grid-cols-1'
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`grid ${gridCols} gap-2`}
      >
        {section.links.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            <NavigationMenu.Link asChild>
              <Link
                to={link.href}
                className="group flex items-start gap-3 p-3 rounded-lg hover:bg-primary-burgundy/5 transition-all duration-200"
              >
                {link.icon && (
                  <div className="flex-shrink-0 text-primary-burgundy">
                    {renderIcon(link.icon)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-primary-navy group-hover:text-primary-burgundy transition-colors">
                    {link.label}
                  </div>
                  {link.description && (
                    <div className="text-xs text-neutral-600 mt-0.5 line-clamp-1">
                      {link.description}
                    </div>
                  )}
                </div>
              </Link>
            </NavigationMenu.Link>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  const renderContent = (key: string, section: NavigationSection) => {
    // Special handling for newsroom
    if (key === 'newsroom') {
      return <NewsMenu links={section.links} />
    }

    return (
      <div className="p-6">
        <div className={section.featured ? 'grid grid-cols-[2fr_1fr] gap-6' : ''}>
          <div>
            {renderLinks(section)}
            {section.action && renderAction(section.action)}
          </div>
          {section.featured && <div>{renderFeaturedCard(section.featured)}</div>}
        </div>
      </div>
    )
  }

  return (
    <NavigationMenu.Root
      value={activeValue}
      onValueChange={(value) => setActiveValue(value)}
      className="relative z-[60]"
    >
      <NavigationMenu.List className="flex items-center gap-4">
        {Object.entries(navData).map(([key, section]) => (
          <NavigationMenu.Item key={key} value={key}>
            <NavigationMenu.Trigger className="group flex items-center gap-1 text-neutral-700 hover:text-primary-burgundy transition-colors font-medium outline-none relative px-1 py-2 bg-transparent data-[state=open]:text-primary-burgundy">
              {section.label}
              <ChevronDown
                className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
              {/* Active indicator */}
              {activeValue === key && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-burgundy"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </NavigationMenu.Trigger>

            <NavigationMenu.Content className="absolute left-0 top-0 w-full">
              {/* max-w-7xl (80rem) prevents horizontal scrolling on large screens */}
              <div className="w-full max-w-7xl mx-auto bg-white backdrop-blur-md border border-neutral-200 rounded-lg shadow-corporate overflow-hidden">
                {renderContent(key, section)}
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <div className="absolute left-0 top-full w-full flex justify-start pt-2 z-[70]">
        <NavigationMenu.Viewport className="relative origin-top-left overflow-hidden bg-white rounded-lg border border-neutral-200 shadow-corporate transition-[width,height] duration-300 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  )
}
