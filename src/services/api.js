const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const STUDENT_ID = "E0223006";
export const PASSWORD = "672598";
export const DATA_SET = "setA";

const readJson = async (response, fallbackMessage) => {
  if (!response.ok) {
    throw new Error(fallbackMessage);
  }

  return response.json();
};

export const getToken = async (studentId, password, set) => {
  const response = await fetch(`${BASE_URL}/public/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentId,
      password,
      set,
    }),
  });

  return readJson(response, "Failed to authenticate with the test server");
};

export const getDataset = async (token, dataUrl) => {
  const response = await fetch(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await readJson(response, "Failed to fetch orders dataset");

  return payload.data ?? payload;
};