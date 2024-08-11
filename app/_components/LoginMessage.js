import Link from "next/link";

function LoginMessage({
  children = (
    <>
      to reserve this
      <br />
      cabin right now
    </>
  ),
}) {
  return (
    <div className='grid bg-primary-800 '>
      <p className='text-center text-xl py-12 self-center'>
        Please{" "}
        <Link href='/login' className='underline text-accent-500'>
          login
        </Link>{" "}
        {children}
      </p>
    </div>
  );
}

export default LoginMessage;
