import { Context, Dict, h, MessageEncoder } from '@satorijs/core';
import { TelegramBot } from './bot';
import * as Telegram from './utils';
export declare class TelegramMessageEncoder<C extends Context = Context> extends MessageEncoder<C, TelegramBot<C>> {
    private asset;
    private payload;
    private mode;
    private rows;
    prepare(): Promise<void>;
    addResult(result: Telegram.Message): Promise<void>;
    flush(): Promise<void>;
    decodeButton(attrs: Dict, label: string): Telegram.InlineKeyboardButton;
    lastRow(): Telegram.InlineKeyboardButton[];
    trimButtons(): void;
    visit(element: h): Promise<void>;
}
