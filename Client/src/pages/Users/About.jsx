import React from 'react'
import { motion } from 'framer-motion'
import TopBar from '../../layout/TopBar'
import Footer from '../../layout/Footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Smartphone,
  Users,
  Sparkles,
  Heart,
  Target,
  Eye,
  Lightbulb,
  BookOpen,
  Mail,
  Quote,
  Shield,
} from 'lucide-react'

const About = () => {
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

  // const teamMembers = [
  //   {
  //     name: 'Lester S. Rodriguez',
  //     role: 'Project Lead & Full Stack Developer',
  //     bio: 'IT student passionate about creating solutions that improve daily commuting experiences. Leads the development and oversees the entire project.',
  //     image: null
  //   },
  //   {
  //     name: 'Marycris A. Manalang',
  //     role: 'Project Manager',
  //     bio: 'Ensures smooth project execution, manages timelines, and coordinates between team members to deliver a quality product.',
  //     image: null
  //   },
  //   {
  //     name: 'Jian Joy C. Anin',
  //     role: 'Project Developer & Designer',
  //     bio: 'Responsible for UI/UX design and frontend development. Creates intuitive interfaces that make technology accessible to everyone.',
  //     image: null
  //   }
  // ]

  // const milestones = [
  //   { year: '2024', title: 'Project Conception', description: 'Idea was born to solve commuting challenges' },
  //   { year: '2025', title: 'Research Phase', description: 'Gathered data from commuters and drivers' },
  //   { year: '2025', title: 'Prototype Development', description: 'First version of the app was developed' },
  //   { year: '2026', title: 'Beta Testing', description: 'Successfully tested with 100+ users' },
  //   { year: '2026', title: 'Official Launch', description: 'SAKAY goes live for everyone!' }
  // ]

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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-grab-green to-grab-dark bg-clip-text text-transparent">
                SAKAY
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to transform the way Filipinos commute, making every journey 
              safer, smarter, and more convenient.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <Card className="border-0 shadow-xl h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-grab-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-grab-green" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed">
                    To revolutionize the Philippine transportation system by providing a reliable, 
                    efficient, and user-friendly platform that connects commuters with jeepney drivers, 
                    reducing waiting times and enhancing the overall travel experience for every Filipino.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
            >
              <Card className="border-0 shadow-xl h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-grab-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-8 h-8 text-grab-green" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                  <p className="text-gray-600 leading-relaxed">
                    A Philippines where commuting is seamless, accessible, and stress-free for everyone, 
                    powered by technology that bridges the gap between traditional transportation and 
                    modern convenience.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="space-y-6"
            >
              <Badge className="bg-grab-green/10 text-grab-green border-grab-green/20 px-4 py-2 rounded-full">
                <BookOpen className="w-4 h-4 mr-2" />
                OUR JOURNEY
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                From an idea to a movement
              </h2>
              <p className="text-gray-600 leading-relaxed">
                SAKAY started with a simple observation: every day, thousands of Filipino commuters 
                waste hours waiting for jeepneys, unsure of when they'll arrive or if there's even space.
              </p>
              <p className="text-gray-600 leading-relaxed">
                What began as a student project at Central Luzon State University quickly grew into 
                something bigger. We realized that the challenges faced by students—long waiting times, 
                overcrowding, and unpredictable schedules—were shared by commuters all across the Philippines.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, SAKAY is a nationwide initiative dedicated to transforming the commuting experience. 
                We're building a platform that connects commuters with drivers, providing real-time tracking, 
                advance booking, and route information—all designed to make every journey smoother.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-grab-green/10 to-blue-500/10 rounded-3xl blur-3xl" />
              <Card className="relative bg-white p-8 rounded-2xl shadow-2xl border-0">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <Quote className="w-10 h-10 text-grab-green" />
                    <div className="text-2xl font-bold text-gray-900">Why "SAKAY"?</div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    "Sakay" is a Filipino word that means "to ride" or "to board." It's a term every 
                    Filipino commuter knows and uses daily. We chose this name to honor the everyday 
                    journey of millions of Filipinos—a simple word that represents the heart of what we do.
                  </p>
                  <Separator className="my-6" />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-grab-green/10 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-grab-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Made with ❤️ for every Filipino</p>
                      <p className="text-sm text-gray-500">From students to workers, from professionals to everyday commuters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              <Sparkles className="w-4 h-4 mr-2" />
              WHAT WE STAND FOR
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at SAKAY
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Heart, title: 'Compassion', desc: 'Understanding the daily struggles of commuters and drivers alike' },
              { icon: Lightbulb, title: 'Innovation', desc: 'Using technology to solve real-world transportation challenges' },
              { icon: Users, title: 'Community', desc: 'Building a platform that serves and connects people' },
              { icon: Shield, title: 'Integrity', desc: 'Ensuring safety, security, and transparency in everything we do' }
            ].map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 bg-grab-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-7 h-7 text-grab-green" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-500">{value.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Badge className="bg-grab-green/10 text-grab-green border-grab-green/20 mb-4 px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              OUR PROGRESS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Milestones
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The journey of SAKAY, from conception to launch
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 md:text-right">
                    {index % 2 === 0 && (
                      <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <div className="text-sm text-grab-green font-semibold mb-2">{milestone.year}</div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-grab-green rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    {index % 2 !== 0 && (
                      <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <div className="text-sm text-grab-green font-semibold mb-2">{milestone.year}</div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15+', label: 'Cities', icon: Building2 },
              { value: '2k+', label: 'Active Drivers', icon: Car },
              { value: '50k+', label: 'Happy Users', icon: Users },
              { value: '98%', label: 'Satisfaction Rate', icon: Star }
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-grab-green" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section> */}

      {/* Team Section - Centered for 3 members */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Badge className="bg-grab-green/10 text-grab-green border-grab-green/20 mb-4 px-4 py-2 rounded-full">
              <Users className="w-4 h-4 mr-2" />
              THE TEAM
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the Creators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals committed to improving Philippine transportation
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-grab-green/20 to-grab-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-grab-green" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-grab-green font-medium mb-2">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

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
            <h2 className="text-3xl md:text-4xl font-bold">
              Want to know more?
            </h2>
            <p className="text-xl text-white/80">
              Have questions or want to collaborate with us? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => window.location.href = '/contact'}
                className="bg-white text-grab-green hover:bg-gray-100 h-14 px-8 rounded-xl text-lg font-bold"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
              <Button 
                onClick={() => window.location.href = '/download'}
                className="bg-black text-white hover:bg-gray-800 h-14 px-8 rounded-xl text-lg font-bold"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Download the App
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About