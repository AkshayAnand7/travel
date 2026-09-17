import { getBookings } from "./actions";
import { getVehicles, getUsers } from "../trips/actions";
import TravelBookingClient from "./booking-client";

export const dynamic = 'force-dynamic';

export default async function TravelBookingPage() {
  const [bookings, vehicles, staff] = await Promise.all([
    getBookings(),
    getVehicles(),
    getUsers(),
  ]);

  return (
    <TravelBookingClient
      initialBookings={bookings}
      initialVehicles={vehicles}
      initialStaff={staff}
    />
  );
}
