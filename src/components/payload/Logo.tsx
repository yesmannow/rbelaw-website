'use client'

import React from 'react'

export const Logo = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <svg
      width="300"
      height="80"
      viewBox="0 0 300 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="300" height="80" fill="transparent" />
      <text
        x="150"
        y="35"
        fontFamily="serif"
        fontSize="28"
        fontWeight="700"
        fill="#B8860B"
        textAnchor="middle"
        letterSpacing="2"
      >
        RILEY BENNETT EGLOFF
      </text>
      <text
        x="150"
        y="55"
        fontFamily="sans-serif"
        fontSize="12"
        fontWeight="400"
        fill="#0A2540"
        textAnchor="middle"
        letterSpacing="3"
      >
        L L P
      </text>
      <line x1="50" y1="62" x2="250" y2="62" stroke="#B8860B" strokeWidth="1" />
    </svg>
  </div>
)

