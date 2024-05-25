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
      sortable: true,
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
      name: "Admin",
      selector: (row) => row.is_admin,
      cell: (row) => (row.is_admin ? "Yes" : "No"),
      sortable: true,
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

  //export csv
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  const Export = ({ onExport }) => (
    <button
      style={{ backgroundColor: currentColor, color: "white" }}
      className="p-1 text-sm w-30 hover:drop-shadow-xl rounded-lg"
      onClick={(e) => onExport(e.target.value)}
    >
      Export
    </button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl min-h-screen">
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
        actions={actionsMemo}
        pagination
      />
    </div>
  );
}

export default AdminUsersList;
