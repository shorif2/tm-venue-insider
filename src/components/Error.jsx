import { TriangleAlert } from "lucide-react";

const Error = ({ error }) => {
  return (
    <div className="  px-6 pt-20 text-center text-gray-500 ">
      <TriangleAlert className="mx-auto h-12 w-12 text-red-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Something went wrong!
      </h3>
      <p className="mt-1 text-sm text-gray-500">{error}</p>
    </div>
  );
};

export default Error;
