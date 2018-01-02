/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/Popup','sap/ui/core/theming/Parameters','sap/ui/core/RenderManager','./library'],function(q,C,I,P,a,R,l){"use strict";var T=C.extend("sap.ui.ux3.ToolPopup",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.ui.ux3",properties:{title:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconHover:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconSelected:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},modal:{type:"boolean",group:"Behavior",defaultValue:false},inverted:{type:"boolean",group:"Misc",defaultValue:true},autoClose:{type:"boolean",group:"Misc",defaultValue:false},maxHeight:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},maxWidth:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},openDuration:{type:"int",group:"Misc",defaultValue:400},closeDuration:{type:"int",group:"Misc",defaultValue:400}},defaultAggregation:"content",aggregations:{buttons:{type:"sap.ui.core.Control",multiple:true,singularName:"button"},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{initialFocus:{type:"sap.ui.core.Control",multiple:false},opener:{type:"sap.ui.core.Control",multiple:false},defaultButton:{type:"sap.ui.core.Control",multiple:false}},events:{open:{},close:{allowPreventDefault:true},enter:{parameters:{originalEvent:{type:"object"},originalSrcControl:{type:"sap.ui.core.Control"}}},iconChanged:{},closed:{},opened:{}}}});T.ARROW_LEFT=new RegExp(/my:(left|begin)([-+]\d*\%?)?\|[a-z]+([-+]\d*\%?)? at:(right|end)\|[a-z]+/);T.ARROW_RIGHT=new RegExp(/my:(right|end)([-+]\d*\%?)?\|[a-z]+([-+]\d*\%?)? at:(left|begin)\|[a-z]+/);T.ARROW_UP=new RegExp(/my:[a-z]+([-+]\d*\%?)?\|top([-+]\d*\%?)? at:[a-z]+\|bottom/);T.ARROW_DOWN=new RegExp(/my:[a-z]+([-+]\d*\%?)?\|bottom([-+]\d*\%?)? at:[a-z]+\|top/);(function(){T.prototype.init=function(){this.oPopup=null;this._bPositionSet=false;this._mParameters={};this._mParameters.that=this;this._mParameters.firstFocusable=this.getId()+"-firstFocusable";this._mParameters.lastFocusable=this.getId()+"-lastFocusable";this._bFocusSet=false;this._proxyOpened=q.proxy(p,this);this._proxyClosed=q.proxy(o,this);this._proxyFixSize=q.proxy(f,this);this._proxyOnResize=q.proxy(O,this);s(this);};T.prototype.exit=function(){if(this.oPopup){this.oPopup.detachOpened(this._proxyOpened);this.oPopup.detachClosed(this._proxyClosed);this.oPopup.destroy();delete this.oPopup;}delete this._bPositionSet;delete this._mParameters;delete this._bFocusSet;delete this._bPreventRestoreFocus;delete this._proxyOpened;delete this._proxyClosed;delete this._bRTL;delete this._sArrowDir;delete this._oArrowIcon;delete this._bThemeInverted;delete this._sInitialFocusId;};var _=function(i){var t=i;if(!t._bFocusSet){b(t);}else{t._sInitialFocusId=t.oPopup._sInitialFocusId;}return t._sInitialFocusId;};var b=function(j){var E;var F;var t=j;var k=[t._mParameters.firstFocusable,t._mParameters.lastFocusable];var m=q(":sapTabbable",t.$()).get();for(var i=0;i<m.length;i++){if(k.indexOf(m[i].id)===-1){E=m[i];break;}}F=q(E).control();if(F[0]){var n=F[0].getFocusDomRef();E=n||E;}else{E=q.sap.domById(k[0]);}if(E){q.sap.focus(E);t._sInitialFocusId=E.id;}};function c(t,i){var j,k;if(!i){return null;}j=sap.ui.getCore().byId(i);while(!j&&j!==t){if(!i||!document.getElementById(i)){return null;}k=document.getElementById(i).parentNode;i=k.id;j=sap.ui.getCore().byId(i);}return j;}T.prototype.getFocusDomRef=function(){var i;var j=c(this,this._sInitialFocusId);if(!j){this._bFocusSet=false;i=_(this);j=c(this,i);}return j?j.getDomRef():this.getDomRef();};T.prototype.onfocusin=function(E){this._mParameters.event=E;this._mParameters.$FocusablesContent=q(":sapTabbable",this.$("content"));this._mParameters.$FocusablesFooter=q(":sapTabbable",this.$("buttons"));this.oPopup.focusTabChain(this._mParameters);};var f=function(){var t=this.$();var v=0;var m=this.getMaxHeight();var M=m?parseInt(m,10):0;var i=this.getMaxWidth();if(i){var j=parseInt(i,10);var B=t.css("border-left-width");var k=parseInt(B,10);var n=t.css("border-right-width");var w=parseInt(n,10);var x=t.css("padding-left");var y=parseInt(x,10);var z=t.css("padding-right");var A=parseInt(z,10);j-=k+y+A+w;t.css("max-width",j+"px");}else{t.css("max-width","");}var D=t.css("padding-top");var E=parseInt(D,10);var F=t.css("padding-bottom");var G=parseInt(F,10);var H=t.css("border-top-width");var J=parseInt(H,10);var K=t.css("border-bottom-width");var L=parseInt(K,10);var N=E+G+J+L;var Q=q(document).scrollTop();var U=t.rect();var V=U.top-Q+t.outerHeight(true);var W=q(window).height();var X=(V>W)&&(M===0);var Y=0;if(X){var $=q.sap.byId(this.getOpener());var Z=$.rect();var a1=Z.top-Q+$.outerHeight(true);var b1=this.oPopup._getPositionOffset();if(V>a1&&b1.length>0){Y=Math.abs(parseInt(b1[1],10));if((V-Y)<W){X=false;var c1="Offset of "+Y+" pushes ToolPopup out of the window";q.sap.log.warning(c1,"","sap.ui.ux3.ToolPopup");}}M=M?M:W-U.top;}t.toggleClass("sapUiUx3TPLargeContent",X);if(M||X){t.css("max-height",M+"px");var d1=this.$("title");var e1=this.$("title-separator");var f1=this.$("buttons");var g1=this.$("buttons-separator");v=M>0?M:W-U.top-G-Y;v-=N;v-=d1.outerHeight(true);v-=e1.outerHeight(true);v-=g1.outerHeight(true);v-=f1.length>0?f1.outerHeight(true):0;v=parseInt(v,10);var h1=this.$("content");h1.css("max-height",v+"px");h1.toggleClass("sapUiUx3TPLargeContent",true);}S(this);};var p=function(){this._proxyFixSize();if(!this._sInitialFocusId){var i=_(this);if(i!==sap.ui.getCore().getCurrentFocusedControlId()){var j=q.sap.byId(i);j.focus();}}if(!this._sResizeID){this._sResizeID=sap.ui.core.ResizeHandler.register(this.$('content')[0],this._proxyOnResize);}this.fireOpened();};T.prototype.isOpen=function(){return this.oPopup&&(this.oPopup.getOpenState()=="OPENING"||this.oPopup.getOpenState()=="OPEN");};T.prototype.willBeClosed=function(){var i=this.oPopup&&this.oPopup.getOpenState();return i!==sap.ui.core.OpenState.OPENING&&i!==sap.ui.core.OpenState.OPEN;};T.prototype.open=function(m,i){this._my=m;this._at=i;this._sArrowDir=g(this);var $=null;this.sOffset="";u(this);if(!this._bPositionSet){var j=0;var k=0;if(!this._my){this._my=P.Dock.BeginTop;}if(!this._at){this._at=P.Dock.EndTop;}$=q.sap.domById(this.getOpener());if($){switch(this._sArrowDir){case"Up":j=0;k=this.iArrowWidth;break;case"Down":j=0;k=-this.iArrowWidth;break;case"Right":j=-this.iArrowWidth;break;default:case"Left":j=this.iArrowWidth;break;}j=parseInt(j,10);k=parseInt(k,10);this.sOffset=""+j+" "+k;this.setPosition(this._my,this._at,$,this.sOffset,"none");}else{this.setPosition(P.Dock.BeginTop,P.Dock.BeginTop,window,"0 0","fit");q.sap.log.warning("No opener set. Using a default position for Popup","","sap.ui.ux3.ToolPopup");}this._bPositionSet=false;}this._ensurePopup();var A=this.getAutoClose();var M=this.getModal();if(A&&M){q.sap.log.warning("A modal & autoclose ToolPopup will not work properly. Therefore 'autoclose' will be deactived!");A=false;}this.oPopup.setAutoClose(A);this.oPopup.setModal(M);this._oPreviousFocus=P.getCurrentFocusInfo();this.fireOpen();d(this);this.oPopup.open(this.getOpenDuration(),this._my,this._at,$,this.sOffset,"",true);S(this);return this;};var d=function(t){if(!t.getOpener()){var i="";if(t.oPopup){if(t.oPopup._oPosition.of instanceof sap.ui.core.Element){i=t.oPopup._oPosition.of.getId();}else{if(t.oPopup._oPosition.of.length>0){i=t.oPopup._oPosition.of[0].id;}else{i=t.oPopup._oPosition.of.id;}}}if(i!==""){t.setAssociation("opener",i,true);}else{q.sap.log.error("Neither an opener was set properly nor a corresponding one can be distinguished","","sap.ui.ux3.ToolPopup");}}};var s=function(t){var i="sapUiUx3ToolPopupArrowWidth";t.sArrowWidth=a.get(i);t.iArrowWidth=parseInt(t.sArrowWidth,10);i="sapUiUx3ToolPopupArrowHeight";t.sArrowHeight=a.get(i);t.iArrowHeight=parseInt(t.sArrowHeight,10);i="sapUiUx3ToolPopupArrowRightMarginCorrection";t.sArrowPadding=a.get(i);t.iArrowPadding=parseInt(t.sArrowPadding,10);i="sapUiUx3ToolPopupArrowRightMarginCorrectionInverted";t.sArrowPaddingInverted=a.get(i);t.iArrowPaddingInverted=parseInt(t.sArrowPaddingInverted,10);};var g=function(t){var D="Left";var m=t._my;var i=t._at;if(!m&&t.oPopup){m=t.oPopup._oPosition.my;}if(!i&&t.oPopup){i=t.oPopup._oPosition.at;}t._bHorizontalArrow=false;if(m&&i){var M=m.split(" ");var A=i.split(" ");var j="my:"+M[0]+"|"+M[1];j+=" at:"+A[0]+"|"+A[1];if(T.ARROW_LEFT.exec(j)){t._bHorizontalArrow=true;D="Left";}else if(T.ARROW_RIGHT.exec(j)){t._bHorizontalArrow=true;D="Right";}else if(T.ARROW_UP.exec(j)){D="Up";}else if(T.ARROW_DOWN.exec(j)){D="Down";}if(t.getDomRef()&&t.isOpen()){var $=t.$();var k=$.rect();var n=q.sap.byId(t.getOpener());var v=n.rect();if(v){if(t._bHorizontalArrow){var w=k.left+$.outerWidth(true)+t.iArrowWidth;var x=v.left+n.outerWidth(true);if(w<=x){D="Right";}else{D="Left";}}else{var y=k.top+$.outerHeight(true)+t.iArrowWidth;var z=v.top+n.outerHeight(true);if(y<=z){D="Down";}else{D="Up";}}}}}return D;};var S=function(t){var k="",v=0,z=0,H=t.iArrowHeight/2,i=sap.ui.getCore().getConfiguration().getRTL(),A,j=t.$().rect(),m=q.sap.byId(t.getOpener()),n=m.rect(),w=0,$=t.$("arrow");if(!t.getDomRef()){return;}t._sArrowDir=g(t);A=t._sArrowDir;if(i){if(t._sArrowDir==="Right"){A="Left";}else if(t._sArrowDir==="Left"){A="Right";}}if(!n){q.sap.log.warning("Opener wasn't set properly. Therefore arrow will be at a default position","","sap.ui.ux3.ToolPopup");}if(!t._my&&t.oPopup){t._my=t.oPopup._oPosition.my;}if(t._bHorizontalArrow){k="top";if(n){w=parseInt(t.$().css('border-top-width'),10)||0;z=parseInt(n.top-w-j.top,10);v=Math.round(z+n.height/2-H);v=v+H>j.height?v-t.iArrowHeight:v;}}else{k="left";if(n){if(i){k="right";w=parseInt(t.$().css('border-right-width'),10)||0;z=parseInt(j.left+j.width-n.left-n.width-w,10);}else{w=parseInt(t.$().css('border-left-width'),10)||0;z=parseInt(n.left-j.left-w,10);}v=Math.round(z+n.width/2-H);v=v+H>j.width?v-t.iArrowHeight:v;}}if(!n){v=t.iArrowHeight;}var x="";if($.hasClass("sapUiUx3TPNewArrow")){x="sapUiUx3TPNewArrow sapUiUx3TPNewArrow";}else{x=t.isInverted()?"sapUiUx3TPArrow sapUiTPInverted sapUiUx3TPArrow":"sapUiUx3TPArrow sapUiUx3TPArrow";}$.attr("class",x+A);if(A==="Right"){var W=j.width;if(t.isInverted()){W+=t.iArrowPaddingInverted;}else{W+=t.iArrowPadding;}if(i){$.css("right",W+"px");}else{$.css("left",W+"px");}}else{$.css({"left":"","right":""});}v=parseInt(v,10);v=v<-w?-w:v;$.css(k,v+"px");};T.prototype.onsapescape=function(){if(this.fireClose()){this.close();}};var o=function(E){if(!this._bPreventRestoreFocus){P.applyFocusInfo(this._oPreviousFocus);}if(this.getDomRef()){R.preserveContent(this.getDomRef());this.$().remove();}this.fireClosed();};T.prototype.close=function(i){if(this.oPopup&&this.oPopup.isOpen()){if(this._sResizeID){sap.ui.core.ResizeHandler.deregister(this._sResizeID);delete this._sResizeID;}this.oPopup.close(this.getCloseDuration());this._bPreventRestoreFocus=i;}return this;};T.prototype.getEnabled=function(){var i=this.oPopup?this.oPopup.getOpenState():sap.ui.core.OpenState.CLOSED;return i===sap.ui.core.OpenState.OPENING||i===sap.ui.core.OpenState.OPEN;};T.prototype.onsapenter=function(E){var i=this.getDefaultButton();var F=sap.ui.getCore().byId(i);if(i&&F&&q.contains(this.getDomRef(),F.getDomRef())){if(F instanceof sap.ui.commons.Button){var $=F.$();$.click();$.focus();}}E.preventDefault();E.stopPropagation();};T.prototype.onBeforeRendering=function(){var i=this.getInitialFocus()||this._sInitialFocusId;var D=this.getDefaultButton();this._bFocusSet=true;if(i){this.oPopup.setInitialFocusId(i);}else if(D){this.oPopup.setInitialFocusId(D);}else{this._bFocusSet=false;}this._bRTL=sap.ui.getCore().getConfiguration().getRTL();};T.prototype._ensurePopup=function(){if(!this.oPopup){this.oPopup=new P(this,false,true,false);this.oPopup.attachOpened(this._proxyOpened);this.oPopup.attachClosed(this._proxyClosed);var t=this;this.oPopup._applyPosition=function(){P.prototype._applyPosition.apply(t.oPopup,arguments);var i=t.oPopup._oLastPosition.of;if(!i){t.oPopup.close();}else{var $=q.sap.byId(i.id);if(t._bPositionSet){if(!$.hasClass("sapUiUx3ShellTool")){t._my=t.oPopup._oLastPosition.my;t._at=t.oPopup._oLastPosition.at;}}S(t);}};}return this.oPopup;};var O=function(){if(this.getContent().length){this._proxyFixSize();this.oPopup._applyPosition(this.oPopup._oLastPosition);}};T.prototype.setPosition=function(){this._ensurePopup();this.oPopup.setPosition.apply(this.oPopup,arguments);this._bPositionSet=true;d(this);return this;};var e=function(i,t){var j=i;if(t==="content"){r(j);}else if(t==="buttons"){h(j);}j._proxyFixSize();j.oPopup._applyPosition(j.oPopup._oLastPosition);};var r=function(t){var j=t.getDomRef("content");j.innerHTML="";var k=t.getContent();var m=sap.ui.getCore().createRenderManager();for(var i=0;i<k.length;i++){m.renderControl(k[i]);}m.flush(j,true);m.destroy();};var h=function(t){var B=t.getDomRef("buttons");var j=t.getDomRef("buttons-separator");var k=t.getButtons();if(k.length===0){q(B).addClass("sapUiUx3TPButtonRowHidden");q(j).addClass("sapUiUx3TPButtonRowHidden");}else{q(B).removeClass("sapUiUx3TPButtonRowHidden");q(j).removeClass("sapUiUx3TPButtonRowHidden");B.innerHTML="";var m=sap.ui.getCore().createRenderManager();for(var i=0;i<k.length;i++){m.renderControl(k[i]);}m.flush(B,true);m.destroy();}};T.prototype.addContent=function(i){this.addAggregation("content",i,true);if(this.isOpen()){e(this,"content");}return this;};T.prototype.insertContent=function(i,j){this.insertAggregation("content",i,j,true);if(this.isOpen()){e(this,"content");}return this;};T.prototype.removeContent=function(i){this.removeAggregation("content",i,true);if(this.isOpen()){e(this,"content");}return this;};T.prototype.addButton=function(B){this.addAggregation("buttons",B,true);if(this.isOpen()){e(this,"buttons");}return this;};T.prototype.insertButton=function(B,i){this.insertAggregation("buttons",B,i,true);if(this.isOpen()){e(this,"buttons");}return this;};T.prototype.removeButton=function(B){this.removeAggregation("button",B,true);if(this.isOpen()){e(this,"buttons");}return this;};var u=function(t){var i="sapUiUx3ToolPopupInverted";i=a.get(i);t._bThemeInverted=i==="true";};T.prototype.onThemeChanged=function(){u(this);};T.prototype.isInverted=function(){u(this);return this.getInverted()&&this._bThemeInverted;};T.prototype.setAutoCloseAreas=function(A){this._ensurePopup();return this.oPopup.setAutoCloseAreas(A);};T.prototype.addFocusableArea=function(i){this._ensurePopup();if(typeof(i)==="string"){this.oPopup._addFocusableArea("channelId","eventId",{id:i});return this;}else{q.sap.log.error("Wrong type of focusable area ID - string expected","","sap.ui.ux3.ToolPopup");}};T.prototype.removeFocusableArea=function(i){this._ensurePopup();if(typeof(i)==="string"){this.oPopup._removeFocusableArea("channelId","eventId",{id:i});return this;}else{q.sap.log.error("Wrong type of focusable area ID - string expected","","sap.ui.ux3.ToolPopup");}};}());T.prototype.setIcon=function(i){this.setProperty("icon",i,true);this.fireIconChanged();return this;};T.prototype.setIconHover=function(i){this.setProperty("iconHover",i,true);this.fireIconChanged();return this;};T.prototype.setIconSelected=function(i){this.setProperty("iconSelected",i,true);this.fireIconChanged();return this;};T.prototype.getIconSelected=function(){return this.getProperty("iconSelected")||this.getProperty("iconHover");};T.prototype.setMaxWidth=function(m){var p=/[0-9]+px/;if(p.test(m)){this.setProperty("maxWidth",m);}else{q.sap.log.error("Only values in pixels are possible","","sap.ui.ux3.ToolPopup");}};return T;},true);