import React from 'react'
import { useTheme } from '../context/ThemeContext'

const privacyPolicies = () => {
  const { effectiveTheme } = useTheme()
  const isDark = effectiveTheme === 'dark'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
          Privacy Policies
        </h1>
        <div className={`rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 shadow-sm`}>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            Last updated: January 1, 2024
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            1. Information We Collect
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            We collect information you provide directly to us, including when you create an account, use our services, contact us for support, or communicate with us. This may include your name, email address, phone number, and location data.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            2. How We Use Your Information
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you technical notices and support messages, and to communicate with you about products, services, and events.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            3. Information Sharing
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            We do not sell your personal information. We may share your information with service providers, partners, and third parties who perform services on our behalf, or when required by law.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            4. Data Security
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            5. Your Rights
          </h2>
          <ul className={`list-disc pl-6 ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-2`}>
            <li><strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>Deletion:</strong> Request deletion of your personal data under certain conditions.</li>
            <li><strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>Portability:</strong> Request transfer of your data in a machine-readable format.</li>
          </ul>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            6. Data Retention
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            7. Children's Privacy
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            8. Changes to This Policy
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            9. Contact Us
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            If you have any questions about this Privacy Policy, please contact us through our support channels.
          </p>
        </div>
      </div>
    </div>
  )
}

export default privacyPolicies
