import { useState, useEffect } from 'react';
import Modal from '../components/commons/Modal';

export default function UserMenu() {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    roles: '',
  });

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openAddModal = () => {
    setFormData({ name: '', email: '', roles: '', username: '',});
    setIsAddModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email.toString(),
      roles: user.roles,
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleAddUser = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.roles || !formData.username) {
      alert('Please fill in all fields');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      username: formData.username,
      roles: formData.roles,
    };

    setUsers([...users, newUser]);
    closeModals();
  };

  const handleUpdateUser = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.roles || !formData.username) {
      alert('Please fill in all fields');
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          name: formData.name,
          email: formData.email,
          username: formData.username,
          roles: formData.roles,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    closeModals();
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter(
      user => user.id !== currentUser.id
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    closeModals();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={openAddModal}
          className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-blue-900"
        >
          Add New User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No User available. Add a new product to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.roles}</td>
                  <td className="flex justify-center items-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-indigo-500 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
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

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        title="Add New User"
        onClose={closeModals}
      >
        <UserForm formData={formData} handleChange={handleChange}/>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-blue-900"
          >
            Add User
          </button>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        title="Edit User"
        onClose={closeModals}
      >
        <UserForm formData={formData} handleChange={handleChange}/>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModals}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateUser}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-900"
          >
            Update User
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete User"
        onClose={closeModals}
      >
        <div className="p-4">
          <p className="text-gray-900">
            Are you sure you want to delete "{currentUser?.name}"? This action cannot be undone.
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
            onClick={handleDeleteUser}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-900"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
  // Form fields component for reuse
  const UserForm = ({formData, handleChange}) => (
    <div>
      <div className="mb-4">
        <label className="block text-gray-900 font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter user name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-900 font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter user name"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-900 font-medium mb-2">
          email
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="email@email"
        />
      </div>
    <div className="mb-4">
      <label className="block text-gray-900 font-medium mb-2">
        Roles
      </label>
      <select
        name="roles"
        value={formData.roles}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Roles</option>
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
        <option value="kasir">Kasir</option>
      </select>
    </div>
    </div>
  );
