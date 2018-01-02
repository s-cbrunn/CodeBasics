/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/thirdparty/URI","sap/ui/fl/Utils"],function(q,u,F){"use strict";var C=function(p){this._initClientParam();this._initLanguageParam();if(p){this._sXsrfToken=p.XsrfToken;}};C.createConnector=function(p){return new C(p);};C.prototype.DEFAULT_CONTENT_TYPE="application/json; charset=utf-8";C.prototype._sClient=undefined;C.prototype._sLanguage=undefined;C.prototype._aSentRequestListeners=[];C.prototype._sRequestUrlPrefix="";C.attachSentRequest=function(c){if(typeof c==="function"&&C.prototype._aSentRequestListeners.indexOf(c)===-1){C.prototype._aSentRequestListeners.push(c);}};C.detachSentRequest=function(c){var i=C.prototype._aSentRequestListeners.indexOf(c);if(i!==-1){C.prototype._aSentRequestListeners.splice(i,1);}};C.prototype._initClientParam=function(){var c=F.getClient();if(c){this._sClient=c;}};C.prototype._initLanguageParam=function(){var l;l=F.getUrlParameter("sap-language")||F.getUrlParameter("sap-ui-language");if(l){this._sLanguage=l;}};C.prototype.setRequestUrlPrefix=function(r){this._sRequestUrlPrefix=r;};C.prototype._resolveUrl=function(r){if(!q.sap.startsWith(r,"/")){r="/"+r;}r=this._sRequestUrlPrefix+r;var U=u(r).absoluteTo("");return U.toString();};C.prototype._getDefaultHeader=function(){var h={headers:{"X-CSRF-Token":this._sXsrfToken||"fetch"}};return h;};C.prototype._getDefaultOptions=function(m,c,d){var o;if(!c){c=this.DEFAULT_CONTENT_TYPE;}else if(c.indexOf("charset")===-1){c+="; charset=utf-8";}o=q.extend(true,this._getDefaultHeader(),{type:m,async:true,contentType:c,processData:false,headers:{"Content-Type":c}});if(d&&o.contentType.indexOf("application/json")===0){o.dataType="json";if(typeof d==="object"){o.data=JSON.stringify(d);}else{o.data=d;}}else if(d){o.data=d;}if(m==="DELETE"){delete o.data;delete o.contentType;}return o;};C.prototype.send=function(U,m,d,o){m=m||"GET";m=m.toUpperCase();o=o||{};U=this._resolveUrl(U);if(o.success||o.error){var e="Success and error handler are not allowed in mOptions";throw new Error(e);}var c=o.contentType||this.DEFAULT_CONTENT_TYPE;o=q.extend(true,this._getDefaultOptions(m,c,d),o);return this._sendAjaxRequest(U,o);};C.prototype._getMessagesFromXHR=function(x){var a,m,l,i;m=[];try{a=JSON.parse(x.responseText);if(a&&a.messages&&a.messages.length>0){l=a.messages.length;for(i=0;i<l;i++){m.push({severity:a.messages[i].severity,text:a.messages[i].text});}}}catch(e){}return m;};C.prototype._sendAjaxRequest=function(U,o){var t=this;var f="/sap/bc/lrep/actions/getcsrftoken/";var m={headers:{"X-CSRF-Token":"fetch"},type:"HEAD"};if(this._sClient){m.headers["sap-client"]=this._sClient;}return new Promise(function(r,a){function h(d,s,x){var n=x.getResponseHeader("X-CSRF-Token");t._sXsrfToken=n||t._sXsrfToken;var e=x.getResponseHeader("etag");var g={status:s,etag:e,response:d};r(g);q.each(t._aSentRequestListeners,function(i,j){j(g);});}function b(d,s,x){t._sXsrfToken=x.getResponseHeader("X-CSRF-Token");o.headers=o.headers||{};o.headers["X-CSRF-Token"]=t._sXsrfToken;q.ajax(U,o).done(h).fail(function(x,s,e){var E=new Error(e);E.status="error";E.code=x.statusCode().status;E.messages=t._getMessagesFromXHR(x);a(E);});}function c(x,s,e){if(x.status===403){q.ajax(f,m).done(b).fail(function(x,s,e){a({status:"error"});});}else{if(o&&o.type==="DELETE"&&x.status===404){r();}else{var d;d={status:"error"};d.code=x.statusCode().status;d.messages=t._getMessagesFromXHR(x);a(d);}}}var R=true;if(o&&o.type){if(o.type==="GET"||o.type==="HEAD"){R=false;}}else{if(t._sXsrfToken&&t._sXsrfToken!=="fetch"){R=false;}}if(R){q.ajax(f,m).done(b).fail(function(x,s,e){a({status:"error"});});}else{q.ajax(U,o).done(h).fail(c);}});};C.prototype.loadChanges=function(c,p){var t=this;var o={};var s=c.name;var U="/sap/bc/lrep/flex/data/";p=p||{};if(!s){return Promise.reject(new Error("Component name not specified"));}if(p.url){U=p.url;}else{if(p.cacheKey){o.cache=true;U+="~"+p.cacheKey+"~/";}U+=s;}if(p.siteId){if(!o.headers){o.headers={};}o.headers={"X-LRep-Site-Id":p.siteId};}if(p.layer){U+="&upToLayerType="+p.layer;}if(p.appDescriptor){if(p.appDescriptor["sap.app"]){if(!o.headers){o.headers={};}o.headers={"X-LRep-AppDescriptor-Id":p.appDescriptor["sap.app"].id};}}if(this._sClient){U+="&sap-client="+this._sClient;}if(c.appVersion&&(c.appVersion!==F.DEFAULT_APP_VERSION)){U+="&appVersion="+c.appVersion;}U=U.replace("&","?");return this.send(U,undefined,undefined,o).then(function(r){return{changes:r.response,componentClassName:s,etag:r.etag};},function(e){if(e.code===404||e.code===405){return t._loadChangesBasedOnOldRoute(s);}else{throw(e);}});};C.prototype.loadSettings=function(){var U="/sap/bc/lrep/flex/settings";if(this._sClient){U+="?sap-client="+this._sClient;}return this.send(U,undefined,undefined,{}).then(function(r){return r.response;});};C.prototype._loadChangesBasedOnOldRoute=function(c){var r,p;try{r=q.sap.getResourceName(c,"-changes.json");}catch(e){return Promise.reject(e);}p={async:true,dataType:"json",failOnError:true,headers:{"X-UI5-Component":c}};if(this._sClient){p.headers["sap-client"]=this._sClient;}return q.sap.loadResource(r,p).then(function(R){return{changes:R,componentClassName:c};});};C.prototype._buildParams=function(p){if(!p){p=[];}if(this._sClient){p.push({name:"sap-client",value:this._sClient});}if(this._sLanguage){p.push({name:"sap-language",value:this._sLanguage});}var r="";var l=p.length;for(var i=0;i<l;i++){if(i===0){r+="?";}else if(i>0&&i<l){r+="&";}r+=p[i].name+"="+p[i].value;}return r;};C.prototype._getUrlPrefix=function(i){if(i){return"/sap/bc/lrep/variants/";}return"/sap/bc/lrep/changes/";};C.prototype.create=function(p,c,i){var r=this._getUrlPrefix(i);var P=[];if(c){P.push({name:"changelist",value:c});}r+=this._buildParams(P);return this.send(r,"POST",p,null);};C.prototype.update=function(p,c,s,i){var r=this._getUrlPrefix(i);r+=c;var P=[];if(s){P.push({name:"changelist",value:s});}r+=this._buildParams(P);return this.send(r,"PUT",p,null);};C.prototype.deleteChange=function(p,i){var r=this._getUrlPrefix(i);r+=p.sChangeName;var P=[];if(p.sLayer){P.push({name:"layer",value:p.sLayer});}if(p.sNamespace){P.push({name:"namespace",value:p.sNamespace});}if(p.sChangelist){P.push({name:"changelist",value:p.sChangelist});}r+=this._buildParams(P);return this.send(r,"DELETE",{},null);};C.prototype.getStaticResource=function(n,N,t,i){var a="/sap/bc/lrep/content/";var r=a;r+=n+"/"+N+"."+t;var p=[];if(!i){p.push({name:"dt",value:"true"});}r+=this._buildParams(p);return this.send(r,"GET",null,null);};C.prototype.getFileAttributes=function(n,N,t,l){var a="/sap/bc/lrep/content/";var r=a;r+=n+"/"+N+"."+t;var p=[];p.push({name:"metadata",value:"true"});if(l){p.push({name:"layer",value:l});}r+=this._buildParams(p);return this.send(r,"GET",null,null);};C.prototype.upsert=function(n,N,t,l,c,s,a){var b=this;return Promise.resolve(b._fileAction("PUT",n,N,t,l,c,s,a));};C.prototype.deleteFile=function(n,N,t,l,c){return this._fileAction("DELETE",n,N,t,l,null,null,c);};C.prototype._fileAction=function(m,n,N,t,l,c,s,a){var A="/sap/bc/lrep/content/";var r=A;r+=n+"/"+N+"."+t;var p=[];p.push({name:"layer",value:l});if(a){p.push({name:"changelist",value:a});}r+=this._buildParams(p);var o={contentType:s||this.DEFAULT_CONTENT_TYPE};return this.send(r,m.toUpperCase(),c,o);};C.prototype.publish=function(o,n,t,O,T,s,c){var a="/sap/bc/lrep/actions/publish/";var r=a;r+=o+"/"+n+"."+t;var p=[];if(O){p.push({name:"layer",value:O});}if(T){p.push({name:"target-layer",value:T});}if(s){p.push({name:"target-namespace",value:s});}if(c){p.push({name:"changelist",value:c});}r+=this._buildParams(p);return this.send(r,"POST",{},null);};C.prototype.listContent=function(n,l){var r="/sap/bc/lrep/content/";r+=n;var p=[];if(l){p.push({name:"layer",value:l});}r+=this._buildParams(p);return this.send(r,"GET",null,null);};return C;},true);
