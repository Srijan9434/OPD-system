import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// Attach Bearer token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle responses and extract standard format
export const doctorApi = {
  getDashboard: () => API.get('/doctor/dashboard'),
  getAppointments: (params) => API.get('/doctor/appointments', { params }),
  updateStatus: (id, status, cancelReason) =>
    API.put(`/doctor/appointments/${id}/status`, { status, cancelReason }),
  savePrescription: (id, data) =>
    API.post(`/doctor/appointments/${id}/prescription`, data),
  markPaymentPaid: (id) => API.put(`/doctor/appointments/${id}/payment`),
  updateAvailability: (data) => API.put('/doctor/availability', data),
  getPatientHistory: (patientId) => API.get(`/doctor/patients/${patientId}/history`),
  emergencyLeave: (data) => API.post('/doctor/emergency-leave', data),
}

export default API
