import { 
  HeroSection,
  ValuePropositionSection,
  PracticeAreasSection,
  IndustriesSection,
  NewsroomSection
} from './sections'
import { TrustBar } from '@/components/marketing'

/**
 * HomePage - Riley Bennett Egloff Homepage
 * 
 * A next-level corporate website homepage featuring:
 * - Strategic hero section with premium brand positioning
 * - Trust bar showcasing awards and recognition
 * - Value proposition highlighting big law expertise with boutique agility
 * - Comprehensive practice areas grid
 * - Industries served section
 * - Latest insights and firm news
 */
export function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustBar />
      <ValuePropositionSection />
      <PracticeAreasSection />
      <IndustriesSection />
      <NewsroomSection />
    </main>
  )
}
