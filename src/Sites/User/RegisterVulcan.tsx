import React, { useRef } from "react";
// @ts-ignore
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import Section from "../../Layout/Section";
import classes from "./Settings.module.css";
import example1 from "./Graphics/example1.png";
import example2 from "./Graphics/example2.png";
import example3 from "./Graphics/example3.png";

const RegisterVulcan = () => {
  const formPin = useRef<HTMLInputElement>();
  const formToken = useRef<HTMLInputElement>();
  const formSymbol = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  async function addPost(event: any) {
    event.preventDefault();

    const userCredentials = {
      pin: formPin.current?.value,
      token: formToken.current?.value,
      symbol: formSymbol.current?.value,
    };

    const spottedPosts = await fetch("http://localhost:3000/school/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userCredentials),
    }).then((res) => res.json());

    if (spottedPosts.statusCode === 200) {
      NotificationManager.success(
        "Udało się zarejerstrować token.",
        "Sukces!",
        3000
      );
      navigate("/settings");
    } else {
      NotificationManager.error("Coś poszło nie tak.", "Błąd!", 3000);
    }
  }

  return (
    <>
      <form className={classes.addForm} onSubmit={addPost}>
        <Section>
          <h2>Dodaj swój dziennik</h2>
          <div className={classes.twoInputs}>
            <Input placeholder="Token" ref={formToken} />
            <Input placeholder="Pin" ref={formPin} />
            <Input placeholder="Symbol" ref={formSymbol} />
            <Button buttonText="Zapisz" type="submit" />
          </div>
          <div>
          </div>
        </Section>
        <Section>
          <h2>Poradnik</h2>
          <p className={classes.topParagraph}>1. Na początku należy zalogować się do dziennika (jeśli na tym etapie jest problem, człowieku zastanów się co ty robisz) i przejść do sekcji ucznia.</p>
          <img className={classes.example} src={example1} alt="" />
          <p>2. Kolejny krok będzie ciężki. Należy przejść do zakładki uczeń i kliknąć dziwny guzik z przerażającym napisem "WYGENERUJ KOD DOSTĘPU". </p>
          <img className={classes.example} src={example2} alt="" />
          <p>3. Ostatnim krokiem (niezwykle śmiesznym) będzie skopiowanie (lub przepisanie) tokenu, symbolu i pinu wygenerowanego przez system UOnet+.</p>
          <img className={classes.example} src={example3} alt="" />
        </Section>
      </form>
    </>
  );
};

export default RegisterVulcan;
