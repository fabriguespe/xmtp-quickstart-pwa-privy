import React, { useEffect, useState } from "react";
import { FloatingInbox } from "./FloatingInbox-hooks";
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";

const InboxPage = () => {
  const { ready, authenticated, user, login, logout, signMessage } = usePrivy();
  const { wallets } = useWallets();
  const [signer, setSigner] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false); // Add this line

  useEffect(() => {
    const getSigner = async () => {
      const embeddedWallet =
        wallets.find((wallet) => wallet.walletClientType === "privy") ||
        wallets[0];
      if (embeddedWallet) {
        const provider = await embeddedWallet.getEthersProvider();
        const signer = provider.getSigner();
        signer.signMessage = async (message) => {
          const uiConfig = {
            title: "Enable Secure Messaging with XMTP",
            description:
              "What is XMTP? XMTP provides apps and websites with private, secure, and encrypted messaging without your email or phone number. To turn on secure messaging for this app, tap the 'Enable XMTP' button.",
            buttonText: "Enable XMTP",
          };

          const signature = await signMessage(message, uiConfig);

          return signature;
        };
        setSigner(signer);
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
      height: "100vh",
      backgroundColor: "#f9f9f9",
      borderRadius: isPWA == true ? "0px" : "10px",
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
