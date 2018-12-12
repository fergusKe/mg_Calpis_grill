// JavaScript Document
/*
    posArr
    hitEle
    viewEle
    productEle
 */
(function($){
    function GameBBQ(element, options){
        var _setting = $.extend({}, options),
            _gameObj = {};
        
        function init(){
			//-- _gameObj.mouseObj = {};
			//-- _gameObj.objectAreaEle = element.find('.objectArea');
			//-- _gameObj.tranbtnAreaEle = element.find('.tranbtnArea');
			//-- _gameObj.calpisSupplyEle = element.find('.calpisSupply');
			//-- _gameObj.timeEle = element.find('.countArea .timmerNum span');
			//-- _gameObj.successEle = element.find('.countArea .successNum span');
           
			//_gameObj.peopleArr = [];
			_gameObj.questionArr = [];
			//水語 water
			_gameObj.questionArr.push({style:"boy1", msgTypes:2, type:1});
			_gameObj.questionArr.push({style:"boy2", msgTypes:2, type:1});
			//蔬果 vegetable
			_gameObj.questionArr.push({style:"mom1", msgTypes:3, type:2});
			_gameObj.questionArr.push({style:"mom2", msgTypes:3, type:2});
			//葡萄 grapes
			_gameObj.questionArr.push({style:"girl1", msgTypes:3, type:3});
			_gameObj.questionArr.push({style:"girl2", msgTypes:3, type:3});
			//開心成長 calcium
			_gameObj.questionArr.push({style:"kid1", msgTypes:2, type:4});
			_gameObj.questionArr.push({style:"kid2", msgTypes:2, type:4});
			//濃郁 
			_gameObj.questionArr.push({style:"kid1", msgTypes:2, type:4});
			_gameObj.questionArr.push({style:"kid2", msgTypes:2, type:4});
			
			//setButton();
			//setEventListener();
        };
        //--  
        //--  function setButton(){
        //--  
        //--      _gameObj.calpisSupplyEle.find('div').on('mousedown', function(e){
        //--          e.preventDefault();
        //--      });
        //--  
        //--      _gameObj.calpisSupplyEle.find('.calpisBottle').mouseevent('down', function(e){
        //--          if(!_gameObj.gameBol) return;
        //--          var ele = $(e.currentTarget);
        //--          _gameObj.catchEle = ele;
        //--          _gameObj.catchCss = ele.data('data');
        //--          _gameObj.catchType = _gameObj.catchEle.parent().attr('id');
        //--          _gameObj.catchType = parseInt(_gameObj.catchType.substr(_gameObj.catchType.length - 1, 1), 10);
        //--          _gameObj.mouseObj.downX = parseInt(e.pageX, 10);
        //--          _gameObj.mouseObj.downY = parseInt(e.pageY, 10);
        //--          _gameObj.catchEle.css('z-index', 10);
        //--          _gameObj.tranbtnAreaEle.show();
        //--          if(Fun.detectmobile.isMobile){
        //--              _gameObj.calpisBottle = true;
        //--              calpisBottleChange($(e.currentTarget).parent());
        //--          }
        //--  
        //--      }).each(function(i){
        //--          var cssObj = {};
        //--          cssObj.left = parseInt($(this).css('left'), 10);
        //--          cssObj.top = parseInt($(this).css('top'), 10);
        //--          cssObj["z-index"] = $(this).css('z-index');
        //--          $(this).data('data', cssObj);
        //--      });
        //--  
        //--      $(document).mouseevent('up', function(e){
        //--          if(!Fun.detectmobile.isMobile){
        //--              sceneUp();
        //--          }else{
        //--              if(!_gameObj.calpisBottle){
        //--                  sceneUp();
        //--              }else{
        //--                  delete _gameObj.calpisBottle;
        //--              }
        //--          }
        //--  
        //--          
        //--      });
        //--  
        //--      if(!Fun.detectmobile.isMobile){
        //--          _gameObj.calpisSupplyEle.find('.product').on('mouseenter', function(e){
        //--              calpisOverOut($(this), true);
        //--          }).on('mouseleave', function(e){
        //--              calpisOverOut($(this), false);
        //--          });
        //--  
        //--          $(document).mouseevent('move', function(e){
        //--              _gameObj.mouseObj.x = parseInt(e.pageX, 10);
        //--              _gameObj.mouseObj.y = parseInt(e.pageY, 10);
        //--          });
        //--      }else{
        //--  
        //--      }
        //--      
        //--  }
        //--  
        //--  function setEventListener(){
        //--      element.bind('startGame', initGame);
        //--  }
        //--  
        //--  function calpisOverOut(pEle, pBol){
        //--      pBol = pBol || false;
        //--      if(_gameObj.catchEle || !_gameObj.gameBol) return;
        //--      if(pBol){
        //--          productClearTime();
        //--          pEle.addClass('over');
        //--      }else{
        //--          pEle.removeClass('over');
        //--          productStartTime();
        //--      }
        //--  
        //--  }
        //--  
        //--  function calpisBottleChange(pEle, pBol){
        //--      pBol = pBol || false;
        //--      _gameObj.calpisSupplyEle.find('.product').removeClass('over');
        //--      if(!pBol){
        //--          pEle.addClass('over');
        //--      }
        //--  }
        //--  
        //--  function sceneUp(){
        //--      if(!_gameObj.catchEle) return false;
        //--      TweenMax.to(_gameObj.catchEle, 0.2, {alpha:0, onCompleteParams:[_gameObj.catchEle], onComplete:function(pEle){
        //--          pEle.css(pEle.data('data'));
        //--          TweenMax.to(pEle, 0.2, {alpha:1});
        //--      }});
        //--  
        //--      if(!Fun.detectmobile.isMobile){
        //--          calpisOverOut(_gameObj.catchEle, false);
        //--      }else{
        //--          calpisBottleChange(_gameObj.catchEle, false)
        //--      }
        //--      
        //--      _gameObj.tranbtnAreaEle.hide();
        //--      delete _gameObj.catchEle;
        //--      delete _gameObj.catchType;
        //--  }
        //--  
        //--  //======遊戲相關======
        //--  //遊戲初始化
        //--  function initGame(){
        //--      _gameObj.objectAreaEle.find('.people').remove();
        //--      _gameObj.tranbtnAreaEle.find('.hit').remove();
        //--      _gameObj.posArr = $.extend([], _setting.posArr);
        //--      _gameObj.scope = 0;
        //--      _gameObj.firstAdd = 3;
        //--      _gameObj.maxAdd = 3;
        //--      _gameObj.addID = 1;
        //--      _gameObj.timeNum = 20;
        //--      _gameObj.addDelayNum = 20;
        //--      _gameObj.addDelay = _gameObj.addDelayNum;
        //--      _gameObj.needDelayNum = 30;
        //--      _gameObj.needDelay = _gameObj.needDelayNum;
        //--      _gameObj.standbyArr = [];
        //--      _gameObj.needArr = [];
        //--      _gameObj.productObj = {};
        //--      _gameObj.productObj.nowType = 0;
        //--      _gameObj.timeBarNum = 8;
        //--      startGame();
        //--  }
        //--  
        //--  //遊戲開始
        //--  function startGame(){
        //--      alert("startGame");
		//--  	/*_gameObj.gameBol = true;
        //--      addCharacter(_gameObj.firstAdd);
        //--      startTimer();
        //--      setGameText();
        //--      if(!Fun.detectmobile.isMobile){
        //--          productLoop();
        //--      }
        //--      
        //--      TweenMax.ticker.addEventListener("tick", onTick);*/
        //--  }
        //--  
        //--  //遊戲結束
        //--  function gameEnd(){
        //--      console.log("==== end ====");
        //--      delete _gameObj.gameBol;
        //--      delete _gameObj.calpisBottle;
        //--      sceneUp();
        //--      setGameText();
        //--      productClearTime();
        //--      TweenMax.ticker.removeEventListener("tick", onTick);
        //--      TweenMax.killChildTweensOf(_gameObj.objectAreaEle[0]);
        //--      element.trigger('gameEnd', _gameObj.scope);
        //--  }
        //--  
        //--  //計時
        //--  function startTimer(){
        //--      if(_gameObj.gameTimer){
        //--          _gameObj.timeNum--;
        //--          window.clearTimeout(_gameObj.gameTimer);
        //--      }
        //--  
        //--      if(_gameObj.timeNum > 0){
        //--          _gameObj.gameTimer = window.setTimeout(startTimer, 1000);
        //--      }else{
        //--          gameEnd();
        //--      }
        //--  }
        //--  
        //--  function onTick(){
        //--      _gameObj.addDelay--;
        //--      if(_gameObj.addDelay <= 0){
        //--          _gameObj.addDelay = _gameObj.addDelayNum;
        //--          addCharacter();
        //--      }
        //--  
        //--      _gameObj.needDelay--;
        //--      if(_gameObj.needDelay <= 0){
        //--          _gameObj.needDelay = _gameObj.needDelayNum;
        //--          //if(Math.random() > 0.5){
        //--              addNeed();
        //--          //}
        //--      }
        //--  
        //--      if(_gameObj.catchEle){
        //--          var moveCss = $.extend({}, _gameObj.catchCss);
        //--          moveCss.left -= _gameObj.mouseObj.downX - _gameObj.mouseObj.x;
        //--          moveCss.top -= _gameObj.mouseObj.downY - _gameObj.mouseObj.y;
        //--          delete moveCss["z-index"];
        //--          _gameObj.catchEle.css(moveCss);
        //--      }
        //--  
        //--      setGameText();
        //--  }
        //--  
        //--  function setGameText(){
        //--      _gameObj.timeEle.html(Fun.str_pad(_gameObj.timeNum, 2, "0"));
        //--      _gameObj.successEle.html(Fun.str_pad(_gameObj.scope, 2, "0"));
        //--  }
        //--  
        //--  function productLoop(){
        //--      productClearTime();      
        //--      _gameObj.productObj.nowType++;
        //--      if(_gameObj.productObj.nowType > 4){
        //--          _gameObj.productObj.nowType = 1;
        //--      }
        //--      _gameObj.calpisSupplyEle.find('#calpis' + _gameObj.productObj.nowType).addClass('over');
        //--      productStartTime();
        //--  }
        //--  
        //--  function productStartTime(){
        //--      _gameObj.productObj.timer = window.setTimeout(productLoop, 1000);
        //--  }
        //--  
        //--  function productClearTime(){
        //--      _gameObj.calpisSupplyEle.find('.product').removeClass('over'); 
        //--      if(_gameObj.productObj.timer){
        //--          window.clearTimeout(_gameObj.productObj.timer);
        //--          delete _gameObj.productObj.timer;
        //--      }
        //--  }

        //======遊戲相關 end======

        //======人物相關======
        //--  function addCharacter(pNum){
        //--      pNum = pNum || 0;
        //--      pNum += parseInt(_gameObj.maxAdd * Math.random(), 10);
        //--      while(pNum > 0){
        //--          pNum--;
        //--          if(_gameObj.posArr.length > 0){
        //--              var rndPos = _gameObj.posArr.splice(getRndNum(_gameObj.posArr), 1)[0];
        //--  
        //--              var peopleEle = renderCharacter(rndPos);
        //--              peopleEle.attr('id', _gameObj.addID);
        //--              _gameObj.objectAreaEle.append(peopleEle);
        //--              _gameObj.standbyArr.push(peopleEle);
        //--              _gameObj.addID++;
        //--          }else{
        //--              pNum = 0;
        //--          }
        //--      }
        //--  }
        //--  
        //--  function renderCharacter(pObj){
        //--      var ele = '',
        //--          cssObj = $.extend({}, pObj),
        //--          dataObj;
        //--      ele += '<div class="people">';
        //--      ele += '    <div class="talk">';
        //--      ele += '        <div class="talkTimer">';
        //--      ele += '            <div class="timebar"></div>';
        //--      ele += '        </div>';
        //--      ele += '    </div>';
        //--      ele += '    <div class="img"></div>';
        //--      ele += '</div>';
        //--      ele = $(ele); 
        //--      ele.css(cssObj);
        //--      dataObj = _gameObj.peopleArr[getRndNum(_gameObj.peopleArr)];
        //--      dataObj = $.extend({}, pObj, dataObj);
        //--      ele.addClass(dataObj.style);
        //--      if(pObj.reversed){
        //--          ele.addClass('right');
        //--      }
        //--      ele.css(setScale(cssObj.scale));
        //--      ele.data('data', dataObj);
        //--      return ele;
        //--  };
        //--  
        //--  function renderHitArea(pEle){
        //--      var ele = '',
        //--          cssObj = $.extend({}, pEle.data('data'));
        //--      ele += '<div class="hit"></div>';
        //--      ele = $(ele); 
        //--      ele.attr('id', pEle.attr('id'));
        //--      ele.css(cssObj);
        //--      ele.css(setScale(cssObj.scale));
        //--      ele.css('opacity', 0);
        //--      return ele;
        //--  }
        //--  
        //--  function addNeed(){
        //--      if(_gameObj.standbyArr <= 0 || _gameObj.needArr.length >= 2) return false;
        //--      var needEle = getRndEle(_gameObj.standbyArr);
        //--      _gameObj.needArr.push(needEle)
        //--      timebarStart(needEle);
        //--  }
        //--  
        //--  function timebarStart(pEle){
        //--      var moveObj = {},
        //--          talkEle = pEle.find('.talk');
        //--      moveObj.height = 0;
        //--      moveObj.onUpdateParams = [pEle.find('.img')];
        //--      moveObj.onUpdate = timebarUpdate;
        //--      moveObj.onCompleteParams = [pEle];
        //--      moveObj.onComplete = timebarComplete;
        //--      moveObj.ease = Linear.easeNone;
        //--      TweenMax.fromTo(talkEle, 0.2, {alpha:0}, {alpha:1, onStart:function(pEle){pEle.show();}, onStartParams:[talkEle]});
        //--      TweenMax.to(pEle.find('.timebar'), _gameObj.timeBarNum , moveObj);
        //--      talkEle.addClass('msg' + (parseInt(Math.random() * pEle.data('data').msgTypes) + 1));
        //--      var hitEle = renderHitArea(pEle);
        //--      _gameObj.tranbtnAreaEle.append(hitEle);
        //--      hitEle.mouseevent('up', function(e){
        //--          var checkEle = _gameObj.objectAreaEle.find('#' + e.currentTarget.id);
        //--          var dataObj = checkEle.data('data');
        //--          if(dataObj.type == _gameObj.catchType){
        //--              _gameObj.scope++;
        //--              timebarComplete(checkEle);
        //--              setGameText();
        //--          }
        //--      });
        //--  };
        //--  
        //--  function timebarUpdate(pImgEle){
        //--      var progress = this.progress();
        //--      if(progress > 0.75){
        //--          pImgEle.attr('class', "img cry");
        //--      }else if(progress > 0.4){
        //--          pImgEle.attr('class', "img angry");
        //--      }
        //--  };
        //--  
        //--  function timebarComplete(pEle){
        //--      TweenMax.killTweensOf(pEle);
        //--      _gameObj.tranbtnAreaEle.find("#" + pEle.attr('id')).remove();
        //--      TweenMax.to(pEle, 0.5, {alpha:0, onCompleteParams:[pEle], onComplete:function(pEle){
        //--          for(var delNum = 0; delNum < _gameObj.needArr.length; delNum++){
        //--              var delEle = _gameObj.needArr[delNum];
        //--              if(pEle[0] == delEle[0]){
        //--                  _gameObj.posArr.push($.extend({}, delEle.data('data')));
        //--                  _gameObj.needArr.splice(delNum, 1);
        //--                  break;
        //--              }
        //--          }
        //--          pEle.remove();
        //--      }});
        //--  };


        //======人物相關 end======

        //--  function setScale(pNum){
        //--      var css = {};
        //--      css.transform = 'scale(' + pNum + ')';
        //--      css["-webkit-transform"] = css.transform;
        //--      return css;
        //--  }
        //--  
        //--  function getRndEle(pArr){
        //--      return pArr.splice([getRndNum(pArr)], 1)[0];
        //--  };
        //--  
        //--  function getRndNum(pArr){
        //--      return parseInt(pArr.length * Math.random(), 10);
        //--  };

        //public
        this.changeData = function(pArr){
            _setting.posArr = $.extend([], pArr);
        };


        init();
    };
    
    $.fn.gamebbq = function(options){
        
        return this.each(function(){
            $( this ).data('gamebbq', new GameBBQ( $( this ), options) );
        });
    };
    
    /*$.fn.gamebbq_changedata = function(pArr){
        return this.each(function(){
            $( this ).data('gamebbq').changeData(pArr);
        });
    };*/
    
})(jQuery)