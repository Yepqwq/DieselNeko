import { Universal } from '@satorijs/core';
import { TelegramBot } from './bot';
import * as Telegram from './types';
export * from './types';
export declare const decodeUser: (data: Telegram.User) => Universal.User;
export declare const decodeGuildMember: (data: Telegram.ChatMember) => Universal.GuildMember;
export declare function handleUpdate(update: Telegram.Update, bot: TelegramBot): Promise<void>;
export declare function decodeMessage(bot: TelegramBot, data: Telegram.Message, message: Universal.Message, payload?: Universal.MessageLike): Promise<void>;
