import { z } from 'zod';

export const loginValidation = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Entrez un email')
    .email('Email invalide'),
  password: z.string().trim().min(1, 'Entrez un mot de passe'),
});

export const providedMaterialsValidation = z.object({
  id: z.string(),
  materialName: z.string().trim().min(1, 'Champs requis'),
  price: z.coerce.number().min(1, 'La valeur doit être supérier à 0'),
});

export const arrayPictureValidation = z.object({
  id: z.string(),
  src: z.string(),
});

export const materialValidation = z.object({
  id: z.string(),
  name: z.string().trim().min(1, 'Champs requis'),
  downPayment: z.coerce
    .number()
    .min(1, 'La valeur doit être supérieure à 0'),
  unavailableDates: z.array(z.string()).default([]),
  providedMaterials: z.array(providedMaterialsValidation).default([]),
  presentationPicture: z.string(),
  arrayPicture: z.array(arrayPictureValidation).default([]),
  description: z.string().trim().min(1, 'Champs requis'),
  visible: z.boolean().default(true),
  pricePerDay: z.coerce
    .number()
    .min(1, 'La valeur doit être supérieure à 0'),
  coachingPriceHour: z.coerce
    .number()
    .min(1, 'La valeur doit être supérieure à 0'),
});

const phoneNumberRegex = /^0[1-9][0-9]{8}$/;

const providedMaterialsBooking = z.object({
  id: z.string(),
  materialName: z.string(),
  price: z.coerce.number(),
  quantity: z.coerce.number().min(1),
  total: z.coerce.number(),
});

export const FormBookingSchema = z.object({
  id: z.string(),
  idMaterial: z.string(),
  materialName: z.string(),
  total: z.coerce.number().default(0),
  pricePerDay: z.coerce.number(),
  providedMaterialsBooking: z
    .array(providedMaterialsBooking)
    .default([]),
  firstName: z.string().trim().min(1, 'Champs requis'),
  lastName: z.string().trim().min(1, 'Champs requis'),
  phone: z
    .string()
    .trim()
    .min(1, 'Champs requis')
    .refine((value) => phoneNumberRegex.test(value), {
      message: 'Mauvais format',
    }),
  // email: z.string().email(),
  city: z.string().trim().min(1, 'Champs requis'),
  street: z.string().trim().min(1, 'Champs requis'),
  unavailableDates: z.array(z.string()).default([]),
  bookingDates: z
    .array(z.string())
    .min(1, 'Veuillez choisir une date de location')
    .default([]),
  coachingPriceHour: z.coerce.number(),
  coachingTime: z.coerce.number().default(1),
  isCompleted: z.boolean().default(false),
  downPayment: z.number(),
  timestamp: z.number(),
  isRead: z.boolean().default(false),
});
