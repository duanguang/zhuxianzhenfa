/**
 * Created by Eggy on 2016/1/17.
 */
(function () {
	var LanDanDan = function () {

	};
	LanDanDan.prototype = {
		/**
		 * 判断是否为空
		 * @param str
		 * @returns {boolean}
		 */
		isNull: function (str) {
			return str == null || str === "" || str === undefined || str === 'undefined' || str == 'null';
		},
		/**
		 *浏览器图标
		 */
		favicon: function () {
			var obj = $('#favicon');
			var picnum = obj.attr('picnum');
			if (picnum == 0) {
				obj.attr({'href': 'image/favicon1.png', 'picnum': '1'});
			} else if (picnum == 1) {
				obj.attr({'href': 'image/favicon0.png', 'picnum': '2'});
			} else if (picnum == 2) {
				obj.attr({'href': 'image/favicon1.png', 'picnum': '3'});
			} else if (picnum == 3) {
				obj.attr({'href': 'image/favicon2.png', 'picnum': '4'});
			} else if (picnum == 4) {
				obj.attr({'href': 'image/favicon1.png', 'picnum': '5'});
			} else if (picnum == 5) {
				obj.attr({'href': 'image/favicon3.png', 'picnum': '6'});
			} else if (picnum == 6) {
				obj.attr({'href': 'image/favicon1.png', 'picnum': '7'});
			} else if (picnum == 7) {
				obj.attr({'href': 'image/favicon0.png', 'picnum': '0'});
			}
		},

		inputNumReg: function (obj, flag, type) {
			var val = $(obj).val();
			var parent, dengji;
			if (flag && '1' == flag) {
				dengji = 'xiuzhendengji';
			} else {
				dengji = 'jinjiedengji';
			}
			if ((type && '2' == type ) || (!type && flag && '2' == flag)) {
				parent = $(obj).parents('.personageCard');
			} else {
				parent = $(obj).parents('.magicWeaponCard');
			}
			if (/[0-9]$/.test(val)) {
				if (flag && '1' == flag) {
					if (val < 1) {
						val = 1;
					} else if (val > 60) {
						val = 60;
					}
				} else if (!flag || '1' != flag) {
					if (val < 0) {
						val = 0;
					} else if (val > 12) {
						val = 12;
					}
				}
				$(parent).attr(dengji, val);
				countAll();
			} else {
				val = '';
			}
			$(obj).val(val);
		},
		//设置唯一id
		setOnlyId: function () {
			return parseInt(allUser.length + 1);
		}
	};
	window.ldd = new LanDanDan();
})();

(function () {
	var Arithmetic = function () {

	};
	Arithmetic.prototype = {
		//气血增益计算
		qiXueCount: function (tiPo, fbFlag) {
			if (fbFlag) {
				return parseFloat(tiPo) / 3;
			}
			return parseFloat(tiPo) / 1.2;
		},
		//真气增益计算
		zhenQiCount: function (xiuZhen, fbFlag) {
			if (fbFlag) {
				return parseFloat(xiuZhen) / 1.72;
			}
			return parseFloat(xiuZhen) / 1.2;
		},
		//攻击增益计算
		yuBaoCount: function (yuBao, fbFlag) {
			if (fbFlag) {
				return parseFloat(yuBao) / 30;
			}
			return parseFloat(yuBao) / 12;
		},
		//淬灵计算
		cuiLingCount: function (xiuZhenDengJi, cuiLing) {
			return 2 * parseInt(xiuZhenDengJi) * parseInt(cuiLing) - parseInt(cuiLing);
		}
	};
	var arithmetic = new Arithmetic();
	var LDD = {};
	LDD.arithmetic = arithmetic;
	$.extend(ldd, LDD);
})();

(function () {
	var Card = function () {

	};
	Card.prototype = {

	}
})()