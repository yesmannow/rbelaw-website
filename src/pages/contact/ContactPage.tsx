import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, MapPin, Send, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react'
import { FloatingLabelInput } from '../../components/ui/FloatingLabelInput'
import { FloatingLabelTextarea } from '../../components/ui/FloatingLabelTextarea'
import { GoogleReviewsTicker } from '@/components/social'

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    // Form submission logic will be implemented here
    console.log('Form submitted:', data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert('Thank you for your message. We will be in touch soon.')
    reset()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Reception Area Image */}
      <section className="relative min-h-[400px] lg:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <picture className="absolute inset-0">
          <source srcSet="/images/hero/Riley-Bennett-Egloff-Attorneys-at-Law-Indianapolis-Reception-Area-DSC_1220-1-scaled-1.jpg" type="image/jpeg" />
          <img
            src="/images/hero/Riley-Bennett-Egloff-Attorneys-at-Law-Indianapolis-Reception-Area-DSC_1220-1-scaled-1.jpg"
            alt="Riley Bennett Egloff Reception Area"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        
        {/* Dark Overlay (match site-wide hero overlay) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/80 via-primary-navy/70 to-primary-navy/85" />
        
        {/* Content */}
        <div className="section-container relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-100 leading-relaxed max-w-3xl">
              Get in touch with our team. We're here to help you navigate your legal challenges and achieve your business goals.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Google Reviews Ticker */}
      <GoogleReviewsTicker />

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-primary-navy text-white p-8 lg:p-16 flex flex-col justify-center"
        >
          <div className="max-w-xl mx-auto w-full">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              Partner with Us.
            </h1>

            <div className="space-y-8 mb-10">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center text-white/90">
                  <MapPin className="h-5 w-5 mr-3" />
                  Address
                </h3>
                <p className="text-white/80 ml-8">
                  500 N. Meridian Street, Suite 550<br />
                  Indianapolis, IN 46204
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center text-white/90">
                  <Phone className="h-5 w-5 mr-3" />
                  Contact
                </h3>
                <div className="ml-8 space-y-1">
                  <p className="text-white/80">
                    Phone: <a href="tel:+13176368000" className="hover:text-accent-gold transition-colors">317.636.8000</a>
                  </p>
                  <p className="text-white/80">
                    Fax: 317.636.8027
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white/90">
                  Connect With Us
                </h3>
                <div className="flex space-x-4 ml-0">
                  <a
                    href="https://www.linkedin.com/company/riley-bennett-egloff-llp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-gold transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/RBELaw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-gold transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/rbelaw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-gold transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com/RBE_Law"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-gold transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <a
              href="#"
              className="inline-block px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#00115e] transition-all font-semibold rounded-sm"
            >
              Make a Payment
            </a>

            {/* Google Maps */}
            <div className="mt-10 rounded-sm overflow-hidden border-2 border-white/20">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.450661476441!2d-86.1584926!3d39.77444069999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8814adc962f52329%3A0x4fab7c1b61238f20!2sRiley%20Bennett%20Egloff%20LLP!5e0!3m2!1sen!2sus!4v1769341751012!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-64 lg:h-96"
                title="Riley Bennett Egloff LLP Location"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 lg:p-16 flex flex-col justify-center"
        >
          <div className="max-w-xl mx-auto w-full">
            <h2 className="text-3xl font-serif font-bold text-primary-burgundy mb-2">
              Get in Touch
            </h2>
            <p className="text-neutral-600 mb-8">
              Send us a message and we'll respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FloatingLabelInput
                id="name"
                type="text"
                label="Name *"
                {...register('name')}
                error={errors.name?.message}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="email"
                  type="email"
                  label="Email *"
                  {...register('email')}
                  error={errors.email?.message}
                />

                <FloatingLabelInput
                  id="phone"
                  type="tel"
                  label="Phone (Optional)"
                  {...register('phone')}
                />
              </div>

              <FloatingLabelInput
                id="company"
                type="text"
                label="Company (Optional)"
                {...register('company')}
              />

              <FloatingLabelInput
                id="subject"
                type="text"
                label="Subject *"
                {...register('subject')}
                error={errors.subject?.message}
              />

              <FloatingLabelTextarea
                id="message"
                label="Message *"
                rows={6}
                {...register('message')}
                error={errors.message?.message}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-burgundy text-white px-6 py-3 rounded-sm font-semibold hover:bg-primary-burgundy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
