"use client"

import Image from "next/image"
import { ShieldCheck, ArrowRight } from "lucide-react"

export default function ParentVerificationPage() {
  const handleDigiLockerAuth = () => {
    // Replace with your DigiLocker client_id and redirect_uri
    const client_id = "YOUR_DIGILOCKER_CLIENT_ID"
    const redirect_uri = "YOUR_REDIRECT_URI"
    const authUrl = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=xyz`
    window.location.href = authUrl
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        {/* DigiLocker Image */}
        <div className="flex justify-center mb-4">
          <Image
            src="/digilocker.jpeg"
            alt="DigiLocker"
            width={120}
            height={60}
            className="rounded"
            priority
          />
        </div>
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck className="h-12 w-12 text-blue-600 mb-2" />
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Parent Verification</h2>
          <p className="text-gray-500 text-center">
            Securely verify your identity using DigiLocker to access parent features.
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-blue-900 text-sm">
          <strong>Why DigiLocker?</strong> <br />
          DigiLocker allows you to share government-issued documents (Aadhaar, PAN, etc.) securely and instantly. Your privacy is our priority.
        </div>
        <button
          onClick={handleDigiLockerAuth}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
        >
          <span>Verify with DigiLocker</span>
          <ArrowRight className="h-5 w-5" />
        </button>
        <p className="text-xs text-gray-400 mt-4 text-center">
          You will be redirected to DigiLocker for authentication.
        </p>
      </div>
    </div>
  )
}