import { Context, Dict, Schema } from 'koishi';
import { WebSocketLayer } from '@koishijs/plugin-server';
import { Console, Entry } from '@koishijs/console';
import { FileSystemServeOptions, ViteDevServer } from 'vite';
declare module 'koishi' {
    interface EnvData {
        clientCount?: number;
    }
}
export * from '@koishijs/console';
export interface ClientConfig {
    devMode: boolean;
    uiPath: string;
    endpoint: string;
    static?: boolean;
    heartbeat?: HeartbeatConfig;
    proxyBase?: string;
}
declare interface HeartbeatConfig {
    interval?: number;
    timeout?: number;
}
declare class NodeConsole extends Console {
    ctx: Context;
    static inject: {
        required: string[];
        optional: string[];
    };
    private _config;
    vite: ViteDevServer;
    root: string;
    layer: WebSocketLayer;
    constructor(ctx: Context, config: NodeConsole.Config);
    get config(): NodeConsole.Config;
    set config(value: NodeConsole.Config);
    createGlobal(): ClientConfig;
    start(): Promise<void>;
    private getFiles;
    resolveEntry(files: Entry.Files, key: string): string[];
    private serveAssets;
    private transformImport;
    private transformHtml;
    private createVite;
    stop(): void;
}
declare namespace NodeConsole {
    interface Dev {
        fs: FileSystemServeOptions;
    }
    const Dev: Schema<Dev>;
    interface Head {
        tag: string;
        attrs?: Dict<string>;
        content?: string;
    }
    const Head: Schema<Head>;
    interface Config {
        uiPath?: string;
        devMode?: boolean;
        cacheDir?: string;
        open?: boolean;
        head?: Head[];
        selfUrl?: string;
        apiPath?: string;
        heartbeat?: HeartbeatConfig;
        dev?: Dev;
    }
    const Config: Schema<Config>;
}
export default Console;
export * from '@koishijs/console';
declare class BrowserConsole extends Console {
    start(): void;
    resolveEntry(files: Entry.Files): string[];
}
declare namespace BrowserConsole {
    interface Config {
    }
    const Config: Schema<Config>;
}
