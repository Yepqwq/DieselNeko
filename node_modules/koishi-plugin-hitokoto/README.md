<h1 align="center">koishi-plugin-hitokoto</h1>

<p align="center">
  <img src="./logo.png" width="600px"></img>
</p>

<p align="center">「用代码表达言语的魅力，用代码书写山河的壮丽。」</p>
<p align="center"><sup><i>Programming for the charm of words, coding to draw the magnificent scenery.</i></sup></p>
<p align="center"><sup>by Hitokoto Developers</sup></p>

<hr>

<p align="center">

[![npm](https://img.shields.io/npm/v/koishi-plugin-hitokoto?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-hitokoto)

</p>

🌏 English | [简体中文](./README.zh-CN.md)

A [koishi](https://github.com/koishijs/koishi) plugin to get a random "Hitokoto" Chinese sentence, which is from [一言网](https://hitokoto.cn).

## How to Install

You could install plugins in Koishi with [Koishi Plugin Market](https://koishi.chat/en-US/manual/usage/market.html) by searching the name `hitokoto`.

Or you could install this plugin manually with `yarn` or `npm` as well:

```bash
$ yarn add koishi-plugin-hitokoto
# Or with `npm`
$ npm install --save koishi-plugin-hitokoto
```

## Configuration

You can configure this plugin using the following configurations.

|      Name      |      Type       | Required |          Default           |                                                                 Description                                                                 |
| :------------: | :-------------: | :------: | :------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
|    `apiUrl`    |    `string`     |    no    | `https://api.hitokoto.cn/` |                                                         The API URL of the service.                                                         |
|  `minLength`   |    `number`     |    no    |             0              |                                      The minimum length of the sentence, can be override via options.                                       |
|  `maxLength`   |    `number`     |    no    |             30             |                                      The maximum length of the sentence, can be override via options.                                       |
| `defaultTypes` | `Array<string>` |    no    |         all types          | The default types of the sentence, can be override via options. If an empty array was passed in, then the plugin would treat it as `['a']`. |

## Internationalisation

This plugin supports multiple languages and we are using [Crowdin](https://crowdin.com/) to localise our project.

If you are willing to contribute your language, please register a [Crowdin](https://crowdin.com/) account before contributing translations to the `hitokoto` folder of the Crowdin project [hatsushimo](https://crowdin.com/project/hatsushimo).

## Changelog

The changelog of this plugin can be found [here](./CHANGELOG.md).

## License

This project is licensed under the MIT license, and the use of data from [一言网](https://hitokoto.cn) is in non-commercial purposes.
