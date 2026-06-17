import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      const productsWithRatings =
        await Promise.all(
          res.data.products.map(
            async (product) => {
              try {
                const reviewRes =
                  await API.get(
                    `/reviews/${product._id}`
                  );

                const reviews =
                  reviewRes.data.reviews;

                const avgRating =
                  reviews.length > 0
                    ? (
                        reviews.reduce(
                          (sum, review) =>
                            sum + review.rating,
                          0
                        ) / reviews.length
                      ).toFixed(1)
                    : 0;

                return {
                  ...product,
                  avgRating,
                  reviewCount:
                    reviews.length,
                };
              } catch {
                return {
                  ...product,
                  avgRating: 0,
                  reviewCount: 0,
                };
              }
            }
          )
        );

      setProducts(productsWithRatings);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    })
    .sort((a, b) => {
      if (sortBy === "lowToHigh") {
        return a.price - b.price;
      }

      if (sortBy === "highToLow") {
        return b.price - a.price;
      }

      if (sortBy === "aToZ") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "zToA") {
        return b.name.localeCompare(a.name);
      }

      return 0;
    });

  return (
    <div style={{ padding: "30px" }}>
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",
          color: "white",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>
          Welcome to E-Commerce Store
        </h1>

        <p style={{ fontSize: "1.2rem" }}>
          Discover the latest products at
          the best prices.
        </p>

        <button
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Shop Now
        </button>
      </div>

      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        🛒 Products
      </h1>

      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "12px",
            width: "350px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Categories */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() =>
            setCategory("All")
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setCategory("Mobiles")
          }
          style={{ marginLeft: "10px" }}
        >
          Mobiles
        </button>

        <button
          onClick={() =>
            setCategory("Laptops")
          }
          style={{ marginLeft: "10px" }}
        >
          Laptops
        </button>

        <button
          onClick={() =>
            setCategory("Accessories")
          }
          style={{ marginLeft: "10px" }}
        >
          Accessories
        </button>

        <button
          onClick={() =>
            setCategory("Storage")
          }
          style={{ marginLeft: "10px" }}
        >
          Storage
        </button>
      </div>

      {/* Sort Products */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
            minWidth: "220px",
          }}
        >
          <option value="">
            Sort Products
          </option>

          <option value="lowToHigh">
            Price: Low → High
          </option>

          <option value="highToLow">
            Price: High → Low
          </option>

          <option value="aToZ">
            Name: A → Z
          </option>

          <option value="zToA">
            Name: Z → A
          </option>
        </select>
      </div>

      {/* Products */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Home;