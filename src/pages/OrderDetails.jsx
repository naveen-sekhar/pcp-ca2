import { Link, useParams } from "react-router-dom";
import { isValidOrder, useApp } from "../context/AppContext";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const formatCurrency = (value) => currencyFormatter.format(Number(value) || 0);

const formatDeliveryTime = (value) =>
  Number.isFinite(Number(value)) ? `${Number(value)} minutes` : "Not available";

const parseOrderId = (value) => {
  const trimmed = String(value ?? "").trim();

  if (!trimmed) {
    return null;
  }

  return trimmed;
};

const calculateItemSubtotal = (item) => {
  const price = Number(item?.price);
  const quantity = Number(item?.quantity);

  if (!Number.isFinite(price) || !Number.isFinite(quantity) || quantity <= 0) {
    return 0;
  }

  return price * quantity;
};

const calculateOrderSubtotal = (order) =>
  Array.isArray(order?.items)
    ? order.items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0)
    : 0;

const OrderDetails = () => {
  const { id } = useParams();
  const { orders, loading, error } = useApp();

  const validOrders = orders.filter(isValidOrder);
  const routeOrderId = parseOrderId(id);
  const order = routeOrderId
    ? validOrders.find(
        (item) =>
          String(item.orderId) === routeOrderId || String(item.id) === routeOrderId,
      )
    : null;

  const subtotal = calculateOrderSubtotal(order);

  if (loading) {
    return <p className="state-message">Loading order details...</p>;
  }

  if (error) {
    return <p className="state-message state-message--error">{error}</p>;
  }

  if (!order) {
    return (
      <section className="page-stack">
        <div className="hero-panel">
          <div>
            <p className="section-label">Order not found</p>
            <h2>No order matches this identifier.</h2>
          </div>
          <Link className="order-card__link" to="/orders">
            Back to orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-stack">
      <div className="detail-head">
        <div>
          <p className="section-label">Order details</p>
          <h2>
            Order #{order.orderId} · {order.customerName}
          </h2>
          <p className="section-copy">{order.restaurant}</p>
        </div>
        <Link className="order-card__link" to="/orders">
          Back to orders
        </Link>
      </div>

      <div className="detail-grid">
        <article className="detail-card">
          <span>Status</span>
          <strong>{order.status || "Not available"}</strong>
        </article>
        <article className="detail-card">
          <span>Total amount</span>
          <strong>{formatCurrency(order.totalAmount)}</strong>
        </article>
        <article className="detail-card">
          <span>Delivery time</span>
          <strong>{formatDeliveryTime(order.deliveryTime)}</strong>
        </article>
        {Number.isFinite(Number(order.rating)) ? (
          <article className="detail-card">
            <span>Rating</span>
            <strong>{Number(order.rating).toFixed(1)}</strong>
          </article>
        ) : null}
      </div>

      <article className="detail-card detail-card--full">
        <span>Items</span>
        <div className="detail-items">
          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item, index) => {
              const itemSubtotal = calculateItemSubtotal(item);

              return (
                <div
                  key={`${order.orderId}-${item?.name ?? "item"}-${index}`}
                  className="detail-item-row"
                >
                  <strong>{item?.name || "Unknown item"}</strong>
                  <span>
                    {Number.isFinite(Number(item?.quantity)) ? item.quantity : 0} x{" "}
                    {formatCurrency(item?.price)} = {formatCurrency(itemSubtotal)}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="state-message">No items available.</p>
          )}
        </div>
      </article>

      <article className="detail-card detail-card--full">
        <span>Subtotal</span>
        <strong>{formatCurrency(subtotal)}</strong>
      </article>
    </section>
  );
};

export default OrderDetails;