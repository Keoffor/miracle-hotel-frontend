import React, { useEffect, useState, useContext } from "react";
import {
  getBookedRoomByEmail,
  getUserProfile,
  deleteUser,
} from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../contextProviders/AuthProvider";

const Profile = () => {
  const auth = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [bookings, setBookings] = useState([
    {
      bookingId: "",
      checkInDate: "",
      checkOutDate: "",
      bookingConfirmationCode: "",
      room: { id: "", roomType: "" },
    },
  ]);
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: [{}],
  });
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(userId);
        setUserInformation(data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(`User Profile Error: ${error.message}`);
        setUserInformation({
          id: null,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          roles: "",
        });
        setTimeout(() => {
          setErrorMessage("");
        }, 4000);
      }
    };

    const getBookedRoom = async () => {
      try {
        const response = await getBookedRoomByEmail(userId);
        setBookings(response);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getBookedRoom();
    fetchUserProfile();
  }, [userId]);

  const handleDeleteAccount = async () => {
    setModalVisible(false);
    await deleteUser(userId)
      .then((response) => {
        setMessage(response.data);
        auth.handleLogout();
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-success">{message}</p>}
      {userInformation ? (
        <div
          className="card p-5 mt-5"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <h4 className="card-title text-center">User Information</h4>
          <div className="card-body">
            <div className="col-md-10 mx-auto">
              <div className="card mb-3 shadow">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        alt="profile"
                        className="rounded-circle"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-10">
                    <div className="card-body">
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          ID :{" "}
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{userInformation.id}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          First Name :{" "}
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">
                            {userInformation.firstName}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Last Name :{" "}
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">
                            {userInformation.lastName}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Email :{" "}
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{userInformation.email}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Roles :{" "}
                        </label>
                        <div className="col-md-10">
                          <ul className="list-unstyled">
                            {userInformation.roles.map((role, index) => (
                              <li key={index} className="card-text">
                                {role.name
                                  ? role.name.substring(5)
                                  : "No role available"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="card-title text-center">Booking History</h4>
              {bookings !== undefined ? (
                <table className="table table-bordered table-hover shadow">
                  <thead>
                    <tr>
                      <th scope="col">Booking Id</th>
                      <th scope="col">Room Id</th>
                      <th scope="col">Room Type</th>
                      <th scope="col">Check-In Date</th>
                      <th scope="col">Check-Out Date</th>
                      <th scope="col">Confirmation Code</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.bookingId}>
                        <td>{booking.bookingId}</td>
                        <td>{booking.room.id}</td>
                        <td>{booking.room.roomType}</td>
                        <td>
                          {moment(booking.checkInDate)
                            .subtract(1, "month")
                            .format("MMM Do, YYYY")}
                        </td>
                        <td>
                          {moment(booking.checkOutDate)
                            .subtract(1, "month")
                            .format("MMM Do, YYYY")}
                        </td>

                        <td>{booking.bookingConfirmationCode}</td>
                        <td className="text-success">On-going</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-3 mb-3">You have not made booking yet</p>
              )}

              <button
                className="btn btn-danger"
                onClick={() => setModalVisible(true)}
              >
                Close Account
              </button>

              {isModalVisible && (
                <div
                  className="modal fade show"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="staticBackdropLabel"
                  style={{
                    display: "block",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="modal-dialog mt-5 py-5">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Confirm Deletion
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setModalVisible(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to close your account? This action
                        cannot be undone.
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setModalVisible(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleDeleteAccount}
                        >
                          Yes, Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <strong role="status">Loading user data...</strong>
          <div className="spinner-border ms-auto" aria-hidden="true"></div>
        </>
      )}
    </div>
  );
};

export default Profile;
