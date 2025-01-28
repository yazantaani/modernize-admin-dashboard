import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Shipment {
  shipmentId: number;
  trackingNumber: string;
  carrierId: number;
  currentStatus: string;
  currentLocation: string;
  estimatedDeliveryDate: string;
  originAddress: string;
  destinationAddress: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface ShipmentState {
  shipments: Shipment[];
  loading: boolean;
  error: string | null;
}

const initialState: ShipmentState = {
  shipments: [],
  loading: false,
  error: null,
};

export const fetchShipments = createAsyncThunk(
  "shipment/fetchShipments",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-all-shipments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shipments");
      }

      const data: Shipment[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default shipmentSlice.reducer;
