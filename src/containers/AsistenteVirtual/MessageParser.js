// MessageParser starter code in MessageParser.js
class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes("hola")) {
            this.actionProvider.greet2();
        }

        if (lowerCaseMessage.includes("info")) {
            this.actionProvider.info();
        }

        if (lowerCaseMessage.includes("sedes")) {
            this.actionProvider.sedes();
        }

        if (lowerCaseMessage.includes("pedido")) {
            this.actionProvider.pedido();
        }


        if (lowerCaseMessage.includes("descuento")) {
            this.actionProvider.descuentos();
        }

        if (lowerCaseMessage.includes("producto del dia")) {
            this.actionProvider.productoDelDia();
        }

        if (lowerCaseMessage.includes("comprar")) {
            this.actionProvider.handleComprarList();
        }

        if (lowerCaseMessage.includes("pana")) {
            this.actionProvider.greet();
        }
    }
}

export default MessageParser;