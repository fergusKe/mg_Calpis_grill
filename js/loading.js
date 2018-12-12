// ###### loading ######
//----------------
var _page_loading;
//----------------
(function($){
	
		//----------------
		$(function(){
			waitforimages_spin();	//loading
		});
		//----------------
		//----------------
		var spinner;
		//opts 可从网站在线制作
		var opts = {
			//innerImage: {url: 'images/_logo.png', width: 56, height: 56 }, //内部图片            
			lines: 13, // 花瓣数目
			length: 25, // 花瓣长度
			width: 8, // 花瓣宽度
			radius: 25, // 花瓣距中心半径
			corners: 1, // 花瓣圆滑度 (0-1)
			rotate: 0, // 花瓣旋转角度
			direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
			color: '#461F02', // 花瓣颜色
			speed: 1, // 花瓣旋转速度
			trail: 60, // 花瓣旋转时的拖影(百分比)
			shadow: false, // 花瓣是否显示阴影
			hwaccel: false, //spinner 是否启用硬件加速及高速旋转            
			className: 'spinner', // spinner css 样式名称
			zIndex: 2e9, // spinner的z轴 (默认是2000000000)
			top: 'auto', // spinner 相对父容器Top定位 单位 px
			left: 'auto', // spinner 相对父容器Left定位 单位 px
			position: 'relative', // element position
			progress: true,      // show progress tracker
			progressTop: 0,       // offset top for progress tracker
			progressLeft: 0       // offset left for progress tracker
		};
	//----------------
		function waitforimages_spin(){
			spinner = new Spinner(opts);
			page_loading_rander();
			spinner.spin($("#page_loading .loading_img").get(0));
			
			$('body').waitForImages({
				waitForAll: true, 
				each: function(loaded, count, success) {
				   //console.log("loaded:"+loaded+" / count:"+count+" / success:"+success);
				   //console.log(loaded + ' / ' + count + ' 張圖片 ' + (success ? '載入成功' : '載入失敗') +  '.');
				}, 
				finished: function() {
					//console.log('all loaded.');
					console.log('全部圖片都已經載入完畢.');
					//eleFadeOut(_page_loading);
					if (window.pageLoadCallBack) {  
						window.pageLoadCallBack();  
					} else {  
						_page_loading.hide();
					}
				}
			});
			
		}
	//----------------
		/*function isFun(pObj){
			return (pObj && typeof pObj === "function")
		}*/
	//----------------
		function page_loading_rander(){
			//console.log("page_loading_rander");
			//Loading...
			var loading = 
				'<div id="page_loading"> \
					<div class="loading_img"> \
						<p class="loading_text"></p> \
					</div> \
					<div class="loading_bg"></div> \
				</div>';
			
			$('body').children().eq(0).before(loading);
			
			_page_loading = $('#page_loading');
			_page_loading.css({
				'width':'100%', 
				'height':'100%', 
				'z-index':'10000', 
				'position':'fixed', 
				'display':'block', 
				'top':'0px', 
				'left':'0px'
			});
			_page_loading.find('.loading_img').css({
					'top':'50%', 
					'left':'50%', 
					'margin':'-50px 0 0 -50px', //h/2 & w/2
					'position':'absolute', 
					'z-index':100, 
					'width':'100px', 
					'height':'100px'
			});
			//_page_loading.find('.loading_img').pictureani({frameWidth:220, frameHeight:19, totalFrames:10, loop:true, autoBack:true});
		   _page_loading.find('p.loading_text').css({
						'top':'90px', 
						'left':'15px', 
						'position':'absolute', 
						'font-size':'18px', 
						'color':'#5d9e0f'
			});
			_page_loading.find('.loading_bg').css({
					'width':'100%', 
					'height':'100%', 
					'position':'absolute', 
					'background': 'rgba(255, 216, 0, 0.8)'
					//'background-color':'#ffffff', //#C0C0C0
					//'opacity':0.3
			});
		}
	//----------------
})(jQuery);	