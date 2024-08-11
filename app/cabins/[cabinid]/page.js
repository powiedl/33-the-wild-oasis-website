import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// PLACEHOLDER DATA
const cabin = {
  id: 89,
  name: "001",
  maxCapacity: 2,
  regularPrice: 250,
  discount: 0,
  description:
    "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  image:
    "https://ufdwwteujnxrdleoewhp.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
};

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinid);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  //console.log(cabins);
  const ids = cabins.map((c) => ({ cabinid: String(c.id) }));
  //console.log(ids);
  return ids;
}

export default async function Page({ params }) {
  //// das ist ein data fetching waterfall - mehrere unabhängige fetches, die alle awaitet werden
  // const { id, name, maxCapacity, regularPrice, discount, image, description } =
  //   await getCabin(params.cabinid);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinid);

  // // Verbesserung: Promise.all - es dauert so lange, wie das längste fetchen dauert
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinid),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinid),
  // ]);
  // const { id, name, maxCapacity, regularPrice, discount, image, description } =
  //   cabin;

  // Finale Version: das Data fetching für das Reservierungsformular in eine eigene Komponente auslagern
  // das fetchen von cabin bleibt hier und die gefetchte cabin wird dem Reservierungsformular als Prop übergeben
  const cabin = await getCabin(params.cabinid);

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />
      <div>
        <h2 className='text-5xl font-semibold text-center mb-3'>
          Reserve cabin {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />} key={cabin.id}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
