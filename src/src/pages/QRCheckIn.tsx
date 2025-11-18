import React, { useState } from 'react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';
import { QrCode, CheckCircle, Fingerprint, Calendar } from 'lucide-react';
export default function QRCheckIn() {
  const {
    user
  } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInMethod, setCheckInMethod] = useState<'qr' | 'biometric' | null>(null);
  const handleQRCheckIn = () => {
    if (selectedCourse) {
      setCheckedIn(true);
      setCheckInMethod('qr');
      setTimeout(() => {
        setCheckedIn(false);
        setCheckInMethod(null);
      }, 3000);
    }
  };
  const handleBiometricCheckIn = () => {
    if (selectedCourse) {
      setCheckedIn(true);
      setCheckInMethod('biometric');
      setTimeout(() => {
        setCheckedIn(false);
        setCheckInMethod(null);
      }, 3000);
    }
  };
  const qrData = selectedCourse ? JSON.stringify({
    studentId: user?.id,
    studentName: user?.name,
    courseId: selectedCourse,
    timestamp: new Date().toISOString()
  }) : '';
  return <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">QR Check-In</h1>
        <p className="text-gray-600 mt-2">
          Mark your attendance for today's class
        </p>
      </div>
      {/* Success Message */}
      {checkedIn && <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">
                Check-in Successful!
              </h3>
              <p className="text-green-700 text-sm">
                You've been marked present via{' '}
                {checkInMethod === 'qr' ? 'QR Code' : 'Biometric'} scan
              </p>
            </div>
          </div>
        </div>}
      {/* Course Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Course
        </label>
        <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          <option value="">Choose a course...</option>
          {mockCourses.map(course => <option key={course.id} value={course.id}>
              {course.code} - {course.name}
            </option>)}
        </select>
      </div>
      {selectedCourse && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR Code Check-in */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <QrCode className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">
                QR Code Check-In
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200 mb-6">
                <QRCode value={qrData} size={200} level="H" includeMargin={true} />
              </div>
              <p className="text-sm text-gray-600 text-center mb-4">
                Show this QR code to the lecturer's scanner or scan with the
                attendance system
              </p>
              <button onClick={handleQRCheckIn} disabled={checkedIn} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                Simulate QR Scan
              </button>
            </div>
          </div>
          {/* Biometric Check-in */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Fingerprint className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Biometric Check-In
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-6 relative overflow-hidden">
                <Fingerprint className="w-32 h-32 text-purple-600 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 border-4 border-purple-600 rounded-full animate-pulse" />
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center mb-2">
                <strong>Biometric Scanner (Mocked)</strong>
              </p>
              <p className="text-sm text-gray-600 text-center mb-4">
                In production, this would interface with a fingerprint or facial
                recognition system
              </p>
              <button onClick={handleBiometricCheckIn} disabled={checkedIn} className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                Simulate Biometric Scan
              </button>
            </div>
          </div>
        </div>}
      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex gap-3">
          <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Check-In Information
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Select your course before checking in</li>
              <li>• You can use either QR code or biometric method</li>
              <li>• Check-in is recorded with timestamp</li>
              <li>• Late arrivals (after 15 minutes) are marked accordingly</li>
              <li>
                • Biometric feature is currently in mock mode for demonstration
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
}