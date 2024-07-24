import { LocalScanner } from '@koishijs/registry';
import * as shared from '../shared';
declare class PackageScanner extends LocalScanner {
    private service;
    constructor(service: PackageProvider);
    onError(error: any, name: string): Promise<void>;
    parsePackage(name: string): Promise<import("@koishijs/registry").SearchObject>;
}
export declare class PackageProvider extends shared.PackageProvider {
    scanner: PackageScanner;
    collect(forced: boolean): Promise<import("@koishijs/registry").SearchObject[]>;
}
export {};
