import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  //console.log("request", request);
  //console.log("params", params);
  const { cabinid } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinid),
      getBookedDatesByCabinId(cabinid),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (err) {
    //console.log(err.message);
    return Response.json({ message: "cabin not found" });
  }
}

//export async function POST() { }
