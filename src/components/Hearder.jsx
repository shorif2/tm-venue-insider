import { Link, LoaderCircle, Search, X } from "lucide-react";
const Hearder = ({ eventId, setEventId, loading, secCount }) => {
  return (
    <div className="w-full flex gap-4 items-center justify-between ">
      <div className="flex rounded shadow-sm border  py-2.5   ">
        <div className="flex items-center gap-2 pl-2 ">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />

          <span className="hidden lg:block text-gray-600 text-sm font-medium">
            https://pubapi.ticketmaster.com/sdk/static/manifest/v1/
          </span>
        </div>

        <input
          id="eventId"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          type="text"
          placeholder="eventId"
          className=" outline-none  text-sm pl-2 lg:pl-0"
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

      <h1 className="text-sm">Total Sections ({secCount || 0})</h1>
    </div>
  );
};

export default Hearder;
