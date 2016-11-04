/**
 * Created by Eggy on 2016/7/28.
 */
(function () {
	var Hk = function (setting) {
		if (setting) {
			this.setting = $.extend({
				min: 1,
				max: 60,
				iSWidth: 500,
				dispValue: true,
				initVal: 1,
				callback: function () {

				}
			}, setting);
		}
		this.min = this.setting.min;
		this.max = this.setting.max;
		this.iSWidth = this.setting.iSWidth;
		this.iWidth = this.setting.iSWidth / (this.max - this.min);
		this.dispValue = this.setting.dispValue;
		this.initVal = this.setting.initVal;
		this.oSpan = this.setting.oSpan;
		this.oScroll = this.setting.oScroll;
		this.callback = this.setting.callback;
		this.init();
	};
	Hk.prototype = {
		init: function () {
			var _this = this;
			this.oScroll.style.width = this.iSWidth + 'px';
			this.oSpan.onmousedown = function (e) {
				var oEvent = e || event;
				iX = oEvent.clientX - this.offsetLeft;
				document.onmousemove = function (e) {
					var oEvent = e || event;
					var l = oEvent.clientX - iX;
					_this.td(l);
					return false;
				};
				document.onmouseup = function () {
					document.onmousemove = null;
					document.onmouseup = null;
				};
				return false;
			};
			this.myEvent(this.setting.oScroll, 'mousewheel', function (e) {
				var oEvent = e || event;
				var l = _this.oSpan.offsetLeft;
				oEvent.wheelDelta ? (oEvent.wheelDelta > 0 ? l -= _this.iWidth : l += _this.iWidth) : (oEvent.detail ? l += _this.iWidth : l -= _this.iWidth);
				_this.td(l);
				if (oEvent.PreventDefault) {
					oEvent.PreventDefault();
				}
			});
			this.myEvent(this.setting.oScroll, 'DOMMouseScroll', function (e) {
				var oEvent = e || event;
				var l = _this.oSpan.offsetLeft;
				oEvent.wheelDelta ? (oEvent.wheelDelta > 0 ? l -= _this.iWidth : l += _this.iWidth) : (oEvent.detail ? l += _this.iWidth : l -= _this.iWidth);
				_this.td(l);
				if (oEvent.PreventDefault) {
					oEvent.PreventDefault();
				}
			});
			if (this.dispValue) {
				this.oSpan.innerHTML = this.initVal;
			}
		},
		myEvent: function (obj, ev, fu) {
			obj.attachEvent ? obj.attachEvent('on' + ev, fu) : obj.addEventListener(ev, fu, false);
		},

		td: function (l) {
			if (l < 0) {
				l = 0;
			} else if (l > this.oScroll.offsetWidth - this.oSpan.offsetWidth) {
				l = this.oScroll.offsetWidth - this.oSpan.offsetWidth;
			}
			var scrol = l / (this.oScroll.offsetWidth - this.oSpan.offsetWidth);
			this.oSpan.style.left = l + 'px';
			var disVal = parseInt(scrol * (this.max - this.min)) + this.min;
			if (this.dispValue) {
				this.oSpan.innerHTML = disVal;
			}
			this.callback(disVal);
		},

		slider: function(val){
			if (this.dispValue) {
				this.oSpan.innerHTML = val;
			}
			this.oSpan.style.left = val * (this.oScroll.offsetWidth - this.oSpan.offsetWidth) / (this.max - this.min) + 'px';
		}
	};
	window.Hk = Hk;
})();