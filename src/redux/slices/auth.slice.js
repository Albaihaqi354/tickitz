/* eslint-disable no-unreachable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return re.test(password);
};

const getUsersFromLocalStorage = () => {
  try {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const saveUsersToLocalStorage = (users) => {
  try {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      if (!email || !password) {
        throw new Error("Email dan password harus diisi");
      }

      if (!validateEmail(email)) {
        throw new Error("Format email tidak valid");
      }

      const registeredUsers = getUsersFromLocalStorage();

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

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      if (!email || !password) {
        throw new Error("Semua field harus diisi");
      }

      if (!validateEmail(email)) {
        throw new Error("Format email tidak valid");
      }

      if (!validatePassword(password)) {
        throw new Error(
          "Password minimal 8 karakter dan harus mengandung setidaknya satu huruf dan satu angka."
        );
      }

      const registeredUsers = getUsersFromLocalStorage();

      const existingUser = registeredUsers.find((u) => u.email === email);
      if (existingUser) {
        throw new Error(
          "Email ini sudah terdaftar. Silakan gunakan email lain."
        );
      }

      const newUser = { email, password };
      registeredUsers.push(newUser);
      saveUsersToLocalStorage(registeredUsers);
      return {
        user: { email: newUser.email },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
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

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
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
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
