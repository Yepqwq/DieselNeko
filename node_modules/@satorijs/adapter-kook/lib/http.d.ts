import { Adapter, Context, Schema } from '@satorijs/core';
import { KookBot } from './bot';
export declare class HttpServer<C extends Context = Context> extends Adapter<C, KookBot<C, KookBot.BaseConfig & HttpServer.Options>> {
    static inject: string[];
    private logger;
    constructor(ctx: C, bot: KookBot<C>);
    connect(bot: KookBot): Promise<void>;
}
export declare namespace HttpServer {
    interface Options {
        protocol: 'http';
        path?: string;
        token: string;
        verifyToken: string;
    }
    const Options: Schema<Options>;
}
