/**
 * Created by Eggy on 2016/3/19.
 */
(function () {
    var CPC = function () {

    };

    CPC.prototype = {
        init: function () {
            this.loadData();
        },
        create: function () {
            var container = $('<div></div>');
            $('body').append(container);
        },
        showOrHide: function () {
            if ($('.cpc').is(":hidden")) {
                if (allUser && allUser.length > 1) {
                    $('.cpc').show();
                    this.init();
                } else {
                    alert('请先选择您的阵灵组合！')
                }
            } else {
                $('.cpc').hide();
            }

        },
        close: function () {

        },
        loadData: function (comp) {
            var _this = this;
            var comps = comp || [$('#firstSet').val(), $('#twoSet').val()];
            if (allUser && allUser.length > 0) {
                $('tbody').empty();
                var allUsers = allUser.sort(_this.compare(comps));
                for (var i = 0; i < allUsers.length; i++) {
                    var user = allUsers[i];
                    var fbFlag = user.type == '法宝';
                    var cuiLingCount = ldd.arithmetic.cuiLingCount(user.xiuZhenDengJi, user.cuiLing);
                    var zhenLing = '<tr id="' + user.id + '" xiuZhenDengji="' + user.xiuZhenDengJi + '">' +
                        '<td>' + user.name + '</td><td>' + user.xiuZhenDengJi + '</td>' +
                        '<td>' + parseInt(ldd.arithmetic.qiXueCount(user.tiPo, fbFlag) * parseInt(user.xiuZhenDengJi)) + '</td>' +
                        '<td>' + parseInt(ldd.arithmetic.zhenQiCount(user.xiuZhen, fbFlag) * parseInt(user.xiuZhenDengJi)) + '</td>' +
                        '<td>' + parseInt(ldd.arithmetic.yuBaoCount(user.yuBao, fbFlag) * parseInt(user.xiuZhenDengJi)) + '</td>';
                    if (60 == parseInt(user.xiuZhenDengJi)) {
                        zhenLing += '<td>已满级</td>' +
                            '<td>已满级</td>' +
                            '<td>已满级</td>' +
                            '<td>已满级</td>' +
                            '<td>已满级</td>' +
                            '<td>已满级</td>' +
                            '<td>已满级</td>' +
                            '<td>已满级</td></tr>';
                    } else {
                        zhenLing += '<td>' + parseInt(cuiLingCount) + '</td>' +
                            '<td>' + ldd.arithmetic.qiXueCount(user.tiPo, fbFlag).toFixed(2) + '</td>' +
                            '<td>' + ldd.arithmetic.zhenQiCount(user.xiuZhen, fbFlag).toFixed(2) + '</td>' +
                            '<td>' + ldd.arithmetic.yuBaoCount(user.yuBao, fbFlag).toFixed(2) + '</td>' +
                            '<td>' + (ldd.arithmetic.qiXueCount(user.tiPo, fbFlag) / cuiLingCount).toFixed(4) + '</td>' +
                            '<td>' + (ldd.arithmetic.zhenQiCount(user.xiuZhen, fbFlag) / cuiLingCount).toFixed(4) + '</td>' +
                            '<td>' + (ldd.arithmetic.yuBaoCount(user.yuBao, fbFlag) / cuiLingCount).toFixed(4) + '</td>' +
                            '<td><span>+</span>&nbsp;<span>-</span></td></tr>';
                    }
                    $('tbody').append($(zhenLing));
                    $('tbody').find('span').click(function () {
                        var id = $(this).parents('tr').attr('id');
                        var xiuZhenDengJi = $(this).parents('tr').attr('xiuZhenDengJi');
                        if ('+' == $(this).text()) {
                            if (xiuZhenDengJi < 60) {
                                var user = {
                                    id: id,
                                    xiuZhenDengJi: parseInt(xiuZhenDengJi) + 1
                                };
                                changeAllUser(user);
                                countAll();
                                _this.loadData();
                            }
                        } else if ('-' == $(this).text()) {
                            if (xiuZhenDengJi > 1) {
                                var user = {
                                    id: id,
                                    xiuZhenDengJi: parseInt(xiuZhenDengJi) - 1
                                };
                                changeAllUser(user);
                                countAll();
                                _this.loadData();
                            }
                        }
                    });
                }
            }
        },
        compare: function (type) {
            return function (obj1, obj2) {
                if (60 == parseInt(obj1.xiuZhenDengJi) && 60 == parseInt(obj2.xiuZhenDengJi)) {
                    return 0;
                } else if (60 == parseInt(obj1.xiuZhenDengJi)) {
                    return 1;
                } else if (60 == parseInt(obj2.xiuZhenDengJi)) {
                    return -1;
                }
                var val1 = [0], val2 = [0];
                var fbFlag1 = obj1.type == '法宝';
                var fbFlag2 = obj2.type == '法宝';
                var cuiLingCount1 = ldd.arithmetic.cuiLingCount(obj1.xiuZhenDengJi, obj1.cuiLing);
                var cuiLingCount2 = ldd.arithmetic.cuiLingCount(obj2.xiuZhenDengJi, obj2.cuiLing);
                for (var i = 0; i < type.length; i++) {
                    if ('气血' == type[i]) {
                        val1[i] = parseFloat((ldd.arithmetic.qiXueCount(obj1.tiPo, fbFlag1) / cuiLingCount1).toFixed(4)) || 0;
                        val2[i] = parseFloat((ldd.arithmetic.qiXueCount(obj2.tiPo, fbFlag2) / cuiLingCount2).toFixed(4)) || 0;
                    } else if ('真气' == type[i]) {
                        val1[i] = parseFloat((ldd.arithmetic.zhenQiCount(obj1.xiuZhen, fbFlag1) / cuiLingCount1).toFixed(4)) || 0;
                        val2[i] = parseFloat((ldd.arithmetic.zhenQiCount(obj2.xiuZhen, fbFlag2) / cuiLingCount2).toFixed(4)) || 0;
                    } else {
                        val1[i] = parseFloat((ldd.arithmetic.yuBaoCount(obj1.yuBao, fbFlag1) / cuiLingCount1).toFixed(4)) || 0;
                        val2[i] = parseFloat((ldd.arithmetic.yuBaoCount(obj2.yuBao, fbFlag2) / cuiLingCount2).toFixed(4)) || 0;
                    }
                }
                if (val1[0] < val2[0]) {
                    return 1;
                } else if (val1[0] > val2[0]) {
                    return -1;
                } else {
                    if (val1[1] < val2[1]) {
                        return 1;
                    } else if (val1[1] > val2[1]) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }
        },
        firstSelect: function (obj) {
            var val1 = $(obj).val(), val2;
            if ('气血' == val1) {
                val2 = '真气';
                $('#twoSet').empty().append('<option value="真气">真气</option><option value="攻击">攻击</option>');
            } else if ('真气' == val1) {
                val2 = '气血';
                $('#twoSet').empty().append('<option value="气血">气血</option><option value="攻击">攻击</option>');
            } else {
                val2 = '气血';
                $('#twoSet').empty().append('<option value="气血">气血</option><option value="真气">真气</option>');
            }
            $('#twoSet').val(val2);
            this.loadData([val1, val2]);
        },
        twoSelect: function () {
            var val1 = $('#firstSet').val();
            var val2 = $('#twoSet').val();
            this.loadData([val1, val2]);
        },
        countByCangLang: function (type) {
            var _this = this;
            var cangLangZhu = $('#canglangNow').val();
            if (cangLangZhu) {
                cangLangZhu = parseInt(cangLangZhu);
                if (type) {
                    cangLangZhu += parseInt(cuiLing);
                    if(allUser && allUser.length > 0){
                        for (var i = 0;i < allUser.length; i ++){
                            allUser[i].xiuZhenDengJi = 1;
                        }
                    }
                }
                fu();
                function fu() {
                    if (allUser && allUser.length > 0) {
                        var comps = [$('#firstSet').val(), $('#twoSet').val()];
                        var allUsers = allUser.sort(_this.compare(comps));
                        for (var i = 0; i < allUsers.length; i++) {
                            var xiaohao = ldd.arithmetic.cuiLingCount(parseInt(allUsers[0].xiuZhenDengJi), parseInt(allUsers[0].cuiLing));
                            if (xiaohao > cangLangZhu) {
                                _this.loadData();
                                return;
                            } else {
                                if (parseInt(allUsers[0].xiuZhenDengJi) < 60) {
                                    var user = {
                                        id: allUsers[0].id,
                                        xiuZhenDengJi: parseInt(allUsers[0].xiuZhenDengJi) + 1
                                    };
                                    changeAllUser(user);
                                    countAll();
                                    cangLangZhu -= xiaohao;
                                    fu();
                                }
                            }
                        }
                    }
                }
            } else {
                alert('请输入沧浪珠数！');
            }

        }
    };

    window.cpc = new CPC();
})();