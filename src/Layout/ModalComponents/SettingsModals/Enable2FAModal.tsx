import QRCode from "react-qr-code";
import {useEffect, useRef, useState} from "react";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import classes from "./Enable2FAModal.module.css";
//@ts-ignore
import {NotificationManager} from "react-notifications";

const Enable2FAModal = (props: { onClose: Function, showSpinner: Function }) => {
    const [qrValue, setQRValue] = useState<string>("");
    const [secret, setSecret] = useState<string>("");
    const codeRef: any = useRef();
    useEffect(() => {
        const getQRValue = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_REQUEST_URL}/auth/totp/code`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setSecret(data.url.toString().split("=")[1]);
                setQRValue(data.url);
            } catch (error) {
                console.error(error);
            } finally {
                props.showSpinner(false);
            }
        };
        getQRValue();
    }, [props]);
    const verifyCodeHandler = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_REQUEST_URL}/auth/totp/confirm`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: codeRef.current.value,
                    secret: secret,
                }),
            });
            if (response.status === 204) {
                NotificationManager.success(
                    "Pomyślnie zweryfikowano kod",
                    "Zweryfikowano kod",
                    3000
                );
                props.onClose();
            } else if (response.status >= 400) {
                NotificationManager.error(
                    "Wystąpił błąd. Spróbuj ponownie później",
                    "Nie udało się zweryfikować kodu",
                    3000
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

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
            <div className={classes.actions}>
                <Input type="text" placeholder="Kod z aplikacji" ref={codeRef} />
                <Button onClick={verifyCodeHandler} style={{marginTop: 20}} buttonText="Zweryfikuj" />
            </div>
           </>
    );
};

export default Enable2FAModal;
