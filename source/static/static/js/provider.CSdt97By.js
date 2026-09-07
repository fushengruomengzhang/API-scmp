import{a1 as B,a2 as k,U as M}from"./vendor.Bm8fCFxr.js";import{s as c,a as m,b as p,D as T,c as Y}from"./request.server.DFxhq5iR.js";import{y as x,s as J,t as W}from"./index.8KvnA3xd.js";const K="nbaGlobalGroup",he="group_event",be="group_msg",Se="group_event_msg",L=x();function E(n){return(n==null?void 0:n.lastMsgAt)||(n==null?void 0:n.createdAt)||0}function V({isSelf:n,name:t,content:e,type:r}){let o=String(e||"");if(o&&typeof e=="object"&&(e==null?void 0:e.value)!=null&&(o=String(e.value)),/<img/i.test(o)&&(o=o.replace(/<img[^>]*>/gi,"[图片]")),o=o.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim(),o||(o="[消息]"),o.length>40&&(o=`${o.slice(0,40)}…`),r==="notice")return o;const i=n?"我":t||"";return i?`${i}：${o}`:o}const ye=B("group.server.default",{state:()=>({groupDetails:[],selectGroupId:null,groupMembers:[]}),getters:{cacheHelp:()=>Y().cacheHelp,socket:()=>L.socket,registerMsg:()=>L.registerMsg,selectGroup(n){return n.selectGroupId&&n.groupDetails.find(t=>t.id===n.selectGroupId)||null}},actions:{sendToGlobal({type:n,cFlags:t=[],data:e}){const r={type:n,cGroup:K,cFlags:t,data:e};this.socket.send(W.encode(JSON.stringify(r)))},loadGroupDetails(n){const t=this.cacheHelp,e=p.storeName;return(n?t.filter(o=>(o.name||"").includes(n),e):t.getAll(e)).then(o=>{var i;return this.groupDetails=this.sortGroupDetails(o||[]),this.groupDetails.some(u=>u.id===this.selectGroupId)?this.setSelectGroupId(this.selectGroupId):this.setSelectGroupId((i=this.groupDetails[0])==null?void 0:i.id)})},sortGroupDetails(n){return(n||[]).slice().sort((t,e)=>E(e)-E(t))},setSelectGroupId(n){this.selectGroupId=n||null;const t=this.groupDetails.find(r=>r.id===n);return(t&&(t.unreadCount||0)>0?this.scmpGroupOperation().editGroup({...M(t),unreadCount:0}):Promise.resolve(t)).then(r=>{var i;const o=((i=r||t)==null?void 0:i.memberIds)||[];return this.cacheHelp.bulkGet(o,c.storeName).then(u=>(this.groupMembers=(u||[]).filter(Boolean),r||t||null))})},appendGroupMsg({groupId:n,msgId:t,fromId:e,fromName:r,name:o,content:i,rContent:u,ts:s,isSelf:l,icon:g,type:f,mentions:P,skipChat:q}){if(!n||!t)return Promise.reject(new Error("groupId/msgId required"));const b=f==="notice"?"notice":"message",S=!!q;return this.cacheHelp.where("msgId",d=>d.equals(t),m.storeName).then(d=>{if(d!=null&&d.length)return S?{...d[0],skipChat:!0}:d[0];const a={groupId:n,msgId:t,type:b,name:o||r||e||"",isSelf:!!l,content:i,ts:s||Date.now(),icon:g||(b==="notice"?"":"UserFilled"),mentions:Array.isArray(P)?P:[]};return u!=null&&String(u)!==""&&(a.rContent=String(u)),this.cacheHelp.add(a,m.storeName).then(H=>{a.id=H;const $=()=>S?{...a,skipChat:!0}:a,{getGroup:v,editGroup:C}=this.scmpGroupOperation();return v(n).then(y=>{if(!y)return $();const U=V({isSelf:a.isSelf,name:a.name,content:a.content,type:b}),_={...y,lastMsgAt:a.ts,lastPreview:U};return!S&&!l&&this.selectGroupId!==n&&(_.unreadCount=(y.unreadCount||0)+1),C(_).then($)})})})},updateGroupMsgContent(n,t){return n?this.cacheHelp.where("msgId",e=>e.equals(n),m.storeName).then(e=>{const r=e==null?void 0:e[0];if(!r)return null;const o={...r,content:t};return this.cacheHelp.put(o,m.storeName).then(()=>o)}):Promise.reject(new Error("msgId required"))},listGroupMsgs(n,{beforeId:t,limit:e=20}={}){if(!n)return Promise.resolve([]);const r=t??T.maxKey,o=t==null,i=u=>u.between([n,T.minKey],[n,r],!0,o).reverse();return this.cacheHelp.where("[groupId+id]",i,m.storeName,{limit:e}).then(u=>(u||[]).slice().reverse().map(s=>{const l=s.type==="notice"?"notice":"message";return{id:s.msgId,localId:s.id,type:l,name:s.name,isSelf:!!s.isSelf,content:s.content,rContent:s.rContent||"",icon:s.icon||(l==="notice"?"":"UserFilled"),ts:s.ts,mentions:Array.isArray(s.mentions)?s.mentions:[]}}))},syncGroupToSession(n){const t=this.groupDetails.findIndex(e=>e.id===n.id);return t>=0?this.groupDetails.splice(t,1,n):this.groupDetails.push(n),this.groupDetails=this.sortGroupDetails(this.groupDetails),n.id!==this.selectGroupId?Promise.resolve(n):this.syncGroupMembersIncremental(n)},syncGroupMembersIncremental(n){const t=n.memberIds||[];this.groupMembers=this.groupMembers.filter(o=>t.includes(o.id));const e=new Set(this.groupMembers.map(o=>o.id)),r=t.filter(o=>!e.has(o));return r.length?this.cacheHelp.bulkGet(r,c.storeName).then(o=>((o||[]).filter(Boolean).forEach(i=>this.groupMembers.push(i)),n)):Promise.resolve(n)},patchGroupMember(n){const t=this.groupMembers.find(e=>e.id===n.id);return t?(t.name=n.name,t.role=n.role,t.online=n.online,t.offlineAt=n.offlineAt,t):n},scmpGroupOperation(){const n=this,t=this.cacheHelp;return{findGroup(e){return e?t.filter(r=>(r.name||"").includes(e),p.storeName):t.getAll(p.storeName)},getGroup(e){return t.get(e,p.storeName)},editGroup(e){return k(e)&&(e=M(e)),e.id||(e.id=J()),Array.isArray(e.memberIds)||(e.memberIds=[]),e.unreadCount==null&&(e.unreadCount=0),e.createdAt==null&&(e.createdAt=Date.now()),e.lastMsgAt==null&&(e.lastMsgAt=e.createdAt),e.lastPreview==null&&(e.lastPreview=""),e.sendDisabled==null&&(e.sendDisabled=!1),t.put(e,p.storeName).then(()=>n.syncGroupToSession(e)).then(()=>e)},deleteGroup(e){return e?t.delete("groupId",r=>r.equals(e),m.storeName).then(()=>t.delete("id",r=>r.equals(e),p.storeName)).then(()=>{var r;if(n.groupDetails=n.groupDetails.filter(o=>o.id!==e),n.selectGroupId===e)return n.setSelectGroupId((r=n.groupDetails[0])==null?void 0:r.id)}):Promise.resolve()}}},scmpMemberOperation(){const n=this,t=n.cacheHelp;return{findMembers(){return t.getAll(c.storeName)},findOnlineMembers(){return t.filter(e=>e==null?void 0:e.online,c.storeName)},getMember(e){return t.get(e,c.storeName)},getMembers(e){return e!=null&&e.length?t.bulkGet(e,c.storeName).then(r=>(r||[]).filter(Boolean)):Promise.resolve([])},editMember(e){return k(e)&&(e=M(e)),e!=null&&e.id?t.get(e.id,c.storeName).then(r=>{const o={id:e.id,name:e.name??(r==null?void 0:r.name),role:e.role??(r==null?void 0:r.role),online:e.online!==void 0?e.online:(r==null?void 0:r.online)??!1,offlineAt:e.offlineAt!==void 0?e.offlineAt:r==null?void 0:r.offlineAt};return t.put(o,c.storeName).then(()=>n.patchGroupMember(o))}):Promise.reject(new Error("member.id required"))},deleteMember(e){return t.delete("id",r=>r.equals(e),c.storeName)}}}}});function Me(n){if(!n)return"";const t=Number(n);if(!t)return"";const r=Date.now()-t;if(r<60*1e3)return"刚刚";if(r<60*60*1e3)return`${Math.floor(r/6e4)}分钟前`;const o=new Date(t),i=new Date,u=o.getFullYear()===i.getFullYear()&&o.getMonth()===i.getMonth()&&o.getDate()===i.getDate(),s=f=>String(f).padStart(2,"0");if(u)return`${s(o.getHours())}:${s(o.getMinutes())}`;const l=new Date(i);return l.setDate(i.getDate()-1),o.getFullYear()===l.getFullYear()&&o.getMonth()===l.getMonth()&&o.getDate()===l.getDate()?"昨天":o.getFullYear()===i.getFullYear()?`${o.getMonth()+1}/${o.getDate()}`:`${o.getFullYear()}/${o.getMonth()+1}/${o.getDate()}`}const z=["周日","周一","周二","周三","周四","周五","周六"],Q=5*60*1e3;function R(n){return new Date(n.getFullYear(),n.getMonth(),n.getDate()).getTime()}function h(n){return String(n).padStart(2,"0")}function X(n,t){const e=Number(n);if(!e||t!=null&&Number(t)&&Math.abs(e-Number(t))<Q)return"";const r=new Date(e),o=new Date,i=`${h(r.getHours())}:${h(r.getMinutes())}`,u=R(r),s=R(o),l=s-24*60*60*1e3;if(u===s)return i;if(u===l)return`昨天 ${i}`;const g=s-o.getDay()*24*60*60*1e3,f=g+7*24*60*60*1e3-1;return e>=g&&e<=f?`${z[r.getDay()]} ${i}`:`${r.getFullYear()}-${h(r.getMonth()+1)}-${h(r.getDate())} ${i}`}function Oe(n,t){let e=t;return(n||[]).forEach(r=>{r.time=X(r.ts,e)||"",r.ts!=null&&(e=r.ts)}),n}function we({id:n,name:t,role:e,isAi:r}){return e=e??"未知",t=t??"用户",r?`${e}·${t}·AI`:`${e}·${t}`}const O=`## 身份、工作

所属人员的角色:{ownerRole} 姓名:{ownerName} 身份id:{ownerUserId}  
作为所属人员的助手角色:{ownerRole} 姓名:{ownerName}·AI 身份id:{ownerUserId}  
辅助所属人员完成日常工作分析、计划、完成

## 群聊摘录

\`\`\`markdown
{groupContext}
\`\`\`

## 群内其他成员助手信息（抄此，勿自造）

每行 JSON：\`id\` / \`name\` / \`role\` / \`isAi\`。

{memberLines}

## 工作方式

当前轮次：{turnMode}（owner=由本端真人唤醒；assigned=被其他助手 @ 唤醒）。

按序判断（多步指令也按序，**不要同轮做完**）：

1. **能自己办的**
    * 办完，向本端真人说清结论。
2. **不能定的 / 须拍板 / 事由不清**
    * 整理待决，在回复里**原样**写 \`{ownerMention}\` 请示本端领导；
    * **本轮禁止** beginOutbound / endOutbound。必须等领导回话后才能再继续。
3. **需要他人助手协作**
    * 仅当本轮**零待决**（或领导已拍板）时，做「按角色找人（前置校验）」校验后走「上群 beginOutbound / endOutbound」。
    * 走「六、上群 beginOutbound / endOutbound」时,如果需要他人协作，endOutbound时必须传递参数mentions
4. 领导话里的「然后 / 再 / 接着」表示**多步计划**：先完成当前步，**下一轮**再执行后续步；禁止把「然后」理解成同轮既分析又广播。

推荐节奏：分析 → 待决 → 本端决定 → 再分析（收敛）→ begin → 写函 → end。

## 按角色找人（前置校验）

要找**某角色**的助手时，从「群内其他成员助手信息（抄此，勿自造）」按 \`role\` 自行计数（不含本端）：

| 该角色人数                       | 操作                                                                            |
|-----------------------------|-------------------------------------------------------------------------------|
| **0**                       | **禁止** beginOutbound / endOutbound；向本端说明暂无该角色可协作                              |
| **1**                       | 可 beginOutbound / endOutbound：endOutbound 的 mentions 挂该人 \`type:ai\` + memberId |
| **>1**                      | **先**向本端列出候选人并用 \`{ownerMention}\` 请示选谁；**未点名前进禁止** beginOutbound / endOutbound |
| **已点名**（领导已指定某人，且花名册有对应 id） | 可 beginOutbound / endOutbound，mentions 挂对应 id                                 |

另：**本轮仍有须拍板的待决时，无论人数多少，禁止 beginOutbound / endOutbound。**

禁止用「后端们 / 那边 / 有关同事」等模糊称呼代替具体 memberId。

## 寻址、找人协作、提及他人、@他人

| 意图         | 怎么写         | beginOutbound / endOutbound |
|------------|-------------|-----------------------------|
| 请示**本端领导** | \`@角色·名称\`    | **不能**调用                    |
| 找**他人助手**  | \`@角色·名称·AI\` | **必须**调用                    |
| 找**他人**    | 禁止          | —                           |
| 自己的 ·AI    | 禁止          | 禁止指向自己                      |

- 找他人助手：在 **endOutbound** 的 mentions 使用 \`type: ai\` + 对方真人 \`memberId\`；**禁止**把其他真人当直接协作目标。

## 上群（beginOutbound / endOutbound）

禁止在 tool 参数里塞长正文。本轮对领导与协作函写在**同一条可见气泡**里。顺序：

1. **beginOutbound** → 打开出站采集窗口（不另挂泡）；之后流式输出协作函（字仍进本轮同一泡）。
2. **endOutbound** → 参数仅 \`mentions\`（@ 只在这一步）；系统用**新 msgId** 将采集终稿 **只广播到群**（本机不另落广播行）并结束采集。

协作函须自包含（对端看不到你侧上文）：

1. 在处理什么问题
2. 约束/排除（有则必写）
3. 请对方助手具体做什么
4. 具体目标（对照花名册，禁止模糊称呼）

beginOutbound 前写完对领导的话；beginOutbound 后只写协作函。beginOutbound/endOutbound 必须连续且成对。

## 对用户可见回复（禁止泄协议）

可见气泡只写给本端真人看的业务内容。禁止写入：

- 协议章节名、自检清单、工具名（beginOutbound / endOutbound）
- 花名册计数过程、「1 人直发」等规则复述
- 「让我分析一下现状 / 让我调用…」类过程独白

允许写：结论摘要、待决清单（含 \`{ownerMention}\`）、协作函正文、允许协作后的短同步「已请谁」。

## 输出前自检

- [ ] 本轮是否仍有待决？→ 有则只用 \`{ownerMention}\` 请示，**未调** begin/end
- [ ] 领导是否用了「然后/再/接着」？→ 是否只做当前步、把后续留给下轮？
- [ ] 按角色找人？→ 是否从花名册按 role 数过人且本轮零待决？
- [ ] 上群？→ 是否先 begin 再流式写函再 end（mentions 在 end）？协作函是否自包含？
- [ ] 可见回复是否未泄露协议/工具/自检过程？

## TOOLS 参数说明

{toolsParamDetail}`,Z={},ee={urlMapping:Z,_is_md:!0,toJSON:()=>O,toString:()=>O,valueOf:()=>O},w=`---
role: 产品
tools: [ searchApi, getSelectedApi, getApiRequestTimes ]
---

# 产品助手 · {ownerName}

职责：澄清与编排；**不代写技术结论**。

## 边界

| 能 | 不能 → 移交 |
|----|-------------|
| 业务含义、范围、验收、编排 | 建改→后端；对接→前端；测报→测试；拍板→本端对话请示（文中 {ownerMention}） |

## 日常

- 新需求 → 澄清+验收+决策点
- 要技术评估 → 列产品决策点后移交后端助手
- 纯配置/联调细节 → 简短说明或 IGNORE
`,ne={},te={urlMapping:ne,_is_md:!0,toJSON:()=>w,toString:()=>w,valueOf:()=>w},D=`---
role: 后端
tools: [ searchApi, getApiRequestTimes, genId ]
---

# 后端助手 · {ownerName}

职责：技术结论与实现评估；**不代产品拍板、不代前端对接口径**。

## 边界

| 能 | 不能 → 移交 |
|----|-------------|
| 技术评估、实现建议 | 产品优先级→产品；对接细节→前端；测报→测试；拍板→本端对话请示（文中 {ownerMention}） |

## 日常

- 技术评估 → 结论；待决标清
- 无真人明确授权时，不宣称已建改
- 场景/参数未定时：先列待决请示本端；**禁止**用「常规基线」顶替拍板后同轮 begin/end 喊测试
`,re={},oe={urlMapping:re,_is_md:!0,toJSON:()=>D,toString:()=>D,valueOf:()=>D},A=`---
role: 前端
tools: [ searchApi, getSelectedApi, getApiRequestTimes ]
---

# 前端助手 · {ownerName}

职责：对接与交互细节；**不代产品拍板、不代后端定接口契约**。

## 边界

| 能 | 不能 → 移交 |
|----|-------------|
| 交互/展示/对接说明 | 产品范围→产品；接口契约→后端；测报→测试；拍板→本端对话请示（文中 {ownerMention}） |
`,ie={},se={urlMapping:ie,_is_md:!0,toJSON:()=>A,toString:()=>A,valueOf:()=>A},G=`---
role: 测试
tools: [ searchApi, getSelectedApi, getApiRequestTimes ]
---

# 测试助手 · {ownerName}

职责：用例与验收风险；**不代产品定范围、不代研发改实现**。

## 边界

| 能 | 不能 → 移交 |
|----|-------------|
| 验收点、风险、用例建议 | 范围→产品；实现→后端/前端；拍板→本端对话请示（文中 {ownerMention}） |
`,ue={},le={urlMapping:ue,_is_md:!0,toJSON:()=>G,toString:()=>G,valueOf:()=>G},I=`## 参数描述

### API信息(ApiDetail)

| 字段名         | 类型            | 必填 | 说明                          |
|-------------|---------------|----|-----------------------------|
| id          | Long          | 否  | API id，系统处理，不需要通过genId获取    |
| parent_id   | Long          | 否  | API所属上级目录                   |
| name        | String        | 是  | API名称                       |
| desc        | String        | 否  | API描述                       |
| type        | String        | 是  | 类型：api=接口文档、folder=文件夹      |
| config      | ApiConfig     | 否  | type=api时的API配置信息           |
| search      | String        | 否  | API检索内容（API名称、URL）          |
| update_time | LocalDateTime | 否  | 更新时间，格式：yyyy-MM-dd hh:mm:ss |
| create_time | LocalDateTime | 否  | 创建时间，格式：yyyy-MM-dd hh:mm:ss |

### API配置信息(ApiConfig)

| 字段名              | 类型                | 必填 | 说明                                                                                                       |
|------------------|-------------------|----|----------------------------------------------------------------------------------------------------------|
| method           | String            | 否  | 请求方法，可选：GET、POST、PUT、DELETE、WS                                                                           |
| domain           | String            | 否  | 域名、IP、端口                                                                                                 |
| contextPath      | String            | 否  | 项目上下文路径，如springBoot的server.servlet.context-path                                                          |
| prefix           | String            | 否  | 接口统一前缀                                                                                                   |
| url              | String            | 是  | 接口路径，不能包含域名和端口，由contextPath/prefix/url组成完整路径                                                             |
| sse              | Boolean           | 否  | 是否是SSE请求（Server-Sent Events）                                                                             |
| usePlugin        | Boolean           | 否  | 是否通过插件发起请求                                                                                               |
| header           | List<FieldDetail> | 否  | 请求头配置                                                                                                    |
| query            | List<FieldDetail> | 否  | URL上的请求参数                                                                                                |
| bodyType         | String            | 否  | 请求体类型：application/json、multipart/form-data、application/x-www-form-urlencoded；设置后无需在header内声明content-type |
| queryBody        | String            | 否  | body传递参数，json5字符串，仅bodyType=application/json时使用                                                          |
| bodyDocument     | List<FieldDetail> | 否  | queryBody字段描述文档，value永远为空不赋值                                                                             |
| urlBodyDocument  | List<FieldDetail> | 否  | 当bodyType=application/x-www-form-urlencoded时使用                                                           |
| formBodyDocument | List<FieldDetail> | 否  | 当bodyType=multipart/form-data时使用                                                                         |
| socketMsg        | String            | 否  | 请求方法为WS/WSS时要发送的消息内容                                                                                     |
| messageLanguage  | String            | 否  | WS/WSS消息类型：json5、text、xml、javascript                                                                     |

### 单个字段配置(FieldDetail)

| 字段名      | 类型                | 必填 | 说明                                              |
|----------|-------------------|----|-------------------------------------------------|
| id       | String            | 是  | 字段id，使用雪花算法生成，通过genId获取                         |
| parentId | String            | 否  | 字段父级id，默认为空                                     |
| key      | String            | 是  | 字段名                                             |
| value    | Object            | 否  | 字段值                                             |
| type     | String            | 是  | 字段类型，枚举值：String、Number、List、File、Object、Boolean |
| desc     | String            | 否  | 字段描述                                            |
| check    | boolean           | 否  | 是否必填，默认必填（true）                                 |
| children | List<FieldDetail> | 否  | 子级字段，仅type=Object/List时使用，可为null                |
`,ae={},ce={urlMapping:ae,_is_md:!0,toJSON:()=>I,toString:()=>I,valueOf:()=>I},N={产品:te,后端:oe,前端:se,测试:le};function j(){return Object.keys(N)}function De(){return j().map(n=>({label:n,value:n}))}function de(){return j()[0]||"产品"}function F(n){if(typeof n=="string")return n;if(n&&typeof n=="object"){if(typeof n.default=="string")return n.default;if(typeof n.toString=="function"){const t=n.toString();if(typeof t=="string"&&t!=="[object Object]")return t}}return""}function me(n){if(!n||typeof n!="string")return{meta:{},body:""};const t=n.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);if(!t)return{meta:{},body:n};const e={};return t[1].split(`
`).forEach(r=>{const o=r.match(/^(\w+):\s*(.+)$/);if(!o)return;const[,i,u]=o;u.startsWith("[")?e[i]=u.replace(/[\[\]]/g,"").split(",").map(s=>s.trim()).filter(Boolean):e[i]=u.trim()}),{meta:e,body:t[2]}}async function Ae(n){const t=N[n]!=null?n:de(),e=F(N[t]);e||console.warn(`[group/ai/skill] ${t} 内容为空，请检查 .md?raw / vite md 插件`);const{meta:r,body:o}=me(e),i=F(ee).trim();i||console.warn("[group/ai/skill] 通用.md 内容为空，请检查 .md?raw / vite md 插件");const u=(o||"").trim(),s=[i,u].filter(Boolean).join(`

`);return s||console.warn(`[group/ai/skill] ${t} systemPrompt 解析为空`),{role:r.role||t,systemPrompt:s,toolNames:r.tools||[]}}function Ge(n,t={}){let e=n||"",r={...t,appToolParams:ce};return Object.entries(r).forEach(([o,i])=>{e=e.replace(new RegExp(`\\{${o}\\}`,"g"),i==null?"":String(i))}),e}export{K as G,Se as a,he as b,be as c,ye as d,Ge as e,we as f,De as g,j as h,de as i,X as j,Oe as k,Ae as l,Me as m};
