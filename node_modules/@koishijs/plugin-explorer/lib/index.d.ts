import { Context, Dict, Schema } from 'koishi';
import { DataService } from '@koishijs/console';
import { FSWatcher } from 'chokidar';
import { Tester } from 'anymatch';
declare module '@koishijs/console' {
    namespace Console {
        interface Services {
            explorer: Explorer;
        }
    }
    interface Events {
        'explorer/read'(filename: string, binary?: boolean): Promise<File>;
        'explorer/write'(filename: string, content: string, binary?: boolean): Promise<void>;
        'explorer/mkdir'(filename: string): Promise<void>;
        'explorer/remove'(filename: string): Promise<void>;
        'explorer/rename'(oldValue: string, newValue: string): Promise<void>;
        'explorer/refresh'(): void;
    }
}
export interface File {
    base64: string;
    mime: string;
    encoding: string;
}
export interface Entry {
    type: 'file' | 'directory' | 'symlink';
    name: string;
    mime?: string;
    target?: string;
    filename?: string;
    children?: this[];
    oldValue?: string;
    newValue?: string;
    loading?: Promise<File>;
}
declare class Explorer extends DataService<Entry[]> {
    task: Promise<Entry[]>;
    watchers: Dict<FSWatcher>;
    globFilter: Tester;
    root: string;
    constructor(ctx: Context, config: Explorer.Config);
    stop(): void;
    private traverse;
    private _get;
    get(forced?: boolean): Promise<Entry[]>;
}
declare namespace Explorer {
    interface Config {
        root?: string;
        ignored?: string[];
    }
    const Config: Schema<Config>;
}
export default Explorer;
