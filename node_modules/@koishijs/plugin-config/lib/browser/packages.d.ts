import * as shared from '../shared';
export declare class PackageProvider extends shared.PackageProvider {
    collect(forced: boolean): Promise<import("@koishijs/registry").SearchObject[]>;
}
