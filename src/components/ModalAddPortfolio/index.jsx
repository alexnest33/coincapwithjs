import { Modal, InputNumber, Typography, Button, Space } from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

const ModalAddToPortfolio = ({ open, onClose, coin, onBuy }) => {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (open) setAmount(null);
  }, [open]);

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        title={
          <Title level={4} className="buy-modal__title">
            Купить {coin?.name ?? ""}
          </Title>
        }
      >
        <Space  className="buy-modal__content" size={12}>
          <Text>Введите количество:</Text>

          <InputNumber
            className="buy-modal__input"
            min={0}
            value={amount}
            onChange={setAmount}
            placeholder="Например: 0.5"
          />

          <Button
            type="primary"
            disabled={!amount || amount <= 0}
            onClick={() => onBuy({ coin, amount })}
            className="buy-modal__buy-btn"
            block
          >
            Купить
          </Button>
        </Space>
      </Modal>
    </>
  );
};

export default ModalAddToPortfolio;
