import { Context, Logger, Schema } from 'koishi';
declare module '@koishijs/console' {
    namespace Console {
        interface Services {
            logs: DataService<Logger.Record[]>;
        }
    }
}
export declare const name = "logger";
export interface Config {
    root?: string;
    maxAge?: number;
    maxSize?: number;
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context, config: Config): Promise<void>;
