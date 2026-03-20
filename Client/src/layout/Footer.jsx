import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Phone,
    MapPin,
    ChevronRight,
    Smartphone,
    Apple,
    Heart
} from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

                    {/* Column 1 - Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-grab-green rounded-xl flex items-center justify-center shadow-lg shadow-grab-green/20">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="font-bold text-2xl text-white">SAKAY</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            The Philippines' first all-in-one transportation app. Making commuting swabe para sa lahat ng Pilipino.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { icon: Facebook, href: '#' },
                                { icon: Twitter, href: '#' },
                                { icon: Instagram, href: '#' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 bg-slate-800 hover:bg-grab-green rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-grab-green/20 group"
                                >
                                    <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {['About Us', 'How It Works', 'For Drivers', 'Safety Tips', 'FAQs'].map((item, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-slate-400 hover:text-grab-green flex items-center gap-2 transition-colors group"
                                    >
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        <span>{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 - Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-grab-green flex-shrink-0 mt-1" />
                                <span className="text-slate-400 text-sm">
                                    123 Innovation Hub,<br />Quezon City, Metro Manila<br />Philippines 1100
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-grab-green flex-shrink-0" />
                                <span className="text-slate-400 text-sm">+63 (2) 1234 5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-grab-green flex-shrink-0" />
                                <span className="text-slate-400 text-sm">support@sakay.ph</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 - Download App */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Download App</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Available for iOS and Android. Get <span className="text-grab-green font-bold">₱50 free credits</span> on first download!
                        </p>
                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full bg-slate-800 hover:bg-slate-700 border-slate-700 text-white h-14 justify-start gap-3 hover:scale-105 transition-all"
                            >
                                <Apple className="w-6 h-6" />
                                <div className="text-left">
                                    <p className="text-xs text-slate-400">Download</p>
                                    <p className="text-base font-bold">iOS App (IPA)</p>
                                </div>
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full bg-slate-800 hover:bg-slate-700 border-slate-700 text-white h-14 justify-start gap-3 hover:scale-105 transition-all"
                            >
                                <Smartphone className="w-6 h-6" />
                                <div className="text-left">
                                    <p className="text-xs text-slate-400">Download</p>
                                    <p className="text-base font-bold">Android APK</p>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm text-center md:text-left">
                            © {currentYear} SAKAY. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-slate-400 hover:text-grab-green text-sm transition-colors"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>        
            </div>
        </footer>
    )
}

export default Footer