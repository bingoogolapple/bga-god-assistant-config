# 软件隐私声明（Software Privacy Statement）

## 应用商店和高级版本通用隐私声明

- 上帝小助手是无服务器的，因此不会收集任何用户信息
- 上帝小助手自身的页面和配置信息也是托管在当前 git 仓库的，欢迎用户检查

## 初级版本隐私声明，即发布到应用商店中的版本

- 上帝小助手自身只用到了 storage、userScripts 权限，清单文件 manifest.json 里也只申请了这两个权限
- storage 权限申请理由: 用于为用户提供存储低代码搭建的页面的 schema 信息和用户的自定义用户脚本信息
- userScripts 权限申请理由: 用于为用户提供注入自定义用户脚本 userScripts 和样式的能力，以便支持用户可以执行自定义的自动化任务

## 高级版本隐私声明，即当前仓库中的 [god-assistant-0.1.6.zip](https://raw.githubusercontent.com/bingoogolapple/bga-god-assistant-config/main/god-assistant-0.1.6.zip) 文件

- 为了让用户在搭建自动化页面时能使用各种权限，就在高级版本的清单文件 manifest.json 里把各种权限都加上了，方便用户使用

## 高级版本和初级版本的区别

- 高级版本和初级版本的唯一区别就是清单文件 manifest.json 里的权限声明不同，其余逻辑全是一样的
