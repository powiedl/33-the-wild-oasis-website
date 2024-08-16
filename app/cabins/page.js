import { Suspense } from 'react';
import CabinList from '@/app/_components/CabinList';
import Spinner from '@/app/_components/Spinner';
import Filter from '@/app/_components/Filter';
import ReservationReminder from '@/app/_components/ReservationReminder';

export const metadata = {
  title: 'Cabins',
};
//export const revalidate = 0; // data cache opt-out (damit Änderungen in der Datenbank auch im UI "ankommen")
export const revalidate = 15; // alle 15 Sekunden, damit man nicht solange warten muss ...
// jetzt, wo die Seite dynamisch ist (wegen searchParams) ist die revalidate Anweisung "sinnlos"
// - weil die Seite jetzt sowieso dynamisch ist

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? 'all';
  const rangeFrom = searchParams?.from;
  const rangeTo = searchParams?.to;

  return (
    <div>
      <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
        Our Luxury Cabins
      </h1>
      <p className='text-primary-200 text-lg mb-10'>
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className='flex justify-end mb-8'>
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
