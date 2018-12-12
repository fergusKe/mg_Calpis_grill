// JavaScript Document
(function(){
    function AutoFlutter(element, setting){
        //console.log(element.css('bottom'));
        //console.log(element.css('top'));
        var _moveBol = true;
        function aniMove(){
            var moveObj = {};
            if(setting.top){
                moveObj.marginTop = 0;
                if(_moveBol){
                    moveObj.marginTop = setting.top;
                }
                moveObj.marginTop += "px";
            }
            
            if(setting.bottom){
                moveObj.marginBottom = 0;
                if(_moveBol){
                    moveObj.marginBottom = setting.bottom;
                }
                moveObj.marginBottom += "px";
            }
            
            if(setting.left){
                moveObj.marginLeft = 0;
                if(_moveBol){
                    moveObj.marginLeft = setting.left;
                }
                moveObj.marginLeft += "px";
            }
            
            if(setting.right){
                moveObj.marginRight = 0;
                if(_moveBol){
                    moveObj.marginRight = setting.right;
                }
                moveObj.marginRight += "px";
            }
            
            _moveBol = !_moveBol;
            element.animate(moveObj, setting.timer * 1000, aniMove);
            /*moveObj.onComplete = aniMove;
            moveObj.ease = setting.ease;
            TweenMax.to(element, setting.timer, moveObj);*/
        }
        if(setting.delay){
            setTimeout(aniMove, setting.delay * 1000);
        }else{
            aniMove();    
        }
    }
    $.fn.autoflutter = function(options){
        var defaultSetting = {
            timer:      1
            ,delay:      false//延遲時間
            ,top:        false//飄動(上下)
            ,bottom:     false//飄動(上下)
            ,left:       false//飄動(左右)
            ,right:      false//飄動(左右)
            //,ease:       Linear.easeNone//移動曲線
        }
        
        var _setting = $.extend( defaultSetting, options );
        
        return this.each(function(){
            new AutoFlutter($(this), _setting)
        })
    }
})(jQuery)