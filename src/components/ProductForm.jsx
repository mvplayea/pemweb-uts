import { useState, useEffect } from 'react';

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
  });
  const [products, setProducts] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load existing products from localStorage on component mount
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in all fields');
      return;
    }

    // Create new product with unique ID
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
    };

    // Update products array
    const updatedProducts = [...products, newProduct];
    
    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Update state
    setProducts(updatedProducts);
    
    // Reset form
    setFormData({
      name: '',
      price: '',
      category: '',
    });
    
    // Show success message
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      
      {isSubmitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Product successfully added!
        </div>
      )}
      
      <div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="food">Food</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Save Product
        </button>
      </div>
      
      {products.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Saved Products ({products.length})</h3>
          <div className="max-h-60 overflow-y-auto">
            {products.map((product) => (
              <div key={product.id} className="p-3 mb-2 bg-gray-50 rounded-md border border-gray-200">
                <p className="font-medium">{product.name}</p>
                <p className="text-gray-600 text-sm">
                  ${product.price.toFixed(2)} • {product.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}