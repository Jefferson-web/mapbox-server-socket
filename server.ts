import express, { Application, json } from 'express';
import cors from 'cors';
import http from 'http';
import { Socket, Server as SocketIO } from 'socket.io';
import socketEvents from './socket.events';
import { Map } from './classes/Map';

export class Srv {

    private _app: Application;
    private httpServer: http.Server;
    private io: SocketIO;
    private static _instance: Srv;
    private SERVER_PORT = process.env.PORT || 3000;

    private mapa = new Map();

    private constructor() {
        this._app = express();
        this.httpServer = http.createServer(this._app);
        this.io = new SocketIO(this.httpServer, { cors: { origin: 'http://localhost:4200' } });
        this.config();
        this.listenEvents();
    }

    private config() {
        this._app.use(json());
        this._app.use(express.urlencoded({ extended: true }));
        this._app.use(cors());
        this._app.get('/map', (req, res) => {
            res.send(this.mapa.getMarkers());
        });
    }

    private listenEvents(){
        this.io.on('connection', (socket: Socket) =>{
            socketEvents(socket, this.io);
        });        
    }

    public static get instance() {
        if (!this._instance) {
            this._instance = new Srv();
        }
        return this._instance;
    }

    start(callback: Function) {
        this.httpServer.listen(this.SERVER_PORT, callback());
    }

}