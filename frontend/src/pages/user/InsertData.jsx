import React, { useState } from "react";
import { ConnectDB, Header, UploadFile } from "../../components/user";
import { useStateContext } from "../../context/ContextProvider";
import { LuFileBarChart } from "react-icons/lu";
import { BsDatabaseFillUp } from "react-icons/bs";

const InsertData = () => {
  const [method, setMethod] = useState(1);
  const { currentColor } = useStateContext();

  return (
    <div className="p-10">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-10 rounded-2xl w-full">
        <Header title="Insert Data" category="" />
        <div className="flex flex-row justify-around gap-10">
          <div
            onClick={() => setMethod(1)}
            className={`cursor-pointer w-full text-center p-4 rounded-lg hover:shadow-xl font-semibold flex items-center justify-center ${
              method === 1 ? `bg-[${currentColor}] text-white` : ""
            }`}
          >
            <LuFileBarChart size={30} />
            Upload File
          </div>
          <div
            onClick={() => setMethod(2)}
            className={`cursor-pointer w-full text-center p-4 rounded-lg hover:shadow-xl font-semibold flex items-center justify-center ${
              method === 2 ? `bg-[${currentColor}] text-white` : ""
            }`}
          >
            <BsDatabaseFillUp size={30} />
            Connect a database
          </div>
        </div>
        {method === 1 && <UploadFile />}
        {method === 2 && <ConnectDB />}
      </div>
    </div>
  );
};

export default InsertData;
