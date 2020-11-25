import React from "react";
import Chatbot from "react-chatbot-kit";
import "./AsistenteVirtual.css";

import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";

function AsistenteVirtual() {
  return (
    <div className="App">
      <header className="App-header">
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </header>
    </div>
  );
}

export default AsistenteVirtual;
