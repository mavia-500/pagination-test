import { useState } from "react";
import { pages } from "../data/PageOptions";
interface CollectedData {
  allPages: boolean;
  selectedPages: string[];
}

const PageSelector: React.FC = () => {
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  const isAllSelected: boolean = selectedPages.length === pages.length;

  // Toggle All Pages
  const toggleAll = (): void => {
    setSelectedPages(isAllSelected ? [] : pages);
  };

  // Toggle Individual Page
  const togglePage = (page: string): void => {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  // Collect Data
  const handleDone = (): void => {
    const data: CollectedData = {
      allPages: isAllSelected,
      selectedPages,
    };

    console.log("Collected Data:", data);
    alert(JSON.stringify(data));
  };

  return (
    <div className="container min-h-screen flex items-center justify-center ">
      <div className=" w-[50vw] rounded-xl shadow-[0_-8px_30px_rgba(0,0,0,0.12),0_8px_30px_rgba(0,0,0,0.12)] p-6 relative ">
        {/* All Pages */}
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium">All pages</span>
          <label className="flex items-center cursor-pointer">
            {/* 1. Hide the default checkbox */}
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleAll}
              className="peer sr-only"
            />

            <div className=" w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded  bg-white transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 ">
              <svg
                className={`w-3 h-3 text-white fill-current ${
                  isAllSelected ? "block" : "hidden"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
              </svg>
            </div>
          </label>
        </div>

        <hr className="my-4 text-gray-300" />

        {/* Page List */}
        <div className="space-y-3 h-[20vh] overflow-scroll scrollbar-hide">
          {pages.map((page) => (
            <div key={page} className="flex justify-between items-center">
              <span className="text-gray-700">{page}</span>

              <label className="flex items-center cursor-pointer">
                {/* 1. Hide the default checkbox */}
                <input
                  type="checkbox"
                  checked={selectedPages.includes(page)}
                  onChange={() => togglePage(page)}
                  className="peer sr-only"
                />

                {/* 2. Create the custom box */}
                <div className=" w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded  bg-white transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600">
                  {/* 3. The Tick (SVG) - Control size here */}
                  <svg
                    className={`w-3 h-3 text-white fill-current  block`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
              </label>
            </div>
          ))}
        </div>

        <hr className="my-4 text-gray-300" />
        {/* Done Button */}
        <button
          onClick={handleDone}
          className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default PageSelector;
