/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/support/ToolsAPI','sap/ui/thirdparty/URI'],function(q,T,U){"use strict";var D=function(c){this._oCore=c;};D.prototype.getAppInfo=function(){var a=[];for(var c in this._oCore.mObjects.component){var b=this._oCore.mObjects.component[c];var s=b.getMetadata().getManifestEntry('sap.app');a.push(s);}return a;};D.prototype.getTechInfoJSON=function(){var c=T.getFrameworkInformation();var t={sapUi5Version:null,version:c.commonInformation.version,build:c.commonInformation.buildTime,change:c.commonInformation.lastChange,jquery:c.commonInformation.jquery,useragent:c.commonInformation.userAgent,docmode:c.commonInformation.documentMode,debug:c.commonInformation.debugMode,bootconfig:c.configurationBootstrap,config:c.configurationComputed,libraries:c.libraries,loadedLibraries:c.loadedLibraries,modules:c.loadedModules,uriparams:c.URLParameters,appurl:c.commonInformation.applicationHREF,title:c.commonInformation.documentTitle,statistics:c.commonInformation.statistics,resourcePaths:[],themePaths:[],locationsearch:document.location.search,locationhash:document.location.hash};var m=q.sap.getAllDeclaredModules();var r=[];for(var i=0;i<m.length;i++){r.push({moduleName:m[i],relativePath:q.sap.getResourcePath(m[i]),absolutePath:U(q.sap.getResourcePath(m[i])).absoluteTo(document.location.origin+document.location.pathname).toString()});}t.resourcePaths=r;var l=this._oCore.getLoadedLibraries();r=[];for(var n in l){var p=this._oCore._getThemePath(n,this._oCore.oConfiguration.theme);r.push({theme:this._oCore.oConfiguration.theme,library:n,relativePath:p,absolutePath:U(p).absoluteTo(document.location.origin+document.location.pathname).toString()});}t.themePaths=r;try{t.sapUi5Version={version:sap.ui.getVersionInfo(),path:sap.ui.resource("","sap-ui-version.json")};}catch(e){t.sapUi5Version=null;}return t;};return D;},true);
