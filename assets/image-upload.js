import axios from 'axios';
import { encode } from 'base-64';
import * as FileSystem from 'expo-file-system';

// Define your ImageKit API credentials
const IMAGEKIT_UPLOAD_URL = 'https://upload.imagekit.io/api/v1/files/upload';
const IMAGEKIT_PUBLIC_KEY = 'public_weCikftddug0dxM3XZpspM3E/DU='; // Get from your ImageKit dashboard
const IMAGEKIT_PRIVATE_KEY = 'private_tMn2Dw1isQ8icp2zrLieoS3BjX0='; // Get from your ImageKit dashboard

const uploadImageToImageKit = async (imageUri) => {
    try {
        // Read the file as a base64 encoded string
        const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });

        const formData = new FormData();
        formData.append('file', `data:image/jpeg;base64,${base64Image}`);
        formData.append('fileName', 'my_uploaded_image.jpg'); // Set a file name

        const headers = {
            Authorization: `Basic ${encode(`${IMAGEKIT_PRIVATE_KEY}:`)}`, // Basic Auth header
            'Content-Type': 'multipart/form-data',
        };

        // Send the POST request to upload the image
        const response = await axios.post(IMAGEKIT_UPLOAD_URL, formData, {
            headers,
        });

        console.log('Image uploaded successfully:', response.data.url);
        return response.data.url; // The uploaded image URL
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};

export const imageUpload = async (image1) => {
  const formData = new FormData();
  formData.append("file",image1)
  return new Promise(async (resolve, reject) => {
    
    uploadImageToImageKit(image1).then((res)=>{
      if(res){
        resolve(res)
      }else{
        reject("Image Not Uploaded!")
      }
    })
  });
};
