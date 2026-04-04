import React from 'react'
import { useTheme } from '../context/ThemeContext'

const cookiePolicies = () => {
  const { effectiveTheme } = useTheme()
  const isDark = effectiveTheme === 'dark'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
          Cookie Policies
        </h1>
        <div className={`rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 shadow-sm`}>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            Last updated: January 1, 2024
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            1. What Are Cookies
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            2. How We Use Cookies
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            We use cookies for various purposes including essential functionality, analytics, and personalization. Essential cookies are required for the basic functionality of our service and cannot be disabled.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            3. Types of Cookies We Use
          </h2>
          <ul className={`list-disc pl-6 ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-2`}>
            <li><strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>Essential Cookies:</strong> Required for the website to function properly.</li>
            <li><strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
            <li><strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>Preference Cookies:</strong> Remember your settings and preferences.</li>
            <li><strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>Marketing Cookies:</strong> Used to deliver relevant advertisements.</li>
          </ul>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            4. Managing Your Cookie Preferences
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website and limit your experience.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            5. Third-Party Cookies
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Some cookies are placed by third-party services that appear on our pages. We do not control these cookies and recommend reviewing the privacy policies of these third parties.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            6. Contact Us
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            If you have any questions about this Cookie Policy, please contact us through our support channels.
          </p>
        </div>
      </div>
    </div>
  )
}

export default cookiePolicies
