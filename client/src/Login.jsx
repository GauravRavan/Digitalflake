import React, { useState } from "react";
import loginImage from "./assets/loginImage.svg";
import logo from "./assets/logod.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, SetPassword] = useState();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/admin", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "sucess") {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#DDE0FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        fontFamily: "'Popins', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "90vh",
          top: "40px",
          left: "46px",
          borderRadius: "15px",
          backgroundColor: "#FFFFFF",
          padding: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              />
            </div>
            <div>
              <p
                style={{
                  color: "#717070",
                  lineHeight: "48px",
                  fontWeight: "400",
                  fontSize: "32px",
                  marginBottom: "40px",
                  marginTop: "0px",
                }}
              >
                Welcome to Digitalflake Admin
              </p>
            </div>
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <label
                style={{
                  position: "absolute",
                  top: "1%",
                  transform: "translateY(-50%)",
                  left: "10px",
                  zIndex: "1",
                  backgroundColor: "#FFFFFF",
                  padding: "0 5px",
                  color: "#676767",
                  lineHeight: "16px",
                  fontWeight: "400",
                  fontSize: "27px",
                }}
              >
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  paddingLeft: "30px",
                  width: "40vw",
                  height: "8vh",
                  marginBottom: "10px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px", position: "relative" }}>
              <label
                style={{
                  position: "absolute",
                  top: "17%",
                  transform: "translateY(-50%)",
                  left: "10px",
                  zIndex: "1",
                  backgroundColor: "#FFFFFF",
                  padding: "0 5px",
                  color: "#676767",
                  lineHeight: "16px",
                  fontWeight: "400",
                  fontSize: "27px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => SetPassword(e.target.value)}
                aria-describedby="passwordHelpBlock"
                style={{
                  paddingLeft: "30px",
                  width: "40vw",
                  height: "8vh",
                  marginTop: "17px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            ></div>
            <div>
              <a
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{
                  marginLeft: "31.5vw",
                  color: "#A08CB1",
                  textDecoration: "none",
                }}
                href="#"
              >
                Forgot Password?
              </a>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body">
                      <p style={{ textAlign: "center", marginTop: "10px" }}>
                        Did you forget your password?
                      </p>
                      <p style={{ textAlign: "center" }}>
                        Enter your email address and we'll send you a link to
                        restore password
                      </p>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email Address:
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                        />
                      </div>
                      <div className="d-grid gap-2">
                        <button
                        
                          type="button"
                          style={{
                            background: " #5C218B",
                          }}
                          className="btn btn-primary"
                        >
                          Request Reset Link
                        </button>
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "10px",
                          marginBottom: "30px",
                        }}
                      >
                        <a
                          data-bs-dismiss="modal" aria-label="Close"
                          style={{ textDecoration: "none" }}
                          href="#"
                        >
                          Back to Login
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                style={{
                  width: "40vw",
                  borderRadius: "8px",
                  height: "7vh",
                  backgroundColor: " #5C218B",
                  color: "#FFFFFF",
                  marginTop: "40px",
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
      <img
        src={loginImage}
        alt="Login Image"
        style={{ alignItems: "center", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default Login;
