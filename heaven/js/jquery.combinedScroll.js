/* 
Version 2.3 
File created by Alex Turnwall, www.turnwall.com
This file simply combines some great plugins in one file for ease of use in the demo. 
All plugins are the rights and licenses of their original authors, as indicated below:
*/

/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.5 BETA
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);


/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 *
 * Note: small Edits by Alex Turnwall to provide compatibility for jQuery UI features
 */
 
;(function(e,t,n,r){var i=function(r,i){this.elem=r;this.$elem=e(r);this.options=i;this.metadata=this.$elem.data("plugin-options");this.$nav=this.$elem.find("a");this.$win=e(t);this.sections={};this.didScroll=false;this.$doc=e(n);this.docHeight=this.$doc.height()};i.prototype={defaults:{currentClass:"current",changeHash:false,easing:"swing",filter:"",scrollSpeed:750,scrollOffset:0,scrollThreshold:.5,begin:false,end:false,scrollChange:false},init:function(){var t=this;t.config=e.extend({},t.defaults,t.options,t.metadata);if(t.config.filter!==""){t.$nav=t.$nav.filter(t.config.filter)}t.$nav.on("click.onePageNav",e.proxy(t.handleClick,t));t.getPositions();t.bindInterval();t.$win.on("resize.onePageNav",e.proxy(t.getPositions,t));return this},adjustNav:function(e,t){e.$elem.find("."+e.config.currentClass).removeClass(e.config.currentClass, 500);t.addClass(e.config.currentClass,500)},bindInterval:function(){var e=this;var t;e.$win.on("scroll.onePageNav",function(){e.didScroll=true});e.t=setInterval(function(){t=e.$doc.height();if(e.didScroll){e.didScroll=false;e.scrollChange()}if(t!==e.docHeight){e.docHeight=t;e.getPositions()}},250)},getHash:function(e){return e.attr("href").split("#")[1]},getPositions:function(){var t=this;var n;var r;var i;t.$nav.each(function(){n=t.getHash(e(this));i=e("#"+n);if(i.length){r=i.offset().top;t.sections[n]=Math.round(r)-t.config.scrollOffset}})},getSection:function(e){var t=null;var n=Math.round(this.$win.height()*this.config.scrollThreshold);for(var r in this.sections){if(this.sections[r]-n<e){t=r}}return t},handleClick:function(n){var r=this;var i=e(n.currentTarget);var s=i.parent();var o="#"+r.getHash(i);if(!s.hasClass(r.config.currentClass)){if(r.config.begin){r.config.begin()}r.adjustNav(r,s);r.unbindInterval();e.scrollTo(o,r.config.scrollSpeed,{axis:"y",easing:r.config.easing,offset:{top:-r.config.scrollOffset},onAfter:function(){if(r.config.changeHash){t.location.hash=o}r.bindInterval();if(r.config.end){r.config.end()}}})}n.preventDefault()},scrollChange:function(){var e=this.$win.scrollTop();var t=this.getSection(e);var n;if(t!==null){n=this.$elem.find('a[href$="#'+t+'"]').parent();if(!n.hasClass(this.config.currentClass)){this.adjustNav(this,n);if(this.config.scrollChange){this.config.scrollChange(n)}}}},unbindInterval:function(){clearInterval(this.t);this.$win.unbind("scroll.onePageNav")}};i.defaults=i.prototype.defaults;e.fn.onePageNav=function(e){return this.each(function(){(new i(this,e)).init()})}})(jQuery,window,document);


$(window).on("load", function() {
	$('nav').onePageNav({
	    currentClass: 'current',
	    changeHash: false,
	    offset:0,
	    scrollSpeed: 1100,
	    scrollThreshold: 0.5,
	    filter: ':not(.external)',
	    easing: 'swing'    
	});
});
