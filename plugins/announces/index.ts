import Plugin from "core/plugins";

export default class Announces extends Plugin {

    async onLoad() {
     //   tmc.server.on("Trackmania.BeginMap", this.onBeginMap.bind(this));
        tmc.server.on("Trackmania.PlayerConnect", this.onPlayerConnect.bind(this));
        tmc.server.on("Trackmania.PlayerDisconnect", this.onPlayerDisconnect.bind(this));
    }

    async onUnload() {
        // tmc.server.removeListener("Trackmania.BeginMap", this.onBeginMap.bind(this));
        tmc.server.removeListener("Trackmania.PlayerConnect", this.onPlayerConnect.bind(this));
        tmc.server.removeListener("Trackmania.PlayerDisconnect", this.onPlayerDisconnect.bind(this));
    }

    async onBeginMap(data: any) {
        const info = data[0];
        const msg = `¤info¤Now Playing: ¤white¤${info.Name}¤info¤ by ¤white¤${info.AuthorNickname?info.AuthorNickname:info.Author}`;
        await tmc.chat(msg);
        tmc.cli(msg);
    }

    async onPlayerConnect(data: any) {
        const login = data[0];
        const player = await tmc.getPlayer(login);
        const msg = `¤white¤${player.nickname}¤info¤ has joined!`;
        await tmc.chat(msg);
        tmc.cli(msg);
    }

    async onPlayerDisconnect(data: any) {
        const login = data[0];
        const player = await tmc.getPlayer(login);
        const msg = `¤white¤${player.nickname}¤info¤ has left!`;
        await tmc.chat(msg);
        tmc.cli(msg);
    }

}