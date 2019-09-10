/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./InputBase','./library','sap/ui/core/InvisibleText'],function(q,I,l,a){"use strict";var C=I.extend("sap.m.ComboBoxTextField",{metadata:{library:"sap.m",properties:{maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},showButton:{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{_buttonLabelText:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}}}});C.prototype.init=function(){I.prototype.init.apply(this,arguments);var r,A;if(sap.ui.getCore().getConfiguration().getAccessibility()){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");A=new a({text:r.getText("COMBOBOX_BUTTON")});this.setAggregation("_buttonLabelText",A,true);}};C.prototype.updateValueStateClasses=function(v,o){I.prototype.updateValueStateClasses.apply(this,arguments);var V=sap.ui.core.ValueState,b=this.getRenderer().CSS_CLASS_COMBOBOXTEXTFIELD,d=this.$();if(o!==V.None){d.removeClass(b+"State "+b+o);}if(v!==V.None){d.addClass(b+"State "+b+v);}};C.prototype.getOpenArea=function(){return this.getDomRef("arrow");};C.prototype.isOpenArea=function(d){var o=this.getOpenArea();return o&&o.contains(d);};C.prototype.onsapenter=function(e){I.prototype.onsapenter.apply(this,arguments);if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();var v=this.getValue(),V=v.length;this.setValue(v);this.selectText(V,V);};C.prototype.bShowLabelAsPlaceholder=sap.ui.Device.browser.msie;C.prototype.getValue=function(){var d=this.getFocusDomRef();if(d){return d.value;}return this.getProperty("value");};C.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef();};C.prototype.getAccessibilityInfo=function(){var i=I.prototype.getAccessibilityInfo.apply(this,arguments);i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_COMBO");return i;};return C;},true);
