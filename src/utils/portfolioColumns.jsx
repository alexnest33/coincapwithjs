import { Button, Typography } from "antd";
import { formatRu2 } from "./formatersOfPrice";

const { Text } = Typography;

export const getPortfolioColumns = (onRemove) => [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
    render: (_, r) => (
      <div>
        <Text strong>{r.name}</Text> <Text type="secondary">({r.symbol})</Text>
      </div>
    ),
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    align: "right",
    render: (v) => <Text>{formatRu2(v)} USD</Text>,
  },
  {
    title: "Кол-во",
    dataIndex: "amount",
    key: "amount",
    align: "right",
    render: (v) => <Text>{v}</Text>,
  },
  {
    title: "Итого",
    dataIndex: "total",
    key: "total",
    align: "right",
    render: (v) => <Text strong>{formatRu2(v)} USD</Text>,
  },
  {
    title: "",
    key: "action",
    align: "right",
    render: (_, r) => (
      <Button danger onClick={() => onRemove(r.id)}>
        Убрать
      </Button>
    ),
  },
];
