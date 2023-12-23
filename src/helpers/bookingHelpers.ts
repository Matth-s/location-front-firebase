import { materialSchema, bookingSchema } from '../schema';

export const materialToBooking = ({
  material,
  booking,
}: {
  material: materialSchema;
  booking: bookingSchema;
}) => {
  const newBooking: bookingSchema = {
    ...booking,
    idMaterial: material.id,
    materialName: material.name,
    pricePerDay: material.pricePerDay,
    providedMaterialsBooking:
      material.providedMaterials.length > 0
        ? material.providedMaterials.map((providedMaterial) => {
            return {
              ...providedMaterial,
              quantity: 1,
              total: 1 * providedMaterial.price,
            };
          })
        : [],
    unavailableDates: material.unavailableDates,
    coachingPriceHour: material.coachingPriceHour,
    downPayment: material.downPayment,
  };

  return newBooking;
};

export const totalSumBooking = (booking: bookingSchema) => {
  const {
    coachingPriceHour,
    coachingTime,
    bookingDates,
    pricePerDay,
    providedMaterialsBooking,
    downPayment,
  } = booking;

  const priceCoaching = coachingPriceHour * coachingTime;
  const priceBookingDates = bookingDates.length * pricePerDay;
  const priceProvidedMaterial =
    providedMaterialsBooking.length > 0
      ? providedMaterialsBooking.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.total,
          0
        )
      : 0;

  const totalSum =
    priceCoaching +
    priceBookingDates +
    priceProvidedMaterial +
    downPayment;

  return totalSum;
};
