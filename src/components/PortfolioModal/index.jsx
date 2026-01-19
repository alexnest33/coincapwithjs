import { useMemo } from "react";
import { Modal, Table, Typography } from "antd";
import { formatRu2 } from "../../utils/formatersOfPrice";
import { getPortfolioColumns } from "../../utils/portfolioColumns";

const { Text } = Typography;

const PortfolioModal = ({ open, onClose, items, onRemove, coins }) => {
  const priceMap = useMemo(() => {
    const map = new Map();
    (coins || []).forEach((c) => map.set(c.id, Number(c.priceUsd) || 0));
    return map;
  }, [coins]);

  const dataSource = useMemo(() => {
    return (items || []).map((p) => {
      const price = priceMap.get(p.id) || 0;
      const total = Number(p.amount) * price;

      return {
        key: p.id,
        id: p.id,
        name: p.name,
        symbol: p.symbol,
        price,
        amount: Number(p.amount) || 0,
        total,
      };
    });
  }, [items, priceMap]);

  const grandTotal = useMemo(() => {
    return dataSource.reduce((sum, r) => sum + Number(r.total || 0), 0);
  }, [dataSource]);

  const columns = useMemo(() => getPortfolioColumns(onRemove), [onRemove]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={900}
      title="Портфель"
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        locale={{ emptyText: "Портфель пуст" }}
        size="middle"
      />

      <div className="portfolio-modal__total">
        <Text strong className="portfolio-modal__total-text">
          Сумма: {formatRu2(grandTotal)} USD
        </Text>
      </div>
    </Modal>
  );
};

export default PortfolioModal;
