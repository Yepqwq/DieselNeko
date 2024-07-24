import { TelegramBot } from '../bot';
export interface Internal {
}
export declare class Internal {
    bot: TelegramBot;
    constructor(bot: TelegramBot);
    static define(method: string): void;
}
