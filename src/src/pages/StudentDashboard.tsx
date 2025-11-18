import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockCourses, mockAttendance } from '../data/mockData';
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
export default function StudentDashboard() {
  const {
    user
  } = useAuth();
  const studentAttendance = mockAttendance.filter(a => a.studentId === user?.id);
  const totalClasses = mockCourses.length * 4; // Assuming 4 sessions per course
  const attendedClasses = studentAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
  const attendanceRate = Math.round(attendedClasses / totalClasses * 100);
  const recentAttendance = studentAttendance.slice(-5).reverse();
  return <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-indigo-100">Student ID: {user?.studentId}</p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {attendedClasses}
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Classes Attended</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {attendanceRate}%
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Attendance Rate</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {mockCourses.length}
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Enrolled Courses</h3>
        </div>
      </div>
      {/* Recent Attendance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Attendance</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentAttendance.map(attendance => {
            const course = mockCourses.find(c => c.id === attendance.courseId);
            return <div key={attendance.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${attendance.status === 'present' ? 'bg-green-100' : attendance.status === 'late' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                      {attendance.status === 'present' ? <CheckCircle className="w-5 h-5 text-green-600" /> : attendance.status === 'late' ? <Clock className="w-5 h-5 text-yellow-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {course?.code} - {course?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {attendance.date} at {attendance.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${attendance.status === 'present' ? 'bg-green-100 text-green-700' : attendance.status === 'late' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 capitalize">
                      {attendance.method}
                    </p>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </div>
      {/* Enrolled Courses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Enrolled Courses</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCourses.map(course => {
            const courseAttendance = studentAttendance.filter(a => a.courseId === course.id);
            const courseRate = courseAttendance.length > 0 ? Math.round(courseAttendance.length / 4 * 100) : 0;
            return <div key={course.id} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{course.code}</h3>
                      <p className="text-sm text-gray-600">{course.name}</p>
                    </div>
                    <span className="text-lg font-bold text-indigo-600">
                      {courseRate}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Lecturer: {course.lecturer}
                  </p>
                </div>;
          })}
          </div>
        </div>
      </div>
    </div>;
}