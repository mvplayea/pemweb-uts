import { useState, useEffect } from "react";
import Modal from "../components/commons/Modal";

export default function TransactionMenu() {
  const [transactions, setTransactions] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    customer: "",
    user: "",
    outlet: "",
    price: 0,
    weight: 0,
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    if (transactions.length !== 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  const handleChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setFormData({
      name: "",
      price: 0,
      outlet: "",
      customer: "",
      date: new Date().toISOString().split("T")[0],
      weight: 0,
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (transaction) => {
    setCurrentTransaction(transaction);
    setFormData({
      name: transaction.name,
      price: transaction.price.toString(),
      weight: transaction.weight.toString(),
      outlet: transaction.outlet,
      customer: transaction.customer,
      date: transaction.date,
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (transaction) => {
    setCurrentTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleAddTransaction = () => {
    // Basic validation
    if (!formData.outlet || !formData.customer || !formData.service) {
      alert("Please fill in all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      customer: formData.customer,
      service: formData.service,
      outlet: formData.outlet,
      price: formData.price,
      weight: formData.weight,
      date: formData.date,
      user: localStorage.getItem("username"),
    };

    setTransactions([...transactions, newTransaction]);
    closeModals();
  };

  const handleUpdateTransaction = () => {
    // Basic validation
    console.log(formData);
    if (
      !formData.price ||
      !formData.outlet ||
      !formData.customer ||
      !formData.date ||
      !formData.weight
    ) {
      alert("Please fill in all fields");
      return;
    }

    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === currentTransaction.id) {
        return {
          ...transaction,
          price: parseFloat(formData.price),
          weight: parseFloat(formData.weight),
          outlet: formData.outlet,
          customer: formData.customer,
          date: formData.date,
          user: localStorage.getItem("username"),
        };
      }
      return transaction;
    });

    setTransactions(updatedTransactions);
    closeModals();
  };

  const handleDeleteTransaction = () => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== currentTransaction.id
    );
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);
    closeModals();
  };

  // Form fields component for reuse
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Transaction Management
        </h1>
        <button
          onClick={openAddModal}
          className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-blue-900"
        >
          Add New Transaction
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No transactions available. Add a new transaction to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Outlet
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(transaction.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.weight}KG
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-blue-800">
                      {transaction.outlet}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(transaction)}
                        className="text-indigo-500 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(transaction)}
                        className="text-red-500 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Transaction Modal */}
      <Modal
        isOpen={isAddModalOpen}
        title="Add New Transaction"
        onClose={closeModals}
      >
        <TransactionForm formData={formData} handleChange={handleChange} />
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTransaction}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-900"
          >
            Add Transaction
          </button>
        </div>
      </Modal>

      {/* Edit Transaction Modal */}
      <Modal
        isOpen={isEditModalOpen}
        title="Edit Transaction"
        onClose={closeModals}
      >
        <TransactionForm formData={formData} handleChange={handleChange} />
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateTransaction}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-900"
          >
            Update Transaction
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Transaction"
        onClose={closeModals}
      >
        <div className="p-4">
          <p className="text-gray-900">
            Are you sure you want to delete "{currentTransaction?.name}"? This
            action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteTransaction}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-900"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

const TransactionForm = ({ formData, handleChange }) => {
  const [services, setServices] = useState([]);
  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    const storedServices = localStorage.getItem("services");
    const storedOutlets = localStorage.getItem("outlets");

    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
    if (storedOutlets) {
      setOutlets(JSON.parse(storedOutlets));
    }
  }, []);

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-900 font-medium mb-2">Outlet</label>
        <select
          name="outlet"
          value={formData.outlet}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select outlet</option>
          {outlets.map((outlet) => (
            <option key={outlet.id} value={outlet.name}>
              {outlet.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-900 font-medium mb-2">Customer</label>
        <input
          type="text"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter customer name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-900 font-medium mb-2">Service</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select service</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-900 font-medium mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="0.00"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-900 font-medium mb-2">
          Weight (kg)
        </label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="0.00"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-900 font-medium mb-2">
          Price (Rp)
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="0.00"
        />
      </div>
    </div>
  );
};
