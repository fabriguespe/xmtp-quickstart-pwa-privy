import InboxPage from "./InboxPage-hooks";
import { PrivyProvider } from "@privy-io/react-auth";

export default function App({ Component, pageProps }) {
  return (
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_APP_ID}
      onSuccess={(user) => console.log(`User ${user.id} logged in!`)}
    >
      <InboxPage />
    </PrivyProvider>
  );
}
