import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backendFetch } from "../../api/backend";

export const fetchSchedules = createAsyncThunk(
    "order/fetchSchedules",
    async ({ movieId, date, city }, { rejectWithValue }) => {
        try {
            let url = `/orders/schedules/${movieId}`;
            const params = new URLSearchParams();
            if (date) params.append("date", date);
            if (city) params.append("city", city);

            const queryString = params.toString();
            if (queryString) url += `?${queryString}`;

            const response = await backendFetch(url);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchSeats = createAsyncThunk(
    "order/fetchSeats",
    async (scheduleId, { rejectWithValue }) => {
        try {
            const response = await backendFetch(`/orders/seats/${scheduleId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchScheduleDetail = createAsyncThunk(
    "order/fetchScheduleDetail",
    async ({ movieId, scheduleId }, { rejectWithValue }) => {
        try {
            const response = await backendFetch(`/orders/schedules/${movieId}`);
            const schedule = response.data.find(s => s.id === parseInt(scheduleId));
            if (!schedule) throw new Error("Schedule not found");
            return schedule;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async ({ scheduleId, seats, paymentMethod, token }, { rejectWithValue }) => {
        try {
            const response = await backendFetch("/orders", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    schedule_id: parseInt(scheduleId),
                    seats: seats.map(s => s.seat_id),
                    payment_method: paymentMethod,
                }),
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        schedules: [],
        activeSchedule: null,
        seats: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearSchedules: (state) => {
            state.schedules = [];
        },
        clearOrderState: (state) => {
            state.activeSchedule = null;
            state.seats = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedules.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSchedules.fulfilled, (state, action) => {
                state.loading = false;
                state.schedules = action.payload || [];
            })
            .addCase(fetchSchedules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.schedules = [];
            })
            .addCase(fetchSeats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSeats.fulfilled, (state, action) => {
                state.loading = false;
                state.seats = action.payload || [];
            })
            .addCase(fetchSeats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchScheduleDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchScheduleDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.activeSchedule = action.payload;
            })
            .addCase(fetchScheduleDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSchedules, clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
