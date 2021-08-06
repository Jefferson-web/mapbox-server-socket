import { Srv } from "./server";

const server = Srv.instance;

server.start(() => {
    console.log('The server was started.');
});