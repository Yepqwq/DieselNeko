import { SearchObject, SearchResult } from './types';
export interface LocalScanner extends SearchResult {
}
export declare class LocalScanner {
    baseDir: string;
    private cache;
    private task;
    constructor(baseDir: string);
    onError(reason: any, name: string): void;
    _collect(): Promise<SearchObject[]>;
    collect(forced?: boolean): Promise<void>;
    private loadDirectory;
    private loadPackage;
    private loadManifest;
    protected parsePackage(name: string): Promise<SearchObject>;
}
