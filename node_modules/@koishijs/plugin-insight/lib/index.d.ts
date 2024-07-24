import { Context, Schema, ScopeStatus } from 'koishi';
import { DataService } from '@koishijs/console';
declare module '@koishijs/console' {
    namespace Console {
        interface Services {
            insight: Insight;
        }
    }
}
declare class Insight extends DataService<Insight.Payload> {
    constructor(ctx: Context);
    get(): Promise<{
        nodes: Insight.Node[];
        edges: Insight.Link[];
    }>;
}
declare namespace Insight {
    interface Payload {
        nodes: Node[];
        edges: Link[];
    }
    interface Node {
        uid: number;
        name: string;
        weight: number;
        status: ScopeStatus;
        isGroup?: boolean;
        isRoot?: boolean;
        services?: string[];
    }
    interface Link {
        type: 'solid' | 'dashed';
        source: number;
        target: number;
    }
    interface Config {
    }
    const Config: Schema<Config>;
}
export default Insight;
