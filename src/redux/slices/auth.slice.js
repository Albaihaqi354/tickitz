import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getRegisteredUsersFromStorage = () => {
  try {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error getting users from localStorage:", error);
    return [];
  }
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      if (!email || !password) {
        throw new Error("Email dan password harus diisi");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Format email tidak valid");
      }

      const registeredUsers = getRegisteredUsersFromStorage();
      
      const user = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Email atau password salah");
      }

      return {
        user: { email: user.email },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    return {};
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;