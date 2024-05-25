import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Header } from "../../components/admin";
import { Line } from "react-chartjs-2";
import { server } from "../../static/data";
import { FaUsers, FaUserShield } from "react-icons/fa";
import { RiUserSharedFill } from "react-icons/ri";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import axios from "axios";

const AdminDashboard = () => {
  const { currentColor } = useStateContext();
  const [stats, setStats] = useState({
    user_count: 0,
    new_signups: 0,
    admin_count: 0,
    new_users_per_day: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      await axios
        .get(`${server}/api/admin/dashboard-stats/`, config)
        .then((response) => {
          setStats(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the stats!", error);
        });
    };

    fetchStats();
  }, []);

  const newUsersData = {
    labels: stats.new_users_per_day?.map((entry) => entry.day),
    datasets: [
      {
        label: "New Users",
        data: stats.new_users_per_day?.map((entry) => entry.count),
        fill: false,
        backgroundColor: currentColor,
        borderColor: currentColor,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMin: 0,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="p-10">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-10 rounded-2xl min-h-screen">
        <Header category="" title="Stats" />
        <div
          className="flex sm:flex-row gap-5 flex-col justify-around"
          style={{ color: currentColor }}
        >
          <div className="stat-card" style={{ borderColor: currentColor }}>
            <div className="text-6xl font-bold flex flex-row items-center gap-5">
              <FaUsers size={75} />
              {stats.user_count}
            </div>
            <h2 className="text-lg font-bold text-gray-400">Total Users</h2>
          </div>
          <div className="stat-card" style={{ borderColor: currentColor }}>
            <div className="text-6xl font-bold flex flex-row items-center gap-5">
              <RiUserSharedFill size={75} />
              {stats.new_signups}
            </div>
            <h2 className="text-lg font-bold text-gray-400">
              New Signups (Last 30 days)
            </h2>
          </div>
          <div className="stat-card" style={{ borderColor: currentColor }}>
            <div className="text-6xl font-bold flex flex-row items-center gap-5">
              <FaUserShield size={75} />
              {stats.admin_count}
            </div>
            <h2 className="text-lg font-bold text-gray-400">Total Admins</h2>
          </div>
        </div>
        <div className="h-[500px] mt-20 flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold text-gray-400">
            Number of New Users Per Day (Last 7 Days)
          </h2>
          <Line data={newUsersData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;