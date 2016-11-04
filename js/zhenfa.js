//属性
var tiPoQiXue = 0;//体魄气血
var xiuZhenZhenQi = 0;//修真真气
var yuBaoGongJi = 0;//御宝攻击
var qiXue = 0;//气血
var zhenQi = 0;//真气
var yuanLi = 0;//元力
var gongJi = 0;//攻击
var fangYu = 0;//防御
var puTongMingZhong = 0;//普通命中
var puTongDuoShan = 0;//普通躲闪
var zhiMingShangHai = 0.00;//致命伤害
var zhiMingYiJiLv = 0.00;//致命一击率
var jiNengMingZhong = 0.00;//技能命中
var jiNengDuoShan = 0.00;//技能躲闪
var jianMianZhiMingLv = 0.00;//减免致命率
var jianMianZhiMingShangHai = 0.00;//减免致命伤害
var yuXian = 0.00;//御仙
var yuMo = 0.00;//御魔
var yuFo = 0.00;//御佛
var xuanYun = 0;//眩晕
var meiHuo = 0;//魅惑
var xuRuo = 0;//虚弱
var hunShui = 0;//昏睡
var dingShen = 0;//定身
var jianMianShangHai = 0.00;//减免伤害
var wuShiJianMian = 0.00;//无视减免
var forXian = 0.00;//克仙
var forMo = 0.00;//克魔
var forFo = 0.00;//克佛
var yaoLing = 0;//曜灵
var cuiLing = 0;//淬灵
var fuJiaPuTongShangHai = 0;//附加普通伤害
var jianMianPuTongShangHai = 0;//减免普通伤害
var xiuWeiZenJia = 0;//修为增加

var compare = [];//比较用的数组
var allUser = [];//当前使用的所有阵灵
var fbNameList = ['天琊', '噬魂', '伤心花', '玄火鉴', '嗜血珠', '摄魂', '九龙神火罩', '乾坤青光戒',
	'如意乾坤袋', '五龙轮', '蟠龙幡', '八卦石', '神木骰', '山河扇', '玉净瓶'];//所有法宝名称列表

//初始化
$(function () {
	$('#zhenFaDengJi').val('2');
	$("#jiHuoVal , #xiaoHaoVal").niceScroll({
		touchbehavior: false,
		cursoropacitymax: 1.6,
		cursorwidth: 5,
		horizrailenabled: false,
		cursorborderradius: 5,
		autohidemode: false
	});
	//setInterval('ldd.favicon()', 300);
	window.onkeydown = function (e) {
		if (e.which) {
			if (e.which == 116) {
				if (confirm('确定刷新页面吗？刷新后页面数据将被清除！')) {
					location.reload();
				} else {
					return false;
				}
			}
		} else if (event.keyCode) {
			if (event.keyCode == 116) {
				if (confirm('确定刷新页面吗？刷新后页面数据将被清除！')) {
					location.reload();
				} else {
					return false;
				}
			}
		}
	};

	var xiuzhenSlide = new Hk({
		oScroll: $('#xiuzhenslider')[0],
		oSpan: $('#xiuzhenslider').children('span')[0],
		min: 1,
		max: 60,
		initVal: 1,
		iSWidth: 500,
		callback: function (val) {
			$('#xiuZhenDengJiInput').val(val);
		}
	});
	var jinjieSlide = new Hk({
		oScroll: $('#jinjieslider')[0],
		oSpan: $('#jinjieslider').children('span')[0],
		min: 0,
		max: 12,
		initVal: 0,
		iSWidth: 200,
		callback: function (val) {
			$('#useJinJieDengJi').val(val);
		}
	});

	$('#xiuZhenDengJiInput').change(function () {
		if ($(this).val() != null && $(this).val() > 0) {
			var val = $(this).val();
			if ($(this).val() > 60) {
				val = 60;
			}
			xiuzhenSlide.slider(val);
		}
	});
	$('#useJinJieDengJi').change(function () {
		jinjieSlide.slider($(this).val());
	});
});

//添加阵灵卡槽Div
function addCardDiv(obj, top, left) {
	var parent = $('<div class="personageCard" onclick="selectZhenLing(this,1)" onmousemove="mouseoverQueryCard(this)" onmouseout="mouseoutQueryCard(this)"></div>');
	parent.css({'top': top + 'px', 'left': (parseInt(left) - 10) + 'px'});
	obj.append(parent);
	var child = $('<img src="image/add.png" alt="" class="addCardImg1"/>');
	parent.append(child);
	parent = $('<div class="magicWeaponCard" onclick="selectZhenLing(this,2)" onmousemove="mouseoverQueryCard(this)" onmouseout="mouseoutQueryCard(this)"></div>');
	parent.css({'top': (parseInt(top) + 20) + 'px', 'left': (parseInt(left) + 55) + 'px'});
	obj.append(parent);
	child = $('<img src="image/add.png" alt="" class="addCardImg2"/>');
	parent.append(child);
}

//选择事件
function selectZhenFa() {
	var num = $('#zhenFaDengJi option:selected').val();
	var now = $('#hideValue').attr('zhenFaDengJi');
	var obj = $('#zhenCard')
		, zhenFaName = $('#zhenFaDengJi option:selected').text();
	if (num == now) {
		return;
	} else {
		var flag = false;
		if (allUser && allUser.length > 0) {
			if (confirm('确定更改阵灵等级？')) {
				flag = true;
				allUser = [];
				$('#allVal').empty();
				$('#jiHuoVal').empty();
				$('#xiaoHaoVal').empty();
			}
		} else {
			flag = true;
		}
		if (flag) {
			$('#hideValue').attr('zhenFaDengJi', num);
			$('#zhenFaName').html(zhenFaName);
			$('#zhenFaNameNow').html(zhenFaName);
			obj.empty();
			addCardDom(num, obj);
		}
	}
}

function addCardDom(num) {
	var obj = $('#zhenCard');

	function strChange(num, str) {
		$('#upZhenFaNum').html(num);
		$('#zhenFaNameNext').html(str);
	}

	switch (parseInt(num)) {
		case 2:
			strChange(2640, '三才天地阵')
			addCardDiv(obj, 100, 90);
			addCardDiv(obj, 330, 300);
			addCss();
			break;
		case 3:
			strChange(5920, '四门斗底阵');
			addCardDiv(obj, 60, 300);
			addCardDiv(obj, 200, 70);
			addCardDiv(obj, 380, 260);
			addCss();
			break;
		case 4:
			strChange(18760, '五虎群羊阵');
			$('#upZhenFaNum').html();
			$('#zhenFaNameNext').html();
			addCardDiv(obj, 60, 205);
			addCardDiv(obj, 220, 70);
			addCardDiv(obj, 220, 335);
			addCardDiv(obj, 380, 205);
			addCss();
			break;
		case 5:
			strChange(64280, '六宇连方阵');
			addCardDiv(obj, 50, 210);
			addCardDiv(obj, 220, 70);
			addCardDiv(obj, 220, 350);
			addCardDiv(obj, 400, 140);
			addCardDiv(obj, 400, 300);
			addCss();
			break;
		case 6:
			strChange(232840, '七星北斗阵');
			addCardDiv(obj, 30, 210);
			addCardDiv(obj, 170, 60);
			addCardDiv(obj, 170, 350);
			addCardDiv(obj, 310, 60);
			addCardDiv(obj, 310, 350);
			addCardDiv(obj, 450, 210);
			addCss();
			break;
		case 7:
			strChange(698520, '八门金锁阵');
			addCardDiv(obj, 20, 210);
			addCardDiv(obj, 160, 70);
			addCardDiv(obj, 160, 350);
			addCardDiv(obj, 240, 210);
			addCardDiv(obj, 350, 40);
			addCardDiv(obj, 350, 360);
			addCardDiv(obj, 450, 210);
			addCss();
			break;
		case 8:
			strChange('---', '-----');
			addCardDiv(obj, 30, 50);
			addCardDiv(obj, 30, 350);
			addCardDiv(obj, 170, 120);
			addCardDiv(obj, 170, 300);
			addCardDiv(obj, 310, 120);
			addCardDiv(obj, 310, 300);
			addCardDiv(obj, 450, 50);
			addCardDiv(obj, 450, 350);
			addCss();
			break;
	}
}

function clearCurrentUser() {
	if (confirm('确定清空当前阵灵？')) {
		allUser = [];
		$('#allVal').empty();
		$('#jiHuoVal').empty();
		$('#xiaoHaoVal').empty();
		$('#zhenCard').empty();
		var num = $('#zhenFaDengJi option:selected').val();
		addCardDom(num);
	}
}

//添加样式
function addCss() {
	$('.personageCard,.magicWeaponCard').off('mouseover').on('mouseover', function () {
		$(this).addClass('mouseoverCss');
		$(this).siblings().removeClass('mouseoverCss');
	}).off('mouseout').on('mouseout', function () {
		$(this).removeClass('mouseoverCss');
	}).off('click').on('click', function () {
		$(this).addClass('mouseclickCss');
		$(this).siblings().removeClass('mouseclickCss');
	});
}

/**
 * 选择阵灵
 * @param type 1:角色  2：法宝
 */
function selectZhenLing(obj, type) {
	$('#hideValue').attr('type', type);
	$('.cardChoice').show();
	$('#xiangxi').empty();
	var name = $(obj).attr('userName');
	var userType = $(obj).attr('userType');
	var thisJinJieDengJi = $(obj).attr('jinJieDengJi');
	if (!ldd.isNull(thisJinJieDengJi)) {
		$('#useJinJieDengJi').val(thisJinJieDengJi);
	}
	if (!ldd.isNull(type) && type == 1) {
		$('#jdButton').addClass('zhenling-1-2-2');
		$('#jdButton').siblings().removeClass('zhenling-1-2-2');
		$('#hideValue').attr({'clickType': '0'});
		if (!ldd.isNull(userType)) {
			if (userType == '绝顶') {
				loadAllCardDiv('绝顶');
			} else if (userType == '超凡') {
				loadAllCardDiv('超凡');
			} else if (userType == '上品') {
				loadAllCardDiv('上品');
			} else if (userType == '中品') {
				loadAllCardDiv('中品');
			}
			if (!ldd.isNull(name)) {
				$('#hideValue').attr({'clickType': '1', 'userName': name});
				$('div[name="' + name + '"]').addClass('zhenling-1-3-1-t');
				$('div[name="' + name + '"]').siblings().removeClass('zhenling-1-3-1-t');
				loadThisInfo('div[name="' + name + '"]', 1);
			}
		} else {
			loadAllCardDiv('绝顶');
		}
	} else {
		$('#fbButton').addClass('zhenling-1-2-2');
		$('#fbButton').siblings().removeClass('zhenling-1-2-2');
		loadAllCardDiv('法宝');
		$('#hideValue').attr({'clickType': '0'});
		if (!ldd.isNull(name)) {
			$('#hideValue').attr({'clickType': '1', 'userName': name});
			$('div[name="' + name + '"]').addClass('zhenling-1-3-1-t');
			$('div[name="' + name + '"]').siblings().removeClass('zhenling-1-3-1-t');
			loadThisInfo('div[name="' + name + '"]', 1);
		}
	}
}

//计算属性值
function countAll() {
	var cardArray = $('.personageCard,.magicWeaponCard');
	var jiHuoString = '', xiaoHaoString = '';
	$('#allVal').empty();
	$('#jiHuoVal').empty();
	$('#xiaoHaoVal').empty();
	if (cardArray.length > 0 && allUser.length > 0) {
		tiPoQiXue = 0;//体魄气血
		xiuZhenZhenQi = 0;//修真真气
		yuBaoGongJi = 0;//御宝攻击
		qiXue = 0;//气血
		zhenQi = 0;//真气
		yuanLi = 0;//元力
		gongJi = 0;//攻击
		fangYu = 0;//防御
		puTongMingZhong = 0;//普通命中
		puTongDuoShan = 0;//普通躲闪
		zhiMingShangHai = 0.00;//致命伤害
		zhiMingYiJiLv = 0.00;//致命一击率
		jiNengMingZhong = 0.00;//技能命中
		jiNengDuoShan = 0.00;//技能躲闪
		jianMianZhiMingLv = 0.00;//减免致命率
		jianMianZhiMingShangHai = 0.00;//减免致命伤害
		yuXian = 0.00;//御仙
		yuMo = 0.00;//御魔
		yuFo = 0.00;//御佛
		xuanYun = 0;//眩晕
		meiHuo = 0;//魅惑
		xuRuo = 0;//虚弱
		hunShui = 0;//昏睡
		dingShen = 0;//定身
		jianMianShangHai = 0.00;//减免伤害
		wuShiJianMian = 0.00;//无视减免
		forXian = 0.00;//克仙
		forMo = 0.00;//克魔
		forFo = 0.00;//克佛
		yaoLing = 0;//曜灵
		cuiLing = 0;//淬灵
		fuJiaPuTongShangHai = 0;//附加普通伤害
		jianMianPuTongShangHai = 0;//减免普通伤害
		xiuWeiZenJia = 0;//修为增加
		for (var i = 0; i < cardArray.length; i++) {
			if (JSON.stringify(allUser).indexOf($(cardArray[i]).attr('userName')) > -1) {
				if ($(cardArray[i]).attr('userType') == '法宝') {
					tiPoQiXue = parseFloat($(cardArray[i]).attr('tiPo')) / 3 * parseInt($(cardArray[i]).attr('xiuZhenDengJi'));
					xiuZhenZhenQi = parseFloat(parseFloat($(cardArray[i]).attr('xiuZhen')) / 1.72 * parseInt($(cardArray[i]).attr('xiuZhenDengJi')));
					yuBaoGongJi = parseFloat($(cardArray[i]).attr('yuBao')) / 30 * parseInt($(cardArray[i]).attr('xiuZhenDengJi'));
				} else {
					tiPoQiXue = parseFloat($(cardArray[i]).attr('tiPo')) / 1.2 * parseInt($(cardArray[i]).attr('xiuZhenDengJi'));
					xiuZhenZhenQi = parseFloat(parseFloat($(cardArray[i]).attr('xiuZhen')) / 1.2 * parseInt($(cardArray[i]).attr('xiuZhenDengJi')));
					yuBaoGongJi = parseFloat($(cardArray[i]).attr('yuBao')) / 12 * parseInt($(cardArray[i]).attr('xiuZhenDengJi'));
				}
				addAllVal('气血', tiPoQiXue);
				addAllVal('真气', xiuZhenZhenQi);
				addAllVal('攻击', yuBaoGongJi);
				if (parseInt($(cardArray[i]).attr('jinJieDengJi')) > 0) {
					addAllVal($(cardArray[i]).attr('one'), $(cardArray[i]).attr('oneVal'));
				}
				if (parseInt($(cardArray[i]).attr('jinJieDengJi')) > 1) {
					addAllVal($(cardArray[i]).attr('two'), $(cardArray[i]).attr('twoVal'));
				}
				if (parseInt($(cardArray[i]).attr('jinJieDengJi')) > 3) {
					addAllVal($(cardArray[i]).attr('four'), $(cardArray[i]).attr('fourVal'));
				}
				if (parseInt($(cardArray[i]).attr('jinJieDengJi')) > 5) {
					addAllVal($(cardArray[i]).attr('six'), $(cardArray[i]).attr('sixVal'));
				}
				if (parseInt($(cardArray[i]).attr('jinJieDengJi')) > 8) {
					addAllVal($(cardArray[i]).attr('nine'), $(cardArray[i]).attr('nineVal'));
				}
				if (parseInt($(cardArray[i]).attr('jinJieDengJi')) > 11) {
					addAllVal($(cardArray[i]).attr('twelve'), $(cardArray[i]).attr('twelveVal'));
				}
				yaoLing += parseInt($(cardArray[i]).attr('yaoLing') == 0 ? '0' : parseInt($(cardArray[i]).attr('yaoLing'))
				* (parseInt($(cardArray[i]).attr('jinJieDengJi')) + 1));
				cuiLing += parseInt($(cardArray[i]).attr('xiuZhenDengJi')) == 1 ? parseInt(0) :
				(parseInt($(cardArray[i]).attr('xiuZhenDengJi')) * 2 * parseInt($(cardArray[i]).attr('cuiLing'))
				- 2 * parseInt($(cardArray[i]).attr('cuiLing'))) * (parseInt($(cardArray[i]).attr('xiuZhenDengJi')) - 1) / 2;
				xiaoHaoString += $(cardArray[i]).attr('userName') + '： + '
					+ (parseInt($(cardArray[i]).attr('jinJieDengJi')) + 1)
					+ '张<br/>' + ($(cardArray[i]).attr('yaoLing') == 0 ? '&nbsp;&nbsp;无法曜灵' : '&nbsp;&nbsp;宝奁玉尘：+ ' + parseInt($(cardArray[i]).attr('yaoLing'))
					* (parseInt($(cardArray[i]).attr('jinJieDengJi')) + 1)) + '<br/>'
					+ (parseInt($(cardArray[i]).attr('xiuZhenDengJi')) == 1 ? '' : '&nbsp;&nbsp;沧浪冰珠： + '
					+ ((parseInt($(cardArray[i]).attr('xiuZhenDengJi')) * 2 * parseInt($(cardArray[i]).attr('cuiLing'))
					- 2 * parseInt($(cardArray[i]).attr('cuiLing'))) *
					(parseInt($(cardArray[i]).attr('xiuZhenDengJi')) - 1) / 2) + '<br/>') + '<br/>';
			}
			//查看激活属性
			var flag = false;
			if (i == cardArray.length - 1) {
				for (var k = 0; k < cardArray.length; k++) {
					if (JSON.stringify(allUser).indexOf($(cardArray[k]).attr('userName')) > -1) {
						for (var x = 0; x < combinations.length; x++) {
							if (combinations[x].name == $(cardArray[k]).attr('userName')) {
								var tiaoJian = combinations[x].tiaoJian.split('、');
								if (tiaoJian.length > 0) {
									for (var j = 0; j < tiaoJian.length; j++) {
										if (JSON.stringify(allUser).indexOf(tiaoJian[j]) > -1) {
											flag = true;
										} else {
											flag = false;
											break;
										}
									}
									if (flag) {
										jiHuoString += combinations[x].combinationName + '<br/>';
										jiHuoString += '达成条件：' + combinations[x].tiaoJian + '同时上阵<br/>';
										jiHuoString += '激活属性：' + returnString(combinations[x].activateProperty, combinations[x].activatePropertyVal) + '<br/><br/>';
										$('#jiHuoVal').append(jiHuoString);
										addAllVal(combinations[x].activateProperty, combinations[x].activatePropertyVal);
										jiHuoString = '';
									}
									flag = false;
								}
							}
						}
					}
				}
			}
		}

		$('#allVal').empty().append(allPropertyString());
		$('#xiaoHaoVal').append(xiaoHaoString);
		if (yaoLing != 0 || cuiLing != 0) {
			$('#xiaoHaoVal').append('统计：<br/>' + (yaoLing == 0 ? '' : '&nbsp;&nbsp;宝奁玉尘：+ ' + yaoLing + '<br/>')
				+ (cuiLing == 0 ? '' : '&nbsp;&nbsp;沧浪冰珠：+ ' + cuiLing));
		}
	}
}

function allPropertyString() {
	var string = '';
	string += (qiXue != 0) ? '气血&nbsp;+' + parseInt(qiXue) + '<br/>' : '';
	string += (zhenQi != 0) ? '真气&nbsp;+' + parseInt(zhenQi) + '<br/>' : '';
	string += (gongJi != 0) ? '攻击&nbsp;+' + parseInt(gongJi) + '<br/>' : '';
	string += (fangYu != 0) ? '防御&nbsp;+' + fangYu + '<br/>' : '';
	string += (puTongMingZhong != 0) ? '命中&nbsp;+' + puTongMingZhong + '<br/>' : '';
	string += (puTongDuoShan != 0) ? '躲闪&nbsp;+' + puTongDuoShan + '<br/>' : '';
	string += (zhiMingYiJiLv != 0) ? '暴击率&nbsp;+' + zhiMingYiJiLv.toFixed(2) + '%<br/>' : '';
	string += (zhiMingShangHai != 0) ? '暴击伤害&nbsp;+' + zhiMingShangHai.toFixed(2) + '%<br/>' : '';
	string += (xuanYun != 0) ? '眩晕抗性&nbsp;+' + xuanYun + '<br/>' : '';
	string += (xuRuo != 0) ? '虚弱抗性&nbsp;+' + xuRuo + '<br/>' : '';
	string += (dingShen != 0) ? '定身抗性&nbsp;+' + dingShen + '<br/>' : '';
	string += (meiHuo != 0) ? '魅惑抗性&nbsp;+' + meiHuo + '<br/>' : '';
	string += (hunShui != 0) ? '昏睡抗性&nbsp;+' + hunShui + '<br/>' : '';
	string += (fuJiaPuTongShangHai != 0) ? '附加伤害&nbsp;+' + fuJiaPuTongShangHai + '<br/>' : '';
	string += (jianMianPuTongShangHai != 0) ? '减免伤害&nbsp;+' + jianMianPuTongShangHai + '<br/>' : '';
	string += (jianMianZhiMingLv != 0) ? '被致命一击的概率减少&nbsp;' + jianMianZhiMingLv.toFixed(2) + '%<br/>' : '';
	string += (jianMianZhiMingShangHai != 0) ? '受到致命一击伤害减少&nbsp;' + jianMianZhiMingShangHai.toFixed(2) + '%<br/>' : '';
	string += (jiNengDuoShan != 0) ? '增加技能躲闪&nbsp;' + jiNengDuoShan.toFixed(2) + '<br/>' : '';
	string += (jiNengMingZhong != 0) ? '增加技能命中&nbsp;' + jiNengMingZhong.toFixed(2) + '<br/>' : '';
	string += (jianMianShangHai != 0) ? '减免伤害&nbsp;+' + jianMianShangHai.toFixed(2) + '%<br/>' : '';
	string += (yuXian != 0) ? '御仙&nbsp;+' + yuXian.toFixed(2) + '%<br/>' : '';
	string += (yuMo != 0) ? '御魔&nbsp;+' + yuMo.toFixed(2) + '%<br/>' : '';
	string += (yuFo != 0) ? '御佛&nbsp;+' + yuFo.toFixed(2) + '%<br/>' : '';
	string += (wuShiJianMian != 0) ? '无视人物伤害减免百分比&nbsp;+' + wuShiJianMian.toFixed(2) + '%<br/>' : '';
	string += (forXian != 0) ? '对仙阵营伤害增加百分比&nbsp;+' + forXian.toFixed(2) + '%<br/>' : '';
	string += (forMo != 0) ? '对魔阵营伤害增加百分比&nbsp;+' + forMo.toFixed(2) + '%<br/>' : '';
	string += (forFo != 0) ? '对佛阵营伤害增加百分比&nbsp;+' + forFo.toFixed(2) + '%<br/>' : '';
	string += (xiuWeiZenJia != 0) ? '获得修为&nbsp;+' + xiuWeiZenJia + '%<br/>' : '';
	string += (yuanLi != 0) ? '元力&nbsp;+' + parseInt(yuanLi) + '<br/>' : '';
	return string;
}

function addAllVal(str, val) {
	if (!ldd.isNull(str)) {
		if (str == '气血') {
			qiXue += parseFloat(val);
		}
		if (str == '真气') {
			zhenQi += parseFloat(val);
		}
		if (str == '元力') {
			yuanLi += parseFloat(val);
		}
		if (str == '攻击') {
			gongJi += parseFloat(val);
		}
		if (str == '防御') {
			fangYu += parseFloat(val);
		}
		if (str == '普通命中') {
			puTongMingZhong += parseFloat(val);
		}
		if (str == '普通躲闪') {
			puTongDuoShan += parseFloat(val);
		}
		if (str == '致命伤害') {
			zhiMingShangHai += parseFloat(val);
		}
		if (str == '致命一击率') {
			zhiMingYiJiLv += parseFloat(val);
		}
		if (str == '技能命中') {
			jiNengMingZhong += parseFloat(val);
		}
		if (str == '技能躲闪') {
			jiNengDuoShan += parseFloat(val);
		}
		if (str == '减免致命率') {
			jianMianZhiMingLv += parseFloat(val);
		}
		if (str == '减免致命伤害') {
			jianMianZhiMingShangHai += parseFloat(val);
		}
		if (str == '御仙') {
			yuXian += parseFloat(val);
		}
		if (str == '御魔') {
			yuMo += parseFloat(val);
		}
		if (str == '御佛') {
			yuFo += parseFloat(val);
		}
		if (str == '眩晕') {
			xuanYun += parseFloat(val);
		}
		if (str == '魅惑') {
			meiHuo += parseFloat(val);
		}
		if (str == '虚弱') {
			xuRuo += parseFloat(val);
		}
		if (str == '昏睡') {
			hunShui += parseFloat(val);
		}
		if (str == '定身') {
			dingShen += parseFloat(val);
		}
		if (str == '减免伤害') {
			jianMianShangHai += parseFloat(val);
		}
		if (str == '无视减免') {
			wuShiJianMian += parseFloat(val);
		}
		if (str == '对仙阵营伤害增加') {
			forXian += parseFloat(val);
		}
		if (str == '对魔阵营伤害增加') {
			forMo += parseFloat(val);
		}
		if (str == '对佛阵营伤害增加') {
			forFo += parseFloat(val);
		}
		if (str == '附加伤害') {
			fuJiaPuTongShangHai += parseFloat(val);
		}
		if (str == '减免普通伤害') {
			jianMianPuTongShangHai += parseFloat(val);
		}
		if (str == '获得修为') {
			xiuWeiZenJia += parseFloat(val);
		}
	}
}

/**阵灵*/

//切换
function changePin(obj, flag) {
	if ($('#hideValue').attr('type') != null && $('#hideValue').attr('type') == '1' && flag == 5) {//角色卡槽
		alert('您选的是角色卡槽，请选择角色牌！');
		return;
	}
	if ($('#hideValue').attr('type') != null && $('#hideValue').attr('type') == '2' && flag != 5) {//法宝卡槽
		alert('您选的是法宝卡槽，请选择法宝牌！');
		return;
	}
	$(obj).addClass('zhenling-1-2-2');
	$(obj).siblings().removeClass('zhenling-1-2-2');
	if (flag == 1) {
		loadAllCardDiv('绝顶');
	} else if (flag == 2) {
		loadAllCardDiv('超凡');
	} else if (flag == 3) {
		loadAllCardDiv('上品');
	} else if (flag == 4) {
		loadAllCardDiv('中品');
	} else if (flag == 5) {
		loadAllCardDiv('法宝');
	}
}
//加载阵灵
function loadAllCardDiv(flag) {
	if (!ldd.isNull(flag)) {
		var obj = $('#loadZhenLing'), data = [], cls = '';
		obj.empty();
		if (flag == '绝顶') {
			data = jueDingZhenLing;
			cls = 'zhenling-1-3-1';
		} else if (flag == '超凡') {
			data = chaoFanZhenLing;
			cls = 'zhenling-1-3-1 zhenling-1-3-2';
		} else if (flag == '上品') {
			data = shangPinZhenLing;
			cls = 'zhenling-1-3-1 zhenling-1-3-3';
		} else if (flag == '中品') {
			data = zhongPinZhenLing;
			cls = 'zhenling-1-3-1 zhenling-1-3-4';
		} else if (flag == '法宝') {
			data = faBaoZhenLing;
			cls = 'zhenling-1-3-1';
		}
		for (var i = 0; i < data.length; i++) {
			var child = $('<div>' + displayName(data[i].name) + '</div>');
			child.attr({
				'class': cls
				, 'type': flag
				, 'name': data[i].name
				, 'xiuZhenDengJi': data[i].xiuZhenDengJi
				, 'jinJieDengJi': data[i].jinJieDengJi
				, 'tiPo': data[i].tiPo
				, 'xiuZhen': data[i].xiuZhen
				, 'yuBao': data[i].yuBao
				, 'tiPoQiXue': data[i].tiPoQiXue
				, 'xiuZhenZhenQi': data[i].xiuZhenZhenQi
				, 'yuBaoGongJi': data[i].yuBaoGongJi
				, 'yaoLing': data[i].yaoLing
				, 'cuiLing': data[i].cuiLing
				, 'one': data[i].one
				, 'two': data[i].two
				, 'four': data[i].four
				, 'six': data[i].six
				, 'nine': data[i].nine
				, 'twelve': data[i].twelve
				, 'oneVal': data[i].oneVal
				, 'twoVal': data[i].twoVal
				, 'fourVal': data[i].fourVal
				, 'sixVal': data[i].sixVal
				, 'nineVal': data[i].nineVal
				, 'twelveVal': data[i].twelveVal
			});
			obj.append(child);
			if ('40' == data[i].cuiLing) {
				$(child).addClass('zhenling-1-3-2');
			} else if ('16' == data[i].cuiLing) {
				$(child).addClass('zhenling-1-3-3');
			} else if ('8' == data[i].cuiLing) {
				$(child).addClass('zhenling-1-3-4');
			}
		}
		;
		$('.zhenling-1-3-1').mouseover(function () {
			$(this).addClass('zhenling-1-3-1-h');
			$(this).siblings().removeClass('zhenling-1-3-1-h');
		}).mouseout(function () {
			$(this).removeClass('zhenling-1-3-1-h');
		}).click(function () {
			$(this).addClass('zhenling-1-3-1-t');
			$(this).siblings().removeClass('zhenling-1-3-1-t');
			loadThisInfo(this, 1);
		});
	}
}

//加载阵灵属性查看
function loadThisInfo(obj, flag) {
	var name, parentObj = [];
	if (flag == 1) {
		parentObj = $('#xiangxi');
		name = $(obj).attr('name');
	} else {
		parentObj = $('#offsetCard');
		name = $(obj).attr('userName');
	}
	parentObj.empty();
	var xiuZhenDengJi = $(obj).attr('xiuZhenDengJi');
	var jinJieDengJi = $(obj).attr('jinJieDengJi');
	var tiPo = $(obj).attr('tiPo');
	var xiuZhen = $(obj).attr('xiuZhen');
	var yuBao = $(obj).attr('yuBao');
	var tiPoQiXue = 0;
	var xiuZhenZhenQi = 0;
	var yuBaoGongJi = 0;
	var maxLevelFlag = false, qiXueZengYi = 0, zhenQiZengYi = 0, gongJiZengYi = 0;
	if (parseInt(xiuZhenDengJi) == 60) {
		maxLevelFlag = true;
	}
	var fbFlag = $(obj).attr('userType') == '法宝' || $(obj).attr('type') == '法宝';
	qiXueZengYi = ldd.arithmetic.qiXueCount($(obj).attr('tiPo'), fbFlag);
	zhenQiZengYi = ldd.arithmetic.zhenQiCount($(obj).attr('xiuZhen'), fbFlag);
	gongJiZengYi = ldd.arithmetic.yuBaoCount($(obj).attr('yuBao'), fbFlag);
	tiPoQiXue = parseInt(qiXueZengYi * parseInt(xiuZhenDengJi));
	xiuZhenZhenQi = parseInt(zhenQiZengYi * parseInt(xiuZhenDengJi));
	yuBaoGongJi = parseInt(gongJiZengYi * parseInt(xiuZhenDengJi));
	var yaoLing = $(obj).attr('yaoLing');
	var cuiLing = $(obj).attr('cuiLing');
	var one = $(obj).attr('one');
	var two = $(obj).attr('two');
	var four = $(obj).attr('four');
	var six = $(obj).attr('six');
	var nine = $(obj).attr('nine');
	var twelve = $(obj).attr('twelve');
	var oneVal = $(obj).attr('oneVal');
	var twoVal = $(obj).attr('twoVal');
	var fourVal = $(obj).attr('fourVal');
	var sixVal = $(obj).attr('sixVal');
	var nineVal = $(obj).attr('nineVal');
	var twelveVal = $(obj).attr('twelveVal');
	var info = '';
	info += '<span class="span-1">' + name + '</span><br/><br/>修真等级：' + xiuZhenDengJi + '<br/>进阶等级：' + ((jinJieDengJi == 0) ? '未进阶' : jinJieDengJi) + '<br/>体魄：'
		+ tiPo + '------<span class="span-2">气血：' + tiPoQiXue + '</span>------' + (maxLevelFlag ? '最高值' : '增减:' + qiXueZengYi.toFixed(1))
		+ '<br/>修真：' + xiuZhen + '------<span class="span-2">真气：' + xiuZhenZhenQi + '</span>------' + (maxLevelFlag ? '最高值' : '增减:' + zhenQiZengYi.toFixed(1))
		+ '<br/>御宝：' + yuBao + '------<span class="span-2">攻击：' + yuBaoGongJi + '</span>------' + (maxLevelFlag ? '最高值' : '增减:' + gongJiZengYi.toFixed(1))
		+ '<br/>曜灵：' + ((yaoLing == 0) ? '无法曜灵' : yaoLing)
		+ '<br/>淬灵需要：' + (maxLevelFlag ? '已满级' : '<span class="span-4">' + (ldd.arithmetic.cuiLingCount(xiuZhenDengJi, cuiLing)))
		+ '</span><br/><br/>渡灵属性：<br/><br/>';
	var span1 = 'span-2', span2 = 'span-2', span3 = 'span-2', span4 = 'span-2', span5 = 'span-2', span6 = 'span-2';
	if (parseInt(jinJieDengJi) > 11) {

	} else if (parseInt(jinJieDengJi) > 8) {
		span6 = 'span-3';
	} else if (parseInt(jinJieDengJi) > 5) {
		span5 = span6 = 'span-3';
	} else if (parseInt(jinJieDengJi) > 3) {
		span4 = span5 = span6 = 'span-3';
	} else if (parseInt(jinJieDengJi) > 1) {
		span3 = span4 = span5 = span6 = 'span-3';
	} else if (parseInt(jinJieDengJi) > 0) {
		span2 = span3 = span4 = span5 = span6 = 'span-3';
	} else {
		span1 = span2 = span3 = span4 = span5 = span6 = 'span-3';
	}
	info += '<span class="' + span1 + '">1阶增益：' + returnString(one, oneVal) + '</span><br/>';
	info += '<span class="' + span2 + '">2阶增益：' + returnString(two, twoVal) + '</span><br/>';
	info += '<span class="' + span3 + '">4阶增益：' + returnString(four, fourVal) + '</span><br/>';
	info += '<span class="' + span4 + '">6阶增益：' + returnString(six, sixVal) + '</span><br/>';
	info += '<span class="' + span5 + '">9阶增益：' + returnString(nine, nineVal) + '</span><br/>';
	info += '<span class="' + span6 + '">12阶增益：' + returnString(twelve, twelveVal) + '</span><br/><br/>';
	parentObj.append(info);
	var cardArray = $('.personageCard');
	var string = '';
	for (var i = 0; i < combinations.length; i++) {
		if (combinations[i].name == name) {
			string += combinations[i].combinationName + '<br/>';
			var jiHuoFlag = false;
			if (cardArray && cardArray.length > 1) {
				for (var g = 0; g < cardArray.length; g++) {
					var flag = false;
					if (g == cardArray.length - 1) {
						for (var k = 0; k < cardArray.length; k++) {
							if (allUser.indexOf($(cardArray[k]).attr('userName')) > -1) {
								for (var x = 0; x < combinations.length; x++) {
									if (combinations[x].name == $(cardArray[k]).attr('userName')) {
										var tiaoJian = combinations[x].tiaoJian.split('、');
										if (tiaoJian.length > 0) {
											for (var j = 0; j < tiaoJian.length; j++) {
												if (allUser.indexOf(tiaoJian[j]) > -1 && tiaoJian[0] == name) {
													flag = true;
												} else {
													flag = false;
													break;
												}
											}
											if (flag && combinations[i].combinationName == combinations[x].combinationName) {
												string += '达成条件：' + combinations[x].tiaoJian + '同时上阵<br/>';
												string += '<span class="span-2">激活属性：' + returnString(combinations[x].activateProperty, combinations[x].activatePropertyVal) + '</span><br/><br/>';
												parentObj.append(string);
												string = '';
												jiHuoFlag = true;
											}
											flag = false;
										}
									}
								}
							}
						}
					}
				}
			}
			if (!jiHuoFlag) {
				string += '达成条件：' + combinations[i].tiaoJian + '同时上阵<br/>';
				string += '<span class="span-3">激活属性：' + returnString(combinations[i].activateProperty, combinations[i].activatePropertyVal) + '</span><br/><br/>';
				parentObj.append(string);
				string = '';
			}
		}
	}
}

//
function returnString(str, val) {
	var returnString = '';
	if (!ldd.isNull(str)) {
		if (str == '气血') {
			returnString = '气血&nbsp;+' + val;
		}
		if (str == '真气') {
			returnString = '真气&nbsp;+' + val;
		}
		if (str == '元力') {
			returnString = '元力&nbsp;+' + val;
		}
		if (str == '攻击') {
			returnString = '攻击&nbsp;+' + val;
		}
		if (str == '防御') {
			returnString = '防御&nbsp;+' + val;
		}
		if (str == '普通命中') {
			returnString = '命中&nbsp;+' + val;
		}
		if (str == '普通躲闪') {
			returnString = '躲闪&nbsp;+' + val;
		}
		if (str == '致命伤害') {
			returnString = '暴击伤害&nbsp;+' + val + '%';
		}
		if (str == '致命一击率') {
			returnString = '暴击率&nbsp;+' + val + '%';
		}
		if (str == '技能命中') {
			returnString = '增加技能命中&nbsp;' + val;
		}
		if (str == '技能躲闪') {
			returnString = '增加技能躲闪&nbsp;' + val;
		}
		if (str == '减免致命率') {
			returnString = '被致命一击的概率减少&nbsp;' + val + '%';
		}
		if (str == '减免致命伤害') {
			returnString = '受到致命一击伤害减少&nbsp;' + val + '%';
		}
		if (str == '眩晕') {
			returnString = '眩晕抗性&nbsp;+' + val;
		}
		if (str == '魅惑') {
			returnString = '魅惑抗性&nbsp;+' + val;
		}
		if (str == '虚弱') {
			returnString = '虚弱抗性&nbsp;+' + val;
		}
		if (str == '昏睡') {
			returnString = '昏睡抗性&nbsp;+' + val;
		}
		if (str == '定身') {
			returnString = '定身抗性&nbsp;+' + val;
		}
		if (str == '减免伤害') {
			returnString = '减免伤害&nbsp;+' + val + '%';
		}
		if (str == '御仙') {
			returnString = '御仙&nbsp;+' + val + '%';
		}
		if (str == '御魔') {
			returnString = '御魔&nbsp;+' + val + '%';
		}
		if (str == '御佛') {
			returnString = '御佛&nbsp;+' + val + '%';
		}
		if (str == '无视减免') {
			returnString = '无视人物伤害减免百分比&nbsp;+' + val + '%';
		}
		if (str == '对仙阵营伤害增加') {
			returnString = '对仙阵营伤害增加百分比&nbsp;+' + val + '%';
		}
		if (str == '对魔阵营伤害增加') {
			returnString = '对魔阵营伤害增加百分比&nbsp;+' + val + '%';
		}
		if (str == '对佛阵营伤害增加') {
			returnString = '对佛阵营伤害增加百分比&nbsp;+' + val + '%';
		}
		if (str == '附加伤害') {
			returnString = '附加伤害&nbsp;+' + val;
		}
		if (str == '减免普通伤害') {
			returnString = '减免伤害&nbsp;+' + val;
		}
		if (str == '获得修为') {
			returnString = '获得修为&nbsp;+' + val + '%';
		}
	}
	return returnString;
}
//使用
function useIt() {
	var obj = $('.zhenling-1-3-1-t');
	if (obj.length == 0) {
		alert('请选择需要使用的阵灵！');
		return;
	}
	var clickType = $('#hideValue').attr('clickType');
	var userName = $('#hideValue').attr('userName');
	if (!ldd.isNull(clickType) && !ldd.isNull(userName) && clickType == '1') {
		if (allUser.length > 0) {
			for (var i = 0; i < allUser.length; i++) {
				if (userName == allUser[i].name) {
					allUser.splice(i, 1);
				}
			}
		}
	}
	var name = $(obj).attr('name');
	var flag = true;
	if ($(obj).attr('type') != '法宝') {
		if (allUser.length > 0) {
			for (var i = 0; i < allUser.length; i++) {
				if (allUser[i].name == name) {
					flag = false;
				}
			}
		}
	}
	if (!flag) {
		alert('该角色已在阵法上');
		return;
	}
	var userType = $(obj).attr('type');
	var xiuZhenDengJi = 1;
	if (ldd.isNull($('#xiuZhenDengJiInput').val()) || parseInt(($('#xiuZhenDengJiInput').val())) < 1) {
		xiuZhenDengJi = 1;
	} else if (parseInt(($('#xiuZhenDengJiInput').val())) > 60) {
		xiuZhenDengJi = 60;
	} else {
		xiuZhenDengJi = $('#xiuZhenDengJiInput').val();
	}
	var jinJieDengJi = $('#useJinJieDengJi option:selected').text();
	var userId = !ldd.isNull($('.mouseclickCss').attr('id')) ? parseInt($('.mouseclickCss').attr('id')) : ldd.setOnlyId();
	var user = {
		id: userId,
		name: name,
		xiuZhenDengJi: xiuZhenDengJi,
		jinJieDengJi: jinJieDengJi,
		tiPo: $(obj).attr('tiPo'),
		xiuZhen: $(obj).attr('xiuZhen'),
		yuBao: $(obj).attr('yuBao'),
		cuiLing: $(obj).attr('cuiLing'),
		type: $(obj).attr('type')
	};

	allUser.push(user);
	/*var tiPoQiXue = $(obj).attr('tiPoQiXue');
	 var xiuZhenZhenQi = $(obj).attr('xiuZhenZhenQi');
	 var yuBaoGongJi = $(obj).attr('yuBaoGongJi');*/
	var tiPo = $(obj).attr('tiPo');
	var xiuZhen = $(obj).attr('xiuZhen');
	var yuBao = $(obj).attr('yuBao');
	var yaoLing = $(obj).attr('yaoLing');
	var cuiLing = $(obj).attr('cuiLing');
	var one = $(obj).attr('one');
	var two = $(obj).attr('two');
	var four = $(obj).attr('four');
	var six = $(obj).attr('six');
	var nine = $(obj).attr('nine');
	var twelve = $(obj).attr('twelve');
	$('.mouseclickCss').empty();
	$('.mouseclickCss').attr({
		'id': userId,
		'one': one,
		'two': two,
		'four': four,
		'six': six,
		'nine': nine,
		'twelve': twelve,
		'tiPo': tiPo,
		'xiuZhen': xiuZhen,
		'yuBao': yuBao,
		'yaoLing': yaoLing,
		'cuiLing': cuiLing,
		'userName': name,
		'userType': userType,
		'xiuZhenDengJi': xiuZhenDengJi,
		'jinJieDengJi': jinJieDengJi,
		'oneVal': $(obj).attr('oneVal'),
		'twoVal': $(obj).attr('twoVal'),
		'fourVal': $(obj).attr('fourVal'),
		'sixVal': $(obj).attr('sixVal'),
		'nineVal': $(obj).attr('nineVal'),
		'twelveVal': $(obj).attr('twelveVal')
	});
	var htmlStr = '<div class="cardParam"><div><div><div class="cardLabel">修真级</div>' +
		'<input value="' + xiuZhenDengJi + '" oninput="ldd.inputNumReg(this,1,2)"/><div class="cardUp" type="xiuzhen">+</div><div class="cardDown" type="xiuzhen">-</div>' +
		'</div><div><div class="cardLabel">进阶级</div>' +
		'<input value="' + jinJieDengJi + '" oninput="ldd.inputNumReg(this,2)"/><div class="cardUp" type="jinjie">+</div><div class="cardDown" type="jinjie">-</div>' +
		'</div></div></div>';
	if ($(obj).attr('type') == '法宝') {
		$('.mouseclickCss').append('<div class="cardName">' + displayName(name, true) + '</div>');
		htmlStr = '<div class="cardParam"><div class="clearCss" style="width: 40px;height: 20px"><img src="image/delete.png" class="cardDelete" style="width: 40px;height: 20px;"/></div><div><div>' +
			'<input value="' + xiuZhenDengJi + '" oninput="ldd.inputNumReg(this,1)"/><div class="cardUp" type="xiuzhen">+</div><div class="cardDown" type="xiuzhen">-</div>' +
			'</div><div>' +
			'<input value="' + jinJieDengJi + '" oninput="ldd.inputNumReg(this)"/><div class="cardUp" type="jinjie">+</div><div class="cardDown" type="jinjie">-</div>' +
			'</div></div></div>';
	} else {
		$('.mouseclickCss').append('<div class="cardName"><div class="clearCss"><img src="image/delete.png" class="cardDelete"/></div>' + displayName(name, true) + '</div>');
	}
	$('.mouseclickCss').append(htmlStr);
	$('.mouseclickCss input').click(function (e) {
		e.stopPropagation();
	});
	$('.mouseclickCss .cardUp,.mouseclickCss .cardDown').click(function (e) {
		var $input = $(this).siblings('input');
		var $val = $input.val();
		var $parent = $(this).parents('.personageCard').length > 0 ? $(this).parents('.personageCard') : $(this).parents('.magicWeaponCard');
		if ('cardUp' == $(this).attr('class')) {
			if ('xiuzhen' == $(this).attr('type')) {
				if ($val < 60) {
					//$input.val(parseInt($val) + 1);
					//$parent.attr('xiuzhendengji', parseInt($val) + 1);
					var user = {
						id: $parent.attr('id'),
						xiuZhenDengJi: parseInt($val) + 1
					};
					changeAllUser(user);
					countAll();
				}
			} else {
				if ($val < 12) {
					//$input.val(parseInt($val) + 1);
					//$parent.attr('jinjiedengji', parseInt($val) + 1);
					var user = {
						id: $parent.attr('id'),
						jinJieDengJi: parseInt($val) + 1
					};
					changeAllUser(user);
					countAll();
				}
			}
		} else {
			if ('xiuzhen' == $(this).attr('type')) {
				if ($val > 1) {
					//$input.val(parseInt($val) - 1);
					//$parent.attr('xiuzhendengji', parseInt($val) - 1);
					var user = {
						id: $parent.attr('id'),
						xiuZhenDengJi: parseInt($val) - 1
					};
					changeAllUser(user);
					countAll();
				}
			} else {
				if ($val > 0) {
					//$input.val(parseInt($val) - 1);
					//$parent.attr('jinjiedengji', parseInt($val) - 1);
					var user = {
						id: $parent.attr('id'),
						jinJieDengJi: parseInt($val) - 1
					};
					changeAllUser(user);
					countAll();
				}
			}
		}
		e.stopPropagation();
	});
	$('.clearCss').click(function (e) {
		var $parent = $(this).parent().parent();
		var name = $parent.attr('username');
		$parent.css('background-color', 'white').removeAttr('userName');
		if ($parent.attr('usertype') == '法宝') {
			$parent.html('<img src="image/add.png" class="addCardImg2"/>');
		} else {
			$parent.html('<img src="image/add.png" class="addCardImg1"/>');
		}
		if (allUser.length > 0) {
			for (var i = 0; i < allUser.length; i++) {
				if (name == allUser[i].name) {
					allUser.splice(i, 1);
				}
			}
		}
		countAll();
		$('#offsetCard').empty();
		$('#offsetCard').hide();
		e.stopPropagation();
	});
	$('.mouseclickCss').css('background-color', obj.css('background-color'));
	$('.mouseclickCss').removeClass('mouseclickCss');
	closeWindow();
	countAll();
}

function changeAllUser(user) {
	if (user && allUser && allUser.length > 0) {
		for (var i = 0; i < allUser.length; i++) {
			if (allUser[i].id == user.id) {
				$.extend(allUser[i], user);
			}
		}
		var cardArray = $('.personageCard,.magicWeaponCard');
		for (var i = 0; i < cardArray.length; i++) {
			if (user.id == $(cardArray[i]).attr('id')) {
				if (user.xiuZhenDengJi) {
					$(cardArray[i]).attr('xiuZhenDengJi', user.xiuZhenDengJi);
					$(cardArray[i]).find('input').eq('0').val(user.xiuZhenDengJi);
				} else {
					$(cardArray[i]).attr('jinJieDengJi', user.jinJieDengJi);
					$(cardArray[i]).find('input').eq('1').val(user.jinJieDengJi);
				}
			}
		}
	}
}

//名字显示
function displayName(name, flag) {
	var nameString = '';
	if (!ldd.isNull(name)) {
		var nameStr = name.split('');
		if (nameStr && nameStr.length > 0) {
			for (var i = 0; i < nameStr.length; i++) {
				if (nameStr.length == 4 && !flag) {
					return '<p style="height: 100%;width: 100%;box-sizing: border-box;padding: 12px">' + name + '</p>';
				}
				if (i == 0 && nameStr.length == 5) {
					nameString += nameStr[i];
				} else if (i == 0 && nameStr.length == 2) {
					nameString += '<br/>' + nameStr[i];
				} else if (i == 0) {
					nameString += '<br/>' + nameStr[i];
				} else if (nameStr.length == 2 && i == 1) {
					nameString += '<br/><br/>' + nameStr[1];
				} else {
					nameString += '<br/>' + nameStr[i];
				}
			}
		}
	}
	return nameString;
}

//关闭
function closeWindow() {
	$('.cardChoice').hide();
	$('.mouseclickCss').removeClass('mouseclickCss');
}

function mouseoverQueryCard(obj) {
	if (!ldd.isNull($(obj).attr('userName'))) {
		$('#offsetCard').css({'left': $(obj).offset().left + 60 + 'px'});
		loadThisInfo(obj, 2);
		$('#offsetCard').show();
	}
}

function mouseoutQueryCard(obj) {
	$('#offsetCard').empty().hide();
}

/**
 * 添加比较
 */
function addCompare() {
	if (allUser && allUser.length > 0) {
		var parent = $('<div class="zhenfa-compare-1"></div>'),
			child = $('<div class="zhenfa-compare-1-1"><div class="zhenfa-compare-1-1-1">比较</div><div class="zhenfa-compare-1-1-2"><img src="image/delete.png" class="compareDelete"></div></div>'),
			string = '';
		$('#compareDiv').append(parent);
		parent.append(child);
		$('.zhenfa-compare-1-1-2').click(function () {
			$(this).parent().parent().remove();
		});
		child = $('<div class="zhenfa-compare-1-2"></div>');
		parent.append(child);
		for (var i = 0; i < allUser.length; i++) {
			if (fbNameList.indexOf(allUser[i].name) == -1) {
				child.append('<div class="zhenfa-compare-1-2-1">' + allUser[i].name + '/' + allUser[i].xiuZhenDengJi + '/' + allUser[i].jinJieDengJi + '</div>');
			}
		}
		child = $('<div class="zhenfa-compare-1-3"></div>');
		parent.append(child);
		//string += (qiXue != 0) ? '气血&nbsp;+' + parseInt(qiXue) + '<br/>' : '';
		//string += (zhenQi != 0) ? '真气&nbsp;+' + parseInt(zhenQi) + '<br/>' : '';
		//string += (yuanLi != 0) ? '元力&nbsp;+' + parseInt(yuanLi) + '<br/>' : '';
		//string += (gongJi != 0) ? '攻击&nbsp;+' + parseInt(gongJi) + '<br/>' : '';
		//string += (fangYu != 0) ? '防御&nbsp;+' + fangYu + '<br/>' : '';
		//string += (puTongMingZhong != 0) ? '命中&nbsp;+' + puTongMingZhong + '<br/>' : '';
		//string += (puTongDuoShan != 0) ? '躲闪&nbsp;+' + puTongDuoShan + '<br/>' : '';
		//string += (zhiMingYiJiLv != 0) ? '暴击率&nbsp;+' + zhiMingYiJiLv.toFixed(2) + '%<br/>' : '';
		//string += (zhiMingShangHai != 0) ? '暴击伤害&nbsp;+' + zhiMingShangHai.toFixed(2) + '%<br/>' : '';
		//string += (jianMianZhiMingLv != 0) ? '被致命一击的概率减少&nbsp;' + jianMianZhiMingLv.toFixed(2) + '%<br/>' : '';
		//string += (jianMianZhiMingShangHai != 0) ? '受到致命一击伤害减少&nbsp;' + jianMianZhiMingShangHai.toFixed(2) + '%<br/>' : '';
		//string += (xuanYun != 0) ? '眩晕抗性&nbsp;+' + xuanYun + '<br/>' : '';
		//string += (xuRuo != 0) ? '虚弱抗性&nbsp;+' + xuRuo + '<br/>' : '';
		//string += (dingShen != 0) ? '定身抗性&nbsp;+' + dingShen + '<br/>' : '';
		//string += (meiHuo != 0) ? '魅惑抗性&nbsp;+' + meiHuo + '<br/>' : '';
		//string += (hunShui != 0) ? '昏睡抗性&nbsp;+' + hunShui + '<br/>' : '';
		//string += (jiNengDuoShan != 0) ? '增加技能躲闪&nbsp;' + jiNengDuoShan.toFixed(2) + '<br/>' : '';
		//string += (jiNengMingZhong != 0) ? '增加技能命中&nbsp;' + jiNengMingZhong.toFixed(2) + '<br/>' : '';
		//string += (yuXian != 0) ? '御仙&nbsp;+' + yuXian.toFixed(2) + '%<br/>' : '';
		//string += (yuMo != 0) ? '御魔&nbsp;+' + yuMo.toFixed(2) + '%<br/>' : '';
		//string += (yuFo != 0) ? '御佛&nbsp;+' + yuFo.toFixed(2) + '%<br/>' : '';
		//string += (jianMianShangHai != 0) ? '减免伤害&nbsp;+' + jianMianShangHai.toFixed(2) + '%<br/>' : '';
		//string += (wuShiJianMian != 0) ? '无视人物伤害减免百分比&nbsp;+' + wuShiJianMian.toFixed(2) + '%<br/>' : '';
		//string += (forXian != 0) ? '对仙阵营伤害增加百分比&nbsp;+' + forXian.toFixed(2) + '%<br/>' : '';
		//string += (forMo != 0) ? '对魔阵营伤害增加百分比&nbsp;+' + forMo.toFixed(2) + '%<br/>' : '';
		//string += (forFo != 0) ? '对佛阵营伤害增加百分比&nbsp;+' + forFo.toFixed(2) + '%<br/>' : '';
		//string += (fuJiaPuTongShangHai != 0) ? '附加伤害&nbsp;+' + fuJiaPuTongShangHai + '<br/>' : '';
		//string += (jianMianPuTongShangHai != 0) ? '减免伤害&nbsp;+' + jianMianPuTongShangHai + '<br/>' : '';
		//string += (xiuWeiZenJia != 0) ? '获得修为&nbsp;+' + xiuWeiZenJia + '%<br/>' : '';
		$(child).append(allPropertyString());
	}
	compare.push({
		'qiXue': qiXue,
		'zhenQi': zhenQi,
		'yuanLi': yuanLi,
		'gongJi': gongJi,
		'fangYu': fangYu,
		'puTongMingZhong': puTongMingZhong,
		'puTongDuoShan': puTongDuoShan,
		'zhiMingShangHai': zhiMingShangHai,
		'zhiMingYiJiLv': zhiMingYiJiLv,
		'jiNengMingZhong': jiNengMingZhong,
		'jiNengDuoShan': jiNengDuoShan,
		'jianMianZhiMingLv': jianMianZhiMingLv,
		'jianMianZhiMingShangHai': jianMianZhiMingShangHai,
		'yuXian': yuXian,
		'yuMo': yuMo,
		'yuFo': yuFo,
		'xuanYun': xuanYun,
		'meiHuo': meiHuo,
		'xuRuo': xuRuo,
		'hunShui': hunShui,
		'dingShen': dingShen,
		'jianMianShangHai': jianMianShangHai,
		'wuShiJianMian': wuShiJianMian,
		'forXian': forXian,
		'forMo': forMo,
		'forFo': forFo,
		'yaoLing': yaoLing,
		'cuiLing': cuiLing,
		'fuJiaPuTongShangHai': fuJiaPuTongShangHai,
		'jianMianPuTongShangHai': jianMianPuTongShangHai,
		'xiuWeiZenJia': xiuWeiZenJia
	});
}