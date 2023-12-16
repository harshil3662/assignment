// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract pairConverter {

    AggregatorV3Interface internal btcUsdPriceFeed;
    AggregatorV3Interface internal ethUsdPriceFeed;
    AggregatorV3Interface internal linkUsdPriceFeed;
    AggregatorV3Interface internal btcEthPriceFeed;

    constructor() {
        btcUsdPriceFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
        ethUsdPriceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        linkUsdPriceFeed = AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF);
        btcEthPriceFeed = AggregatorV3Interface(0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22);
    }

    function getLatestPrices() external view returns (int256, int256, int256, int256) {
        // Fetch the latest prices from Chainlink
        int256 btcUsdPrice = getLatestPrice(btcUsdPriceFeed);
        int256 ethUsdPrice = getLatestPrice(ethUsdPriceFeed);
        int256 linkUsdPrice = getLatestPrice(linkUsdPriceFeed);
        int256 btcEthPrice = getLatestPrice(btcEthPriceFeed);

        return (btcUsdPrice, ethUsdPrice, linkUsdPrice, btcEthPrice);
    }

    function getLatestPrice(AggregatorV3Interface _priceFeed) internal view returns (int256) {
        (, int256 price, , ,) = _priceFeed.latestRoundData();
        return price;
    }
}
