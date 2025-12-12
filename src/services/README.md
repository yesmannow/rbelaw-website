# Marketing Service Layer

Centralized abstraction layer for marketing and CRM integrations.

## Overview

The marketing service provides a **single point of integration** for all lead capture and marketing automation. This architecture allows you to:

- ✅ Develop and test components without API keys
- ✅ Switch between mock and real implementations instantly
- ✅ Update API endpoints without touching component code
- ✅ Maintain type safety with TypeScript
- ✅ Add new marketing tools without refactoring

## Architecture

```
┌─────────────────────────────────────────────────┐
│           Frontend Components                   │
│  (Quiz, Contact Form, Newsletter, Blog CTA)     │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│         Marketing Service Layer                 │
│         (src/services/marketingService.ts)      │
│                                                 │
│  • Type-safe interfaces                         │
│  • Environment variable configuration           │
│  • Error handling                               │
│  • Logging                                      │
└──────────────┬─────────────────┬────────────────┘
               │                 │
               ▼                 ▼
    ┌──────────────────┐  ┌──────────────┐
    │    Mailchimp     │  │ Internal CRM │
    └──────────────────┘  └──────────────┘
```

## Quick Start

### Current Setup (Mock Mode)

The service is currently in **mock mode**, which means:

- All functions work and can be called
- Data is logged to browser console
- No external API calls are made
- 1-second simulated delay for realistic UX

**Try it out:**

```typescript
import { submitLead } from '@/services/marketingService'

// This will log to console but not send data anywhere
await submitLead({
  email: 'test@example.com',
  name: 'Test User',
  source: 'quiz'
})
```

**Console output:**
```
📧 Marketing Service: Submitting lead...
Source: quiz
Data: { email: 'test@example.com', name: 'Test User' }
⚠️  Mailchimp endpoint not configured (VITE_MAILCHIMP_ENDPOINT)
⚠️  CRM endpoint not configured (VITE_CRM_ENDPOINT)
✅ Lead submission successful (simulated)
```

### Production Setup

#### Step 1: Configure Environment Variables

Create a `.env` file in your project root:

```env
# Mailchimp Configuration
VITE_MAILCHIMP_ENDPOINT=https://usX.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members
VITE_MAILCHIMP_API_KEY=your-mailchimp-api-key-here

# Internal CRM Configuration
VITE_CRM_ENDPOINT=https://your-crm-domain.com/api/leads
VITE_CRM_API_KEY=your-crm-api-key-here
```

**Note:** Replace `usX` with your Mailchimp datacenter (e.g., `us1`, `us19`).

#### Step 2: Uncomment API Code

In `src/services/marketingService.ts`, find the `submitLead` function and uncomment the API call blocks:

**Before:**
```typescript
if (MAILCHIMP_ENDPOINT) {
  console.log('🔗 Would send to Mailchimp:', MAILCHIMP_ENDPOINT)
  // await fetch(MAILCHIMP_ENDPOINT, { ... })
}
```

**After:**
```typescript
if (MAILCHIMP_ENDPOINT) {
  console.log('🔗 Sending to Mailchimp:', MAILCHIMP_ENDPOINT)
  await fetch(MAILCHIMP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_MAILCHIMP_API_KEY}`
    },
    body: JSON.stringify({
      email_address: data.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: data.name?.split(' ')[0],
        LNAME: data.name?.split(' ').slice(1).join(' '),
        PHONE: data.phone
      },
      tags: [data.source]
    })
  })
}
```

**Note:** Adjust the payload structure to match your Mailchimp/CRM API requirements.

#### Step 3: Test with Real Endpoints

```bash
npm run dev
```

Open browser console and test a form submission. You should see:

```
📧 Marketing Service: Submitting lead...
Source: contact_form
Data: { ... }
🔗 Sending to Mailchimp: https://usX.api.mailchimp.com/...
🔗 Sending to CRM: https://your-crm-domain.com/...
✅ Lead submission successful
```

## API Reference

### `submitLead(data: LeadData): Promise<boolean>`

Main function for submitting lead data to marketing systems.

**Parameters:**

```typescript
interface LeadData {
  email: string              // Required: Email address
  name?: string             // Optional: Full name
  phone?: string            // Optional: Phone number
  source: 'contact_form' | 'quiz' | 'newsletter' | 'blog_cta'  // Required: Lead source
  metadata?: Record<string, unknown>  // Optional: Additional data
}
```

**Returns:**
- `true` if submission successful
- `false` if error occurred

**Example:**

```typescript
const success = await submitLead({
  email: 'john@example.com',
  name: 'John Doe',
  phone: '(555) 123-4567',
  source: 'quiz',
  metadata: {
    incidentType: 'Personal Injury',
    incidentDate: '2024-01-15',
    hasContract: 'Yes'
  }
})

if (success) {
  console.log('Lead captured!')
}
```

---

### `subscribeNewsletter(email: string): Promise<boolean>`

Convenience function for newsletter subscriptions.

**Example:**

```typescript
await subscribeNewsletter('subscriber@example.com')
```

Equivalent to:

```typescript
await submitLead({
  email: 'subscriber@example.com',
  source: 'newsletter'
})
```

---

### `submitContactForm(data): Promise<boolean>`

Convenience function for contact form submissions.

**Parameters:**

```typescript
{
  email: string
  name: string
  phone?: string
  company?: string
  practiceArea?: string
  message: string
}
```

**Example:**

```typescript
await submitContactForm({
  email: 'client@company.com',
  name: 'Jane Smith',
  phone: '555-9876',
  company: 'Acme Corp',
  practiceArea: 'insurance-defense',
  message: 'We need help with a complex case...'
})
```

## Error Handling

The service includes built-in error handling:

```typescript
try {
  const success = await submitLead(data)
  if (success) {
    // Show success message
  } else {
    // Show error message
  }
} catch (error) {
  console.error('Marketing service error:', error)
  // Show user-friendly error
}
```

## Configuration

### Adjusting Mock Delay

Change the `MOCK_API_DELAY` constant:

```typescript
// In marketingService.ts
const MOCK_API_DELAY = 1000  // Change to 500 for faster mock, 2000 for slower
```

### Adding New Marketing Tools

To add a new service (e.g., HubSpot):

1. **Add environment variable:**
```env
VITE_HUBSPOT_ENDPOINT=https://api.hubapi.com/...
VITE_HUBSPOT_API_KEY=your-hubspot-key
```

2. **Import in service:**
```typescript
const HUBSPOT_ENDPOINT = import.meta.env.VITE_HUBSPOT_ENDPOINT
```

3. **Add API call in `submitLead`:**
```typescript
if (HUBSPOT_ENDPOINT) {
  await fetch(HUBSPOT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_HUBSPOT_API_KEY}`
    },
    body: JSON.stringify(data)
  })
}
```

## Best Practices

### ✅ DO

- Use the service for all lead capture
- Test in mock mode first
- Log important events for debugging
- Handle errors gracefully
- Validate email addresses before submission

### ❌ DON'T

- Don't make direct API calls from components
- Don't expose API keys in client code (use server-side proxy for production)
- Don't skip error handling
- Don't commit `.env` files to git

## Security Considerations

⚠️ **Important:** The current implementation exposes API keys in the client bundle. For production, consider:

1. **Server-Side Proxy**: Create an API endpoint that handles marketing submissions server-side
2. **Cloudflare Workers**: Use edge functions to proxy requests
3. **Environment Restrictions**: Use IP allowlisting or domain restrictions on API keys

**Example Server-Side Architecture:**

```
Client → Your Server API → Mailchimp/CRM
         (API keys hidden)
```

## Monitoring & Analytics

Add tracking to `submitLead`:

```typescript
export async function submitLead(data: LeadData): Promise<boolean> {
  try {
    console.log('📧 Marketing Service: Submitting lead...')
    
    // Track with analytics
    if (window.gtag) {
      window.gtag('event', 'lead_submission', {
        source: data.source,
        email_domain: data.email.split('@')[1]
      })
    }
    
    // ... rest of function
  }
}
```

## Testing

```typescript
import { submitLead } from '@/services/marketingService'

describe('Marketing Service', () => {
  it('submits lead data', async () => {
    const result = await submitLead({
      email: 'test@example.com',
      source: 'quiz'
    })
    
    expect(result).toBe(true)
  })
})
```

---

## Troubleshooting

### "API endpoint not configured" warnings

**Cause:** Environment variables not set

**Solution:** Create `.env` file with `VITE_MAILCHIMP_ENDPOINT` and `VITE_CRM_ENDPOINT`

### Submissions failing silently

**Cause:** Error being caught but not shown

**Solution:** Check browser console for error logs

### CORS errors

**Cause:** API doesn't allow browser requests

**Solution:** Use server-side proxy or configure CORS on API

---

## Roadmap

Future enhancements:

- [ ] Rate limiting
- [ ] Duplicate detection
- [ ] Offline queue with retry
- [ ] Webhook support
- [ ] A/B test integration
- [ ] GDPR consent management
