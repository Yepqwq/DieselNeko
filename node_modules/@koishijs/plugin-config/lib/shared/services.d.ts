import { DataService } from '@koishijs/console';
import { Context, Dict } from 'koishi';
export declare class ServiceProvider extends DataService<Dict<number>> {
    constructor(ctx: Context);
    get(): Promise<Dict<number>>;
}
