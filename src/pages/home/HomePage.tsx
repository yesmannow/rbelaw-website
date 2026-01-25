import { 
  HeroSection,
  ValuePropositionSection,
  PracticeAreasSection,
  NewsroomSection,
  WhoWeAreSection
} from './sections'
import { TrustBar } from '@/components/marketing'
import { AttorneyCarousel } from '@/components/home/AttorneyCarousel'
import { ImpactCounter } from '@/components/home'
import { PrestigePath } from '@/components/ui/PrestigePath'
import { HomePageSEO } from '@/components/seo/SEO'

/**
 * HomePage - Riley Bennett Egloff Homepage
 * 
 * A next-level corporate website homepage featuring:
 * - Strategic hero section with premium brand positioning
 * - Trust bar showcasing awards and recognition
 * - Value proposition highlighting big law expertise with boutique agility
 * - Comprehensive practice areas grid
 * - Success in Motion counters
 * - Latest insights and firm news
 * - Prestige swooping path animations
 */
export function HomePage() {
  return (
    <>
      <HomePageSEO />
      <main className="min-h-screen relative overflow-hidden">
        {/* Background swooping path for narrative flow */}
        <div className="absolute inset-0 z-0">
          <PrestigePath direction="swooping" />
        </div>

        <div className="relative z-10">
          <HeroSection />

          {/* Above-the-fold trust proof */}
          <TrustBar />

          <ValuePropositionSection />

          {/* Who We Are / Who We Help / What We Do */}
          <WhoWeAreSection />

          {/* Credibility metrics */}
          <ImpactCounter />

          {/* Practice Areas with subtle accent path */}
          <div className="relative">
            <PrestigePath direction="left-to-right" offsetY={-50} />
            <PracticeAreasSection />
          </div>

          {/* Attorney Carousel */}
          <AttorneyCarousel />

          {/* Newsroom with accent path */}
          <div className="relative">
            <PrestigePath direction="right-to-left" offsetY={-50} />
            <NewsroomSection />
          </div>
        </div>
      </main>
    </>
  )
}
