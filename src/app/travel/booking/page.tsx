import { getBookings } from "./actions";
import TravelBookingClient from "./booking-client";

export const dynamic = 'force-dynamic';

export default async function TravelBookingPage() {
  const bookings = await getBookings();

  return (
    <TravelBookingClient
      initialBookings={bookings}
    />
  );
}
