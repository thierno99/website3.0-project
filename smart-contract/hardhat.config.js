//https://eth-goerli.alchemyapi.io/v2/EFWQTXCnps7TI7Dndpj-phq5YuRrnrn4
require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: '0.8.0',
    networks: {
        goerli: {
            url: "https://eth-goerli.alchemyapi.io/v2/EFWQTXCnps7TI7Dndpj-phq5YuRrnrn4",
            accounts: ['49125aacd8141ee1af131613bf12262879ce490e34600440378eeada1dfd77d5']
        }
    }
}