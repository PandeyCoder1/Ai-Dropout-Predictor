import { CalendarCheck2 } from "lucide-react"

export function BookedSlots() {
  // Replace this with real data fetching logic
  const slots = [
    { id: 1, student: "Amit Sharma", date: "2024-07-10", time: "10:00 AM" },
    { id: 2, student: "Priya Singh", date: "2024-07-11", time: "2:00 PM" },
  ]

  if (slots.length === 0) {
    return (
      <div className="flex items-center space-x-2 text-muted-foreground">
        <CalendarCheck2 className="w-5 h-5" />
        <span>No slots booked yet.</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <ul className="divide-y">
        {slots.map(slot => (
          <li key={slot.id} className="py-2 flex justify-between items-center">
            <span>
              <span className="font-medium">{slot.student}</span> — {slot.date} at {slot.time}
            </span>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Booked</span>
          </li>
        ))}
      </ul>
    </div>
  )
}