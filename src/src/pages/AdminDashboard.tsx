import React from 'react';
import { mockUsers, mockCourses, mockAttendance } from '../data/mockData';
import { Users, BookOpen, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
export default function AdminDashboard() {
  const students = mockUsers.filter(u => u.role === 'student');
  const totalStudents = students.length;
  const totalCourses = mockCourses.length;
  const totalSessions = mockCourses.length * 4;
  const totalAttendance = mockAttendance.length;
  const averageAttendance = Math.round(totalAttendance / (totalStudents * totalSessions) * 100);
  // Calculate attendance by course
  const courseStats = mockCourses.map(course => {
    const courseAttendance = mockAttendance.filter(a => a.courseId === course.id);
    const attendanceRate = Math.round(courseAttendance.length / (totalStudents * 4) * 100);
    return {
      ...course,
      attendanceCount: courseAttendance.length,
      attendanceRate
    };
  });
  // Recent attendance activity
  const recentActivity = mockAttendance.slice(-8).reverse();
  return <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">CS Department Attendance Overview</p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {totalStudents}
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Total Students</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {totalCourses}
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Active Courses</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {totalAttendance}
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Total Check-ins</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {averageAttendance}%
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Avg. Attendance</h3>
        </div>
      </div>
      {/* Course Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Course Attendance Statistics
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {courseStats.map(course => <div key={course.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {course.code} - {course.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Lecturer: {course.lecturer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">
                      {course.attendanceRate}%
                    </p>
                    <p className="text-sm text-gray-600">
                      {course.attendanceCount} check-ins
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{
                width: `${course.attendanceRate}%`
              }} />
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Attendance Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {recentActivity.map(attendance => {
            const student = students.find(s => s.id === attendance.studentId);
            const course = mockCourses.find(c => c.id === attendance.courseId);
            return <div key={attendance.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <img src={student?.avatar} alt={student?.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{student?.name}</p>
                    <p className="text-sm text-gray-600">
                      {course?.code} • {attendance.date} at {attendance.time}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${attendance.status === 'present' ? 'bg-green-100 text-green-700' : attendance.status === 'late' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {attendance.status}
                  </span>
                </div>;
          })}
          </div>
        </div>
      </div>
    </div>;
}