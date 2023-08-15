import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import AppLayout from "./layouts/AppLayout";
import ItemList from "./components/pages/Item/ItemList";
import AddItem from "./components/pages/Item/AddItem";
import EditItem from "./components/pages/Item/EditItem";
import InventoryList from "./components/pages/Inventory/InventoryList";
import AddInventory from "./components/pages/Inventory/AddInventory";
import EditInventory from "./components/pages/Inventory/EditInventory";
import InventoryHistoryList from "./components/pages/InventoryHistory/InventoryHistoryList";
import StockIn from "./components/pages/Adjustments/StockIn";
import ReturnStocks from "./components/pages/Adjustments/ReturnStocks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/items",
        element: <ItemList />,
      },
      {
        path: "/items/create",
        element: <AddItem />,
      },
      {
        path: "/items/edit/:id",
        element: <EditItem />,
      },
      {
        path: "/inventories",
        element: <InventoryList />,
      },
      {
        path: "/inventories/create",
        element: <AddInventory />,
      },
      {
        path: "/inventories/edit/:id",
        element: <EditInventory />,
      },
      {
        path: "/inventory-history",
        element: <InventoryHistoryList />,
      },
      {
        path: "/stock-in",
        element: <StockIn />,
      },
      {
        path: "/return-stocks",
        element: <ReturnStocks />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
