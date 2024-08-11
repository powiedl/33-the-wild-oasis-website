"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "@/app/_components/SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  /* es wäre möglich, die entsprechende SA hier und so zu definieren - weil in diesem File oben nicht "use client" steht (bzw. zu dem Zeitpunkt,
     wo wir das geschrieben haben, noch nicht stand)
     Jetzt muss es eine Client Komponente sein, weil wir das onClick am Button brauchen
  function deleteReservation(bookingId) {
    "use server"; // wichtig, weil wir sicherstellen müssen, dass diese Funktion eine SA wird, auch wenn die Komponente vielleicht
    // in einer CC verwendet wird

    // code
  }
  */
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
      onClick={handleDelete}
    >
      {!isPending ? (
        <>
          <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
          <span className='mt-1'>Delete</span>
        </>
      ) : (
        <span className='mx-auto'>
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
