import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TopBar from '../layout/TopBar'
import Footer from '../layout/Footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Headphones,
  Globe,
  Heart,
  Sparkles
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1500)
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@sakay.ph',
      subDetails: 'inquiries@sakay.ph',
      action: 'mailto:support@sakay.ph',
      color: 'grab-green'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+63 (2) 1234 5678',
      subDetails: '+63 917 123 4567',
      action: 'tel:+63212345678',
      color: 'grab-green'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Innovation Hub',
      subDetails: 'Quezon City, Metro Manila, Philippines 1100',
      action: 'https://maps.google.com',
      color: 'grab-green'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: 'Monday - Friday: 8:00 AM - 8:00 PM',
      subDetails: 'Saturday: 9:00 AM - 6:00 PM',
      action: null,
      color: 'grab-green'
    }
  ]

  const faqs = [
    {
      question: 'How do I book a ride?',
      answer: 'Simply open the app, enter your pickup and drop-off location, select your preferred time, and confirm your booking. You\'ll receive a confirmation once a driver accepts your request.'
    },
    {
      question: 'Is SAKAY available in my city?',
      answer: 'SAKAY is currently available in 15+ cities across Metro Manila and nearby provinces. We\'re expanding to more areas soon! Check the app for the latest coverage.'
    },
    {
      question: 'How do I become a driver?',
      answer: 'Download the app, select "Driver Registration" during sign-up, and submit the required documents (driver\'s license, OR/CR, franchise). Our team will review and approve your application within 3-5 business days.'
    },
    {
      question: 'What if I encounter a problem?',
      answer: 'Use the in-app report feature or email us at support@sakay.ph. Our support team is available 24/7 to assist you.'
    }
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans">
      <TopBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-grab-green/5 via-white to-blue-500/5">
        <div className="absolute inset-0 bg-grid-gray-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="bg-grab-green/10 text-grab-green border-grab-green/20 mb-6 px-4 py-2 rounded-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              GET IN TOUCH
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Contact{' '}
              <span className="bg-gradient-to-r from-grab-green to-grab-dark bg-clip-text text-transparent">
                SAKAY
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions, feedback, or want to partner with us? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-grab-green" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-sm text-gray-600">{info.details}</p>
                      <p className="text-sm text-gray-500 mt-1">{info.subDetails}</p>
                      {info.action && (
                        <Button
                          variant="link"
                          className="mt-3 text-grab-green hover:text-grab-dark p-0 h-auto"
                          onClick={() => window.open(info.action, '_blank')}
                        >
                          Contact Now →
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                    <p className="text-gray-600">We'll get back to you within 24 hours</p>
                  </div>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-grab-green/10 border border-grab-green/20 rounded-xl p-6 text-center"
                    >
                      <CheckCircle2 className="w-12 h-12 text-grab-green mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Message Sent!</h3>
                      <p className="text-gray-600">Thank you for reaching out. We'll respond shortly.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Juan Dela Cruz"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="juan@sakay.ph"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="How can we help you?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-gray-700">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your question, feedback, or concern..."
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="mt-1 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-grab-green hover:bg-grab-green/90 text-white h-12 rounded-xl"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Social */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="space-y-6"
            >
              {/* Map Card */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-64 bg-gray-200 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1930.425150701158!2d121.07577277586479!3d14.666971686632926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7b3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sQuezon%20City%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="SAKAY Location Map"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-grab-green" />
                      <span className="text-sm text-gray-600">123 Innovation Hub, Quezon City, Metro Manila</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect with us</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: Facebook, name: 'Facebook', url: 'https://facebook.com/sakayph', color: 'bg-blue-600' },
                      { icon: Twitter, name: 'Twitter', url: 'https://twitter.com/sakayph', color: 'bg-sky-500' },
                      { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/sakayph', color: 'bg-pink-600' },
                      { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com/company/sakayph', color: 'bg-blue-700' },
                      { icon: MessageCircle, name: 'Messenger', url: 'https://m.me/sakayph', color: 'bg-blue-500' }
                    ].map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="flex-1 sm:flex-none border-gray-200 hover:border-grab-green hover:bg-grab-green/5"
                        onClick={() => window.open(social.url, '_blank')}
                      >
                        <social.icon className="w-4 h-4 mr-2 text-grab-green" />
                        {social.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Badge className="bg-grab-green/10 text-grab-green border-grab-green/20 mb-4 px-4 py-2 rounded-full">
              <Headphones className="w-4 h-4 mr-2" />
              FREQUENTLY ASKED QUESTIONS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Got questions? We've got answers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about SAKAY
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-8"
          >
            <p className="text-gray-500">
              Still have questions?{" "}
              <a href="mailto:support@sakay.ph" className="text-grab-green hover:underline font-medium">
                Email our support team
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-grab-green to-grab-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <Heart className="w-12 h-12 mx-auto text-white/80" />
            <h2 className="text-3xl md:text-4xl font-bold">
              We're here to help
            </h2>
            <p className="text-xl text-white/80">
              Whether you're a commuter, driver, or potential partner, we'd love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => window.location.href = '/download'}
                className="bg-white text-grab-green hover:bg-gray-100 h-14 px-8 rounded-xl text-lg font-bold"
              >
                <Mail className="w-5 h-5 mr-2" />
                Download the App
              </Button>
              <Button 
                onClick={() => window.location.href = '/features'}
                className="bg-black text-white hover:bg-gray-800 h-14 px-8 rounded-xl text-lg font-bold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Explore Features
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact