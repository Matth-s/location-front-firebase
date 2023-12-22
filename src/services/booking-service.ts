import { createAsyncThunk } from '@reduxjs/toolkit';
import { bookingSchema, materialSchema } from '../schema';
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
import { setUpdateMaterial } from '../store/features/material-slice';
import {
  setBooking,
  setUpdateBooking,
  setDeleteBooking,
  setNewBooking,
} from '../store/features/booking-slice';
import { setModalToOpen } from '../store/features/modal-slice';

export const getBookingService = createAsyncThunk(
  'get booking',
  async (_, { dispatch }) => {
    try {
      const bookingsSnapShot = await getDocs(
        collection(db, 'bookings')
      );

      const data: bookingSchema[] = [];

      bookingsSnapShot.forEach((doc) => {
        data.push(doc.data() as bookingSchema);
      });

      dispatch(setBooking(data));
    } catch (error) {
      throw new Error('error');
    }
  }
);

export const createBookingService = createAsyncThunk(
  'create booking',
  async ({ booking }: { booking: bookingSchema }, { dispatch }) => {
    try {
      const materialRef = doc(db, 'materials', booking.idMaterial);
      const materialSnap = await getDoc(materialRef);

      if (!materialSnap.exists()) {
        throw new Error('Matériel intouvable');
      }

      const materialUpdate = materialSnap.data() as materialSchema;

      materialUpdate.unavailableDates = [
        ...materialUpdate.unavailableDates,
        ...booking.bookingDates,
      ];

      await updateDoc(materialRef, { ...materialUpdate });

      const bookingRef = doc(db, 'bookings', booking.id);

      const bookingUpdate = {
        ...booking,
        unavailableDates: [],
        materialName: materialUpdate.name,
      };

      await setDoc(bookingRef, {
        ...bookingUpdate,
      });

      dispatch(setUpdateMaterial(materialUpdate));
      dispatch(setNewBooking(bookingUpdate));
      dispatch(setModalToOpen(0));

      return { status: 201, id: booking.id };
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
);

export const updateBookingService = createAsyncThunk(
  'uopdate booking',
  async (
    {
      booking,
      initalUnavailableDates,
    }: { booking: bookingSchema; initalUnavailableDates: string[] },
    { dispatch }
  ) => {
    const { bookingDates, idMaterial, id } = booking;
    console.log(id);

    try {
      const materialRef = doc(db, 'materials', idMaterial);
      const materialSnapShot = await getDoc(materialRef);

      if (!materialSnapShot.exists()) {
        throw new Error('Le material n a pas été trouvé');
      }

      const materialData = materialSnapShot.data() as materialSchema;
      materialData.unavailableDates =
        materialData.unavailableDates.filter(
          (date) => !initalUnavailableDates.includes(date)
        );

      console.log(materialData);

      const bookingDatesParams = bookingDates as string[];

      const checkSameUnavailableDates =
        materialData.unavailableDates.length > 0
          ? materialData.unavailableDates.filter((date) =>
              bookingDatesParams.includes(date)
            )
          : [];

      if (checkSameUnavailableDates.length > 0) {
        throw new Error(
          'Certaines dates de réservations sont indisponibles'
        );
      }

      materialData.unavailableDates = [
        ...materialData.unavailableDates,
        ...bookingDatesParams,
      ];

      await updateDoc(materialRef, { ...materialData });

      const bookingRef = doc(db, 'bookings', id);

      booking.unavailableDates = [];

      console.log(booking);
      await updateDoc(bookingRef, {
        ...booking,
      });

      dispatch(setUpdateMaterial(materialData));
      dispatch(setUpdateBooking(booking));
      dispatch(setModalToOpen(0));

      return { status: 201 };
    } catch (error) {
      console.log(error);
      throw new Error('Une erreur est survenue');
    }
  }
);

export const patchStatusBookingService = createAsyncThunk(
  'patch status',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const bookingRef = doc(db, 'bookings', id);
      const bookingsSnapShot = await getDoc(bookingRef);

      if (!bookingsSnapShot.exists()) {
        throw new Error("Cette réservationn n'existe pas");
      }

      const bookingUpdate = bookingsSnapShot.data() as bookingSchema;
      bookingUpdate.isCompleted = !bookingUpdate.isCompleted;

      await updateDoc(bookingRef, { ...bookingUpdate });

      dispatch(setUpdateBooking(bookingUpdate));

      return { status: 201 };
    } catch (error) {
      throw new Error('error');
    }
  }
);

export const deleteBookingService = createAsyncThunk(
  'delete booking',
  async (
    {
      idBooking,
      idMaterial,
      bookingDates,
    }: {
      idBooking: string;
      idMaterial: string;
      bookingDates: string[];
    },
    { dispatch }
  ) => {
    try {
      const materialRef = doc(db, 'materials', idMaterial);
      const materialSnapShot = await getDoc(materialRef);

      if (materialSnapShot.exists()) {
        const materialUpdate =
          materialSnapShot.data() as materialSchema;
        materialUpdate.unavailableDates =
          materialUpdate.unavailableDates.filter(
            (date: string) => !bookingDates.includes(date)
          );

        await updateDoc(materialRef, { ...materialUpdate });
        dispatch(setUpdateMaterial(materialUpdate));
      }

      const bookingDocRef = doc(db, 'bookings', idBooking);

      await deleteDoc(bookingDocRef);

      dispatch(setDeleteBooking(idBooking));
      dispatch(setModalToOpen(0));

      return { status: 201 };
    } catch (error) {
      throw new Error('error');
    }
  }
);
