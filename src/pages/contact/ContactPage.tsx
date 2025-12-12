import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    practiceArea: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be implemented here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-navy text-white py-16 lg:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-primary text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl">
              Let's discuss how we can help your business succeed. Reach out to schedule a consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-serif font-semibold text-primary-navy mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  />
                </div>

                <div>
                  <label htmlFor="practiceArea" className="block text-sm font-medium text-neutral-700 mb-2">
                    Practice Area of Interest
                  </label>
                  <select
                    id="practiceArea"
                    name="practiceArea"
                    value={formData.practiceArea}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  >
                    <option value="">Select a practice area</option>
                    <option value="corporate-law">Corporate Law</option>
                    <option value="insurance-defense">Insurance Defense</option>
                    <option value="construction">Construction Law</option>
                    <option value="litigation">Business Litigation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-gold resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                  <Send className="inline ml-2 h-5 w-5" />
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-serif font-semibold text-primary-navy mb-6">
                Get in Touch
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-primary-navy mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-accent-gold mr-2" />
                    Office Location
                  </h3>
                  <p className="text-neutral-700 ml-7">
                    123 Main Street<br />
                    Kansas City, MO 64105
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary-navy mb-4 flex items-center">
                    <Phone className="h-5 w-5 text-accent-gold mr-2" />
                    Phone
                  </h3>
                  <p className="text-neutral-700 ml-7">
                    <a href="tel:+1234567890" className="hover:text-accent-gold transition-colors">
                      (123) 456-7890
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary-navy mb-4 flex items-center">
                    <Mail className="h-5 w-5 text-accent-gold mr-2" />
                    Email
                  </h3>
                  <p className="text-neutral-700 ml-7">
                    <a href="mailto:info@rbelaw.com" className="hover:text-accent-gold transition-colors">
                      info@rbelaw.com
                    </a>
                  </p>
                </div>

                <div className="bg-neutral-50 p-6 rounded-sm border border-neutral-200 mt-8">
                  <h3 className="text-lg font-semibold text-primary-navy mb-3">
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-neutral-700">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
