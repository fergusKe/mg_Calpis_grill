(function($) {
	
	$(function() {
		$(".s1, .s2, .s3, .start-btn").hide();
		setButton();
		// keyframe();
	});
	
	window.pageLoadCallBack = function(){
		
		window.setTimeout(function(){
			Fun.eleFadeOut(_page_loading);
			
			$('.move').automove();
			setTimeout(function(){
				$('.s3').pictureani({ frameWidth: 748, frameHeight: 678, fps: 4, totalFrames: 3, loop:true, width:748 });
				$('.start-btn').pictureani({ frameWidth: 300, frameHeight: 261, fps: 6, totalFrames: 2, loop:true, width:300 });
			}, 1000);
			
		}, 1500);
	}
	
	function setButton() {
		$(".start-btn a").on("click",function(e){
			e.preventDefault();
			window.location = 'game.html';
			// window.common_fb_connect();
		});
	}
	
	/*function keyframe() {
		startBtn_keyframe();
		s3_keyframe();
		function startBtn_keyframe() {
			var startBtn_index = 0;
			var startBtn = ['url(./images/index/start-btn.png) 0 0 no-repeat',
							'url(./images/index/start-btn.png) 0 -261px no-repeat'];
			var startBtn_keyframePlay = setInterval(function() {
				if (startBtn_index >= startBtn.length) {
					startBtn_index = 0;
				}
				$('.start-btn').css({
					'background': startBtn[startBtn_index],
					'background-size': 'cover'
				});
				startBtn_index++;
			}, 200);
		}
		function s3_keyframe() {
			var s3_index = 0;
			var s3 = ['url(./images/index/s3.png) 0 0 no-repeat',
							'url(./images/index/s3.png) 0 -669px no-repeat',
							'url(./images/index/s3.png) 0 -1337px no-repeat'];
			var s3_keyframePlay = setInterval(function() {
				if (s3_index >= s3.length) {
					clearInterval(s3_keyframePlay);
					setTimeout(s3_keyframe, 400);
				}
				$('.s3').css({
					'background': s3[s3_index],
					'background-size': 'cover'
				});
				s3_index++;
			}, 200);
		}
	}*/
})(jQuery);