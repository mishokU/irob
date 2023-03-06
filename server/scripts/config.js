const config = {
    defaultNetwork: 'localhost',
    solidity: {
        compilers: [{ version: '0.8.18', settings: {} }],
    },
    networks: {
        localganache: {
            url: "HTTP://127.0.0.1:7545",
            accounts: [`0x49553634723498641e25e2a077eb5db3c6e3df0e50f84641bcd96d2480128c0e`]
        },
        localhost: {
            url: 'http://127.0.0.1:8545/',
        },
        coverage: {
            url: 'http://127.0.0.1:8555', // Coverage launches its own ganache-cli client
        },
    },
}

module.exports = config