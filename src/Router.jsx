import React from "react";
import { Routes, Route, Navigate } from "react-router";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomeView from "./pages/HomeView";
import Detail from "./pages/Details";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import TicketResult from "./pages/TicketResult";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

import DashboardAdmin from "./pages/DashboardAdmin";
import MovieAdmin from "./pages/MovieAdmin";
import AddNewMovie from "./components/AddNewMovie";

import RootLayout from "./components/layouts/RootLayout";
import UserLayout from "./components/layouts/UserLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import MoviesLayout from "./components/layouts/MoviesLayout";
import AdminLayout from "./components/layouts/AdminLayout"; 

function Router() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="movie" element={<MovieAdmin />} />
        <Route path="add-movie" element={<AddNewMovie />} />
      </Route>

      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route path="/movies" element={<MoviesLayout />}>
        <Route index element={<HomeView />} />
        <Route path=":id">
          <Route index element={<Detail />} />
          <Route path="order" element={<Order />} />
          <Route path="order/payment" element={<Payment />} />
          <Route path="order/payment/ticket-result" element={<TicketResult />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;