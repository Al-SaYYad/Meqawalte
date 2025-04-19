import axios from "axios";

const BASE_URL = "https://sara545.pythonanywhere.com";

export const getSpecializations = async () => {
  const response = await axios.get(`${BASE_URL}/user/specializations`);
  return response.data;
};

export const getWorkersBySpecialization = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/workers/`);
    const allWorkers = response.data;
    const filtered = allWorkers.filter(
      (worker) =>
        worker.worker_specialization &&
        worker.worker_specialization.toLowerCase() === name.toLowerCase()
    );

    return filtered;
  } catch (error) {
    console.error("Error fetching workers:", error);
    return [];
  }
};
