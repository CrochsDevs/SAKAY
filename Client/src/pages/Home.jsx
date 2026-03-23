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
  Car,
  MapPin,
  Clock,
  ChevronRight,
  Users,
  TrendingUp,
  Shield,
  Navigation,
  Star,
  Award,
  Coins,
  Globe,
  Building2,
  CheckCircle2,
  PhoneCall
} from 'lucide-react'

import jeepneyImage from '../assets/images/image.png'

const Home = () => {
  const [downloading, setDownloading] = useState(false)

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
    const ipaUrl = 'https://example.com/downloads/sakay-ios.ipa'
    const link = document.createElement('a')
    link.href = ipaUrl
    link.download = 'sakay-ios.ipa'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setDownloading(false), 2000)
  }

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans">
      <TopBar />

      {/* Hero Section */}
      <motion.main
        initial="hidden"
        animate="visible"
        className="relative pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24"
      >

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-grab-green/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 lg:mb-32">

            {/* Left Column */}
            <motion.div
              variants={fadeInLeft}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >

              {/* Main Heading */}
              <h1 className="font-black text-gray-900 leading-[1.1]">
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl">
                  Biyaheng
                </span>
                <span className="block text-grab-green italic text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl mt-2">
                  Swabe,
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl mt-2">
                  Kahit Saan.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-xl leading-relaxed">
                A transportation app designed for Filipino commuters. Book jeepneys, track arrivals in real-time, and plan your routes efficiently.
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleiOSDownload}
                  className="bg-black hover:bg-gray-800 text-white h-14 sm:h-16 px-6 sm:px-8 rounded-xl sm:rounded-2xl flex items-center gap-3 w-full sm:w-auto text-base sm:text-lg transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <Apple className="w-6 h-6 sm:w-7 sm:h-7" />
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold leading-none opacity-80">Download for</p>
                    <p className="text-base sm:text-lg font-black leading-tight">iOS</p>
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto sm:ml-2 opacity-60" />
                </Button>

                <Button
                  onClick={handleAndroidDownload}
                  disabled={downloading}
                  className="bg-grab-green hover:bg-grab-green/90 text-white h-14 sm:h-16 px-6 sm:px-8 rounded-xl sm:rounded-2xl flex items-center gap-3 w-full sm:w-auto text-base sm:text-lg transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-70 disabled:cursor-wait"
                >
                  <Smartphone className="w-6 h-6 sm:w-7 sm:h-7" />
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold leading-none opacity-80">
                      {downloading ? 'Downloading...' : 'Download for'}
                    </p>
                    <p className="text-base sm:text-lg font-black leading-tight">
                      {downloading ? 'Please wait' : 'Android'}
                    </p>
                  </div>
                  {!downloading && <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto sm:ml-2 opacity-60" />}
                </Button>
              </div>

              {/* Contact Info */}
              <div className="flex items-center gap-4 pt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <PhoneCall className="w-4 h-4" />
                  <span>(02) 1234 5678</span>
                </div>
                <span>•</span>
                <span>support@sakay.ph</span>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              variants={fadeInRight}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center perspective-1200"
            >

              {/* Floating Stats Cards */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -top-5 left-0 hidden sm:block"
                >
                  <Card className="px-3 py-2 sm:px-4 sm:py-3 shadow-xl border-0">
                    <CardContent className="p-0 flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-grab-green/10 rounded-xl flex items-center justify-center">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-grab-green" />
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Active Users</p>
                        <p className="text-sm sm:text-lg font-bold text-gray-900">50k+</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-20 -right-5 hidden md:block"
                >
                  <Card className="px-3 py-2 sm:px-4 sm:py-3 shadow-xl border-0">
                    <CardContent className="p-0 flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Avg. Wait Time</p>
                        <p className="text-sm sm:text-lg font-bold text-gray-900">3-5 mins</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Jeepney Image */}
              <div className="animate-jeepney-arrival relative z-20">
                <div className="absolute inset-0 bg-grab-green/20 blur-3xl rounded-full scale-110" />
                <img
                  src={jeepneyImage}
                  alt="SAKAY Jeepney"
                  className="w-full max-w-[350px] xs:max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] xl:max-w-[600px] drop-shadow-2xl relative z-10"
                />
              </div>
            </motion.div>
          </div>


          {/* How It Works Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-24 sm:mt-28 lg:mt-32"
          >
            <div className="text-center mb-12">
              <Badge className="bg-grab-green/10 border-grab-green/20 text-grab-green px-4 py-2 rounded-full mb-4">
                <Star className="w-4 h-4 mr-2" />
                HOW IT WORKS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-2xl mx-auto">
                Book a jeepney in three simple steps
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  step: '01',
                  title: 'Set your location',
                  desc: 'Enter your pickup point and destination. Choose from available jeepney routes.'
                },
                {
                  step: '02',
                  title: 'Book your seat',
                  desc: 'Select your preferred time and secure your seat in advance.'
                },
                {
                  step: '03',
                  title: 'Track and ride',
                  desc: 'Monitor your jeepney in real-time and get notified when it arrives.'
                }
              ].map((item, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-grab-green/20 mb-4">{item.step}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-24 sm:mt-28 lg:mt-32"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left - Features List */}
              <div className="space-y-6">
                <div>
                  <Badge className="bg-grab-green/10 border-grab-green/20 text-grab-green px-4 py-2 rounded-full mb-4">
                    <Award className="w-4 h-4 mr-2" />
                    KEY FEATURES
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                    Everything you need for a <span className="text-grab-green">smooth</span> commute
                  </h2>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="space-y-4"
                >
                  {[
                    {
                      icon: Navigation,
                      title: 'Real-time Vehicle Tracking',
                      desc: 'Track the exact location of your jeepney and know exactly when it will arrive at your location. No more uncertain waiting times.'
                    },
                    {
                      icon: Clock,
                      title: 'Ride Booking System',
                      desc: 'Reserve your seat in advance. Avoid long queues and ensure you have a ride, especially during peak hours.'
                    },
                    {
                      icon: MapPin,
                      title: 'Route Information',
                      desc: 'View detailed route maps, designated stops, and estimated travel times before you ride. Plan your trip efficiently.'
                    },
                    {
                      icon: Building2,
                      title: 'Multiple Routes',
                      desc: 'Access jeepney routes across Metro Manila and nearby provinces. Know which jeepney to take and where to get off.'
                    }
                  ].map((feature, index) => {
                    const IconComponent = feature.icon
                    return (
                      <motion.div key={index} variants={fadeInLeft} className="flex gap-4 group">
                        <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-grab-green" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h4>
                          <p className="text-gray-600">{feature.desc}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>

              {/* Right - App Preview */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-grab-green/10 to-blue-500/10 rounded-3xl blur-3xl" />
                <Card className="relative bg-white p-6 rounded-2xl shadow-2xl border-0">
                  <CardContent className="p-0">
                    <div className="space-y-3">
                      {[
                        { location: 'Central Luzon State University', time: '2 mins', eta: '2:45 PM' },
                        { location: 'SM City Cabanatuan', time: '5 mins', eta: '2:48 PM' },
                        { location: 'Robinsons Malolos', time: '8 mins', eta: '2:51 PM' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-grab-green" />
                            <span className="text-sm font-medium">{item.location}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-grab-green">{item.time}</div>
                            <div className="text-xs text-gray-500">ETA {item.eta}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 text-center">
                        <CheckCircle2 className="w-3 h-3 inline-block text-grab-green mr-1" />
                        Live tracking available.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* For Drivers Section */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-24 sm:mt-28 lg:mt-32"
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <motion.div variants={fadeInLeft}>
                      <Badge className="bg-white/10 border-white/20 text-white px-4 py-2 rounded-full">
                        <Car className="w-4 h-4 mr-2" />
                        FOR DRIVERS
                      </Badge>
                    </motion.div>
                    <motion.h2 variants={fadeInLeft} className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      Join our growing network of jeepney drivers
                    </motion.h2>
                    <motion.p variants={fadeInLeft} className="text-gray-300 leading-relaxed">
                      Partner with SAKAY to reach more passengers, optimize your routes, and reduce idle time.
                    </motion.p>

                    <motion.div
                      variants={staggerContainer}
                      className="grid grid-cols-2 gap-6 pt-4"
                    >
                      {[
                        { value: '2,000+', label: 'Active Drivers' },
                        { value: '30%', label: 'Less Idle Time' },
                        { value: 'Free', label: 'Registration' },
                        { value: '24/7', label: 'Support' }
                      ].map((stat, index) => (
                        <motion.div key={index} variants={scaleIn}>
                          <div className="text-2xl font-bold text-grab-green">{stat.value}</div>
                          <p className="text-sm text-gray-400">{stat.label}</p>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <Button className="mt-4 bg-grab-green hover:bg-grab-green/90 text-white h-12 px-6 rounded-xl">
                        How to Apply as Driver?
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={fadeInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-grab-green/10 blur-3xl rounded-full" />
                    <Card className="relative bg-white/5 backdrop-blur-sm border-white/10">
                      <CardContent className="p-6">
                        <h3 className="text-white font-bold mb-4">Driver Requirements</h3>
                        <ul className="space-y-3 text-gray-300 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            Valid driver's license (Professional)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            LTFRB franchise / permit
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            Government-issued ID
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            Smartphone with data plan
                          </li>
                        </ul>

                        {/* Additional Info */}
                        <div className="mt-6 pt-4 border-t border-white/10">
                          <p className="text-xs text-gray-400">
                            For inquiries: drivers@sakay.ph | (02) 1234 5679
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-24 sm:mt-28 lg:mt-32 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight mb-6">
              Ready to try SAKAY?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Download the app and experience a more convenient way to commute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleiOSDownload}
                className="bg-black hover:bg-gray-800 text-white h-14 px-8 rounded-xl flex items-center gap-3 text-lg"
              >
                <Apple className="w-6 h-6" />
                <span>Download for iOS</span>
              </Button>
              <Button
                onClick={handleAndroidDownload}
                className="bg-grab-green hover:bg-grab-green/90 text-white h-14 px-8 rounded-xl flex items-center gap-3 text-lg"
              >
                <Smartphone className="w-6 h-6" />
                <span>Download for Android</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.main>

      <Footer />

      <style>{`
        @keyframes jeepney-arrival {
          0% { transform: translateX(150%) scale(0.7); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-jeepney-arrival { animation: jeepney-arrival 1.5s ease-out forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
        .perspective-1200 { perspective: 1200px; }
        @media (max-width: 640px) {
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        }
      `}</style>
    </div>
  )
}

export default Home