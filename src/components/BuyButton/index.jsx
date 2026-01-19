import { Button } from "antd";

const  BuyButton = ({ onClick, disabled = false, children }) => {
    return (
        <Button
            type="primary"
            shape="circle"
            onClick={onClick}
            disabled={disabled}
            className="buy-button"
        >
            {children ?? "+"}
        </Button>
    );
}



export default BuyButton