// Function to generate the initial state
export const createInitialOrderRequest = () => ({
    guestFullName: "",
    guestEmail: "",
    customerId:"",
    bookedRooms: [{
      roomId: null,
      roomType: "",
      amount: 0,
      noOfDays: 0,
      currency: ""
    }],
    address: {
      street: "",
      state: "",
      zipCode: ""
    }
  });
  