import { httpGet, httpPost } from "./http.service";

const URL = `https://retina-care-recoomend-server-565418b38e96.herokuapp.com/api/v2/recommendations`;
const URLV3 =
  "https://retina-care-recoomend-server-565418b38e96.herokuapp.com/api/v3/recommendations/create_action";

const getRecommendations = async () => {
  try {
    const response = await httpGet(`${URL}/get_all_actions`);
    const data = response?.data?.actions;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

const addMeals = async (action_name: string, states: number[]) => {
  try {
    const response = await httpPost(`${URLV3}`, {
      action_name: action_name,
      states: states,
    });
    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

export { getRecommendations, addMeals };
