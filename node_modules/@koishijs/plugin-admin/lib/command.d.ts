import { Context } from 'koishi';
declare module 'koishi' {
    namespace Command {
        interface Config {
            admin?: Config.Admin;
        }
        namespace Config {
            interface Admin {
                user?: boolean;
                channel?: boolean;
                upsert?: boolean;
            }
        }
    }
}
export default function apply(ctx: Context): void;
