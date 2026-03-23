import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Smartphone, Apple, HelpCircle, CheckCircle2, FileQuestion, MessageCircle, BookOpen, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"

const HelpModal = ({ isOpen, onClose }) => {
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const helpTopics = [
    {
      icon: Download,
      title: 'How to Download SAKAY',
      steps: [
        { step: '1', desc: 'Click the "Download App" button on the top bar or visit the Download page' },
        { step: '2', desc: 'Choose your device: Android (APK) or iOS (IPA)' },
        { step: '3', desc: 'Scan the QR code or click the download button' },
        { step: '4', desc: 'Once downloaded, open the file to install' },
        { step: '5', desc: 'For Android: Allow installation from unknown sources if prompted' },
        { step: '6', desc: 'For iOS: Use TestFlight or sideload using AltStore' }
      ]
    },
    {
      icon: Smartphone,
      title: 'How to Book a Ride',
      steps: [
        { step: '1', desc: 'Open the SAKAY app and log in with your account' },
        { step: '2', desc: 'Set your pickup location and destination' },
        { step: '3', desc: 'Choose from available jeepneys and select your preferred time' },
        { step: '4', desc: 'Confirm your booking and wait for driver confirmation' },
        { step: '5', desc: 'Track your jeepney in real-time' }
      ]
    },
    {
      icon: FileQuestion,
      title: 'Frequently Asked Questions',
      faqs: [
        { q: 'Is the app free?', a: 'Yes! SAKAY is completely free to download and use.' },
        { q: 'How do I become a driver?', a: 'Register as a driver in the app and submit your requirements for verification.' },
        { q: 'What if I encounter a problem?', a: 'Use the in-app report feature or email support.sakay@gmail.com' },
        { q: 'Is my data secure?', a: 'Yes, we use industry-standard encryption to protect your information.' }
      ]
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-grab-green/10 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-grab-green" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Help Center</h2>
                  <p className="text-sm text-gray-500">How can we help you today?</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6 space-y-8">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: MessageCircle, label: 'Contact Support', color: 'grab-green', action: 'contact' },
                  { icon: BookOpen, label: 'FAQs', color: 'grab-green', action: 'contact' }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (item.action === 'download') {
                        window.location.href = '/download'
                      } else if (item.action === 'contact') {
                        window.location.href = '/contact'
                      }
                    }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-grab-green/50 hover:bg-grab-green/5 transition-all"
                  >
                    <item.icon className="w-6 h-6 text-grab-green" />
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* How to Download */}
              <div className="bg-gradient-to-r from-grab-green/5 to-blue-500/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-grab-green/10 rounded-xl flex items-center justify-center">
                    <Download className="w-5 h-5 text-grab-green" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">How to Download SAKAY</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Smartphone className="w-5 h-5 text-grab-green" />
                      <span className="font-semibold text-gray-900">For Android</span>
                    </div>
                    <ol className="space-y-3">
                      {helpTopics[0].steps.slice(0, 3).map((step, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-600">
                          <span className="w-5 h-5 bg-grab-green/10 text-grab-green rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {step.step}
                          </span>
                          <span>{step.desc}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Apple className="w-5 h-5 text-gray-900" />
                      <span className="font-semibold text-gray-900">For iOS</span>
                    </div>
                    <ol className="space-y-3">
                      {helpTopics[0].steps.slice(3, 6).map((step, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-600">
                          <span className="w-5 h-5 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {step.step}
                          </span>
                          <span>{step.desc}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                  <Button
                    onClick={() => window.location.href = '/download'}
                    className="bg-grab-green hover:bg-grab-green/90 text-white"
                  >
                    Go to Download Page
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* How to Book a Ride */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-grab-green/10 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-grab-green" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">How to Book a Ride</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {helpTopics[1].steps.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-grab-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-grab-green">{step.step}</span>
                      </div>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-grab-green/10 rounded-xl flex items-center justify-center">
                    <FileQuestion className="w-5 h-5 text-grab-green" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {helpTopics[2].faqs.map((faq, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-2 text-sm">{faq.q}</p>
                      <p className="text-sm text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need More Help */}
              <div className="bg-gradient-to-r from-grab-green to-grab-dark rounded-xl p-6 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-bold mb-1">Still need help?</h4>
                    <p className="text-white/80 text-sm">Contact our support team and we'll get back to you within 24 hours</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => window.location.href = '/contact'}
                      className="bg-white text-grab-green hover:bg-gray-100"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HelpModal