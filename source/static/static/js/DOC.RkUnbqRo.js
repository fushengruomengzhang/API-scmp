import{_ as S,s as p,a as I}from"./index.B0VOvdBr.js";import{o as h,k as u,a as s,w as d,r as P}from"./vendor.D17dXXot.js";import"./async.component.20260812.js";import"../../public.scmp.config.js";const i=`<div class='title'>NBA-API 使用手册（完整版）</div>

> 浏览器端团队 API 平台：**测接口、写文档、定时调度、AI 辅助**一体。

---

# 产品概览

**NBA-API** 面向开发、测试、产品团队，在浏览器内完成接口调试、文档协作与定时巡检，支持内网私有化部署以及本地化部署。

## 核心能力

| 模块         | 要点                                                                                     |
|------------|----------------------------------------------------------------------------------------|
| **API 管理** | HTTP / SSE(POST/GET) / WebSocket、RESTFUL、Fetch 导入、JSON5语法、脚本、并发 N 次、并发执行、顺序执行、版本快照 、分享 |
| **组合文档**   | 多接口业务流程说明、协同编辑、分享 / 下载                                                                 |
| **定时任务**   | CRON / RRULE / 时间戳，直接关联 API                                                            |
| **配置**     | 全局 Header、远程/本地域名、PluginReq                                                            |
| **AI 助手**  | DeepSeek / 千问 / 本地 AI，支持双 AI 评审                                                        |

## 产品亮点

1. **PluginReq — 远程页面直连本机服务**
   > 工具部署在内网/远程服务器，
   > 目标 API 在开发者本机 \`localhost\` / \`127.0.0.1\` 时，安装篡改猴插件并开启 PluginReq，请求由浏览器插件从本机发出，
   > 无需 Postman 客户端或额外代理。
   > 适合「工具服务器与 API 不在同一网段、但 PC 能访问目标服务」的联调场景（仅 HTTP，WebSocket 浏览器直连）。

2. **全协议接口测试 — HTTP(S) / SSE / WS(S) 一站覆盖**
   > 支持 GET / POST / PUT / DELETE 及 RESTFUL 路径参数（如 \`/user/{id}\`）；
   > SSE 流式（POST / GET）实时查看 ResponseData；
   > WebSocket 连接、子协议、Query 鉴权、Message 多格式收发（json / text / xml）。
   > Body 支持 JSON5 注释语法、multipart 文件上传、表单等多种 Content-Type；文件下载类接口可直接「点我保存」。

3. **测 · 写 · 跑 · AI — 同页闭环**
   > **测**：目录树管理、多标签并行工作、域名 Context-Path / Prefix / Path 分段拼接。
   > **写**：单接口预览文档、多 API 组合业务流程文档（可纯文档、可协同编辑、可分享/下载）。
   > **跑**：定时任务支持 CRON / RRULE / 时间戳，直接关联 API 做巡检。
   > **AI**：DeepSeek / 千问 / 千帆 / 本地模型，支持双 AI 评审，AI密钥仅存本机，绝对安全。

4. **分享零安装 + 多端实时协同**
   > 单个 API、批量已选 API、已打开标签页均可生成分享链接，接收方浏览器打开即测。
   > 远程 API 多人编辑时，保存方更新后其他端标签旁出现同步图标，一键拉取最新。
   > 组合文档支持多人协同编辑（配置用户名后展示协作者）。

5. **远程 + 本地双库，协作与隐私兼顾**
   > **远程 API** 存服务器，团队共享、可分享、可选入组合文档、可多端同步。
   > **本地 API**（橘黄色标识）存储于本地，不上云，适合敏感或临时接口。
   > **远程域名** 团队共享
   > **本地域名** 仅本机，
   > **全局请求头**（本机缓存、同名优先于局部 Header）。

6. **批量压测与流程编排**
   > 单接口「执行 N 次」并发压测，响应区切换「结果 1…N」逐条查看；
   > 多标签 **顺序执行**（按打开顺序依次跑）或 **并行执行**（同时发起，自动跳过 WS / SSE）。
   > RequestTime 折线图展示真实耗时；
   > 响应头可右键一键回填到当前 API Header 或全局 Header。

7. **Java(<=8) Code 直转文档**
   > 浏览器 **Copy as fetch** → **FetchCode To API** 一键导入 method / URL / Header / Body。
   > 上传 **Java 源文件**（支持 Swagger 注解、继承/关联类解析）生成请求/响应字段文档，**To Body Param** 反向生成 JSON 示例。
   > 请求/响应字段描述与测试配置同屏维护，预览 API 可输出概要文档。

8. **脚本预处理 + 版本快照**
   > 请求前 **buildParam** 脚本动态改写 Query / Body 参数（签名、时间戳等）；
   > WebSocket **buildMessage** 预处理待发消息。
   > 执行下拉 **记录版本**，每个 API 最多保留 30 条配置快照，可 **Use This Version** 回滚。
   > 开启 **自动保存** 后，请求成功即更新有编辑的API。

9. **开箱即用的团队配置**
   > 全局执行次数、全局 Header、远程/本地域名、PluginReq、自动保存等集中在齿轮菜单；
   > API 树支持拖拽调整层级、搜索名称/路径、目录继承 Context-Path 与 Prefix。
   > 无需 Collection Runner 或额外脚本即可完成日常联调、文档与巡检。

## 与主流工具对比

> 对比 **Postman · Apifox · Insomnia · Swagger/Knife4j · YApi**　｜　✅ 较好　⚠️ 部分　❌ 不支持

| 能力                     |   NBA-API   | 主流工具常见情况                |
|------------------------|:-----------:|-------------------------|
| HTTP / SSE / WebSocket |  ✅ / ✅ / ✅  | HTTP 普遍支持；SSE/WS 因工具而异  |
| 浏览器在线 + 私有化部署          |      ✅      | Postman/Apifox 私有化多为企业版 |
| 组合文档 + 协同编辑            |      ✅      | Swagger/YApi 偏只读或弱协同    |
| 定时调度 API               |      ✅      | 多数需 Monitor 付费或另写脚本     |
| 远程页面测本机 localhost      | ✅ PluginReq | 通常需本地客户端或代理             |
| 本地私密 API（不上云）          |      ✅      | 较少支持                    |
| Fetch 一键导入             |      ✅      | 多数不支持                   |
| Mock / CI 集成           |      ❌      | Postman / Apifox 更强     |

---

# 一、API 管理

## 1.1 界面说明

\`\`\`
左侧 API 树 ──▶ 右侧工作区
                  ├─ 标签页（已打开的 API）
                  ├─ URL 栏（方法 / 域名 / 路径 / 执行）
                  ├─ 配置区（Detail / Header / Query / Body / Message / Script / Version）
                  └─ 响应区（ResponseData / Header / RequestTime / 结果N）
\`\`\`

| 视觉标记          | 含义                          |
|---------------|-----------------------------|
| **橘黄色**文件夹/图钉 | **本地 API**（仅本机，不可分享、不可批量选择） |
| 标签前 \`*\`       | 有未保存修改                      |
| 红色同步图标        | 他人已更新，点击拉取最新                |

## 1.2 推荐目录结构

\`\`\`
项目
 └── 模块
      └── Controller（目录）
           └── 具体 API（叶子节点）
\`\`\`

## 1.3 远程 API 与本地 API

| 对比项         | 远程 API     | 本地 API（橘黄色）  |
|-------------|------------|--------------|
| 存储位置        | 服务器，团队共享   | 浏览器本地，仅自己可见  |
| 分享          | ✅          | ❌            |
| 批量选择 / 组合文档 | ✅          | ❌            |
| 多端同步        | ✅          | ❌            |
| 适用场景        | 团队协作、正式接口库 | 临时调试、敏感/私密接口 |

## 1.4 新建 API 或目录

**入口：** 左侧 **⋯** → **Create New**，或在目录上 **右键**。

| 字段          | 说明                                 |
|-------------|------------------------------------|
| 类型          | 目录 / API                           |
| 存储          | **远程**（团队共享）/ **本地**（橘黄，仅本机）       |
| 父级          | 挂载位置                               |
| 名称          | 目录或 API 名称                         |
| ContextPath | 如 \`/api\`；新建子级会继承                   |
| Prefix      | Controller 统一前缀；新建子级会继承            |
| Method      | GET / POST / PUT / DELETE / **WS** |
| Path        | 如 \`/list\` 或 \`/user/{id}\`           |
| SSEReq      | SSE 流式（HTTP 方法 POST GET）           |
| PluginReq   | 插件代发（仅 HTTP，见第十二节）                 |

> 修改父级 ContextPath / Prefix **不会**自动更新已有子级。

## 1.5 树操作与 ⋯ 菜单

| 操作       | 方式                                   |
|----------|--------------------------------------|
| 打开 API   | 单击叶子节点                               |
| 调整结构     | 拖拽节点                                 |
| 搜索       | 顶部「搜索(名称或者路径)」                       |
| 定位       | 瞄准图标                                 |
| Fetch 导入 | ⋯ → **FetchCode To API**（覆盖当前选中 API） |
| 批量分享/组文档 | ⋯ → **选择 API** → 勾选 → 对应菜单           |

**右键菜单：** 刷新目录、编辑、删除（有子节点不可删）、新建子目录、新建子 API。

**执行按钮下拉：** 执行 N 次、保存/更新 API、预览 API、分享 API、复制路径、记录版本。

## 1.6 多标签页与批量执行

- 可同时打开多个 API，标签可拖拽排序；关闭时有未保存修改会提示
- **标签右键：** 关闭文档 / 顺序执行 / 并行执行（**自动跳过 WS、SSE**）

## 1.7 请求地址

\`\`\`
完整 URL = 域名 + ContextPath + Prefix + Path
\`\`\`

域名从 **远程/本地域名配置** 下拉选择，须以 \`http(s)://\` 或 \`ws(s)://\` 开头。

---

# 二、HTTP / SSE 接口测试

## 2.1 执行请求

| 操作     | 方式                                  |
|--------|-------------------------------------|
| 执行一次   | 点 **执行**，或 \`Ctrl+Enter\` / \`⌘+Enter\` |
| 执行 N 次 | 执行按钮下拉 → **执行 N 次**（N 在齿轮里配置）       |
| 保存/更新  | \`Ctrl+S\` / \`⌘+S\`，或下拉 → **更新 API**   |
| 取消     | 执行中再点 **取消**                        |

## 2.2 RESTFUL

Path 为 \`/user/{id}\` 时，在 **Query** 标签配置参数 \`id\` 及值。

## 2.3 SSE

在 **Api Detail** 打开 **SSEReq**，执行后 ResponseData 流式更新。

---

# 三、Header（请求头）

适用于 **HTTP / SSE** 及 **WebSocket 连接**（WS 有特殊规则，见第四节）。

## 3.1 两种来源

| 来源            | 配置位置            | 范围     |
|---------------|-----------------|--------|
| **全局请求头**     | 齿轮 ⚙ → 全局请求头配置  | 所有 API |
| **局部 Header** | API → Header 标签 | 当前 API |

## 3.2 优先级（重要）

**同名参数名时，全局请求头优先，局部 Header 不能覆盖全局。**

建议：团队 Token 放全局；接口特有 Header 放局部，且避免与全局同名。

## 3.3 Header 表格

| 列   | 说明                     |
|-----|------------------------|
| 参数名 | 如 Authorization、Accept |
| 参数值 | 实际值                    |
| 描述  | 备注                     |
| 勾选  | 未勾选则不参与                |

HTTP 响应区右键 **ToThisHeader** / **ToGlobalHeader** 可快速回填。

---

# 四、WebSocket 测试

## 4.1 能做什么

- 浏览器直连 \`ws://\` / \`wss://\`
- 握手时配置子协议（通过 Header 表）
- URL 携带 Query 参数
- 连接后多次发送消息
- Script 动态修改消息

## 4.2 与 HTTP 的区别

| 项目             | HTTP         | WebSocket (WS)    |
|----------------|--------------|-------------------|
| 域名             | \`http(s)://\` | **\`ws(s)://\`**    |
| 执行按钮           | 执行 / 取消      | **连接 / 关闭**       |
| Body 标签        | 有            | **无**（改为 Message） |
| 服务器代理          | 可以           | **始终浏览器直连**       |
| PluginReq      | 可用           | **不适用**           |
| 执行 N 次         | 可用           | **不可用**           |
| 批量顺序/并行        | 可用           | **自动跳过**          |
| ResponseHeader | 可读           | **浏览器无法读取**       |

## 4.3 使用流程

\`\`\`
① Method 选 WS
② 域名填 ws:// 或 wss://
③ 配置 ContextPath / Prefix / Path
④ Header：配置子协议（见 4.4）
⑤ Query：需要时配置 URL 参数（见 4.5）
⑥ 点「连接」
⑦ Message 标签编辑消息 →「发送」
⑧ ResponseData 查看 open / 消息 / error / closed
⑨ 点「关闭」断开
\`\`\`

## 4.4 Header — 子协议映射

浏览器 WebSocket **不能**像 HTTP 那样设置任意请求头。  
本工具将 **Header 表中勾选的行** 映射为握手时的 **子协议（Sec-WebSocket-Protocol）**：

\`\`\`
Header 每一行（已勾选、值非空、且参数名 ≠ Content-Type）
        │
        └──▶ 取「参数值」作为子协议名
                │
                └──▶ 连接时使用 [子协议1, 子协议2, ...]
\`\`\`

| 规则         | 说明                            |
|------------|-------------------------------|
| 使用 **参数值** | 参数名不参与子协议（Content-Type 行会被忽略） |
| 全局 + 局部合并  | 与 HTTP 相同：全局优先，局部仅补全局没有的 key  |
| 多行 = 多个子协议 | 每行一个子协议值                      |

**子协议 \`chat\` 示例：**

| 参数名      | 参数值  | 勾选 |
|----------|------|----|
| protocol | chat | ✅  |

**多子协议示例：**

| 参数名 | 参数值      | 勾选 |
|-----|----------|----|
| p1  | v1.stomp | ✅  |
| p2  | chat     | ✅  |

### Token 鉴权

Header 中的 \`Authorization\` **不会**作为 HTTP 头发送给 WS 握手。

| 方式            | 做法                                                |
|---------------|---------------------------------------------------|
| **Query（推荐）** | Query 加 \`token=xxx\` → \`wss://host/path?token=xxx\` |
| **Path**      | 写在路径中                                             |
| **首条消息**      | Message 发送登录/鉴权 JSON                              |

### 常见误区

| 误区                          | 正确理解                                   |
|-----------------------------|----------------------------------------|
| Header 写 Authorization 即可鉴权 | WS 握手不传 HTTP Authorization，用 Query 或首包 |
| 参数名会传给服务端                   | 实际传的是 **参数值**（子协议名）                    |
| ResponseHeader 可读           | WS 响应头在浏览器中不可读                         |
| PluginReq 可连 localhost WS   | PluginReq 仅 HTTP；WS 本就浏览器直连            |

## 4.5 Query 参数

勾选参数会拼到连接 URL，例如：\`wss://api.example.com/ws/chat?roomId=1001&userId=42\`

## 4.6 Message 标签

| 控件     | 说明                             |
|--------|--------------------------------|
| 语言     | json / text / xml / javascript |
| 编辑区    | 待发内容                           |
| **发送** | 仅连接 **open** 时可点               |

选 **json** 时，发送前会尝试 JSON5 解析。

## 4.7 Script — buildMessage

在 **Script** 标签编写 \`buildMessage\` 函数，每次点 **发送** 前执行，用于添加时间戳、签名等。Script 页 ▶ 可试跑。

## 4.8 响应解读

| 内容       | 含义    |
|----------|-------|
| \`open\`   | 连接成功  |
| 文本/数据    | 服务端消息 |
| \`error\`  | 错误    |
| \`closed\` | 已关闭   |

## 4.9 完整示例（STOMP）

1. Method = **WS**，域名 = \`wss://mq.example.com\`，Path = \`/ws\`
2. Header：参数值 \`v12.stomp\`，勾选
3. Query：\`token=your-jwt\`，勾选
4. **连接** → Message 发 STOMP 帧 → 查看 ResponseData

---

# 五、API 配置详解

## 5.1 Api Detail

SSEReq、PluginReq、存储、名称、**备注**、只读 URL 预览。

## 5.2 Query

参数名 / 类型 / 值 / 描述 / 勾选；列首可拖拽排序。

## 5.3 Body（非 WS）

| 类型                                | 用途         |
|-----------------------------------|------------|
| application/json                  | JSON5，支持注释 |
| application/xml                   | XML        |
| multipart/form-data               | 表单 + 文件上传  |
| application/x-www-form-urlencoded | 普通表单       |

**请求字段描述：** 可上传 Java（Swagger 注解）生成说明；**To Body Param** 转为 JSON 示例。

## 5.4 Version

执行下拉 → **记录版本**（最多 30 条）→ Version 标签 → **Use This Version** / **Clear All Version**。

## 5.5 响应区

| 标签             | 内容               |
|----------------|------------------|
| ResponseData   | 响应体；文件接口显示「点我保存」 |
| ResponseHeader | HTTP 响应头（WS 无效）  |
| RequestTime    | 耗时折线图            |
| 结果 N           | 执行 N 次时各次结果      |

**响应字段描述：** 可为返回 JSON 字段添加文档说明。

---

# 六、FetchCode To API

1. F12 → Network → 右键请求 → **Copy as fetch**
2. ⋯ → **FetchCode To API** → 粘贴 → **ToApi**
3. 确认后覆盖当前 API 的 method、URL、Header、Body 等，微调后执行

---

# 七、配置管理（齿轮 ⚙）

| 项         | 说明                                    |
|-----------|---------------------------------------|
| 用户名称      | 协同文档显示名，首次协作前建议设置                     |
| 全局请求头     | 本机缓存，**优先级最高**                        |
| 全局执行次数    | 「执行 N 次」的 N                           |
| 远程域名      | 团队共享                                  |
| 本地域名      | 仅本机（≠ 本地接口测试）                         |
| 自动保存      | 请求成功后自动更新 API                         |
| PluginReq | localhost/127.0.0.1 的 **HTTP** 走篡改猴插件 |

---

# 八、API 组合文档

- **入口：** 左侧 **文档** 图标
- **创建：**
    - API 管理 → ⋯ → **选择 API** → 勾选 → **编辑 API 组合文档**
    - 或文档树 **新建子文档**（可关联 API，也可纯文档）
- **一组 API 只对应一份文档**；再次编辑会回显已有文档
- **能力：** 多人协同编辑、分享文档、初始化文档、下载文档
- 文档内可打开关联 API 做测试

---

# 九、定时任务调度中心

- **入口：** 左侧 **时钟** 图标
- **表达式：** CRON / RRULE / **时间戳**
- **新建必填：** 描述、开始时间、调度 API（可多选）
- **可选：** 结束时间、提前/延迟、调度过期策略（不执行 / 补一次）、结束策略
- **管理：** 调度器总开关、启动/暂停、查看日志、按描述/类型筛选

---

# 十、AI 助手

- 侧栏 **机器人** → 抽屉
- **钥匙** 配置 DeepSeek / 千问 / 千帆 / 本地 AI（**仅存本机，不上传服务器**）
- **单 AI** 或 **双 AI 评审**（AI1 执行、AI2 评审，可设「通过即停」或手动喊停）
- 分享页仅解答与评审，**不保存修改**

---

# 十一、分享

| 类型         | 方式                      |
|------------|-------------------------|
| 单 API      | 执行下拉 → 分享 API           |
| 多 API（已打开） | ⋯ → 分享已打开的 API          |
| 多 API（已选择） | ⋯ → 选择 API → 分享已选择的 API |
| 组合文档       | 编辑器下拉 → 分享文档            |

本地 API 不可分享。分享页不能保存/更新 API。多人编辑远程 API 时，保存方更新后其他端标签旁出现**同步图标**，点击拉取最新。

---

# 十二、PluginReq（HTTP 本地测试）

**适用场景：** 工具部署在远程服务器，目标 API 在 **localhost** / **127.0.0.1**，服务器访问不到，但你的电脑能访问。

**配置步骤：**

1. 安装 [篡改猴](https://www.tampermonkey.net/) ≥ 5.3.3
2. 开启「允许运行用户脚本」
3. 添加跨域脚本（\`@match\` 改为你的工具访问路径）：

\`\`\`js
// ==UserScript==
// @name         CORS Script
// @match        你的工具访问路径/*
// @grant        unsafeWindow
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function () {
  unsafeWindow._GM_xmlHttpRequest = GM?.xmlHttpRequest || GM_xmlhttpRequest;
})();
\`\`\`

4. 齿轮开启 **PluginReq**，或单 API 的 Api Detail 开启 **PluginReq**

**不适用于 WebSocket**（WS 始终由浏览器直连）。

---

# 十三、快捷键

| 操作       | Windows    | Mac            |
|----------|------------|----------------|
| 执行 / 连接  | Ctrl+Enter | ⌘+Enter        |
| 保存 / 更新  | Ctrl+S     | ⌘+S            |
| JSON 格式化 | —          | Option+Shift+F |

---

# 十四、典型使用场景

| 场景             | 步骤摘要                                               |
|----------------|----------------------------------------------------|
| 新建并测试 POST     | Create New → Method/Path → Body → 执行 → 更新 API      |
| 新成员加入          | 配置用户名、远程域名、全局 Token → 打开 API 执行                    |
| 抓包导入           | Copy as fetch → FetchCode To API → ToApi → 微调 → 执行 |
| 压测 10 次        | 齿轮设执行次数 10 → 下拉执行 10 次 → 看结果 1…10                  |
| 跑一组流程          | 多标签打开 → 右键顺序/并行执行                                  |
| 写接口说明          | 选择 API → 编辑组合文档 → 分享                               |
| 本地 Spring Boot | 篡改猴 + PluginReq → 域名 localhost:8080 → 执行           |
| SSE 流式         | Api Detail 开 SSEReq → 执行 → 看 ResponseData          |
| WebSocket      | WS + 子协议 Header + Query token → 连接 → Message 发送    |
| 定时巡检           | 新建任务 → CRON + 调度 API → 启动 → 查看日志                   |

---

# 十五、常见问题（FAQ）

**Q：为什么 Header 没生效？**  
A：全局请求头同名时优先；WebSocket 下 Header 映射为子协议，不是 HTTP 头。

**Q：本地 API 为什么不能分享？**  
A：存在浏览器本地，无法生成服务端分享链接，需改为远程存储。

**Q：PluginReq 开启后仍失败？**  
A：确认篡改猴已安装、脚本 \`@match\` 匹配当前地址、扩展允许用户脚本。

**Q：修改 API 后别人看不到？**  
A：需「更新 API」保存；对方点标签旁同步图标。

**Q：Body JSON 报错？**  
A：支持 JSON5 注释；Mac 可用 Option+Shift+F 格式化。

**Q：RESTful 路径参数？**  
A：Path 写 \`{id}\`，Query 配 \`id\` 及值。

**Q：WebSocket 用 Authorization 鉴权？**  
A：不能作为 HTTP 头发送；用 Query 或首条消息。

---

# 十六、推广参考

**一句话：** NBA-API 是团队在线 API 测试与文档平台——测接口、写文档、定时调度、AI 辅助，一个工具搞定。

**三点亮点：**

1. **测得全** — HTTP / SSE / WebSocket，RESTful、JSON5、文件上传、并发 N 次
2. **文档跟测走** — 预览、组合文档、分享链接、协同编辑
3. **环境不卡脖子** — PluginReq 让远程工具也能测本机 localhost

**适合：** 后端维护接口库、前端按文档联调、测试巡检与批量执行、负责人统一域名与全局 Header。
`,T={},m={urlMapping:T,_is_md:!0,toJSON:()=>i,toString:()=>i,valueOf:()=>i},R={name:"NBA-API-DOC",components:{},setup(){return{}},emits:[],props:{},data(){return{folders:[]}},computed:{el(){return this.$refs.docWrapper.$el},content(){return[m]}},watch:{},created(){},mounted(){},methods:{handleNodeClick(o){const n=this.el.querySelector(`[data-tree-id='${o.uniFlag}']`);n&&n.scrollIntoView({behavior:"smooth"})},onDocChange(){let o=[],n=[],l=0;Array.from(this.el.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((a,A)=>{const e=parseInt(a.tagName.slice(1),10),r=p("dti_");a.setAttribute("data-tree-id",r);const t={id:++l,pid:0,label:a.textContent.trim(),uniFlag:r};for(;n.length&&n[n.length-1].level>=e;)n.pop();n.length>0&&(t.pid=n[n.length-1].id),n.push({...t,level:e}),o.push(t)}),this.folders=I(o,"id","pid")}}},H={class:"nba-api-doc"};function g(o,n,l,a,A,e){const r=P("el-tree"),t=P("s3-scroll"),c=P("s3-doc");return h(),u("div",H,[s(t,{class:"folder"},{default:d(()=>[s(r,{data:A.folders,onNodeClick:e.handleNodeClick},null,8,["data","onNodeClick"])]),_:1}),s(t,null,{default:d(()=>[s(c,{ref:"docWrapper",class:"wrapper_detail",content:e.content,onChange:e.onDocChange},null,8,["content","onChange"])]),_:1})])}const x=S(R,[["render",g],["__scopeId","data-v-226796b6"]]);export{x as default};
