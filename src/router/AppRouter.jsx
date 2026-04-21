import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Filter from "../pages/Filter";
import OrderDetails from "../pages/OrderDetails";
import Orders from "../pages/Orders";
import Stats from "../pages/Stats";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/orders" replace />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/orders/order/:id" element={<OrderDetails />} />
        <Route path="/Orders/order/:id" element={<OrderDetails />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<Navigate to="/orders" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;