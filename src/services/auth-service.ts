import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSchema } from '../schema';
import { auth } from '../utils/firebaseSetup';

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import { setIsAuthenticated } from '../store/features/auth-slice';

export const loginService = createAsyncThunk(
  'login',
  async ({ userInfo }: { userInfo: loginSchema }, { dispatch }) => {
    try {
      const { email, password } = userInfo;
      await signInWithEmailAndPassword(auth, email, password);

      dispatch(setIsAuthenticated(true));
      return { status: 201 };
    } catch (error: any) {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/invalid-email':
          throw new Error('Email ou mot de passe invalide');
        case 'auth/invalid-password':
          throw new Error('Email ou mot de passe invalide');
        case 'auth/too-many-requests':
          throw new Error(
            'Trop de tentatives veuillez réessayer plus tard'
          );
        default:
          throw new Error('Erreur inatendue');
      }
    }
  }
);

export const checkUserStatusService = createAsyncThunk(
  'checkUserStatus',
  async (_, { dispatch }) => {
    try {
      const auth = getAuth();

      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            dispatch(setIsAuthenticated(true));
            resolve();
          } else {
            dispatch(setIsAuthenticated(false));
            resolve();
          }
        });
      });
    } catch (error) {
      return error;
    }
  }
);

export const logOutService = createAsyncThunk(
  'logout',
  async (_, { dispatch }) => {
    try {
      await auth.signOut();

      dispatch(setIsAuthenticated(false));
    } catch (error) {
      return error;
    }
  }
);
