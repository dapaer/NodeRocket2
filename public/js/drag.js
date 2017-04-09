$.fn.extend({
	//---元素拖动插件
	dragging: function(data) {
		var $this = $(this);
		var xPage;
		var yPage;
		var X; //
		var Y; //
		var xRand = 0; //
		var yRand = 0; //
		var father = $this.closest('.'+data.parentClass);
		var flag = 0;
		var thisTarget = data.thisTarget;
		var defaults = {
			move: 'both',
			randomPosition: true,
			hander: 1
		}
		var opt = $.extend({}, defaults, data);
		var movePosition = opt.move;
		var random = opt.randomPosition;

		var hander = opt.hander;

		if (hander == 1) {
			hander = $this;
		} else {
			hander = $this.find(opt.hander);
		}


		//---初始化
		hander.css({
			"cursor": "move"
		});

		var faWidth = father.width();
		var faHeight = father.height();
		
		var thisWidth = $this.width() + parseInt($this.css('padding-left')) + parseInt($this.css('padding-right'))+$(thisTarget).width();
		var thisHeight = $this.height() + parseInt($this.css('padding-top')) + parseInt($this.css('padding-bottom'));

		var mDown = false; //
		var positionX;
		var positionY;
		var moveX;
		var moveY;
		
		var startTime;
		var endTime;
		//PC端记录位置
		hander.mousedown(function(e) {
			startTime = new Date().getTime();
			father.children().css({
				"zIndex": "0"
			});
			$(thisTarget).css({
				"zIndex": "1050"
			});
			mDown = true;
			X = e.pageX;
			Y = e.pageY;
			positionX = $(thisTarget).position().left;
			positionY = $(thisTarget).position().top;
			if(hander.css('position')=='fixed'){
				positionY = $(window).height()-$(father).offset().top- parseInt($(thisTarget).css('bottom')) - $(thisTarget).height();
				positionX = $(thisTarget).position().left - $(father).offset().left;
			}
			$(thisTarget).css({
				'position':'absolute',
				'left':positionX,
				'top':positionY,
				'right':'auto'
			})
			return false;
		});
		
		hander.mouseup(function(){
			endTime = new Date().getTime();
			if(endTime-startTime<200){
				data.clickFn();
			}
		})

		//手机端记录位置
		hander[0].addEventListener('touchstart', function(e) {
			event.preventDefault(); // 阻止浏览器默认事件，重要 
			startTime = new Date().getTime();
			father.children().css({
				"zIndex": "0"
			});
			$(thisTarget).css({
				"zIndex": "1050"
			});
			mDown = true;
			var touch = e.targetTouches[0];
			X = touch.pageX;
			Y = touch.pageY;
			positionX = $this.position().left;
			positionY = $this.position().top;
			if(hander.css('position')=='fixed'){
				positionY = $(window).height()-$(father).offset().top- parseInt(hander.css('bottom')) - hander.height();
				positionX = $this.position().left - $(father).offset().left;
			}
			hander.css({
				'position':'absolute',
				'left':positionX,
				'top':positionY
			})
			return false;
		});

		//window.resize
		$(window).resize(function(){
			setTimeout(function(){
				if($this[0].getBoundingClientRect().right >= $(window).width()){
					$this.css({
						"left": father.width() - thisWidth
					});
				}
			});		
		})

		//拖动方法
		var VmMove = function(e) {
			xPage = e.pageX; //--
			moveX = positionX + xPage - X;

			yPage = e.pageY; //--
			moveY = positionY + yPage - Y;

			function thisXMove() { //x轴移动
				if (mDown == true) {
					$this.css({
						"left": moveX
					});
				} else {
					return;
				}
				if (moveX < 0) {
					$this.css({
						"left": "0"
					});
				}
				if (moveX > (father.width() - thisWidth)) {
					$this.css({
						"left": father.width() - thisWidth
					});
				}
				return moveX;
			}

			function thisYMove() { //y轴移动
				if (mDown == true) {
					$this.css({
						"top": moveY
					});
				} else {
					return;
				}
				if (moveY < 0) {
					$this.css({
						"top": "0"
					});
				}
				if (moveY > (father.width() - thisHeight-10)) {
					$this.css({
						"top": father.width() - thisHeight-10
					});
				}
				return moveY;
			}

			function thisAllMove() { //全部移动
				if (mDown == true && xPage!=X) {
					$(thisTarget).css({
						"left": moveX,
						"top": moveY
					});
				} else {
					return;
				}
				if (moveX < 0) {
					$(thisTarget).css({
						"left": "0"
					});
				}
				if (moveX > (father.width() - thisWidth)) {
					$(thisTarget).css({
						"left": father.width() - thisWidth
					});
				}

				if (moveY < 0) {
					$(thisTarget).css({
						"top": "0"
					});
				}
				if (moveY > (faHeight - thisHeight)) {
					$(thisTarget).css({
						"top": faHeight - thisHeight
					});
				}
			}
			if (movePosition.toLowerCase() == "x") {
				thisXMove();
			} else if (movePosition.toLowerCase() == "y") {
				thisYMove();
			} else if (movePosition.toLowerCase() == 'both') {
				thisAllMove();
			}
		}
		
		
		function onMouseUpHandler(e) {
			mDown = false;
		}
		function onMouseMoveHandler(e) {
			VmMove(e);
		}
		function onTouchmove(event) {
			// 如果这个元素的位置内只有一个手指的话
			if (event.targetTouches.length == 1) {
				if(mDown){
					event.preventDefault(); // 阻止浏览器默认事件，重要 
				}
				var touch = event.targetTouches[0];
				VmMove(touch);
			}
		}
		 function onTouchend(event) {
			mDown = false;
			endTime = new Date().getTime();
			if(endTime-startTime<200){
				data.clickFn();
			}
		}
		//PC端拖动方法
		$(document).bind("mouseup",onMouseUpHandler);

		$(document).bind("mousemove",onMouseMoveHandler);


		document.addEventListener("touchmove",onTouchmove);
		document.addEventListener("touchend",onTouchend);


		function destory(){
				$(document).unbind('mouseup', onMouseUpHandler);
				$(document).unbind('mousemove', onMouseMoveHandler);
				document.removeEventListener("touchmove",onTouchmove);
				document.removeEventListener("touchend",onTouchend);
		}
		
		return {
			destory:destory
		}
	}
})
