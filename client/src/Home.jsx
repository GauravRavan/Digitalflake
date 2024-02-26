import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import HomeLogo from "./assets/homelogo.svg";
import CategoryIcon from "./assets/category.svg";
import ProductsIcon from "./assets/products.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "./assets/logod.svg";
import catlogo from "./assets/catlogo.svg";
import searchIcon from "./assets/search.svg";
import axios from "axios";
// import s from "assets/deleteicon.svg";
import dd from "./assets/dd.svg";
import { useNavigate } from "react-router-dom";
import arrowup from "./assets/arrowup.svg";
import editbtn from "./assets/Editbtn.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import deleteicon from "./assets/deleteicon.svg";
import mainlogo from "./assets/mainlogo.png";
import amulmilk from "./assets/amulmilk.svg";

function Home() {
  const [selectedOption, setSelectedOption] = useState("Home");
  const [products, setProducts] = useState([]);
  const [categoryload, setCategoryLoad] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [packSize, setPackSize] = useState("");
  const [mrp, setMrp] = useState("");
  const [productImage, setProductImage] = useState("");
  const [status, setStatus] = useState("active");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("active");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createProduct", {
        name: productName,
        packsize: packSize, // Ensure field name matches the schema
        category: category,
        mrp: mrp,
        status: status,
        productImage: productImage,
      })
      .then((result) => {
        console.log(result);
        navigate("/home");
        alert("prodcut added");
      })
      .catch((err) => console.log(err));

    // Send form data to server or perform necessary actions
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/checkAuth")
      .then((response) => {
        console.log(response);
        if (response.data === "success") {
          // User is authenticated, do nothing
        } else {
          navigate("/"); // Redirect to login page
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products") // Fetch products from /products endpoint
      .then((result) => {
        console.log("Products data:", result.data);
        setProducts(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/Category") // Fetch products from /products endpoint
      .then((result) => {
        console.log("Products data:", result.data);
        setCategoryLoad(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const handleDelte = (id) => {
    axios
      .delete("http://localhost:3001/deleteUser/" + id)
      .then((result) => {
        console.log(result);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      })
      .catch((err) => console.log(err));
    console.log(id);
  };

  const handleDeleteCategory = (id) => {
    axios
      .delete("http://localhost:3001/deleteCategory/" + id)
      .then((result) => {
        console.log(result);
        setCategoryLoad((prevCategory) =>
          prevCategory.filter((categoryload) => categoryload._id !== id)
        );
      })
      .catch((err) => console.log(err));
    console.log(id);
  };

  const handleAddUserClick = () => {
    setShowAddUserForm(true); // Set showAddUserForm state to true when "Add User" button is clicked
  };
  const handleCancleAddUserClick = () => {
    setShowAddUserForm(false); // Set showAddUserForm state to true when "Add User" button is clicked
  };
  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(true); // Show the form
  };

  // Handler to cancel adding a category
  const handleCancelAddCategoryClick = () => {
    setShowAddCategoryForm(false); // Hide the form
  };
  const handleCategorySubmit = (e) => {
    e.preventDefault();
  };
  const handleAddCategory = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createCategory", {
        categoryName,
        categoryDescription,
        categoryStatus,
      })
      .then((category) => {
        console.log(category);
        axios
          .get("http://localhost:3001/Category")
          .then((result) => {
            console.log("Updated Categories:", result.data);
            setCategoryLoad(result.data); // Update the state with the new list of categories
          })
          .catch((err) => console.log(err));
        navigate("/home");
        alert("category added");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearAuthenticationTokens = () => {
    // Remove the authentication token from browser cookies
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/logout")
      .then((response) => {
        if (response.data.Status === "success") {
          navigate("/"); // Navigate to the home page after logout
        } else {
          alert("Logout failed"); // Show an alert if logout failed
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div>
      <Navbar></Navbar>

      <div style={{ display: "flex", height: "90vh" }}>
        {/* Left Sidebar */}
        <div
          style={{
            width: "25vw",
            backgroundColor: "#F4F4F4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                justifyContent: "center",
              }}
              onClick={() => handleOptionClick("Home")}
            >
              <img
                src={HomeLogo}
                alt="Home"
                style={{ height: "40px", cursor: "pointer" }}
              />
              <span style={{ marginLeft: "1vw" }}>Home</span>
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ color: "black", marginLeft: "15vw" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                justifyContent: "center",
              }}
              onClick={() => handleOptionClick("Category")}
            >
              <img
                src={CategoryIcon}
                alt="Category"
                style={{ height: "40px", cursor: "pointer" }}
              />
              <span style={{ marginLeft: "1vw" }}>Category</span>
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ color: "black", marginLeft: "13.5vw" }}
              />
            </div>
            <div onClick={() => handleOptionClick("Products")}>
              <img
                src={ProductsIcon}
                alt="Products"
                style={{ height: "40px", cursor: "pointer" }}
              />
              <span style={{ marginLeft: "1vw" }}>Products</span>
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ color: "black", marginLeft: "13.5vw" }}
              />
            </div>
          </div>
          <FontAwesomeIcon icon={faCaretRight} style={{ color: "white" }} />
        </div>

        {/* Right Section */}
        <div
          style={{ width: "75vw", backgroundColor: "#FFFFFF", padding: "20px" }}
        >
          {/* Content based on selectedOption */}
          {selectedOption === "Home" && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Logout button */}
              <button
                style={{
                  position: "absolute",
                  top: "80px",
                  right: "10px",
                  background: "#FFFFFF",

                  color: "#FFFFFF",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  color: "red",
                  border: "2px solid red",
                }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                // Add your logout function here
              >
                Logout
              </button>
              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center", // Align items vertically
                      }}
                      class="modal-header"
                    >
                      <h1
                        class="modal-title fs-5"
                        id="staticBackdropLabel"
                        style={{ textAlign: "center" }}
                      >
                        <img
                          style={{ marginBottom: "20px" }}
                          src={deleteicon}
                          alt=""
                        />
                        <span
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "40px",
                            fontWeight: "500",
                            lineHeight: "40px",
                            letterSpacing: "0em",
                            // textAlign: "center",
                          }}
                        >
                          Log Out
                        </span>
                      </h1>
                      {/* <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button> */}
                    </div>
                    <div class="modal-body">
                      Are you sure you want to Logout ?
                    </div>
                    <div class="modal-footer">
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center", // Vertically center the content
                          justifyContent: "center", // Horizontally center the content
                          height: "35px",
                          color: "white",
                          background: "#662671",
                          width: "170px",
                          borderRadius: "150px",
                          marginRight: "10px",
                          marginBottom: "10px",
                        }}
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={(e) => handleLogout()}
                      >
                        Confirm
                      </button>
                      <button
                        style={{
                          background: "#FFFFFF",
                          height: "35px",
                          marginRight: "10px",
                          width: "170px",
                          marginBottom: "10px",
                          borderRadius: "150px",
                        }}
                        type="button"
                        data-bs-dismiss="modal"
                      >
                        Cancle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main content */}
              <div>
                <img src={logo} alt="logo" />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: "400",
                    fontSize: "32px",
                    lineHeight: "38.73px",
                  }}
                >
                  Welcome to Digitalflake Admin
                </span>
              </div>
            </div>
          )}

          {selectedOption === "Category" && (
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={catlogo}
                    alt="Category"
                    style={{ height: "40px", marginRight: "10px" }}
                  />
                  <span
                    style={{
                      marginLeft: "5px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "36px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Category
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    style={{
                      paddingLeft: "30px",
                      width: "40vw",
                      height: "40px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      backgroundImage: `url(${searchIcon})`,
                      backgroundPosition: "10px 10px",
                      backgroundSize: "20px",
                      backgroundRepeat: "no-repeat",
                      marginLeft: "30px",
                    }}
                  />
                  <button
                    style={{
                      background: "#662671",
                      color: "#FFFFFF",
                      borderRadius: "10px",
                      width: "110px",
                      height: "40px",
                      marginLeft: "auto",
                    }}
                    onClick={handleAddCategoryClick}
                  >
                    Add New
                  </button>
                </div>
                {showAddCategoryForm ? (
                  <div>
                    <form
                      onSubmit={handleCategorySubmit}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div style={{ display: "flex", marginBottom: "10px" }}>
                        <div style={{ marginRight: "10px" }}>
                          <label htmlFor="categoryName">Category Name:</label>
                          <input
                            type="text"
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            style={{ width: "100%" }} // Set width for consistency
                            required
                          />
                        </div>
                        <div style={{ marginLeft: "50px" }}>
                          <label htmlFor="categoryDescription">
                            Category Description:
                          </label>
                          <input
                            type="text"
                            id="categoryDescription"
                            value={categoryDescription}
                            onChange={(e) =>
                              setCategoryDescription(e.target.value)
                            }
                            style={{ width: "100%" }} // Set width for consistency
                            required
                          />
                        </div>
                        <div style={{ marginLeft: "50px" }}>
                          <label htmlFor="categoryStatus">
                            Category Status:
                          </label>
                          <select
                            id="categoryStatus"
                            value={categoryStatus}
                            onChange={(e) => setCategoryStatus(e.target.value)}
                            style={{ width: "150%" }} // Set width for consistency
                            required
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          style={{
                            background: "#FFFFFF",
                            height: "35px",
                            marginRight: "10px",
                            width: "170px",
                            marginBottom: "10px",
                            position: "fixed",
                            bottom: 0,
                            right: "230px",
                            borderRadius: "150px",
                          }}
                          onClick={handleCancelAddCategoryClick}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          style={{
                            height: "35px",
                            color: "white",
                            background: "#662671",
                            width: "170px",
                            marginRight: "30px",
                            marginBottom: "10px",
                            position: "fixed",
                            bottom: 0,
                            right: "20px",
                            borderRadius: "150px",
                          }}
                          onClick={handleAddCategory}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    <table className="table" style={{ borderSpacing: "1" }}>
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            ID
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "4px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            Name
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "5px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            Description
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "5px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            Status
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "5px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryload.map((category) => (
                          <tr
                            key={category._id}
                            style={{ marginBottom: "10px !important" }}
                          >
                            <td>{category.id}</td>
                            <td>{category.categoryName}</td>
                            <td>{category.categoryDescription}</td>
                            <td>{category.categoryStatus}</td>
                            <td>
                              <img
                                style={{ marginRight: "13px" }}
                                src={editbtn}
                                alt=""
                              />
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                              >
                                <img src={dd} alt="" />
                              </a>

                              <div
                                class="modal fade"
                                id="staticBackdrop"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabindex="-1"
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center", // Align items vertically
                                      }}
                                      class="modal-header"
                                    >
                                      <h1
                                        class="modal-title fs-5"
                                        id="staticBackdropLabel"
                                        style={{ textAlign: "center" }}
                                      >
                                        <img
                                          style={{ marginBottom: "20px" }}
                                          src={deleteicon}
                                          alt=""
                                        />
                                        <span
                                          style={{
                                            fontFamily: "Poppins",
                                            fontSize: "40px",
                                            fontWeight: "500",
                                            lineHeight: "40px",
                                            letterSpacing: "0em",
                                            // textAlign: "center",
                                          }}
                                        >
                                          DELETE
                                        </span>
                                      </h1>
                                      {/* <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button> */}
                                    </div>
                                    <div class="modal-body">
                                      Are you sure you want to delete ?
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        style={{
                                          display: "flex",
                                          alignItems: "center", // Vertically center the content
                                          justifyContent: "center", // Horizontally center the content
                                          height: "35px",
                                          color: "white",
                                          background: "#662671",
                                          width: "170px",
                                          borderRadius: "150px",
                                          marginRight: "10px",
                                          marginBottom: "10px",
                                        }}
                                        type="button"
                                        class="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={(e) =>
                                          handleDeleteCategory(category._id)
                                        }
                                      >
                                        Save
                                      </button>
                                      <button
                                        style={{
                                          background: "#FFFFFF",
                                          height: "35px",
                                          marginRight: "10px",
                                          width: "170px",
                                          marginBottom: "10px",
                                          borderRadius: "150px",
                                        }}
                                        type="button"
                                        data-bs-dismiss="modal"
                                      >
                                        Cancle
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedOption === "Products" && (
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={ProductsIcon}
                    alt="products"
                    style={{ height: "40px", marginRight: "10px" }}
                  />
                  <span
                    style={{
                      marginLeft: "5px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "36px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Products
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    style={{
                      paddingLeft: "30px",
                      width: "40vw",
                      height: "40px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      backgroundImage: `url(${searchIcon})`,
                      backgroundPosition: "10px 10px",
                      backgroundSize: "20px",
                      backgroundRepeat: "no-repeat",
                      marginLeft: "30px",
                    }}
                  />
                  <button
                    style={{
                      background: "#662671",
                      color: "#FFFFFF",
                      borderRadius: "10px",
                      width: "110px",
                      height: "40px",
                      marginLeft: "auto",
                    }}
                    onClick={handleAddUserClick} // Call handleAddUserClick function when "Add User" button is clicked
                  >
                    Add New
                  </button>
                </div>
                {showAddUserForm ? (
                  // Render add user form when showAddUserForm state is true
                  <div>
                    <form
                      onSubmit={handleSubmit}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                          }}
                        >
                          <label htmlFor="category">Category:</label>
                          <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                          }}
                        >
                          <label htmlFor="productName">Product Name:</label>
                          <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                          }}
                        >
                          <label htmlFor="packSize">Pack Size:</label>
                          <input
                            type="text"
                            id="packSize"
                            value={packSize}
                            onChange={(e) => setPackSize(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                          }}
                        >
                          <label style={{}} htmlFor="mrp">
                            MRP:
                          </label>
                          <input
                            type="text"
                            id="mrp"
                            value={mrp}
                            onChange={(e) => setMrp(e.target.value)}
                            required
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                          }}
                        >
                          <label htmlFor="productImage">Product Image:</label>
                          <input
                            type="text"
                            id="productImage"
                            value={productImage}
                            onChange={(e) => setProductImage(e.target.value)}
                            required
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                          }}
                        >
                          <label htmlFor="status">Status:</label>
                          <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          type="button"
                          style={{
                            background: "#FFFFFF",
                            height: "35px",
                            marginRight: "10px",
                            width: "170px",
                            marginBottom: "10px",
                            position: "fixed",
                            bottom: 0,
                            right: "230px",
                            borderRadius: "150px",
                          }}
                          onClick={handleCancleAddUserClick}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          style={{
                            height: "35px",
                            color: "white",
                            background: "#662671",
                            width: "170px",
                            marginRight: "30px",
                            marginBottom: "10px",
                            position: "fixed",
                            bottom: 0,
                            right: "20px",
                            borderRadius: "150px",
                          }}
                          onClick={handleSubmit}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    {/* Table header and body */}
                    <table className="table" style={{ borderSpacing: "1" }}>
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            ID
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "4px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            Name
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "5px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            Pack Size
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "5px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            Category
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "5px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            MRP
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "5px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            Images
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "5px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            Status
                            <img
                              src={arrowup}
                              alt="UpDown"
                              style={{ marginLeft: "5px" }}
                            />
                          </th>
                          <th
                            scope="col"
                            style={{ backgroundColor: "#FFF8B7" }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {products.map((product) => (
                          <tr
                            key={product.id}
                            style={{ marginBottom: "10px !important" }}
                          >
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.packsize}</td>
                            <td>{product.category}</td>
                            <td>{product.mrp}</td>
                            <td>
                              <img src={amulmilk} alt="" />
                            </td>
                            <td>{product.status}</td>
                            <td>
                              {" "}
                              <img
                                style={{ marginRight: "13px" }}
                                src={editbtn}
                                alt=""
                              />
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                              >
                                <img src={dd} alt="" />
                              </a>
                              <div
                                class="modal fade"
                                id="staticBackdrop"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabindex="-1"
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center", // Align items vertically
                                      }}
                                      class="modal-header"
                                    >
                                      <h1
                                        class="modal-title fs-5"
                                        id="staticBackdropLabel"
                                        style={{ textAlign: "center" }}
                                      >
                                        <img
                                          style={{ marginBottom: "20px" }}
                                          src={deleteicon}
                                          alt=""
                                        />
                                        <span
                                          style={{
                                            fontFamily: "Poppins",
                                            fontSize: "40px",
                                            fontWeight: "500",
                                            lineHeight: "40px",
                                            letterSpacing: "0em",
                                            // textAlign: "center",
                                          }}
                                        >
                                          DELETE
                                        </span>
                                      </h1>
                                      {/* <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button> */}
                                    </div>
                                    <div class="modal-body">
                                      Are you sure you want to delete ?
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        style={{
                                          display: "flex",
                                          alignItems: "center", // Vertically center the content
                                          justifyContent: "center", // Horizontally center the content
                                          height: "35px",
                                          color: "white",
                                          background: "#662671",
                                          width: "170px",
                                          borderRadius: "150px",
                                          marginRight: "10px",
                                          marginBottom: "10px",
                                        }}
                                        type="button"
                                        class="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={(e) =>
                                          handleDelte(product._id)
                                        }
                                      >
                                        Save
                                      </button>
                                      <button
                                        style={{
                                          background: "#FFFFFF",
                                          height: "35px",
                                          marginRight: "10px",
                                          width: "170px",
                                          marginBottom: "10px",
                                          borderRadius: "150px",
                                        }}
                                        type="button"
                                        data-bs-dismiss="modal"
                                      >
                                        Cancle
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
