# koishi-plugin-wife

[![npm](https://img.shields.io/npm/v/koishi-plugin-wife?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-wife)

一个 [Hoshino](https://github.com/Ice9Coffee/HoshinoBot) 插件的 [Koishi](https://koishi.chat) 实现。纯随机的简单今日老婆插件，随机抽一个群友当你的今日老婆。

该插件只会随机抽取一个群友，在人多的群聊里很容易出现不认识的成员变成老婆的情况。如果你很介意这种情况，可以尝试 [`waifu` 插件](https://github.com/idanran/koishi-plugin-waifu)。本插件的优势在于无需记录成员活跃状态。

## 用法

1. 安装、配置一个 `cache` 服务插件（例如 `cache-database`）并启用；
2. 在商店中安装本插件并启用；
3. 在群聊中使用 `wife` 命令查看你的今日老婆。

你也可以为 `wife` 命令指定一个更好记的别名，例如 `jrlp`。
