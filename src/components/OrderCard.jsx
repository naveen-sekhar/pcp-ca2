import { Link } from "react-router-dom";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const formatCurrency = (value) => currencyFormatter.format(Number(value) || 0);

const formatDeliveryTime = (value) =>
  Number.isFinite(Number(value)) ? `${Number(value)} mins` : "Not available";

const hasRating = (value) => Number.isFinite(Number(value));

const OrderCard = ({ order }) => {
  const statusClass = `status-badge status-badge--${order.status
    .toLowerCase()
    .replace(/[^a-z]+/g, "-")}`;

  return (
    <article className="order-card" data-testid="order-item">
      <div className="order-card__header">
        <div>
          <p className="order-card__eyebrow">Order #{order.orderId}</p>
          <h2>{order.customerName}</h2>
        </div>
        <span className={statusClass}>{order.status}</span>
      </div>

      <p className="order-card__restaurant">{order.restaurant}</p>

      <div className="order-card__meta">
        <div>
          <span>Delivery</span>
          <strong>{formatDeliveryTime(order.deliveryTime)}</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>{formatCurrency(order.totalAmount)}</strong>
        </div>
        {hasRating(order.rating) ? (
          <div>
            <span>Rating</span>
            <strong>{Number(order.rating).toFixed(1)}</strong>
          </div>
        ) : null}
      </div>

      <div className="order-card__items">
        {order.items.map((item, index) => (
          <span key={`${order.orderId}-${item.name}-${index}`} className="item-chip">
            {item.name} x{item.quantity}
          </span>
        ))}
      </div>

      <Link className="order-card__link" to={`/order/${order.orderId}`}>
        View details
      </Link>
    </article>
  );
};

export default OrderCard;