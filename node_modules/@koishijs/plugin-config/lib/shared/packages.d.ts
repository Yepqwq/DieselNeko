import { Context, Dict, MainScope, Plugin, Schema } from 'koishi';
import { ScopeStatus } from 'cordis';
import { DataService } from '@koishijs/console';
import { PackageJson, SearchObject, SearchResult } from '@koishijs/registry';
declare module '@koishijs/loader' {
    interface Loader {
        market: SearchResult;
    }
}
declare module '@koishijs/console' {
    interface Events {
        'config/request-runtime'(name: string): void;
    }
}
export declare abstract class PackageProvider extends DataService<Dict<PackageProvider.Data>> {
    ctx: Context;
    cache: Dict<PackageProvider.RuntimeData>;
    debouncedRefresh: () => void;
    constructor(ctx: Context);
    abstract collect(forced: boolean): Promise<PackageProvider.Data[]>;
    update(plugin: Plugin): Promise<void>;
    parseRuntime(state: MainScope, result: PackageProvider.RuntimeData): void;
    get(forced?: boolean): Promise<{
        [k: string]: PackageProvider.Data;
    }>;
    parseExports(name: string): Promise<PackageProvider.RuntimeData>;
}
export declare namespace PackageProvider {
    interface Data extends Pick<SearchObject, 'shortname' | 'workspace' | 'manifest' | 'portable'> {
        name?: string;
        runtime?: RuntimeData;
        package: Pick<PackageJson, 'name' | 'version' | 'peerDependencies' | 'peerDependenciesMeta'>;
    }
    interface RuntimeData {
        id?: number;
        filter?: boolean;
        forkable?: boolean;
        schema?: Schema;
        usage?: string;
        required?: string[];
        optional?: string[];
        failed?: boolean;
        forks?: Dict<{
            status?: ScopeStatus;
        }>;
    }
}
