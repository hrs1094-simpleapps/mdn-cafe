import axios from "axios";
import { userInfoStore } from "../stores/userStore";

// https://tailadmin.com/react
// https://docs.google.com/spreadsheets/d/1OcJQ8lzGh6LcW2LpKVc6bC6pi0Qwgxl64_x053mtMdY/edit?gid=1190307298#gid=1190307298

const APIKEY =
  "AKfycbzP9ORZTqKTCZDYSeG97AAw9XBkz6ZIOESsm_729peUfMUr7EB_dXj4mjjEt7IN12tTSQ";
const axios_client = axios.create({
  baseURL: `https://script.google.com/macros/s/${APIKEY}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * This method can be used to update the `axios instance config`
 * before making any REST API calls
 *
 * Updating `axios instance headers` to add API token
 * before making any REST API calls based on the login state
 *
 */
axios_client?.interceptors?.request?.use(
  (config) => { 
    const { token, isLoggedIn } = userInfoStore.getState();
    const API_TOKEN = `Bearer ${token}`
    if (isLoggedIn && config?.url) {
      if (config.method?.toUpperCase() === "GET") {
        try { 
          const url = new URL(config.url, config.baseURL);
          url.searchParams.set("token", API_TOKEN as string); 
          config.url = url.toString();
        } catch (e) {
          console.warn(e);
        } 
      }
      if (config.method?.toUpperCase() === "POST") {
        let data = { token: "" };

        try {
          data = config.data ? JSON.parse(JSON.stringify(config.data)) : {};
        } catch (e) {
          console.warn(e);
          data = { token: "" };
        }
        data.token = API_TOKEN as string; // add token to body
        config.data = data;
      }
      //config.headers["Authorization"] = "Bearer " +  token;
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios_client;
