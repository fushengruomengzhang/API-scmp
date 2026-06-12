import{_ as m,i as h,a as s,w as c,s as y,x as g,r as l,o as S}from"./index.Cfaecw75.js";import"../../public.scmp.config.js";const A=`<div class='title'>NBA-API-使用帮助</div>

# 特色

## API

* GET POST PUT DELETE 常用方法接口测试
* 支持 RESTFul接口语法
* (POST GET)SSE(Server-Sent Events)测试
* WebSocket测试
* 本地项目接口测试(非本地部署,需要安装插件)
* 特殊能力
    * 将Fetch请求代码转成成API接口文档
    * 可以对单个接口同时发起N次请求
    * 可以按照API打开的顺序依次发起请求
    * 可以同时对打开的API发起请求
    * 可以通过自定义JavaScript脚本对参数值进行修改
    * Body-json支持注释(json5语法)
    * 可以对单个API进行分享
    * 可以选中多个API组合分享或者生成API组合文档
    * Swagger注解标注的java文件转换成API文档
    * 支持本地(橘黄色文件夹为本地API文件标记)存储(不能分享,不能参与API文档管理,不能参与API选择)

## API组合文档

* 将多个API组合成一个文档,在文档内进行详细记录
* 可以将API组合文档进行分享
* 文档支持多人协同编辑

## Swagger文档解析(暂未具体测试和优化)

## 定时任务调度

* 支持CRON表达式
* 支持RRULE表达式

## 支持DeepSeek AI 能力
`,_={},f={urlMapping:_,_is_md:!0,toJSON:()=>A,toString:()=>A,valueOf:()=>A},p=`# 配置信息管理

> 该功能是位于侧边栏的齿轮形状的图标

## 用户名称配置

* 用于api文档组,多人进行文档协同时,用户名信息的展示

## 全局请求头配置

* 又可叫做[本地请求头管理].
* 配置数据只缓存在本地浏览器,不会存储到服务器上
* ~~有效期为24小时~~ (2025.8.8) 一直有效
* <span style="color:red">注:</span>全局请求头配置会覆盖API的局部请求头[Header]配置。即全局的请求头优先级最高

## 全局执行次数配置

* 配置对某一个API同时发起N次请求的执行次数
* 只对本地生效,
* 缓存有效期:理论上为永久有效

## 远程请求环境配置

* 用于配置环境对应的域名信息,例如name=生产,domain=www.pro.qq.com
* 远程请求环境配置数据会同步存储到服务器,再所有成员间共享

## 本地请求环境配置

* 用于配置环境对应的域名信息,例如name=生产,domain=www.pro.qq.com
* 配置信息缓存在本地,只再本地使用,只对自己生效
* 缓存有效期:理论上为永久有效
* 注:本地请求环境不等于本地测试

## 自动保存

* 开启该开关,且api发生了修改,仅在执行api请求且成功后会自动保存api到数据库

## PluginReq

* 安装篡改猴插件,并且完成配置,可以开启该配置,
* 开启该配置后,且检测到是向127.0.0.1 或者 localhost 发送请求时,会通过插件发起,将请求转到本地

# API管理

> 主要用于API测试  
> 可以通过API的存储方式控制API的存储位置,远程:API记录在服务器上,本地:API记录在本地缓存内(IndexDB)  
> 本地API:不参与API选择,不能分享,不参与API文档管理.橘黄色文件夹代表本地API

## API结构

> 建议如下

\`\`\`mermaid 
graph LR;
    Project("项目") --> Module("模块");
    Module --> Controller("Controller || REST");
    Controller --> Method("方法（具体的api）");
\`\`\`

## 新建/编辑

> 1. API管理左侧三个点图标内找到[Create New],
> 2. 选中目录或者API后右键菜单下的<span style="color:red">[编辑目录]</span>
> 3. <span style="color:red">[新建子目录]</span>
> 4. <span style="color:red">[新建子API]</span>

| 	           | 值                   | 默认值 | 说明                                                                                            |
|-------------|---------------------|-----|-----------------------------------------------------------------------------------------------|
| 类型          | 目录/API              | 目录  | 标记当前新建的是目录还是API                                                                               |
| 存储          | 远程/本地               | 远程  | API或者文件夹数据存储位置,本地存储的数据会再根节点使用橘黄色图标标记                                                          |
| 父级          | API目录树              | 无   | 父级所在目录,用于控制层级关系                                                                               |
| 名称          | 名称                  | 无   | API或者目录的名称                                                                                    |
| ~~描述~~      | 无                   | 无   | (20260309:desc 修改为备注,调整到APIDetail标签页进行修改)                                                     |
| ContextPath | context-path        | 无   | 对应项目的server.servlet.context-path配置<br/>注:新建子级时会将父级的配置信息传递给子级。<br/>注:修改父级的配置信息时，不会修改已存在的子级配置信息 |
| Prefix      | Prefix              | 无   | 一般填写项目内Controller上统一的请求前缀<br/>注:新建子级时会将父级的配置信息传递给子级。<br/>注:修改父级的配置信息时，不会修改已存在的子级配置信息          |
| Method      | get/post/put/delete | 无   | API请求方法(当类型为API时必填)                                                                           |
| Path        | Path                | 无   | 一般填写Controller下method上的请求路径(当类型为API时必填)                                                       |
| SSE         | SSE                 | 关闭  | 是否采用SSE(Server-Sent Events)方法执行请求                                                             |
| PluginReq   | PluginReq           | 关闭  | 是否通过插件发起请求                                                                                    |

## API树

* 支持通过[拖拽的方式]调整API的树结构关系

## API树右键菜单

> 功能如其名

* 刷新目录
* 编辑目录
* 删除目录(API)
    * 如果目录下存在子元素(目录或者API)则不允许删除
* 新建子目录
* 新建子API

## API树下拉菜单(...)

* Create New
    * 新建API目录或者文档
* FetchCode To API
    * 将FetchCode代码转换为API文档,使用时将会覆盖***当前选中的API文档***
* 分享已打开的API
    * 选择需要的API文档在右侧打开，然后通过该功能生成分享链接，进而分享打开的API
* 选择API
    * 使用此菜单后，API树会展示复选框□，勾选想要分享的API后， 便可使用<span style="color:red">编辑API组合文档</span>菜单或者<span style="color:red">分享已选择的API</span>菜单
    * 注:本地存储的API不支出选择,不支持分享,不支持参与API组合文档
* 编辑API组合文档
    * 通过<span style="color:red">选择API</span>菜单选择需要的API，然后通过该菜单弹出API文档编辑弹框,进而为选中的这批API的编写详细使用文档
* 分享已选择的API
    * 通过<span style="color:red">选择API</span>菜单选择需要的API，然后通过该菜单便可生成分享链接
* 关闭API选择
    * 此菜单只有在使用<span style="color:red">选择API</span>菜单后,才会展示,作用是隐藏API选择的复选框

## API测试

> 选择一个创建后的API,单击即可再右侧打开,进而进行测试

* API 列表标签
    * 已打开的API
    * 如果API有变更,会有星号(*)提示,
    * 使用标签上的关闭API功能(×)时,会验证API是否有变更,如果有变更会提示保存
    * 右键菜单也有部分功能,详细使用文档查看<span style="color:red">[API 列表标签右键菜单]</span>
    * 支持拖拽标签页修改API的打开顺序
* API 路径
    * 请求方法: GET POST PUT DELETE
    * 请求环境: 包含本地请求环境配置信息,以及远程请求环境配置信息
    * Context-Path: 对应Context-Path
    * Prefix: 对应Prefix
    * Path: 对应Path
    * 支持 REST full api,详细使用文档查看<span style="color:red">[RESTful API 的使用]</span>
    * 执行和下拉菜单,详细使用文档查看<span style="color:red">[执行和下拉菜单]</span>
* API 配置
    * 配置API的详细信息,包含基础信息(Api Detail),请求头(Header),请求参数(Query),请求体(Body)
    * 详细使用文档查看<span style="color:red">[API 配置]</span>
* API 执行结果
    * 展示API测试结果,
        * 单次请求的响应结果(ResponseData),响应头(ResponseHeader)
        * 多次请求的结果需要<span style="color:red">[全局执行次数配置]</span>
          请求后,通过响应区的<span style="color:red">[结果N]</span>进行查看
    * 详细使用文档查看<span style="color:red">[API 执行结果]</span>

## API 列表标签右键菜单

* 关闭文档
* 关闭其他文档
* 关闭全部文档
* 关闭左侧文档
* 关闭右侧文档
* 顺序执行打开的API
    * 按照API打开的顺序,依次执行一次,可以通过选择对应的API标签页查看执行结果
* 并行执行打开的API
    * 同时对打开的API发起请求,仅请求一次,可以通过选择对应的API标签页查看执行结果

## RESTful API 的使用

> 本项目支持RESTful(Representational State Transfer)格式的API

* <span style="color:red">注:</span>路径内容用到的相关参数需要再Query内进行配置
* 例如:Path=/user/{id},则Query内需要配置id对应的参数信息

## 执行和下拉菜单

* 执行(执行一次)
    * 对API进行单次的调用,可以通过选择对应的API标签页查看执行结果
    * 快捷键 windows:Ctrl+Enter Mac:⌘+Enter
* 下拉菜单
    * 执行N次: 对API同时发起N次请求.可以通过[配置信息管理>全局执行次数配置]进行配置
    * 保存API:
    * 更新API: 修改API后,建议更新保存,可以通过 Ctrl+s/command+s快捷键触发更新
        * 如果有其他端同时打开了该API,则其他端的标签页后边会出现同步图标,点击同步图标后,则可将更新内容同步到本地
    * 预览API: 是一个API文档的概要描述
    * 分享API: 该菜单会生成一个API分享路径.
        * 注:本地存储的API不支持分享
    * 复制路径: url路径
    * 记录版本
        * 记录当前变化的API配置信息,可以通过Version查看和使用记录结果

## API 配置

* Api Detail
    * 是否是SSE(Server-Sent Events)请求
    * 存储:远程,本地(橘黄色图标标记为本地存储)
    * name: 名称
    * desc: 备注
* Headers
    * 功能: 局部请求头配置
    * 字段: 参数名(请求头名称) 参数值 描述
    * <span style="color:red">注:</span>此处的局部请求头信息如果存在和全局请求头相同的参数名,则以局部请求头为准
* Query
    * 功能: 请求参数配置
    * 字段: 参数名 参数类型 参数值 描述
    * 预览 添加 删除 图标
    * 拖拽: 鼠标移动到列首,鼠标会变成上下拖拽的图标,可以对对应的列进行拖追排序
* Message
    * 功能: 进行WebSocket测试
    * 可自定义输入消息内容,可通过设置 json/text/xml 设置编辑器语言
    * 通过Binary控制发送消息时使用进行二进制编码
    * 发送按钮:发送消息
* Body
    * 功能: 请求体参数配置
    * 可以通过Body标签也修改ContentType
    * content-type: application/json multipart/form-data application/x-www-form-urlencoded
        * application/json: json格式的数据,支持JSON5语法,可以通过<span style="color:red">请求字段描述</span>功能添加字段文档
        * multipart/form-data: 表单方式提交,可以上传文件
        * application/x-www-form-urlencoded: ....
    * content-type=application/json
        * 参数编辑框支持JSON5数据格式
        * 有右键菜单,具体功能不详细描述
        * 可以通过快捷键(option+shift+f)格式化文档,具体快捷键可通过右键菜单查看
* Script
    * 功能: 参数格处理的js脚本
    * 提供一个函数名为buildParam的函数,发起请求前会调用这个函数,依次传递key value...
    * 提供一个函数名为buildMessage的函数,发送webSocket参数前,会调用该函数
    * buildParam 和 buildMessage 两个函数,具体描述请看下边的js代码
* Version
    * 功能: API配置信息(Header,Query,Body,Script)的变化版本
    * ~~每次触发保存时会进行比较,如果有变化,则进行版本记录~~
    * 2025-11-05: ~~取消保存时触发版本记录功能,修改为通过 点击 SaveVersion 进行版本记录~~
    * 2026-01-28: SaveVersion 按钮 迁移到执行按钮的下拉内
    * 每个API最多记录30条
    * Use This Version: 使用当前版本
    * Clear Cache: 仅清除该API对应的版本记录

\`\`\`js
// Script 参数处理脚本
/**
 * 处理Query Body(json/...)的参数
 * @param reqNum 第几次请求
 * @param key key
 * @param value value
 * @param path key路径
 * @param desc 描述
 * @param type 类型
 * @param check 是否选中
 * @returns {*}
 */
function buildParam(reqNum, key, value, path, desc, type, check) {
  console.log("build param script:", {reqNum, key, value, path, desc, type, check})
  return value;
}

/**
 * 对WebSocket参数以及bodyType=xml进行处理
 * @param message
 * @returns {*}
 */
function buildMessage(message) {
  // 自定义参数处理
  return message;
}
\`\`\`

## API 执行结果

* ResponseData: 单次请求结果的返回值
    * 可以通过<span style="color:red">响应字段描述</span>功能,添加返回值的描述文档信息
* ResponseHeader: 单次请求的响应头信息
* RequestTime: 每次请求耗时的折线图,最接近真实的请求耗时
* 结果: 执行多次次的响应数据展示,内包含{ResponseData,ResponseHeader},仅在<span style="color:red">[全局执行次数配置]</span>请求后展示
* <span style="color:red">注:</span>如果是下载文件类型的接口,返回值会变成{fileName:"fileName",download:点我保存}.可以通过点击[点我保存]完成文件下载
* 执行结果右键菜单
    * ToThisHeader   :将当前选中的key value 设置给当前API的header
    * ToGlobalHeader :将当前选中的key value 设置给全局的header

## 请求字段描述 || 响应字段描述

* 功能: 添加Body(json) 请求字段描述 或者 响应字段描述
* 字段: 参数名 参数类型 描述
* 其他功能:
    * [Analysis Java Document With Swagger] 按钮
        * 该按钮可以提供将Java文件转换成文档[ToDocument]的功能,支持上传[UploadJavaFile]和上传后内容的编辑;
        * 如果JavaCode有Swagger（ApiMode，ApiModelProperty）注解,会通过这些注解解析出部分信息;当然没有这些注解也可以
        * 如果是泛型类,需要将泛型类修改为目标类
        * 如果这个Java文件中的某个属性使用的是另外一个java文件，也可以一起选择上传，同样会自动进行关联解析;
        * 使用的Java文件最好是Lombok标注的,源码内没有get set函数,(暂未支持get set函数的解析)(?)
    * [To Body Param] 按钮
        * 该按钮只有Body-json内的字段描述下才存在
        * 作用是将字段描述转换成对应的json参数

## 其他使用小技巧

### 插件请求以及参数值修改

> 安装了篡改猴插件以及脚本,且开启了PluginReq,将通过插件发起请求  
> 一般用于测试服务器和目标API不在同一局域网下但PC能访问到目标API时的API接口

\`\`\`mermaid
graph TB
    %% ===== 左侧区域 =====
    A["提供API接口的服务器 工具服务器能访问到的IP"]
    B["API测试工具部署的服务器 (工具服务器) 192.168.18.100"]

    %% ===== 右上 路由器 =====
    D["路由器 ip:192.168.18.101 提供: 10.10.0.10/100"]

    %% ===== 内网灰色区域 =====
    subgraph 内网 10.10.0.0/24
        C["用户1PC 10.10.0.11"]
        E["用户2PC 10.10.0.12"]
    end

    %% ===== 关系 =====
    
    %% 工具服务器 -> API服务器
    B -->|访问API| A

    %% 用户通过服务器访问API（正确方向）
    C -->|通过服务器访问API| B

    %% 用户通过插件访问API
    C -->|通过插件访问API| A

    %% 用户1 -> 用户2
    C -->|通过插件访问API| E

    %% 路由器到内网
    D --> C
    D --> E
\`\`\` 

* 插件请求,需要为浏览器安装<a href='https://www.tampermonkey.net/index.php' target="_blank">篡改猴</a>插件
* 允许运行用户脚本;找到插件,右键选择管理扩展程序,开启允许运行用户脚本
* 添加如下脚本

\`\`\`js
// ==UserScript==
// @name         CORS Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  油猴跨域脚本
// @author       fusheng.zhang
// @match        192.168.18.192/view/pc_scmp/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        unsafeWindow
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  // 注: 修改 @match 为你自己的路径 // 支持插件请求
  unsafeWindow._GM_xmlHttpRequest = GM?.xmlHttpRequest || GM_xmlhttpRequest;
})
\`\`\`

# API组合文档

## 目录结构

> 按照前端的页面进行管理.或者按照功能管理.或者按照需求管理等等
> 可以单纯的是一个描述文档
> 可以对一组API的使用进行详细的描述

## 新建/编辑

* 可以通过API管理的功能[**_选择API_**],批量选择多个API然后使用[**_编辑API组合文档_**]生成使用文档
* 也可以通过API组合文档的[**_新建子文档_**],关联多个API进而生成使用文档
* 文档内容支持协同编辑
* [2026-05-23]支持文档不关联API

## 新建/编辑的下拉

* 分享文档
* 初始化文档
* 下载文档

## 注意:如果组合文档关联了API文档

* 无论通过何种方式生成使用文档,都会先通过关联的api标识,去查询这一组api共同关联的使用文档
    * 如果存在共同的使用文档,则会回显该文档,否则就是新建api文档
* 即:一组api只能关联一个文档

# Api Swagger

> 对Swagger 文档的解析
`,C={},v={urlMapping:C,_is_md:!0,toJSON:()=>p,toString:()=>p,valueOf:()=>p},P=`# 定时任务调度中心

> 定时任务调度中心

* 支持Cron 表达式,以及RRULE规则表达式
`,w={},E={urlMapping:w,_is_md:!0,toJSON:()=>P,toString:()=>P,valueOf:()=>P},I=`# AI 助手

* 可以通过AI对话窗口的钥匙图标配置API秘钥信息
* 该秘钥存储在你的本地,**绝对安全**
`,R={},T={urlMapping:R,_is_md:!0,toJSON:()=>I,toString:()=>I,valueOf:()=>I},k={name:"NBA-API-DOC",components:{},setup(){return{}},emits:[],props:{},data(){return{folders:[]}},computed:{el(){return this.$refs.docWrapper.$el},content(){return[f,v,T,E]}},watch:{},created(){},mounted(){},methods:{handleNodeClick(t){const n=this.el.querySelector(`[data-tree-id='${t.uniFlag}']`);n&&n.scrollIntoView({behavior:"smooth"})},onDocChange(){let t=[],n=[],d=0;Array.from(this.el.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((o,i)=>{const e=parseInt(o.tagName.slice(1),10),r=y("dti_");o.setAttribute("data-tree-id",r);const a={id:++d,pid:0,label:o.textContent.trim(),uniFlag:r};for(;n.length&&n[n.length-1].level>=e;)n.pop();n.length>0&&(a.pid=n[n.length-1].id),n.push({...a,level:e}),t.push(a)}),this.folders=g(t,"id","pid")}}},x={class:"nba-api-doc"};function N(t,n,d,o,i,e){const r=l("el-tree"),a=l("s3-scroll"),u=l("s3-doc");return S(),h("div",x,[s(a,{class:"folder"},{default:c(()=>[s(r,{data:i.folders,onNodeClick:e.handleNodeClick},null,8,["data","onNodeClick"])]),_:1}),s(a,null,{default:c(()=>[s(u,{ref:"docWrapper",class:"wrapper_detail",content:e.content,onChange:e.onDocChange},null,8,["content","onChange"])]),_:1})])}const M=m(k,[["render",N],["__scopeId","data-v-776cab1d"]]);export{M as default};
