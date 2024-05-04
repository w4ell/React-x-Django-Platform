import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activateUser } from "../redux/features/user/userThunks";
import { MdVerified } from "react-icons/md";

const ActivationPage = () => {
  const { uid, token } = useParams();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid && token) {
      dispatch(activateUser(uid, token)).catch((error) => {
        setError(true);
      });
    } else {
      setError(true);
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center text center">
      {error ? (
        <h1 className="text-3xl">Your token is expired!</h1>
      ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center text center">
          <MdVerified className="text-green-600" size={150} />
          <h1 className="text-3xl text-green-600">
            Your account has been created suceessfully!
          </h1>
        </div>
      )}
    </div>
  );
};

export default ActivationPage;
