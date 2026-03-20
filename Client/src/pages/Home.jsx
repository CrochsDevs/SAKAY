import React, { useState } from 'react'
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
  CheckCircle2
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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans">
      <TopBar />

      {/* Hero Section */}
      <main className="relative pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-grab-green/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 lg:mb-32">

            {/* Left Column */}
            <div className="space-y-8 animate-fade-in-left">

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
                The Philippines' first all-in-one transportation app. Book jeepneys, monitor real-time arrivals, and travel seamlessly across the nation.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4">
                {[
                  { value: '15+', label: 'Cities' },
                  { value: '50k+', label: 'Active Users' },
                  { value: '4.8★', label: 'App Rating' }
                ].map((stat, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <div className="w-px h-8 sm:h-12 bg-gray-200" />}
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Download Buttons - UPDATED */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleiOSDownload}
                  className="bg-black hover:bg-gray-800 text-white h-14 sm:h-16 px-6 sm:px-8 rounded-xl sm:rounded-2xl flex items-center gap-3 w-full sm:w-auto text-base sm:text-lg transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <Apple className="w-6 h-6 sm:w-7 sm:h-7" />
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold leading-none opacity-80">Download</p>
                    <p className="text-base sm:text-lg font-black leading-tight">iOS App</p>
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
                      {downloading ? 'Downloading...' : 'Download'}
                    </p>
                    <p className="text-base sm:text-lg font-black leading-tight">
                      {downloading ? 'Please wait' : 'Android APK'}
                    </p>
                  </div>
                  {!downloading && <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto sm:ml-2 opacity-60" />}
                </Button>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative flex items-center justify-center perspective-1200">

              {/* Floating Stats Cards */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                <div className="absolute -top-5 left-0 animate-float hidden sm:block">
                  <Card className="px-3 py-2 sm:px-4 sm:py-3 shadow-xl border-0">
                    <CardContent className="p-0 flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-grab-green/10 rounded-xl flex items-center justify-center">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-grab-green" />
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Daily Rides</p>
                        <p className="text-sm sm:text-lg font-bold text-gray-900">10k+</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute top-20 -right-5 animate-float-delayed hidden md:block">
                  <Card className="px-3 py-2 sm:px-4 sm:py-3 shadow-xl border-0">
                    <CardContent className="p-0 flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Avg. Wait Time</p>
                        <p className="text-sm sm:text-lg font-bold text-gray-900">3 mins</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute bottom-20 -left-5 animate-float hidden lg:block">
                  <Card className="px-3 py-2 sm:px-4 sm:py-3 shadow-xl border-0">
                    <CardContent className="p-0 flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Avg. Fare</p>
                        <p className="text-sm sm:text-lg font-bold text-gray-900">₱13-25</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
            </div>
          </div>

          {/* Stats Banner */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
            {[
              { value: '₱0', label: 'Booking Fee' },
              { value: '100%', label: 'Cashless Option' },
              { value: '24/7', label: 'Customer Support' },
              { value: '15+', label: 'Cities Nationwide' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-grab-green">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Problem Section */}
          <div className="mt-24 sm:mt-28 lg:mt-32 text-center">
            <Badge className="bg-grab-green/10 border-grab-green/20 text-grab-green px-4 py-2 rounded-full mb-4 sm:mb-6">
              <Award className="w-4 h-4 mr-2" />
              THE PROBLEM WE SOLVE
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight px-4">
              Why every Filipino needs <span className="text-grab-green">SAKAY</span>
            </h2>
          </div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {[
              {
                icon: Clock,
                title: 'Long Waiting Times',
                desc: 'Filipino commuters waste an average of 2 hours daily waiting for public transport.'
              },
              {
                icon: TrendingUp,
                title: 'Uncertain Schedules',
                desc: 'No more guessing when the next jeepney arrives. Live GPS tracking shows exact locations.'
              },
              {
                icon: Shield,
                title: 'Safety Concerns',
                desc: 'Ride with confidence. All drivers are verified, routes are tracked.'
              }
            ].map((problem, index) => {
              const IconComponent = problem.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-6 sm:p-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-grab-green/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-grab-green" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{problem.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{problem.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Solution Section */}
          <div className="mt-24 sm:mt-28 lg:mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">

              {/* Left - Features List */}
              <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
                <div>
                  <Badge className="bg-grab-green/10 border-grab-green/20 text-grab-green px-4 py-2 rounded-full mb-4">
                    <Star className="w-4 h-4 mr-2" />
                    HOW IT WORKS
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Your complete <span className="text-grab-green">transportation</span> companion
                  </h2>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {[
                    { icon: Navigation, title: 'Real-time Jeepney Tracking', desc: 'See exactly where your jeepney is and when it will arrive.' },
                    { icon: Clock, title: 'Advance Booking', desc: 'Reserve your seat hours or even days ahead.' },
                    { icon: Coins, title: 'Cashless Payments', desc: 'Pay via GCash, Maya, or credit card.' },
                    { icon: Building2, title: 'Nationwide Coverage', desc: 'From Metro Manila to provinces.' }
                  ].map((feature, index) => {
                    const IconComponent = feature.icon
                    return (
                      <div key={index} className="flex gap-3 sm:gap-4 group">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-grab-green/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-grab-green" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{feature.title}</h4>
                          <p className="text-sm sm:text-base text-gray-600">{feature.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="bg-grab-green hover:bg-grab-green/90 text-white h-11 sm:h-12 px-5 sm:px-6 rounded-xl text-sm sm:text-base">
                    Learn More
                  </Button>
                  <Button variant="outline" className="h-11 sm:h-12 px-5 sm:px-6 rounded-xl border-gray-300 text-sm sm:text-base">
                    Watch Demo
                  </Button>
                </div>
              </div>

              {/* Right - Live Tracking Preview */}
              <div className="relative px-4 sm:px-0">
                <div className="absolute inset-0 bg-gradient-to-br from-grab-green/20 to-blue-500/20 rounded-3xl blur-3xl" />
                <Card className="relative bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border-0">
                  <CardContent className="p-0">
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        { location: 'Central Luzon State University', time: '2 mins' },
                        { location: 'SM City Cabanatuan', time: '5 mins' },
                        { location: 'Robinsons Malolos', time: '8 mins' },
                        { location: 'San Jose City Terminal', time: '12 mins' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-grab-green" />
                            <span className="text-xs sm:text-sm font-medium">{item.location}</span>
                          </div>
                          <Badge variant="secondary" className="bg-grab-green/10 text-grab-green text-xs sm:text-sm">
                            {item.time}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                      <p className="text-xs sm:text-sm text-gray-500 text-center">
                        <CheckCircle2 className="w-4 h-4 inline-block text-grab-green mr-1" />
                        Live tracking available in 15+ cities nationwide
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* For Drivers Section */}
          <div className="mt-24 sm:mt-28 lg:mt-32">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-4 sm:space-y-6">
                    <Badge className="bg-white/10 border-white/20 text-white px-4 py-2 rounded-full">
                      <Car className="w-4 h-4 mr-2" />
                      FOR JEEPNEY DRIVERS
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                      More passengers, <span className="text-grab-green">less waiting</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      Join thousands of drivers who increased their daily earnings by up to 40% with SAKAY.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4">
                      {[
                        { value: '40%', label: 'Higher earnings' },
                        { value: '0', label: 'Dead time' },
                        { value: '100%', label: 'Free registration' },
                        { value: '24/7', label: 'Support' }
                      ].map((stat, index) => (
                        <div key={index}>
                          <div className="text-xl sm:text-2xl font-bold text-grab-green">{stat.value}</div>
                          <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <Button className="mt-4 bg-grab-green hover:bg-grab-green/90 text-white h-12 sm:h-14 px-6 sm:px-8 rounded-xl text-sm sm:text-base">
                      Register as Driver
                    </Button>
                  </div>

                  {/* Earnings Comparison */}
                  <div className="relative mt-6 lg:mt-0">
                    <div className="absolute inset-0 bg-grab-green/20 blur-3xl rounded-full" />
                    <Card className="relative bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-4 sm:p-6">
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-gray-300">Daily earnings before SAKAY</span>
                            <span className="text-sm sm:text-base font-bold text-white">₱800</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-gray-300">Daily earnings with SAKAY</span>
                            <span className="text-base sm:text-lg font-bold text-grab-green">₱1,120</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                            <div className="w-[40%] h-full bg-grab-green rounded-full" />
                          </div>
                          <p className="text-xs sm:text-sm text-gray-300 text-center mt-2">
                            Average 40% increase in earnings
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Final CTA - UPDATED */}
          <div className="mt-24 sm:mt-28 lg:mt-32 text-center px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight mb-4 sm:mb-6">
              Ready to experience the <span className="text-grab-green">swabe</span> way to commute?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10">
              Join 50,000+ Filipinos who already switched to SAKAY. Download now and get <span className="font-bold text-grab-green">₱50 free credits!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                onClick={handleiOSDownload}
                className="bg-black hover:bg-gray-800 text-white h-14 sm:h-16 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg"
              >
                <Apple className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Download iOS</span>
              </Button>
              <Button
                onClick={handleAndroidDownload}
                className="bg-grab-green hover:bg-grab-green/90 text-white h-14 sm:h-16 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg"
              >
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Download Android APK</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

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
        @keyframes fade-in-left {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-jeepney-arrival { animation: jeepney-arrival 1.5s ease-out forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
        .animate-fade-in-left { animation: fade-in-left 1s ease-out forwards; }
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