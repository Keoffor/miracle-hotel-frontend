import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192"
});

export const getHeader = () =>{
  const token = localStorage.getItem("token")
  return {
    Authorization : `Bearer ${token}`,
    "Content-Type" : "application/json"
  }
}

/* this function add new room type to the database */
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();

  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);
  try {
    const response = await api.post("/rooms/add/new-room", formData);
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
    const response = await api.delete(`/rooms/delete/room/${roomId}`);
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

  const response = await api.put(`/rooms/update/${roomId}`, formData);
  return response;
}
/** This function find room by RoomId */
export async function getRoomById(roomId) {
  try {
    const response = await api.get(`/rooms/room/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error occurred fetching room ${error.message}`);
  }
}
/** This function saves a new booking into the database */
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
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
      headers : getHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}
/** This function gets booking by the confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const response = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
    
  }
}

/** This function deletes booking from the database */
export async function cancelBooking(bookingId) {
    try {
        const response = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return response.data
    } catch (error) {
        throw new Error(`Error cancelling booking: ${error.message}`)
    }

}
/** This function gets all available rooms from the database within a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType){
  const queryUrl = `rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
  const result = await api.get(queryUrl)
  return result.data
}

export async function registerUser(userData){
  try {
    const response = await api.post("/auth/register-user",userData)
    return response.data
    
  } catch (error) {
    if (error.message && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User Registration error : ${error.message}`);
    }
  }
}

export async function loginUser(userData){
  try {
    const response = await api.post("/auth/login", userData)
    if (response.status >= 200 && response.status < 300) {
     return response.data
  } else{
    return null
  }
}catch (error) {
    console.error(error)
    return null
  }
}

export async function getUserProfile(userId){
  try {
    const response = await api.get(`/users/profile/${userId}`, {
      headers : getHeader()
    })
    return response.data
    
  } catch (error) {
    throw error
  }
}

export async function deleteUser(userId){
  try {
    const response = await api.delete(`/users/delete/${userId}`,{
      headers : getHeader()
    })
    return response.data

  } catch (error) {
    return error.message
  }
}

export async function getBookedRoomByEmail(email) {
  try {
    const response = await api.get(`/bookings/${email}/booking`, {
      headers : getHeader()
    })
    
    return response.data
  }catch(error){
    return error.response.message
  }
  
}