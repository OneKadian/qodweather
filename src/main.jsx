// import React, { lazy, Suspense } from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Provider } from "react-redux";
// import App from "./App";
// import { store } from "./app/store";
// import "./index.css";

// const Home = lazy(() => import("./routes/Home"));
// const Forecast = lazy(() => import("./routes/Forecast"));

// const router = createBrowserRouter([
//   {
//     path: "/weather-app-vite",
//     element: (
//       <Suspense fallback={<div className="hidden">Loading...</div>}>
//         <App />
//       </Suspense>
//     ),

//     children: [
//       { index: true, element: <Home /> },
//       {
//         path: "forecast",
//         element: <Forecast />,
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <div>Not Found</div>,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import "./index.css";

// Ensure these are imported correctly
import "leaflet/dist/leaflet.css";

const Home = React.lazy(() => import("./routes/Home"));
const Forecast = React.lazy(() => import("./routes/Forecast"));

const router = createBrowserRouter([
  {
    path: "/weather-app-vite", // Keep your existing path
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
      </React.Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: "forecast",
        element: <Forecast />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
