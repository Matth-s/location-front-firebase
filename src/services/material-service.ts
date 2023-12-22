import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebaseSetup';
import { materialSchema } from '../schema';
import {
  setDeleteMaterial,
  setMaterials,
  setNewMaterial,
  setUpdateMaterial,
} from '../store/features/material-slice';
import { setModalToOpen } from '../store/features/modal-slice';

export const getMaterialsService = createAsyncThunk(
  'getMaterial',
  async (_, { dispatch }) => {
    try {
      const materialSnapShot = await getDocs(
        collection(db, 'materials')
      );

      const data: materialSchema[] = [];

      materialSnapShot.forEach((doc) => {
        data.push(doc.data() as materialSchema);
      });

      dispatch(setMaterials(data));
    } catch (error: any) {
      throw new Error(error.errorCode);
    }
  }
);

export const createMaterialService = createAsyncThunk(
  'create material',
  async (
    { material }: { material: materialSchema },
    { dispatch }
  ) => {
    try {
      const materialRef = doc(db, 'materials', material.id);

      await setDoc(materialRef, { ...material, id: material.id });

      dispatch(setNewMaterial(material));

      return { status: 201, id: material.id };
    } catch (error: any) {
      throw new Error(error.errorCode);
    }
  }
);

export const updateMaterialService = createAsyncThunk(
  'update material',
  async (
    { material }: { material: materialSchema },
    { dispatch }
  ) => {
    try {
      const materialRef = doc(db, 'materials', material.id);
      const materialSnap = await getDoc(materialRef);

      if (!materialSnap.exists()) {
        throw new Error("Le matériel n'a pas été trouvé");
      }

      await updateDoc(materialRef, { ...material });

      dispatch(setUpdateMaterial(material));
      dispatch(setModalToOpen(0));

      return { status: 201 };
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const deleteMaterialService = createAsyncThunk(
  'delete material',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const materialDocRef = doc(db, 'materials', id);
      await deleteDoc(materialDocRef);

      dispatch(setDeleteMaterial(id));
      dispatch(setModalToOpen(0));

      return { status: 201 };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
);

export const getunavailableDatesService = createAsyncThunk(
  'get unavailableDates',
  async (
    { id, bookingDate }: { id: string; bookingDate: string[] },
    {}
  ) => {
    try {
      const materialRef = doc(db, 'materials', id);
      const materialSnapShot = await getDoc(materialRef);

      if (!materialSnapShot.exists()) {
        throw new Error('Materiel introuvable');
      }

      const materialData = materialSnapShot.data() as materialSchema;

      const filtredUnavailableDates =
        materialData.unavailableDates.filter(
          (date) => !bookingDate.includes(date)
        );

      return {
        status: 201,
        unavailableDates: filtredUnavailableDates,
      };
    } catch (error) {
      throw new Error('Une erreur est survenue');
    }
  }
);
