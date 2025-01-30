import "./App.css";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import EditRoom from "./components/room/EditRoom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import "./index.css";

import RoomListing from "./components/room/RoomListing";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import Admin from "./components/admin/Admin";
import CheckOut from "./components/booking/CheckOut";
import BookingSuccess from "./components/booking/BookingSuccess";
import Bookings from "./components/booking/Bookings";
import FindBooking from "./components/booking/FindBooking";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
import AuthProvider from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route
            path="/existing-room"
            element={
              <RequireAuth>
                <ExistingRooms />
              </RequireAuth>
            }
          />
          <Route
            path="/add-room"
            element={
              <RequireAuth>
                <AddRoom />
              </RequireAuth>
            }
          />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route
            path="/bookings/:roomId"
            element={
              <RequireAuth>
                <CheckOut />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
           <Route
            path="/existing-booking"
            element={
              <RequireAuth>
                <Bookings />
              </RequireAuth>
            }
          />
              <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/find-booking" element={<FindBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
export default App;
