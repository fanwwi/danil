import { useState } from "react";
import Letter from "./components/Letter";
import cakeVideo from "./assets/cake2.webm";
import fireworksVideo from "./assets/fireworks2.webm";

function App() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 250);
  };

  return (
    <div className="App">
      <video autoPlay muted loop playsInline className="bgVideo">
        <source src={fireworksVideo} type="video/mp4" />
      </video>

      <div className="content">
        <h1>Happy birthday, Daniil!🥳</h1>

        <button onClick={() => setOpen(true)} className="openBtn">
          Открой 💌
        </button>

        <video autoPlay muted loop playsInline className="cakeVideo">
          <source src={cakeVideo} type="video/mp4" />
        </video>

        {open && <Letter closing={closing} onClose={handleClose} />}
      </div>
    </div>
  );
}

export default App;
