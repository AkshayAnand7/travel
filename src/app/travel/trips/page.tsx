import { getTrips } from "./actions";
import TravelTripClient from "./trips-client";

export const dynamic = 'force-dynamic';

export default async function TravelTripPage() {
  const trips = await getTrips();

  return (
    <TravelTripClient
      initialTrips={trips}
    />
  );
}
