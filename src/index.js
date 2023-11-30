import React from "react";
import ReactDOM from "react-dom/client";
import InboxPage from "./InboxPage-hooks";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { PrivyProvider } from "@privy-io/react-auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_APP_ID}
      onSuccess={(user) => console.log(`User ${user.id} logged in!`)}
    >
      <InboxPage />
    </PrivyProvider>
  </React.StrictMode>
);

// Register service worker
serviceWorkerRegistration.register();
