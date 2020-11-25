import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import LearningOptions from "./components/LearningOptions/LearningOptions";
import LinkList from "./components/LinkList/LinkList";

let today = new Date();
var todayDayString = today.getDate().toString();

const config = {
  botName: "Asistente Virtual BurgerTown",
  initialMessages: [
    createChatBotMessage("¡Hola! Para nosotros es un gusto atenderte, bienvenido al Asistente Virtual de BurgerTown, ¿en qué puedo ayudarte?"),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#000000",
    },
    chatButton: {
      backgroundColor: "#FF1501",
    },
  },
  widgets: [
    {
      widgetName: "productoDelDiaW",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Ir a página de Producto del Día",
            url: `http://burgertown-frontend.herokuapp.com/product/${todayDayString}`,
            id: 1
          }
        ]
      }
    },
    {
      widgetName: "comprarLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Ir al Menú",
            url:
              "http://burgertown-frontend.herokuapp.com/menu",
            id: 1,
          },
          {
            text: "Registrarse como Cliente",
            url:
              "http://burgertown-frontend.herokuapp.com/registrocliente",
            id: 2,
          },
          {
            text: "Iniciar Sesión como Cliente",
            url: "http://burgertown-frontend.herokuapp.com/logincliente",
            id: 3,
          },
        ],
      },
    },
  ],
};

export default config;
