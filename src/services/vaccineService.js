import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/status';

export const getAllStudents = () => {
  return axios.get(`${BASE_URL}/students`);
};

export const registerStudent = (studentData) => {
  return axios.post(`${BASE_URL}/students`, studentData);
};

export const updateStudent = (id, updatedData) => {
  return axios.put(`${BASE_URL}/students/${id}`, updatedData);
};

export const getVaccinationStatuses = (studentId) => {
  return axios.get(`${BASE_URL}/${studentId}/vaccination-status`);
};

export const removeVaccinationEntry = (studentId, driveId) => {
  return axios.delete(`${BASE_URL}/${studentId}/vaccination/${driveId}`);
};

export const getDashboardMetrics = () => {
  return axios.get(`${BASE_URL}/dashboard`);
};

export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${BASE_URL}/students/bulk-upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getVaccinationReport = (vaccineName) => {
  const params = vaccineName ? { vaccineName } : {};
  return axios.get(`${BASE_URL}/report`, { params });
};

export const createDrive = (driveData) => {
  return axios.post(`${BASE_URL}/drives`, driveData);
};

export const updateDrive = (id, updatedDrive) => {
  return axios.put(`${BASE_URL}/drives/${id}`, updatedDrive);
};

export const updateVaccinationStatus = (studentId, driveId, vaccinated) => {
  return axios.put(`${BASE_URL}/students/${studentId}/vaccination/${driveId}?vaccinated=${vaccinated}`);
};

export const registerStudentToDrive = (studentId, driveId) => {
  return axios.post(`${BASE_URL}/${studentId}/register/${driveId}`);
};
