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
        <p>
            <ol>
                <li>
                    Pobierz i zainstaluj aplikację 2FA (taką jak np. Google Authenticator) na swoim urządzeniu mobilnym. Możesz znaleźć ją w sklepie aplikacji dostępnym na Twoim urządzeniu (np. App Store dla iOS lub Google Play dla Androida).
                </li>
                <li>
                    Zeskanuj kod QR za pomocą aplikacji Authenticator.
                </li>
                <li>Jeśli skanowanie zakończyło się sukcesem, aplikacja Authenticator powinna dodać konto i wygenerować unikalny sześciocyfrowy kod czasowy.</li>
                <li>
                    Wpisz ten kod w pole poniżej i kliknij przycisk "Zweryfikuj".
                </li>
            </ol>
        </p>
            <div style={{textAlign: "center"}}>
            {qrValue && (
                <QRCode value={qrValue} />
                    )
            }
            </div>
           </>
    );
};

export default Enable2FAModal;
