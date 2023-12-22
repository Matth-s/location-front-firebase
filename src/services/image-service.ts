import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from '../utils/firebaseSetup';
import { arrayPictureSchema } from '../schema';

export const updateImageService = createAsyncThunk(
  'update images',
  async (
    {
      arrayPicture,
      imagesToUpload,
      id,
    }: {
      arrayPicture: arrayPictureSchema[];
      imagesToUpload: any;
      id: string;
    },
    { dispatch }
  ) => {
    try {
      let uploadedImages: arrayPictureSchema[] = [];

      if (imagesToUpload.length > 0) {
        uploadedImages = await dispatch(
          postImageService({ images: imagesToUpload, id })
        ).unwrap();
      }

      return [...arrayPicture, ...uploadedImages];
    } catch (error: any) {
      throw new Error(error.code);
    }
  }
);

export const postImageService = createAsyncThunk(
  'post image',
  async ({ images, id }: { images: any; id: string }) => {
    const downloadUrls: arrayPictureSchema[] = [];

    try {
      await Promise.all(
        images.map(async (image: any) => {
          const filePath = `materials/${id}/${image.name}`;
          const fileRef = ref(storage, filePath);

          await uploadBytes(fileRef, image);

          const url = await getDownloadURL(fileRef);
          downloadUrls.push({
            src: url,
            id: image.name,
          });
        })
      );

      return downloadUrls;
    } catch (error: any) {
      throw new Error(error.code);
    }
  }
);

export const deleteDirectoryService = createAsyncThunk(
  'delete directory',
  async ({ id }: { id: string }) => {
    try {
      const imagesRef = ref(storage, `materials/${id}`);
      const imageList = await listAll(imagesRef);

      const deleteImagePromises = imageList.items.map(
        async (imageRef) => {
          await deleteObject(imageRef);
        }
      );

      await Promise.all(deleteImagePromises);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const deleteImageService = createAsyncThunk(
  'delete image',
  async (
    {
      id,
      imageToDelete,
    }: { id: string; imageToDelete: arrayPictureSchema },
    {}
  ) => {
    try {
      const imageRef = ref(
        storage,
        `/materials/${id}/${imageToDelete.id}`
      );

      await deleteObject(imageRef);
    } catch (error: any) {
      throw new Error(error.code);
    }
  }
);
