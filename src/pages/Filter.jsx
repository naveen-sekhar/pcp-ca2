import { useMemo } from "react";
import { isValidOrder, matchesQuery, useApp } from "../context/AppContext";
import OrderList from "../components/OrderList";

const Filter = () => {
  const { orders, loading, error, filterText, setFilterText } = useApp();

  const visibleOrders = useMemo(() => {
    const validOrders = orders.filter(isValidOrder);
    return validOrders.filter((order) => matchesQuery(order, filterText));
  }, [orders, filterText]);

  return (
    <section className="page-stack">
      <div className="hero-panel hero-panel--split">
        <div>
          <p className="section-label">Search</p>
          <h2>Filter orders by any field</h2>
          <p className="section-copy">
            Search by order id, customer, restaurant, status, item name, or
            amount.
          </p>
        </div>

        <label className="filter-bar" htmlFor="order-filter">
          <span className="sr-only">Filter orders</span>
          <input
            id="order-filter"
            data-testid="filter-input"
            type="text"
            placeholder="Search orders"
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
          />
        </label>
      </div>

      {loading ? <p className="state-message">Loading orders...</p> : null}
      {error ? <p className="state-message state-message--error">{error}</p> : null}
      {!loading && !error ? <OrderList orders={visibleOrders} /> : null}
    </section>
  );
};

export default Filter;