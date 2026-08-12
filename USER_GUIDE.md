<div class='title'>NBA-API 使用手册（完整版）</div>

> 浏览器端团队 API 平台：**测接口、写文档、定时调度、群聊与 AI** 一体。  
> 左侧帮助目录与侧栏模块同序：API → 组合文档 → 定时 → 群聊与 AI → 配置。

---

# 产品概览

**NBA-API** 面向开发、测试、产品团队，在浏览器内完成接口调试、文档协作、定时巡检与轻量群聊协作，支持内网私有化部署以及本地化部署。

## 核心能力

| 模块 | 要点 |
|------|------|
| **API 管理** | HTTP / SSE(POST/GET) / WebSocket、RESTFUL、Fetch 导入、JSON5、脚本、并发 N 次、顺序/并行执行、版本快照、分享 |
| **组合文档** | 多接口业务流程说明、协同编辑、分享 / 下载 |
| **定时任务** | CRON / RRULE / 时间戳，直接关联 API |
| **群聊与 AI** | 实时群聊；群内 `@本地AI`、本机会话、发送到群；DeepSeek / 千问 / 千帆 / 本地模型，密钥仅存本机 |
| **配置** | 用户名与角色、全局 Header、远程/本地域名、PluginReq、自动保存 |

## 产品亮点

1. **PluginReq — 远程页面直连本机服务**
   > 工具部署在内网/远程服务器，目标 API 在开发者本机 `localhost` / `127.0.0.1` 时，安装篡改猴插件并开启 PluginReq，请求由浏览器插件从本机发出，无需 Postman 客户端或额外代理。适合「工具服务器与 API 不在同一网段、但 PC 能访问目标服务」的联调场景（仅 HTTP，WebSocket 浏览器直连）。

2. **全协议接口测试 — HTTP(S) / SSE / WS(S) 一站覆盖**
   > 支持 GET / POST / PUT / DELETE 及 RESTFUL 路径参数（如 `/user/{id}`）；SSE 流式实时查看 ResponseData；WebSocket 连接、子协议、Query 鉴权、Message 多格式收发。Body 支持 JSON5、multipart、表单；文件下载可「点我保存」。

3. **测 · 写 · 跑 · 群聊 AI — 侧栏闭环**
   > **测**：目录树、多标签、域名 Context-Path / Prefix / Path 拼接。  
   > **写**：单接口预览、多 API 组合文档（协同 / 分享 / 下载）。  
   > **跑**：定时任务 CRON / RRULE / 时间戳关联 API 巡检。  
   > **群聊 AI**：侧栏进入群聊；`@本地AI` 本机多轮，需要时「发送到群」；密钥仅存本机。

4. **分享零安装 + 多端实时协同**
   > 单个 / 批量 / 已打开标签均可生成分享链接，接收方浏览器打开即测。远程 API 多人编辑时，保存方更新后其他端标签旁出现同步图标。组合文档支持多人协同（先配置用户名）。

5. **远程 + 本地双库，协作与隐私兼顾**
   > **远程 API** 存服务器，团队共享。**本地 API**（橘黄色）仅本机。**远程域名** 团队共享；**本地域名** 仅本机；**全局请求头** 本机缓存、同名优先于局部 Header。

6. **批量压测与流程编排**
   > 单接口「执行 N 次」；多标签顺序执行或并行执行（自动跳过 WS / SSE）。RequestTime 折线图；响应头可右键回填 Header。

7. **Java(<=8) Code 直转文档**
   > Copy as fetch → FetchCode To API。上传 Java（Swagger 注解）生成字段文档，**To Body Param** 生成 JSON 示例。

8. **脚本预处理 + 版本快照**
   > `buildParam` / `buildMessage` 动态改写参数或消息；版本快照最多 30 条可回滚；自动保存开启后请求成功即更新有编辑的 API。

9. **开箱即用的团队配置**
   > 用户名与角色、全局执行次数、全局 Header、远程/本地域名、PluginReq、自动保存集中在齿轮；API 树拖拽、搜索、目录继承 Context-Path 与 Prefix。

## 与主流工具对比

> 对比 **Postman · Apifox · Insomnia · Swagger/Knife4j · YApi**　｜　✅ 较好　⚠️ 部分　❌ 不支持

| 能力 | NBA-API | 主流工具常见情况 |
|------|:-------:|------------------|
| HTTP / SSE / WebSocket | ✅ / ✅ / ✅ | HTTP 普遍；SSE/WS 因工具而异 |
| 浏览器在线 + 私有化部署 | ✅ | Postman/Apifox 私有化多为企业版 |
| 组合文档 + 协同编辑 | ✅ | Swagger/YApi 偏只读或弱协同 |
| 定时调度 API | ✅ | 多数需 Monitor 付费或另写脚本 |
| 远程页面测本机 localhost | ✅ PluginReq | 通常需本地客户端或代理 |
| 本地私密 API（不上云） | ✅ | 较少支持 |
| 群聊 + 本机 AI 协作 | ✅ | 多数不内置或需另装 |
| Fetch 一键导入 | ✅ | 多数不支持 |
| Mock / CI 集成 | ❌ | Postman / Apifox 更强 |

---

# 一、API 管理

## 1.1 界面说明

```
左侧 API 树 ──▶ 右侧工作区
                  ├─ 标签页（已打开的 API）
                  ├─ URL 栏（方法 / 域名 / 路径 / 执行）
                  ├─ 配置区（Detail / Header / Query / Body / Message / Script / Version）
                  └─ 响应区（ResponseData / Header / RequestTime / 结果N）
```

| 视觉标记 | 含义 |
|----------|------|
| **橘黄色**文件夹/图钉 | **本地 API**（仅本机，不可分享、不可批量选择） |
| 标签前 `*` | 有未保存修改 |
| 红色同步图标 | 他人已更新，点击拉取最新 |

## 1.2 推荐目录结构

```
项目
 └── 模块
      └── Controller（目录）
           └── 具体 API（叶子节点）
```

## 1.3 远程 API 与本地 API

| 对比项 | 远程 API | 本地 API（橘黄色） |
|--------|----------|-------------------|
| 存储位置 | 服务器，团队共享 | 浏览器本地，仅自己可见 |
| 分享 | ✅ | ❌ |
| 批量选择 / 组合文档 | ✅ | ❌ |
| 多端同步 | ✅ | ❌ |
| 适用场景 | 团队协作、正式接口库 | 临时调试、敏感/私密接口 |

## 1.4 新建 API 或目录

**入口：** 左侧 **⋯** → **Create New**，或在目录上 **右键**。

| 字段 | 说明 |
|------|------|
| 类型 | 目录 / API |
| 存储 | **远程**（团队共享）/ **本地**（橘黄，仅本机） |
| 父级 | 挂载位置 |
| 名称 | 目录或 API 名称 |
| ContextPath | 如 `/api`；新建子级会继承 |
| Prefix | Controller 统一前缀；新建子级会继承 |
| Method | GET / POST / PUT / DELETE / **WS** |
| Path | 如 `/list` 或 `/user/{id}` |
| SSEReq | SSE 流式（HTTP 方法 POST / GET） |
| PluginReq | 插件代发（仅 HTTP，见 1.15） |

> 修改父级 ContextPath / Prefix **不会**自动更新已有子级。

## 1.5 树操作与 ⋯ 菜单

| 操作 | 方式 |
|------|------|
| 打开 API | 单击叶子节点 |
| 调整结构 | 拖拽节点 |
| 搜索 | 顶部「搜索(名称或者路径)」 |
| 定位 | 瞄准图标 |
| Fetch 导入 | ⋯ → **FetchCode To API**（覆盖当前选中 API） |
| 批量分享/组文档 | ⋯ → **选择 API** → 勾选 → 对应菜单 |

**右键菜单：** 刷新目录、编辑、删除（有子节点不可删）、新建子目录、新建子 API。

**执行按钮下拉：** 执行 N 次、保存/更新 API、预览 API、分享 API、复制路径、记录版本。

## 1.6 多标签页与批量执行

- 可同时打开多个 API，标签可拖拽排序；关闭时有未保存修改会提示
- **标签右键：** 关闭文档 / 顺序执行 / 并行执行（**自动跳过 WS、SSE**）

## 1.7 请求地址

```
完整 URL = 域名 + ContextPath + Prefix + Path
```

域名从 **远程/本地域名配置** 下拉选择，须以 `http(s)://` 或 `ws(s)://` 开头。

## 1.8 HTTP / SSE 接口测试

### 执行请求

| 操作 | 方式 |
|------|------|
| 执行一次 | 点 **执行**，或 `Ctrl+Enter` / `⌘+Enter` |
| 执行 N 次 | 执行按钮下拉 → **执行 N 次**（N 在齿轮里配置） |
| 保存/更新 | `Ctrl+S` / `⌘+S`，或下拉 → **更新 API** |
| 取消 | 执行中再点 **取消** |

### RESTFUL

Path 为 `/user/{id}` 时，在 **Query** 标签配置参数 `id` 及值。

### SSE

在 **Api Detail** 打开 **SSEReq**，执行后 ResponseData 流式更新。

## 1.9 Header（请求头）

适用于 **HTTP / SSE** 及 **WebSocket 连接**（WS 有特殊规则，见 1.10）。

### 两种来源

| 来源 | 配置位置 | 范围 |
|------|----------|------|
| **全局请求头** | 齿轮 ⚙ → 全局请求头配置 | 所有 API |
| **局部 Header** | API → Header 标签 | 当前 API |

### 优先级（重要）

**同名参数名时，全局请求头优先，局部 Header 不能覆盖全局。**

建议：团队 Token 放全局；接口特有 Header 放局部，且避免与全局同名。

### Header 表格

| 列 | 说明 |
|----|------|
| 参数名 | 如 Authorization、Accept |
| 参数值 | 实际值 |
| 描述 | 备注 |
| 勾选 | 未勾选则不参与 |

HTTP 响应区右键 **ToThisHeader** / **ToGlobalHeader** 可快速回填。

## 1.10 WebSocket 测试

### 能做什么

- 浏览器直连 `ws://` / `wss://`
- 握手时配置子协议（通过 Header 表）
- URL 携带 Query 参数
- 连接后多次发送消息
- Script 动态修改消息

### 与 HTTP 的区别

| 项目 | HTTP | WebSocket (WS) |
|------|------|----------------|
| 域名 | `http(s)://` | **`ws(s)://`** |
| 执行按钮 | 执行 / 取消 | **连接 / 关闭** |
| Body 标签 | 有 | **无**（改为 Message） |
| 服务器代理 | 可以 | **始终浏览器直连** |
| PluginReq | 可用 | **不适用** |
| 执行 N 次 | 可用 | **不可用** |
| 批量顺序/并行 | 可用 | **自动跳过** |
| ResponseHeader | 可读 | **浏览器无法读取** |

### 使用流程

```
① Method 选 WS
② 域名填 ws:// 或 wss://
③ 配置 ContextPath / Prefix / Path
④ Header：配置子协议（见下）
⑤ Query：需要时配置 URL 参数
⑥ 点「连接」
⑦ Message 标签编辑消息 →「发送」
⑧ ResponseData 查看 open / 消息 / error / closed
⑨ 点「关闭」断开
```

### Header — 子协议映射

浏览器 WebSocket **不能**像 HTTP 那样设置任意请求头。  
本工具将 **Header 表中勾选的行** 映射为握手时的 **子协议（Sec-WebSocket-Protocol）**：

```
Header 每一行（已勾选、值非空、且参数名 ≠ Content-Type）
        │
        └──▶ 取「参数值」作为子协议名
                │
                └──▶ 连接时使用 [子协议1, 子协议2, ...]
```

| 规则 | 说明 |
|------|------|
| 使用 **参数值** | 参数名不参与子协议（Content-Type 行会被忽略） |
| 全局 + 局部合并 | 与 HTTP 相同：全局优先，局部仅补全局没有的 key |
| 多行 = 多个子协议 | 每行一个子协议值 |

**子协议 `chat` 示例：**

| 参数名 | 参数值 | 勾选 |
|--------|--------|------|
| protocol | chat | ✅ |

**多子协议示例：**

| 参数名 | 参数值 | 勾选 |
|--------|--------|------|
| p1 | v1.stomp | ✅ |
| p2 | chat | ✅ |

### Token 鉴权

Header 中的 `Authorization` **不会**作为 HTTP 头发送给 WS 握手。

| 方式 | 做法 |
|------|------|
| **Query（推荐）** | Query 加 `token=xxx` → `wss://host/path?token=xxx` |
| **Path** | 写在路径中 |
| **首条消息** | Message 发送登录/鉴权 JSON |

### 常见误区

| 误区 | 正确理解 |
|------|----------|
| Header 写 Authorization 即可鉴权 | WS 握手不传 HTTP Authorization，用 Query 或首包 |
| 参数名会传给服务端 | 实际传的是 **参数值**（子协议名） |
| ResponseHeader 可读 | WS 响应头在浏览器中不可读 |
| PluginReq 可连 localhost WS | PluginReq 仅 HTTP；WS 本就浏览器直连 |

### Query / Message / 响应

勾选 Query 会拼到连接 URL。Message 支持 json / text / xml / javascript；**发送**仅连接 **open** 时可点；选 json 时发送前尝试 JSON5 解析。

| 响应内容 | 含义 |
|----------|------|
| `open` | 连接成功 |
| 文本/数据 | 服务端消息 |
| `error` | 错误 |
| `closed` | 已关闭 |

### 完整示例（STOMP）

1. Method = **WS**，域名 = `wss://mq.example.com`，Path = `/ws`
2. Header：参数值 `v12.stomp`，勾选
3. Query：`token=your-jwt`，勾选
4. **连接** → Message 发 STOMP 帧 → 查看 ResponseData

## 1.11 API 配置详解

### Api Detail

SSEReq、PluginReq、存储、名称、**备注**、只读 URL 预览。

### Query

参数名 / 类型 / 值 / 描述 / 勾选；列首可拖拽排序。

### Body（非 WS）

| 类型 | 用途 |
|------|------|
| application/json | JSON5，支持注释 |
| application/xml | XML |
| multipart/form-data | 表单 + 文件上传 |
| application/x-www-form-urlencoded | 普通表单 |

**请求字段描述：** 可上传 Java（Swagger 注解）生成说明；**To Body Param** 转为 JSON 示例（见 1.13）。

### Version

执行下拉 → **记录版本**（最多 30 条）→ Version 标签 → **Use This Version** / **Clear All Version**。

### 响应区

| 标签 | 内容 |
|------|------|
| ResponseData | 响应体；文件接口显示「点我保存」 |
| ResponseHeader | HTTP 响应头（WS 无效） |
| RequestTime | 耗时折线图 |
| 结果 N | 执行 N 次时各次结果 |

**响应字段描述：** 可为返回 JSON 字段添加文档说明。

## 1.12 Script（buildParam / buildMessage）

在 **Script** 标签编写预处理脚本；页内 **▶** 可对当前 Query / Body / Message **试跑**，结果打到虚拟控制台。

### HTTP / SSE — `buildParam`

默认模板：

```js
function buildParam(reqNum, key, value, path, desc, type, check) {
  return value;
}
```

| 参数 | 含义 |
|------|------|
| `reqNum` | 第几次请求（「执行 N 次」时从 1…N） |
| `key` / `value` | 当前字段名与值 |
| `path` | 字段路径 |
| `desc` / `type` / `check` | 描述、类型、是否勾选 |

每次发请求前，会对 Query / JSON Body / 表单字段逐项调用；返回值作为实际发送值。适合加时间戳、签名、按次数变化的测试数据。

**示例：给签名字段加时间戳**

```js
function buildParam(reqNum, key, value, path, desc, type, check) {
  if (key === 'timestamp') return Date.now();
  if (key === 'nonce') return `n-${reqNum}-${Date.now()}`;
  return value;
}
```

### WebSocket — `buildMessage`

WS 下默认模板为 `buildMessage(message)`，每次点 **发送** 前执行，返回值作为实际发送内容。

```js
function buildMessage(message) {
  // message 可能是对象（json）或字符串
  return message;
}
```

## 1.13 FetchCode To API 与 Java 转文档

### FetchCode To API

1. F12 → Network → 右键请求 → **Copy as fetch**
2. ⋯ → **FetchCode To API** → 粘贴 → **ToApi**
3. 确认后覆盖当前 API 的 method、URL、Header、Body 等，微调后执行

### Java 源码 → 字段文档

1. 在请求/响应字段描述处打开 Java 分析抽屉
2. **UploadJavaFile** 上传 `.java`（可多文件），或直接编辑标签页中的源码
3. 支持 Swagger 注解（如 `ApiModel` / `ApiModelProperty`）；泛型请改成真实类名并补上对应类代码
4. **ToDocument** 生成字段说明；需要示例 JSON 时用 **To Body Param**

## 1.14 分享与多端同步

| 类型 | 方式 |
|------|------|
| 单 API | 执行下拉 → 分享 API |
| 多 API（已打开） | ⋯ → 分享已打开的 API |
| 多 API（已选择） | ⋯ → 选择 API → 分享已选择的 API |

本地 API 不可分享。分享页不能保存/更新 API。多人编辑远程 API 时，保存方更新后其他端标签旁出现**同步图标**，点击拉取最新。

## 1.15 PluginReq（HTTP 本地测试）

**适用场景：** 工具部署在远程服务器，目标 API 在 **localhost** / **127.0.0.1**，服务器访问不到，但你的电脑能访问。

**配置步骤：**

1. 安装 [篡改猴](https://www.tampermonkey.net/) ≥ 5.3.3
2. 开启「允许运行用户脚本」
3. 添加跨域脚本（`@match` 改为你的工具访问路径）：

```js
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
```

4. 齿轮开启 **PluginReq**，或单 API 的 Api Detail 开启 **PluginReq**

**不适用于 WebSocket**（WS 始终由浏览器直连）。

## 1.16 快捷键

| 操作 | Windows | Mac |
|------|---------|-----|
| 执行 / 连接 | Ctrl+Enter | ⌘+Enter |
| 保存 / 更新 | Ctrl+S | ⌘+S |
| JSON 格式化 | — | Option+Shift+F |

---

# 二、组合文档

- **入口：** 侧栏 **文档** 图标（API 组合文档管理）
- **创建：**
  - API 管理 → ⋯ → **选择 API** → 勾选 → **编辑 API 组合文档**
  - 或文档树 **新建子文档**（可关联 API，也可纯文档）
- **一组 API 只对应一份文档**；再次编辑会回显已有文档
- **能力：** 多人协同编辑、分享文档、初始化文档、下载文档
- 文档内可打开关联 API 做测试
- **协同前提：** 齿轮中配置 **用户名称**，协作者名称才会正确展示
- **分享：** 编辑器下拉 → 分享文档（接收方打开即可阅读/按权限操作）

> 本地 API 不能选入组合文档；仅远程 API 适合团队文档沉淀。

---

# 三、定时任务

- **入口：** 侧栏 **时钟** 图标（定时任务调度中心）
- **管理：** 调度器总开关、启动/暂停、查看日志、按描述/类型筛选

## 新建 / 编辑

**必填：** 描述、开始时间、调度类型与表达式、调度 API（可多选）、调度过期策略。

**可选：** 结束时间、提前/延迟（负数提前、正数延迟）、结束策略。

### 调度类型示例

| 类型 | 含义 | 示例 |
|------|------|------|
| **时间戳** | 指定时刻执行一次 | 选某个日期时间 |
| **CRON** | 周期表达式 | `0 0/5 * * * ?`（每 5 分钟，以界面生成为准） |
| **RRULE** | 重复规则 | 如每日/每周；可用界面生成后微调 |

### 策略说明

| 项 | 选项 | 含义 |
|----|------|------|
| 调度过期策略 | 不执行 / 立即执行一次 | 到点未跑或错过时如何处理 |
| 结束策略 | 到结束时间过期 / 最后一次执行完过期 | 任务何时不再调度 |

> 仅能关联 **远程 API** 树中的接口；适合巡检、定时冒烟。

---

# 四、群聊与 AI

侧栏 **群聊** 图标进入。群聊用于同在线成员的轻量协作；AI 助手挂在聊天室工具条上，**不是**独立侧栏入口。

## 4.1 前置：用户信息

齿轮 ⚙ → **用户信息配置**：

| 字段 | 作用 |
|------|------|
| **名称** | 群内显示名；组合文档协作者名 |
| **角色** | 产品 / 后端 / 前端 / 测试；影响本机 AI 的角色技能 |

首次进群聊前建议先配好名称与角色。

## 4.2 能做什么 / 不能做什么

| | 说明 |
|--|------|
| ✅ | 建群、邀请、改名、踢人、退群 |
| ✅ | 成员在线 / 离线状态 |
| ✅ | 同在线成员实时聊天、未读角标 |
| ❌ | **无离线消息补传、无历史漫游**（离线期间消息错过即丢） |
| ❌ | **无服务端群权威库**（各端本地会话收敛，不是中心化群档案） |
| ⚠ | **被踢**：会话与历史仍在，但不能发言 / 邀请 / 改名 / 踢人；可退群或等再邀「重新加入」 |
| ⚠ | **拒绝邀请**：仅本机消失，**邀请方不会收到拒绝回执** |

> 把群聊当作「在线时的协作通道」，不要当作可回溯的即时通讯存档。

## 4.3 群操作流程

```
① 齿轮配置用户名称 + 角色
② ⋯ → Create Group，输入群名
③ 聊天室点「邀请」，选择在线成员
④ 对方同意（或已在群则静默确认）后即可聊天
⑤ 右键群：修改群名 / 退出群聊
⑥ 成员列表可踢人（被踢方进入锁定态）
```

**要点：**

- 建群后先只有自己；靠邀请加人
- 已被踢再被邀请时，通知文案为「重新加入」
- 退群会删除本机该群会话与消息；其他人侧只是少一名成员

## 4.4 AI 助手（群内）

入口：打开某个群 → 聊天室上方 AI 工具条。

### 配置与选择

1. 点 **AI配置（钥匙）**：填写 DeepSeek / 千问 / 千帆密钥，或本地 Base-Url + Authorization（**全部仅存本机，不上传服务器**）
2. 选择 **智能体**（Local / DeepSeek / 千问 / 千帆 + 模型）
3. 选择 **思考模式**：快速 / 思考 / 专家

未配好密钥与模型时，无法有效唤醒本机 AI。

### 使用闭环

```
① 输入框 @ 本地 AI（或进入 sticky「AI会话」）
② 与 AI 本机多轮对话（默认不上线到群）
③ 需要同步给大家时 →「发送到群」（展示为 ·AI）
④ 也可在群话中 @ 其他成员的 AI，由对方本机助手接应
⑤「退出AI会话」结束本机会话态
```

| 能力 | 说明 |
|------|------|
| 本机会话 | 对话主要落在本机；不等于自动广播 |
| 发送到群 | 把 AI 最新回复发到真人群通道 |
| 角色 skill | 按你在用户信息里选的角色加载对应辅助风格 |
| 分享页 | 以当前产品能力为准；群聊 AI 主路径在正式端群聊室 |

## 4.5 典型场景

| 场景 | 步骤摘要 |
|------|----------|
| 拉人快速对齐 | 建群 → 邀请在线同事 → 贴接口链接 / 现象 |
| 本机问 AI 再同步 | @本地AI 多轮 → 满意后「发送到群」 |
| 换角色视角 | 齿轮改角色（如后端→测试）→ 再开 AI 会话 |

---

# 五、配置与环境

入口：侧栏 **齿轮 ⚙**。

| 项 | 说明 |
|----|------|
| **用户信息配置** | 名称（协同/群显示名）+ **角色**（产品/后端/前端/测试，影响群 AI） |
| **全局请求头** | 本机缓存，**同名时优先级最高** |
| **全局执行次数** | 「执行 N 次」的 N |
| **远程域名** | 团队共享；须 `http(s)://` 或 `ws(s)://` 开头 |
| **本地域名** | 仅本机（≠「本地 API」存储） |
| **自动保存** | 请求成功后自动更新有编辑的 API |
| **PluginReq** | 地址为 localhost/127.0.0.1 的 **HTTP** 走篡改猴插件 |

---

# 典型使用场景

| 场景 | 步骤摘要 |
|------|----------|
| 新建并测试 POST | Create New → Method/Path → Body → 执行 → 更新 API |
| 新成员加入 | 配置用户名与角色、远程域名、全局 Token → 打开 API 执行 |
| 抓包导入 | Copy as fetch → FetchCode To API → ToApi → 微调 → 执行 |
| 压测 10 次 | 齿轮设执行次数 10 → 下拉执行 10 次 → 看结果 1…10 |
| 跑一组流程 | 多标签打开 → 右键顺序/并行执行 |
| 写接口说明 | 选择 API → 编辑组合文档 → 分享 |
| 本地 Spring Boot | 篡改猴 + PluginReq → 域名 localhost:8080 → 执行 |
| SSE 流式 | Api Detail 开 SSEReq → 执行 → 看 ResponseData |
| WebSocket | WS + 子协议 Header + Query token → 连接 → Message 发送 |
| 定时巡检 | 新建任务 → CRON + 调度 API → 启动 → 查看日志 |
| 群内 AI 协作 | 配角色与 Key → @本地AI → 发送到群 |

---

# 常见问题（FAQ）

**Q：为什么 Header 没生效？**  
A：全局请求头同名时优先；WebSocket 下 Header 映射为子协议，不是 HTTP 头。

**Q：本地 API 为什么不能分享？**  
A：存在浏览器本地，无法生成服务端分享链接，需改为远程存储。

**Q：PluginReq 开启后仍失败？**  
A：确认篡改猴已安装、脚本 `@match` 匹配当前地址、扩展允许用户脚本。

**Q：修改 API 后别人看不到？**  
A：需「更新 API」保存；对方点标签旁同步图标。

**Q：Body JSON 报错？**  
A：支持 JSON5 注释；Mac 可用 Option+Shift+F 格式化。

**Q：RESTful 路径参数？**  
A：Path 写 `{id}`，Query 配 `id` 及值。

**Q：WebSocket 用 Authorization 鉴权？**  
A：不能作为 HTTP 头发送；用 Query 或首条消息。

**Q：为什么离线一阵后再进群，中间消息没有了？**  
A：群聊不做离线补传与历史漫游，错过即丢；需要存档请用组合文档或其他渠道。

**Q：被踢之后还能干什么？**  
A：不能发言/邀请/改名/踢人；可退群，或等他人再邀「重新加入」。

**Q：AI 在哪里？以前的机器人入口呢？**  
A：AI 已放在 **群聊** 聊天室工具条；侧栏没有独立机器人入口。先配 Key 与智能体，再 `@本地AI`。

**Q：拒绝群邀请后对方怎么还显示我在？**  
A：拒绝只在本机生效，邀请方收不到拒绝回执，其成员列表不会因此自动变化。

---

# 推广参考

**一句话：** NBA-API 是团队在线 API 测试与文档平台——测接口、写文档、定时调度、群聊与 AI，一个工具搞定。

**三点亮点：**

1. **测得全** — HTTP / SSE / WebSocket，RESTful、JSON5、文件上传、并发 N 次
2. **文档跟测走** — 预览、组合文档、分享链接、协同编辑
3. **环境与协作不卡脖子** — PluginReq 测本机 localhost；群内 AI 本机密钥、需要时再上群

**适合：** 后端维护接口库、前端按文档联调、测试巡检与批量执行、小团队在线对齐与 AI 辅助。
