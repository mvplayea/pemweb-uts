import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import Card from "../components/Card";
import Button from "../components/Button";

const Dashboard = () => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Status", accessor: "status" },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Button color="blue" size="sm">
            View
          </Button>
          <Button color="green" size="sm">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
    },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active" },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      status: "Pending",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      status: "Active",
    },
  ];

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        title="Dashboard"
        items={[
          {
            icon: "📊",
            text: "Dashboard",
            active: true,
            onClick: () => console.log("Dashboard clicked"),
          },
          {
            icon: "👥",
            text: "Users",
            onClick: () => console.log("Users clicked"),
          },
          {
            icon: "📝",
            text: "Reports",
            onClick: () => console.log("Reports clicked"),
          },
          {
            icon: "⚙️",
            text: "Settings",
            onClick: () => console.log("Settings clicked"),
          },
        ]}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Navbar /> */}

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Laundry Dashboard
            </h1>
            <p className="text-gray-600">Manage your customers</p>
          </div>

          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <Button color="blue">Add Customer</Button>
              <Button color="purple">Export</Button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search users..."
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* <Card> */}
          <Table columns={columns} data={data} onRowClick={handleRowClick} />
          {/* </Card> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
