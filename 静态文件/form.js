/**
 * remove className(s)
 * @param  {object} obj         [description]
 * @param  {string} classRemove className to remeove
 * @return {[type]}             [description]
 */
var STATE = {
  SHOW: 'show-form',
  HIDE: 'hide-form'
}

var manager = [
   {
    dom: $('#formContainer'),
    state: STATE.HIDE,
    nextState: function() {
      if(this.state === STATE.HIDE) {
        this.dom.addClass('show-form')
        this.state = STATE.SHOW
      } else {
        this.dom.removeClass('show-form')
        this.state = STATE.HIDE
      }
    }
  },
  {
    dom: $('#slide'),
    state: STATE.SHOW,
    nextState: function() {
      if(this.state === STATE.SHOW) {
        clear()
        this.dom.addClass('hide-form')
        this.state = STATE.HIDE
      } else {
        this.dom.removeClass('hide-form')
        this.state = STATE.SHOW
        play()
      }
    }
  }
]

function removeClass(obj, classRemove) {
  var classRemove = classRemove.split(/\s+/);

  if (obj.classList) { // ff3.6+  、chrome
    var classList = obj.classList;
    for (var i = 0, len = classRemove.length; i < len; i++) {
      if (classList.contains(classRemove[i])) {
        classList.remove(classRemove[i]);
      }
    }
  } else {
    var className = obj.className.split(/\s+/);
    var pos = -1;
    for (var j = 0, lenRemove = classRemove.length; j < lenRemove; j++) {
      pos = className.indexOf(classRemove[j]);
      if (pos > -1) {
        className.splice(pos, 1);
      }
    }
    obj.className = className.join(" ");
  }
}

/**
 * add className(s) 
 * @param {object} obj      [description]
 * @param {string} classAdd className to add
 */
function addClass(obj, classAdd) {
  var classToAdd = classAdd.split(/\s+/);
  if (obj.classList) {
    var classList = obj.classList;
    for (var i = 0, len = classToAdd.length; i < len; i++) {
      if (!classList.contains(classToAdd[i])) {
        classList.add(classToAdd[i]);
      }
    }
  } else {
    var className = obj.className.split(/\s+/);
    for (var j = 0, lenRemove = classToAdd.length; j < lenRemove; j++) {
      if (className.indexOf(classToAdd[j]) < 0) {
        className.pop(classToAdd[j]);
      }
    }
    obj.className = className.join(" ");
  }
}


function hasClass(obj,classSearch){
  if(obj.classList){
    var classList = obj.classList;
    if(classList.contains(classSearch)){
      return true;
    }else{
      return false;
    }
  }else{
    var classNames = obj.className.split(/\s+/);
    if(classNames.indexOf(classSearch) < 0){
      return true;
    }else{
      return false;
    }
  }
}

/*判断输入是否为空*/
function isEmpty(string){
	return string.trim().length == 0 ;
}

/*转换为带特点位数的小数*/
/*num：    要转换的数字*/
/*digits：位数*/
function toFixedNum(num,digits){
  return parseFloat(num.toFixed(digits));
}

function e(selector, el) {
  if (!el) {
    el = document;
  }else if(typeof el == 'string'){
    el = e(el);
  }
  if (el.querySelector) {
   // console.log(1);
    var nodelist = el.querySelectorAll(selector);
    return (selector[0] == '#') ? nodelist[0] : nodelist;
  } else {
  //  console.log(3);
    if (selector[0] == '#') {
      return document.getElementById(selector.slice(1));
    } else if (selector[0] == '.') {
      var className = selector.slice(1);
      if (el.getElementsByClassName) {
        return el.getElementsByClassName(className);
      } else {
        var aResult = [];
        var aEle = el.getElementsByTagName('*');
        for (var i = 0; i < aEle.length; i++) {
          if (aEle[i].className == className) {
            aResult.push(aEle[i]);
          }
        }
        return aResult;
      }
    } else {
      return el.getElementsByTagName(selector);
    }
  }
}

// 表头
var formHeader = {
  dom: null,
  activeClass: 'show',
  show: function() {
    var dom = this.dom
    if(!dom) {
      dom = e('#form-header')
      this.dom = dom
    }
    addClass(dom, this.activeClass)
    this.startMove()
  },
  hide: function() {
    this.stopMove()
    var dom = this.dom
    if(!dom) {
      dom = e('#form-header')
      this.dom = dom
    }
    removeClass(dom, this.activeClass)
  },
  startMove: function() {
    var headerImg = e('#form-img')
    var headerTitle = e('#form-title')
    if(window.isMobile) {
      document.addEventListener('touchmove', function(e) {
        var ev = e || window.event
        var touchPoint = ev.changedTouches[0]
        var x = Number(touchPoint.pageX)
        var y = Number(touchPoint.pageY)
        var perX = x/document.documentElement.clientWidth
        var perY = y/document.documentElement.clientHeight
        var ImgLeft = ( perX *  0.2  - 0.2) * 100 + '%'
        var ImgTop = ( perY * 0.5 - 0.5) * 100 + '%'
        var titleLeft = (perX * (-0.2) + 0.6) * 100 + '%'
        var titleTop = (perY * (-0.2) + 0.6) * 100 + '%'

        headerImg.style = 'left: '+ ImgLeft +'; top: ' + ImgTop

        headerTitle.style = 'left: '+ titleLeft +'; top: ' + titleTop
      }, false)
      return
    }
    
    document.onmousemove = function(e) {
      var ev = e || window.event
      var x = ev.pageX
      var perX = x/document.documentElement.clientWidth
      var y = ev.pageY
      var perY = y/document.documentElement.clientHeight
      var ImgLeft = ( perX *  0.2  - 0.2) * 100 + '%'
      var ImgTop = ( perY * 0.5 - 0.5) * 100 + '%'
      var titleLeft = (perX * (-0.2) + 0.6) * 100 + '%'
      var titleTop = (perY * (-0.2) + 0.6) * 100 + '%'

      headerImg.style = 'left: '+ ImgLeft +'; top: ' + ImgTop

      headerTitle.style = 'left: '+ titleLeft +'; top: ' + titleTop
    }
  },
  stopMove: function() {
    document.onmousemove = null
  }
}

// 内容
var formContent = {
  dom: null,
  inputs: [],
  activeClass: 'show',
  hasListen: false,
  errorMsg: {
    name: '姓名里似乎有点特殊的东西',
    cardId: '你的学号好像跟别人不大一样',
    email: '邮箱格式有点个性了哦',
    phone: '号码估计打不通',
    clazz: '年级专业里感觉有特殊符号',
    direction: '方向是不是有点厉害了',
    evaluation: '自我评价多吹点啦~'
  },
  nullMsg: {
    name: '那么你的姓名是...',
    cardId: '一卡通上有学号哦',
    email: '你好像还没填写邮箱',
    phone: '给个号码呗...',
    clazz: '你好像还没填写年级专业',
    skill: '技能经验随便编点',
    evaluation: '别谦虚自我评价啦',
    direction: '人总是要有方向的嘛'
  },
  show: function() {
    var dom = this.dom
    if(!dom) {
      dom = e('#form-content')
      this.dom = dom
    }
    addClass(dom, this.activeClass)
    if(!this.hasListen) {
      this.listen()
    }
  },
  hide: function(stayForm) {
    var dom = this.dom
    if(!dom) {
      dom = e('#form-content')
      this.dom = dom
    }
    removeClass(dom, this.activeClass)
    if(!stayForm) {
      this.clearInputs()
    }
  },
  clearInputs: function() {
    this.inputs.forEach(function(item) {
      item.value = ''
      removeClass(item, 'used invalid')
    })
  },
  listen: function() {
    var inputs = e('.text-input', this.dom)
    for (var i = inputs.length - 1; i >= 0; i--) {
      this.inputs.push(inputs[i])
      inputs[i].onblur = function() {
        if(!isEmpty(this.value)) {
          addClass(this, 'used')
          removeClass(this, 'invalid')
        } else {
          removeClass(this, 'used')
        }
      }
    }
    // 下拉框 赶时间，暂无优化
    var dirSelect = $(this.dom).find('select')
    this.inputs.push(dirSelect[0])
    // console.log(dirSelect)
    var options = dirSelect.find('option')
    var menu = $(this.dom).find('.select-menu')
    menu.click(function(e) {
      // console.log('ss')
      if(e.target.className == 'select-menu-item') {
        var value = $(e.target).data('value')
        for(var l = options.length-1; l >= 0; l--) {
          if(options[l].value == value) {
            options[l].selected = 'selected'
            return
          }
        }
      }
    })
    this.hasListen = true
  },
  valid: function() {
    var dataDoms = this.inputs
    var data = {}
    for(var i = dataDoms.length-1; i >= 0 ; i--) {
      var dom = dataDoms[i],
          value = dom.value
      if(!$.trim(value)) {
        addClass(dom, 'invalid')
        dom.focus()
        console.log(dom.name, this.nullMsg[dom.name])
        return {
          isValid: false,
          msg: this.nullMsg[dom.name]
        }
      }
      if(!this.validValue(dom.name, value)) {
        addClass(dom, 'invalid')
        dom.focus()
        return {
          isValid: false,
          msg: this.errorMsg[dom.name]
        }
      }
      data[dom.name] = value
    }
    return {
      isValid: true,
      data: data
    }
  },
  validValue: function(type, value) {
    var reg
    switch(type) {
      case 'cardId': 
        reg = /\d{10}/
        break
      case 'phone':
        reg = /\d{11}/
        break
      case 'email':
        reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.)[A-Za-z0-9]+){1,2}$/
        break
      case 'name':
        reg = /[0-9+\\<>/?~！@#￥……&*（）——{}【】‘；：”“'。，、？`~!@#$^&*()=|{}':;',\[\]%.=_-]/g
        return !reg.test(value)
      case 'clazz':
        reg = /[+\\<>/?~！@#￥……&*（）{}‘；：”“'。，、？`~!@#$^&*()=|{}':;',%.=_]/g
        return !reg.test(value)
      case 'direction': 
        return ['前端','后台','ios','安卓','机器学习'].indexOf(value) == -1 ? false : true
      case 'evaluation': 
    	return value.length >= 20
      default:
        return true
    }
    return reg.test(value)
  }
}

var formFooter = {
  dom: null,
  activeClass: 'show',
  hasGotClick: false,
  show: function() {
    var dom = this.dom
    if(!dom) {
      dom = e('#form-footer')
      this.dom = dom
    }
    addClass(dom, this.activeClass)
    if(!this.hasGotClick) {
      this.click()
      this.hasGotClick = true
    }
  },
  hide: function() {
    var dom = this.dom
    if(!dom) {
      dom = e('#form-footer')
      this.dom = dom
    }
    removeClass(dom, this.activeClass)
  },
  click: function() {
    this.dom.onclick = function() {
      formSwitch.submit()
    }
  },
  offClick: function() {
    this.dom.onclick = null
  }
}

var formDom = e('#form')
var form = {
  dom: formDom,
  STATE: {
    ACTIVE: 1, NORMAL: 0
  },
  nowState: 0,
  expandClass: 'signUp-form-expand',
  toggle: function(formDom) {
    if(this.nowState == this.STATE.NORMAL) {
      this.expand()
    } else {
      this.shrink()
    }
  },
  expand: function() {
    this.nowState = this.STATE.ACTIVE
    addClass(formDom, this.expandClass)
    if(window.isMobile) {
      setTimeout(function() {
        //下面的代码有些问题
        // $(formDom).css('min-height', window.document.documentElement.clientHeight-15)
      }, 2000)
    }
  },
  shrink: function () {
    this.nowState = this.STATE.NORMAL
    removeClass(formDom, this.expandClass)
    if(window.isMobile) {
      $(formDom).css('min-height', '')
    }
  },
}

var submitMsg = {
  dom: {
    container: e('#submit-msg'),
    sign: e('#submit-msg-sign'),
    description: e('#submit-msg-description'),
    slogan: e('#submit-msg-slogan')
  },
  description: {
    success: '约好了',
    error: '约不了 :(',
    wait: '在约了...'
  },
  containerActiveClass: 'active',
  signWaitClass: 'wait',
  signSuccessClass: 'submit-success',
  success: function() {
    var sign = this.dom.sign,
        descr = this.dom.description,
        slogan = this.dom.slogan
    addClass(sign, this.signSuccessClass)
    addClass(slogan, 'show')
    descr.innerHTML = this.description.success
  },
  error: function() {
    var sign = this.dom.sign,
        descr = this.dom.description
    removeClass(sign, this.signWaitClass)
    descr.innerHTML = this.description.error
    console.log(1)
  },
  wait: function() {
    var container = this.dom.container,
        sign = this.dom.sign,
        descr = this.dom.description
    addClass(container, this.containerActiveClass)    
    addClass(sign, this.signWaitClass)
    descr.innerHTML = this.description.wait
  },
  hide: function() {
    var container = this.dom.container,
        slogan = this.dom.slogan   
    removeClass(container, this.containerActiveClass)  
    removeClass(slogan, 'show')
  }
}

var notice = {
  dom: null,
  msgDom: null,
  hasListen: false,
  show: function(msg) {
    var dom = this.dom,
        msgDom = this.msgDom
    if(!dom) {
      dom = e('#form-notice')
      msgDom = e('.top-notice-msg', dom)[0]
      this.dom = dom
      this.msgDom = msgDom
    }
    msgDom.innerHTML = msg
    if(!this.hasListen) {
      this.hasListen = true
      dom.onclick = function() {
        removeClass(this, 'show')
      }
    }
    addClass(dom, 'show')
    setTimeout(function(){
      removeClass(dom, 'show')
    }, 2500)
  },
  hide: function() {
    removeClass(this.dom, 'show')
  },
}

// 表格开关
var formSwitch = {
  enter: null,
  outer: null,
  waiting: false,
  initSwitch: function() {
    this.enter = e('#form-enter')
    this.outer = e('#close-form-btn')
  },
  showOuter: function() {
    addClass(this.outer, 'show')
  },
  hideOuter: function() {
    removeClass(this.outer, 'show')
  },
  start: function() {
    this.initSwitch()
    this.enter.onclick = this.showForm.bind(this)

    this.outer.onclick = this.hideForm.bind(this, false)
  },
  showForm: function() {
    if(this.waiting) {
      return
    }
    form.expand()
    formHeader.show()
    formContent.show()
    formFooter.show()
    this.showOuter()
  },
  hideForm: function(clearFormData) {
    form.shrink()
    formFooter.hide()
    formHeader.hide()
    formContent.hide(clearFormData)
    this.hideOuter()
  },
  submit: function() {
    var formData = formContent.valid()
    if(!formData.isValid) {
      notice.show(formData.msg)
      return
    }
    var res = null
    console.log(formData.data)
    $.ajax({
      url: 'user/insert',
      type: 'POST',
      data: formData.data,
      success: function(result) {
        res = typeof result == 'string' ? JSON.parse(result) : result
      },
      error: function(result) {
        res = {
          success: false,
          message: '请求错误了'
        }
      }
    })
    this.hideForm(true)
    this.waitSubmit()
    setTimeout(function() {
      if(res) {
        this.showRes(res)
      } else {
        var tc = setInterval(function() {
          if(res) {
            this.showRes(res)
            clearInterval(tc)
          }
        }.bind(this), 1000)
      }
    }.bind(this), 3000)
  },
  showRes: function(res, tc) {
    if(res.success) {
      submitMsg.success()
      this.finishSubmit()
    } else {
      this.finishSubmit()
      submitMsg.hide.bind(submitMsg)()
      notice.show(res.message)
      this.showForm()
    }
  },
  waitSubmit: function() {
    this.waiting = true
    addClass(this.enter, 'waiting')
    $('#back-to-home').fadeOut("slow")
    setTimeout(submitMsg.wait.bind(submitMsg), 1000)
  },
  finishSubmit: function() {
    this.waiting = false
    $('#back-to-home').fadeIn("slow")
    removeClass(this.enter, 'waiting')
  }
}

formSwitch.start()

$('#back-to-home').click(function(e) {
  click(manager)
})

function click(manager) {
  manager.forEach(function(item) {
    item.nextState()
  })
}