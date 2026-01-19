import { formatPrice, formatChangePercent, formatMarketCap, formatVWAP } from "./formatersOfPrice";
import BuyButton from "../components/BuyButton";

export const columns = (onBuyClick) => [
    {
        title: 'Ранг',
        dataIndex: 'rank',
        key: '№',
    },
    {
        title: 'Символ',
        dataIndex: 'symbol',
        key: 'symbol',
        render: text => <span style={{ color: '#ff00aa', fontWeight: 600 }}>{text}</span>,
    },
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: text => <span style={{ color: 'black', fontWeight: 600 }}>{text}</span>,
    },
    {
        title: 'Средняя цена по объёму (24ч)',
        dataIndex: 'vwap24Hr',
        key: 'vwap(24Hr)',
        render: formatVWAP,
    },
    {
        title: 'Изменение (24ч)',
        dataIndex: 'changePercent24Hr',
        key: 'change(24Hr)',
        render: formatChangePercent,
    },
    {
        title: 'Капитализация',
        key: 'marketCapUsd',
        dataIndex: 'marketCapUsd',
        render: formatMarketCap,
    },
    {
        title: 'Цена',
        key: 'priceUsd',
        dataIndex: 'priceUsd',
        render: formatPrice,
    },
    {
        title: 'Купить',
        key: 'action',
        render: (_, record) => (
            <BuyButton
                onClick={(e) => {
                    e.stopPropagation(); 
                    onBuyClick(record);
                }}
            />
        ),
    },
];