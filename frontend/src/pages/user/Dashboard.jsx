import React, { useState } from "react";
import axios from "axios";
import { Header } from "../../components/user";

function Dashboard() {
  return (
    <div className="p-10">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-10 rounded-2xl w-full">
        <Header title="Dashboard" category="" />
      </div>
    </div>
  );
}

export default Dashboard;
