import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Port {
  id: number;
  locode: string;
  country_code: string;
  country_name: string;
  port_code: string;
  port_name: string;
}

interface PortState {
  ports: Port[];
  loading: boolean;
  error: string | null;
}

const initialState: PortState = {
  ports: [],
  loading: false,
  error: null,
};

export const fetchPortCodes = createAsyncThunk(
  "ports/fetchPortCodes",
  async (search: string, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/port-codes?search=${encodeURIComponent(
          search
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch port codes");
      }

      const data = await response.json();
      return data.portCodes; // Extract `portCodes` from the response
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const portSlice = createSlice({
  name: "ports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortCodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.ports = action.payload; // Update state with `portCodes`
      })
      .addCase(fetchPortCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default portSlice.reducer;
