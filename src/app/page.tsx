"use client";
import * as React from "react";

import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets } from "@cosmos-kit/keplr";

import "@interchain-ui/react/styles";
import {
  signerOptions,
  twilightTestnet,
  twilightTestnetAssets,
} from "@/lib/chain";
import { MainPage } from "@/components/templates/Main";

export default function Home() {
  return (
    <ChainProvider
      chains={[...chains, twilightTestnet]}
      assetLists={[...assets, twilightTestnetAssets]}
      wallets={wallets}
      signerOptions={signerOptions}
    >
      <MainPage />
    </ChainProvider>
  );
}
