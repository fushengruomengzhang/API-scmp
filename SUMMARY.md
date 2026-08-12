# 项目概要

本仓库（API-scmp / NBA-API）是浏览器端团队 API 平台：测接口、写文档、定时调度、群聊与 AI，支持内网私有化与本地化部署。

主要能力：

- **API 管理**：HTTP / SSE / WebSocket、RESTful、JSON5、脚本预处理、执行 N 次、顺序/并行执行、版本快照、分享；Fetch 导入与 Java（Swagger 注解）转字段文档
- **远程 / 本地双库**：远程 API 团队共享；本地 API（橘黄）仅本机；PluginReq 可从远程页面测本机 localhost（HTTP）
- **组合文档**：多 API 业务流程说明、协同编辑、分享 / 下载
- **定时任务**：CRON / RRULE / 时间戳，直接关联 API 巡检
- **群聊与 AI**：在线群聊；群内 `@本地AI`、本机会话、发送到群；密钥仅存本机。群聊无离线消息补传（错过即丢）
- **配置**：用户名与角色、全局 Header、远程/本地域名、自动保存、PluginReq

适合中小团队联调、文档沉淀与轻量在线协作。详细说明见 [README.md](README.md) 与 [使用手册 USER_GUIDE.md](USER_GUIDE.md)。
