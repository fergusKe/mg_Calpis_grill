(function($) {
	var _drinkClass = "popup";
	var _userObj = {};
	var _gameObj = {};
		_gameObj.gameTimer;	//遊戲時間
		_gameObj.questionAr = [
				{},
				{img:"images/game/step2/msg5-1.png", type:1},
				{img:"images/game/step2/msg5-2.png", type:1},
				{img:"images/game/step2/msg3-1.png", type:3},
				{img:"images/game/step2/msg3-2.png", type:3},
				{img:"images/game/step2/msg4-1.png", type:2},
				{img:"images/game/step2/msg4-2.png", type:2},
				{img:"images/game/step2/msg2-1.png", type:4},
				{img:"images/game/step2/msg2-2.png", type:4},
				{img:"images/game/step2/msg1-1.png", type:5},
				{img:"images/game/step2/msg1-2.png", type:5}
			];
	
	$(function() {
		init();
		game_init();
		setButton();
		setGameButton();
		initForm();//表單setting
	});
	
	window.pageLoadCallBack = function(){
		// _gameObj.oldArea = '';
		// _gameObj.nowArea = 'game-intro';
		changeArea();
		// _page_loading.hide();
		Fun.eleFadeOut(_page_loading);
		//-- $("#fillInfo").addClass('fill');
		//-- _gameObj.oldArea = 'gameover';
		//-- _gameObj.nowArea = 'fillInfo';
		//-- changeArea();
		
		//bgonload(1);
		//---fbInitCallBack---
	}
	
	function bgonload(ii){
		var a = new Image;
		a.onload = function( ){ 
			if(ii<5){
				ii++;
				bgonload(ii); 
			}else{
				
				$("#drinking").attr("class", _drinkClass);
				changeArea();
				Fun.eleFadeOut(_page_loading);
			}
		};
		a.src = "images/game/step2/drink"+ii+".png";
	}

//------------------------------------------------------------------------------		
	//---動態相關設定---
	function init() {
		if(Fun.detectmobile.isMobile){
			_drinkClass = "popup mobile";
			//$("#drinking").attr("class", _drinkClass);
		}
		//--$("#drinking").addClass("drink1");
		//--$("#drinking").addClass("drink2");
		//--$("#drinking").addClass("drink3");
		//--$("#drinking").addClass("drink4");
		//--$("#drinking").addClass("drink5");
		$("#drinking").attr("class", "popup drink1 drink2 drink3 drink4 drink5");
		
		$("#drinking .drink,#drinking .finger").css({ 'cursor': 'pointer' });
		
		//---BBQ---
		$('.bbq').pictureani({ frameWidth: 650, frameHeight: 650, fps: 4, totalFrames: 20, loop:true, width:13000 });
		
		//---question---
		$(".item-msg .msg-cont").autoflutter({top:-10, timer:0.8});
		
		//---drinking---
		$('.drink.d1').pictureani({ frameWidth: 317, frameHeight: 757, fps: 5, totalFrames: 5, loop:false, width: 1585, complete:function(){ drinking_end(1); } });
		$('.drink.d2').pictureani({ frameWidth: 337, frameHeight: 809, fps: 5, totalFrames: 5, loop:false, width: 1685, complete:function(){ drinking_end(2); } });
		$('.drink.d3').pictureani({ frameWidth: 324, frameHeight: 777, fps: 5, totalFrames: 5, loop:false, width: 1620, complete:function(){ drinking_end(3); } });
		$('.drink.d4').pictureani({ frameWidth: 317, frameHeight: 654, fps: 5, totalFrames: 5, loop:false, width: 1585, complete:function(){ drinking_end(4); } });
		$('.drink.d5').pictureani({ frameWidth: 344, frameHeight: 655, fps: 5, totalFrames: 5, loop:false, width: 1720, complete:function(){ drinking_end(5); } });
		
	}
	
	//---一般按鈕監聽---
	function setButton() {
		
		//##### menu #####
		$('.menu-btn').on('click', function() {
			MenuPopupShowHideSet(true);
			
		});
		$('#menu .pop-close-btn').on('click', function() {
			MenuPopupShowHideSet();
		});
		
		//##### fb-page #####
		$("#fb-page .pop-close-btn, #fb-page .fb-page-btn").on("click", function(){
			_page_loading.show();
			_gameObj.oldArea = 'fb-page';
			_gameObj.nowArea = 'game-intro';
			changeArea(function(){_page_loading.hide();});
		});
		
		//##### game-intro #####
		$("#game-intro .pop-close-btn, #game-intro .step1-start-btn").on("click", function(){
			Fun.eleFadeIn(_page_loading);
			// ajax_GameStart();
			_gameObj.oldArea = 'game-intro';
			_gameObj.nowArea = '';
			changeArea(goGame);
			_page_loading.hide();
		});
		
		
		//##### gameover #####
		$("#gameover .success-btn").on("click", function(){
			Fun.eleFadeIn(_page_loading);
			
			if(_userObj.form){
				$("#fillInfo").addClass("fill-ok");
			}else{
				$("#fillInfo").addClass("fill");
			}
			
			_gameObj.oldArea = 'gameover';
			_gameObj.nowArea = 'fillInfo';
			changeArea();
			
			Fun.eleFadeOut(_page_loading);
			$("#gameover").attr("class","popup");
			
		});
		$("#gameover .fail-btn").on("click", function(){
			Fun.eleFadeIn(_page_loading);
			game_init('gameover','game-intro');
			changeArea();
			_page_loading.hide();
		});
		
		//##### fillInfo #####
		//鎖-限制只能填數字
		$('input.phone').keypress(function (e){
			if((e.shiftKey && e.keyCode == 45) || e.which!=8 &&
				e.which!=0 && (e.which<48 || e.which>57))
			{
				return false;
			}
		});
		
		//click 隱私權
		$("#fillInfo.popup .rule").on("click", function(e){
			e.preventDefault();
			alert("僅提供本人之姓名、電話、email與郵遞地址等個人資料，以參加由台灣「可爾必思」股份有限公司所辦理之「烤肉絕配♥ Peace+1最對味！」活動，並同意台灣「可爾必思」股份有限公司以及其所委託從事產品推廣、銷售、客戶服務、市場調查之人員、公司、機構或團體，得為推廣、銷售台灣「可爾必思」股份有限公司所製造、進口、推廣、銷售之產品或服務之範圍內，蒐集、處理及利用本人之下列個人資料。利用之期間、地區、對象及方式均不受任何限制。本人了解，本人就所提供之個人資料依法得行使查詢或請求閱覽、請求製給複製本、請求補充或更正、請求停止蒐集、處理或利用以及請求刪除等權利。本人了解，簽署本同意書為本人參加「烤肉絕配♥ Peace+1最對味！」活動之必要條件。本人得自由選擇參加「烤肉絕配♥ Peace+1最對味！」活動。");
		});
		
		//---同意勾勾---
		$('#fillInfo.popup .tick').on('click', function() {
			$(this).toggleClass('active');
		});
		
		//click form send
		form_send_function();
		
		
		$("#fillInfo .send-ok-again-btn, #fillInfo .fill-ok-again-btn").on("click", function(){
			Fun.eleFadeIn(_page_loading);
			$("#fillInfo").attr("class","popup");
			game_init('fillInfo','game-intro');
			changeArea();
			_page_loading.hide();
		});
		
		$("#fillInfo .send-ok-share-btn, #fillInfo .fill-ok-share-btn").on("click", function(){
			Fun.eleFadeIn(_page_loading);
			// ajax_AddShareClick();
			
			// fbUIShare();
			
			$("#fillInfo").attr("class","popup");
			game_init('fillInfo','game-intro');
			changeArea();
			_page_loading.hide();
		});
		
		$("#fillInfo .pop-close-btn").on("click", function(){
			Fun.eleFadeIn(_page_loading);
			if($("#fillInfo").hasClass("fill")){
				if(confirm("填寫基本資料，獲得好康抽獎機會! 繼續填寫?")){
					Fun.eleFadeOut(_page_loading);
				}else{
					$("#fillInfo").attr("class","popup");
					game_init('fillInfo','game-intro');
					changeArea();
					_page_loading.hide();
				}
			}else{
				$("#fillInfo").attr("class","popup");
				game_init('fillInfo','game-intro');
				changeArea();
				_page_loading.hide();
			}
			//ajax_GameStart();
			//-- _gameObj.oldArea = 'game-intro';
			//-- _gameObj.nowArea = '';
			//-- changeArea(goGame);
			//-- _page_loading.hide();
		});
		
		
		
		//---popup 背景 點擊---
		//-- $('.popup').on('click', function() {
		//-- 	Fun.eleFadeOut($('.popup'));
		//-- 	PopupShowHideSet();
		//-- 	//eleHide();
		//-- });
	}
	
	function form_send_function(){
		//表單送出
		$("#fillInfo .submit").on("click", function(e){
			$("#fillInfo .submit").off("click");
			e.preventDefault();
			formCheck();
		});
	}
//------------------------------------------------------------------------------	
	//---遊戲數值初始化---
	function game_init(pOldArea, pNowArea){
		pOldArea = pOldArea || '';
		pNowArea = pNowArea || 'fb-page';
		_gameObj.gameBol = false;	//遊戲狀態
		_gameObj.drinkNum = 0,	//倒數(321)
		_gameObj.readyNum = 0,	//倒數(321)
		_gameObj.timeNum = 30;	//倒數(遊戲秒數)
		_gameObj.oldArea = pOldArea;	//前一區塊
		_gameObj.nowArea = pNowArea;	//現在區塊
		_gameObj.oldAreaClass = '';	//前一區塊class
		_gameObj.nowAreaClass = '';	//現在區塊class
		// console.log('_gameObj.nowArea = ', _gameObj.nowArea);
		
		_gameObj.qAr = generateRandomArr2(1,(_gameObj.questionAr.length-1),3);
		_gameObj.qInt = 0;
		_gameObj.qQ = 0;
		_gameObj.qA = 0;
		
		delete _userObj.event_id;
		delete _userObj.form;
		
		$("#fillInfo").attr("class","popup");
		$("#gameover").attr("class","popup");
		$("#drinking").attr("class",_drinkClass);
		$(".drink-num").html(_gameObj.drinkNum);
		setGameTimeText();
		$("#drinking .finger").hide();
		$(".drink.d1, .drink.d2, .drink.d3, .drink.d4, .drink.d5").css('background-position', '0 0');
		$(".item1, .item2, .item3, .item4, .item5").removeClass("active");
		$(".item1, .item2, .item3, .item4, .item5").removeClass("finger");
		$(".item1, .item2, .item3, .item4, .item5").removeClass("error");
		$(".item-msg").hide();
		
		// fbFans();
		
		
	}
	
	//---遊戲按鈕監聽---
	function setGameButton(){
		
		//##### game answers #####
		$(".item-list").children("div").on("click", function(){
			offGameButton();
			var click_item = $(".item-list").children("div").index($(this))+1;
			if(_gameObj.qA==click_item){
				$(".item"+click_item).removeClass("active");
				$(".item"+click_item).removeClass("finger");
				
				_gameObj.oldArea = '';
				_gameObj.nowArea = 'drinking';
				changeArea();
				setGameButton();
				drinking_function(click_item);
				
			}else{
				$(".item"+click_item).addClass("error");
				TweenMax.killTweensOf($(".item"+click_item+" .wrong"));
				TweenMax.to($(".item"+click_item+" .wrong"), 0.05, {/*scale:1.2,*/ x:"+=10", yoyo:true, repeat:5, 
						onComplete:function(){
							$(".item"+click_item).removeClass("error");
							setGameButton();
						}
					});
			}
			
		});
		
		//##### drinking #####
		$('#drinking .drink, #drinking .finger').on("click",function(){
			offGameButton();
			$("#drinking .finger").hide();
			$(".drink.d"+_gameObj.qA).pictureani_play();
			setGameButton();
		});
		
	}
	
	//---遊戲按鈕監聽(移除)---
	function offGameButton(){
		$(".item-list").children("div").off("click");
		$('#drinking .drink, #drinking .finger').off("click");
	}
	
//################################################################################################
	
	//---開始動態setting---
	function goGame(){
		_gameObj.readyNum=0;
		$(".start-countdown").show();
		$(".msg-cont").css({'background-position': '0 -828px'});
		TweenMax.from($(".start-countdown"), 0.7, {scale:1.3, repeat:2, onRepeat:readyGame, ease:Cubic.easeInOut});
	}
	
	//---遊戲倒數開始 3 2 1---
	function readyGame(){
		_gameObj.readyNum++;
		if(_gameObj.readyNum==1){
			TweenLite.set($(".msg-cont"), {'background-position': '0 -414px'});
		}
		if(_gameObj.readyNum==2){
			TweenLite.set($(".msg-cont"), {'background-position': '0 0'});
			var t = setTimeout(startGame,500);
		}
	}
//------------------------------------------------------------------------------
	//---遊戲開始---
	function startGame(){
		
		Fun.eleFadeOut($(".start-countdown"));
		
		_gameObj.gameBol = true;
		//-- addCharacter(_gameObj.firstAdd);
		startTimer();
		question_function();
		//setGameTimeText();
		//-- if(!Fun.detectmobile.isMobile){
		//-- 	productLoop();
		//-- }
		
		//TweenMax.ticker.addEventListener("tick", onTick);
	}
	
	//---遊戲結束---
	function gameEnd(){
		
		delete _gameObj.gameBol;
		
		$("#drinking").attr("class",_drinkClass);
		
		if(_gameObj.drinkNum>=5){
			// ajax_AddGame({status:true});
		}else{
			// ajax_AddGame({status:false});
		}
		Fun.eleFadeOut(_page_loading);
		_gameObj.oldArea = 'drinking';
		_gameObj.nowArea = 'gameover';
		$("#gameover").addClass("timeout");
		changeArea(timeout);
		
		/*
		_gameObj.oldArea = 'drinking';
		_gameObj.nowArea = 'gameover';
		$("#gameover").addClass("timeout");
		
		
		//$("#drinking").show();
		
		changeArea(timeout);
		*/
		//--  delete _gameObj.calpisBottle;
		//--  sceneUp();
		//--  setGameText();
		//--  productClearTime();
		//--  TweenMax.ticker.removeEventListener("tick", onTick);
		//--  TweenMax.killChildTweensOf(_gameObj.objectAreaEle[0]);
		//--  element.trigger('gameEnd', _gameObj.scope);
	}
	
	//---計時---
	function startTimer(){
		if(_gameObj.gameTimer){
			_gameObj.timeNum--;
			window.clearTimeout(_gameObj.gameTimer);
		}
		if(_gameObj.timeNum > 0){
			_gameObj.gameTimer = window.setTimeout(startTimer, 1000);
		}else{
			gameEnd();
		}
		setGameTimeText();
	}
	
	//---顯示倒數時間數字---
	function setGameTimeText(){
		
		var tt = leftZeroPad(_gameObj.timeNum,2);
		
		$(".minute").html(tt.substr(0,1));
		$(".second").html(tt.substr(1,1));
	}
//------------------------------------------------------------------------------	
	//---題目---
	function question_function(){
		
		if(_gameObj.gameBol){
			
			if(_gameObj.qInt>(_gameObj.qAr.length-1)){
				_gameObj.qInt = 0;
				_gameObj.qQ = 0;
				_gameObj.qA = 0;
			}
			
			_gameObj.qQ = _gameObj.qAr[_gameObj.qInt];
			_gameObj.qA = _gameObj.questionAr[_gameObj.qQ].type;
			$("#drinking").addClass("drink"+_gameObj.qA);
			
			$(".show-msg.item-msg .msg-cont").css({'background':'url('+_gameObj.questionAr[_gameObj.qQ].img+') 0 0 no-repeat'});	//question
			
			$(".item-msg").show();
			TweenMax.killTweensOf($(".item-msg"));
			TweenMax.from($(".item-msg"), 0.5, {scale:0.6, ease:Cubic.easeInOut, onComplete:function(){setTimeout(promptAnswers,200);}});
		}
	}
	//---答案提示---
	function promptAnswers(){
		if(_gameObj.gameBol){
			$(".item"+_gameObj.qA).addClass("active");
			$(".item"+_gameObj.qA).addClass("finger");
			
			TweenMax.killTweensOf($(".item"+_gameObj.qA+" .item-finger"));
			TweenMax.to($(".item"+_gameObj.qA+" .item-finger"), 0.2, {/*scale:1.2,*/ y:"+=10", yoyo:true, repeat:5, 
					onComplete:function(){
						$(".item"+_gameObj.qA).removeClass("active");
						$(".item"+_gameObj.qA).removeClass("finger");
					}
				});
		}
	}
//------------------------------------------------------------------------------
	//---drinking---
	function drinking_function(pInt){
		pInt = pInt || 0;
		if(_gameObj.gameBol){
			if(pInt>0){
				
				_gameObj.oldArea = '';
				_gameObj.nowArea = 'drinking';
				changeArea();
				
				$("#drinking .finger").show();
				TweenMax.killTweensOf($("#drinking .finger"));
				TweenMax.from($("#drinking .finger"), 0.5, {top:582, repeat:5, ease:Cubic.easeInOut, 
						onComplete:function(){
							Fun.eleFadeOut($("#drinking .finger"));
						}
					});
				
			}
		}
	}
	
	//---飲料喝完---
	function drinking_end(pInt){
		if(_gameObj.gameBol){
			
			$("#drinking").removeClass("drink"+pInt);
			$(".drink.d"+pInt).css('background-position', '0 0');
			
			_gameObj.oldArea = 'drinking';
			_gameObj.nowArea = '';
			changeArea();
			_gameObj.oldArea = '';
			
			_gameObj.qInt++;
			question_function();
			
			_gameObj.drinkNum++;
			$(".drink-num").html(_gameObj.drinkNum);
		}
	}
	
//------------------------------------------------------------------------------
	//---timeout---
	function timeout(){
		TweenMax.from($("#gameover .timeout-cont"), 0.05, {x:"+=10", yoyo:true, repeat:30, ease:Cubic.easeInOut, 
				onComplete:function(){
					$("#gameover").removeClass("timeout");
					if(_gameObj.drinkNum>=5){
						$("#gameover").addClass("success");
					}else{
						$("#gameover").addClass("fail");
					}
				}
			});
	}
	
//################################################################################################
		
	//---popup 切換---
	function changeArea(pComplete){
		if(_gameObj.nowArea){
			Fun.eleFadeIn($("#"+_gameObj.nowArea),"slow",pComplete);
			PopupShowHideSet(true);
		}else{
			if (typeof pComplete === 'function') {
				pComplete();
			}
			PopupShowHideSet();
		}
		if(_gameObj.oldArea){
			$("#"+_gameObj.oldArea).hide();
		}
	}
	
	//---popup 切換 show&hide setting---
	function PopupShowHideSet(pBol){
		pBol = pBol || false;
		if(pBol){
			$('.menu-btn').hide();
			$('.pop-close-btn').css('right', 29);
			$('.popup').css('overflow-y', 'auto');
			$('body').css('overflow', 'hidden');
			$('.logo').css('position', 'fixed');
		}else{
			Fun.eleFadeIn($('.menu-btn'));
			$('.pop-close-btn').css('right', 12);
			$('.popup').css('overflow-y', 'hidden');
			$('body').css('overflow', 'auto');
			$('.logo').css('position', 'absolute');
		}
	}
	
//################################################################################################
	
	//---左邊補0---
	var MANY_ZEROS = "000000000000000000";
	function leftZeroPad(val, minLength) {
		if (typeof(val) != "string")
			val = String(val);
		return (MANY_ZEROS.substring(0, minLength - val.length)) + val;
	}
	
	//---隨機取得陣列之一(int)---
	function getRndNum(pArr){
		return parseInt(pArr.length * Math.random(), 10);
	}
	
	//---隨機生成數(整數)---
	function generateRandom(minNum,maxNum){
		return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
	}
	
	//---隨機生成不重複數(整數)陣列(一組)---
	function generateRandomArr(minNum,maxNum){
		
		var pAr = new Array();
		while(pAr.length<(maxNum)){
			var rand = generateRandom(minNum,maxNum);
			var inarr = false;
			for(var i = 0 ; i < pAr.length; i++){
				if(pAr[i] == rand){
					inarr = true;
					break;
				}
			}
			if(!inarr){
				pAr.push(rand);
			}else{
				inarr = false;
			}
		}

		return pAr;
	}
	
	//---隨機生成不重複數(整數)陣列(多組)---
	function generateRandomArr2(minNum,maxNum,n){
		
		var bAr = new Array();
		
		for(var k=0; k<n; k++){
			var pAr = new Array();
			while(pAr.length<(maxNum)){
				var rand = generateRandom(minNum,maxNum);
				var inarr = false;
				for(var i = 0 ; i < pAr.length; i++){
					if(pAr[i] == rand){
						inarr = true;
						break;
					}
				}
				if(!inarr){
					pAr.push(rand);
					bAr.push(rand);
				}else{
					inarr = false;
				}
			}
		}

		return bAr;
	}
	
//################################################################################################
	
	//---facebook fun---
    
	window.fbInitCallBack = function(pBol){
        pBol = pBol || false;
		
        if(pBol){
            bgonload(1);
        }else{
            alert("你尚未登入FB或尚未同意可爾必思API！");
            window.location.href = "index.html";
        }
    };
	
	

    window.fbUIShareCallBack = function(pBol,_postid){
        pBol = pBol || false;
        
		
        if(pBol){
            ajax_AddShare({event_id:_userObj.event_id,post_id:_postid});
        }else{
            //window.location.href = "index.html";
			Fun.eleFadeOut(_page_loading);
        }
    }
	
//################################################################################################
	function fbFans(){
	  
		if($.cookie('calpis_tw_roast2016')=='tw_roast2016'){
			//_page_loading.show();
			//_gameObj.oldArea = 'fb-page';
			_gameObj.nowArea = 'game-intro';
			//changeArea(function(){_page_loading.hide();});
		}else{
			$.cookie('calpis_tw_roast2016', 'tw_roast2016', {expires:7});
		}
		
		
    }
//################################################################################################
	function getFbObj(){
		var obj = {};
		obj.fb_id = FBapi.userObj.fb_id;
		obj.fb_name = FBapi.userObj.fb_name;
		obj.fb_accessToken = FBapi.userObj.fb_accessToken;
		/*obj.fb_id = "aa123456789";
		obj.fb_name = "samuel";*/
		obj.device = "pc";
		if(Fun.detectmobile.isMobile){
			obj.device = "m";
		}

		return obj;
	}
//################################################################################################
	function fbUIShare(){
        var shareObj = {};
        shareObj.link = FBapi.host_name + "fb.html?utm_source=facebook&utm_medium=social&utm_campaign=roast2016&utm_content=fbshare&rnd=" + parseInt(Math.random() * 100000);
        shareObj.picture = FBapi.host_name + "images/fb800x418.jpg" + "?rnd=" + parseInt(Math.random() * 100000);
        shareObj.name = "烤肉絕配♥ Peace+1最對味";
        shareObj.caption = "烤肉絕配♥ Peace+1最對味";
        shareObj.description = "恭喜你得到烤肉達人認證，可瑪熊給你一個讚！一起揪捧由來挑戰，超過100個好禮等你帶回家！";
		
        FBapi.fbUIShare(shareObj);
        Fun.eleFadeIn(_page_loading);
    }
//################################################################################################
	
	//---ajax---
	
	function ajax_GameStart(pObj){
		Fun.eleFadeIn(_page_loading);
		var sendObj = $.extend(getFbObj(), pObj);
		
		//ajax 存資料到資料庫
		$.ajax({
			url: 'actions/GameStart.php',
			cache: false,
			dataType: 'json',
			type:'POST',
			data: sendObj,
			success: function(response) {
					if(response['result']){
						_userObj.event_id = response.event_id;
						
						_gameObj.oldArea = 'game-intro';
						_gameObj.nowArea = '';
						changeArea(goGame);
						_page_loading.hide();
						
					}else{
						alert(response['msg']);
						Fun.eleFadeOut(_page_loading);
					}
				},
			error:function(){
				alert("error");
				Fun.eleFadeOut(_page_loading);
			}
		});
		
	}
	
	function ajax_AddGame(pObj){
		Fun.eleFadeIn(_page_loading);
		var sendObj = $.extend(getFbObj(), pObj);
		sendObj.event_id = _userObj.event_id;
		
		//ajax 存資料到資料庫
		$.ajax({
			url: 'actions/AddGame.php',
			cache: false,
			dataType: 'json',
			type:'POST',
			data: sendObj,
			success: function(response) {
					
					if(response['result']){
						_userObj.form = response.form;
						
						Fun.eleFadeOut(_page_loading);
						_gameObj.oldArea = 'drinking';
						_gameObj.nowArea = 'gameover';
						$("#gameover").addClass("timeout");
						changeArea(timeout);
						
					}else{
						alert(response['msg']);
						Fun.eleFadeOut(_page_loading);
					}
				},
			error:function(){
				alert("error");
				Fun.eleFadeOut(_page_loading);
			}
		});
		
	}
	
	function ajax_AddUser(pObj){
		Fun.eleFadeIn(_page_loading);
		var sendObj = $.extend(getFbObj(), pObj);
		sendObj.event_id = _userObj.event_id;
		
		
		
		//ajax 存資料到資料庫
		$.ajax({
			url: 'actions/AddUser.php',
			cache: false,
			dataType: 'json',
			type:'POST',
			data: sendObj,
			success: function(response) {
					
					if(response['result']){
						$("#fillInfo").removeClass("fill");
						$("#fillInfo").addClass("send-ok");
						clear_form_function();//清空form
						form_send_function();
						Fun.eleFadeOut(_page_loading);
					}else{
						alert(response['msg']);
						Fun.eleFadeOut(_page_loading);
						form_send_function();
					}
				},
			error:function(){
				alert("error");
				Fun.eleFadeOut(_page_loading);
				form_send_function();
			}
		});
		
	}
	
	function ajax_AddShareClick(pObj){
		Fun.eleFadeIn(_page_loading);
		var sendObj = $.extend(getFbObj(), pObj);
		sendObj.event_id = _userObj.event_id;
		
		
		
		//ajax 存資料到資料庫
		$.ajax({
			url: 'actions/AddShareClick.php',
			cache: false,
			dataType: 'json',
			type:'POST',
			data: sendObj,
			success: function(response) {
					
					if(response['result']){
						
						//Fun.eleFadeOut(_page_loading);
					}else{
						alert(response['msg']);
						//Fun.eleFadeOut(_page_loading);
					}
				},
			error:function(){
				alert("error");
				//Fun.eleFadeOut(_page_loading);
			}
		});
		
	}
	
	function ajax_AddShare(pObj){
		Fun.eleFadeIn(_page_loading);
		var sendObj = $.extend(getFbObj(), pObj);
		
		
		
		//ajax 存資料到資料庫
		$.ajax({
			url: 'actions/AddShare.php',
			cache: false,
			dataType: 'json',
			type:'POST',
			data: sendObj,
			success: function(response) {
					
					if(response['result']){
						window.location.href="index.html";
						//Fun.eleFadeOut(_page_loading);
					}else{
						alert(response['msg']);
						Fun.eleFadeOut(_page_loading);
					}
				},
			error:function(){
				alert("error");
				Fun.eleFadeOut(_page_loading);
			}
		});
		
	}
	
	//表單setting
	function initForm(pData){
		$('input[placeholder]').placeholder();
		$('input[placeholder]').each(function(){
			$(this).on("focus",function(){
				$(this).attr("placeholder",'');
			});
			$(this).on("blur",function(){
				$(this).attr("placeholder",$(this).attr("prompt"));
			});
		});
		
		
		var addressObj = {};
		addressObj.countyName = "city";
		addressObj.districtName = "area";
		addressObj.zipcodeName = "code";
		addressObj.css = ["add1","add2","add4"];
		$('.formAddress').twzipcode(addressObj);
		
	}

	//表單判斷
	function formCheck(){
		
		//------------------
		if(!$('#fillInfo .tick').hasClass('active')){
            alert("您尚未閱讀權利義務之相關條款");    
			form_send_function();			
            return false;
        }
		
		//------------------
		var inputName = $("input.name");
		if(inputName.val() == "" || inputName.val() == inputName.attr('prompt') ){
			alert(inputName.attr('prompt'));                            
			form_send_function();		
			return false;
		}
		
		//------------------
		var phone_check=/^0[0-9]{9,9}$/;
		var inputPhone = $("input.phone");
		if(inputPhone.val() == "" || inputPhone.val() == inputPhone.attr('prompt') ){
			alert(inputPhone.attr('prompt'));
			form_send_function();		
			return false;
		}
		if(!phone_check.test(inputPhone.val())){
			alert("電話格式錯誤(範例：手機0912345678)");
			form_send_function();		
			return false;
		}
		
		//------------------
		var email_check = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var inputEmail = $("input.mail");
		
		if(inputEmail.val() == "" || inputEmail.val() == inputEmail.attr('prompt') ){
			alert(inputEmail.attr('prompt'));
			form_send_function();		
			return false;
		}
		
		if(!email_check.test(inputEmail.val())){
			alert("email格式錯誤");
			form_send_function();		
			return false;
		}
		
		//------------------
		if($("#city").val() == ""){
			alert("請選擇縣市");             
			form_send_function();		
			return false;
		}
		if($("#area").val() == ""){
			alert("請選擇地區");             
			form_send_function();		
			return false;
		}
		
		//------------------
		var inputAddress = $("input.add3");
		if(inputAddress.val() =="" || inputAddress.val() == inputAddress.attr('prompt') ){
			alert(inputAddress.attr('prompt'));
			form_send_function();		
			return false;
		}
		
		
		//------------------
		//------------------
		//------------------
		
		var sendObj = {};
		sendObj.name = inputName.val();
		sendObj.phone = inputPhone.val();
		sendObj.email = inputEmail.val();
		sendObj.city = $('#city').val();
		sendObj.area = $('#area').val();
		sendObj.code = $('#code').val();
		sendObj.address = inputAddress.val();
		
		// ajax_AddUser(sendObj);
		$("#fillInfo").removeClass("fill");
		$("#fillInfo").addClass("send-ok");
		clear_form_function();//清空form
		form_send_function();
		Fun.eleFadeOut(_page_loading);
		
	}
	
	//清空form
	function clear_form_function(){
		
		$("input").each(function(i){
		  switch($(this).attr('type')){
			case 'radio':
			  // --- 取消所有選取 ---
			  //$(this).attr("checked", false);
			  $(this)[0].checked = false;
			case 'checkbox':
			  // --- 取消所有選取 ---
			  //$(this).attr("checked", false);
			  $(this)[0].checked = false;
			break;
			case 'text':
			case 'tel':
			case 'email':
			  // --- 清空 text 來欄位 ---
			  $(this).attr("value", "");
			  //$(this).val($(this).attr("prompt"));
			break;
			/*case 'select-one':
			  // --- 把 select 元件都歸到選第一項 ---
			  $(this)[0].selectedIndex = 0;
			break;
			case 'password':
			  // --- 清空 password 來欄位 ---
			  $(this).attr("value", "");
			case 'hidden':
			  // --- 不清空 hidden，通常保純此欄位 ---
			case 'textarea':
			  // --- 清空 textarea 來欄位 ---
			  $(this).attr("value", "");
			break; */
		  }
		});
		
		// $("#city")[0].selectedIndex = 0;
		// $("#area").html('<option value="">選擇區域</option>');
		// $("#area")[0].selectedIndex = 0;
		
	}

//################################################################################################
	function MenuPopupShowHideSet(pBol){
		pBol = pBol || false;
		if(pBol){
			window.clearTimeout(_gameObj.gameTimer);
			$('.menu-btn').hide();
			Fun.eleFadeIn($('#menu.popup'));
			$('.pop-close-btn').css('right', 29);
			$('.popup').css('overflow-y', 'auto');
			$('body').css('overflow', 'hidden');
			//$('.logo').css('position', 'fixed');
		}else{
			if(!($("#gameover").hasClass("timeout"))){
				startTimer();
			}
			Fun.eleFadeIn($('.menu-btn'));
			Fun.eleFadeOut($('#menu.popup'));
			$('.pop-close-btn').css('right', 12);
			$('.popup').css('overflow-y', 'hidden');
			$('body').css('overflow', 'auto');
		}
	}
//------------------------------------------------------------------------------	
//------------------------------------------------------------------------------	
	/*
	function changeEle(pEle, pSpeed) {
		_gameObj.nowEle = pEle;
		switch(_gameObj.nowEle) {
			case "fb-page":
				eleShowAndHide("#fb-page", pSpeed);
				break;
			case "game-intro":
				eleShowAndHide("#game-intro", pSpeed);
				break;
			case "drinking":
				eleShowAndHide("#drinking", pSpeed);
				break;
			case "gameover":
				eleShowAndHide("#gameover", pSpeed);
				break;
			case "fillInfo":
				eleShowAndHide("#fillInfo", pSpeed);
				break;
				
		}
	}
	function eleShowAndHide(pEle, pSpeed) {
		eleHide(pSpeed);
		eleShow(pEle, pSpeed);
	}
	function eleShow(pEle, pSpeed, pCallback) {
		pSpeed = pSpeed || 'normal';
		$('.menu-btn').hide();
		$('.pop-close-btn').css('right', 29);
		$('.popup').css('overflow-y', 'auto');
		$('body').css('overflow', 'hidden');
		$(pEle).fadeIn(pSpeed, function() {
			if (typeof pCallback === 'function') {
				pCallback();
			}
		});

		$('.logo').css('position', 'fixed');
	}
	function eleHide(pSpeed, pCallback) {
		pSpeed = pSpeed || 'normal';
		$('.menu-btn').fadeIn();
		$('.pop-close-btn').css('right', 12);
		$('.popup').css('overflow-y', 'hidden');
		$('body').css('overflow', 'auto');
		$('.popup').fadeOut(pSpeed, function() {
			if (typeof pCallback === 'function') {
				pCallback();
			}
		});

		$('.logo').css('position', 'absolute');
	}
	*/
})(jQuery);