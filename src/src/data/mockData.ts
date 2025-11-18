export const mockUsers = [{
  id: '1',
  name: 'Damilola Raji',
  email: 'damilola@student.edu',
  password: 'student123',
  role: 'student' as const,
  studentId: 'CS/2021/001',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
}, {
  id: '2',
  name: 'Aisha Bello',
  email: 'aisha@student.edu',
  password: 'student123',
  role: 'student' as const,
  studentId: 'CS/2021/002',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
}, {
  id: '3',
  name: 'Tunde Bakare',
  email: 'tunde@student.edu',
  password: 'student123',
  role: 'student' as const,
  studentId: 'CS/2021/003',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
}, {
  id: '4',
  name: 'Chinedu Okafor',
  email: 'chinedu@student.edu',
  password: 'student123',
  role: 'student' as const,
  studentId: 'CS/2021/004',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
}, {
  id: '5',
  name: 'Admin User',
  email: 'admin@cs.edu',
  password: 'admin123',
  role: 'admin' as const,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
}];
export const mockLecturers = [{
  id: 'l1',
  name: 'Dr. Olukoya',
  title: 'Dr.'
}, {
  id: 'l2',
  name: 'Mr. Olatunde',
  title: 'Mr.'
}, {
  id: 'l3',
  name: 'Prof. Adebayo',
  title: 'Prof.'
}];
export const mockCourses = [{
  id: 'c1',
  code: 'CSC301',
  name: 'Data Structures & Algorithms',
  lecturer: 'Dr. Olukoya'
}, {
  id: 'c2',
  code: 'CSC302',
  name: 'Database Management Systems',
  lecturer: 'Mr. Olatunde'
}, {
  id: 'c3',
  code: 'CSC303',
  name: 'Computer Networks',
  lecturer: 'Prof. Adebayo'
}, {
  id: 'c4',
  code: 'CSC304',
  name: 'Software Engineering',
  lecturer: 'Dr. Olukoya'
}];
export const mockAttendance = [
// Week 1
{
  id: 'a1',
  studentId: '1',
  courseId: 'c1',
  date: '2024-01-08',
  time: '09:15',
  method: 'qr',
  status: 'present'
}, {
  id: 'a2',
  studentId: '2',
  courseId: 'c1',
  date: '2024-01-08',
  time: '09:12',
  method: 'qr',
  status: 'present'
}, {
  id: 'a3',
  studentId: '3',
  courseId: 'c1',
  date: '2024-01-08',
  time: '09:20',
  method: 'biometric',
  status: 'present'
}, {
  id: 'a4',
  studentId: '4',
  courseId: 'c1',
  date: '2024-01-08',
  time: '09:25',
  method: 'qr',
  status: 'late'
}, {
  id: 'a5',
  studentId: '1',
  courseId: 'c2',
  date: '2024-01-09',
  time: '11:10',
  method: 'biometric',
  status: 'present'
}, {
  id: 'a6',
  studentId: '2',
  courseId: 'c2',
  date: '2024-01-09',
  time: '11:15',
  method: 'qr',
  status: 'present'
}, {
  id: 'a7',
  studentId: '3',
  courseId: 'c2',
  date: '2024-01-09',
  time: '11:35',
  method: 'qr',
  status: 'late'
},
// Week 2
{
  id: 'a8',
  studentId: '1',
  courseId: 'c1',
  date: '2024-01-15',
  time: '09:10',
  method: 'qr',
  status: 'present'
}, {
  id: 'a9',
  studentId: '2',
  courseId: 'c1',
  date: '2024-01-15',
  time: '09:18',
  method: 'biometric',
  status: 'present'
}, {
  id: 'a10',
  studentId: '4',
  courseId: 'c1',
  date: '2024-01-15',
  time: '09:22',
  method: 'qr',
  status: 'present'
}, {
  id: 'a11',
  studentId: '1',
  courseId: 'c3',
  date: '2024-01-16',
  time: '14:05',
  method: 'qr',
  status: 'present'
}, {
  id: 'a12',
  studentId: '2',
  courseId: 'c3',
  date: '2024-01-16',
  time: '14:10',
  method: 'qr',
  status: 'present'
}, {
  id: 'a13',
  studentId: '3',
  courseId: 'c3',
  date: '2024-01-16',
  time: '14:12',
  method: 'biometric',
  status: 'present'
}, {
  id: 'a14',
  studentId: '4',
  courseId: 'c3',
  date: '2024-01-16',
  time: '14:40',
  method: 'qr',
  status: 'late'
}];