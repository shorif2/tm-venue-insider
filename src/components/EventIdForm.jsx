import { LoaderCircle, Search, X } from "lucide-react";
const EventIdForm = ({ eventId, setEventId, loading, secCount }) => {
  return (
    <div className="sticky top-0 z-20 shadow-sm bg-white p-4">
      <div className="w-full flex gap-4 items-center justify-between">
        <div className="flex items-center  rounded shadow-sm border  overflow-hidden bg-gray-50 ">
          <div className="flex items-center gap-2 pl-4 ">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />

            <span className="text-gray-600 text-sm font-medium">
              https://pubapi.ticketmaster.com/sdk/static/manifest/v1/
            </span>
          </div>

          <input
            id="eventId"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            type="text"
            placeholder="eventId"
            className="w-96 flex-1 outline-none  text-sm  py-2 bg-gray-50"
          />
          {loading && (
            <button className="flex-shrink-0 text-gray-400 hover:text-yellow-500 transition-colors px-4">
              <LoaderCircle className="w-5 h-5 animate-spin" />
            </button>
          )}
          {eventId && (
            <button
              onClick={() => setEventId("")}
              className="flex-shrink-0 text-gray-400 hover:text-yellow-500 transition-colors px-4"
              title="Clear"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <h1>Venue Section ({secCount || 0})</h1>
      </div>
    </div>
  );
};

export default EventIdForm;
