import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import ContextProvider from "./context/ContextProvider";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import {
  Layout,
  Dashboard,
  ProfileSettings,
  PasswordReset,
  PasswordResetConfirm,
} from "./pages/user";
import { Home, Login, Register, ActivationPage } from "./pages";
import {
  AdminDashboard,
  AdminLayout,
  AdminUsersList,
  AdminProfileSettings,
} from "./pages/admin";

const router = createBrowserRouter([
  //public routes
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/activate/:uid/:token",
    element: <ActivationPage />,
  },
  {
    path: "/password-reset",
    element: <PasswordReset />,
  },
  {
    path: "/password/reset/confirm/:uid/:token",
    element: <PasswordResetConfirm />,
  },
  //user routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/profile",
        element: <ProfileSettings />,
      },
    ],
  },
  //admin routes
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/admin-users",
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin-users",
        element: <AdminUsersList />,
      },
    ],
  },
  {
    path: "/admin-profile",
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin-profile",
        element: <AdminProfileSettings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </ContextProvider>
);
