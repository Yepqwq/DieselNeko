import { Context, Schema } from 'koishi';
export * from '../shared';
export declare const name = "config";
export declare const inject: string[];
export interface Config {
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context, config: Config): void;
