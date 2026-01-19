import { Descriptions } from "antd";
import { formatPrice,formatChangePercent,formatVWAP,formatMarketCap } from "../../utils/formatersOfPrice";
import CoinPriceChart from "../CoinPriceChart";

const CoinOverview = ({ coin }) => {
  return (
    <div className="coin-details-wrapper">
      <div className="coin-details-card">
        <div className="coin-details-header">
          <span>Информация</span>
          <span>Данные о валюте</span>
        </div>
        <Descriptions column={1} bordered size="middle" className="coin-descriptions">
          <Descriptions.Item label="Цена">{formatPrice(coin.priceUsd)}</Descriptions.Item>
          <Descriptions.Item label="Доступное предложение для торговли">
            {formatMarketCap(coin.supply)}
          </Descriptions.Item>
          <Descriptions.Item label="Общее кол-во выпущенных активов">
            {formatMarketCap(coin.maxSupply)}
          </Descriptions.Item>
          <Descriptions.Item label="Объем торгов за 24 часа">
            {formatMarketCap(coin.volumeUsd24Hr)}
          </Descriptions.Item>
          <Descriptions.Item label="Средняя цена по объему (24ч)">
            {formatVWAP(coin.vwap24Hr)}
          </Descriptions.Item>
          <Descriptions.Item label="Изменение цены за 24ч">
            {formatChangePercent(coin.changePercent24Hr)}
          </Descriptions.Item>
          <Descriptions.Item label="Сайт">
            <a href={coin.explorer} target="_blank" rel="noreferrer">
              {coin.explorer}
            </a>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="coin-chart-container">
        <CoinPriceChart />
      </div>
    </div>
  );
};

export default CoinOverview;
