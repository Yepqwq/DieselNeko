import { DataService } from '@koishijs/console';
import { Context } from 'koishi';
import { Loader } from '@koishijs/loader';
declare module '@koishijs/console' {
    interface Events {
        'manager/app-reload'(config: any): void;
        'manager/teleport'(source: string, key: string, target: string, index: number): void;
        'manager/reload'(parent: string, key: string, config: any): void;
        'manager/unload'(parent: string, key: string, config: any, index?: number): void;
        'manager/remove'(parent: string, key: string): void;
        'manager/meta'(ident: string, config: any): void;
    }
}
export declare class ConfigWriter extends DataService<Context.Config> {
    protected loader: Loader;
    constructor(ctx: Context);
    getGroup(plugins: any, ctx: Context): any;
    get(): Promise<Context.Config>;
    reloadApp(config: any): Promise<void>;
    private resolveFork;
    private resolveConfig;
    meta(ident: string, config: any): Promise<void>;
    reload(parent: string, key: string, config: any): Promise<void>;
    unload(parent: string, key: string, config?: {}, index?: number): Promise<void>;
    remove(parent: string, key: string): Promise<void>;
    teleport(source: string, key: string, target: string, index: number): Promise<void>;
}
