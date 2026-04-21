import { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../reducer/AppReducer";
import { DATA_SET, PASSWORD, STUDENT_ID, getDataset, getToken } from "../services/api";

const initialState = {
  orders: [],
  loading: true,
  error: "",
  filterText: "",
};

const toText = (value, fallback = "Unknown") => {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const normalizeItems = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => ({
    name: toText(item?.name, "Unnamed item"),
    price: toNumber(item?.price),
    quantity: toNumber(item?.quantity),
  }));
};

export const normalizeOrder = (order, index) => ({
  id: String(order?.orderId ?? order?.id ?? index),
  orderId: order?.orderId ?? order?.id ?? index,
  customerName: toText(order?.customerName),
  restaurant: toText(order?.restaurant),
  items: normalizeItems(order?.items),
  totalAmount: toNumber(order?.totalAmount),
  status: toText(order?.status),
  deliveryTime: toNumber(order?.deliveryTime),
  rating: toNumber(order?.rating),
});

export const isValidOrder = (order) =>
  Array.isArray(order?.items) &&
  order.items.length > 0 &&
  order.items.every((item) => Number(item?.quantity) > 0) &&
  Number.isFinite(order?.totalAmount) &&
  Number(order.totalAmount) > 0;

export const matchesQuery = (order, query) => {
  const trimmedQuery = query.trim().toLowerCase();

  if (!trimmedQuery) {
    return true;
  }

  const haystack = [
    order.orderId,
    order.customerName,
    order.restaurant,
    order.status,
    order.totalAmount,
    order.deliveryTime,
    order.rating,
    ...(Array.isArray(order.items)
      ? order.items.map((item) => `${item.name} ${item.price} ${item.quantity}`)
      : []),
  ]
    .filter((value) => value !== null && value !== undefined)
    .join(" ")
    .toLowerCase();

  return haystack.includes(trimmedQuery);
};

const extractOrders = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.orders)) {
    return payload.orders;
  }

  if (Array.isArray(payload?.data?.orders)) {
    return payload.data.orders;
  }

  return [];
};

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    let active = true;

    const loadOrders = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const tokenResponse = await getToken(STUDENT_ID, PASSWORD, DATA_SET);
        const dataset = await getDataset(tokenResponse.token, tokenResponse.dataUrl);
        const normalizedOrders = extractOrders(dataset).map(normalizeOrder);

        if (active) {
          dispatch({ type: "SET_ORDERS", payload: normalizedOrders });
        }
      } catch (error) {
        if (active) {
          dispatch({
            type: "SET_ERROR",
            payload: error?.message || "Failed to load orders",
          });
        }
      }
    };

    loadOrders();

    return () => {
      active = false;
    };
  }, []);

  const setFilterText = (text) => {
    dispatch({ type: "SET_FILTER_TEXT", payload: text });
  };

  return (
    <AppContext.Provider
      value={{
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        filterText: state.filterText,
        setFilterText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);