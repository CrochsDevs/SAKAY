import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TopBar from '../layout/TopBar'
import Footer from '../layout/Footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Apple,
  Download,
  CheckCircle2,
  Star,
  Shield,
  Clock,
  Users,
  Navigation,
  Award,
  Github,
  ExternalLink
} from 'lucide-react'

// Import QR codes
import androidQr from '../assets/qrCode/image.png'
import iosQr from '../assets/qrCode/image.png'

const DownloadPage = () => {
  const [downloading, setDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState('android')

  const handleAndroidDownload = () => {
    setDownloading(true)
    const apkUrl = 'https://example.com/downloads/sakay-android.apk'
    const link = document.createElement('a')
    link.href = apkUrl
    link.download = 'sakay-android.apk'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setDownloading(false), 2000)
  }

  const handleiOSDownload = () => {
    setDownloading(true)
    const ipaUrl = 'https://example.com/downloads/sakay-ios.ipa'
    const link = document.createElement('a')
    link.href = ipaUrl
    link.download = 'sakay-ios.ipa'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setDownloading(false), 2000)
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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans">
      <TopBar />

      {/* Hero Section - MongoDB style */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Download <span className="text-grab-green">SAKAY</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get the latest version of SAKAY app for your device
            </p>
          </div>
        </div>
      </section>

      {/* Platform Tabs - MongoDB style */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="inline-flex space-x-8">
              <button
                onClick={() => setActiveTab('android')}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'android'
                    ? 'border-grab-green text-grab-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Android
              </button>
              <button
                onClick={() => setActiveTab('ios')}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'ios'
                    ? 'border-grab-green text-grab-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                iOS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Download Card - MongoDB style */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'android' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <Card className="border border-gray-200 shadow-sm overflow-hidden">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  {/* Left Side - QR Code */}
                  <CardContent className="p-8 md:p-10 bg-gray-50">
                    <motion.div variants={fadeInLeft} className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-200 mb-2">
                        <Smartphone className="w-8 h-8 text-grab-green" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Android APK
                      </h3>
                      <p className="text-sm text-gray-500">
                        Scan QR code to download
                      </p>
                      <div className="inline-block p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <img 
                          src={androidQr} 
                          alt="Android QR Code"
                          className="w-48 h-48 mx-auto"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/downloads/sakay-android.apk'
                          }}
                        />
                      </div>
                      <div className="pt-4">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-grab-green" />
                          <span>Version 2.0.1</span>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>

                  {/* Right Side - Download Info */}
                  <CardContent className="p-8 md:p-10">
                    <motion.div variants={fadeInRight} className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Download Options
                        </h4>
                        <p className="text-sm text-gray-500">
                          Choose your preferred download method
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Direct Download */}
                        <div className="p-4 border border-gray-200 rounded-xl hover:border-grab-green/30 hover:bg-grab-green/5 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-grab-green/10 rounded-lg flex items-center justify-center">
                                <Download className="w-5 h-5 text-grab-green" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">Direct Download</h5>
                                <p className="text-xs text-gray-500">APK file • 45 MB</p>
                              </div>
                            </div>
                            <Button
                              onClick={handleAndroidDownload}
                              disabled={downloading}
                              size="sm"
                              className="bg-grab-green hover:bg-grab-green/90 text-white"
                            >
                              {downloading ? 'Downloading...' : 'Download'}
                            </Button>
                          </div>
                        </div>

                        {/* GitHub Release */}
                        <div className="p-4 border border-gray-200 rounded-xl hover:border-grab-green/30 hover:bg-grab-green/5 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Github className="w-5 h-5 text-gray-700" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">GitHub Release</h5>
                                <p className="text-xs text-gray-500">Source code and releases</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-200"
                              onClick={() => window.open('https://github.com/yourusername/sakay/releases', '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <h5 className="text-sm font-medium text-gray-900 mb-3">
                          System Requirements
                        </h5>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            Android 8.0 (Oreo) and above
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            100 MB free storage
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            Internet connection required
                          </li>
                        </ul>
                      </div>

                      <div className="text-xs text-gray-400">
                        By downloading, you agree to our{' '}
                        <a href="#" className="text-grab-green hover:underline">Terms</a>
                        {' '}and{' '}
                        <a href="#" className="text-grab-green hover:underline">Privacy Policy</a>
                      </div>
                    </motion.div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'ios' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <Card className="border border-gray-200 shadow-sm overflow-hidden">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  {/* Left Side - QR Code */}
                  <CardContent className="p-8 md:p-10 bg-gray-50">
                    <motion.div variants={fadeInLeft} className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-200 mb-2">
                        <Apple className="w-8 h-8 text-gray-900" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        iOS App (IPA)
                      </h3>
                      <p className="text-sm text-gray-500">
                        Scan QR code to download
                      </p>
                      <div className="inline-block p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <img 
                          src={iosQr} 
                          alt="iOS QR Code"
                          className="w-48 h-48 mx-auto"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/downloads/sakay-ios.ipa'
                          }}
                        />
                      </div>
                      <div className="pt-4">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-grab-green" />
                          <span>Version 2.0.1</span>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>

                  {/* Right Side - Download Info */}
                  <CardContent className="p-8 md:p-10">
                    <motion.div variants={fadeInRight} className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Download Options
                        </h4>
                        <p className="text-sm text-gray-500">
                          Choose your preferred download method
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Direct Download */}
                        <div className="p-4 border border-gray-200 rounded-xl hover:border-grab-green/30 hover:bg-grab-green/5 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-grab-green/10 rounded-lg flex items-center justify-center">
                                <Download className="w-5 h-5 text-grab-green" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">Direct Download</h5>
                                <p className="text-xs text-gray-500">IPA file • 52 MB</p>
                              </div>
                            </div>
                            <Button
                              onClick={handleiOSDownload}
                              disabled={downloading}
                              size="sm"
                              className="bg-black hover:bg-gray-800 text-white"
                            >
                              {downloading ? 'Downloading...' : 'Download'}
                            </Button>
                          </div>
                        </div>

                        {/* GitHub Release */}
                        <div className="p-4 border border-gray-200 rounded-xl hover:border-grab-green/30 hover:bg-grab-green/5 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Github className="w-5 h-5 text-gray-700" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">GitHub Release</h5>
                                <p className="text-xs text-gray-500">Source code and releases</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-200"
                              onClick={() => window.open('https://github.com/yourusername/sakay/releases', '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <h5 className="text-sm font-medium text-gray-900 mb-3">
                          System Requirements
                        </h5>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            iOS 13.0 or later
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            150 MB free storage
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            Internet connection required
                          </li>
                        </ul>
                      </div>

                      <div className="text-xs text-gray-400">
                        By downloading, you agree to our{' '}
                        <a href="#" className="text-grab-green hover:underline">Terms</a>
                        {' '}and{' '}
                        <a href="#" className="text-grab-green hover:underline">Privacy Policy</a>
                      </div>
                    </motion.div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Grid - MongoDB style */}
      <section className="py-12 md:py-16 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Why choose SAKAY?
            </h2>
            <p className="text-gray-600">
              Built for Filipino commuters, designed for convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Navigation, title: 'Real-time Tracking', desc: 'Track your jeepney in real-time' },
              { icon: Clock, title: 'Book in Advance', desc: 'Reserve your seat up to 24hrs ahead' },
              { icon: Shield, title: 'Safe & Secure', desc: 'Verified drivers and secure rides' },
              { icon: Users, title: 'Community', desc: 'Join thousands of happy commuters' }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-grab-green" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Version Info - MongoDB style */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-grab-green" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Latest Version: 2.0.1</h3>
                <p className="text-sm text-gray-500">Released March 15, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-grab-green" />
                <span>Bug fixes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-grab-green" />
                <span>Performance improvements</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-grab-green" />
                <span>Enhanced tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default DownloadPage