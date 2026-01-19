import { useNavigate } from "react-router"
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackToTable = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate("/");
    };
    return (
        <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={goBack}
            className="back-to-list-btn"
        >
            Назад к списку
        </Button>
    )
}

export default BackToTable