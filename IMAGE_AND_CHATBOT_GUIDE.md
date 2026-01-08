# Image Fetching & AI Chatbot Guide

This guide explains how to use the new image fetching tool and AI chatbot for the RBE Law website.

---

## 🖼️ Image Fetching Tool

### Overview
The image fetching tool automatically downloads professional images from Unsplash, Pexels, and Pixabay, then optimizes them into multiple formats (WebP, AVIF, JPEG) for best performance.

### Setup

1. **Install Dependencies**
```bash
npm install
```

This will install:
- `sharp` - Image processing library
- `tsx` - TypeScript execution
- `dotenv` - Environment variable loading

2. **Verify API Keys**
Your `.env.local` file should have:
```bash
VITE_UNSPLASH_ACCESS_KEY="your_key_here"
VITE_PEXELS_API_KEY="your_key_here"
VITE_PIXABAY_API_KEY="your_key_here"
```

### Usage

#### Single Query Mode
Fetch specific images for a category:

```bash
# Fetch hero images
npm run fetch-images -- --query "modern law office interior" --category "hero" --count 3 --width 1920 --height 1080

# Fetch practice area images
npm run fetch-images -- --query "healthcare professional" --category "practice-areas" --width 1200 --height 800

# Fetch industry images
npm run fetch-images -- --query "construction site" --category "industries" --width 1200 --height 600

# Fetch office images
npm run fetch-images -- --query "indianapolis skyline" --category "office" --width 1200

# Fetch team images
npm run fetch-images -- --query "professional business portrait" --category "team" --width 800 --height 800
```

#### Batch Mode
Fetch all predefined images at once:

```bash
npm run fetch-images:batch
```

This will automatically fetch:
- **Hero images** (1920x1080) - Law office interiors, business meetings, Indianapolis skyline
- **Practice area images** (1200x800) - Courtrooms, healthcare, construction, insurance, employment
- **Industry images** (1200x600) - Healthcare, construction, insurance, business
- **Office images** (1200x800) - Office lobby, conference rooms, law library

### Output

Images are saved to:
```
public/images/
├── hero/
│   ├── hero-1.webp
│   ├── hero-1.avif
│   ├── hero-1.jpg
│   └── _credits.json
├── practice-areas/
│   ├── practice-area-1.webp
│   ├── practice-area-1.avif
│   └── practice-area-1.jpg
├── industries/
└── office/
```

### Image Credits

Each category folder includes a `_credits.json` file with photographer attribution:

```json
[
  {
    "filename": "hero-1",
    "photographer": "John Doe",
    "source": "unsplash",
    "url": "https://unsplash.com/@johndoe"
  }
]
```

**Important:** Always provide attribution when required by the image source.

### Using Images in Components

```tsx
// Modern approach with multiple formats
<picture>
  <source srcSet="/images/hero/hero-1.avif" type="image/avif" />
  <source srcSet="/images/hero/hero-1.webp" type="image/webp" />
  <img src="/images/hero/hero-1.jpg" alt="Law office" />
</picture>

// Or use the Picture component (create if needed)
<Picture
  src="/images/hero/hero-1"
  alt="Modern law office"
  width={1920}
  height={1080}
/>
```

### Recommended Queries

**Hero Images:**
- "modern law office interior"
- "professional business meeting"
- "indianapolis skyline sunset"
- "corporate handshake"
- "elegant office lobby"

**Practice Areas:**
- "business litigation courtroom" (Business Litigation)
- "healthcare medical professional" (Healthcare Law)
- "construction site workers" (Construction Law)
- "insurance documents professional" (Insurance Defense)
- "employment office workplace" (Employment Law)
- "bankruptcy financial documents" (Bankruptcy)

**Industries:**
- "healthcare hospital modern interior"
- "construction building crane"
- "insurance professional office"
- "business corporate meeting room"

**Office:**
- "modern law office reception"
- "professional conference room"
- "law library books"
- "office building exterior indianapolis"

---

## 🤖 AI Chatbot (RBE Law Assistant)

### Overview
The RBE Law Assistant is an AI-powered chatbot that:
- Answers visitor questions about the firm's services
- Provides general legal information
- Captures leads from interested visitors
- Schedules consultations
- Qualifies prospects

### Setup

1. **Verify OpenAI API Key**
Your `.env.local` should have:
```bash
VITE_OPENAI_API_KEY="sk-proj-..."
```

2. **Add to Your App**

In `src/App.tsx` or your main layout:

```tsx
import { RBELawAssistant } from '@/components/chat/RBELawAssistant';

function App() {
  return (
    <>
      {/* Your app content */}
      <RBELawAssistant />
    </>
  );
}
```

That's it! The chatbot will appear as a floating button in the bottom-right corner.

### Features

#### 1. **Intelligent Responses**
The chatbot knows about:
- All practice areas (Business, Insurance, Healthcare, Construction, Employment, Bankruptcy, Government)
- Firm location and contact information
- General legal processes
- When to recommend speaking with an attorney

#### 2. **Lead Capture**
Automatically prompts for contact information when:
- Visitor asks about consultations
- Visitor shows interest in hiring
- After 4-5 message exchanges
- Visitor asks to speak with someone

#### 3. **Quick Questions**
Pre-defined questions visitors can click:
- "What practice areas do you specialize in?"
- "How much does a consultation cost?"
- "Do you handle employment law cases?"
- "Can you help with a business dispute?"
- "I need help with a construction issue"

#### 4. **Professional Disclaimers**
- Clearly states it provides general information, not legal advice
- Recommends speaking with attorneys for specific matters
- Shows "Powered by AI" badge

### Customization

#### Update System Prompt

Edit `src/components/chat/RBELawAssistant.tsx`:

```tsx
const SYSTEM_PROMPT = `You are the RBE Law Assistant...
// Add or modify instructions here
`;
```

#### Change Quick Questions

```tsx
const quickQuestions = [
  "Your custom question 1",
  "Your custom question 2",
  // Add more...
];
```

#### Modify Lead Form

```tsx
// In the handleLeadSubmit function
const handleLeadSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Send to your backend/CRM
  await fetch('https://your-api.com/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadInfo)
  });
  
  // Show confirmation
};
```

### API Usage & Costs

**Model:** GPT-4o-mini (fast and cost-effective)

**Pricing (as of 2024):**
- Input: $0.15 per 1M tokens
- Output: $0.60 per 1M tokens

**Average conversation cost:** ~$0.01-0.03

**Monthly estimate (1000 conversations):** $10-30

### Best Practices

#### 1. **Security**
⚠️ **Important:** The OpenAI API key is exposed in the client code. For production:

**Option A: Use a Backend Proxy (Recommended)**
```
Client → Your Backend → OpenAI API
```

Create an API endpoint:
```typescript
// api/chat.ts (backend)
export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Server-side only
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages })
  });
  
  return response.json();
}
```

Then update the chatbot to call your endpoint:
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages })
});
```

**Option B: Use Cloudflare Workers**
```typescript
// workers/chat.ts
export default {
  async fetch(request: Request, env: Env) {
    const { messages } = await request.json();
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages })
    });
    
    return new Response(await response.text());
  }
};
```

#### 2. **Rate Limiting**
Implement rate limiting to prevent abuse:

```typescript
const [messageCount, setMessageCount] = useState(0);
const MAX_MESSAGES = 20;

const sendMessage = async (messageContent: string) => {
  if (messageCount >= MAX_MESSAGES) {
    // Show message to contact directly
    return;
  }
  
  setMessageCount(prev => prev + 1);
  // ... rest of function
};
```

#### 3. **Lead Storage**
Store leads in your CRM or database:

```typescript
const handleLeadSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Send to backend
  await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...leadInfo,
      source: 'chatbot',
      conversation: messages,
      timestamp: new Date().toISOString()
    })
  });
};
```

#### 4. **Analytics**
Track chatbot usage:

```typescript
// Track when chatbot opens
const handleOpen = () => {
  setIsOpen(true);
  
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', 'chatbot_opened');
  }
};

// Track lead captures
const handleLeadSubmit = async (e: React.FormEvent) => {
  // ... submit logic
  
  if (window.gtag) {
    window.gtag('event', 'lead_captured', {
      source: 'chatbot'
    });
  }
};
```

### Testing

1. **Start dev server:**
```bash
npm run dev
```

2. **Open browser:** http://localhost:5173

3. **Click chatbot button** in bottom-right corner

4. **Test conversations:**
   - Ask about practice areas
   - Request a consultation
   - Provide contact information

5. **Check console** for API responses and errors

### Troubleshooting

**Chatbot not appearing:**
- Verify `RBELawAssistant` is imported in your app
- Check browser console for errors
- Ensure z-index is high enough (50)

**API errors:**
- Verify `VITE_OPENAI_API_KEY` in `.env.local`
- Check API key is valid at https://platform.openai.com/api-keys
- Restart dev server after changing `.env.local`

**Slow responses:**
- Normal for first request (cold start)
- Consider using streaming responses for better UX
- Check your internet connection

**Rate limit errors:**
- OpenAI has rate limits based on your tier
- Implement request queuing
- Consider caching common responses

---

## 🚀 Next Steps

### 1. Fetch Images
```bash
# Fetch all images at once
npm run fetch-images:batch

# Or fetch specific categories
npm run fetch-images -- --query "law office" --category "hero" --width 1920 --height 1080
```

### 2. Test Chatbot
```bash
npm run dev
# Open http://localhost:5173 and click the chat button
```

### 3. Integrate Backend (Production)
- Set up API proxy for OpenAI calls
- Create lead storage endpoint
- Add analytics tracking
- Implement rate limiting

### 4. Customize
- Update system prompt for your specific needs
- Modify quick questions
- Adjust lead form fields
- Style chatbot to match brand

### 5. Monitor
- Track chatbot usage
- Monitor API costs
- Review lead quality
- Optimize prompts based on conversations

---

## 📊 Expected Results

### Image Fetching
- **Time:** 2-5 minutes for batch mode
- **Output:** 20-30 optimized images in multiple formats
- **Size savings:** 60-80% compared to original JPEGs
- **Quality:** Professional, high-resolution images

### Chatbot
- **Response time:** 1-3 seconds per message
- **Lead capture rate:** 15-25% of conversations
- **User satisfaction:** High (instant responses, 24/7 availability)
- **Cost:** ~$10-30/month for 1000 conversations

---

## 🔒 Security Checklist

- [ ] API keys stored in `.env.local` (not committed to git)
- [ ] `.env.local` added to `.gitignore`
- [ ] OpenAI API calls proxied through backend (production)
- [ ] Rate limiting implemented
- [ ] Lead data encrypted in transit
- [ ] CORS configured properly
- [ ] Input sanitization for user messages
- [ ] Error messages don't expose sensitive info

---

## 📝 License & Attribution

### Images
- Unsplash: Free to use, attribution appreciated
- Pexels: Free to use, attribution appreciated  
- Pixabay: Free to use, attribution appreciated

Always check `_credits.json` in each image folder for photographer attribution.

### Chatbot
- OpenAI API: Subject to OpenAI's terms of service
- Ensure compliance with legal advertising rules
- Include appropriate disclaimers

---

## 💡 Tips

1. **Image Optimization:** The tool creates 3 formats (AVIF, WebP, JPEG) for maximum browser compatibility
2. **Chatbot Prompts:** Test and refine the system prompt based on actual conversations
3. **Lead Quality:** Review captured leads regularly and adjust qualification questions
4. **Performance:** Monitor Lighthouse scores after adding images and chatbot
5. **Accessibility:** Ensure chatbot is keyboard-navigable and screen-reader friendly

---

**Questions?** Check the implementation files or create an issue in the repository.
