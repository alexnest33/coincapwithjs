import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import { selectCoins } from "../../redux/slicers/listOfCoins";
import { buyCoin } from "../../redux/slicers/portfolioSlice";
import CoinOverview from "../../components/CoinOverview";
import BackToTable from "../../components/BackToTable";
import ModalAddToPortfolio from "../../components/ModalAddPortfolio";
import BuyButton from "../../components/BuyButton";


const CoinDetailsPage = () => {
  const { slug } = useParams();
  const coins = useSelector(selectCoins);
  const coin = coins.find((c) => c.id === slug);
  const dispatch = useDispatch();
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const handleBuy = ({ coin, amount }) => {
    dispatch(buyCoin({ coin, amount }));
    setIsBuyOpen(false);
  };
  if (!coin) return <p>Данные о монете не найдены</p>;

  return (
    <div className="coin-details-page">
      <div className="coin-buy-button-row">
        <BuyButton onClick={() => setIsBuyOpen(true)} />
      </div>
      <CoinOverview coin={coin} />

      <div className="back-button-container">
        <BackToTable />
      </div>
      <ModalAddToPortfolio
        open={isBuyOpen}
        coin={coin}
        onClose={() => setIsBuyOpen(false)}
        onBuy={handleBuy}
      />
    </div>
  );
};

export default CoinDetailsPage;
