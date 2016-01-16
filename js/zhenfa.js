/**阵法  */
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
var hunShui= 0;//昏睡
var dingShen = 0;//定身
var jianMianShangHai = 0.00;//减免伤害
var wuShiJianMian = 0.00;//无视减免
var forXian = 0.00;//克仙
var forMo = 0.00;//克魔
var forFo = 0.00;//克佛
var yaoLing = 0;//曜灵
var cuiLing = 0;//淬灵
var fuJiaPuTongShangHai = 0;//
var jianMianPuTongShangHai = 0;//
var xiuWeiZenJia = 0;

var compare = new Array();
var allUser = new Array();
//初始化
$j(function(){
	$j('#zhenFaDengJi').val('2');
	$j("#jiHuoVal , #xiaoHaoVal").niceScroll({touchbehavior:false,  
            cursoropacitymax:1.6,  
            cursorwidth:5,  
            horizrailenabled:false,  
            cursorborderradius:5,  
            autohidemode:false  
        });
	setInterval('favicon()', 300);
	window.onkeydown = function(e){
		if(e.which){
			if(e.which == 116){
				if(confirm('确定刷新页面吗？刷新后页面数据将被清除！')){
					return true;
				}else{
					return false;
				}
			}
		}else if(event.keyCode){
			if(event.keyCode == 116){
				if(confirm('确定刷新页面吗？刷新后页面数据将被清除！')){
					return true;
				}else{
					return false;
				}
			}
		}
	};
	$j('#xiuzhenslider').slider({
		orientation: "horizontal",
     	range: "min",
      	max: 60,
      	min:1,
      	value: 1,
	    slide: refreshInputValueBySlider,
	    change: refreshInputValueBySlider
    });
	$j('#jinjieslider').slider({
		orientation: "horizontal",
     	range: "min",
      	max: 12,
      	min: 0,
      	value: 0,
	    slide: refreshSelectValueBySlider,
	    change: refreshSelectValueBySlider
    });
    $j('#xiuZhenDengJiInput').change(function(){
    	if($j(this).val() != null && $j(this).val() > 0){
    		var val = $j(this).val();
    		if($j(this).val() > 60){
				val = 60;
    		}
    		refreshSliderValue('#xiuzhenslider' , val);
    	}
    });
    $j('#useJinJieDengJi').change(function(){
    	refreshSliderValue('#jinjieslider' , $j(this).val());
    });
});

function refreshSliderValue(obj , val){
	$j(obj).slider("value" , val);
}


function refreshInputValueBySlider(){
	var val = $j('#xiuzhenslider').slider('value');
	$j('#xiuZhenDengJiInput').val(val);
}

function refreshSelectValueBySlider(){
	var val = $j('#jinjieslider').slider('value');
	$j('#useJinJieDengJi').val(val);
}

function favicon(){
	var obj = $j('#favicon');
	var picnum = obj.attr('picnum');
	if(picnum == 0){
		obj.attr({'href':'image/favicon1.png','picnum':'1'});
	}else if(picnum == 1){
		obj.attr({'href':'image/favicon0.png','picnum':'2'});
	}else if(picnum == 2){
		obj.attr({'href':'image/favicon1.png','picnum':'3'});
	}else if(picnum == 3){
		obj.attr({'href':'image/favicon2.png','picnum':'4'});
	}else if(picnum == 4){
		obj.attr({'href':'image/favicon1.png','picnum':'5'});
	}else if(picnum == 5){
		obj.attr({'href':'image/favicon3.png','picnum':'6'});
	}else if(picnum == 6){
		obj.attr({'href':'image/favicon1.png','picnum':'7'});
	}else if(picnum == 7){
		obj.attr({'href':'image/favicon0.png','picnum':'0'});
	}
}
//判断是否为空 
function isNull(obj){
	return obj == null || obj === "" || obj===undefined || obj==='undefined' || obj == 'null';
}

//添加阵灵卡槽Div
function addCardDiv(obj , top , left){
	var parent = new Element('div',{'class':'personageCard','style':'top:' 
			+ top + 'px;left:' + left + 'px;','onclick':'selectZhenLing(this,1)'
				,'onmouseover':'mouseoverQueryCard(this)'
					,'onmouseout':'mouseoutQueryCard(this)'});
	obj.append(parent);
	var child = new Element('img',{'class':'addCardImg1','src':'image/add.png'});
	parent.appendChild(child);
	parent = new Element('div',{'class':'magicWeaponCard','style':'top:' 
			+ (parseInt(top) + 30) + 'px;left:' + (parseInt(left) + 65) + 'px;'
				,'onclick':'selectZhenLing(this,2)','onmouseover':'mouseoverQueryCard(this)'
					,'onmouseout':'mouseoutQueryCard(this)'});
	obj.append(parent);
	child = new Element('img',{'class':'addCardImg2','src':'image/add.png'});
	parent.appendChild(child);
}
//选择事件
function selectZhenFa(){
	var num = $j('#zhenFaDengJi option:selected').val();
	var now = $j('#hideValue').attr('zhenFaDengJi');
	var obj = $j('#zhenCard')
		,zhenFaName = $j('#zhenFaDengJi option:selected').text();
	if(num == now){
		return;
	}else{
		var flag = false;
		if(allUser && allUser.length > 0){
			if(confirm('确定更改阵灵等级？')){
				flag = true;
				allUser = new Array();
				$j('#allVal').empty();
				$j('#jiHuoVal').empty();
				$j('#xiaoHaoVal').empty();
			}
		}else{
			flag = true;
		}
		if(flag){
			$j('#hideValue').attr('zhenFaDengJi',num);
			$j('#zhenFaName').html(zhenFaName);
			$j('#zhenFaNameNow').html(zhenFaName);
			obj.empty();
			switch(parseInt(num)){
				case 2:
					$j('#upZhenFaNum').html(2640);
					$j('#zhenFaNameNext').html('三才天地阵');
					addCardDiv(obj , 100 ,90);
					addCardDiv(obj , 330 ,300);
					addCss();
					break;
				case 3:
					$j('#upZhenFaNum').html(5920);
					$j('#zhenFaNameNext').html('四门斗底阵');
					addCardDiv(obj , 60 ,300);
					addCardDiv(obj , 200 ,70);
					addCardDiv(obj , 380 ,260);
					addCss();
					break;
				case 4:
					$j('#upZhenFaNum').html(18760);
					$j('#zhenFaNameNext').html('五虎群羊阵');
					addCardDiv(obj , 60 ,220);
					addCardDiv(obj , 220 ,80);
					addCardDiv(obj , 220 ,340);
					addCardDiv(obj , 380 ,220);
					addCss();
					break;
				case 5:
					$j('#upZhenFaNum').html(64280);
					$j('#zhenFaNameNext').html('六宇连方阵');
					addCardDiv(obj , 50 ,220);
					addCardDiv(obj , 220 ,70);
					addCardDiv(obj , 220 ,350);
					addCardDiv(obj , 400 ,140);
					addCardDiv(obj , 400 ,300);
					addCss();
					break;
				case 6:
					$j('#upZhenFaNum').html(232840);
					$j('#zhenFaNameNext').html('七星北斗阵');
					addCardDiv(obj , 30 ,220);
					addCardDiv(obj , 170 ,70);
					addCardDiv(obj , 170 ,350);
					addCardDiv(obj , 310 ,70);
					addCardDiv(obj , 310 ,350);
					addCardDiv(obj , 450 ,220);
					addCss();
					break;
				case 7:
					$j('#upZhenFaNum').html(698520);
					$j('#zhenFaNameNext').html('八门金锁阵');
					addCardDiv(obj , 30 ,210);
					addCardDiv(obj , 170 ,90);
					addCardDiv(obj , 170 ,330);
					addCardDiv(obj , 280 ,210);
					addCardDiv(obj , 350 ,40);
					addCardDiv(obj , 350 ,360);
					addCardDiv(obj , 450 ,210);
					addCss();
					break;
				case 8:
					$j('#upZhenFaNum').html('---');
					$j('#zhenFaNameNext').html('-----');
					addCardDiv(obj , 30 ,50);
					addCardDiv(obj , 30 ,350);
					addCardDiv(obj , 170 ,120);
					addCardDiv(obj , 170 ,300);
					addCardDiv(obj , 310 ,120);
					addCardDiv(obj , 310 ,300);
					addCardDiv(obj , 450 ,50);
					addCardDiv(obj , 450 ,350);
					addCss();
					break;
			}
		}
	}
}
//添加样式
function addCss(){
	$j('.personageCard,.magicWeaponCard').mouseover(function(){
		$j(this).addClass('mouseoverCss');
		$j(this).siblings().removeClass('mouseoverCss');
	});
	$j('.personageCard,.magicWeaponCard').mouseout(function(){
		$j(this).removeClass('mouseoverCss');
	});
	$j('.personageCard,.magicWeaponCard').click(function(){
		$j(this).addClass('mouseclickCss');
		$j(this).siblings().removeClass('mouseclickCss');
	});
}

/**
 * 选择阵灵
 * @param type 1:角色  2：法宝
 */
function selectZhenLing(obj,type){
	$j('#hideValue').attr('type',type);
	$j('.cardChoice').show();
	$j('#xiangxi').empty();
	var name = $j(obj).attr('userName');
	var userType = $j(obj).attr('userType');
	var thisJinJieDengJi = $j(obj).children(':eq(1)').text();
	if(!isNull(thisJinJieDengJi)){
		$j('#useJinJieDengJi').val(thisJinJieDengJi);
	}
	if(!isNull(type) && type == 1){
		$j('#jdButton').addClass('zhenling-1-2-2');
		$j('#jdButton').siblings().removeClass('zhenling-1-2-2');
		$j('#hideValue').attr({'clickType':'0'});
		if(!isNull(userType)){
			if(userType == '绝顶'){
				loadAllCardDiv('绝顶');
			}else if(userType == '超凡'){
				loadAllCardDiv('超凡');
			}else if(userType == '上品'){
				loadAllCardDiv('上品');
			}else if(userType == '中品'){
				loadAllCardDiv('中品');
			}
			if(!isNull(name)){
				$j('#hideValue').attr({'clickType':'1','userName':name});
	    		$j('div[name="' + name + '"]').addClass('zhenling-1-3-1-t');
	    		$j('div[name="' + name + '"]').siblings().removeClass('zhenling-1-3-1-t');
	    		loadThisInfo('div[name="' + name + '"]',1);
			}
		}else{
			loadAllCardDiv('绝顶');
		}
	}else{
		$j('#fbButton').addClass('zhenling-1-2-2');
		$j('#fbButton').siblings().removeClass('zhenling-1-2-2');
		loadAllCardDiv('法宝');
		$j('#hideValue').attr({'clickType':'0'});
		if(!isNull(name)){
			$j('#hideValue').attr({'clickType':'1','userName':name});
    		$j('div[name="' + name + '"]').addClass('zhenling-1-3-1-t');
    		$j('div[name="' + name + '"]').siblings().removeClass('zhenling-1-3-1-t');
    		loadThisInfo('div[name="' + name + '"]',1);
		}
	}
}

//计算属性值
function countAll(){
	var cardArray = $j('.personageCard,.magicWeaponCard');
	var string = '',jiHuoString = '',xiaoHaoString = '';
	$j('#allVal').empty();
	$j('#jiHuoVal').empty();
	$j('#xiaoHaoVal').empty();
	if(cardArray.length > 0 && allUser.length > 0){
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
		hunShui= 0;//昏睡
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
		for(var i = 0 ; i < cardArray.length ; i++){
			if(JSON.stringify(allUser).indexOf($j(cardArray[i]).attr('userName')) > -1){
				if($j(cardArray[i]).attr('userType') == '法宝'){
					tiPoQiXue = parseFloat($j(cardArray[i]).attr('tiPo'))/3*parseInt($j(cardArray[i]).attr('xiuZhenDengJi'));
					xiuZhenZhenQi = parseFloat(parseFloat($j(cardArray[i]).attr('xiuZhen')) / 1.72 * parseInt($j(cardArray[i]).attr('xiuZhenDengJi')));
					yuBaoGongJi = parseFloat($j(cardArray[i]).attr('yuBao'))/30*parseInt($j(cardArray[i]).attr('xiuZhenDengJi'));
				}else{
					tiPoQiXue = parseFloat($j(cardArray[i]).attr('tiPo'))/1.2*parseInt($j(cardArray[i]).attr('xiuZhenDengJi'));
					xiuZhenZhenQi = parseFloat(parseFloat($j(cardArray[i]).attr('xiuZhen')) / 1.2 * parseInt($j(cardArray[i]).attr('xiuZhenDengJi')));
					yuBaoGongJi = parseFloat($j(cardArray[i]).attr('yuBao'))/12*parseInt($j(cardArray[i]).attr('xiuZhenDengJi'));
				}
				addAllVal('气血',tiPoQiXue);
				addAllVal('真气',xiuZhenZhenQi);
				addAllVal('攻击',yuBaoGongJi);
				if(parseInt($j(cardArray[i]).attr('jinJieDengJi')) > 0){
					addAllVal($j(cardArray[i]).attr('one'),$j(cardArray[i]).attr('oneVal'));
				}
				if(parseInt($j(cardArray[i]).attr('jinJieDengJi')) > 1){
					addAllVal($j(cardArray[i]).attr('two'),$j(cardArray[i]).attr('twoVal'));
				}
				if(parseInt($j(cardArray[i]).attr('jinJieDengJi')) > 3){
					addAllVal($j(cardArray[i]).attr('four'),$j(cardArray[i]).attr('fourVal'));
				}
				if(parseInt($j(cardArray[i]).attr('jinJieDengJi')) > 5){
					addAllVal($j(cardArray[i]).attr('six'),$j(cardArray[i]).attr('sixVal'));
				}
				if(parseInt($j(cardArray[i]).attr('jinJieDengJi')) > 8){
					addAllVal($j(cardArray[i]).attr('nine'),$j(cardArray[i]).attr('nineVal'));
				}
				if(parseInt($j(cardArray[i]).attr('jinJieDengJi')) > 11){
					addAllVal($j(cardArray[i]).attr('twelve'),$j(cardArray[i]).attr('twelveVal'));
				}
				yaoLing += parseInt($j(cardArray[i]).attr('yaoLing') == 0?'0':parseInt($j(cardArray[i]).attr('yaoLing')) 
						* (parseInt($j(cardArray[i]).attr('jinJieDengJi')) + 1));
				cuiLing += parseInt($j(cardArray[i]).attr('xiuZhenDengJi')) == 1?parseInt(0):
					(parseInt($j(cardArray[i]).attr('xiuZhenDengJi')) * 2 * parseInt($j(cardArray[i]).attr('cuiLing'))
							- 2 * parseInt($j(cardArray[i]).attr('cuiLing'))) * (parseInt($j(cardArray[i]).attr('xiuZhenDengJi')) - 1) / 2;
				xiaoHaoString += $j(cardArray[i]).attr('userName') + '： + ' 
					+ (parseInt($j(cardArray[i]).attr('jinJieDengJi')) + 1) 
					+ '张<br/>' + ($j(cardArray[i]).attr('yaoLing') == 0?'&nbsp;&nbsp;无法曜灵': '&nbsp;&nbsp;宝奁玉尘：+ ' + parseInt($j(cardArray[i]).attr('yaoLing')) 
							* (parseInt($j(cardArray[i]).attr('jinJieDengJi')) + 1)) + '<br/>'
					+ (parseInt($j(cardArray[i]).attr('xiuZhenDengJi')) == 1?'':'&nbsp;&nbsp;沧浪冰珠： + ' 
						+ ((parseInt($j(cardArray[i]).attr('xiuZhenDengJi')) * 2 * parseInt($j(cardArray[i]).attr('cuiLing'))
								- 2 * parseInt($j(cardArray[i]).attr('cuiLing'))) * 
								(parseInt($j(cardArray[i]).attr('xiuZhenDengJi')) - 1) / 2) + '<br/>') + '<br/>';
			}
			//查看激活属性
			var flag = false;
			if(i == cardArray.length -1){
				for(var k = 0 ; k < cardArray.length ; k++){
					if(JSON.stringify(allUser).indexOf($j(cardArray[k]).attr('userName')) > -1){
			        	for(var x = 0 ; x < combinations.length ; x ++){
			        		if(combinations[x].name == $j(cardArray[k]).attr('userName')){
			        			var tiaoJian = combinations[x].tiaoJian.split('、');
				        		if(tiaoJian.length > 0){
				        			for(var j = 0 ; j < tiaoJian.length ; j ++){
				        				if(JSON.stringify(allUser).indexOf(tiaoJian[j]) > -1){
						        			flag = true;
						        		}else{
						        			flag = false;
						        			break;
						        		}
				        			}
				        			if(flag){
					        			jiHuoString+=combinations[x].combinationName + '<br/>';
						        		jiHuoString+='达成条件：' + combinations[x].tiaoJian + '同时上阵<br/>';
						        		jiHuoString+='激活属性：' + returnString(combinations[x].activateProperty,combinations[x].activatePropertyVal) + '<br/><br/>';
						        		$j('#jiHuoVal').append(jiHuoString);
						        		addAllVal(combinations[x].activateProperty,combinations[x].activatePropertyVal);
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
		string += (qiXue != 0)?'气血&nbsp;+' + parseInt(qiXue) + '<br/>':'';
		string += (zhenQi != 0)?'真气&nbsp;+' + parseInt(zhenQi) + '<br/>':'';
		string += (yuanLi != 0)?'元力&nbsp;+' + parseInt(yuanLi) + '<br/>':'';
		string += (gongJi != 0)?'攻击&nbsp;+' + parseInt(gongJi) + '<br/>':'';
		string += (fangYu != 0)?'防御&nbsp;+' + fangYu + '<br/>':'';
		string += (puTongMingZhong != 0)?'命中&nbsp;+' + puTongMingZhong + '<br/>':'';
		string += (puTongDuoShan != 0)?'躲闪&nbsp;+' + puTongDuoShan + '<br/>':'';
		string += (zhiMingShangHai != 0)?'暴击伤害&nbsp;+' + zhiMingShangHai.toFixed(2) + '%<br/>':'';
		string += (zhiMingYiJiLv != 0)?'暴击率&nbsp;+' + zhiMingYiJiLv.toFixed(2) + '%<br/>':'';
		string += (jiNengMingZhong != 0)?'增加技能命中&nbsp;' + jiNengMingZhong.toFixed(2) + '<br/>':'';
		string += (jiNengDuoShan != 0)?'增加技能躲闪&nbsp;' + jiNengDuoShan.toFixed(2) + '<br/>':'';
		string += (jianMianZhiMingLv != 0)?'被致命一击的概率减少&nbsp;' + jianMianZhiMingLv.toFixed(2) + '%<br/>':'';
		string += (jianMianZhiMingShangHai != 0)?'受到致命一击伤害减少&nbsp;' + jianMianZhiMingShangHai.toFixed(2) + '%<br/>':'';
		string += (yuXian != 0)?'御仙&nbsp;+' + yuXian.toFixed(2) + '%<br/>':'';
		string += (yuMo != 0)?'御魔&nbsp;+' + yuMo.toFixed(2) + '%<br/>':'';
		string += (yuFo != 0)?'御佛&nbsp;+' + yuFo.toFixed(2) + '%<br/>':'';
		string += (xuanYun != 0)?'眩晕抗性&nbsp;+' + xuanYun + '<br/>':'';
		string += (meiHuo != 0)?'魅惑抗性&nbsp;+' + meiHuo + '<br/>':'';
		string += (xuRuo != 0)?'虚弱抗性&nbsp;+' + xuRuo + '<br/>':'';
		string += (hunShui != 0)?'昏睡抗性&nbsp;+' + hunShui + '<br/>':'';
		string += (dingShen != 0)?'定身抗性&nbsp;+' + dingShen + '<br/>':'';
		string += (jianMianShangHai != 0)?'减免伤害&nbsp;+' + jianMianShangHai.toFixed(2) + '%<br/>':'';
		string += (wuShiJianMian != 0)?'无视人物伤害减免百分比&nbsp;+' + wuShiJianMian.toFixed(2) + '%<br/>':'';
		string += (forXian != 0)?'对仙阵营伤害增加百分比&nbsp;+' + forXian.toFixed(2) + '%<br/>':'';
		string += (forMo != 0)?'对魔阵营伤害增加百分比&nbsp;+' + forMo.toFixed(2) + '%<br/>':'';
		string += (forFo != 0)?'对佛阵营伤害增加百分比&nbsp;+' + forFo.toFixed(2) + '%<br/>':'';
		string += (fuJiaPuTongShangHai != 0)?'附加伤害&nbsp;+' + fuJiaPuTongShangHai + '<br/>':'';
		string += (jianMianPuTongShangHai != 0)?'减免伤害&nbsp;+' + jianMianPuTongShangHai + '<br/>':'';
		string += (xiuWeiZenJia != 0)?'获得修为&nbsp;+' + xiuWeiZenJia + '%<br/>':'';
		$j('#allVal').empty();
		$j('#allVal').append(string);
		$j('#xiaoHaoVal').append(xiaoHaoString);
		if(yaoLing != 0 || cuiLing != 0){
			$j('#xiaoHaoVal').append('统计：<br/>' + (yaoLing == 0?'':'&nbsp;&nbsp;宝奁玉尘：+ ' + yaoLing + '<br/>')
					+ (cuiLing == 0?'':'&nbsp;&nbsp;沧浪冰珠：+ ' + cuiLing));
		}
	}
}

function addAllVal(str,val){
	if(!isNull(str)){
		if(str == '气血'){
			qiXue += parseFloat(val);
		}
		if(str == '真气'){
			zhenQi += parseFloat(val);
		}
		if(str == '元力'){
			yuanLi += parseFloat(val);
		}
		if(str == '攻击'){
			gongJi += parseFloat(val);
		}
		if(str == '防御'){
			fangYu += parseFloat(val);
		}
		if(str == '普通命中'){
			puTongMingZhong += parseFloat(val);
		}
		if(str == '普通躲闪'){
			puTongDuoShan += parseFloat(val);
		}
		if(str == '致命伤害'){
			zhiMingShangHai += parseFloat(val);
		}
		if(str == '致命一击率'){
			zhiMingYiJiLv += parseFloat(val);
		}
		if(str == '技能命中'){
			jiNengMingZhong += parseFloat(val);
		}
		if(str == '技能躲闪'){
			jiNengDuoShan += parseFloat(val);
		}
		if(str == '减免致命率'){
			jianMianZhiMingLv += parseFloat(val);
		}
		if(str == '减免致命伤害'){
			jianMianZhiMingShangHai += parseFloat(val);
		}
		if(str == '御仙'){
			yuXian += parseFloat(val);
		}
		if(str == '御魔'){
			yuMo += parseFloat(val);
		}
		if(str == '御佛'){
			yuFo += parseFloat(val);
		}
		if(str == '眩晕'){
			xuanYun += parseFloat(val);
		}
		if(str == '魅惑'){
			meiHuo += parseFloat(val);
		}
		if(str == '虚弱'){
			xuRuo += parseFloat(val);
		}
		if(str == '昏睡'){
			hunShui += parseFloat(val);
		}
		if(str == '定身'){
			dingShen += parseFloat(val);
		}
		if(str == '减免伤害'){
			jianMianShangHai += parseFloat(val);
		}
		if(str == '无视减免'){
			wuShiJianMian += parseFloat(val);
		}
		if(str == '对仙阵营伤害增加'){
			forXian += parseFloat(val);
		}
		if(str == '对魔阵营伤害增加'){
			forMo += parseFloat(val);
		}
		if(str == '对佛阵营伤害增加'){
			forFo += parseFloat(val);
		}
		if(str == '附加伤害'){
			fuJiaPuTongShangHai += parseFloat(val);
		}
		if(str == '减免普通伤害'){
			jianMianPuTongShangHai += parseFloat(val);
		}
		if(str == '获得修为'){
			xiuWeiZenJia += parseFloat(val);
		}
	}
}

/**阵灵*/

//切换
function changePin(obj,flag){
	if($j('#hideValue').attr('type') != null && $j('#hideValue').attr('type') == '1' && flag == 5){//角色卡槽
		alert('您选的是角色卡槽，请选择角色牌！');
		return;
	}
	if($j('#hideValue').attr('type') != null && $j('#hideValue').attr('type') == '2' && flag != 5){//法宝卡槽
		alert('您选的是法宝卡槽，请选择法宝牌！');
		return;
	}
	$j(obj).addClass('zhenling-1-2-2');
	$j(obj).siblings().removeClass('zhenling-1-2-2');
	if(flag == 1){
		loadAllCardDiv('绝顶');
	}else if(flag == 2){
		loadAllCardDiv('超凡');
	}else if(flag == 3){
		loadAllCardDiv('上品');
	}else if(flag == 4){
		loadAllCardDiv('中品');
	}else if(flag == 5){
		loadAllCardDiv('法宝');
	}
}
//加载阵灵
function loadAllCardDiv(flag){
	if(!isNull(flag)){
    	var obj = $j('#loadZhenLing'),data = [],cls = '';
		obj.empty();
		if(flag == '绝顶'){
			data = jueDingZhenLing;
			cls = 'zhenling-1-3-1';
		}else if(flag == '超凡'){
			data = chaoFanZhenLing;
			cls = 'zhenling-1-3-1 zhenling-1-3-2';
		}else if(flag == '上品'){
			data = shangPinZhenLing;
			cls = 'zhenling-1-3-1 zhenling-1-3-3';
		}else if(flag == '中品'){
			data = zhongPinZhenLing;
			cls = 'zhenling-1-3-1 zhenling-1-3-4';
		}else if(flag == '法宝'){
			data = faBaoZhenLing;
			cls = 'zhenling-1-3-1';
		}
		for(var i = 0 ; i < data.length ; i ++){
			var child =new Element('div',{'class':cls
    			,'type':flag
    			,'name' : data[i].name
    			,'xiuZhenDengJi' : data[i].xiuZhenDengJi
    			,'jinJieDengJi' : data[i].jinJieDengJi
    			,'tiPo' : data[i].tiPo
    			,'xiuZhen' : data[i].xiuZhen
    			,'yuBao' : data[i].yuBao
    			,'tiPoQiXue' : data[i].tiPoQiXue
    			,'xiuZhenZhenQi' : data[i].xiuZhenZhenQi
    			,'yuBaoGongJi' : data[i].yuBaoGongJi
    			,'yaoLing' : data[i].yaoLing
    			,'cuiLing' : data[i].cuiLing
    			,'one' : data[i].one
    			,'two' : data[i].two
    			,'four' : data[i].four
    			,'six' : data[i].six
    			,'nine' : data[i].nine
    			,'twelve' : data[i].twelve
    			,'oneVal' : data[i].oneVal
    			,'twoVal' : data[i].twoVal
    			,'fourVal' : data[i].fourVal
    			,'sixVal' : data[i].sixVal
    			,'nineVal' : data[i].nineVal
    			,'twelveVal' : data[i].twelveVal
    			}).update(displayName(data[i].name));
    			obj.append(child);
    		if('40' == data[i].cuiLing){
    			$j(child).addClass('zhenling-1-3-2');
    		}else if('16' == data[i].cuiLing){
    			$j(child).addClass('zhenling-1-3-3');
    		}else if('8' == data[i].cuiLing){
    			$j(child).addClass('zhenling-1-3-4');
    		}
    	};
    	$j('.zhenling-1-3-1').mouseover(function(){
    		$j(this).addClass('zhenling-1-3-1-h');
    		$j(this).siblings().removeClass('zhenling-1-3-1-h');
    	});
    	$j('.zhenling-1-3-1').mouseout(function(){
    		$j(this).removeClass('zhenling-1-3-1-h');
    	});
    	$j('.zhenling-1-3-1').click(function(){
    		$j(this).addClass('zhenling-1-3-1-t');
    		$j(this).siblings().removeClass('zhenling-1-3-1-t');
    		loadThisInfo(this,1);
    	});
	}
}

//加载阵灵属性查看
function loadThisInfo(obj,flag){
	var name;
	if(flag == 1){
		parentObj = $j('#xiangxi');
		name = $j(obj).attr('name');
	}else{
		parentObj = $j('#offsetCard');
		name = $j(obj).attr('userName');
	}
	parentObj.empty();
	var xiuZhenDengJi = $j(obj).attr('xiuZhenDengJi');
	var jinJieDengJi = $j(obj).attr('jinJieDengJi');
	var tiPo = $j(obj).attr('tiPo');
	var xiuZhen = $j(obj).attr('xiuZhen');
	var yuBao = $j(obj).attr('yuBao');
	var tiPoQiXue = 0;
	var xiuZhenZhenQi = 0;
	var yuBaoGongJi = 0;
	if($j(obj).attr('userType') == '法宝'|| $j(obj).attr('type') == '法宝'){
		tiPoQiXue = parseInt(parseFloat($j(obj).attr('tiPo'))/3*parseInt(xiuZhenDengJi));
		xiuZhenZhenQi = parseInt(parseFloat($j(obj).attr('xiuZhen'))/1.72*parseInt(xiuZhenDengJi));
		yuBaoGongJi = parseInt(parseFloat($j(obj).attr('yuBao'))/30*parseInt(xiuZhenDengJi));
	}else{
		tiPoQiXue = parseInt(parseFloat($j(obj).attr('tiPo'))/1.2*parseInt(xiuZhenDengJi));
		xiuZhenZhenQi = parseInt(parseFloat($j(obj).attr('xiuZhen'))/1.2*parseInt(xiuZhenDengJi));
		yuBaoGongJi = parseInt(parseFloat($j(obj).attr('yuBao'))/12*parseInt(xiuZhenDengJi));
	}
	var yaoLing = $j(obj).attr('yaoLing');
	var cuiLing = $j(obj).attr('cuiLing');
	var one = $j(obj).attr('one');
	var two = $j(obj).attr('two');
	var four = $j(obj).attr('four');
	var six = $j(obj).attr('six');
	var nine = $j(obj).attr('nine');
	var twelve = $j(obj).attr('twelve');
	var oneVal = $j(obj).attr('oneVal');
	var twoVal = $j(obj).attr('twoVal');
	var fourVal = $j(obj).attr('fourVal');
	var sixVal = $j(obj).attr('sixVal');
	var nineVal = $j(obj).attr('nineVal');
	var twelveVal = $j(obj).attr('twelveVal');
	var info = '';
	info += '<span class="span-1">' + name + '</span><br/><br/>修真等级：' + xiuZhenDengJi + '<br/>进阶等级：' + ((jinJieDengJi == 0)?'未进阶':jinJieDengJi) + '<br/>体魄：'
				+ tiPo + '------<span class="span-2">气血：' + tiPoQiXue + '</span><br/>修真：' + xiuZhen + '------<span class="span-2">真气：' + xiuZhenZhenQi 
				+ '</span><br/>御宝：' + yuBao + '------<span class="span-2">攻击：' + yuBaoGongJi + '</span><br/>曜灵：' + ((yaoLing == 0)?'无法曜灵':yaoLing) 
				+ '<br/>淬灵需要：' + (parseInt(xiuZhenDengJi) == 60?'已满级':'<span class="span-4">' + (2 * parseInt(xiuZhenDengJi) * parseInt(cuiLing) - parseInt(cuiLing)))
				+ '</span><br/><br/>渡灵属性：<br/><br/>';
	if(parseInt(jinJieDengJi) > 11){
		info += '<span class="span-2">1阶增益：' + returnString(one,oneVal) + '</span><br/>';
		info += '<span class="span-2">2阶增益：' + returnString(two,twoVal) + '</span><br/>';
		info += '<span class="span-2">4阶增益：' + returnString(four,fourVal) + '</span><br/>';
		info += '<span class="span-2">6阶增益：' + returnString(six,sixVal) + '</span><br/>';
		info += '<span class="span-2">9阶增益：' + returnString(nine,nineVal) + '</span><br/>';
		info += '<span class="span-2">12阶增益：' + returnString(twelve,twelveVal) + '</span><br/><br/>';
	}else if(parseInt(jinJieDengJi) > 8){
		info += '<span class="span-2">1阶增益：' + returnString(one,oneVal) + '</span><br/>';
		info += '<span class="span-2">2阶增益：' + returnString(two,twoVal) + '</span><br/>';
		info += '<span class="span-2">4阶增益：' + returnString(four,fourVal) + '</span><br/>';
		info += '<span class="span-2">6阶增益：' + returnString(six,sixVal) + '</span><br/>';
		info += '<span class="span-2">9阶增益：' + returnString(nine,nineVal) + '</span><br/>';
		info += '<span class="span-3">12阶增益：' + returnString(twelve,twelveVal) + '</span><br/><br/>';
	}else if(parseInt(jinJieDengJi) > 5){
		info += '<span class="span-2">1阶增益：' + returnString(one,oneVal) + '</span><br/>';
		info += '<span class="span-2">2阶增益：' + returnString(two,twoVal) + '</span><br/>';
		info += '<span class="span-2">4阶增益：' + returnString(four,fourVal) + '</span><br/>';
		info += '<span class="span-2">6阶增益：' + returnString(six,sixVal) + '</span><br/>';
		info += '<span class="span-3">9阶增益：' + returnString(nine,nineVal) + '</span><br/>';
		info += '<span class="span-3">12阶增益：' + returnString(twelve,twelveVal) + '</span><br/><br/>';
	}else if(parseInt(jinJieDengJi) > 3){
		info += '<span class="span-2">1阶增益：' + returnString(one,oneVal) + '</span><br/>';
		info += '<span class="span-2">2阶增益：' + returnString(two,twoVal) + '</span><br/>';
		info += '<span class="span-2">4阶增益：' + returnString(four,fourVal) + '</span><br/>';
		info += '<span class="span-3">6阶增益：' + returnString(six,sixVal) + '</span><br/>';
		info += '<span class="span-3">9阶增益：' + returnString(nine,nineVal) + '</span><br/>';
		info += '<span class="span-3">12阶增益：' + returnString(twelve,twelveVal) + '</span><br/><br/>';
	}else if(parseInt(jinJieDengJi) > 1){
		info += '<span class="span-2">1阶增益：' + returnString(one,oneVal) + '</span><br/>';
		info += '<span class="span-2">2阶增益：' + returnString(two,twoVal) + '</span><br/>';
		info += '<span class="span-3">4阶增益：' + returnString(four,fourVal) + '</span><br/>';
		info += '<span class="span-3">6阶增益：' + returnString(six,sixVal) + '</span><br/>';
		info += '<span class="span-3">9阶增益：' + returnString(nine,nineVal) + '</span><br/>';
		info += '<span class="span-3">12阶增益：' + returnString(twelve,twelveVal) + '</span><br/><br/>';
	}else if(parseInt(jinJieDengJi) > 0){
		info += '<span class="span-2">1阶增益：' + returnString(one,oneVal) + '</span><br/>';
		info += '<span class="span-3">2阶增益：' + returnString(two,twoVal) + '</span><br/>';
		info += '<span class="span-3">4阶增益：' + returnString(four,fourVal) + '</span><br/>';
		info += '<span class="span-3">6阶增益：' + returnString(six,sixVal) + '</span><br/>';
		info += '<span class="span-3">9阶增益：' + returnString(nine,nineVal) + '</span><br/>';
		info += '<span class="span-3">12阶增益：' + returnString(twelve,twelveVal) + '</span><br/><br/>';
	}else{
		info += '<span class="span-3">1阶增益：' + returnString(one,oneVal) + '</span><br/>';
		info += '<span class="span-3">2阶增益：' + returnString(two,twoVal) + '</span><br/>';
		info += '<span class="span-3">4阶增益：' + returnString(four,fourVal) + '</span><br/>';
		info += '<span class="span-3">6阶增益：' + returnString(six,sixVal) + '</span><br/>';
		info += '<span class="span-3">9阶增益：' + returnString(nine,nineVal) + '</span><br/>';
		info += '<span class="span-3">12阶增益：' + returnString(twelve,twelveVal) + '</span><br/><br/>';
	}
	parentObj.append(info);
	var cardArray = $j('.personageCard');
	var string = '';
	for(var i = 0 ; i < combinations.length ; i ++){
		if(combinations[i].name == name){
			string+=combinations[i].combinationName + '<br/>';
			var jiHuoFlag = false;
			if(cardArray && cardArray.length > 1){
				for(var g = 0 ; g < cardArray.length ; g++){
					var flag = false;
					if(g == cardArray.length -1){
						for(var k = 0 ; k < cardArray.length ; k++){
							if(allUser.indexOf($j(cardArray[k]).attr('userName')) > -1){
					        	for(var x = 0 ; x < combinations.length ; x ++){
					        		if(combinations[x].name == $j(cardArray[k]).attr('userName')){
					        			var tiaoJian = combinations[x].tiaoJian.split('、');
						        		if(tiaoJian.length > 0){
						        			for(var j = 0 ; j < tiaoJian.length ; j ++){
						        				if(allUser.indexOf(tiaoJian[j]) > -1 && tiaoJian[0] == name){
								        			flag = true;
								        		}else{
								        			flag = false;
								        			break;
								        		}
						        			}
						        			if(flag && combinations[i].combinationName == combinations[x].combinationName){
						        				string+='达成条件：' + combinations[x].tiaoJian + '同时上阵<br/>';
						        				string+='<span class="span-2">激活属性：' + returnString(combinations[x].activateProperty,combinations[x].activatePropertyVal) + '</span><br/><br/>';
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
			if(!jiHuoFlag){
				string+='达成条件：' + combinations[i].tiaoJian + '同时上阵<br/>';
	      		string+='<span class="span-3">激活属性：' + returnString(combinations[i].activateProperty,combinations[i].activatePropertyVal) + '</span><br/><br/>';
	      		parentObj.append(string);
	      		string = '';
			}
		}
	}
}

//
function returnString(str,val){
	var returnString = '';
	if(!isNull(str)){
		if(str == '气血'){
			returnString = '气血&nbsp;+' + val;
		}
		if(str == '真气'){
			returnString = '真气&nbsp;+' + val;
		}
		if(str == '元力'){
			returnString = '元力&nbsp;+' + val;
		}
		if(str == '攻击'){
			returnString = '攻击&nbsp;+' + val;
		}
		if(str == '防御'){
			returnString = '防御&nbsp;+' + val;
		}
		if(str == '普通命中'){
			returnString = '命中&nbsp;+' + val;
		}
		if(str == '普通躲闪'){
			returnString = '躲闪&nbsp;+' + val;
		}
		if(str == '致命伤害'){
			returnString = '暴击伤害&nbsp;+' + val + '%';
		}
		if(str == '致命一击率'){
			returnString = '暴击率&nbsp;+' + val + '%';
		}
		if(str == '技能命中'){
			returnString = '增加技能命中&nbsp;' + val;
		}
		if(str == '技能躲闪'){
			returnString = '增加技能躲闪&nbsp;' + val;
		}
		if(str == '减免致命率'){
			returnString = '被致命一击的概率减少&nbsp;' + val + '%';
		}
		if(str == '减免致命伤害'){
			returnString = '受到致命一击伤害减少&nbsp;' + val + '%';
		}
		if(str == '御仙'){
			returnString = '御仙&nbsp;+' + val + '%';
		}
		if(str == '御魔'){
			returnString = '御魔&nbsp;+' + val + '%';
		}
		if(str == '御佛'){
			returnString = '御佛&nbsp;+' + val + '%';
		}
		if(str == '眩晕'){
			returnString = '眩晕抗性&nbsp;+' + val;
		}
		if(str == '魅惑'){
			returnString = '魅惑抗性&nbsp;+' + val;
		}
		if(str == '虚弱'){
			returnString = '虚弱抗性&nbsp;+' + val;
		}
		if(str == '昏睡'){
			returnString = '昏睡抗性&nbsp;+' + val;
		}
		if(str == '定身'){
			returnString = '定身抗性&nbsp;+' + val;
		}
		if(str == '减免伤害'){
			returnString = '减免伤害&nbsp;+' + val + '%';
		}
		if(str == '无视减免'){
			returnString = '无视人物伤害减免百分比&nbsp;+' + val + '%';
		}
		if(str == '对仙阵营伤害增加'){
			returnString = '对仙阵营伤害增加百分比&nbsp;+' + val + '%';
		}
		if(str == '对魔阵营伤害增加'){
			returnString = '对魔阵营伤害增加百分比&nbsp;+' + val + '%';
		}
		if(str == '对佛阵营伤害增加'){
			returnString = '对佛阵营伤害增加百分比&nbsp;+' + val + '%';
		}
		if(str == '附加伤害'){
			returnString = '附加伤害&nbsp;+' + val;
		}
		if(str == '减免普通伤害'){
			returnString = '减免伤害&nbsp;+' + val;
		}
		if(str == '获得修为'){
			returnString = '获得修为&nbsp;+' + val + '%';
		}
	}
	return returnString;
}
//使用
function useIt(){
	var obj = $j('.zhenling-1-3-1-t');
	if(obj.length == 0){
		alert('请选择需要使用的阵灵！');
		return;
	}
	var clickType = $j('#hideValue').attr('clickType');
	var userName = $j('#hideValue').attr('userName');
	if(!isNull(clickType) && !isNull(userName) && clickType == '1'){
		if(allUser.length > 0){
			for(var i = 0 ; i < allUser.length ; i++){
				if(userName == allUser[i].name){
					allUser.splice(i, 1);
				}
			}
		}
	}
	var name = $j(obj).attr('name');
	var flag = true;
	if($j(obj).attr('type') != '法宝'){
		if(allUser.length > 0){
			for(var i = 0 ; i < allUser.length ; i ++){
				if(allUser[i].name == name){
					flag = false;
				}
			}
		}
	}
	if(!flag){
		alert('该角色已在阵法上');
		return;
	}
	var userType = $j(obj).attr('type');
	var xiuZhenDengJi = 1;
	if(isNull($j('#xiuZhenDengJiInput').val()) || parseInt(($j('#xiuZhenDengJiInput').val())) < 1){
		xiuZhenDengJi = 1;
	}else if(parseInt(($j('#xiuZhenDengJiInput').val())) > 60){
		xiuZhenDengJi = 60;
	}else{
		xiuZhenDengJi = $j('#xiuZhenDengJiInput').val();
	}
	var jinJieDengJi = $j('#useJinJieDengJi option:selected').text();
	var user = {};
	user.name = name;
	user.xiuZhenDengJi = xiuZhenDengJi;
	user.jinJieDengJi = jinJieDengJi;
	allUser.push(user);
	/*var tiPoQiXue = $j(obj).attr('tiPoQiXue');
	var xiuZhenZhenQi = $j(obj).attr('xiuZhenZhenQi');
	var yuBaoGongJi = $j(obj).attr('yuBaoGongJi');*/
	var tiPo = $j(obj).attr('tiPo');
	var xiuZhen = $j(obj).attr('xiuZhen');
	var yuBao = $j(obj).attr('yuBao');
	var yaoLing = $j(obj).attr('yaoLing');
	var cuiLing = $j(obj).attr('cuiLing');
	var one = $j(obj).attr('one');
	var two = $j(obj).attr('two');
	var four = $j(obj).attr('four');
	var six = $j(obj).attr('six');
	var nine = $j(obj).attr('nine');
	var twelve = $j(obj).attr('twelve');
	$j('.mouseclickCss').empty();
	$j('.mouseclickCss').attr({'one':one,'two':two,'four':four,'six':six,'nine':nine,'twelve':twelve
		,'tiPo':tiPo,'xiuZhen':xiuZhen,'yuBao':yuBao,'yaoLing':yaoLing ,'cuiLing':cuiLing
		,'userName':name,'userType':userType,'xiuZhenDengJi':xiuZhenDengJi,'jinJieDengJi':jinJieDengJi,'oneVal':$j(obj).attr('oneVal')
		,'twoVal':$j(obj).attr('twoVal'),'fourVal':$j(obj).attr('fourVal')
		,'sixVal':$j(obj).attr('sixVal'),'nineVal':$j(obj).attr('nineVal')
		,'twelveVal':$j(obj).attr('twelveVal')});
	$j('.mouseclickCss').append(new Element('div',{'class':'xiuZhenDengJiCss'}));
	$j('.mouseclickCss').append(new Element('div',{'class':'jinJieDengJiCss'}));
	$j('.mouseclickCss').append(new Element('div',{'class':'clearCss'}).update('<img src="image/delete.png" class="cardDelete"/>'));
	$j('.clearCss').click(function(e){
		var name = $j(this).parent().attr('username');
		$j(this).parent().css('background-color','white');
		$j(this).parent().removeAttr('userName');
		if($j(this).parent().attr('usertype') == '法宝'){
			$j(this).parent().html('<img src="image/add.png" class="addCardImg2"/>');
		}else{
			$j(this).parent().html('<img src="image/add.png" class="addCardImg1"/>');
		}
		if(allUser.length > 0){
			for(var i = 0 ; i < allUser.length ; i++){
				if(name == allUser[i].name){
					allUser.splice(i, 1);
				}
			}
		}
		countAll();
		$j('#offsetCard').empty();
		$j('#offsetCard').hide();
		e.stopPropagation();
	});
	$j('.mouseclickCss').append(displayName(name));
	$j('.mouseclickCss').css('background-color',obj.css('background-color'));
	$j('.mouseclickCss').children(':eq(0)').text(xiuZhenDengJi);
	$j('.mouseclickCss').children(':eq(1)').text(jinJieDengJi);
	$j('.mouseclickCss').removeClass('mouseclickCss');
	closeWindow();
	countAll();
}

//名字显示
function displayName(name){
	var nameString = '';
	if(!isNull(name)){
		var nameStr = name.split('');
		if(nameStr && nameStr.length > 0){
			for(var i = 0 ; i < nameStr.length; i++){
				if(i == 0 && nameStr.length == 5){
					nameString += nameStr[i];
				}else if(i == 0 && nameStr.length == 2){
					nameString += '<br/>' + nameStr[i];
				}else if(i == 0){
					nameString += '<br/>' + nameStr[i];
				}else if(nameStr.length == 2 && i == 1){
					nameString += '<br/><br/>' + nameStr[1];
				}else{
					nameString += '<br/>' + nameStr[i];
				}
			}
		}
	}
	return nameString;
}

//关闭
function closeWindow(){
	$j('.cardChoice').hide();
	$j('.mouseclickCss').removeClass('mouseclickCss');
}

function mouseoverQueryCard(obj){
	if(!isNull($j(obj).attr('userName'))){
		$j('#offsetCard').css({'left':$j(obj).offset().left + 60 + 'px'});
		loadThisInfo(obj,2);
		$j('#offsetCard').show();
	}
}

function mouseoutQueryCard(obj){
	$j('#offsetCard').empty();
	$j('#offsetCard').hide();
}

/**
 * 添加比较
 */
function addCompare(){
	if(allUser && allUser.length > 0){
		var parent = new Element('div',{'class':'zhenfa-compare-1'}),
			child = new Element('div',{'class':'zhenfa-compare-1-1'})
				.update('<div class="zhenfa-compare-1-1-1">比较</div><div class="zhenfa-compare-1-1-2"><img src="image/delete.png" class="compareDelete"></div>'),
			string = '';
		$j('#compareDiv').append(parent);
		parent.appendChild(child);
		$j('.zhenfa-compare-1-1-2').click(function(){
			$j(this).parent().parent().remove();
		});
		child = new Element('div',{'class':'zhenfa-compare-1-2'});
		parent.appendChild(child);
		for(var i = 0 ; i < allUser.length ; i ++){
			if(allUser[i].name != '天琊' && allUser[i].name != '噬魂' && allUser[i].name != '伤心花' && allUser[i].name != '玄火鉴' && allUser[i].name != '嗜血珠'
				 && allUser[i].name != '摄魂' && allUser[i].name != '九龙神火罩' && allUser[i].name != '乾坤青光戒' && allUser[i].name != '如意乾坤袋' && allUser[i].name != '五龙轮'
					 && allUser[i].name != '蟠龙幡' && allUser[i].name != '八卦石' && allUser[i].name != '神木骰' && allUser[i].name != '山河扇' && allUser[i].name != '玉净瓶'){
				var children = new Element('div',{'class':'zhenfa-compare-1-2-1'}).update(allUser[i].name + '/' + allUser[i].xiuZhenDengJi + '/' + allUser[i].jinJieDengJi);
				child.appendChild(children);
			}
		}
		child = new Element('div',{'class':'zhenfa-compare-1-3'});
		parent.appendChild(child);
		string += (qiXue != 0)?'气血&nbsp;+' + parseInt(qiXue) + '<br/>':'';
		string += (zhenQi != 0)?'真气&nbsp;+' + parseInt(zhenQi) + '<br/>':'';
		string += (yuanLi != 0)?'元力&nbsp;+' + parseInt(yuanLi) + '<br/>':'';
		string += (gongJi != 0)?'攻击&nbsp;+' + parseInt(gongJi) + '<br/>':'';
		string += (fangYu != 0)?'防御&nbsp;+' + fangYu + '<br/>':'';
		string += (puTongMingZhong != 0)?'命中&nbsp;+' + puTongMingZhong + '<br/>':'';
		string += (puTongDuoShan != 0)?'躲闪&nbsp;+' + puTongDuoShan + '<br/>':'';
		string += (zhiMingShangHai != 0)?'暴击伤害&nbsp;+' + zhiMingShangHai.toFixed(2) + '%<br/>':'';
		string += (zhiMingYiJiLv != 0)?'暴击率&nbsp;+' + zhiMingYiJiLv.toFixed(2) + '%<br/>':'';
		string += (jiNengMingZhong != 0)?'增加技能命中&nbsp;' + jiNengMingZhong.toFixed(2) + '<br/>':'';
		string += (jiNengDuoShan != 0)?'增加技能躲闪&nbsp;' + jiNengDuoShan.toFixed(2) + '<br/>':'';
		string += (jianMianZhiMingLv != 0)?'被致命一击的概率减少&nbsp;' + jianMianZhiMingLv.toFixed(2) + '%<br/>':'';
		string += (jianMianZhiMingShangHai != 0)?'受到致命一击伤害减少&nbsp;' + jianMianZhiMingShangHai.toFixed(2) + '%<br/>':'';
		string += (yuXian != 0)?'御仙&nbsp;+' + yuXian.toFixed(2) + '%<br/>':'';
		string += (yuMo != 0)?'御魔&nbsp;+' + yuMo.toFixed(2) + '%<br/>':'';
		string += (yuFo != 0)?'御佛&nbsp;+' + yuFo.toFixed(2) + '%<br/>':'';
		string += (xuanYun != 0)?'眩晕抗性&nbsp;+' + xuanYun + '<br/>':'';
		string += (meiHuo != 0)?'魅惑抗性&nbsp;+' + meiHuo + '<br/>':'';
		string += (xuRuo != 0)?'虚弱抗性&nbsp;+' + xuRuo + '<br/>':'';
		string += (hunShui != 0)?'昏睡抗性&nbsp;+' + hunShui + '<br/>':'';
		string += (dingShen != 0)?'定身抗性&nbsp;+' + dingShen + '<br/>':'';
		string += (jianMianShangHai != 0)?'减免伤害&nbsp;+' + jianMianShangHai.toFixed(2) + '%<br/>':'';
		string += (wuShiJianMian != 0)?'无视人物伤害减免百分比&nbsp;+' + wuShiJianMian.toFixed(2) + '%<br/>':'';
		string += (forXian != 0)?'对仙阵营伤害增加百分比&nbsp;+' + forXian.toFixed(2) + '%<br/>':'';
		string += (forMo != 0)?'对魔阵营伤害增加百分比&nbsp;+' + forMo.toFixed(2) + '%<br/>':'';
		string += (forFo != 0)?'对佛阵营伤害增加百分比&nbsp;+' + forFo.toFixed(2) + '%<br/>':'';
		string += (fuJiaPuTongShangHai != 0)?'附加伤害&nbsp;+' + fuJiaPuTongShangHai + '<br/>':'';
		string += (jianMianPuTongShangHai != 0)?'减免伤害&nbsp;+' + jianMianPuTongShangHai + '<br/>':'';
		string += (xiuWeiZenJia != 0)?'获得修为&nbsp;+' + xiuWeiZenJia + '%<br/>':'';
		$j(child).append(string);
	}
	compare.push({
		'qiXue' : qiXue,
		'zhenQi' : zhenQi,
		'yuanLi' : yuanLi,
		'gongJi' : gongJi,
		'fangYu' : fangYu,
		'puTongMingZhong' : puTongMingZhong,
		'puTongDuoShan' : puTongDuoShan,
		'zhiMingShangHai' : zhiMingShangHai,
		'zhiMingYiJiLv' : zhiMingYiJiLv,
		'jiNengMingZhong' : jiNengMingZhong,
		'jiNengDuoShan' : jiNengDuoShan,
		'jianMianZhiMingLv' : jianMianZhiMingLv,
		'jianMianZhiMingShangHai' : jianMianZhiMingShangHai,
		'yuXian' : yuXian,
		'yuMo' : yuMo,
		'yuFo' : yuFo,
		'xuanYun' : xuanYun,
		'meiHuo' : meiHuo,
		'xuRuo' : xuRuo,
		'hunShui' : hunShui,
		'dingShen' : dingShen,
		'jianMianShangHai' : jianMianShangHai,
		'wuShiJianMian' : wuShiJianMian,
		'forXian' : forXian,
		'forMo' : forMo,
		'forFo' : forFo,
		'yaoLing' : yaoLing,
		'cuiLing' : cuiLing,
		'fuJiaPuTongShangHai' : fuJiaPuTongShangHai,
		'jianMianPuTongShangHai' : jianMianPuTongShangHai,
		'xiuWeiZenJia' : xiuWeiZenJia});
}