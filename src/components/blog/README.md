# Blog Components

Interactive components designed to enhance blog engagement and capture leads from article readers.

## StickyAuthorCTA

A scroll-triggered sticky popup that appears when a reader has engaged with 75% of a blog post, prompting them to contact the author.

### Features

- **Smart Triggering**: Appears only after user scrolls 75% through the article
- **Scroll Performance**: Throttled scroll event handler (100ms) for optimal performance
- **Dismissible**: Users can close the popup if not interested
- **Pre-filled Context**: Contact modal opens with article title and author context
- **Smooth Animations**: Framer Motion spring animations for natural feel
- **Mobile Optimized**: Positioned bottom-right, respects mobile screen sizes

### Usage

```tsx
import { StickyAuthorCTA } from '@/components/blog/StickyAuthorCTA'

function BlogArticle() {
  const [showContactModal, setShowContactModal] = useState(false)

  const handleContactClick = () => {
    setShowContactModal(true)
    // Or integrate with your contact modal system
  }

  return (
    <article>
      {/* Your blog content */}
      
      <StickyAuthorCTA
        articleTitle="Understanding Insurance Dispute Resolution"
        authorName="Riley Bennett Egloff"
        authorEmail="contact@rbelaw.com"
        onContactClick={handleContactClick}
      />
    </article>
  )
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleTitle` | `string` | Yes | Title of the article being read |
| `authorName` | `string` | Yes | Full name of the article author |
| `authorEmail` | `string` | No | Email address (fallback if no custom handler) |
| `onContactClick` | `() => void` | No | Custom handler for contact button click |

### Behavior

1. **Before 75%**: Component is hidden
2. **At 75%**: Popup slides in from bottom-right with spring animation
3. **User scrolls back up**: Popup slides out
4. **User dismisses**: Popup is permanently hidden for that session
5. **Contact clicked**: Fires `onContactClick` or opens email client

### Customization

#### Change Trigger Percentage

```tsx
// Modify in StickyAuthorCTA.tsx, line ~35
if (scrollPercent >= 75 && !isVisible) {
  setIsVisible(true)
}

// Change 75 to your desired percentage
if (scrollPercent >= 50 && !isVisible) {
  setIsVisible(true)
}
```

#### Change Throttle Delay

```tsx
// Modify in StickyAuthorCTA.tsx, line ~42
scrollTimeout = setTimeout(() => {
  // ...
}, 100) // Change 100ms to your desired delay
```

#### Change Position

The component uses Tailwind classes `bottom-6 right-6`. Modify these in the component:

```tsx
// Change from bottom-right to bottom-left
className="fixed bottom-6 left-6 z-50 max-w-sm"
```

### Integration with Marketing Service

When integrated with a contact form, ensure it submits to the marketing service:

```tsx
import { submitLead } from '@/services/marketingService'

const handleContactClick = () => {
  // Show contact modal
  setShowContactModal(true)
  
  // On form submit:
  await submitLead({
    email: formData.email,
    name: formData.name,
    source: 'blog_cta',
    metadata: {
      articleTitle: 'Understanding Insurance Dispute Resolution',
      authorName: 'Riley Bennett Egloff'
    }
  })
}
```

### Performance Notes

- Scroll events are throttled to 100ms intervals
- Uses `passive: true` for scroll listener (non-blocking)
- Cleanup function removes event listener on unmount
- Framer Motion uses GPU acceleration for transforms

### Accessibility

- Dismiss button has `aria-label="Dismiss"`
- Contact button has clear, actionable text
- Respects reduced motion preferences (via Framer Motion)
- High contrast between text and background

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Gracefully degrades if Framer Motion not supported

---

## Future Blog Components

Potential additions to this directory:

- `RelatedArticles.tsx` - Shows related posts based on category
- `ShareButtons.tsx` - Social sharing with tracking
- `ReadingProgress.tsx` - Visual progress bar for articles
- `NewsletterInline.tsx` - Inline newsletter signup within articles
- `CommentSection.tsx` - Integrated commenting system
