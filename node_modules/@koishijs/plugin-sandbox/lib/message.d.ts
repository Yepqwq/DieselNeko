import { Context, h, MessageEncoder } from 'koishi';
import { SandboxBot } from './bot';
export declare class SandboxMessenger<C extends Context = Context> extends MessageEncoder<C, SandboxBot<C>> {
    private buffer;
    private rules;
    flush(): Promise<void>;
    visit(element: h): Promise<void>;
}
