import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px] mb-10 text-accent-400 pl-4'>
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm
          bookedDates={bookedDates}
          cabin={cabin}
          user={session.user}
        />
      ) : (
        <LoginMessage>to get to your bookings</LoginMessage>
      )}
    </div>
  );
}
