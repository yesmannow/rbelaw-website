/**
 * About Pages Data
 * Auto-generated from scraped content
 */

import type { AboutPage } from '../types/content';

export const aboutPages: AboutPage[] = [
  {
    "id": "about-1",
    "title": "About Us",
    "slug": "about-us",
    "description": "",
    "content": [
      {
        "heading": "Riley Bennett Egloff is a mid-sized law firm with large-firm capabilities.",
        "level": "h2",
        "content": [
          "The attorneys of Indianapolis-based Riley Bennett Egloff are committed to assisting their clients in identifying their objectives, evaluating available alternatives in light of the pertinent legal environment, and aggressively pursuing those objectives.",
          "Staffing assignments are made consistent with the nature and complexity of the problem, and with due regard for both cost considerations and the client’s preferences. While acting on a client’s behalf, Riley Bennett Egloff functions as a fully-integrated firm, not merely a casual affiliation of attorneys. This ensures that the satisfaction of a client’s legal needs is never constrained by the availability or limited practice area of any one attorney."
        ]
      },
      {
        "heading": "Camaraderie",
        "level": "h2",
        "content": [
          "Our attorneys genuinely enjoy working with each other, and our clients enjoy working with us."
        ]
      },
      {
        "heading": "Community",
        "level": "h2",
        "content": [
          "We are active participants in our communities and in our profession. Our attorneys have served, and continue to serve, on the boards of dozens of organizations throughout Central Indiana.",
          "Our attorneys occupy leadership positions in the state and local bar associations, and have led and staffed a program that provides free legal advice to the underserved. Our attorneys and law clerks have also volunteered as court-appointed guardians ad litem for children in need."
        ]
      },
      {
        "heading": "Continuity",
        "level": "h2",
        "content": [
          "In an era in which both partners and associates frequently move from one law firm to another, Riley Bennett Egloff is remarkably stable."
        ]
      },
      {
        "heading": "Ethics",
        "level": "h2",
        "content": [
          "We pride ourselves on fully advising our clients, which includes not just an evaluation of the pertinent legal environment, but also ethical considerations. We endeavor to enhance our clients’ brands, in addition to their bottom lines.",
          "Our lawyers are frequently called upon to litigate cases throughout Indiana and across the country. We provide services in a number of different areas not typically found in mid-sized Indianapolis law firms."
        ]
      }
    ],
    "image": ""
  },
  {
    "id": "about-2",
    "title": "Firm History",
    "slug": "firm-history",
    "description": "",
    "content": [],
    "image": ""
  },
  {
    "id": "about-3",
    "title": "In The Community",
    "slug": "in-the-community",
    "description": "",
    "content": [],
    "image": ""
  },
  {
    "id": "about-4",
    "title": "Careers",
    "slug": "careers",
    "description": "",
    "content": [],
    "image": ""
  },
  {
    "id": "about-5",
    "title": "Fee Arrangements",
    "slug": "fee-arrangements",
    "description": "",
    "content": [],
    "image": ""
  }
];

export function getAboutPageBySlug(slug: string): AboutPage | undefined {
  return aboutPages.find(p => p.slug === slug);
}
