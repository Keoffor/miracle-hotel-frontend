// Function to generate the initial state
export const createInitialOrderRequest = () => ({
    guestFullName: "",
    guestEmail: "",
    bookedRooms: [{
      roomId: null,
      roomType: "",
      amount: null,
      noOfDays: 0,
      currency: ""
    }],
    address: {
      street: "",
      state: "",
      zipCode: ""
    }
  });
  