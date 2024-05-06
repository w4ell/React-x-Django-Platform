import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { adminGetUsers } from "../../redux/features/user/userThunks";
import { RiUserSearchFill } from "react-icons/ri";
import { useStateContext } from "../../context/ContextProvider";
import { Header } from "../../components/admin";

function AdminUsersList() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await dispatch(adminGetUsers());
        setUsers(fetchedUsers);
        setRecords(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, []);
  const { currentColor } = useStateContext();
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.full_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "",
      cell: (row) => (
        <Link
          type="button"
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
          className="p-3 w-30 hover:drop-shadow-xl"
          to={`/admin-users/user/${row.id}`}
        >
          <RiUserSearchFill size={20} />
        </Link>
      ),
    },
  ];
  const data = users;
  const [records, setRecords] = useState(data);
  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return (
        row.full_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.id.toString().includes(e.target.value)
      );
    });
    setRecords(newData);
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="" title="Users List" />
      <div>
        <input
          className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          type="text"
          placeholder="Search by user id or name..."
          onChange={handleFilter}
        />
      </div>
      <DataTable
        columns={columns}
        data={records}
        progressPending={loading}
        pagination
      />
    </div>
  );
}

export default AdminUsersList;
