# 上帝小助手浏览器扩展程序

- [0-查看视频教程](#0-查看视频教程)
  - [0.1-去哔哩哔哩查看视频教程](#01-去哔哩哔哩查看视频教程)
  - [0.2-去 YouTube 查看视频教程](#02-去-youtube-查看视频教程)
- [1-功能介绍](#1-功能介绍)
  - [1.1-低码搭建插件页面](#11-低代码搭建插件页面)
  - [1.2-用户脚本管理](#12-用户脚本管理)
  - [1.3-常用开发配置页面](#13-常用开发配置页面)
- [2-安装和更新扩展](#2-安装和更新扩展)
  - [2.1-从应用商店安装扩展](#21-从应用商店安装扩展)
  - [2.2-通过 zip 包安装扩展](#22-通过-zip-包安装扩展)
  - [2.3-通过 zip 包更新扩展](#23-通过-zip-包更新扩展)
- [3-功能说明](#3-功能说明)
  - [3.1-使用低码搭建页面](#31-使用低码搭建页面)
  - [3.2-本扩展对外暴露的浏览器接口](#32-本扩展对外暴露的浏览器接口)
- [4-欢迎扫下方二维码咨询或反馈问题](#4-欢迎扫下方二维码咨询或反馈问题)
  - [4.1-微信](#41-微信)
  - [4.2-QQ](#42-qq)
  - [4.3-Telegram](#43-telegram)
- [5-打赏支持作者](#5-打赏支持作者)

## 0-查看视频教程

### 0.1-去哔哩哔哩查看视频教程

- [1-个人介绍，为什么要做上帝小助手浏览器插件/扩展开发平台](https://www.bilibili.com/video/BV1wy1yYDEnL)
- [2-上帝小助手功能介绍](https://www.bilibili.com/video/BV1JM1yYLEe8)
- [3-安装上帝小助手](https://www.bilibili.com/video/BV1WF1yYQEGd)
- [4-更新上帝小助手](https://www.bilibili.com/video/BV1Eu1yYyE9h)
- [5-使用上帝小助手定制个人专属新标签页和小组新标签页](https://www.bilibili.com/video/BV1c82kYjEXH)

### 0.2-去 YouTube 查看视频教程

- [1-个人介绍，为什么要做上帝小助手浏览器插件/扩展开发平台](https://www.youtube.com/watch?v=FcpJoSvHEe4)
- [2-上帝小助手功能介绍](https://www.youtube.com/watch?v=3Eyub74FSPU)
- [3-安装上帝小助手](https://www.youtube.com/watch?v=SKysPdxW_x4)
- [4-更新上帝小助手](https://www.youtube.com/watch?v=yitVi3I-hrY)
- [5-使用上帝小助手定制个人专属新标签页和小组新标签页](https://www.youtube.com/watch?v=vg7uwPwuzf0)

## 1-功能介绍

上帝小助手浏览器扩展程序是一个浏览器扩展开发平台

### 1.1-低代码搭建插件页面

为用户提供了一个低代码搭建平台，用户可以通过低代码的方式快速搭建自己的专属新标签页，以及搭建各种自动化任务页面

<img width="700" src="./images/ga-editor.png">

<img width="700" src="./images/ga-preview.png">

<img width="700" src="./images/ga-editor2.jpg">

<img width="700" src="./images/ga-preview2.jpg">

模板市场中还提供了丰富的区块模板给用户使用

<img width="600" src="./images/ga-block-template-market.png">

低代码编辑器还内置了 AI 助手，可以用自然语言聊天的方式描述需求，AI 直接生成页面并应用到设计器中继续编辑

<img width="700" src="./images/ga-editor-ai.png">

### 1.2-用户脚本管理

用户可以添加各种自动化任务脚本

<img width="700" src="./images/ga-userScripts-manage.png">

<img width="700" src="./images/ga-userScripts-preview.png">

### 1.3-常用开发配置页面

扩展还提供了多个面向开发者的配置页面，都可以在扩展选项页中打开

#### 1.3.1-模型提供方配置

管理各 AI 模型提供方的接口地址、API Key 与可用模型列表，配置后可在 AI 生成页面、翻译等模块中选择使用，也支持添加自定义提供方和测试模型连通性

<img width="700" src="./images/ga-ModelProvidersSettings.png">

#### 1.3.2-翻译配置

内置翻译功能，可以配置翻译提供方、模型、源语言与目标语言、显示模式（如双语）等，并支持页面自动翻译、悬停段落翻译、动态内容翻译、快捷键翻译、翻译悬浮球、翻译缓存，以及划词翻译历史与单词本管理

<img width="700" src="./images/ga-TranslationSettings.png">

翻译效果演示

<img width="700" src="./images/ga-translate-demo.png">

翻译过程中遇到的生词可以一键加入单词本，方便后续集中复习

<img width="700" src="./images/ga-wordbook.png">

#### 1.3.3-网络请求修改配置

开启总开关后，为所有 HTTP 请求自动追加规则中配置的 Header / Cookie / Query 参数，规则支持三种类型且每条可单独启用或停用

<img width="700" src="./images/ga-ModRequestSettings.png">

#### 1.3.4-Cookie 同步配置

将当前窗口打开的 HTTP 页面（或手动输入的源 URL）的 Cookie 一键同步到配置的目标域名（如 localhost、127.0.0.1），方便本地开发调试登录态

<img width="700" src="./images/ga-CookieSyncSettings.png">

#### 1.3.5-跨域配置

放宽 CORS 跨域限制，可按「目标接口域名」或「发起请求的页面」配置放行规则，并可叠加 URL 过滤（通配符 / 正则）、排除域名、限定请求方法、限定资源类型、限定第一方 / 第三方等条件

<img width="700" src="./images/ga-CorsSettings.png">

#### 1.3.6-泳道配置

通过注入 swimlane 请求头的方式切换接口环境，支持配置多个泳道并激活其中一个，也可在页面显示当前泳道角标，方便多环境并行调试

<img width="700" src="./images/ga-SwimlaneSettings.png">

#### 1.3.7-环境角标配置

页面 URL 命中规则中的正则表达式时，自动在页面标题追加对应的环境标签（如 [Dev]、[Test]、[Stage]）

<img width="700" src="./images/ga-EnvironmentMarkerSettings.png">

## 2-安装和更新扩展

### 2.1-从应用商店安装扩展

- Chrome 浏览器请 [从 Chrome 应用商店安装](https://chromewebstore.google.com/detail/lgidjfclkbjgbjfbebecgapobjddolbd)
- Edge 浏览器请 [从 Edge 应用商店安装](https://microsoftedge.microsoft.com/addons/detail/badfbconebmibddbkhlnmljjagcfkgdo)

### 2.2-通过 zip 包安装扩展

1、下载 [god-assistant-0.2.3.zip](https://raw.githubusercontent.com/bingoogolapple/bga-god-assistant-config/main/god-assistant-0.2.3.zip) 文件到本地，并解压

2、在 Chrome 或 Microsoft Edge 中打开「chrome://extensions/」

3、打开开发者模式 -> 加载已解压的扩展程序

<img width="600" src="./images/ga-chrome-open-dev-mode.png">

<img width="600" src="./images/ga-edge-open-dev-mode.png">

4、选择第 1 步中解压得到的目录后，扩展就算安装完成了

<img width="600" src="./images/ga-choose-install-dir.png">

5、建议将该扩展固定在浏览器顶部，方便后续能快速去编辑页面

<img width="200" src="./images/ga-fixed.png">

### 2.3-通过 zip 包更新扩展

1、当扩展发布新版本后，用户在打开当前扩展的任意页面时，都会展示如下所示的升级提示弹窗，用户只需选择之前安装扩展时选择的安装目录即可升级扩展来使用最新功能

<img width="500" src="./images/ga-update-version.png">

2、更新扩展需要申请扩展安装目录的写权限，所以需要用户允许修改文件

<img width="500" src="./images/ga-edge-upgrade-permission.png">

## 3-功能说明

### 3.1-使用低码搭建页面

1、在扩展图标上右键选择「选项」或「扩展选项」打开扩展的配置项页面

<img width="200" src="./images/ga-chrome-open-options.png">

<img width="200" src="./images/ga-edge-open-options.png">

2、然后就可以增删改你的专属浏览器页面了

<img width="600" src="./images/ga-chrome-options-page.png">

<img width="600" src="./images/ga-editor.png">

<img width="600" src="./images/ga-preview.png">

### 3.2-本扩展对外暴露的浏览器接口

浏览器为扩展程序提供了很多 API [API 参考](https://developer.chrome.com/docs/extensions/reference/api?hl=zh-cn)，上帝小助手浏览器扩展中提供了 `$chrome.callMethodByPath` 方法来执行原本的浏览器提供的 API

- 例子 1：监听点击事件

```js
$props({
  onClick: () => {
    $message.info("TODO 处理点击事件");
  },
});
```

- 例子 2：获取插件清单文件信息

```js
$props({
  onClick: async () => {
    // 方式一
    const manifest1 = await $chrome.runtime.getManifest();
    alert(JSON.stringify(manifest1, null, 2));
    // 方式二
    const manifest2 = await $chrome.callMethodByPath("runtime.getManifest");
    alert(JSON.stringify(manifest2, null, 2));
  },
});
```

- 例子 3：写入缓存和读取缓存

```js
$props({
  onClick: async () => {
    // 写入缓存-方式1
    await $chrome.storage.local.set({
      key1: `${new Date().toLocaleString()}`,
      key2: `${Math.random()}`,
    });
    // 写入缓存-方式2
    await $chrome.callMethodByPath("storage.local.set", {
      key3: `${new Date().toLocaleString()}`,
      key4: `${Math.random()}`,
    });

    // 读取缓存-方式1
    const result1 = await $chrome.storage.local.get(["key1", "key2"]);

    // 读取缓存-方式2
    const result2 = await $chrome.callMethodByPath("storage.local.get", [
      "key1",
      "key2",
    ]);

    $message.success(JSON.stringify({ result1, result2 }));
  },
});
```

- 例子 4：获取当前激活的标签页

```js
$props({
  onClick: async () => {
    // 方式1
    const tab1 = await $chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    alert(JSON.stringify(tab1));
    // 方式2
    const tab2 = await $chrome.callMethodByPath("tabs.query", {
      active: true,
      lastFocusedWindow: true,
    });
    alert(JSON.stringify(tab2));
  },
});
```

- 例子 5：操作系统通知

```js
$props({
  onClick: () => {
    let myNotificationId;

    // 创建系统通知
    $chrome.notifications.create(
      null,
      {
        type: "basic",
        title: "我是标题",
        message: "我是内容",
        iconUrl: "../images/128.png",
      },
      $chrome.proxy((notificationId) => {
        myNotificationId = notificationId;
        $message.info(`创建的系统通知 ID 为 ${notificationId}`);
      })
    );

    // 延迟 3 秒更新系统通知
    setTimeout(() => {
      $chrome.notifications.update(
        myNotificationId,
        {
          type: "basic",
          title: "我是修改后的标题",
          message: "我是修改后内容",
          iconUrl: "../images/128.png",
        },
        $chrome.proxy((wasUpdated) => {
          $message.info(`更新系统通知 ${wasUpdated}`);
        })
      );
    }, 3000);

    // 延迟 6 秒清除系统通知
    setTimeout(() => {
      $chrome.notifications.clear(
        myNotificationId,
        $chrome.proxy((wasCleared) => {
          $message.info(`清除系统通知 ${wasCleared}`);
        })
      );
    }, 6000);
  },
});
```

## 4-欢迎扫下方二维码咨询或反馈问题

### 4.1-微信

| 扫码加「微信群」咨询或反馈问题                                       | 扫码关注「微信公众号」查看视频教程                             | 扫码加「作者微信」咨询或反馈问题                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- |
| <img width="180" alt="微信群" src="./images/WeChatGroup1QrCode.jpg"> | <img width="180" alt="公众号" src="./images/GongZhongHao.png"> | <img width="180" alt="作者微信" src="./images/BGAQrCode.png"> |

### 4.2-QQ

| 扫码加「QQ 群」咨询或反馈问题                                   | 扫码在「QQ 短视频」查看视频教程                                 | 扫码加「作者 QQ」咨询或反馈问题                                |
| --------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------- |
| <img width="180" alt="QQ 群" src="./images/QQGroup1QrCode.jpg"> | <img width="180" alt="作者 QQ" src="./images/QQShortVideo.jpg"> | <img width="180" alt="作者 QQ" src="./images/BGAQQQrCode.jpg"> |

### 4.3-Telegram

| 扫码加「Telegram 群」咨询或反馈问题                                         | 点击下方链接加「Telegram 群」咨询或反馈问题                                  |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| <img width="180" alt="Telegram 群" src="./images/TelegramGroup1QrCode.jpg"> | [https://t.me/god_assistant_extension](https://t.me/god_assistant_extension) |

## 5-打赏支持作者

如果您觉得上帝小助手浏览器扩展程序对你有帮助，可以扫描下方二维码打赏 10.24 元支持作者继续创作

| 微信                                                          | QQ                                                      | 支付宝                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| <img width="180" alt="微信" src="./images/donate-wechat.jpg"> | <img width="180" alt="QQ" src="./images/donate-qq.jpg"> | <img width="180" alt="支付宝" src="./images/donate-alipay.jpg"> |

* 作者主要使用的 Coding Plan 是 [OpenCode Go](https://opencode.ai/go?ref=8CYK5082AG)，基于开源的 [opencode.ai](https://opencode.ai/go?ref=8CYK5082AG) 提供云端订阅（OpenCode Go）。通过作者的邀请链接 [订阅 OpenCode Go](https://opencode.ai/go?ref=8CYK5082AG)，**您和作者各可得 $5 订阅额度**——欢迎通过此链接支持作者，感谢！

OpenCode Go 包含以下使用额度限制，使用便宜点的模型几乎不会有 Token 焦虑：

- 5 小时限制 — 12 美元使用额度
- 每周限制 — 30 美元使用额度
- 每月限制 — 60 美元使用额度

## 作者项目推荐

* 欢迎您使用作者的 DSH 项目 [DSH 桌面客户端（bga-dsh-client）](https://github.com/bingoogolapple/bga-dsh-client)：一个基于 Tauri 2 的 DeepSeek Harness 桌面客户端，提供小白用户一键安装、dsh 服务管理、局域网代理服务管理等功能
* 欢迎您使用作者的 DeepSeek Harness 插件 [DSH 工作台插件（bga-dsh-workbench）](https://github.com/bingoogolapple/bga-dsh-workbench)：在 hero 空态页展示个性化横幅与头像、完成回合时撒彩带庆祝，并内置一个可驱动 agent 会话执行、支持 5 段 cron 定时调度的任务看板