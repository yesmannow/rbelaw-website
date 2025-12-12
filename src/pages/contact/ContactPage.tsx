import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, MapPin, Send, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Label } from '../../components/ui/Label'

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
      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#00115e] text-white p-8 lg:p-16 flex flex-col justify-center"
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
                    href="https://www.linkedin.com/company/riley-bennett-egloff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-gold transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/RBELaw"
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
                    href="https://twitter.com/rbelaw"
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

            {/* Map Placeholder */}
            <div className="mt-10 rounded-sm overflow-hidden border-2 border-white/20">
              <div className="bg-white/10 backdrop-blur-sm h-64 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-white/40" />
              </div>
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
            <h2 className="text-3xl font-serif font-bold text-[#74243c] mb-2">
              Get in Touch
            </h2>
            <p className="text-neutral-600 mb-8">
              Send us a message and we'll respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company">Company (Optional)</Label>
                <Input
                  id="company"
                  type="text"
                  {...register('company')}
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  type="text"
                  {...register('subject')}
                  className={errors.subject ? 'border-red-500' : ''}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  rows={6}
                  {...register('message')}
                  className={errors.message ? 'border-red-500' : ''}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#74243c] text-white px-6 py-3 rounded-sm font-semibold hover:bg-[#5d1f34] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
