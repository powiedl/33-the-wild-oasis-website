"use client";
import { useOptimistic } from "react";
import ReservationCard from "@/app/_components/ReservationCard";
import { deleteReservation } from "@/app/_lib/actions";

export default function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      // diese Funktion bekommt zwei Parameter
      // 1. den aktuellen State
      // 2. Etwas, womit der optimistische neue State berechnet werden kann

      return currentBookings.filter((b) => b.id !== bookingId); // hier filtern wir die zu löschende Booking aus (weil wir davon ausgehen,
      // dass die Löschoperation dieser Buchung erfolgreich sein wird)
    }
  );

  //   function handleDelete() {
  //     if (confirm("Are you sure to delete this reservation?"))
  //       startTransition(() => deleteReservation(bookingId));
  //   }

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }
  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
