import axios from "axios";

const API_BASE = "http://localhost:3000/api/files";

export const uploadSingleFile = (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(API_BASE, formData, {
    onUploadProgress: (e) => {
      const percent = Math.round((e.loaded * 100) / e.total);
      onProgress(percent);
    }
  });
};

export const uploadMultipleFiles = (files, onProgress) => {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));

  return axios.post(`${API_BASE}/batch`, formData, {
    onUploadProgress: (e) => {
      const percent = Math.round((e.loaded * 100) / e.total);
      onProgress(percent);
    }
  });
};

export const getAllFiles = () => axios.get(API_BASE);

export const deleteFile = (id) =>
  axios.delete(`${API_BASE}/${id}`);

export const downloadFile = (id) =>
  window.open(`${API_BASE}/${id}/download`, "_blank");
