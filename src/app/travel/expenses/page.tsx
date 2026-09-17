import { getExpenses } from "./actions";
import VehicleExpenseClient from "./expenses-client";

export const dynamic = 'force-dynamic';

export default async function VehicleExpensePage() {
  const expenses = await getExpenses();

  return (
    <VehicleExpenseClient
      initialExpenses={expenses}
    />
  );
}
