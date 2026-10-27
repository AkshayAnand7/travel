interface StatusBadgeProps {
  status: string;
  variant?: 'trip' | 'payment' | 'reminder' | 'vehicle' | 'default';
}

const tripColors: Record<string, string> = {
  scheduled: "badge-info",
  in_progress: "badge-warning",
  completed: "badge-success",
  cancelled: "badge-danger",
};

const paymentColors: Record<string, string> = {
  customer_received: "badge-success",
  driver_payment: "badge-warning",
};

const reminderColors: Record<string, string> = {
  pending: "badge-warning",
  upcoming: "badge-info",
  overdue: "badge-danger",
  completed: "badge-success",
};

const vehicleColors: Record<string, string> = {
  active: "badge-success",
  inactive: "badge-neutral",
  service_due: "badge-danger",
};

const labelMap: Record<string, string> = {
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  customer_received: "Customer Receipt",
  driver_payment: "Driver Payment",
  pending: "Pending",
  upcoming: "Upcoming",
  overdue: "Overdue",
  active: "Active",
  inactive: "Inactive",
  service_due: "Service Due",
};

export default function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  let className = "badge-neutral";
  
  switch (variant) {
    case 'trip': className = tripColors[status] || "badge-neutral"; break;
    case 'payment': className = paymentColors[status] || "badge-neutral"; break;
    case 'reminder': className = reminderColors[status] || "badge-neutral"; break;
    case 'vehicle': className = vehicleColors[status] || "badge-neutral"; break;
    default:
      className = tripColors[status] || paymentColors[status] || reminderColors[status] || vehicleColors[status] || "badge-neutral";
  }

  return (
    <span className={className}>
      {labelMap[status] || status}
    </span>
  );
}
