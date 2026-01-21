import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { removeCoin } from "../../redux/slicers/portfolioSlice";
import { selectCoins } from "../../redux/slicers/listOfCoins";
import { selectPortfolioPositionsSafe } from "../../redux/slicers/portfolioSlice";
import TopCoinsRow from "../TopCoinsRow";
import PortfolioSummary from "../PortfolioSummary";
import PortfolioModal from "../PortfolioModal";

const AppLayout = () => {
    const dispatch = useDispatch();
    const positions = useSelector(selectPortfolioPositionsSafe);
    const coins = useSelector(selectCoins);

    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
    const portfolioItems = Object.values(positions);

    return (
        <div className="app-layout">
            <div className="app-layout__header">
                <TopCoinsRow />
                <PortfolioSummary onClick={() => setIsPortfolioOpen(true)} />
            </div>
            <Outlet />
            <PortfolioModal
                open={isPortfolioOpen}
                onClose={() => setIsPortfolioOpen(false)}
                items={portfolioItems}
                coins={coins}
                onRemove={(id) => dispatch(removeCoin(id))}
            />
        </div>
    );
}



export default AppLayout