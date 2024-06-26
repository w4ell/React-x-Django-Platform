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
  InsertData,
  ChartsView,
  ProfileSettings,
  PasswordReset,
  PasswordResetConfirm,
} from "./pages/user";
import { Home, Login, Register, ActivationPage } from "./pages";
import {
  AdminDashboard,
  AdminLayout,
  AdminUsersList,
  AdminUserDetails,
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
    path: "/insert-data",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/insert-data",
        element: <InsertData />,
      },
    ],
  },
  {
    path: "/charts-view",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/charts-view",
        element: <ChartsView />,
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
    path: "/admin-users/user/:id",
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin-users/user/:id",
        element: <AdminUserDetails />,
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
