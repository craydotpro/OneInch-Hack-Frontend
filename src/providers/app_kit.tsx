import { createAppKit } from "@reown/appkit/react";

import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { arbitrum, base } from "@reown/appkit/networks";
import { WagmiProvider } from "wagmi";

// 0. Setup queryClient

// 1. Get projectId from https://dashboard.reown.com
const projectId = import.meta.env.VITE_APP_KIT_PROJECT_ID;

// 2. Create a metadata object - optional
const metadata = {
  name: "Cray",
  description: "Cray Trading App",
  url: "https://cray.pro", // origin must match your domain & subdomain
  icons: ["https://cray.pro/logo.svg"],
};

// 3. Set the networks
const networks = [base, arbitrum] as any;

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      {children}
    </WagmiProvider>
  );
}
