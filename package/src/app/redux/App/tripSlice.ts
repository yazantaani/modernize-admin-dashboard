import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the Trip interface
interface Trip {
  tripId: number;
  companyId: number;
  fromLocation: string;
  toLocation: string;
  tripDate: string;
  serviceType: "land" | "sea" | "air";
  pricePerKg: string; // Assuming the API returns pricePerKg as a string
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Define the state interface for the trips slice
interface TripState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}

const initialState: TripState = {
  trips: [],
  loading: false,
  error: null,
};

// Async thunk for fetching trips
export const fetchTrips = createAsyncThunk(
  "trip/fetchTrips",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getAllTrips`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trips");
      }

      const data = await response.json();
      console.log("API Response:", data);
      return data.trips; // Ensure `trips` is returned from the thunk
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a trip
export const addTrip = createAsyncThunk(
  "trip/addTrip",
  async (newTrip: Omit<Trip, "tripId" | "createdAt" | "updatedAt" | "deletedAt">, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/addTrip`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTrip),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add trip");
      }

      const data = await response.json();
      console.log("New Trip Added:", data);
      return data.trip; // Ensure the newly added trip is returned
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Trips
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Trip
      .addCase(addTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = [action.payload, ...state.trips]; // Prepend the new trip to the list
      })
      .addCase(addTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tripSlice.reducer;
