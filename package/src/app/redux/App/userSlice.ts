import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  userId: number;
  username: string;
  full_name: string;
  phone: string;
  status: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (_, { rejectWithValue }) => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
  
        const data: User[] = await response.json();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

  
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
