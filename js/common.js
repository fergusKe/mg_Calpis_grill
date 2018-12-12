(function($) {
	 var _fb_connect_type = "";
	$(function() {
		
		if(Fun.detectmobile.isMobile){
			
			/* 全部頁面手機點擊 */
			FastClick.attach(document.body);
			$("body").addClass("mobile");
		}else{
			$("body").removeClass("mobile");
		}
		
		$(".home").attr("target","");
		$("#tvc iframe").attr("src","https://www.youtube.com/embed/Re4vfOLK9i4");
		
		popupMenu();
		menuClickFunction();
		
	});
	function popupMenu() {
		
		var pName = getURL();
		
		if(pName=='game.html'){
			
		}else{
			$('.menu-btn').on('click', function() {
				MenuPopupShowHideSet(true);
				/*if ( $(this).hasClass('active') ) {
					MenuPopupShowHideSet();
					//popupHide();
				} else {
					MenuPopupShowHideSet(true);
					//popupShow();
				}*/
			});
			$('#menu .pop-close-btn').on('click', function() {
				MenuPopupShowHideSet();
			});
		}
		
		$("#tvc .pop-close-btn").on("click",function(){
			$("#tvc iframe").attr("src","");
			Fun.eleFadeOut($("#tvc"));
		});
		
		//---不再執行事件---
		$('.popup-box, .popup-main').on('click', function(e) {
			e.stopPropagation();
		});
		/*function popupShow() {
			$('.menu-btn').hide();
			$('#menu.popup').fadeIn();
			$('.pop-close-btn').css('right', 29);
			$('#menu.popup').css('overflow-y', 'auto');
			$('body').css('overflow', 'hidden');
		}
		function popupHide() {
			$('.menu-btn').fadeIn();
			$('#menu.popup').fadeOut();
			$('.pop-close-btn').css('right', 12);
			$('#menu.popup').css('overflow-y', 'hidden');
			$('body').css('overflow', 'auto');
		}*/
	}
	
	function menuClickFunction(){
		$('#menu .popup-content a').click(function(e){
		   
			//game
			if($(this).hasClass("pop-s1")){
				window.trackingEvent('menu_pop-s1', 'click');
				e.preventDefault();
				//MenuPopupShowHideSet();
				Fun.eleFadeIn(_page_loading);
				location.href = "game.html";
			}
			
			//TVC
			if($(this).hasClass("pop-s2")){
				$("#tvc iframe").attr("src","https://www.youtube.com/embed/Re4vfOLK9i4");
				window.trackingEvent('menu_pop-s2', 'click');
				e.preventDefault();
				Fun.eleFadeIn($("#tvc"));
			}
			
			//activity
			if($(this).hasClass("pop-s3")){
				window.trackingEvent('menu_pop-s3', 'click');
				e.preventDefault();
				//MenuPopupShowHideSet();
				Fun.eleFadeIn(_page_loading);
				location.href = "activity.html";
			}
			
			//award
			if($(this).hasClass("pop-s4")){
				window.trackingEvent('menu_pop-s4', 'click');
				e.preventDefault();
				alert("award");
				//Fun.eleFadeIn(_page_loading);
				//location.href = "award.html";
			}
			
			//winner
			if($(this).hasClass("pop-s5")){
				window.trackingEvent('menu_pop-s5', 'click');
				e.preventDefault();
				alert("得獎名單尚未公布，敬請期待！");
				//Fun.eleFadeIn(_page_loading);
				//location.href = "winner.html";
			}
			
			//fb
			if($(this).hasClass("fb")){
				window.trackingEvent('menu_fb', 'click');
				//e.preventDefault();
				//Fun.eleFadeIn(_page_loading);
				$(this).attr("href","https://www.facebook.com/calpis.tw");
				//window.location.href = "https://www.facebook.com/calpis.tw";
			}
			
			//home
			if($(this).hasClass("home")){
				window.trackingEvent('menu_home', 'click');
				e.preventDefault();
				//MenuPopupShowHideSet();
				Fun.eleFadeIn(_page_loading);
				window.location.href = "index.html";
			}
			
			/*var menu_li_class = $(this).attr('class');
			window.trackingEvent('menu_' + menu_li_class, 'click');
			
			switch(menu_li_class){
				case "nav_qa":
					e.preventDefault();
					loadingChange(true);
					location.href = "qa.html";
					break;
				case "nav_game":
					e.preventDefault();
					loadingChange(true);
					location.href = "index.html";
					break;
				case "nav_rule":
					e.preventDefault();
					loadingChange(true);
					location.href = "rule.html";
					break;
				case "nav_awards":
					e.preventDefault();
					loadingChange(true);
					location.href = "awards.html";
					break;
				case "nav_delicious":
					//e.preventDefault();
					//location.href = "BBH/awards.html";
					//alert("得獎名單於8/5公布，敬請期待！");
					break;
			}*/
			
		});
	}
	
	
	//---facebook---
    window.common_fb_connect = function(pStr){
        pStr =  pStr || "game";
        _fb_connect_type = pStr;
        Fun.eleFadeIn(_page_loading);
        // FBapi.fbLogin();
    }
	window.fbLoginCallBack = function(pBol){
        pBol = pBol || false;
        console.log("fbLoginCallBack: "+pBol);
		if(pBol){
            if(_fb_connect_type == "game"){
                window.location.href = "game.html";
            }
        }else{
			Fun.eleFadeOut(_page_loading);
        }
    }
	
	function MenuPopupShowHideSet(pBol){
		pBol = pBol || false;
		if(pBol){
			$('.menu-btn').hide();
			Fun.eleFadeIn($('#menu.popup'));
			$('.pop-close-btn').css('right', 29);
			$('.popup').css('overflow-y', 'auto');
			$('body').css('overflow', 'hidden');
			//$('.logo').css('position', 'fixed');
		}else{
			Fun.eleFadeIn($('.menu-btn'));
			Fun.eleFadeOut($('#menu.popup'));
			$('.pop-close-btn').css('right', 12);
			$('.popup').css('overflow-y', 'hidden');
			$('body').css('overflow', 'auto');
			//$('.logo').css('position', 'absolute');
			
			
		}
	}
	
	
	function getURL() {
		var targetURL=location.pathname;
		var URL_ar = targetURL.split("/");
		targetURL = URL_ar[URL_ar.length-1];
		return targetURL;  
	}
	
})(jQuery);