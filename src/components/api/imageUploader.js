export const imageUploader = async (image) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data?.data?.display_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
