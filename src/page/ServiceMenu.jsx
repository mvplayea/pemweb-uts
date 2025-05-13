import { useState, useEffect } from 'react';
import Modal from '../components/commons/Modal';

// product
export default function ServiceMenu() {
  const [services, setServices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
  });

  // Load services from localStorage on component mount
  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  useEffect(() => {
    if(services.length > 0) {
      localStorage.setItem('services', JSON.stringify(services));
    }
  }, [services]);

  // Save services to localStorage whenever the services state changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const openAddModal = () => {
    setFormData({ name: '', category: '' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (service) => {
    setCurrentService(service);
    setFormData({
      name: service.name,
      category: service.category
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (service) => {
    setCurrentService(service);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleAddService = () => {
    // Basic validation
    if (!formData.name || !formData.category) {
      alert('Please fill in all fields');
      return;
    }

    const newService = {
      id: Date.now(),
      name: formData.name,
      category: formData.category
    };

    setServices([...services, newService]);
    closeModals();
  };

  const handleUpdateService = () => {
    // Basic validation
    if (!formData.name || !formData.category) {
      alert('Please fill in all fields');
      return;
    }

    const updatedServices = services.map(service => {
      if (service.id === currentService.id) {
        return {
          ...service,
          name: formData.name,
          category: formData.category
        };
      }
      return service;
    });

    setServices(updatedServices);
    closeModals();
  };

  const handleDeleteService = () => {
    const updatedServices = services.filter(
      service => service.id !== currentService.id
    );
    localStorage.setItem('services', JSON.stringify(updatedServices));
    setServices(updatedServices);
    closeModals();
  };

  // Form fields component for reuse
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Service Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Service
        </button>
      </div>

      {services.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No services available. Add a new service to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {service.category}
                    </span>
                  </td>
                  <td className="flex justify-center items-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(service)}
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

      {/* Add Service Modal */}
      <Modal
        isOpen={isAddModalOpen}
        title="Add New Service"
        onClose={closeModals}
      >
        <ServiceForm formData={formData} handleChange={handleChange}/>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAddService}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Service
          </button>
        </div>
      </Modal>

      {/* Edit Service Modal */}
      <Modal
        isOpen={isEditModalOpen}
        title="Edit Service"
        onClose={closeModals}
      >
        <ServiceForm formData={formData} handleChange={handleChange}/>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateService}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Update Service
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Service"
        onClose={closeModals}
      >
        <div className="p-4">
          <p className="text-gray-700">
            Are you sure you want to delete "{currentService?.name}"? This action cannot be undone.
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
            onClick={handleDeleteService}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

const ServiceForm = ({ formData, handleChange }) => (
  <div>
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Service Name
      </label>
      <input
        type="text"
        name="name"
        value={formData?.name}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Enter service name"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Category
      </label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Select category</option>
        <option value="Express">Express</option>
        <option value="Regular">Regular</option>
      </select>
    </div>
  </div>
);

// Modal component for reuse