type WindowInstanceWithEthereum = Window &
    typeof globalThis & { ethereum?: any };

export const ethereum = (window as WindowInstanceWithEthereum).ethereum;

export function isMetamaskAvailable(): boolean {
    return ethereum !== null;
}