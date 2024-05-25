import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/user";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
const ChartsView = () => {
  const charts = useSelector((state) => state.user.charts);
  const [selectedChartType, setSelectedChartType] = useState(null);
  const handleChartTypeChange = (e) => {
    setSelectedChartType(e.target.value);
  };

  const { currentColor } = useStateContext();
  return (
    <div className="p-10">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-10 rounded-2xl w-full">
        <Header title="View Charts" category="" />
        {charts ? (
          <div>
            <select
              className="p-2 w-full text-gray-900 rounded-sm"
              onChange={handleChartTypeChange}
            >
              <option value="">Select Chart Type</option>
              {Object.keys(charts).map((chartType) => (
                <option key={chartType} value={chartType}>
                  {chartType}
                </option>
              ))}
            </select>
            {selectedChartType && (
              <div className="mt-10 flex justify-center">
                <img
                  src={`data:image/png;base64,${charts[selectedChartType]}`}
                  alt={selectedChartType}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="h-[300px] flex flex-col mt-20 text-center text-2xl font-semibold">
            No charts to display. Please insert data first.
            <Link
              className="mt-10 text-white px-4 py-2 rounded-md text-lg"
              style={{ backgroundColor: currentColor }}
              to="/insert-data"
            >
              Insert Data
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartsView;
