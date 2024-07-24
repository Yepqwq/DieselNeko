import { Context, Dict, Schema, Awaitable, Service, Universal } from 'koishi';
import { IncomingMessage } from 'http';
export class SchemaProvider extends DataService<Dict<Schema>> {
    constructor(ctx: Context);
    get(): Promise<Dict<Schema>>;
}
export class PermissionProvider extends DataService<string[]> {
    constructor(ctx: Context);
    get(): Promise<string[]>;
}
export namespace Entry {
    type Files = string | string[] | EntryOptions;
    interface EntryOptions {
        dev: string;
        prod: string | string[];
    }
}
export class Entry<T = any> {
    ctx: Context;
    files: Entry.Files;
    data: (client: Client) => T;
    id: string;
    dispose: () => void;
    constructor(ctx: Context, files: Entry.Files, data: (client: Client) => T);
    refresh(): void;
}
declare module 'koishi' {
    interface Context {
        console: Console;
    }
    interface Events {
        'console/connection'(client: Client): void;
        'console/intercept'(client: Client, listener: DataService.Options): Awaitable<boolean>;
    }
}
export interface Listener extends DataService.Options {
    callback(this: Client, ...args: any[]): Awaitable<any>;
}
export interface EntryData {
    files: string[];
    paths?: string[];
    data: () => any;
}
export class EntryProvider extends DataService<Dict<EntryData>> {
    static inject: any[];
    constructor(ctx: Context);
    get(forced: boolean, client: Client): Promise<Dict<{
        files: string[];
        paths: string[];
        data: any;
    }, string>>;
}
export abstract class Console extends Service {
    ctx: Context;
    static filter: boolean;
    static inject: {
        optional: string[];
    };
    private id;
    readonly entries: Dict<Entry>;
    readonly listeners: Dict<Listener>;
    readonly clients: Dict<Client>;
    services: Console.Services;
    constructor(ctx: Context);
    protected accept(socket: Universal.WebSocket, request?: IncomingMessage): void;
    get(client: Client): Promise<Dict<{
        files: string[];
        paths: string[];
        data: any;
    }, string>>;
    protected abstract resolveEntry(files: Entry.Files, key: string): string[];
    addEntry<T>(files: Entry.Files, data?: () => T): Entry<T>;
    addListener<K extends keyof Events>(event: K, callback: Events[K], options?: DataService.Options): void;
    broadcast(type: string, body: any, options?: DataService.Options): Promise<void>;
    refresh<K extends keyof Console.Services>(type: K): any;
    patch<K extends keyof Console.Services>(type: K, value: Console.Services[K] extends DataService<infer T> ? T : never): any;
}
export interface Events {
    'ping'(): string;
}
export namespace Console {
    interface Services {
        entry: EntryProvider;
        schema: SchemaProvider;
        permissions: PermissionProvider;
    }
}
export default Console;
export namespace DataService {
    interface Options {
        immediate?: boolean;
        authority?: number;
    }
}
export abstract class DataService<T = never> extends Service {
    protected ctx: Context;
    protected key: keyof Console.Services;
    options: DataService.Options;
    static filter: boolean;
    static inject: string[];
    get(forced?: boolean, client?: Client): Promise<T>;
    constructor(ctx: Context, key: keyof Console.Services, options?: DataService.Options);
    start(): void;
    refresh(forced?: boolean): Promise<void>;
    patch(value: T): void;
}
export class Client {
    readonly ctx: Context;
    socket: Universal.WebSocket;
    request?: IncomingMessage;
    readonly id: string;
    constructor(ctx: Context, socket: Universal.WebSocket, request?: IncomingMessage);
    send(payload: any): void;
    receive: (data: Universal.WebSocket.MessageEvent) => Promise<void>;
    refresh(): void;
}
