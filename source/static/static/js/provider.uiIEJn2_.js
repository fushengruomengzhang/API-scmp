import{a1 as v,a2 as _,U as O}from"./vendor.D17dXXot.js";import{s as c,a as m,b as f,D as P,c as L}from"./request.server.ei82OM6F.js";import{x as J,s as B,v as K}from"./index.B0VOvdBr.js";const x="nbaGlobalGroup",fe="group_event",ge="group_msg",pe="group_event_msg",E=J();function H(n){return(n==null?void 0:n.lastMsgAt)||(n==null?void 0:n.createdAt)||0}function V({isSelf:n,name:t,content:e,type:r}){let o=String(e||"");if(o&&typeof e=="object"&&(e==null?void 0:e.value)!=null&&(o=String(e.value)),/<img/i.test(o)&&(o=o.replace(/<img[^>]*>/gi,"[图片]")),o=o.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim(),o||(o="[消息]"),o.length>40&&(o=`${o.slice(0,40)}…`),r==="notice")return o;const s=n?"我":t||"";return s?`${s}：${o}`:o}const he=v("group.server.default",{state:()=>({groupDetails:[],selectGroupId:null,groupMembers:[]}),getters:{cacheHelp:()=>L().cacheHelp,socket:()=>E.socket,registerMsg:()=>E.registerMsg,selectGroup(n){return n.selectGroupId&&n.groupDetails.find(t=>t.id===n.selectGroupId)||null}},actions:{sendToGlobal({type:n,cFlags:t=[],data:e}){const r={type:n,cGroup:x,cFlags:t,data:e};this.socket.send(K.encode(JSON.stringify(r)))},loadGroupDetails(n){const t=this.cacheHelp,e=f.storeName;return(n?t.filter(o=>(o.name||"").includes(n),e):t.getAll(e)).then(o=>{var s;return this.groupDetails=this.sortGroupDetails(o||[]),this.groupDetails.some(u=>u.id===this.selectGroupId)?this.setSelectGroupId(this.selectGroupId):this.setSelectGroupId((s=this.groupDetails[0])==null?void 0:s.id)})},sortGroupDetails(n){return(n||[]).slice().sort((t,e)=>H(e)-H(t))},setSelectGroupId(n){this.selectGroupId=n||null;const t=this.groupDetails.find(r=>r.id===n);return(t&&(t.unreadCount||0)>0?this.scmpGroupOperation().editGroup({...O(t),unreadCount:0}):Promise.resolve(t)).then(r=>{var s;const o=((s=r||t)==null?void 0:s.memberIds)||[];return this.cacheHelp.bulkGet(o,c.storeName).then(u=>(this.groupMembers=(u||[]).filter(Boolean),r||t||null))})},appendGroupMsg({groupId:n,msgId:t,fromId:e,fromName:r,name:o,content:s,rContent:u,ts:i,isSelf:l,icon:g,type:p,mentions:A,skipChat:T}){if(!n||!t)return Promise.reject(new Error("groupId/msgId required"));const b=p==="notice"?"notice":"message",M=!!T;return this.cacheHelp.where("msgId",d=>d.equals(t),m.storeName).then(d=>{if(d!=null&&d.length)return M?{...d[0],skipChat:!0}:d[0];const a={groupId:n,msgId:t,type:b,name:o||r||e||"",isSelf:!!l,content:s,ts:i||Date.now(),icon:g||(b==="notice"?"":"UserFilled"),mentions:Array.isArray(A)?A:[]};return u!=null&&String(u)!==""&&(a.rContent=String(u)),this.cacheHelp.add(a,m.storeName).then(U=>{a.id=U;const I=()=>M?{...a,skipChat:!0}:a,{getGroup:Y,editGroup:j}=this.scmpGroupOperation();return Y(n).then(S=>{if(!S)return I();const q=V({isSelf:a.isSelf,name:a.name,content:a.content,type:b}),k={...S,lastMsgAt:a.ts,lastPreview:q};return!M&&!l&&this.selectGroupId!==n&&(k.unreadCount=(S.unreadCount||0)+1),j(k).then(I)})})})},updateGroupMsgContent(n,t){return n?this.cacheHelp.where("msgId",e=>e.equals(n),m.storeName).then(e=>{const r=e==null?void 0:e[0];if(!r)return null;const o={...r,content:t};return this.cacheHelp.put(o,m.storeName).then(()=>o)}):Promise.reject(new Error("msgId required"))},listGroupMsgs(n,{beforeId:t,limit:e=20}={}){if(!n)return Promise.resolve([]);const r=t??P.maxKey,o=t==null,s=u=>u.between([n,P.minKey],[n,r],!0,o).reverse();return this.cacheHelp.where("[groupId+id]",s,m.storeName,{limit:e}).then(u=>(u||[]).slice().reverse().map(i=>{const l=i.type==="notice"?"notice":"message";return{id:i.msgId,localId:i.id,type:l,name:i.name,isSelf:!!i.isSelf,content:i.content,rContent:i.rContent||"",icon:i.icon||(l==="notice"?"":"UserFilled"),ts:i.ts,mentions:Array.isArray(i.mentions)?i.mentions:[]}}))},syncGroupToSession(n){const t=this.groupDetails.findIndex(e=>e.id===n.id);return t>=0?this.groupDetails.splice(t,1,n):this.groupDetails.push(n),this.groupDetails=this.sortGroupDetails(this.groupDetails),n.id!==this.selectGroupId?Promise.resolve(n):this.syncGroupMembersIncremental(n)},syncGroupMembersIncremental(n){const t=n.memberIds||[];this.groupMembers=this.groupMembers.filter(o=>t.includes(o.id));const e=new Set(this.groupMembers.map(o=>o.id)),r=t.filter(o=>!e.has(o));return r.length?this.cacheHelp.bulkGet(r,c.storeName).then(o=>((o||[]).filter(Boolean).forEach(s=>this.groupMembers.push(s)),n)):Promise.resolve(n)},patchGroupMember(n){const t=this.groupMembers.find(e=>e.id===n.id);return t?(t.name=n.name,t.role=n.role,t.online=n.online,t.offlineAt=n.offlineAt,t):n},scmpGroupOperation(){const n=this,t=this.cacheHelp;return{findGroup(e){return e?t.filter(r=>(r.name||"").includes(e),f.storeName):t.getAll(f.storeName)},getGroup(e){return t.get(e,f.storeName)},editGroup(e){return _(e)&&(e=O(e)),e.id||(e.id=B()),Array.isArray(e.memberIds)||(e.memberIds=[]),e.unreadCount==null&&(e.unreadCount=0),e.createdAt==null&&(e.createdAt=Date.now()),e.lastMsgAt==null&&(e.lastMsgAt=e.createdAt),e.lastPreview==null&&(e.lastPreview=""),e.sendDisabled==null&&(e.sendDisabled=!1),t.put(e,f.storeName).then(()=>n.syncGroupToSession(e)).then(()=>e)},deleteGroup(e){return e?t.delete("groupId",r=>r.equals(e),m.storeName).then(()=>t.delete("id",r=>r.equals(e),f.storeName)).then(()=>{var r;if(n.groupDetails=n.groupDetails.filter(o=>o.id!==e),n.selectGroupId===e)return n.setSelectGroupId((r=n.groupDetails[0])==null?void 0:r.id)}):Promise.resolve()}}},scmpMemberOperation(){const n=this,t=n.cacheHelp;return{findMembers(){return t.getAll(c.storeName)},findOnlineMembers(){return t.filter(e=>e==null?void 0:e.online,c.storeName)},getMember(e){return t.get(e,c.storeName)},getMembers(e){return e!=null&&e.length?t.bulkGet(e,c.storeName).then(r=>(r||[]).filter(Boolean)):Promise.resolve([])},editMember(e){return _(e)&&(e=O(e)),e!=null&&e.id?t.get(e.id,c.storeName).then(r=>{const o={id:e.id,name:e.name??(r==null?void 0:r.name),role:e.role??(r==null?void 0:r.role),online:e.online!==void 0?e.online:(r==null?void 0:r.online)??!1,offlineAt:e.offlineAt!==void 0?e.offlineAt:r==null?void 0:r.offlineAt};return t.put(o,c.storeName).then(()=>n.patchGroupMember(o))}):Promise.reject(new Error("member.id required"))},deleteMember(e){return t.delete("id",r=>r.equals(e),c.storeName)}}}}});function be(n){if(!n)return"";const t=Number(n);if(!t)return"";const r=Date.now()-t;if(r<60*1e3)return"刚刚";if(r<60*60*1e3)return`${Math.floor(r/6e4)}分钟前`;const o=new Date(t),s=new Date,u=o.getFullYear()===s.getFullYear()&&o.getMonth()===s.getMonth()&&o.getDate()===s.getDate(),i=p=>String(p).padStart(2,"0");if(u)return`${i(o.getHours())}:${i(o.getMinutes())}`;const l=new Date(s);return l.setDate(s.getDate()-1),o.getFullYear()===l.getFullYear()&&o.getMonth()===l.getMonth()&&o.getDate()===l.getDate()?"昨天":o.getFullYear()===s.getFullYear()?`${o.getMonth()+1}/${o.getDate()}`:`${o.getFullYear()}/${o.getMonth()+1}/${o.getDate()}`}const W=["周日","周一","周二","周三","周四","周五","周六"],z=5*60*1e3;function R(n){return new Date(n.getFullYear(),n.getMonth(),n.getDate()).getTime()}function h(n){return String(n).padStart(2,"0")}function Q(n,t){const e=Number(n);if(!e||t!=null&&Number(t)&&Math.abs(e-Number(t))<z)return"";const r=new Date(e),o=new Date,s=`${h(r.getHours())}:${h(r.getMinutes())}`,u=R(r),i=R(o),l=i-24*60*60*1e3;if(u===i)return s;if(u===l)return`昨天 ${s}`;const g=i-o.getDay()*24*60*60*1e3,p=g+7*24*60*60*1e3-1;return e>=g&&e<=p?`${W[r.getDay()]} ${s}`:`${r.getFullYear()}-${h(r.getMonth()+1)}-${h(r.getDate())} ${s}`}function Me(n,t){let e=t;return(n||[]).forEach(r=>{r.time=Q(r.ts,e)||"",r.ts!=null&&(e=r.ts)}),n}function Se({id:n,name:t,role:e,isAi:r}){return e=e??"未知",t=t??"用户",r?`${e}·${t}·AI`:`${e}·${t}`}const G=`## 身份、工作

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
`,X={},Z={urlMapping:X,_is_md:!0,toJSON:()=>G,toString:()=>G,valueOf:()=>G},w=`---
role: 产品
tools: []
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
`,ee={},ne={urlMapping:ee,_is_md:!0,toJSON:()=>w,toString:()=>w,valueOf:()=>w},y=`---
role: 后端
tools: []
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
`,te={},re={urlMapping:te,_is_md:!0,toJSON:()=>y,toString:()=>y,valueOf:()=>y},D=`---
role: 前端
tools: []
---

# 前端助手 · {ownerName}

职责：对接与交互细节；**不代产品拍板、不代后端定接口契约**。

## 边界

| 能 | 不能 → 移交 |
|----|-------------|
| 交互/展示/对接说明 | 产品范围→产品；接口契约→后端；测报→测试；拍板→本端对话请示（文中 {ownerMention}） |
`,oe={},se={urlMapping:oe,_is_md:!0,toJSON:()=>D,toString:()=>D,valueOf:()=>D},N=`---
role: 测试
tools: []
---

# 测试助手 · {ownerName}

职责：用例与验收风险；**不代产品定范围、不代研发改实现**。

## 边界

| 能 | 不能 → 移交 |
|----|-------------|
| 验收点、风险、用例建议 | 范围→产品；实现→后端/前端；拍板→本端对话请示（文中 {ownerMention}） |
`,ie={},ue={urlMapping:ie,_is_md:!0,toJSON:()=>N,toString:()=>N,valueOf:()=>N},$={产品:ne,后端:re,前端:se,测试:ue};function F(){return Object.keys($)}function Oe(){return F().map(n=>({label:n,value:n}))}function le(){return F()[0]||"产品"}function C(n){if(typeof n=="string")return n;if(n&&typeof n=="object"){if(typeof n.default=="string")return n.default;if(typeof n.toString=="function"){const t=n.toString();if(typeof t=="string"&&t!=="[object Object]")return t}}return""}function ae(n){if(!n||typeof n!="string")return{meta:{},body:""};const t=n.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);if(!t)return{meta:{},body:n};const e={};return t[1].split(`
`).forEach(r=>{const o=r.match(/^(\w+):\s*(.+)$/);if(!o)return;const[,s,u]=o;u.startsWith("[")?e[s]=u.replace(/[\[\]]/g,"").split(",").map(i=>i.trim()).filter(Boolean):e[s]=u.trim()}),{meta:e,body:t[2]}}async function Ge(n){const t=$[n]!=null?n:le(),e=C($[t]);e||console.warn(`[group/ai/skill] ${t} 内容为空，请检查 .md?raw / vite md 插件`);const{meta:r,body:o}=ae(e),s=C(Z).trim();s||console.warn("[group/ai/skill] 通用.md 内容为空，请检查 .md?raw / vite md 插件");const u=(o||"").trim(),i=[s,u].filter(Boolean).join(`

`);return i||console.warn(`[group/ai/skill] ${t} systemPrompt 解析为空`),{role:r.role||t,systemPrompt:i,toolNames:r.tools||[]}}function we(n,t={}){let e=n||"";return Object.entries(t).forEach(([r,o])=>{e=e.replace(new RegExp(`\\{${r}\\}`,"g"),o==null?"":String(o))}),e}export{x as G,pe as a,fe as b,ge as c,he as d,we as e,Se as f,Oe as g,F as h,le as i,Q as j,Me as k,Ge as l,be as m};
