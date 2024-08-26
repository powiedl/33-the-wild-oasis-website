'use client';
import { useFormStatus } from 'react-dom';
export default function SubmitButton({
  pendlingLabel = 'Updating ...',
  children = 'Update profile',
}) {
  const { pending } = useFormStatus(); // weil das ein Hook ist, muss Button eine Client Component sein
  return (
    <button
      className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
      disabled={pending}
    >
      {pending ? pendlingLabel : children}
    </button>
  );
}
