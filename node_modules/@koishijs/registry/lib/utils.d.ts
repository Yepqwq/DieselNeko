import { Dict } from 'cosmokit';
import { Manifest, PackageJson } from './types';
interface Ensure<T> {
    (value: any): T | undefined;
    (value: any, fallback: T): T;
}
export declare namespace Ensure {
    const array: Ensure<string[]>;
    const dict: Ensure<Dict<string>>;
    const boolean: Ensure<boolean>;
    const number: Ensure<number>;
    const string: Ensure<string>;
}
export declare function conclude(meta: PackageJson): Manifest;
export {};
