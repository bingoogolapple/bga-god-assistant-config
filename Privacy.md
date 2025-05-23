# 软件隐私声明（Software Privacy Statement）

- 上帝小助手是无服务器的，因此不会收集任何用户信息
- 上帝小助手自身的页面和配置信息也是托管在当前 git 仓库的，欢迎用户检查
- 为了让用户在搭建自动化页面时能使用各种权限，就在清单文件 manifest.json 里把各种权限都加上了，方便用户在低码页面中搭建各种自定义功能时使用

## 权限申请理由

- favicon 权限申请理由: 用于获取新标签页中常用链接的图标来展示在新标签页中
- notifications 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中发送和处理系统通知的能力
- tabs 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中管理 tabs 的能力
- idle 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中监控空闲状态的能力
- contextMenus 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中创建菜单的能力
- clipboardRead 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中粘贴别人分享的区块的 schema 的能力
- clipboardWrite 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中复制区块的 schema 来分享区块的能力
- tts 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中将指定文本转换为语音播放的能力
- cookies 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中创建 cookie 管理卡片功能的能力，在开发项目时有时需要将测试环境的 cookie 同步到 localhost 来测试，手动拷贝比较麻烦，所以通过低码页面搭建一个卡片来一键同步
- management 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中创建插件管理卡片功能的能力，例如一键隐藏所有插件，后续再一键恢复
- sidePanel 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中搭建侧边栏管理的的能力，根据不同场景展示不同的侧边栏内容
- alarms 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中搭建定时提醒卡片的能力，例如上班打卡提醒，代办提醒
- scripting 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中搭建添加脚本的能力
- offscreen 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中搭建离屏页面的能力
- downloads 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中搭建下载管理卡片的能力
- storage 权限申请理由: 用于为用户提供存储低代码搭建的页面的 schema 信息和用户的自定义用户脚本信息
- activeTab 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中搭建处理当前激活页面数据的能力
- unlimitedStorage 权限申请理由: 当前插件无服务器，用户自建的低码页面的 schema 页面都是存储在本地的，申请该权限是用于扩大本地存储空间，防止低码页面 schema 存储失败
- userScripts 权限申请理由: 用于为用户提供注入自定义用户脚本 userScripts 和样式的能力，以便支持用户可以执行自定义的自动化任务
- host_permissions 权限申请理由: 用于为用户提供在当前扩展程序的低码页面中搭建用户想要获取其他网站数据的能力，以便在低码页面中展示和分析数据；其次是配合自定义用户脚本 userScripts 和样式一起使用，避免用户想要添加的用户脚本不生效
- declarativeNetRequest 权限申请理由：用于修改 headers 以便处理插件发起网络请求后出现 403 错误；用于为用户提供在当前扩展程序的低码页面中搭建拦截请求的能力
