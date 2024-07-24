import { Adapter, Context, Schema } from '@satorijs/core';
import { TelegramBot } from './bot';
export declare class HttpPolling<C extends Context = Context> extends Adapter<C, TelegramBot<C>> {
    static reusable: boolean;
    private offset;
    private timeout;
    connect(bot: TelegramBot<C, TelegramBot.BaseConfig & HttpPolling.Options>): Promise<void>;
    disconnect(): Promise<void>;
}
export declare namespace HttpPolling {
    interface Options {
        protocol: 'polling';
        pollingTimeout?: number;
        retryTimes?: number;
        retryInterval?: number;
    }
    const Options: Schema<Options>;
}
