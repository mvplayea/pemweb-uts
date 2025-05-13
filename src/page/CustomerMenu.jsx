import { useState, useEffect } from 'react';
import Modal from '../components/commons/Modal';

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
      localStorage.setItem('customers', JSON.stringify(customers));
    }
  }, [customers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openAddModal = () => {
    setFormData({ name: '', phone: '', });
    setIsAddModalOpen(true);
  };

  const openEditModal = (customer) => {
    setCurrentCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone.toString(),
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (customer) => {
    setCurrentCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleAddCustomer = () => {
    // Basic validation
    if (!formData.name || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
    };

    setCustomers([...customers, newCustomer]);
    closeModals();
  };

  const handleUpdateCustomer = () => {
    // Basic validation
    if (!formData.name || !formData.phone ) {
      alert('Please fill in all fields');
      return;
    }

    const updatedCustomers = customers.map(customer => {
      if (customer.id === currentCustomer.id) {
        return {
          ...customer,
          name: formData.name,
          phone: formData.phone,
        };
      }
      return customer;
    });

    setCustomers(updatedCustomers);
    closeModals();
  };

  const handleDeleteCustomer = () => {
    const updatedCustomers = customers.filter(
      customer => customer.id !== currentCustomer.id
    );
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setCustomers(updatedCustomers);
    closeModals();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Customer
        </button>
      </div>

      {customers.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No Customer available. Add a new product to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">phone</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                  <td className="flex justify-center items-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(customer)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(customer)}
                        className="text-red-600 hover:text-red-900"
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

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        title="Add New Customer"
        onClose={closeModals}
      >
        <CustomerForm formData={formData} handleChange={handleChange}/>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAddCustomer}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Customer
          </button>
        </div>
      </Modal>

      {/* Edit Customer Modal */}
      <Modal
        isOpen={isEditModalOpen}
        title="Edit Customer"
        onClose={closeModals}
      >
        <CustomerForm formData={formData} handleChange={handleChange}/>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateCustomer}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Update Customer
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Customer"
        onClose={closeModals}
      >
        <div className="p-4">
          <p className="text-gray-700">
            Are you sure you want to delete "{currentCustomer?.name}"? This action cannot be undone.
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
            onClick={handleDeleteCustomer}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
  // Form fields component for reuse
  const CustomerForm = ({formData, handleChange}) => (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Customer Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter customer name"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="000-000-0000"
        />
      </div>
    </div>
  );
