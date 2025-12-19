import axios from "axios";

const API = axios.create({
  baseURL: "https://file-uploader-production-6b15.up.railway.app",
});

// Upload single file
export const uploadSingleFile = (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/api/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      const percent = Math.round((e.loaded * 100) / e.total);
      onProgress(percent);
    },
  });
};

// Upload multiple files
export const uploadMultipleFiles = (files, onProgress) => {
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));

  return API.post("/api/files/batch", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      const percent = Math.round((e.loaded * 100) / e.total);
      onProgress(percent);
    },
  });
};

// Get all files
export const getAllFiles = () => API.get("/api/files");

// Delete file
export const deleteFile = (id) => API.delete(`/api/files/${id}`);

// Download file
export const downloadFile = (id) => {
  window.open(
    `https://file-uploader-production-6b15.up.railway.app/api/files/${id}/download`,
    "_blank"
  );
};
