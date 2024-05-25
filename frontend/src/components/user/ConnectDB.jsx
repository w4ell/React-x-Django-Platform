import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectDB } from "../../redux/features/user/userThunks";
import { useStateContext } from "../../context/ContextProvider";
import { userActions } from "../../redux/features/user/userSlice";
import Loader from "../Loader";
import databaseConfig from "../../static/DBs";
import { useNavigate } from "react-router-dom";

const ConnectDB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const loading = useSelector((state) => state.user.loading);
  const charts = useSelector((state) => state.user.charts);
  const [databaseType, setDatabaseType] = useState("sqlite");
  const [formData, setFormData] = useState(databaseConfig[databaseType]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      db_type: databaseType,
    };
    dispatch(connectDB(data))
      .then(() => {
        navigate("/charts-view");
      })
      .catch((err) => {
        console.log(err);
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
            }}
          >
            Connect a new database
          </button>
        </div>
      ) : (
        <div className="mt-10 flex justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
            <div className="flex gap-2">
              <label>Database Type:</label>
              <select
                value={databaseType}
                className="text-black rounded-md bg-slate-100"
                onChange={(e) => {
                  setDatabaseType(e.target.value);
                  setFormData(databaseConfig[e.target.value]);
                }}
              >
                <option value="sqlite">SQLite</option>
                <option value="mysql">MySQL</option>
                <option value="postgresql">PostgreSQL</option>
                <option value="mongoDB">MariaDB</option>
              </select>
            </div>
            {Object.keys(formData).map((key) => {
              // Skip db_type and file fields
              if (key !== "db_type" && key !== "file") {
                return (
                  <div key={key} className="flex gap-2">
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      className="text-black rounded-md bg-slate-100"
                      onChange={handleChange}
                    />
                  </div>
                );
              } else {
                return null;
              }
            })}
            {databaseType === "sqlite" && (
              <div className="flex gap-2">
                <label>Database File:</label>
                <input
                  type="file"
                  name="file"
                  onChange={(e) =>
                    setFormData({ ...formData, file: e.target.files[0] })
                  }
                />
              </div>
            )}
            <div>
              <button
                className="mt-10 text-white px-8 py-2 rounded-md text-lg"
                style={{ backgroundColor: currentColor }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ConnectDB;
