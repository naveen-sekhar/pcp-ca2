import OrderCard from "./OrderCard";

const OrderList = ({ orders }) => {
  if (!orders.length) {
    return <p className="empty-state">No valid orders found.</p>;
  }

  return (
    <section className="card-grid" aria-label="Orders list">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </section>
  );
};

export default OrderList;