import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Typography } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import {
  formatRu2,
  signedMoney,
  signedPercent,
} from "../../utils/formatersOfPrice";
import { selectCoins } from "../../redux/slicers/listOfCoins";
import { selectPortfolioPositionsSafe } from "../../redux/slicers/portfolioSlice";

const { Text } = Typography;

const PortfolioSummary = ({ onClick }) => {
  const coins = useSelector(selectCoins);
  const positions = useSelector(selectPortfolioPositionsSafe);

  const stats = useMemo(() => {
    const arr = Object.values(positions);

    const initialUsd = arr.reduce(
      (sum, p) => sum + Number(p.costBasisUsd || 0),
      0
    );

    const currentUsd = arr.reduce((sum, p) => {
      const live = coins.find((c) => c.id === p.id);
      const price = live ? Number(live.priceUsd) : 0;
      return sum + Number(p.amount) * price;
    }, 0);

    const diffUsd = currentUsd - initialUsd;
    const diffPct = initialUsd > 0 ? (diffUsd / initialUsd) * 100 : 0;

    return { initialUsd, currentUsd, diffUsd, diffPct };
  }, [positions, coins]);

  const diffColor =
    stats.diffUsd > 0 ? "green" : stats.diffUsd < 0 ? "red" : "#777";

  return (
    <div onClick={onClick} className="portfolio-summary">
      <WalletOutlined className="portfolio-summary__icon" />
      <div className="portfolio-summary__content">
        <Text type="secondary">Итого:</Text>
        <div className="portfolio-summary__value">
          {formatRu2(stats.currentUsd)} USD
          {stats.initialUsd > 0 && (
            <span
              className="portfolio-summary__delta"
              style={{ color: diffColor }} 
            >
              {signedMoney(stats.diffUsd)} ({signedPercent(stats.diffPct)} %)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
