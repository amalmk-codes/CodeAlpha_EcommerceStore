import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { CartContext } from "../context/CartContext";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } =
    useContext(CartContext);

  const [product, setProduct] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [comment, setComment] =
    useState("");

  const [rating, setRating] =
    useState(5);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(
        `/products/${id}`
      );

      setProduct(
        res.data.product
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(
        `/reviews/${id}`
      );

      setReviews(
        res.data.reviews
      );
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      alert(
        "Please Login First"
      );
      return;
    }

    try {
      await API.post(
        "/reviews",
        {
          productId: id,
          userId:
            localStorage.getItem(
              "userId"
            ),
          userName:
            localStorage.getItem(
              "userName"
            ),
          rating,
          comment,
        }
      );

      setComment("");
      setRating(5);

      fetchReviews();

      alert(
        "Review Added Successfully"
      );
    } catch (error) {
      console.log(error);
      alert(
        "Failed To Add Review"
      );
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) =>
              sum +
              review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : 0;

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "350px",
            borderRadius:
              "12px",
          }}
        />

        <div>
          <h1>
            {product.name}
          </h1>

          <p
            style={{
              color:
                "#f59e0b",
              fontWeight:
                "bold",
              fontSize:
                "18px",
            }}
          >
            ⭐ {averageRating}
            {" "}
            (
            {reviews.length}
            {" "}
            Reviews)
          </p>

          <h2
            style={{
              color:
                "#2563eb",
            }}
          >
            ₹
            {product.price}
          </h2>

          <p>
            {
              product.description
            }
          </p>

          <p>
            <strong>
              Category:
            </strong>{" "}
            {
              product.category
            }
          </p>

          <p>
            <strong>
              Stock:
            </strong>{" "}
            {
              product.stock
            }
          </p>

          <div
            style={{
              display:
                "flex",
              gap: "10px",
              marginTop:
                "20px",
            }}
          >
            <button
              onClick={() => {
                addToCart(
                  product
                );
                alert(
                  "Added To Cart"
                );
              }}
              style={{
                padding:
                  "12px 20px",
                backgroundColor:
                  "#2563eb",
                color:
                  "white",
                border:
                  "none",
                borderRadius:
                  "8px",
                cursor:
                  "pointer",
              }}
            >
              Add To Cart
            </button>

            <button
              onClick={() => {
                addToCart(
                  product
                );
                navigate(
                  "/cart"
                );
              }}
              style={{
                padding:
                  "12px 20px",
                backgroundColor:
                  "#16a34a",
                color:
                  "white",
                border:
                  "none",
                borderRadius:
                  "8px",
                cursor:
                  "pointer",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <hr
        style={{
          margin:
            "30px 0",
        }}
      />

      <h2>
        Write A Review
      </h2>

      <select
        value={rating}
        onChange={(e) =>
          setRating(
            Number(
              e.target.value
            )
          )
        }
      >
        <option value={5}>
          ⭐⭐⭐⭐⭐ (5)
        </option>
        <option value={4}>
          ⭐⭐⭐⭐ (4)
        </option>
        <option value={3}>
          ⭐⭐⭐ (3)
        </option>
        <option value={2}>
          ⭐⭐ (2)
        </option>
        <option value={1}>
          ⭐ (1)
        </option>
      </select>

      <br />
      <br />

      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) =>
          setComment(
            e.target.value
          )
        }
        style={{
          width: "100%",
          maxWidth:
            "600px",
          height: "100px",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <button
        onClick={
          submitReview
        }
        style={{
          padding:
            "10px 20px",
          backgroundColor:
            "#2563eb",
          color:
            "white",
          border: "none",
          borderRadius:
            "6px",
          cursor:
            "pointer",
        }}
      >
        Submit Review
      </button>

      <hr
        style={{
          margin:
            "30px 0",
        }}
      />

      <h2>
        Customer Reviews
      </h2>

      {reviews.length ===
      0 ? (
        <p>
          No Reviews Yet
        </p>
      ) : (
        reviews.map(
          (review) => (
            <div
              key={
                review._id
              }
              style={{
                border:
                  "1px solid #ddd",
                borderRadius:
                  "8px",
                padding:
                  "15px",
                marginBottom:
                  "15px",
              }}
            >
              <h4>
                {
                  review.userName
                }
              </h4>

              <p>
                ⭐
                {
                  review.rating
                }
                /5
              </p>

              <p>
                {
                  review.comment
                }
              </p>
            </div>
          )
        )
      )}
    </div>
  );
}

export default ProductDetails;