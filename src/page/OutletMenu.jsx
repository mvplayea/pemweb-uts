
import { useState, useEffect } from 'react';
import Modal from '../components/commons/Modal';

export default function OutletMenu() {
  const [outlets, setOutlets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentOutlet, setCurrentOutlet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });

  useEffect(() => {
    const storedOutlets = localStorage.getItem('outlets');
    if (storedOutlets) {
      setOutlets(JSON.parse(storedOutlets));
    }
  }, []);

  useEffect(() => {
    if (outlets.length > 0) {
      localStorage.setItem('outlets', JSON.stringify(outlets));
    }
  }, [outlets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const openAddModal = () => {
    setFormData({ name: '', address: '' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (outlet) => {
    setCurrentOutlet(outlet);
    setFormData({
      name: outlet.name,
      address: outlet.address
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (outlet) => {
    setCurrentOutlet(outlet);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleAddOutlet = () => {
    // Basic validation
    if (!formData.name || !formData.address) {
      alert('Please fill in all fields');
      return;
    }

    const newOutlet = {
      id: Date.now(),
      name: formData.name,
      address: formData.address
    };

    setOutlets([...outlets, newOutlet]);
    closeModals();
  };

  const handleUpdateOutlet = () => {
    // Basic validation
    if (!formData.name || !formData.address) {
      alert('Please fill in all fields');
      return;
    }

    const updatedOutlets = outlets.map(outlet => {
      if (outlet.id === currentOutlet.id) {
        return {
          ...outlet,
          name: formData.name,
          address: formData.address
        };
      }
      return outlet;
    });

    setOutlets(updatedOutlets);
    closeModals();
  };

  const handleDeleteOutlet = () => {
    const updatedOutlets = outlets.filter(
      outlet => outlet.id !== currentOutlet.id
    );
    localStorage.setItem('outlets', JSON.stringify(updatedOutlets));
    setOutlets(updatedOutlets);
    closeModals();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Outlet Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Outlet
        </button>
      </div>

      {outlets.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No Outlet available. Add a new product to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {outlets.map((outlet) => (
                <tr key={outlet.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{outlet.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {outlet.address}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(outlet)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(outlet)}
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

      {/* Add Outlet Modal */}
      <Modal
        isOpen={isAddModalOpen}
        title="Add New Outlet"
        onClose={closeModals}
      >
        <OutletForm formData={formData} handleChange={handleChange} />
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAddOutlet}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Outlet
          </button>
        </div>
      </Modal>

      {/* Edit Outlet Modal */}
      <Modal
        isOpen={isEditModalOpen}
        title="Edit Outlet"
        onClose={closeModals}
      >
        <OutletForm formData={formData} handleChange={handleChange} />
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateOutlet}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Update Outlet
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Outlet"
        onClose={closeModals}
      >
        <div className="p-4">
          <p className="text-gray-700">
            Are you sure you want to delete "{currentOutlet?.name}"? This action cannot be undone.
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
            onClick={handleDeleteOutlet}
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
const OutletForm = ({ formData, handleChange }) => (
  <div>
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Outlet Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Enter outlet name"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Address
      </label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Enter outlet name"
      />
    </div>
  </div>
);
