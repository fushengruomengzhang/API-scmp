import{a as h}from"./API.sFFd67Fi.js";import{t as u}from"./TASK.d58gGFEY.js";import{a as _}from"./AI.rzyli35r.js";import{s as f}from"../../util/snowflake.util.C5GuLXPM.js";import{o as A}from"../../resources/global.CGLTcxA4.js";/* empty css                                                            */import{_ as I}from"../../App.DPzkY4oU.js";import{C as P,j as s,D as p,Z as l,y as g}from"../../../dep/@vue_runtime-core.js";import"../../util/machine.code.util.DsLB7q5n.js";import"../../util/crypto.util.BkhlrKfd.js";import"../../../dep/crypto-js.js";import"../../util/localStorage.util.CBCAWwci.js";import"../../util/array.util.DRnDYoyI.js";import"../../util/date.util.BBO9beMx.js";import"../../util/object.util.C5UXk33X.js";import"../../../dep/js-base64.js";import"../../../dep/spark-md5.js";import"../../../dep/@vue_reactivity.js";import"../../../dep/@vue_shared.js";const c=`<div class='title'>NBA-API-使用帮助</div>

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
`,C={},S={urlMapping:C,_is_md:!0,toJSON:()=>c,toString:()=>c,valueOf:()=>c},v={name:"NBA-API-DOC",components:{},setup(){return{}},emits:[],props:{},data(){return{folders:[]}},computed:{el(){return this.$refs.docWrapper.$el},content(){return[S,h,_,u]}},watch:{},created(){},mounted(){},methods:{handleNodeClick(o){const e=this.el.querySelector(`[data-tree-id='${o.uniFlag}']`);e&&e.scrollIntoView({behavior:"smooth"})},onDocChange(){let o=[],e=[],i=0;Array.from(this.el.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((r,d)=>{const t=parseInt(r.tagName.slice(1),10),a=f("dti_");r.setAttribute("data-tree-id",a);const n={id:++i,pid:0,label:r.textContent.trim(),uniFlag:a};for(;e.length&&e[e.length-1].level>=t;)e.pop();e.length>0&&(n.pid=e[e.length-1].id),e.push({...n,level:t}),o.push(n)}),this.folders=A(o,"id","pid")}}},k={class:"nba-api-doc"};function N(o,e,i,r,d,t){const a=l("el-tree"),n=l("s3-scroll"),m=l("s3-doc");return g(),P("div",k,[s(n,{class:"folder"},{default:p(()=>[s(a,{data:d.folders,onNodeClick:t.handleNodeClick},null,8,["data","onNodeClick"])]),_:1}),s(n,null,{default:p(()=>[s(m,{ref:"docWrapper",class:"wrapper_detail",content:t.content,onChange:t.onDocChange},null,8,["content","onChange"])]),_:1})])}const V=I(v,[["render",N],["__scopeId","data-v-776cab1d"]]);export{V as default};
