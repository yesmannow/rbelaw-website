'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

// Estate tax exemption scenarios for 2026
const SCENARIOS = [
  {
    name: '2025 Current',
    exemption: 13990000, // $13.99M
    label: '2025 Exemption',
    color: '#22c55e', // green
  },
  {
    name: '2026 Sunset',
    exemption: 7000000, // ~$7.00M (TCJA expires)
    label: '2026 Sunset (TCJA Expires)',
    color: '#ef4444', // red
  },
  {
    name: '2026 Extension',
    exemption: 15000000, // $15.00M (proposed extension)
    label: '2026 Proposed Extension',
    color: '#3b82f6', // blue
  },
]

export function EstateTaxSimulator() {
  const [estateValue, setEstateValue] = useState<string>('10000000')
  const [chartData, setChartData] = useState<any[]>([])

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatShortCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    }
    return formatCurrency(value)
  }

  const calculateTax = () => {
    const estate = parseFloat(estateValue) || 0

    const data = SCENARIOS.map((scenario) => {
      const taxableAmount = Math.max(0, estate - scenario.exemption)
      const estimatedTax = taxableAmount * 0.4 // 40% federal estate tax rate
      
      return {
        name: scenario.label,
        'Exemption Amount': scenario.exemption,
        'Taxable Amount': taxableAmount,
        'Estimated Tax (40%)': estimatedTax,
        fill: scenario.color,
      }
    })

    setChartData(data)
  }

  const handleEstateValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setEstateValue(value)
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-[#213469] flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Estate Tax Simulator - 2026 Scenarios
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Compare potential estate tax liability under different exemption scenarios
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label htmlFor="estateValue" className="block text-sm font-semibold text-gray-700 mb-2">
            Estimated Estate Value
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="estateValue"
              value={formatCurrency(parseFloat(estateValue) || 0)}
              onChange={handleEstateValueChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-lg font-semibold focus:ring-2 focus:ring-[#213469] focus:border-transparent"
              placeholder="$10,000,000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter your estimated estate value to see potential tax implications
          </p>
        </div>

        <button
          onClick={calculateTax}
          className="w-full bg-[#213469] text-white py-3 px-6 rounded-md font-semibold hover:bg-[#1a2850] transition-colors"
        >
          Calculate Tax Scenarios
        </button>
      </div>

      {/* Chart Section */}
      {chartData.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Taxable Amount Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={formatShortCurrency} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : 'N/A'}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <Legend />
                <Bar dataKey="Taxable Amount" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {chartData.map((scenario, index) => {
              const SCENARIO_COLORS = ['#22c55e', '#ef4444', '#3b82f6']
              return (
                <div
                  key={index}
                  className="p-4 bg-white border-2 rounded-lg"
                  style={{ borderColor: SCENARIO_COLORS[index] }}
                >
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">{scenario.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600">Exemption:</p>
                      <p className="font-bold text-gray-900">{formatCurrency(scenario['Exemption Amount'])}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Taxable Amount:</p>
                      <p className="font-bold text-gray-900">{formatCurrency(scenario['Taxable Amount'])}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Est. Tax (40%):</p>
                      <p className="font-bold text-red-600">{formatCurrency(scenario['Estimated Tax (40%)'])}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Key Insights */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-2">Key Insights:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>The current 2025 exemption of $13.99M is set to sunset in 2026</li>
                  <li>Without TCJA extension, the exemption drops to approximately $7M</li>
                  <li>A proposed extension could raise the exemption to $15M</li>
                  <li>Federal estate tax rate is 40% on amounts above the exemption</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal Disclaimer */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-900 leading-relaxed">
          <span className="font-semibold">Disclaimer:</span> This simulator provides educational estimates only 
          and does not constitute tax or legal advice. Estate tax liability depends on numerous factors including 
          marital status, charitable giving, state estate taxes, and available deductions. The scenarios shown are 
          subject to legislative changes. For personalized estate planning guidance, please{' '}
          <a href="/contact" className="text-[#213469] underline hover:text-[#B8860B]">
            contact our estate planning team
          </a>.
        </p>
      </div>
    </div>
  )
}
