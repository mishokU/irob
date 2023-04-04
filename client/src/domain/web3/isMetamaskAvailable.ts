type WindowInstanceWithEthereum = Window &
    typeof globalThis & { ethereum?: any };

export const ethereum = (window as WindowInstanceWithEthereum).ethereum;

export const localChain = '0x539'

export function isMetamaskAvailable(): boolean {
    return ethereum !== null;
}