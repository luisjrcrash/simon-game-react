import { React, useState, useEffect, useRef } from "react";

const Led = (props) => {
  const {
    id,
    color,
    isWorking,
    setColorsLed,
    colorsLed,
    ledWorking,
    setLedWorking,
    userSecuence,
    setUserSecuence,
    arraysEqual,
    secuence,
    generateRandomNumber,
    setSecuence,
    setIndexLedUsed,
    setPushingBotton,
    pushingBotton,
    setCorrectTry,
    correctTry,
  } = props;
  const botonRef = useRef();

  useEffect(() => {}, []);
  const clickOnButton = () => {
    console.log("ID: ", id);
    setPushingBotton(!pushingBotton);
    setLedWorking(id);
    setUserSecuence([...userSecuence, id]);

    console.log("NUEVA SECUENCIA");
    console.log([...userSecuence, id]);
    console.log("SECUENCIA CORRECTA");
    console.log(secuence);
    console.log("SON IGUALES ???");
    console.log(arraysEqual(secuence, [...userSecuence, id]));

    //VALIDACION

    ////JUGADOR INGRESO MAL SECUENCIA
    if (!arraysEqual(secuence, [...userSecuence, id])) {
      setUserSecuence([]);
      setCorrectTry(true);
      console.log("PERDISTE, VUELVE A COMENZAR!!!!!!!!!!!!!!!!");
      return;
    }
    ////JUGADOR INGRESO BIEN LA SECUENCIA
    if (
      arraysEqual(secuence, [...userSecuence, id]) &&
      secuence.length == [...userSecuence, id].length
    ) {
      console.log("BIEN!");
      setUserSecuence([]);
      setSecuence([...secuence, generateRandomNumber()]);
      //   setTimeout(() => {
      //     setIndexLedUsed(0);
      //     setLedWorking(secuence[0]);
      //   }, 2000);
      setCorrectTry(true);
      return;
    }
  };

  return (
    <div
      className="led"
      ref={botonRef}
      style={{
        background: isWorking ? color : "",
      }}
      onClick={clickOnButton}
    ></div>
  );
};

export default Led;
