export default function Home(): React.ReactNode {
  const dayOfWeek = new Date().getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="flex h-screen bg-gray-100 p-8">
      <div className="flex-1 ">
        <h2 className="text-3xl font-bold mb-4">Welcome to What to Eat!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">
              Happy {days[dayOfWeek]}!
            </h2>
            <h3 className="text-xl font-semibold my-2">Today's Recipe:</h3>
            <p className="text-gray-700">Today's recipe will go here</p>
            <h3 className="text-xl font-semibold my-2">Prep reminder:</h3>
            <p className="text-gray-700">Prep reminders will go here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
