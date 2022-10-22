import "./index.css";
import { React, useState, useEffect } from "react";
import Led from "./components/Led";
const generateRandomNumber = () => {
  const min = 0;
  const max = 3;
  return Math.floor(Math.random() * (max - min + 1));
};

export default function App() {
  // 1. Crear variables y estados.
  // ESTADOS:
  // -array vacío en el cual voy a guardar la secuencia de los botones que opirima el usuario, "userSecuence"
  // -Guardar otro estado llamado "isPlaying", en el cual guardar si es momento de mostrar secuencia de colores a usuario
  // -Guardar en un array el estado de la secuencia correcta de colores por oprimir "correctSecuence"
  // -Guardar un estado que muestre el indice actual del foco encendido	"ledWorking"
  // -Guardar un estado que indique si todos los colores fueron teclados correctamente por el usuario "isAllCorrect"
  const [userSecuence, setUserSecuence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [correctSecuence, setCorrectSecuence] = useState([]);
  const [colorsLed, setColorsLed] = useState([
    {
      id: 0,
      color: "red",
      isWorking: false,
    },
    {
      id: 1,
      color: "blue",
      isWorking: false,
    },
    {
      id: 2,
      color: "green",
      isWorking: false,
    },
    {
      id: 3,
      color: "yellow",
      isWorking: false,
    },
  ]);

  const ledInicial = generateRandomNumber();

  const [secuence, setSecuence] = useState([2, 1, 1]);

  const [ledWorking, setLedWorking] = useState(secuence[0]);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [indexLedUsed, setIndexLedUsed] = useState(0);
  const [iniciarJuego, setIniciarJuego] = useState(false);
  const [pushingBotton, setPushingBotton] = useState(false);
  const [correctTry, setCorrectTry] = useState(false);

  ////ESTE USEEFFECT ENCIENDE LA SECUENCIA CORRECTA GUARDADA

  useEffect(() => {
    // if (!iniciarJuego) return;

    console.log("JUEGO INICIAL");
    console.log(ledInicial);
    console.log("secuence: ", secuence);
    console.log("ledWorking: ", ledWorking);

    setTimeout(() => {
      ////secuence.length - 1
      // const ledUsed = ledWorking === secuence.length - 1 ? 0 : ledWorking + 1;
      if (indexLedUsed >= secuence.length - 1) return;

      let indexLed = indexLedUsed >= secuence.length - 1 ? 0 : indexLedUsed + 1;
      console.log(
        "ENCENDIENDO TODA LA SECUENCIA CORRECTA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      );
      if (correctTry) {
        indexLed = 0;
        setCorrectTry(false);
      }
      console.log(indexLed);
      setIndexLedUsed(indexLed);
      console.log("NUEVO INDEX");
      console.log(indexLed);
      setLedWorking(secuence[indexLed]);

      // console.log("INDICES A USAR");
      // console.log(ledUsed);
      // console.log("LED USED:");
      // console.log(secuence[ledUsed]);
      // setLedWorking(secuence[ledUsed]);
    }, 1000);
  }, [ledWorking, indexLedUsed, iniciarJuego, secuence, ledInicial]);
  //////FIN DE SECUENCIA CORRECTA

  useEffect(() => {
    // if (!iniciarJuego) return;
    setIndexLedUsed(0);
    // setLedWorking(secuence[0]);
  }, [secuence, iniciarJuego, correctTry]);

  useEffect(() => {
    console.log("USE EFFECT");
    // if (!iniciarJuego) return;
    setColorsLed([
      {
        id: 0,
        color: "red",
        isWorking: 0 === ledWorking,
      },
      {
        id: 1,
        color: "blue",
        isWorking: 1 === ledWorking,
      },
      {
        id: 2,
        color: "green",
        isWorking: 2 === ledWorking,
      },
      {
        id: 3,
        color: "yellow",
        isWorking: 3 === ledWorking,
      },
    ]);

    setTimeout(() => {
      setColorsLed([
        {
          id: 0,
          color: "red",
          isWorking: false,
        },
        {
          id: 1,
          color: "blue",
          isWorking: false,
        },
        {
          id: 2,
          color: "green",
          isWorking: false,
        },
        {
          id: 3,
          color: "yellow",
          isWorking: false,
        },
      ]);
    }, 200);
  }, [ledWorking, iniciarJuego, indexLedUsed, pushingBotton]);
  useEffect(() => {});
  ///FUNCION PARA COMPARAR RESPUESSTAS DE USUARIO CON RESPUESTAS CORRECTAS
  function arraysEqual(a, b) {
    // if (a === b) return true;
    if (a == null || b == null) return false;
    // if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < b.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  return (
    <div className="App">
      <h1>Hello World!!!!!!</h1>
      <div className="simon">
        {colorsLed.map((ledProps) => {
          return (
            <Led
              id={ledProps.id}
              color={ledProps.color}
              isWorking={ledProps.isWorking}
              setColorsLed={setColorsLed}
              colorsLed={colorsLed}
              setLedWorking={setLedWorking}
              ledWorking={ledWorking}
              userSecuence={userSecuence}
              setUserSecuence={setUserSecuence}
              secuence={secuence}
              arraysEqual={arraysEqual}
              generateRandomNumber={generateRandomNumber}
              setSecuence={setSecuence}
              setIndexLedUsed={setIndexLedUsed}
              pushingBotton={pushingBotton}
              setPushingBotton={setPushingBotton}
              correctTry={correctTry}
              setCorrectTry={setCorrectTry}
            />
          );
        })}
        <button>{!iniciarJuego ? "INICIAR JUEGO" : "DETENER JUEGO"}</button>
      </div>
    </div>
  );
}
