(function($) {
	$(function() {
		$('.main-cont').rollbar({pathPadding: '0px'});
	});
	
	window.pageLoadCallBack = function(){
		Fun.eleFadeOut(_page_loading);
		
	}
})(jQuery);