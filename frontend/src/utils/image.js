export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_ID);

  const res = await fetch(process.env.REACT_APP_CLOUDINARY, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();

  return data.secure_url;
};
