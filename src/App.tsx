import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import ShowsList from "./pages/shows";
import config from "./loader";
import { useCookies } from "react-cookie";
import axios from "axios";
import { RequestProvider } from "react-request-hook";

function App() {
  const [cookies] = useCookies([config.jwt]);

  const httpClient = axios.create({
    baseURL: config.REACT_APP_BASE_API_URL,
    headers: {
      Authorization: `bearer ${cookies.jwt}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  httpClient.interceptors.request.use((req) => {
    req.headers = {
      ...req.headers,
      Authorization: cookies.jwt && `bearer ${cookies.jwt}`,
    } as any;
    return req;
  });
  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response)
        if (error.response.status === 401) {
          console.log(
            `Error accessing ${error.request.responseURL} - reloading window`
          );
        }
      return Promise.reject(error);
    }
  );

  return (
    <RequestProvider value={httpClient}>
      <Router>
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/shows" Component={ShowsList} />
        </Routes>
      </Router>
    </RequestProvider>
  );
}
export default App;
