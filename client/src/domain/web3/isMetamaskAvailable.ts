import { MetaMaskInpageProvider } from "@metamask/providers";

type WindowInstanceWithEthereum = Window & typeof globalThis & { ethereum: MetaMaskInpageProvider };

export const ethereum = (window as WindowInstanceWithEthereum).ethereum;

export function isMetamaskAvailable(): boolean {
    return ethereum !== null;
}