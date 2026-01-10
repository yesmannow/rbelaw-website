# API Keys Configuration Guide

This document provides detailed instructions for obtaining and configuring API keys used by the RBE Law website.

## Overview

The website uses two external APIs for legal intelligence features:

1. **CourtListener API** - Fetches Indiana Supreme Court and Court of Appeals opinions
2. **Regulations.gov API** - Fetches healthcare compliance alerts from CMS

Both APIs are optional - the website will function without them, but the legal intelligence widgets will not display data.

---

## CourtListener API Key

### What It's Used For

The CourtListener API provides access to Indiana court opinions, which are displayed in the legal intelligence widgets on the website.

### How to Obtain

1. **Create an Account**
   - Visit [CourtListener's website](https://www.courtlistener.com/)
   - Sign up for a free account if you haven't already

2. **Access Your Profile**
   - Once logged in, navigate to your profile page
   - Look for the "API" or "API Tokens" section

3. **Generate API Token**
   - On your profile page, locate the section for API tokens
   - Click "Generate New Token" or similar button
   - Copy the generated token

### Configuration

Add the token to your environment variables:

```env
COURTLISTENER_API_KEY=your_api_token_here
```

### API Details

- **Base URL**: `https://www.courtlistener.com/api/rest/v3/`
- **Authentication**: Token-based (sent in `Authorization: Token <your_key>` header)
- **Rate Limits**: Free tier has rate limits - responses are cached for 12 hours
- **Documentation**: [CourtListener API Documentation](https://www.courtlistener.com/api/)

### Current Implementation

The website uses this API to fetch:
- Indiana Supreme Court opinions (`court=ind`)
- Indiana Court of Appeals opinions (`court=indctapp`)
- Ordered by filing date (most recent first)
- Limited to 5 most recent precedential opinions

**Code Location**: `src/app/actions/legal-intelligence.ts` - `getIndianaOpinions()`

---

## Regulations.gov API Key

### What It's Used For

The Regulations.gov API provides access to federal regulations and proposed rules, specifically CMS (Centers for Medicare & Medicaid Services) healthcare compliance alerts.

### How to Obtain

1. **Visit the API Registration Page**
   - Navigate to the Regulations.gov API registration page on the GSA's Open Technology website:
   - [GSA Open Technology - Regulations.gov API](https://open.gsa.gov/api/regulationsgov/)

2. **Complete the Registration Form**
   - Fill out the required fields:
     - First name
     - Last name
     - Email address
   - Submit the form

3. **Receive Your API Key**
   - After submitting, you will receive an email containing your unique API key
   - **Important**: Check your inbox, spam, and junk folders
   - The email may take a few minutes to arrive

4. **Additional Steps for Comment Submission** (Optional)
   - If you plan to use the API for submitting comments (not currently implemented):
     - Contact the Regulations.gov Help Desk
     - Provide the first five digits of your API key
     - Provide your organization's name, full address, phone number, tax ID, and registration email
     - Wait for authorization notification

### Configuration

Add the key to your environment variables:

```env
REGULATIONS_GOV_API_KEY=your_api_key_here
```

### API Details

- **Base URL**: `https://api.regulations.gov/v4/`
- **Authentication**: API key (sent in `X-Api-Key` header)
- **Rate Limits**: Check current limits in API documentation
- **Documentation**: [Regulations.gov API Documentation](https://open.gsa.gov/api/regulationsgov/)

### Current Implementation

The website uses this API to fetch:
- CMS (Centers for Medicare & Medicaid Services) documents
- Proposed Rule document types
- Sorted by posted date (most recent first)
- Limited to 10 most recent documents

**Code Location**: `src/app/actions/legal-intelligence.ts` - `getHealthcareComplianceAlerts()`

---

## Environment Variable Setup

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your API keys to `.env.local`:
   ```env
   COURTLISTENER_API_KEY=your_courtlistener_token_here
   REGULATIONS_GOV_API_KEY=your_regulations_gov_key_here
   ```

3. Restart your development server

### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - `COURTLISTENER_API_KEY` = your token
   - `REGULATIONS_GOV_API_KEY` = your key
4. Select the environments (Production, Preview, Development) where you want these variables available
5. Redeploy your application

---

## Testing API Keys

### Test CourtListener API

You can test your CourtListener API key using curl:

```bash
curl -H "Authorization: Token YOUR_API_KEY" \
  "https://www.courtlistener.com/api/rest/v3/search/?court=ind&order_by=dateFiled%20desc&type=o&page_size=1"
```

### Test Regulations.gov API

You can test your Regulations.gov API key using curl:

```bash
curl -H "X-Api-Key: YOUR_API_KEY" \
  "https://api.regulations.gov/v4/documents?filter[agencyId]=CMS&filter[documentType]=Proposed%20Rule&page[size]=1"
```

---

## Troubleshooting

### API Key Not Working

1. **Verify the key is set correctly**
   - Check for extra spaces or quotes in your `.env` file
   - Ensure the variable name matches exactly (case-sensitive)

2. **Check API key validity**
   - CourtListener: Log into your account and verify the token is still active
   - Regulations.gov: Check your email for any notifications about key deactivation

3. **Review rate limits**
   - Both APIs have rate limits on free tiers
   - The website caches responses for 12 hours to minimize API calls

4. **Check server logs**
   - Look for API error messages in your server console
   - Common errors:
     - `401 Unauthorized` - Invalid API key
     - `429 Too Many Requests` - Rate limit exceeded
     - `403 Forbidden` - API key not authorized for this endpoint

### Widgets Not Showing Data

1. **API keys are optional** - Widgets will gracefully handle missing keys
2. **Check browser console** - Look for warnings about missing API keys
3. **Verify environment variables** - Ensure they're set in the correct environment
4. **Wait for cache refresh** - Data is cached for 12 hours, so new data may not appear immediately

---

## Security Best Practices

1. **Never commit API keys to version control**
   - Always use `.env.local` for local development
   - Ensure `.env.local` is in `.gitignore`

2. **Use different keys for development and production**
   - This allows you to track usage separately
   - Prevents production issues if a dev key is compromised

3. **Rotate keys periodically**
   - Generate new keys every 6-12 months
   - Update them in all environments simultaneously

4. **Monitor API usage**
   - Check your account dashboards for unusual activity
   - Set up alerts if available

---

## Support

- **CourtListener**: [Contact CourtListener Support](https://www.courtlistener.com/contact/)
- **Regulations.gov**: [Regulations.gov Help Desk](https://www.regulations.gov/help)

---

## Related Files

- Environment variables: `.env.example`
- API implementation: `src/app/actions/legal-intelligence.ts`
- Build health check: `scripts/vercel-build-health.mjs`
