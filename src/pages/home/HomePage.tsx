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
    <main className="min-h-screen relative">
      <HeroSection />
      <TrustBar />
      <ValuePropositionSection />
      
      {/* Swooping path between sections */}
      <div className="relative">
        <PrestigePath direction="left-to-right" offsetY={-50} />
        <PracticeAreasSection />
      </div>
      
      <IndustriesSection />
      
      {/* Impact Counter Section */}
      <ImpactCounter />
      
      {/* Another swooping path */}
      <div className="relative">
        <PrestigePath direction="right-to-left" offsetY={-50} />
        <NewsroomSection />
      </div>
    </main>
  )
}
