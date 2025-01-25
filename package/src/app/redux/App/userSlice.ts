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
  image?: string;
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

  export const createUser = createAsyncThunk(
    "user/createUser",
    async (newUserData: FormData, { rejectWithValue }) => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-user`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: newUserData,
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to create user");
        }
  
        const createdUser: User = await response.json();
        return createdUser;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const updateUserProfile = createAsyncThunk(
    "user/updateUserProfile",
    async (
      { userId, formData }: { userId: number; formData: FormData },
      { rejectWithValue }
    ) => {
      const token = localStorage.getItem("token"); 
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-user-profile`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to update user profile");
        }
  
        const updatedUser: User = await response.json();
        return updatedUser;
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
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;

        // Add the newly created user to the list
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.users.findIndex(
          (user) => user.userId === action.payload.userId
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
