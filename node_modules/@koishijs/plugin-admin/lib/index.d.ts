import { Context, Dict, Schema, Service } from 'koishi';
import type { Entry } from '@koishijs/console';
export * from './command';
declare module 'koishi' {
    interface Context {
        admin: Admin;
    }
    interface Tables {
        group: PermGroup;
        perm_track: PermTrack;
    }
}
declare module '@koishijs/console' {
    interface Events {
        'admin/create-track'(name: string): Promise<number>;
        'admin/rename-track'(id: number, name: string): Promise<void>;
        'admin/delete-track'(id: number): Promise<void>;
        'admin/update-track'(id: number, permissions: string[]): Promise<void>;
        'admin/create-group'(name: string): Promise<number>;
        'admin/rename-group'(id: number, name: string): Promise<void>;
        'admin/delete-group'(id: number): Promise<void>;
        'admin/update-group'(id: number, permissions: string[]): Promise<void>;
        'admin/add-user'(gid: number, platform: string, aid: string): Promise<void>;
        'admin/remove-user'(gid: number, platform: string, aid: string): Promise<void>;
    }
}
export interface PermGroup {
    id: number;
    name: string;
    permissions: string[];
    count?: number;
    dispose?: () => void;
}
export interface PermTrack {
    id: number;
    name: string;
    permissions: string[];
    dispose?: () => void;
}
export declare class Admin extends Service {
    config: Admin.Config;
    groups: PermGroup[];
    tracks: PermTrack[];
    entry?: Entry<Admin.Data>;
    constructor(ctx: Context, config: Admin.Config);
    start(): Promise<void>;
    private setupGroup;
    private setupTrack;
    createTrack(name: string): Promise<number>;
    renameTrack(id: number, name: string): Promise<void>;
    deleteTrack(id: number): Promise<void>;
    updateTrack(id: number, permissions: string[]): Promise<void>;
    createGroup(name: string): Promise<number>;
    renameGroup(id: number, name: string): Promise<void>;
    deleteGroup(id: number): Promise<void>;
    updateGroup(id: number, permissions: string[]): Promise<void>;
    addUser(id: number, platform: string, aid: string): Promise<void>;
    removeUser(id: number, platform: string, aid: string): Promise<void>;
}
export declare namespace Admin {
    const inject: string[];
    interface Config {
    }
    const Config: Schema<Config>;
    interface Data {
        group: Dict<PermGroup>;
        track: Dict<PermTrack>;
    }
}
export default Admin;
