class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    fetch(`http://burgertown-backend.herokuapp.com/Producto/Get`, 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
               },
    }).then(res => res.json())
      .then(data => {
        this.array_descuentos = data.data.filter(item => item.producto_descuento !== 0);
        console.log(this.array_descuentos);
    })
    let today = new Date();
    let todayDayString = today.getDate().toString();
    console.log(todayDayString);
    fetch(`http://burgertown-backend.herokuapp.com/Producto/${todayDayString}`, 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
               },
    }).then(res => res.json())
      .then(data => {
        this.producto_del_dia = data.data;
        console.log(this.producto_del_dia);
    })
  }

  productoDelDia() {
    let today = new Date();
    let todayDayString = today.getDate().toString();
    console.log(todayDayString);
    let stringProductoDelDia = `El producto del dia de hoy es: ${this.producto_del_dia.producto_nombre}`
    const productoDelDiaMessage = this.createChatBotMessage(stringProductoDelDia, { widget: "productoDelDiaW" });
    this.updateChatbotState(productoDelDiaMessage);
  }

  descuentos() {
    let stringDescuento = `Tenemos ${this.array_descuentos.length} producto(s) con descuento: `
    for(let i = 0; i < this.array_descuentos.length; i++) {
      stringDescuento = stringDescuento + `\n ${this.array_descuentos[i].producto_nombre} con ${this.array_descuentos[i].producto_descuento} % de descuento `
    }
    const descuentoMessage = this.createChatBotMessage(stringDescuento);
    this.updateChatbotState(descuentoMessage);
  }

  // new method
  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.");
    this.updateChatbotState(greetingMessage);
  }

  handleComprarList = () => {
    const message = this.createChatBotMessage(
      "¡Nos fascina que quieras probar nuestra comida! Para ver nuestra carta de restaurante puedes hacer click en el Menú, pero recuerda que para poder comprar debes registrarte como cliente e iniciar sesión como tal:",
      {
        widget: "comprarLinks",
      }
    );

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
