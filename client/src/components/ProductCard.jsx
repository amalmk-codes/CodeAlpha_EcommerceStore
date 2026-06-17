import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "15px",
        width: "280px",
        backgroundColor: "#fff",
        boxShadow:
          "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

      <div
        style={{
          display: "inline-block",
          background: "#dcfce7",
          color: "#166534",
          padding: "5px 10px",
          borderRadius: "5px",
          fontSize: "12px",
          marginBottom: "10px",
        }}
      >
        {product.category}
      </div>

      <h3>{product.name}</h3>

      <p
        style={{
          color: "#f59e0b",
          fontWeight: "bold",
        }}
      >
        ⭐ {product.avgRating || 0} (
        {product.reviewCount || 0} Reviews)
      </p>

      <p>{product.description}</p>

      <div
        style={{
          background: "#fee2e2",
          color: "#b91c1c",
          display: "inline-block",
          padding: "4px 8px",
          borderRadius: "5px",
          fontSize: "12px",
          marginBottom: "8px",
        }}
      >
        20% OFF
      </div>

      <h2
        style={{
          color: "#2563eb",
        }}
      >
        ₹{product.price}
      </h2>

      <p>
        Stock:
        <strong
          style={{
            marginLeft: "5px",
            color:
              product.stock > 0
                ? "green"
                : "red",
          }}
        >
          {product.stock}
        </strong>
      </p>

      {product.stock <= 0 && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          Out Of Stock
        </p>
      )}

      <Link
        to={`/products/${product._id}`}
      >
        <button
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          View Details
        </button>
      </Link>

      <button
        disabled={product.stock <= 0}
        onClick={() => addToCart(product)}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor:
            product.stock <= 0
              ? "#9ca3af"
              : "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor:
            product.stock <= 0
              ? "not-allowed"
              : "pointer",
        }}
      >
        {product.stock <= 0
          ? "Out Of Stock"
          : "Add To Cart"}
      </button>
    </div>
  );
}

export default ProductCard;