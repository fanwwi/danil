import { useRef, useState } from "react";
import Letter from "./components/Letter";

import cake from "./assets/cake.png";
import music from "./assets/arct.mp3";

function App() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const audioRef = useRef(null);
  const fadeRef = useRef(null); // 🧠 чтобы чистить старые интервал

  // 🧼 очищаем предыдущий fade если он был
  const clearFade = () => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  };

  // 🎧 FADE IN
  const fadeInAudio = (audio, duration = 800) => {
    if (!audio) return;

    clearFade();

    audio.volume = 0;
    audio.play();

    const stepTime = 50;
    const steps = duration / stepTime;
    const volumeStep = 1 / steps;

    fadeRef.current = setInterval(() => {
      if (audio.volume < 1 - volumeStep) {
        audio.volume = Math.min(1, audio.volume + volumeStep);
      } else {
        audio.volume = 1;
        clearFade();
      }
    }, stepTime);
  };

  // 🎧 FADE OUT
  const fadeOutAudio = (audio, duration = 1200) => {
    if (!audio) return;

    clearFade();

    const stepTime = 50;
    const steps = duration / stepTime;
    const volumeStep = audio.volume / steps;

    fadeRef.current = setInterval(() => {
      if (audio.volume > volumeStep) {
        audio.volume = Math.max(0, audio.volume - volumeStep);
      } else {
        audio.volume = 0;
        audio.pause();
        clearFade();
      }
    }, stepTime);
  };

  const handleOpen = () => {
    setOpen(true);
    fadeInAudio(audioRef.current, 900);
  };

  const handleClose = () => {
    setClosing(true);

    fadeOutAudio(audioRef.current, 1200);

    setTimeout(() => {
      setOpen(false);
      setClosing(false);

      if (audioRef.current) {
        audioRef.current.volume = 1;
      }
    }, 250);
  };

  return (
    <div className="App">
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mp3" />
      </audio>

      <div className="content">
        <h1>Happy birthday, Daniil! 🥳</h1>

        <button onClick={handleOpen} className="openBtn">
          Открой 💌
        </button>

        <img src={cake} alt="cake" className="cakeImg" />

        {open && <Letter closing={closing} onClose={handleClose} />}
      </div>
    </div>
  );
}

export default App;
