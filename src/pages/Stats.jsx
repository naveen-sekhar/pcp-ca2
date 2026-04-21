import { useEffect, useMemo } from "react";
import { isValidOrder, useApp } from "../context/AppContext";

const Stats = () => {
  const { orders, loading, error } = useApp();

  const metrics = useMemo(() => {
    const validOrders = orders.filter(isValidOrder);

    return {
      totalOrders: validOrders.length,
      deliveredOrders: validOrders.filter(
        (order) => order.status.trim().toLowerCase() === "delivered",
      ).length,
      cancelledOrders: validOrders.filter(
        (order) => order.status.trim().toLowerCase() === "cancelled",
      ).length,
    };
  }, [orders]);

  useEffect(() => {
    window.appSate = metrics;
    window.appState = metrics;
  }, [metrics]);

  return (
    <section className="page-stack">
      <div className="hero-panel">
        <div>
          <p className="section-label">Insights</p>
          <h2>Order statistics</h2>
          <p className="section-copy">
            Only valid orders are counted in these metrics.
          </p>
        </div>
      </div>

      {loading ? <p className="state-message">Loading stats...</p> : null}
      {error ? <p className="state-message state-message--error">{error}</p> : null}

      {!loading && !error ? (
        <section className="stat-grid">
          <article className="stat-card">
            <span>Total orders</span>
            <strong data-testid="total-orders">{metrics.totalOrders}</strong>
          </article>
          <article className="stat-card">
            <span>Delivered orders</span>
            <strong data-testid="delivered-orders">{metrics.deliveredOrders}</strong>
          </article>
          <article className="stat-card">
            <span>Cancelled orders</span>
            <strong data-testid="cancelled-orders">{metrics.cancelledOrders}</strong>
          </article>
        </section>
      ) : null}
    </section>
  );
};

export default Stats;