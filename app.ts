import { GbxClient } from '@evotm/gbxclient';
import PlayerManager, { Player } from './core/playermanager';
import TmServer from './core/server';
import UiManager from './core/uimanager';
import MapManager from './core/mapmanager';
import CommandManager from './core/commandmanager';
import { type GameStruct } from './core/types';
import { processColorString } from './core/utils';
import log from './core/log';
import fs from 'fs';

const controllerStr = "$z$s$n$fff$oMINI$ocontrol$z$s$fff";

class MiniControl {
    server: TmServer;
    players: PlayerManager;
    ui: UiManager;
    plugins: any = {};
    game: GameStruct;
    mapsPath: string = "";
    admins: string[];
    chatCmd: CommandManager;
    maps: MapManager;
    version: string = "2024-01-01";

    constructor() {
        console.time("Startup");
        this.server = new TmServer(new GbxClient());
        this.maps = new MapManager(this.server);
        this.players = new PlayerManager(this.server);
        this.ui = new UiManager(this.server);
        this.chatCmd = new CommandManager(this.server);
        this.admins = (process.env.ADMINS || "").split(",");
        this.game = { Name: "" };
    }

    async getPlayer(login: string): Promise<Player> {
        return await this.players.getPlayer(login);
    }

    addCommand(command: string, callback: CallableFunction, help: string = "") {
        this.chatCmd.addCommand(command, callback, help);
    }

    addPlugin(name: string, object: any) {
        if (!this.plugins[name]) {
            this.plugins[name] = object;
            this.cli(`$aaaPlugin $fd0${name}$fff loaded.`);
        }
    }

    cli(object: any) {
        log.info(processColorString(object.toString()));
    }

    debug(object: any) {
        if (process.env.DEBUG == "true") log.info(processColorString(object.toString()));
    }

    async chat(text: string, login: undefined | string | string[] = undefined) {
        if (login !== undefined) {
            const msg = "$z$s$5f0» ¤white¤" + text.toString().replaceAll("", "");
            this.server.send("ChatSendServerMessageToLogin", processColorString(msg, "$z$s"), (typeof login == "string") ? login : login.join(","));
        } else {
            const msg = controllerStr + " »¤info¤ " + text.replaceAll("", "")
            this.server.send("ChatSendServerMessage", processColorString(msg, "$z$s"));
        }
    }

    async run() {
        const port = Number.parseInt(process.env.XMLRPC_PORT || "5000");
        const status = await this.server.connect(process.env.XMLRPC_HOST ?? "127.0.0.1", port);
        if (!status) {
            this.cli("¤error¤Couldn't connect to server.");
            process.exit();
        }
        this.cli("¤info¤Connected to Trackmania Dedicated server.");
        try {            
            await this.server.call("Authenticate", process.env.XMLRPC_USER ?? "SuperAdmin", process.env.XMLRPC_PASS ?? "SuperAdmin");
        } catch (e: any) {
            this.cli("¤error¤Authenticate to server failed.");
            this.cli(e.message);
            process.exit();
        }
        this.server.send("EnableCallbacks", true);
        this.server.send("SendHideManialinkPage");
        this.game = await this.server.call("GetVersion");

        if (this.game.Name == "Trackmania") {
            await this.server.call("SetApiVersion", "2023-04-16");
            this.mapsPath = await this.server.call("GetMapsDirectory");
            await this.server.callScript("XmlRpc.EnableCallbacks", "true");
        } else {
            this.mapsPath = await this.server.call("GetTracksDirectory");
        }

        await this.maps.init();
        await this.players.init();
        await this.ui.init();
        await this.beforeInit();
        this.server.emit("TMC.Init");
        await this.afterInit();
        console.timeEnd("Startup");
    }
    
    async beforeInit() {
        this.chatCmd.beforeInit();
    }
    
    async afterInit() {
        this.players.afterInit();
        this.chatCmd.afterInit();
        this.cli(`¤white¤Welcome to ${controllerStr} v${this.version}!`);
        await this.server.send("ChatSendServerMessage", `Welcome to ${controllerStr} v${this.version}!`);
    }
}

const tmc = new MiniControl();
(async () => await tmc.run())();

declare global {
    const tmc: MiniControl
}

(global as any).tmc = tmc

const plugins = JSON.parse(await fs.readFileSync("plugins.json").toString());

for (const plugin of plugins) {
    await import(plugin);
}