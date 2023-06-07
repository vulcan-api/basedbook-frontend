import QRCode from "react-qr-code";
import {useEffect, useState} from "react";

const Enable2FAModal = (props: { onClose: Function, showSpinner: Function }) => {
    const [qrValue, setQRValue] = useState<string>("");
    const getQRValue = async () => {
        await fetch(`${process.env.REACT_APP_REQUEST_URL}/auth/totp/code`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((res) => {
                setQRValue(res.url);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                props.showSpinner(false);
            });
    };
    useEffect(() => {
        getQRValue();
    }, []);
    return (
        <>
            {qrValue &&
                <QRCode value={qrValue} />
            }
        </>
    );
};

export default Enable2FAModal;
