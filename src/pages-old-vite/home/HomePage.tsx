import { 
  HeroSection,
  ValuePropositionSection,
  PracticeAreasSection,
  IndustriesSection,
  NewsroomSection
} from './sections'
import { TrustBar } from '@/components/marketing'
import { ImpactCounter } from '@/components/home/ImpactCounter'
import { PrestigePath } from '@/components/ui/PrestigePath'

/**
 * HomePage - Riley Bennett Egloff Homepage
 * 
 * A next-level corporate website homepage featuring:
 * - Strategic hero section with premium brand positioning
 * - Trust bar showcasing awards and recognition
 * - Value proposition highlighting big law expertise with boutique agility
 * - Comprehensive practice areas grid
 * - Industries served section
 * - Success in Motion counters
 * - Latest insights and firm news
 * - Prestige swooping path animations
 */
export function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background swooping path for narrative flow */}
      <div className="absolute inset-0 z-0">
        <PrestigePath direction="swooping" />
      </div>
      
      <div className="relative z-10">
        <HeroSection />
        <TrustBar />
        <ValuePropositionSection />
        
        {/* Practice Areas with subtle accent path */}
        <div className="relative">
          <PrestigePath direction="left-to-right" offsetY={-50} />
          <PracticeAreasSection />
        </div>
        
        <IndustriesSection />
        
        {/* Impact Counter Section */}
        <ImpactCounter />
        
        {/* Newsroom with accent path */}
        <div className="relative">
          <PrestigePath direction="right-to-left" offsetY={-50} />
          <NewsroomSection />
        </div>
      </div>
    </main>
  )
}
