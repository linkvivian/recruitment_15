var tag = 1
var index = 2
var inforId = ''
var player = {}
var timer = {
	left: null,
	right: null
}

var moblieEvent = {
	startX: 0,
	startY: 0,
	touchStartFunc: function(e) {
		try {
			// e.preventDefault();
			var touchPoint = e.touches[0]
			var x = Number(touchPoint.pageX)
			var y = Number(touchPoint.pageY)
			this.startX = x
			this.startY = y
		} catch(ex) {
			console.error(new Error(e.message))
		}
	},
	touchMoveFunc: function(e) {
		try {
			e.preventDefault()
			var touchPoint = e.touches[0]
			var x = Number(touchPoint.pageX)
			var y = Number(touchPoint.pageY)
		} catch(e) {
			console.error(new Error(e.message))
		}
	},
	touchEndFunc: function(e) {
		e.preventDefault()
		var touchPoint = e.changedTouches[0]
		var x = Number(touchPoint.pageX)
		var y = Number(touchPoint.pageY)
		if(x - this.startX > 6) {
			// console.log('上一张')
			// console.log(x - this.startX)
			if(tag <= 1) {
				tag = 6
			}
			clear()
			changeImg(--tag)
			play()
		}
		if(x - this.startX < -6) {
			// console.log('下一张')
			// console.log(x - this.startX)
			if(tag >= 5) {
				tag = 0
			}
			clear()
			changeImg(++tag)
			play()
		}
		if((x - this.startX > -6) && (x - this.startX < 6)) {
			// console.log(x - this.startX)
			// console.log('click')
			showInfor([$('#FrontEnd'), $('#Android'), $('#BackEnd'), $('#IOS'), $('#ML')])
		}
	},
	bindEvent: function() {
		var mask = document.getElementsByClassName('mask')[0]
		mask.addEventListener('touchstart', this.touchStartFunc.bind(this), false)
		mask.addEventListener('touchmove', this.touchMoveFunc.bind(this), false)
		mask.addEventListener('touchend', this.touchEndFunc.bind(this), false)
	},
}

function changeSpot(id) {
	var spots = $('.spot')
	for(var i = 0; i < spots.length; i++) {
		var tagId = calcTag(i + 1)
		if(tagId == id) {
			spots[i].className = 'spot active ' + tagId
		} else {
			spots[i].className = 'spot ' + tagId
		}
	}
}

function play() {
	player = setInterval(function() {
		if(tag >= 5) {
			tag = 0
		}
		changeImg(++tag)
	}, 5000)
}

function clear() {
	clearInterval(player)
}

function changeImg(id) {
	mask()
	if(Object.prototype.toString.call(id) == '[object Number]') {
		id = calcTag(id)
	}
	changeSpot(id)
	$('#'+id).css('z-index', index++)
}

function calcTag(t) {
	if(Object.prototype.toString.call(t) == '[object Number]') {
		switch(t) {
			case 1: return 'FrontEnd'
			case 2: return 'Android'
			case 3: return 'BackEnd'
			case 4: return 'IOS'
			case 5: return 'ML'
		}
	} else {
		switch(t) {
			case 'FrontEnd': return 1
			case 'Android': return 2
			case 'BackEnd': return 3
			case 'IOS': return 4
			case 'ML': return 5
		}
	}
}

function mask() {
	$($('.mask')[0]).addClass('maskAnimate')
	setTimeout(function() {
		$($('.mask')[0]).removeClass('maskAnimate')
	}, 1000)
}

function showInfor(arr) {
	var maxImg = max(arr)
	showDetail(maxImg.attr('id'))
}

function max(arr) {
	var maxImg = arr[0]
	for(var i = 0; i < arr.length - 1; i++) {
		if(parseInt(maxImg.css('z-index')) < parseInt(arr[i+1].css('z-index'))) {
			// console.log(arr[i+1].css('z-index'))
			maxImg = arr[i+1]
		}
	}
	return maxImg
}

function showDetail(id) {
	clear()
	$($('.wrapper')[0]).addClass('zeroHeight')
	$('#inforContainer').addClass('fullHeight')
	$('#infor-' + id).addClass('fullHeight')
	$($('.leftBtn')[0]).css('display', 'inline-block')
	$($('.rightBtn')[0]).css('display', 'inline-block')
	$('#goBack').css('display', 'inline-block')
	$('#directionId').css('display', 'inline-block')
	switch (id) {
		case 'FrontEnd':
			$('#directionName').text('前端')
			$('#directionDetails').text('创意、前沿技术')
			break;
		case 'Android':
			$('#directionName').text('安卓')
			$('#directionDetails').text('技术探索、培养模式')
			break;
		case 'BackEnd':
			$('#directionName').text('后台')
			$('#directionDetails').text('坚实后盾、严谨')
			break;
		case 'IOS':
			$('#directionName').text('iOS')
			$('#directionDetails').text('优雅极致、中流砥柱')
			break;
		case 'ML':
			$('#directionName').text('机器学习')
			$('#directionDetails').text('人工智能、大数据')
			break;		
	}
	inforId = id
}

function changeInfor(isFront) {
	var currentInfor = calcTag(inforId)
	if(isFront) {
		var nextInfor = calcTag(currentInfor + 1)
	} else {
		var nextInfor = calcTag(currentInfor - 1)
	}
	switch (nextInfor) {
		case 'FrontEnd':
			$('#directionName').text('前端')
			$('#directionDetails').text('创意、前沿技术')
			break;
		case 'Android':
			$('#directionName').text('安卓')
			$('#directionDetails').text('技术探索、培养模式')
			break;
		case 'BackEnd':
			$('#directionName').text('后台')
			$('#directionDetails').text('坚实后盾、严谨')
			break;
		case 'IOS':
			$('#directionName').text('iOS')
			$('#directionDetails').text('优雅极致、中流砥柱')
			break;
		case 'ML':
			$('#directionName').text('机器学习')
			$('#directionDetails').text('人工智能、大数据')
			break;		
	}
	if(nextInfor) {
		$('#infor-' + inforId).removeClass('fullHeight')
		$('#infor-' + nextInfor).addClass('fullHeight')
		scroll(0, 0)
		inforId = nextInfor
	} else {

	}
}

$($('.mask')[0]).click(function(e) {
	showInfor([$('#FrontEnd'), $('#Android'), $('#BackEnd'), $('#IOS'), $('#ML')])
})

$('#btn').click(function(e) {
	click(manager)
	// 自动打开表单，且保留动画效果
	$('#form-enter').addClass('signUp-form-enter-animation')
	setTimeout(function () {
		formSwitch.enter.click()
		$('#form-enter').removeClass('signUp-form-enter-animation')
	}, 1000)
})

$('#navi').click(function(e) {
	if(e.target.className.indexOf('spot') !== -1) {
		var list = e.target.classList
		var tagId = list[list.length - 1]
		// changeSpot(list[list.length - 1])
		var newTag = calcTag(tagId)
		changeImg(tagId)
		tag = newTag
		clear()
		play()
	}
})

$('#goBack').click(function(e) {
	$($('.wrapper')[0]).removeClass('zeroHeight')
	$('#inforContainer').removeClass('fullHeight')
	$('#infor-' + inforId).removeClass('fullHeight')
	$($('.leftBtn')[0]).css('display', 'none')
	$($('.rightBtn')[0]).css('display', 'none')
	$('#goBack').css('display', 'none')
	$('#directionId').css('display', 'none')
	play()
})

$($('.leftBtn')[0]).click(function(e) {
	changeInfor(false)
	// chengeWord(calcWord(inforId), true, 'left', true)
})

$($('.rightBtn')[0]).click(function(e) {
	changeInfor(true)
	// chengeWord(calcWord(inforId), true, 'right', true)
})

function caiDan() {
	console.log('%c■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n■      ■■■■■■■■■■■■■■■■■■ ■■■■■  ■■■■ ■■■■■■■■■■■■■■■■■■■■\n■       ■■■■■■■■■■■■■■■■■   ■■■  ■■■  ■■■■■■■■■■■■■■■■■■■■\n■■■  ■■■■■■■■■■■■■■■■■■■■   ■■   ■■■■■■■■■■■■■■■■■■■■■■■■■\n■■■  ■■■■■■■■■■■■■■■■■■■■■  ■■   ■■■■■■■■■■■■■■■■■■■■■■■■■\n■■■  ■■■■■■   ■■■     ■■■■  ■■   ■■■  ■■■■■■   ■■■ ■■ ■■ ■\n■■■  ■■■■■      ■       ■■  ■■  ■■■■  ■■■■■  ■  ■■ ■   ■ ■\n■■■  ■■■■  ■■■  ■  ■■■  ■■■ ■   ■■■■  ■■■■   ■■  ■ ■   ■ ■\n■■■  ■■■■ ■■■■  ■  ■■■  ■■■ ■   ■■■■  ■■■■       ■   ■   ■\n■■■  ■■■■ ■■■■  ■  ■■■  ■■■    ■■■■■  ■■■■   ■■■■■   ■   ■\n■■■  ■■■■  ■■■  ■  ■■■  ■■■    ■■■■■  ■■■■   ■■  ■■  ■  ■■\n■■■  ■■■■■      ■       ■■■■   ■■■■■  ■■■■■     ■■■  ■  ■■\n■■■  ■■■■■■   ■■■   ■■■■■■■   ■■■■■  ■■■■■■   ■■■■  ■  ■■\n■■■■■■■■■■■■■■■■■  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■', 'color: #5022C2; font-size: 0.8em;background-color: #4CE185; line-height: 0em;')
	console.log('%c相约TopView     我们，期待你的到来 ', 'font-size: 1.3em')
}

function calcWord(currentPage) {
	switch(currentPage) {
		case 'FrontEnd': return {last: '没了',next: '安卓'};
		case 'Android': return {last: '前端',next: '后台'};
		case 'BackEnd': return {last: '安卓',next: 'IOS'};
		case 'IOS': return {last: '后台',next: 'M L'};
		case 'ML': return {last: 'IOS',next: '没了'};
	}
}

function chengeWord(keyWord, flag, decoration, click) {
	if(click) {
		if(decoration == 'left') {
			$('.leftBtn').text(keyWord.last)
		} else {
			$('.rightBtn').text(keyWord.next)
		}
	} else {
		if(decoration == 'left') {
			if(keyWord.last && flag) {
				$('.leftBtn').text(keyWord.last)
			} else {
				$('.leftBtn').text('▲')
			}
		} else {
			if(keyWord.next && flag) {
				$('.rightBtn').text(keyWord.next)
			} else {
				$('.rightBtn').text('▼')
			}
		}
	}
}

if(isMobile) {
	$('.spot').css('width', '10px')
	$('.spot').css('height', '10px')
	$('#navi').addClass('moblieNavi')
	$('.tips').addClass('moblieTips')
	$('#slide').find('.cd-container').addClass('moblieSilde')
	$('#slide').find('.IOS').addClass('moblieColorW')
	$('#inforContainer').find('.cd-container').addClass('moblieInfor')
	$('.moblieT').css('display', 'inline-block')
	$('#goBack').addClass('smaller')
	$('#directionId').addClass('smaller')
	$('.leftBtn').addClass('smaller')
	$('.leftBtn').addClass('moblieLeft')
	$('.rightBtn').addClass('smaller')
	$($('.leftBtn')[0]).mouseover(function(e) {
		$(this).css('animation', 'moblieWorkBtn .5s')
	})

	$($('.rightBtn')[0]).mouseover(function(e) {
		$(this).css('animation', 'moblieWorkBtn .5s')
	})

	$($('.leftBtn')[0]).mouseout(function(e) {
		$(this).css('animation', '')
	})

	$($('.rightBtn')[0]).mouseout(function(e) {
		$(this).css('animation', '')
	})
	setTimeout(function() {
		$('#animate').css('display', 'none')
	}, 5500)
	moblieEvent.bindEvent()
} else {
	$($('.leftBtn')[0]).mouseover(function(e) {
		$(this).css('animation', 'workBtn .5s')
		chengeWord(calcWord(inforId), true, 'left')
	})

	$($('.rightBtn')[0]).mouseover(function(e) {
		$(this).css('animation', 'workBtn .5s')
		chengeWord(calcWord(inforId), true, 'right')
	})

	$($('.leftBtn')[0]).mouseout(function(e) {
		$(this).css('animation', '')
		chengeWord(calcWord(inforId), false, 'left')
	})

	$($('.rightBtn')[0]).mouseout(function(e) {
		$(this).css('animation', '')
		chengeWord(calcWord(inforId), false, 'right')
	})

	$($('.leftBtn')[0]).click(function(e) {
		chengeWord(calcWord(inforId), true, 'left', true)
	})

	$($('.rightBtn')[0]).click(function(e) {
		chengeWord(calcWord(inforId), true, 'right', true)
	})
	$('#goBack').mouseover(function(e) {
		$($('.goTop')[0]).addClass('clearTrans')
		$($('.goBottom')[0]).addClass('clearTrans')
		$($('.text')[0]).css('color', 'white')
		$($('.text')[0]).css('transform', 'scale(1)')
	})
	$('#goBack').mouseout(function(e) {
		$($('.goTop')[0]).removeClass('clearTrans')
		$($('.goBottom')[0]).removeClass('clearTrans')
		$($('.text')[0]).css('color', 'transparent')
		$($('.text')[0]).css('transform', 'scale(0)')
	})
	// 报名那个图标
	$('#btn').mouseover(function(e) {
		$('#left').addClass('sign-up-line1')
		$('#right').addClass('sign-up-line2')
		$($('.tips')[0]).css('color', 'white')
		$($('.tips')[0]).css('transform', 'scale(1)')
	})
	$('#btn').mouseout(function(e) {
		$('#left').removeClass('sign-up-line1')
		$('#right').removeClass('sign-up-line2')
		$($('.tips')[0]).css('color', 'transparent')
		$($('.tips')[0]).css('transform', 'scale(0)')
	})
}

caiDan()
$('#FrontEnd').css('z-index', 1)
$('#Android').css('z-index', 0)
$('#BackEnd').css('z-index', 0)
$('#IOS').css('z-index', 0)
$('#ML').css('z-index', 0)

// window.onload = function() {
// 	console.log('loaded')
// 	$('#animate').css('animation', 'displayCover 1s forwards 4s')
// 	setTimeout(function() {
// 		play()
// 	}, 5000)
// }

// jq的一个插件，在所有图片加载完后执行回调函数
$.waitForImages.hasImageProperties = ['backgroundImage']
if (isMobile) {
	$('body').waitForImages({
		waitForAll: true,
		finished: function() {
			$('#animate').css('animation', 'displayCover 1s forwards 2.5s')
			// console.log('loaded')
			// $('#animate').css('animation', 'displayCover 1s forwards 4s')
			setTimeout(function() {
				play()
			}, 2000)
		}
	})
} else {
	$('body').waitForImages({
		waitForAll: true,
		finished: function() {
			$('#animate').css('animation', 'displayCover 1s forwards 0s')
			setTimeout(function() {
				play()
			}, 2000)
		}
	})
}
