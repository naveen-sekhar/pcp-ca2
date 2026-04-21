import { useMemo } from "react";
import { isValidOrder, useApp } from "../context/AppContext";
import OrderList from "../components/OrderList";

const Orders = () => {
  const { orders, loading, error } = useApp();

  const validOrders = useMemo(() => orders.filter(isValidOrder), [orders]);

  return (
    <section className="page-stack">
      {loading ? <p className="state-message">Loading orders...</p> : null}
      {error ? <p className="state-message state-message--error">{error}</p> : null}
      {!loading && !error ? <OrderList orders={validOrders} /> : null}
    </section>
  );
};

export default Orders;