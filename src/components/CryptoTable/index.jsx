import { Table } from "antd";
import { columns } from "../../utils/columnsOfTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCoins } from "../../redux/slicers/listOfCoins";
import { useNavigate } from "react-router";
import { selectCoins,selectCoinsLoading,selectCoinsTimestamp } from "../../redux/slicers/listOfCoins";
import { buyCoin } from "../../redux/slicers/portfolioSlice";
import ModalAddToPortfolio from "../ModalAddPortfolio";
import LastUpdated from "../LastUpdated";

const REFRESH_INTERVAL = 30000;

const CryptoTable = () => {
    const navigate = useNavigate();

    const coins = useSelector(selectCoins);
    const loading = useSelector(selectCoinsLoading)
    const timestamp = useSelector(selectCoinsTimestamp)

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);

    useEffect(() => {
        dispatch(getAllCoins());
        const intervalId = setInterval(() => {
            dispatch(getAllCoins());
        }, REFRESH_INTERVAL);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    const handleRowClick = (record) => ({
        onClick: () => navigate(`/coin/${record.id}`),
    });

    const handleOpenBuyModal = (coinRecord) => {
        setSelectedCoin(coinRecord);
        setIsModalOpen(true);
    };

    const handleBuy = ({ coin, amount }) => {
        dispatch(buyCoin({ coin, amount }));
        setIsModalOpen(false);
    };

    return (
        <div>
            <LastUpdated timestamp={timestamp} />
            <Table
                columns={columns(handleOpenBuyModal)}
                dataSource={coins}
                rowKey="id"
                onRow={handleRowClick}
                loading={loading}
                scroll={{ x: 900 }}
            />

            <ModalAddToPortfolio
                open={isModalOpen}
                coin={selectedCoin}
                onClose={() => setIsModalOpen(false)}
                onBuy={handleBuy}
            />
        </div>
    );
};

export default CryptoTable;
