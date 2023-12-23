import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebaseSetup';
import { messagingSchema } from '../schema';
import {
  setDeleteMessaging,
  setMessaging,
  setMessagingError,
  setUpdateMessaging,
} from '../store/features/messaging-slice';

export const getMessagingService = createAsyncThunk(
  'get messaging',
  async (_, { dispatch }) => {
    try {
      const messagingSnapShot = await getDocs(
        collection(db, 'messagings')
      );

      const data: messagingSchema[] = [];

      messagingSnapShot.forEach((doc) => {
        data.push(doc.data() as messagingSchema);
      });

      dispatch(setMessaging(data));
    } catch (error) {
      dispatch(setMessagingError(true));
      console.log(error);
      throw new Error('Une erreur est survenue');
    }
  }
);

export const changeStatusMessaging = createAsyncThunk(
  'change status read',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const messagingRef = doc(db, 'messagings', id);
      const messagingSnapShot = await getDoc(messagingRef);

      if (!messagingSnapShot.exists()) {
        throw new Error("Ce message n'existe pas");
      }

      const messaging = messagingSnapShot.data() as messagingSchema;

      const updateMessaging = {
        ...messaging,
        isRead: !messaging.isRead,
      };

      await updateDoc(messagingRef, {
        ...updateMessaging,
      });

      dispatch(setUpdateMessaging(updateMessaging));

      return { status: 201 };
    } catch (error) {
      console.log(error);
      throw new Error('Une erreur est survenue');
    }
  }
);

export const deleteMessagingService = createAsyncThunk(
  'delete messaging',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const messagingRef = doc(db, 'messagings  ', id);
      const messagingSnapShot = await getDoc(messagingRef);

      if (!messagingSnapShot.exists()) {
        return dispatch(setDeleteMessaging(id));
      }

      await deleteDoc(messagingRef);

      dispatch(setDeleteMessaging(id));

      return { status: 201 };
    } catch (error) {
      console.log(error);
      throw new Error('Une erreur est survenue');
    }
  }
);
