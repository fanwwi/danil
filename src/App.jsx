import { useRef, useState } from "react";
import Letter from "./components/Letter";

import cakeVideo from "./assets/cake2.mp4";
import fireworksVideo from "./assets/fireworks2.mp4";
import music from "./assets/lovestory.mp3";

function App() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const audioRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);

    // запуск музыки
    audioRef.current.play();
  };

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 250);
  };

  return (
    <div className="App">
      {/* MUSIC */}
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mp3" />
      </audio>

      {/* BACKGROUND FIREWORKS */}
      <video autoPlay muted loop playsInline className="bgVideo">
        <source src={fireworksVideo} type="video/webm" />
      </video>

      <div className="content">
        <h1>Happy birthday, Daniil!🥳</h1>

        <button onClick={handleOpen} className="openBtn">
          Открой 💌
        </button>

        {/* CAKE */}
        <video autoPlay muted loop playsInline className="cakeVideo">
          <source src={cakeVideo} type="video/webm" />
        </video>

        {/* LETTER */}
        {open && <Letter closing={closing} onClose={handleClose} />}
      </div>
    </div>
  );
}

export default App;
