import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    if (token && role === "admin") {
      fetchProducts();
      fetchStats();
    }
  }, []);

  if (!token) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Please Login First</h2>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Access Denied</h2>
      </div>
    );
  }

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const productsRes =
        await API.get("/products");

      const ordersRes =
        await API.get("/orders");

      const usersRes =
        await API.get("/user/count");

      const orders =
        ordersRes.data.orders || [];

      const revenue = orders.reduce(
        (sum, order) =>
          sum + order.totalAmount,
        0
      );

      const pendingOrders =
        orders.filter(
          (o) => o.status === "Pending"
        ).length;

      const deliveredOrders =
        orders.filter(
          (o) => o.status === "Delivered"
        ).length;

      setStats({
        products:
          productsRes.data.products
            ?.length || 0,

        orders: orders.length,

        users:
          usersRes.data.count || 0,

        revenue,

        pendingOrders,

        deliveredOrders,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "",
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/products",
        formData
      );

      alert("Product Added");

      resetForm();

      fetchProducts();
      fetchStats();
    } catch (error) {
      console.log(error);
      alert("Failed To Add Product");
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      description:
        product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/products/${editingId}`,
        formData
      );

      alert("Product Updated");

      resetForm();

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed To Update Product");
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/products/${id}`
      );

      alert("Product Deleted");

      fetchProducts();
      fetchStats();
    } catch (error) {
      console.log(error);
      alert("Failed To Delete Product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>{stats.products}</h2>
          <p>Products</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>{stats.orders}</h2>
          <p>Orders</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>{stats.users}</h2>
          <p>Users</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>₹{stats.revenue}</h2>
          <p>Total Revenue</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>{stats.pendingOrders}</h2>
          <p>Pending Orders</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>{stats.deliveredOrders}</h2>
          <p>Delivered Orders</p>
        </div>
      </div>

      {/* Product Form */}

      <form
        onSubmit={
          editingId
            ? updateProduct
            : addProduct
        }
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>
          {editingId
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          style={{ width: "300px" }}
        />

        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          {editingId
            ? "Update Product"
            : "Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{
              marginLeft: "10px",
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>All Products</h2>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <p>₹{product.price}</p>

          <p>{product.category}</p>

          <p>Stock: {product.stock}</p>

          <button
            onClick={() =>
              editProduct(product)
            }
            style={{
              marginRight: "10px",
            }}
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteProduct(product._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;