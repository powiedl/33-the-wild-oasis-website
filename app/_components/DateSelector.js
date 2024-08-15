'use client';
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useReservation } from '@/app/_components/ReservationContext';
import CabinOccupied from './CabinOccupied';

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function isEmptyObject(obj) {
  return (
    obj.constructor === Object && // der constructor von obj ist Object - also ist obj ein Object
    Object.keys(obj).length === 0
  ); // und das Objekt hat keine keys - also ist es ein leeres Objekt
}
function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  // CHANGE
  // const regularPrice = 23;
  // const discount = 23;
  // const numNights = 23;
  // const cabinPrice = 23;

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  //console.log(cabin);
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange?.to, displayRange?.from);
  const cabinPrice = (regularPrice - discount) * numNights;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='pt-4 place-self-center pl-4'
        mode='range'
        selected={displayRange}
        onSelect={(range) => setRange(range)}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startmMonth={new Date()}
        startDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout='dropdown'
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className='flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]'>
        <div className='flex items-baseline gap-6'>
          <p className='flex gap-2 items-baseline'>
            {discount > 0 ? (
              <>
                <span className='text-2xl'>${regularPrice - discount}</span>
                <span className='line-through font-semibold text-primary-700'>
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className='text-2xl'>${regularPrice}</span>
            )}
            <span className=''>/night</span>
          </p>
          {numNights ? (
            <>
              <p className='bg-accent-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>Total</span>{' '}
                <span className='text-2xl font-semibold'>${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <>
            {isEmptyObject(displayRange) && <CabinOccupied range={range} />}
            <button
              className='border border-primary-800 py-2 px-4 text-sm font-semibold'
              onClick={() => resetRange()}
            >
              Clear
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
