
(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);;
/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.2
 */
(function(a){a.fn.bgiframe=(a.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(d){d=a.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:"javascript:false;"},d);var c='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+d.src+'"style="display:block;position:absolute;z-index:-1;'+(d.opacity!==false?"filter:Alpha(Opacity='0');":"")+"top:"+(d.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')":b(d.top))+";left:"+(d.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')":b(d.left))+";width:"+(d.width=="auto"?"expression(this.parentNode.offsetWidth+'px')":b(d.width))+";height:"+(d.height=="auto"?"expression(this.parentNode.offsetHeight+'px')":b(d.height))+';"/>';return this.each(function(){if(a(this).children("iframe.bgiframe").length===0){this.insertBefore(document.createElement(c),this.firstChild)}})}:function(){return this});a.fn.bgIframe=a.fn.bgiframe;function b(c){return c&&c.constructor===Number?c+"px":c}})(jQuery);;
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
/*
 * This is not the original jQuery Supersubs plugin.
 * Please refer to the README for more information.
 */

(function($){
  $.fn.superfish = function(op){
    var sf = $.fn.superfish,
      c = sf.c,
      $arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
      over = function(){
        var $$ = $(this), menu = getMenu($$);
        clearTimeout(menu.sfTimer);
        $$.showSuperfishUl().siblings().hideSuperfishUl();
      },
      out = function(){
        var $$ = $(this), menu = getMenu($$), o = sf.op;
        clearTimeout(menu.sfTimer);
        menu.sfTimer=setTimeout(function(){
          o.retainPath=($.inArray($$[0],o.$path)>-1);
          $$.hideSuperfishUl();
          if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
        },o.delay);
      },
      getMenu = function($menu){
        var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
        sf.op = sf.o[menu.serial];
        return menu;
      },
      addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };

    return this.each(function() {
      var s = this.serial = sf.o.length;
      var o = $.extend({},sf.defaults,op);
      o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
        $(this).addClass([o.hoverClass,c.bcClass].join(' '))
          .filter('li:has(ul)').removeClass(o.pathClass);
      });
      sf.o[s] = sf.op = o;

      $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
        if (o.autoArrows) addArrow( $('>a:first-child',this) );
      })
      .not('.'+c.bcClass)
        .hideSuperfishUl();

      var $a = $('a',this);
      $a.each(function(i){
        var $li = $a.eq(i).parents('li');
        $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
      });
      o.onInit.call(this);

    }).each(function() {
      var menuClasses = [c.menuClass];
      if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
      $(this).addClass(menuClasses.join(' '));
    });
  };

  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};
  sf.IE7fix = function(){
    var o = sf.op;
    if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
      this.toggleClass(sf.c.shadowClass+'-off');
    };
  sf.c = {
    bcClass: 'sf-breadcrumb',
    menuClass: 'sf-js-enabled',
    anchorClass: 'sf-with-ul',
    arrowClass: 'sf-sub-indicator',
    shadowClass: 'sf-shadow'
  };
  sf.defaults = {
    hoverClass: 'sfHover',
    pathClass: 'overideThisToUse',
    pathLevels: 1,
    delay: 800,
    animation: {opacity:'show'},
    speed: 'normal',
    autoArrows: true,
    dropShadows: true,
    disableHI: false, // true disables hoverIntent detection
    onInit: function(){}, // callback functions
    onBeforeShow: function(){},
    onShow: function(){},
    onHide: function(){}
  };
  $.fn.extend({
    hideSuperfishUl : function(){
      var o = sf.op,
        not = (o.retainPath===true) ? o.$path : '';
      o.retainPath = false;
      var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
          .find('>ul').addClass('sf-hidden');
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl : function(){
      var o = sf.op,
        sh = sf.c.shadowClass+'-off',
        $ul = this.addClass(o.hoverClass)
          .find('>ul.sf-hidden').hide().removeClass('sf-hidden');
      sf.IE7fix.call($ul);
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
      return this;
    }
  });
})(jQuery);;
/*
 * Supersubs v0.2b - jQuery plugin
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */
/*
 * This is not the original jQuery Supersubs plugin.
 * Please refer to the README for more information.
 */

(function($){ // $ will refer to jQuery within this closure
  $.fn.supersubs = function(options){
    var opts = $.extend({}, $.fn.supersubs.defaults, options);
    // return original object to support chaining
    return this.each(function() {
      // cache selections
      var $$ = $(this);
      // support metadata
      var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
      // get the font size of menu.
      // .css('fontSize') returns various results cross-browser, so measure an em dash instead
      var fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({
        'padding' : 0,
        'position' : 'absolute',
        'top' : '-99999em',
        'width' : 'auto'
      }).appendTo($$).width(); //clientWidth is faster, but was incorrect here
      // remove em dash
      $('#menu-fontsize').remove();

      // Jump on level if it's a "NavBar"
      if ($$.hasClass('sf-navbar')) {
        $$ = $('li > ul', $$);
      }
      // cache all ul elements 
      $ULs = $$.find('ul:not(.sf-megamenu)');
      // loop through each ul in menu
      $ULs.each(function(i) {
        // cache this ul
        var $ul = $ULs.eq(i);
        // get all (li) children of this ul
        var $LIs = $ul.children();
        // get all anchor grand-children
        var $As = $LIs.children('a');
        // force content to one line and save current float property
        var liFloat = $LIs.css('white-space','nowrap').css('float');
        // remove width restrictions and floats so elements remain vertically stacked
        var emWidth = $ul.add($LIs).add($As).css({
          'float' : 'none',
          'width'  : 'auto'
        })
        // this ul will now be shrink-wrapped to longest li due to position:absolute
        // so save its width as ems. Clientwidth is 2 times faster than .width() - thanks Dan Switzer
        .end().end()[0].clientWidth / fontsize;
        // add more width to ensure lines don't turn over at certain sizes in various browsers
        emWidth += o.extraWidth;
        // restrict to at least minWidth and at most maxWidth
        if (emWidth > o.maxWidth)    { emWidth = o.maxWidth; }
        else if (emWidth < o.minWidth)  { emWidth = o.minWidth; }
        emWidth += 'em';
        // set ul to width in ems
        $ul.css('width',emWidth);
        // restore li floats to avoid IE bugs
        // set li width to full width of this ul
        // revert white-space to normal
        $LIs.css({
          'float' : liFloat,
          'width' : '100%',
          'white-space' : 'normal'
        })
        // update offset position of descendant ul to reflect new width of parent
        .each(function(){
          var $childUl = $('>ul',this);
          var offsetDirection = $childUl.css('left')!==undefined ? 'left' : 'right';
          $childUl.css(offsetDirection,emWidth);
        });
      });
    });
  };
  // expose defaults
  $.fn.supersubs.defaults = {
    minWidth: 9, // requires em unit.
    maxWidth: 25, // requires em unit.
    extraWidth: 0 // extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
  };
})(jQuery); // plugin code ends;
/*
 * Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget.
 *
 * Copyright (c) 2008 Joel Birch - based mostly on work by Jesse Klaasse and credit goes largely to him.
 * Special thanks to Karl Swedberg for valuable input.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */
/*
 * This is not the original jQuery Supersubs plugin.
 * Please refer to the README for more information.
 */

(function($){
  $.fn.supposition = function(){
    var $w = $(window), /*do this once instead of every onBeforeShow call*/
    _offset = function(dir) {
      return window[dir == 'y' ? 'pageYOffset' : 'pageXOffset']
      || document.documentElement && document.documentElement[dir=='y' ? 'scrollTop' : 'scrollLeft']
      || document.body[dir=='y' ? 'scrollTop' : 'scrollLeft'];
    },
    onHide = function(){
      this.css({bottom:''});
    },
    onBeforeShow = function(){
      this.each(function(){
        var $u = $(this);
        $u.css('display','block');
        var menuWidth = $u.width(),
        menuParentWidth = $u.closest('li').outerWidth(true),
        menuParentLeft = $u.closest('li').offset().left,
        totalRight = $w.width() + _offset('x'),
        menuRight = $u.offset().left + menuWidth,
        exactMenuWidth = (menuRight > (menuParentWidth + menuParentLeft)) ? menuWidth - (menuRight - (menuParentWidth + menuParentLeft)) : menuWidth;  
        if ($u.parents('.sf-js-enabled').hasClass('rtl')) {
          if (menuParentLeft < exactMenuWidth) {
            $u.css('left', menuParentWidth + 'px');
            $u.css('right', 'auto');
          }
        }
        else {
          if (menuRight > totalRight && menuParentLeft > menuWidth) {
            $u.css('right', menuParentWidth + 'px');
            $u.css('left', 'auto');
          }
        }
        var windowHeight = $w.height(),
        offsetTop = $u.offset().top,
        menuParentShadow = ($u.closest('.sf-menu').hasClass('sf-shadow') && $u.css('padding-bottom').length > 0) ? parseInt($u.css('padding-bottom').slice(0,-2)) : 0,
        menuParentHeight = ($u.closest('.sf-menu').hasClass('sf-vertical')) ? '-' + menuParentShadow : $u.parent().outerHeight(true) - menuParentShadow,
        menuHeight = $u.height(),
        baseline = windowHeight + _offset('y');
        var expandUp = ((offsetTop + menuHeight > baseline) && (offsetTop > menuHeight));
        if (expandUp) {
          $u.css('bottom', menuParentHeight + 'px');
          $u.css('top', 'auto');
        }
        $u.css('display','none');
      });
    };

    return this.each(function() {
      var o = $.fn.superfish.o[this.serial]; /* get this menu's options */

      /* if callbacks already set, store them */
      var _onBeforeShow = o.onBeforeShow,
      _onHide = o.onHide;

      $.extend($.fn.superfish.o[this.serial],{
        onBeforeShow: function() {
          onBeforeShow.call(this); /* fire our Supposition callback */
          _onBeforeShow.call(this); /* fire stored callbacks */
        },
        onHide: function() {
          onHide.call(this); /* fire our Supposition callback */
          _onHide.call(this); /* fire stored callbacks */
        }
      });
    });
  };
})(jQuery);;
/*
 * sf-Touchscreen v1.2b - Provides touchscreen compatibility for the jQuery Superfish plugin.
 *
 * Developer's note:
 * Built as a part of the Superfish project for Drupal (http://drupal.org/project/superfish)
 * Found any bug? have any cool ideas? contact me right away! http://drupal.org/user/619294/contact
 *
 * jQuery version: 1.3.x or higher.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */

(function($){
  $.fn.sftouchscreen = function(options){
    options = $.extend({
      mode: 'inactive',
      breakpoint: 768,
      useragent: ''
    }, options);

    function activate(menu){
      // Select hyperlinks from parent menu items.
      menu.find('li > ul').closest('li').children('a').each(function(){
        var item = $(this);
        // No .toggle() here as it's not possible to reset it.
        item.click(function(event){
          // Already clicked? proceed to the URL.
          if (item.hasClass('sf-clicked')){
            window.location = item.attr('href');
          }
          // Prevent it otherwise.
          else {
            event.preventDefault();
            item.addClass('sf-clicked');
          }
        }).closest('li').mouseleave(function(){
          // Reset everything.
          item.removeClass('sf-clicked');
        });
      });
    }
    // Return original object to support chaining.
    return this.each(function(){
      var menu = $(this),
      mode = options.mode;
      // The rest is crystal clear, isn't it? :)
      switch (mode){
        case 'always_active' :
          activate(menu);
        break;
        case 'window_width' :
          if ($(window).width() < options.breakpoint){
            activate(menu);
          }
          var timer;
          $(window).resize(function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
              if ($(window).width() < options.breakpoint){
                activate(menu);
              }
            }, 100);
          });
        break;
        case 'useragent_custom' :
          if (options.useragent != ''){
            if (navigator.userAgent.match(options.useragents)){
              activate(menu);
            }
          }
        break;
        case 'useragent_predefined' :
          if (navigator.userAgent.match(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i)){
            activate(menu);
          }
        break;
      }
    });
  };
})(jQuery);;
(function ($) {

Drupal.behaviors.aap_getData = function (id) {
	var delhi_const_data = [
	                    	{
	                    		"id": "1",
	                    		"name": "Narela",
	                    		"fb": "http://www.facebook.com/AAPDLNarela",
	                    		"phone": "8588833401",
	                    		"email": "aapdelhi01@gmail.com"
	                    	},
	                    	{
	                    		"id": "2",
	                    		"name": "Burari",
	                    		"fb": "http://www.facebook.com/AAPDLBurari",
	                    		"phone": "8588833402",
	                    		"email": "aapdelhi02@gmail.com"
	                    	},
	                    	{
	                    		"id": "3",
	                    		"name": "Timarpur",
	                    		"fb": "http://www.facebook.com/AAPDLTimarpur",
	                    		"phone": "8588833403",
	                    		"email": "aapdelhi03@gmail.com"
	                    	},
	                    	{
	                    		"id": "4",
	                    		"name": "Adarsh Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLAdarshNagar",
	                    		"phone": "8588833404",
	                    		"email": "aapdelhi04@gmail.com"
	                    	},
	                    	{
	                    		"id": "5",
	                    		"name": "Badli",
	                    		"fb": "http://www.facebook.com/AAPDLBadli",
	                    		"phone": "8588833405",
	                    		"email": "aapdelhi05@gmail.com"
	                    	},
	                    	{
	                    		"id": "6",
	                    		"name": "Rithala",
	                    		"fb": "http://www.facebook.com/AAPDLRithala",
	                    		"phone": "8588833406",
	                    		"email": "aapdelhi06@gmail.com"
	                    	},
	                    	{
	                    		"id": "7",
	                    		"name": "Bawana",
	                    		"fb": "http://www.facebook.com/AAPDLBawana",
	                    		"phone": "8588833407",
	                    		"email": "aapdelhi07@gmail.com"
	                    	},
	                    	{
	                    		"id": "8",
	                    		"name": "Mundka",
	                    		"fb": "http://www.facebook.com/AAPDLMundka",
	                    		"phone": "8588833408",
	                    		"email": "aapdelhi08@gmail.com"
	                    	},
	                    	{
	                    		"id": "9",
	                    		"name": "Kirari",
	                    		"fb": "http://www.facebook.com/AAPDLKirari",
	                    		"phone": "8588833409",
	                    		"email": "aapdelhi09@gmail.com"
	                    	},
	                    	{
	                    		"id": "10",
	                    		"name": "Sultanpur Majra",
	                    		"fb": "http://www.facebook.com/AAPDLSultanpuri",
	                    		"phone": "8588833410",
	                    		"email": "aapdelhi10@gmail.com"
	                    	},
	                    	{
	                    		"id": "11",
	                    		"name": "Nangloi Jat",
	                    		"fb": "http://www.facebook.com/AAPDLNangloiJat",
	                    		"phone": "8588833411",
	                    		"email": "aapdelhi11@gmail.com"
	                    	},
	                    	{
	                    		"id": "12",
	                    		"name": "Mangol Puri",
	                    		"fb": "http://www.facebook.com/AAPDLMangolpuri",
	                    		"phone": "8588833412",
	                    		"email": "aapdelhi12@gmail.com"
	                    	},
	                    	{
	                    		"id": "13",
	                    		"name": "Rohini",
	                    		"fb": "http://www.facebook.com/AAPDLRohini",
	                    		"phone": "9999999999",
	                    		"email": "aapdelhi13@gmail.com"
	                    	},
	                    	{
	                    		"id": "14",
	                    		"name": "Shalimar Bagh",
	                    		"fb": "http://www.facebook.com/AAPDLShalimarBagh",
	                    		"phone": "8588833414",
	                    		"email": "aapdelhi14@gmail.com"
	                    	},
	                    	{
	                    		"id": "15",
	                    		"name": "Shakur Basti",
	                    		"fb": "http://www.facebook.com/AAPDLShakurbasti",
	                    		"phone": "8588833415",
	                    		"email": "aapdelhi15@gmail.com"
	                    	},
	                    	{
	                    		"id": "16",
	                    		"name": "Tri Nagar",
	                    		"fb": "https://www.facebook.com/AAPDLTriNagar",
	                    		"phone": "8588833416",
	                    		"email": "aapdelhi16@gmail.com"
	                    	},
	                    	{
	                    		"id": "17",
	                    		"name": "Wazirpur",
	                    		"fb": "http://www.facebook.com/AAPDLWazirpur",
	                    		"phone": "8588833417",
	                    		"email": "aapdelhi17@gmail.com"
	                    	},
	                    	{
	                    		"id": "18",
	                    		"name": "Model Town",
	                    		"fb": "http://www.facebook.com/AAPDLModelTown",
	                    		"phone": "8588833418",
	                    		"email": "aapdelhi18@gmail.com"
	                    	},
	                    	{
	                    		"id": "19",
	                    		"name": "Sadar Bazar",
	                    		"fb": "http://www.facebook.com/AAPDLSadarBazar",
	                    		"phone": "8588833419",
	                    		"email": "aapdelhi19@gmail.com"
	                    	},
	                    	{
	                    		"id": "20",
	                    		"name": "Chandni Chowk",
	                    		"fb": "http://www.facebook.com/AAPDLChandniChowk",
	                    		"phone": "8588833420",
	                    		"email": "aapdelhi20@gmail.com"
	                    	},
	                    	{
	                    		"id": "21",
	                    		"name": "Matia Mahal",
	                    		"fb": "http://www.facebook.com/AAPDLMatiaMahal",
	                    		"phone": "8588833421",
	                    		"email": "aapdelhi21@gmail.com"
	                    	},
	                    	{
	                    		"id": "22",
	                    		"name": "Ballimaran",
	                    		"fb": "http://www.facebook.com/AAPDLBalliMaran",
	                    		"phone": "8588833422",
	                    		"email": "aapdelhi22@gmail.com"
	                    	},
	                    	{
	                    		"id": "23",
	                    		"name": "Karol Bagh",
	                    		"fb": "http://www.facebook.com/AAPDLKarolBagh",
	                    		"phone": "8588833423",
	                    		"email": "aapdelhi23@gmail.com"
	                    	},
	                    	{
	                    		"id": "24",
	                    		"name": "Patel Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLPatelNagar",
	                    		"phone": "8588833424",
	                    		"email": "aapdelhi24@gmail.com"
	                    	},
	                    	{
	                    		"id": "25",
	                    		"name": "Moti Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLMotiNagar",
	                    		"phone": "8588833425",
	                    		"email": "aapdelhi25@gmail.com"
	                    	},
	                    	{
	                    		"id": "26",
	                    		"name": "Madipur",
	                    		"fb": "http://www.facebook.com/AAPDLMadipur",
	                    		"phone": "8588833426",
	                    		"email": "aapdelhi26@gmail.com"
	                    	},
	                    	{
	                    		"id": "27",
	                    		"name": "Rajouri Garden",
	                    		"fb": "http://www.facebook.com/AAPDLRajouriGarden",
	                    		"phone": "8588833427",
	                    		"email": "aapdelhi27@gmail.com"
	                    	},
	                    	{
	                    		"id": "28",
	                    		"name": "Hari Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLHariNagar",
	                    		"phone": "8588833428",
	                    		"email": "aapdelhi28@gmail.com"
	                    	},
	                    	{
	                    		"id": "29",
	                    		"name": "Tilak Nagar",
	                    		"fb": "https://www.facebook.com/AAPDLTilakNagar",
	                    		"phone": "8588833429",
	                    		"email": "aapdelhi29@gmail.com"
	                    	},
	                    	{
	                    		"id": "30",
	                    		"name": "Janakpuri",
	                    		"fb": "http://www.facebook.com/AAPDLJanakpuri",
	                    		"phone": "8588833430",
	                    		"email": "aapdelhi30@gmail.com"
	                    	},
	                    	{
	                    		"id": "31",
	                    		"name": "Vikaspuri",
	                    		"fb": "http://www.facebook.com/AAPDLVikaspuri",
	                    		"phone": "8588833431",
	                    		"email": "aapdelhi31@gmail.com"
	                    	},
	                    	{
	                    		"id": "32",
	                    		"name": "Uttam Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLUttamNagar",
	                    		"phone": "8588833432",
	                    		"email": "aapdelhi32@gmail.com"
	                    	},
	                    	{
	                    		"id": "33",
	                    		"name": "Dwarka",
	                    		"fb": "http://www.facebook.com/AAPDLDwarka",
	                    		"phone": "8588833433",
	                    		"email": "aapdelhi33@gmail.com"
	                    	},
	                    	{
	                    		"id": "34",
	                    		"name": "Matiala",
	                    		"fb": "http://www.facebook.com/AAPDLMatiyala",
	                    		"phone": "8588833434",
	                    		"email": "aapdelhi34@gmail.com"
	                    	},
	                    	{
	                    		"id": "35",
	                    		"name": "Najafgarh",
	                    		"fb": "http://www.facebook.com/AAPDLNajafgarh",
	                    		"phone": "8588833435",
	                    		"email": "aapdelhi35@gmail.com"
	                    	},
	                    	{
	                    		"id": "36",
	                    		"name": "Bijwasan",
	                    		"fb": "http://www.facebook.com/AAPDLBijwasan",
	                    		"phone": "8588833436",
	                    		"email": "aapdelhi36@gmail.com"
	                    	},
	                    	{
	                    		"id": "37",
	                    		"name": "Palam",
	                    		"fb": "http://www.facebook.com/AAPDLPalam",
	                    		"phone": "8588833437",
	                    		"email": "aapdelhi37@gmail.com"
	                    	},
	                    	{
	                    		"id": "38",
	                    		"name": "Delhi Cantt",
	                    		"fb": "http://www.facebook.com/AAPDLDelhiCantt",
	                    		"phone": "8588833438",
	                    		"email": "aapdelhi38@gmail.com"
	                    	},
	                    	{
	                    		"id": "39",
	                    		"name": "Rajinder Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLRajinderNagar",
	                    		"phone": "8588833439",
	                    		"email": "aapdelhi39@gmail.com"
	                    	},
	                    	{
	                    		"id": "40",
	                    		"name": "New Delhi",
	                    		"fb": "http://www.facebook.com/AAPDLNewDelhi",
	                    		"phone": "8588833440",
	                    		"email": "aapdelhi40@gmail.com"
	                    	},
	                    	{
	                    		"id": "41",
	                    		"name": "Jangpura",
	                    		"fb": "http://www.facebook.com/AAPDLJangpura",
	                    		"phone": "8588833441",
	                    		"email": "aapdelhi41@gmail.com"
	                    	},
	                    	{
	                    		"id": "42",
	                    		"name": "Kasturba Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLKasturbaNagar",
	                    		"phone": "8588833442",
	                    		"email": "aapdelhi42@gmail.com"
	                    	},
	                    	{
	                    		"id": "43",
	                    		"name": "Malviya Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLMalviyaNagar",
	                    		"phone": "8588833443",
	                    		"email": "aapdelhi43@gmail.com"
	                    	},
	                    	{
	                    		"id": "44",
	                    		"name": "Rk Puram",
	                    		"fb": "http://www.facebook.com/AAPDLRKPuram",
	                    		"phone": "8588833444",
	                    		"email": "aapdelhi44@gmail.com"
	                    	},
	                    	{
	                    		"id": "45",
	                    		"name": "Mehrauli",
	                    		"fb": "http://www.facebook.com/AAPDLMehrauli",
	                    		"phone": "8588833445",
	                    		"email": "aapdelhi45@gmail.com"
	                    	},
	                    	{
	                    		"id": "46",
	                    		"name": "Chhatarpur",
	                    		"fb": "http://www.facebook.com/AAPDLChhatarpur",
	                    		"phone": "8588833446",
	                    		"email": "aapdelhi46@gmail.com"
	                    	},
	                    	{
	                    		"id": "47",
	                    		"name": "Deoli",
	                    		"fb": "http://www.facebook.com/AAPDLDeoli",
	                    		"phone": "8588833447",
	                    		"email": "aapdelhi47@gmail.com"
	                    	},
	                    	{
	                    		"id": "48",
	                    		"name": "Ambedkar Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLAmbedkarNagar",
	                    		"phone": "8588833448",
	                    		"email": "aapdelhi48@gmail.com"
	                    	},
	                    	{
	                    		"id": "49",
	                    		"name": "Sangam Vihar",
	                    		"fb": "http://www.facebook.com/AAPDLSangamVihar",
	                    		"phone": "8588833449",
	                    		"email": "aapdelhi49@gmail.com"
	                    	},
	                    	{
	                    		"id": "50",
	                    		"name": "Greater Kailash",
	                    		"fb": "http://www.facebook.com/AAPDLGreaterKailash",
	                    		"phone": "8588833450",
	                    		"email": "aapdelhi50@gmail.com"
	                    	},
	                    	{
	                    		"id": "51",
	                    		"name": "Kalkaji",
	                    		"fb": "http://www.facebook.com/AAPDLKalkaji",
	                    		"phone": "8588833451",
	                    		"email": "aapdelhi51@gmail.com"
	                    	},
	                    	{
	                    		"id": "52",
	                    		"name": "Tughlakabad",
	                    		"fb": "http://www.facebook.com/AAPDLTughlakabad",
	                    		"phone": "8588833452",
	                    		"email": "aapdelhi52@gmail.com"
	                    	},
	                    	{
	                    		"id": "53",
	                    		"name": "Badarpur",
	                    		"fb": "http://www.facebook.com/AAPDLBadarpur",
	                    		"phone": "8588833453",
	                    		"email": "aapdelhi53@gmail.com"
	                    	},
	                    	{
	                    		"id": "54",
	                    		"name": "Okhla",
	                    		"fb": "http://www.facebook.com/AAPDLOkhla",
	                    		"phone": "8588833454",
	                    		"email": "aapdelhi54@gmail.com"
	                    	},
	                    	{
	                    		"id": "55",
	                    		"name": "Trilokpuri",
	                    		"fb": "http://www.facebook.com/AAPDLTrilokPuri",
	                    		"phone": "8588833455",
	                    		"email": "aapdelhi55@gmail.com"
	                    	},
	                    	{
	                    		"id": "56",
	                    		"name": "Kondli",
	                    		"fb": "http://www.facebook.com/AAPDLKondli",
	                    		"phone": "8588833456",
	                    		"email": "aapdelhi56@gmail.com"
	                    	},
	                    	{
	                    		"id": "57",
	                    		"name": "Patparganj",
	                    		"fb": "http://www.facebook.com/AAPDLPatparGanj",
	                    		"phone": "8588833457",
	                    		"email": "aapdelhi57@gmail.com"
	                    	},
	                    	{
	                    		"id": "58",
	                    		"name": "Laxmi Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLLaxmiNagar",
	                    		"phone": "8588833458",
	                    		"email": "aapdelhi58@gmail.com"
	                    	},
	                    	{
	                    		"id": "59",
	                    		"name": "Vishwas Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLVishwashNagar",
	                    		"phone": "8588833459",
	                    		"email": "aapdelhi59@gmail.com"
	                    	},
	                    	{
	                    		"id": "60",
	                    		"name": "Krishna Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLKrishnaNagar",
	                    		"phone": "8588833460",
	                    		"email": "aapdelhi60@gmail.com"
	                    	},
	                    	{
	                    		"id": "61",
	                    		"name": "Gandhi Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLGandhiNagar",
	                    		"phone": "8588833461",
	                    		"email": "aapdelhi61@gmail.com"
	                    	},
	                    	{
	                    		"id": "62",
	                    		"name": "Shahdara",
	                    		"fb": "http://www.facebook.com/AAPDLShahdara",
	                    		"phone": "8588833462",
	                    		"email": "aapdelhi62@gmail.com"
	                    	},
	                    	{
	                    		"id": "63",
	                    		"name": "Seemapuri",
	                    		"fb": "http://www.facebook.com/AAPDLSeemapuri",
	                    		"phone": "8588833463",
	                    		"email": "aapdelhi63@gmail.com"
	                    	},
	                    	{
	                    		"id": "64",
	                    		"name": "Rohtas Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLRohtasNagar",
	                    		"phone": "8588833464",
	                    		"email": "aapdelhi64@gmail.com"
	                    	},
	                    	{
	                    		"id": "65",
	                    		"name": "Seelampur",
	                    		"fb": "http://www.facebook.com/AAPDLSeelampur",
	                    		"phone": "8588833465",
	                    		"email": "aapdelhi65@gmail.com"
	                    	},
	                    	{
	                    		"id": "66",
	                    		"name": "Ghonda",
	                    		"fb": "http://www.facebook.com/AAPDLGhonda",
	                    		"phone": "8588833466",
	                    		"email": "aapdelhi66@gmail.com"
	                    	},
	                    	{
	                    		"id": "67",
	                    		"name": "Babarpur",
	                    		"fb": "http://www.facebook.com/AAPDLBabarpur",
	                    		"phone": "8588833467",
	                    		"email": "aapdelhi67@gmail.com"
	                    	},
	                    	{
	                    		"id": "68",
	                    		"name": "Gokalpur",
	                    		"fb": "http://www.facebook.com/AAPDLGokulpuri",
	                    		"phone": "8588833468",
	                    		"email": "aapdelhi68@gmail.com"
	                    	},
	                    	{
	                    		"id": "69",
	                    		"name": "Mustafabad",
	                    		"fb": "http://www.facebook.com/AAPDLMustafabad",
	                    		"phone": "8588833469",
	                    		"email": "aapdelhi69@gmail.com"
	                    	},
	                    	{
	                    		"id": "70",
	                    		"name": "Karawal Nagar",
	                    		"fb": "http://www.facebook.com/AAPDLkarawalNagar",
	                    		"phone": "8588833470",
	                    		"email": "aapdelhi70@gmail.com"
	                    	}
	                    ];
	var data = delhi_const_data[id-1];
	
	$("#dialog").html(
	'<br/><strong>Facebook Page: </strong> <a target="_blank" href="'+data.fb+'">'+data.fb+'</a>'+
	'<br/><br/><strong>Email: </strong> '+data.email+
	'<br/><br/><strong>Phone Number: </strong> '+data.phone
	);
	$("#dialog").dialog( {
		width : 600,
		height : 220,
		modal : true,
		title : data.name + ', Delhi, Aam Aadmi Party - Contact Details',
	});
	
//	url = window.location.protocol + "//" + window.location.host + Drupal.settings.basePath + 'assembly-info.php';
//	$.ajax( {
//		type : "POST",
//		url : url,
//		data : {
//			id : id
//		},
//		dataType : "json",
//		success : function(data) {
//			$("#dialog").html(data);
//			$("#dialog").dialog( {
//				width : 800,
//				height : 250,
//				modal : true
//			});
//		}
//	});
	};
	
})(jQuery);
;
(function ($) {

$(document).ready(function() {

  // Expression to check for absolute internal links.
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (ga.trackDomainMode == 2 && isCrossDomain($(this).attr('hostname'), ga.trackCrossDomains)) {
            // Top-level cross domain clicked. document.location is handled by _link internally.
            event.preventDefault();
            _gaq.push(["_link", this.href]);
          }
          else {
            // External link clicked.
            _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
          }
        }
      }
    });
  });

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function() {
    var href = $.colorbox.element().attr("href");
    if (href) {
      _gaq.push(["_trackPageview", href.replace(isInternal, '')]);
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
function isCrossDomain(hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
}

})(jQuery);
;
