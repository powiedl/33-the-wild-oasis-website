import { format } from 'date-fns';

export default function CabinOccupied({ range }) {
  const timeframe = (range) => {
    if (range.to && range.from) {
      const from = format(new Date(range.from), 'dd.MM.yy');
      const to = format(new Date(range.to), 'dd.MM.yy');
      return (
        <>
          ({from} &mdash; {to})
        </>
      );
    }
    const pointInTime = range.to || range.from;
    const formatedPoint = format(new Date(pointInTime, 'dd.MM.yy'));
    return formatedPoint;
  };
  console.log(timeframe(range));

  return (
    <div className='flex flex-col text-accent-300 bg-primary-600 px-2 py-1 rounded-md'>
      <div className='text-center'>Occupied during choosen period</div>
      <div className='text-center'>{timeframe(range)}</div>
    </div>
  );
}
