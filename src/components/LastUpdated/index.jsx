import { Typography } from "antd";

const { Text } = Typography;

const LastUpdated = ({ timestamp }) => {
  if (!timestamp) return null;

  return (
    <p className="updated">
      Обновлено:{" "}
      <Text className="updated__time">
        {new Date(timestamp).toLocaleTimeString("ru-RU")}
      </Text>
    </p>
  );
};

export default LastUpdated;
