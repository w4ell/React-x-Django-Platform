import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../redux/features/user/userThunks";
import { useStateContext } from "../../context/ContextProvider";
import { userActions } from "../../redux/features/user/userSlice";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const loading = useSelector((state) => state.user.loading);
  const charts = useSelector((state) => state.user.charts);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    dispatch(uploadFile(formData)).then(() => {
      navigate("/charts-view");
    });
  };

  return (
    <>
      {loading ? (
        <div className="h-[400px] flex justify-center items-center">
          <Loader />
        </div>
      ) : charts ? (
        <div className="h-[300px] mt-20 text-center text-2xl font-semibold">
          You already inserted data go check your charts or upload a new one.
          <button
            className="mt-10 text-white px-4 py-2 rounded-md text-lg"
            style={{ backgroundColor: currentColor }}
            onClick={() => {
              dispatch(userActions.ResetCharts());
              setFile(null);
            }}
          >
            Upload a new file
          </button>
        </div>
      ) : (
        <div
          className="flex flex-col gap-20 items-center mt-10 justify-center text-center border-4 border-dashed rounded-xl h-[400px]"
          style={{ borderColor: currentColor }}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <form onSubmit={handleFileSubmit} className="w-full relative h-full">
            {file && (
              <button
                type="button"
                className="absolute top-0 right-0 mr-2 mt-1 text-gray-500 dark:text-gray-400 font-semibold z-50"
                onClick={() => setFile(null)}
              >
                X
              </button>
            )}
            <div className="relative h-[350px] flex flex-col justify-center items-center">
              <input
                type="file"
                id="fileInput"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".csv, .xlsx, .xls"
                required
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer px-4 py-2 text-2xl font-semibold"
              >
                {file
                  ? file.name
                  : "Drag and drop file here or click to upload"}
              </label>
            </div>
            <button
              type="submit"
              className=" text-white px-4 py-2 rounded-md"
              style={{ backgroundColor: currentColor }}
            >
              Upload
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UploadFile;
