import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Typography } from "antd";
import { selectCoins } from "../../redux/slicers/listOfCoins";

const { Text } = Typography;

const TopCoinsRow = () => {
    const coins = useSelector(selectCoins);

    const top3 = useMemo(() => {
        if (!coins?.length) return [];
        return [...coins]
            .sort((a, b) => Number(a.rank) - Number(b.rank))
            .slice(0, 3);
    }, [coins]);

    return (
        <div className="top-coins">
            <div className="top-coins__label">
                <Text type="secondary">Популярные криптовалюты:</Text>
            </div>

            {top3.map((c) => (
                <div key={c.id} className="top-coins__item">
                    <div className="top-coins__name">{c.name}</div>
                    <Text type="secondary">{Number(c.priceUsd).toFixed(2)}$</Text>
                </div>
            ))}
        </div>
    );
}


export default TopCoinsRow;