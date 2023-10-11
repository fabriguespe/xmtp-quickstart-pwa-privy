import React, { useEffect, useState } from "react";
import { FloatingInbox } from "./FloatingInbox-hooks";
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";

const InboxPage = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const [signer, setSigner] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false); // Add this line

  useEffect(() => {
    const getSigner = async () => {
      const embeddedWallet = wallets.find(
        (wallet) => wallet.walletClientType === "metamask"
      );
      setSigner(true);
      if (embeddedWallet) {
        const provider = await embeddedWallet.getEthersProvider();
        setSigner(provider.getSigner());
      }
    };

    if (wallets.length > 0) {
      getSigner();
    }
  }, [wallets]);

  const handleLogout = async () => {
    setLoggingOut(true); // Set loggingOut to true when logout begins
    await logout(); // Wait for logout to complete
    setLoggingOut(false); // Set loggingOut to false when logout ends
  };

  const isPWA = true;
  const styles = {
    uContainer: {
      position: isPWA == true ? "relative" : "fixed",
      bottom: isPWA == true ? "0px" : "70px",
      right: isPWA == true ? "0px" : "20px",
      width: isPWA == true ? "100%" : "300px",
      height: isPWA == true ? "100vh" : "400px",
      border: "1px solid #ccc",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    xmtpContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    btnXmtp: {
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#000",
      justifyContent: "center",
      border: "1px solid grey",
      padding: isPWA == true ? "20px" : "10px",
      borderRadius: "5px",
      fontSize: isPWA == true ? "20px" : "14px", // Increased font size
    },
  };

  return (
    <div style={styles.uContainer}>
      {(!ready || !authenticated || loggingOut) && (
        <div style={styles.xmtpContainer}>
          <button style={styles.btnXmtp} onClick={login}>
            Log in
          </button>
        </div>
      )}
      {ready && authenticated && signer && !loggingOut && (
        <FloatingInbox isPWA={isPWA} wallet={signer} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default InboxPage;
