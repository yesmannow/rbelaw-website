import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Select } from '../ui/Select'
import { LeadCaptureModal } from '../marketing/LeadCaptureModal'

interface District {
  id: number
  name: string
  counties: string[]
  boardMember: string
  courtReporter: string
  caseCoordinator: string
  phone: string
  email: string
  color: string
}

// Data from Indiana Workers' Compensation Handbook Pages 64-65
const DISTRICTS: District[] = [
  {
    id: 1,
    name: 'District 1',
    counties: ['Lake', 'Porter', 'LaPorte', 'Starke', 'Jasper', 'Newton', 'Pulaski'],
    boardMember: 'Stacy Schnieder',
    courtReporter: 'Michelle Cunningham',
    caseCoordinator: 'Michelle Cunningham',
    phone: '(219) 462-1492',
    email: 'mcunningham@wcb.in.gov',
    color: '#3B82F6' // Blue
  },
  {
    id: 2,
    name: 'District 2',
    counties: ['St. Joseph', 'Elkhart', 'LaGrange', 'Noble', 'DeKalb', 'Steuben', 'Kosciusko', 'Marshall', 'Fulton', 'Whitley'],
    boardMember: 'Linda Hamilton',
    courtReporter: 'Denise Cox',
    caseCoordinator: 'Denise Cox',
    phone: '(574) 235-5951',
    email: 'dcox@wcb.in.gov',
    color: '#10B981' // Green
  },
  {
    id: 3,
    name: 'District 3',
    counties: ['Allen', 'Huntington', 'Wabash', 'Miami', 'Grant', 'Adams', 'Wells', 'Blackford', 'Jay'],
    boardMember: 'Sue Freeman',
    courtReporter: 'Kimberly Hoffer',
    caseCoordinator: 'Kimberly Hoffer',
    phone: '(260) 424-4345',
    email: 'khoffer@wcb.in.gov',
    color: '#F59E0B' // Amber
  },
  {
    id: 4,
    name: 'District 4',
    counties: ['Tippecanoe', 'White', 'Carroll', 'Cass', 'Howard', 'Tipton', 'Clinton', 'Warren', 'Benton', 'Fountain', 'Montgomery'],
    boardMember: 'Nicole Schuster',
    courtReporter: 'Nikki Eaton',
    caseCoordinator: 'Nikki Eaton',
    phone: '(765) 423-9633',
    email: 'neaton@wcb.in.gov',
    color: '#8B5CF6' // Purple
  },
  {
    id: 5,
    name: 'District 5',
    counties: ['Marion', 'Hamilton', 'Hancock', 'Madison', 'Delaware', 'Randolph', 'Henry', 'Wayne', 'Rush', 'Fayette', 'Union'],
    boardMember: 'Douglas Meagher',
    courtReporter: 'Marlana Haig',
    caseCoordinator: 'Marlana Haig',
    phone: '(317) 232-3808',
    email: 'mhaig@wcb.in.gov',
    color: '#EF4444' // Red
  },
  {
    id: 6,
    name: 'District 6',
    counties: ['Johnson', 'Shelby', 'Boone', 'Hendricks', 'Morgan', 'Putnam', 'Parke', 'Vermillion', 'Vigo', 'Clay', 'Owen'],
    boardMember: 'Kyle Samons',
    courtReporter: 'Cheryl Webb',
    caseCoordinator: 'Cheryl Webb',
    phone: '(317) 233-3370',
    email: 'cwebb@wcb.in.gov',
    color: '#EC4899' // Pink
  },
  {
    id: 7,
    name: 'District 7',
    counties: ['Bartholomew', 'Brown', 'Decatur', 'Jackson', 'Jennings', 'Monroe', 'Lawrence', 'Orange', 'Martin', 'Daviess', 'Greene', 'Sullivan', 'Knox'],
    boardMember: 'Frank O\'Bannon III',
    courtReporter: 'Tamara Terrell',
    caseCoordinator: 'Tamara Terrell',
    phone: '(812) 378-3828',
    email: 'tterrell@wcb.in.gov',
    color: '#14B8A6' // Teal
  },
  {
    id: 8,
    name: 'District 8',
    counties: ['Vanderburgh', 'Posey', 'Gibson', 'Pike', 'Dubois', 'Perry', 'Crawford', 'Harrison', 'Floyd', 'Clark', 'Scott', 'Washington', 'Jefferson', 'Switzerland', 'Ohio', 'Dearborn', 'Ripley', 'Franklin'],
    boardMember: 'Bert Hatfield',
    courtReporter: 'Donna Sitzman',
    caseCoordinator: 'Donna Sitzman',
    phone: '(812) 422-5874',
    email: 'dsitzman@wcb.in.gov',
    color: '#F97316' // Orange
  }
]

// Create a mapping of county names to districts
const COUNTY_TO_DISTRICT: Record<string, District> = {}
DISTRICTS.forEach(district => {
  district.counties.forEach(county => {
    COUNTY_TO_DISTRICT[county] = district
  })
})

export function DistrictMap() {
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null)
  const [searchCounty, setSearchCounty] = useState('')
  const [showLeadModal, setShowLeadModal] = useState(false)

  const allCounties = DISTRICTS.flatMap(d =>
    d.counties.map(county => ({ county, district: d }))
  ).sort((a, b) => a.county.localeCompare(b.county))

  const filteredCounties = searchCounty
    ? allCounties.filter(c =>
        c.county.toLowerCase().includes(searchCounty.toLowerCase())
      )
    : []

  const handleCountySelect = (countyData: { county: string; district: District }) => {
    setSelectedDistrict(countyData.district)
  }

  const handleDistrictSelect = (districtId: string) => {
    const district = DISTRICTS.find(d => d.id === parseInt(districtId))
    setSelectedDistrict(district || null)
  }

  const handleCountyHover = (countyName: string) => {
    const district = COUNTY_TO_DISTRICT[countyName]
    if (district) {
      setHoveredDistrict(district)
    }
  }

  const handleCountyLeave = () => {
    setHoveredDistrict(null)
  }

  const handleCountyClick = (countyName: string) => {
    const district = COUNTY_TO_DISTRICT[countyName]
    if (district) {
      setSelectedDistrict(district)
    }
  }

  // Determine which district to show in sidebar (hover takes precedence)
  const displayDistrict = hoveredDistrict || selectedDistrict

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <MapPin className="w-6 h-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">
              Indiana Workers' Comp District Locator
            </h1>
            <p className="text-neutral-600 mt-1">
              Find your Board Member, Court Reporter, and contact information by county or district
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Search Panel */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card>
            <CardHeader>
              <CardTitle>Find Your District</CardTitle>
              <CardDescription>
                Search by county name or select district
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="countySearch">Search County</Label>
                <Input
                  id="countySearch"
                  type="text"
                  placeholder="e.g., Marion"
                  value={searchCounty}
                  onChange={(e) => setSearchCounty(e.target.value)}
                />
                {searchCounty && filteredCounties.length > 0 && (
                  <div className="mt-2 max-h-48 overflow-y-auto border border-neutral-200 rounded-md">
                    {filteredCounties.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleCountySelect(item)
                          setSearchCounty('')
                        }}
                        onMouseEnter={() => handleCountyHover(item.county)}
                        onMouseLeave={handleCountyLeave}
                        className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-sm"
                      >
                        <span className="font-medium">{item.county} County</span>
                        <span className="text-neutral-500 ml-2">→ {item.district.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-neutral-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-neutral-500">Or</span>
                </div>
              </div>

              <div>
                <Label htmlFor="districtSelect">Select District</Label>
                <Select
                  id="districtSelect"
                  onChange={(e) => handleDistrictSelect(e.target.value)}
                  value={selectedDistrict?.id.toString() || ''}
                >
                  <option value="">Select a district...</option>
                  {DISTRICTS.map(district => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm">Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs">
                {DISTRICTS.map(district => (
                  <button
                    key={district.id}
                    onClick={() => setSelectedDistrict(district)}
                    onMouseEnter={() => setHoveredDistrict(district)}
                    onMouseLeave={handleCountyLeave}
                    className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center gap-2 ${
                      selectedDistrict?.id === district.id
                        ? 'bg-blue-100 text-blue-900 font-medium'
                        : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: district.color }}
                    />
                    {district.name}: {district.counties.length} counties
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Map */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <Card>
            <CardHeader>
              <CardTitle>Indiana Workers' Comp Districts</CardTitle>
              <CardDescription>
                Hover over a county to see district information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <div className="min-w-full">
                  {/* Simplified Indiana Map - County Grid */}
                  <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-1 p-4 bg-neutral-50 rounded-lg">
                    {allCounties.map(({ county, district }) => {
                      const isHovered = hoveredDistrict?.id === district.id
                      const isSelected = selectedDistrict?.id === district.id
                      const isActive = isHovered || isSelected

                      return (
                        <button
                          key={county}
                          type="button"
                          onClick={() => handleCountyClick(county)}
                          onMouseEnter={() => handleCountyHover(county)}
                          onMouseLeave={handleCountyLeave}
                          className={`
                            relative px-2 py-1.5 rounded text-xs font-medium transition-all
                            ${isActive
                              ? 'ring-2 ring-offset-2 scale-105 z-10'
                              : 'hover:ring-1 hover:ring-offset-1'
                            }
                            ${isHovered
                              ? 'ring-blue-500 shadow-lg'
                              : isSelected
                                ? 'ring-blue-300 shadow-md'
                                : 'ring-neutral-200'
                            }
                          `}
                          style={{
                            backgroundColor: isActive ? district.color : `${district.color}40`,
                            color: isActive ? 'white' : 'inherit',
                            borderColor: district.color
                          }}
                          title={`${county} County - ${district.name}`}
                        >
                          <span className="block truncate">{county}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* District Legend */}
                  <div className="mt-6 pt-4 border-t border-neutral-200">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-3">District Legend</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {DISTRICTS.map(district => (
                        <div
                          key={district.id}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div
                            className="w-4 h-4 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: district.color }}
                          />
                          <span className="text-neutral-700">{district.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* District Details Sidebar - Responsive: below map on mobile */}
      <div className="mt-6 lg:mt-0 order-3">
        <AnimatePresence mode="wait">
          {displayDistrict ? (
            <motion.div
              key={displayDistrict.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: displayDistrict.color }}
                    />
                    <CardTitle>{displayDistrict.name} Details</CardTitle>
                  </div>
                  <CardDescription>
                    Workers' Compensation Board contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-blue-900" />
                          <h4 className="font-semibold text-neutral-900">Board Member</h4>
                        </div>
                        <p className="text-lg text-neutral-900">{displayDistrict.boardMember}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-blue-900" />
                          <h4 className="font-semibold text-neutral-900">Court Reporter</h4>
                        </div>
                        <p className="text-lg text-neutral-900">{displayDistrict.courtReporter}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-blue-900" />
                          <h4 className="font-semibold text-neutral-900">Case Coordinator</h4>
                        </div>
                        <p className="text-lg text-neutral-900">{displayDistrict.caseCoordinator}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4 text-blue-900" />
                          <h4 className="font-semibold text-neutral-900">Phone</h4>
                        </div>
                        <a
                          href={`tel:${displayDistrict.phone}`}
                          className="text-lg text-blue-900 hover:underline"
                        >
                          {displayDistrict.phone}
                        </a>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-blue-900" />
                          <h4 className="font-semibold text-neutral-900">Email</h4>
                        </div>
                        <a
                          href={`mailto:${displayDistrict.email}`}
                          className="text-lg text-blue-900 hover:underline break-all"
                        >
                          {displayDistrict.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Counties List */}
                  <div className="border-t border-neutral-200 pt-6">
                    <h4 className="font-semibold text-neutral-900 mb-3">
                      Counties Covered ({displayDistrict.counties.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {displayDistrict.counties.sort().map(county => (
                        <div
                          key={county}
                          className="px-3 py-2 bg-neutral-50 rounded text-sm text-neutral-700"
                        >
                          {county} County
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <button
                      onClick={() => setShowLeadModal(true)}
                      className="text-sm text-blue-900 hover:underline"
                    >
                      Save this district information →
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> This information is sourced from the Indiana Workers' Compensation Board. Contact Riley Bennett Egloff LLP if you need assistance with a workers' compensation claim in this district.
                </p>
              </div>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="py-24 text-center">
                <MapPin className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Select a County or District
                </h3>
                <p className="text-neutral-500">
                  Use the search, dropdown, or map to find contact information for your Workers' Comp district
                </p>
              </CardContent>
            </Card>
          )}
        </AnimatePresence>
      </div>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        source="district_map"
        title="Save District Information"
        description="We'll email you the complete contact details for this district along with helpful resources."
        metadata={{
          districtId: selectedDistrict?.id,
          districtName: selectedDistrict?.name,
          boardMember: selectedDistrict?.boardMember
        }}
      />
    </div>
  )
}
