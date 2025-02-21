import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

export const api2 = axios.create({
  baseURL: "http://localhost:9193",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/* this function add new room type to the database */
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  const token = localStorage.getItem("token");
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);
  try {
    const response = await api.post("/rooms/add/new-room", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error adding room:", error);
    return false; // Return false on error
  }
}
/* this function fetch all roomtypes from database*/
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/types");
    return response.data;
  } catch (error) {
    throw new Error("Error occurred fetching room types");
  }
}

/** this function fetches all rooms from the database */
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms");
    return result.data;
  } catch (error) {
    throw new Error(" Error occurred fetching rooms");
  }
}

/* this function delete room by ID*/
export async function deleteRoom(roomId) {
  try {
    const response = await api.delete(`/rooms/delete/room/${roomId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error occurred deleting room ${error.message}`);
  }
}

/* this function update room by room Id*/
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("photo", roomData.photo);
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);

  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: getHeader(),
  });
  return response;
}
/** This function find room by RoomId */
export async function getRoomById(roomId) {
  try {
    const response = await api.get(`/rooms/room/${roomId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error occurred fetching room ${error.message}`);
  }
}
/** This function saves a new booking into the database */
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(
      `/bookings/room/${roomId}/booking`,
      booking,
      {
        headers: getHeader(),
      }
    );
    return response.data;
  } catch (error) {
    if (error.message && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking room : ${error.message}`);
    }
  }
}
/** This function gets all bookings  from the database */
export async function getAllBookings() {
  try {
    const response = await api.get("/bookings/all-bookings", {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}
/** This function gets booking by the confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const response = await api.get(
      `/bookings/confirmation/${confirmationCode}`,
      {
        headers: getHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}

/** This function deletes booking from the database */
export async function cancelBooking(bookingId) {
  try {
    const response = await api.delete(`/bookings/booking/${bookingId}/delete`,{
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error cancelling booking: ${error.message}`);
  }
}
/** This function gets all available rooms from the database within a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  const queryUrl = `rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`;
  const result = await api.get(queryUrl);
  return result.data;
}

export async function registerUser(userData) {
  try {
    const response = await api.post("/auth/register-user", userData);
    return response.data;
  } catch (error) {
    if (error.message && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User Registration error : ${error.message}`);
    }
  }
}

export async function loginUser(userData) {
  try {
    const response = await api.post("/auth/login", userData);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserProfile(userId) {
  try {
    const response = await api.get(`/users/profile/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export async function getBookedRoomByEmail(email) {
  try {
    const response = await api.get(`/bookings/${email}/booking`, {
      headers: getHeader(),
    });

    return response.data;
  } catch (error) {
    return error.response.message;
  }
}

//This function retrieves all checkout bookings of customer placed in the cart.
export async function findBookingRoomsByEmailAndCustomerId(email, customerId) {
  try {
    const encodedEmail = encodeURIComponent(email);
    const encodedCustomerId = encodeURIComponent(customerId);
    const response = await api.get(
      `/booking/customer-bookings?email=${email}&customerId=${customerId}`,
        {headers: getHeader(),}
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(
      `Error fetching customer booking payment history: ${error.message}`
    );
  }
}

// ::::::::session for Customer Billing apis ::::::::::::::::::://

//This function allows customer to checkout for billing after booking a room
export async function paymentCheckout(paymentRequest) {
  try {
    const response = await api2.post("/payment/checkout", paymentRequest);
    return response.data;
  } catch (error) {
    return new Error(`Error creating billing session ${error.message}`);
  }
}


