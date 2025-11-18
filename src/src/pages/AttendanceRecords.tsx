import React, { useState, createElement } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockUsers, mockCourses, mockAttendance } from '../data/mockData';
import { Download, Filter, Search } from 'lucide-react';
import Papa from 'papaparse';
export default function AttendanceRecords() {
  const {
    user
  } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchDate, setSearchDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const isAdmin = user?.role === 'admin';
  const students = mockUsers.filter(u => u.role === 'student');
  // Filter attendance records
  let filteredRecords = isAdmin ? mockAttendance : mockAttendance.filter(a => a.studentId === user?.id);
  if (selectedCourse !== 'all') {
    filteredRecords = filteredRecords.filter(a => a.courseId === selectedCourse);
  }
  if (searchDate) {
    filteredRecords = filteredRecords.filter(a => a.date === searchDate);
  }
  if (searchQuery && isAdmin) {
    filteredRecords = filteredRecords.filter(a => {
      const student = students.find(s => s.id === a.studentId);
      return student?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }
  const exportToCSV = () => {
    const data = filteredRecords.map(record => {
      const student = students.find(s => s.id === record.studentId);
      const course = mockCourses.find(c => c.id === record.courseId);
      return {
        'Student Name': student?.name || 'Unknown',
        'Student ID': student?.studentId || 'N/A',
        'Course Code': course?.code || 'Unknown',
        'Course Name': course?.name || 'Unknown',
        Date: record.date,
        Time: record.time,
        Method: record.method,
        Status: record.status
      };
    });
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_records_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const exportToJSON = () => {
    const data = filteredRecords.map(record => {
      const student = students.find(s => s.id === record.studentId);
      const course = mockCourses.find(c => c.id === record.courseId);
      return {
        studentName: student?.name,
        studentId: student?.studentId,
        courseCode: course?.code,
        courseName: course?.name,
        date: record.date,
        time: record.time,
        method: record.method,
        status: record.status
      };
    });
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_records_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Attendance Records
          </h1>
          <p className="text-gray-600 mt-2">View and export attendance data</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button onClick={exportToJSON} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export JSON
          </button>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course
            </label>
            <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="all">All Courses</option>
              {mockCourses.map(course => <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input type="date" value={searchDate} onChange={e => setSearchDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          {isAdmin && <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Student
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
            </div>}
        </div>
      </div>
      {/* Records Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {isAdmin && <>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      ID
                    </th>
                  </>}
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecords.map(record => {
              const student = students.find(s => s.id === record.studentId);
              const course = mockCourses.find(c => c.id === record.courseId);
              return <tr key={record.id} className="hover:bg-gray-50">
                    {isAdmin && <>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={student?.avatar} alt={student?.name} className="w-8 h-8 rounded-full object-cover" />
                            <span className="font-medium text-gray-900">
                              {student?.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {student?.studentId}
                        </td>
                      </>}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {course?.code}
                        </p>
                        <p className="text-sm text-gray-600">{course?.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.time}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 capitalize">
                        {record.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${record.status === 'present' ? 'bg-green-100 text-green-700' : record.status === 'late' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
        {filteredRecords.length === 0 && <div className="p-12 text-center">
            <p className="text-gray-500">No attendance records found</p>
          </div>}
      </div>
    </div>;
}