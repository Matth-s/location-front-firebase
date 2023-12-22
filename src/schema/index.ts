export interface loginSchema {
  email: string;
  password: string;
}

export interface materialSchema {
  id: string;
  name: string;
  downPayment: number;
  unavailableDates: string[] | [];
  providedMaterials: providedMaterialsSchema[] | [];
  presentationPicture: string;
  arrayPicture: arrayPictureSchema[] | [];
  description: string;
  visible: boolean;
  pricePerDay: number;
  coachingPriceHour: number;
}

export interface arrayPictureSchema {
  id: string;
  src: string;
}

export interface providedMaterialsSchema {
  id: string;
  materialName: string;
  price: number;
}

export interface bookingSchema {
  id: string;
  idMaterial: string;
  materialName: string;
  total: number;
  pricePerDay: number;
  providedMaterialsBooking: providedMaterialsBookingSchema[] | [];
  firstName: string;
  lastName: string;
  phone: string;
  //email: string;
  city: string;
  street: string;
  unavailableDates: string[] | [];
  bookingDates: string[] | [];
  coachingPriceHour: number;
  coachingTime: number;
  isCompleted: boolean;
  downPayment: number;
  timestamp: number;
  isRead: boolean;
}

export interface providedMaterialsBookingSchema {
  id: string;
  materialName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface messagingSchema {
  id: string;
  idMaterial: string;
  materialName: string;
  total: number;
  pricePerDay: number;
  providedMaterialsBooking: providedMaterialsBookingSchema[] | [];
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  street: string;
  unavailableDates: string[] | [];
  bookingDates: string[] | [];
  coachingPriceHour: number;
  coachingTime: number;
  isCompleted: boolean;
  downPayment: number;
  timestamp: number;
  isRead: boolean;
}

export enum modalToOpen {
  null = 0,
  'editMaterialModal' = 1,
  'createBookingModal' = 2,
  'deleteMaterialModal' = 4,
  'deleteBookingModal' = 5,
  'viewBoookingPdf' = 6,
  'editBookingModal' = 7,
}
