import QRCode from "react-qr-code";
import {useEffect, useState} from "react";

const Enable2FAModal = (props: { onClose: Function, showSpinner: Function }) => {
    const [qrValue, setQRValue] = useState<string>("");
    useEffect(() => {
        const getQRValue = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_REQUEST_URL}/auth/totp/code`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setQRValue(data.url);
            } catch (error) {
                console.error(error);
            } finally {
                props.showSpinner(false);
            }
        };
        getQRValue();
    }, [props]);

    return (
        <>
            {qrValue &&
                <QRCode value={qrValue} />
            }
        </>
    );
};

export default Enable2FAModal;
