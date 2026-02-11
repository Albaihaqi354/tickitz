import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backendFetch } from "../../api/backend";

export const fetchProfile = createAsyncThunk(
    "user/fetchProfile",
    async (token, { rejectWithValue }) => {
        try {
            const response = await backendFetch("/user/", {
                token,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.profile = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer;
