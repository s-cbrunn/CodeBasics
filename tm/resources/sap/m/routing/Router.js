/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/routing/Router','./TargetHandler','./Targets'],function(R,T,a){"use strict";var M=R.extend("sap.m.routing.Router",{constructor:function(){this._oTargetHandler=new T();R.prototype.constructor.apply(this,arguments);},destroy:function(){R.prototype.destroy.apply(this,arguments);this._oTargetHandler.destroy();this._oTargetHandler=null;},getTargetHandler:function(){return this._oTargetHandler;},_createTargets:function(c,t){return new a({views:this._oViews,config:c,targets:t,targetHandler:this._oTargetHandler});},fireRouteMatched:function(A){var r=this.getRoute(A.name),t;if(r._oTarget){t=r._oTarget._oOptions;this._oTargetHandler.addNavigation({navigationIdentifier:A.name,transition:t.transition,transitionParameters:t.transitionParameters,eventData:A.arguments,targetControl:A.targetControl,view:A.view,preservePageInSplitContainer:t.preservePageInSplitContainer});}return R.prototype.fireRouteMatched.apply(this,arguments);},fireRoutePatternMatched:function(A){var r=A.name,v;if(this._oTargets&&this._oTargets._oLastDisplayedTarget){v=this._oTargets._getViewLevel(this._oTargets._oLastDisplayedTarget);}this._oTargetHandler.navigate({navigationIdentifier:r,viewLevel:v,askHistory:true});return R.prototype.fireRoutePatternMatched.apply(this,arguments);}});return M;},true);
