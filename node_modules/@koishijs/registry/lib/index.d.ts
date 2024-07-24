import { Awaitable } from 'cosmokit';
import { Registry, RemotePackage, SearchObject, SearchResult } from './types';
export * from './local';
export * from './types';
export * from './utils';
export interface CollectConfig {
    step?: number;
    margin?: number;
    timeout?: number;
    ignored?: string[];
    endpoint?: string;
}
export interface AnalyzeConfig {
    version: string;
    concurrency?: number;
    before?(object: SearchObject): void;
    onRegistry?(registry: Registry, versions: RemotePackage[]): Awaitable<void>;
    onSuccess?(object: SearchObject, versions: RemotePackage[]): Awaitable<void>;
    onFailure?(name: string, reason: any): Awaitable<void>;
    onSkipped?(name: string): Awaitable<void>;
    after?(object: SearchObject): void;
}
export interface ScanConfig extends CollectConfig, AnalyzeConfig {
    request<T>(url: string): Promise<T>;
}
export interface RequestConfig {
    timeout?: number;
}
export default interface Scanner extends SearchResult {
    progress: number;
}
export default class Scanner {
    request: <T>(url: string, config?: RequestConfig) => Promise<T>;
    private cache;
    constructor(request: <T>(url: string, config?: RequestConfig) => Promise<T>);
    private search;
    collect(config?: CollectConfig): Promise<void>;
    static isPlugin(name: string): boolean;
    static isCompatible(range: string, remote: Pick<RemotePackage, 'peerDependencies'>): boolean;
    process(object: SearchObject, range: string, onRegistry: AnalyzeConfig['onRegistry']): Promise<RemotePackage[]>;
    analyze(config: AnalyzeConfig): Promise<RemotePackage[][]>;
}
