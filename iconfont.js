;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-jifen" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M880.804159 282.080493 739.629859 140.871401c-29.560246-29.571503-75.193563-32.036647-101.707426-5.51255L167.001013 606.302783l248.357438 248.347205 470.911186-470.87537C912.807037 357.2628 910.341892 311.592644 880.804159 282.080493zM411.986657 791.55395 230.1124 609.699136 587.267752 252.55504l181.179432 182.476985L411.986657 791.55395zM853.011162 350.492606l-49.538253 49.503461L622.271988 217.528292l48.885384-48.864918c10.048867-10.04682 27.376511-9.126868 38.587853 2.060939l141.172253 141.184533C862.151333 323.177494 863.059006 340.457042 853.011162 350.492606zM167.001013 854.651011l34.153868-213.133192-34.386158-34.350342-45.853327 267.065522c-1.998517 7.351432 0.106424 15.142885 5.418406 20.534685 5.396917 5.352915 13.18837 7.42204 20.526499 5.423523l267.091104-45.842071-34.398438-34.444487L167.001013 854.651011z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-email" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M154 862c-35.8 0-65-29.2-65-65V227c0-35.8 29.2-65 65-65h716c35.8 0 65 29.2 65 65v570c0 35.8-29.2 65-65 65H154z" fill="#E5E5E5" ></path>' +
    '' +
    '<path d="M870 187c10.6 0 20.6 4.2 28.2 11.8 7.6 7.6 11.8 17.6 11.8 28.2v570c0 10.6-4.2 20.6-11.8 28.2-7.6 7.6-17.6 11.8-28.2 11.8H154c-10.6 0-20.6-4.2-28.2-11.8-7.6-7.6-11.8-17.6-11.8-28.2V227c0-10.6 4.2-20.6 11.8-28.2 7.6-7.6 17.6-11.8 28.2-11.8h716m0-50H154c-49.5 0-90 40.5-90 90v570c0 49.5 40.5 90 90 90h716c49.5 0 90-40.5 90-90V227c0-49.5-40.5-90-90-90z" fill="#3A3644" ></path>' +
    '' +
    '<path d="M154 837c-7.4 0-14.3-2-20.2-5.5h575.7c77.2 0 140-62.8 140-140V187H870c22.1 0 40 17.9 40 40v570c0 22.1-17.9 40-40 40H154z" fill="#B2C5E4" ></path>' +
    '' +
    '<path d="M849.4 456.6l-316.8 155-419.8-233.8 736.6-39.7z" fill="#C4C4C5" ></path>' +
    '' +
    '<path d="M529 562.4c-7.7 0-15.3-1.9-22.1-5.5L89 337V227c0-35.8 29.2-65 65-65h716c35.8 0 65 29.2 65 65v127.9L551.1 557c-6.8 3.6-14.4 5.4-22.1 5.4z" fill="#FFFFFF" ></path>' +
    '' +
    '<path d="M870 187c10.6 0 20.6 4.2 28.2 11.8 7.6 7.6 11.8 17.6 11.8 28.2v112.8l-370.5 195c-3.2 1.7-6.8 2.6-10.5 2.6-3.6 0-7.2-0.9-10.5-2.6L114 321.9V227c0-10.6 4.2-20.6 11.8-28.2 7.6-7.6 17.6-11.8 28.2-11.8h716m0-50H154c-49.5 0-90 40.5-90 90v125.1l431.3 227c10.6 5.6 22.2 8.3 33.7 8.3 11.6 0 23.2-2.8 33.7-8.3L960 370V227c0-49.5-40.5-90-90-90z" fill="#3A3644" ></path>' +
    '' +
    '<path d="M741 779c-33.1 0-60-26.9-60-60s26.9-60 60-60 60 26.9 60 60-26.9 60-60 60z" fill="#F46070" ></path>' +
    '' +
    '<path d="M741 674c24.8 0 45 20.2 45 45s-20.2 45-45 45-45-20.2-45-45 20.2-45 45-45m0-30c-41.4 0-75 33.6-75 75s33.6 75 75 75 75-33.6 75-75-33.6-75-75-75z" fill="#3A3644" ></path>' +
    '' +
    '<path d="M540 660.6h100v40H540zM460 730.6h180v40H460z" fill="#8E8C93" ></path>' +
    '' +
    '<path d="M114 235.1V227c0-22.1 17.9-40 40-40h716c22.1 0 40 17.9 40 40v8.1H114z" fill="#E5E5E5" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-edit" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M112.5 650l542.4-542.4c10.3-10.3 24.1-16 38.9-16s28.6 5.7 38.9 16l183.8 183.8c10.3 10.3 16 24.1 16 38.9s-5.7 28.6-16 38.9L374.1 911.6 112.5 650z" fill="#FFCC72" ></path>' +
    '' +
    '<path d="M693.7 116.6c8.1 0 15.6 3.1 21.2 8.7l183.8 183.8c5.6 5.6 8.7 13.1 8.7 21.2s-3.1 15.6-8.7 21.2L374.1 876.3 147.8 650l524.7-524.7c5.6-5.6 13.2-8.7 21.2-8.7m0-50c-20.5 0-41 7.8-56.6 23.3l-560 560 297 297 560-560c31.1-31.1 31.1-82 0-113.1L750.3 90c-15.6-15.6-36.1-23.4-56.6-23.4z" fill="#3A3644" ></path>' +
    '' +
    '<path d="M557.3 205.2l97.6-97.6c10.3-10.3 24.1-16 38.9-16s28.6 5.7 38.9 16l183.8 183.8c10.3 10.3 16 24.1 16 38.9 0 14.8-5.7 28.6-16 38.9l-97.6 97.6-261.6-261.6z" fill="#F95360" ></path>' +
    '' +
    '<path d="M693.7 116.6c8.1 0 15.6 3.1 21.2 8.7l183.8 183.8c5.6 5.6 8.7 13.1 8.7 21.2s-3.1 15.6-8.7 21.2l-79.9 79.9-226.2-226.2 79.9-79.9c5.6-5.6 13.2-8.7 21.2-8.7m0-50c-20.5 0-41 7.8-56.6 23.3L521.9 205.2l297 297L934.1 387c31.1-31.1 31.1-82 0-113.1L750.3 90c-15.6-15.6-36.1-23.4-56.6-23.4z" fill="#3A3644" ></path>' +
    '' +
    '<path d="M582 265.3l35.4 35.4-409.2 409.2-35.4-35.4L582 265.3zM243.5 745.2l35.4 35.4 409.2-409.2-35.4-35.4-409.2 409.2z m479.9-338.4L314.2 815.9l35.4 35.4 409.2-409.2-35.4-35.3z" fill="#ED9D29" ></path>' +
    '' +
    '<path d="M621.064 176.827L847.336 403.1l-28.284 28.284L592.78 205.111z" fill="#ED3248" ></path>' +
    '' +
    '<path d="M557.202 240.573l226.272 226.272-28.284 28.284-226.272-226.272z" fill="#A87729" ></path>' +
    '' +
    '<path d="M101.8 660.7l10.9-10.9 261.2 261.1-11 11-270.5 9.3z" fill="#E5E5E5" ></path>' +
    '' +
    '<path d="M125.5 697.9l200.2 200.2-207.4 7.1 7.2-207.3m-12.8-83.5L77.1 650 66.5 957.1l307.1-10.6 35.6-35.6-296.5-296.5z" fill="#3A3644" ></path>' +
    '' +
    '<path d="M95.5 875.8l52.8 52.8-55.3 2.5z" fill="#E5E5E5" ></path>' +
    '' +
    '<path d="M73.1 818.1l-6.3 139.3 139.3-6.4-133-132.9z" fill="#3A3644" ></path>' +
    '' +
    '<path d="M326.2 898.4l-168.4 4.3-15-15 117.8-54.9z" fill="#BFBFBF" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)