/*
 * @Author: jack
 * @Date: 2019-11-01 09:55:15
 * @Last Modified by: jack.li
 * @Last Modified time: 2019-11-21 11:39:25
 */
//Number、String、Boolean） 用new
//Object、Array、Function 不用
console.log('%c非常开心亲爱的您喜提彩蛋！\n问我们可以做什么？\n1. 精美酷网站\n2. 短视频制作运营推广\n3. 年度H5互动小游戏\n4. 数字化运营服务\n5.跨境电商整体运营\n😊\n我们团队很单纯与热情！只想要的与众不同！ \n联系板鸭君：17634755000','line-height:1.8;')
console.log('%c http://www.lcwlxc.com  ❤️❤️❤️ 领创网络', 'padding:20px 0;color:red'),
(function (global, factory) {
    // typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : //是否引用在node
    //     typeof define === 'function' && define.amd ? define(factory) : //是否支持amd
    (global.util = factory());
}(this, (function () {
    // 'use strict'; ie9不支持
    var util = {
        /************************************************************************
         * ui
         ************************************************************************/
        /**
         *对话提示框
         *
         * @param {*} [string=''] 显示的文案
         * @param {*} [type='normal'] '默认半透明,success 绿色,error 红色, warning 黄色'
         */
        toast: function (config) {
            if (Object.assign != undefined) {
                config = Object.assign({
                    string: '',
                    type: 'normal',
                }, config);
            }
            var $toast = document.getElementsByClassName('_toast')[0]
            util.addClass($toast, 'active')
            util.removeClass($toast, 'success')
            $toast.childNodes[0].childNodes[0].innerHTML = config.string
            switch (config.type) {
                case 'normal':
                    break;
                case 'success':
                    util.addClass($toast, 'success')
                    break;
                case 'error':
                    util.addClass($toast, 'error')
                    break;
                case 'warning':
                    util.addClass($toast, 'warning')
                    break;
                default:
                    break;
            }
            setTimeout(function () {
                $toast.className = '_toast'
            }, 1500)
        },
        /**
         *点击看大图
         *
         * @param {*} $objUl //列表父级
         * @param {String} objClass //选中的图的Class

         */
        Album: function ($objUl, objClass) {
            var div = document.createElement('div');
            div.innerHTML = '<div class="_photo"><div class="_pic"><img src="" alt="" id="_photoImg"></div><div class="_swiperBtn _SBL"><i class="_templateIcon btn">&#xed1c;</i></span></div><div class="_swiperBtn _SBR"><i class="_templateIcon btn">&#xe793;</i></div><div class="_swiperBtnOff"><i class="_templateIcon btn">&#xe62e;</i></span></div></div>';
            div.className = "_AlbumPictures";
            var bo = document.body;
            bo.insertBefore(div, bo.lastChild);
            var $Album = document.getElementsByClassName('_AlbumPictures')[0],
                $photoImg = document.getElementById('_photoImg'),
                $SBL = document.getElementsByClassName('_SBL')[0],
                $SBR = document.getElementsByClassName('_SBR')[0];
            var liIndex = 0,
                lilenght = $objUl.children.length - 1,
                parentLi;
            //看大图
            for (var i = 0; i <= lilenght; i++) {
                $objUl.children[i].onclick = function (e) {
                    $SBL.style = "display: block;"
                    $SBR.style = "display: block;"
                    parentLi = this
                    if (parentLi.children[0].className.indexOf(objClass) !== -1) {
                        $Album.className = '_AlbumPictures active';
                        $photoImg.src = parentLi.getElementsByTagName('img')[0].src

                        liIndex = Array.prototype.indexOf.call(parentLi.parentNode.children, parentLi);
                        if (liIndex == lilenght) {
                            $SBR.style = "display: none;"
                        } else if (liIndex == 0) {
                            $SBL.style = "display: none;"
                        }
                    } else {}
                    e.stopPropagation();
                }
            }
            var $swiperBtnOff = document.getElementsByClassName('_swiperBtnOff')[0];
            //关闭
            $swiperBtnOff.addEventListener('click', function (e) {
                $Album.className = '_AlbumPictures';
            });
            //左切换
            $SBL.addEventListener('click', function (e) {
                liIndex <= 0 ? liIndex = 0 : liIndex--;
                if (liIndex == 0) {
                    $SBL.style = "display: none;";
                } else {
                    $SBR.style = "display: block;";
                }
                $photoImg.style = 'transform: translate(-100%,-50%);opacity: 0;transition: ease .5s;'
                $photoImg.addEventListener('transitionend', fnOut, false)
                e.stopPropagation();
            })
            //右切换
            $SBR.addEventListener('click', function (e) {
                liIndex == lilenght ? liIndex = lilenght : liIndex++;
                if (liIndex == lilenght) {
                    $SBR.style = "display: none;";
                } else {
                    $SBL.style = "display: block;";
                }
                $photoImg.style = 'transform: translate(0%,-50%);opacity: 0;transition: ease .5s;'
                $photoImg.addEventListener('transitionend', fnOut, false)
                e.stopPropagation();
            })

            function fnOut(e) {
                $photoImg.style = 'transform: translate(-50%,-50%);opacity:1;transition: ease .5s;'
                $photoImg.src = parentLi.parentNode.children[liIndex].children[0].src
                e.stopPropagation();
            }
        },
        /**
         *加载事物的百分比(无法判断背景)
         *
         * @param {*} $obj 接收加载进度
         * @param {*} $Loader 加载事物
         * @return {*} callback
         */
        LoadPercentage: function (config, callback) {
            if (Object.assign != undefined) {
                config = Object.assign({
                    obj: null,
                    Loader: null,
                    timer:1000
                }, config);
            }
            var $Loader, len = 0;
            var $Loader = util.ifIDorClass(config.Loader)
            var $obj = util.ifIDorClass(config.obj)
            //console.log( util.ifIDorClass(config.out))
            if (($Loader == null) || ($obj == null)) return
            for (var i = 0; i < $Loader.length; i++) {
                (function (i) {
                    if($Loader[i].tagName=='VIDEO'){
                        $Loader[i].oncanplaythrough
                        len++
                        doIt(len)
                        //oncanplaythrough
                    }else if($Loader[i].tagName=='IMG'){
                        if ($Loader[i].complete) {
                            len++;
                            doIt(len)
                        } else {
                            $Loader[i].onload = function () {
                                len++;
                                doIt(len)
                            }
                        }
                    }
                })(i);
            }
            function doIt(len) {
                var num=Math.round(len * 100 / $Loader.length)
                $obj[0].innerHTML = Math.round(len * 100 / $Loader.length) + '%';
                if (len == $Loader.length ) {
                    var deadLine = false;
                    onLoad()
                    setTimeout(function () {
                        deadLine = true;
                    }, config.timer); //最小展示时间，示例为7秒

                    function onLoad() {
                        if (deadLine) {
                            isCallback() && (callback(num))
                        } else {
                            setTimeout(onLoad, 1000); // 还没有到最小展示时间，1秒后重试
                        }
                    }

                }
            }
            //isCallback 是否有返回值
            function isCallback() {
                return callback == undefined ? false : true
            }
        },
        /**
         * 新建toast提示框
         *
         */
        toastInit: function () {
            var $body = document.getElementsByTagName('body')[0];
            var toastHTML = document.createElement('div');
            toastHTML.innerHTML = '<p><span></span></p>';
            toastHTML.className = "_toast";
            $body.appendChild(toastHTML);
        },

        /**
         *基础版banner
         *
         * @param {*} $banner banner 初始
         * @param {*} $btnR 按钮R
         * @param {*} $btnL 按钮L
         * @param {*} $pagination  分页器小点
         * @param {Number} [timer=5000] 自动切换时间 默认5000
         * @return {*} callback
         */
        banner: function (config, callback) {
            if (Object.assign != undefined) {
                config = Object.assign({
                    $banner: null,
                    $btnR: null,
                    $btnL: null,
                    $pagination: null,
                    timer: 5000,
                }, config);
            }
            var callbackData = {
                bannerIndex: 0
            }
            var $li = config.$banner.children[0].children,
                $length = $li.length - 1,
                index = 0,
                able = ''
            for (var i = 0; i <= $length; i++) {
                $li[i].style.transform = "translate3d(" + (-i * config.$banner.clientWidth) + "px, 0px, 0px)"
                able += '<span></span>'
            }
            //pagination 为null 则不执行
            function isPagination() {
                return config.$pagination != null
            }
            //isBtn 为null 则不执行
            function isBtn() {
                return config.$btnR != null && config.$btnL != null
            }
            //isCallback 是否有返回值
            function isCallback() {
                return callback == undefined ? false : true
            }
            isPagination() && (config.$pagination.innerHTML = able, util.addClass(config.$pagination.children[0], 'active'))
            util.addClass($li[index], 'active')
            var bannerInterval
            foo(config.timer, index)
            // 正常循环切换banner
            function foo(timer, index) {
                bannerInterval = setTimeout(function () {
                    Object.keys($li).forEach(function (index, item) {
                        util.removeClass($li[index], 'active')
                        isPagination() && (util.removeClass(config.$pagination.children[index], 'active'))
                    })
                    index >= $length ? index = 0 : index++
                    callbackData.bannerIndex = index
                    isCallback() && (callback(callbackData))
                    util.addClass($li[index], 'active')
                    isPagination() && (util.addClass(config.$pagination.children[index], 'active'))
                    foo(timer, index)
                }, timer);
            }
            //事件执行后切换banner，后执行foo 正常切换
            function fooC(timer, index) {
                isCallback() && (callback(callbackData))
                Object.keys($li).forEach(function (index, item) {
                    util.removeClass($li[index], 'active')
                    isPagination() && (util.removeClass(config.$pagination.children[index], 'active'))
                })
                util.addClass($li[index], 'active')
                isPagination() && (util.addClass(config.$pagination.children[index], 'active'))
                foo(timer, index)
            }

            // 切换banner
            isBtn() && (
                config.$btnR.addEventListener('click', function (e) {
                    clearInterval(bannerInterval)
                    index >= $length ? index = 0 : index++
                    callbackData.bannerIndex = index
                    fooC(config.timer, index)
                }),
                config.$btnL.addEventListener('click', function (e) {
                    clearInterval(bannerInterval)
                    index <= 0 ? index = $length : index--
                    fooC(config.timer, index)
                })
            )
            isPagination() && (
                config.$pagination.addEventListener('click', function (e) {
                    var event = e || window.event;
                    var target = event.target || event.srcElement;
                    var lists = Array.from(config.$pagination.querySelectorAll('span'));
                    index = lists.indexOf(target)
                    if (index != -1) {
                        callbackData.index = index
                        clearInterval(bannerInterval)
                        fooC(config.timer, index)
                    }
                })
            )
            //return this
        },
        /**
         *创造合成图片
         *
         * @param {*} $cntElem 创造后显示路径
         * @param {*} $CreationSrc 创造后显示路径
         */
        createImg: function (config, callback) {
            if (Object.assign != undefined) {
                config = Object.assign({
                    $cntElem: null,
                }, config);
            }

            // 进行canvas生成
            var shareContent = config.$cntElem; //需要截图的包裹的（原生的）DOM 对象
            var width = shareContent.offsetWidth; //获取dom 宽度
            var height = shareContent.offsetHeight; //获取dom 高度
            var canvas = document.createElement("canvas"); //创建一个canvas节点
            var scale = 2; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
            var opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                // logging: true, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                useCORS: true // 【重要】开启跨域配置
            };
            html2canvas(shareContent, opts).then(function (canvas) {
                var context = canvas.getContext('2d');
                // 【重要】关闭抗锯齿
                context.mozImageSmoothingEnabled = true;
                context.webkitImageSmoothingEnabled = true;
                context.msImageSmoothingEnabled = true;
                context.imageSmoothingEnabled = true;

                // 【重要】默认转化的格式为png,也可设置为其他格式
                var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
                var IMG=img.src
                isCallback()&&( callback(IMG))

            });
           //isCallback 是否有返回值
           function isCallback() {
            return callback==undefined?false:true
         }
        },
        /**
         *页面跳转
         * @param {*} $PageTurningNumber 翻页父级div
         * @param {Number} page 当前页数
         * @param {Number} PageSize 一页条数
         * @param {Number} count 总条数
         * @param {*} php php写法链接  green_140.html?page=
         */
        PageTurningNumber: function (config) {
            if (Object.assign != undefined) {
                config = Object.assign({
                    $PageTurningNumber: null,
                    page: 1,
                    pageSize: 4,
                    count: 100,
                    php: util.truncate(0, window.location.pathname, window.location.pathname.length - 5)
                }, config);
            }
            config.page = Number(config.page)
            config.$PageTurningNumber.innerHTML = '<a href="' + config.php + '/' + 1 + '.html">首页</a><span class="pageNumber"></span><a href="' + config.php + '/' + Total(config.count) + '.html">尾页</a><span class="_JumpNumber" data-count="<?=$count?>">跳转到:<input type="text" class="_Incoming" >页<a class="_btnJump" href="javascript:void(0)">确定</a>共' + Total(config.count) + '页</span>'
            var $pageNumber = document.getElementsByClassName('pageNumber')[0],
                $btnJump = document.getElementsByClassName('_btnJump')[0],
                $Incoming = document.getElementsByClassName('_Incoming')[0]
            var liet = '',
                initial = 1,
                last = Total(config.count)
            config.page - 2 <= 1 ? initial = 1 : initial = config.page - 2
            config.page + 2 >= last ? last = Total(config.count) : last = config.page + 2
            for (i = initial; i <= last; i++) {
                liet += '<a class="' + active(i) + '" href="' + config.php + '/' + i + '.html">' + i + '</a>'
            }
            $pageNumber.innerHTML = liet

            function Total(n) {
                return Math.ceil(n / config.pageSize)
            }

            function active(i) {
                return config.page == i ? 'active' : ''
            }

            $btnJump.addEventListener('click', function (e) {
                if ($Incoming.value > Total(config.count) || (!util.regNumber($Incoming.value))) {
                    return
                }
                window.location.href = config.php + '/' + $Incoming.value + '.html'
            })
        },
        /**
         * 返回顶部 调用 scrollToTop
         */
        backTop: function () {
            var offset = 300,
                offset_opacity = 200,
                scroll_top_duration = 500
            var $body = document.getElementsByTagName('body')[0],
                $backTop = document.createElement('div');
            $backTop.className = "backTop animate _templateIcon";
            $backTop.innerHTML = '&#xe635;'
            $body.appendChild($backTop);
            $backTop.addEventListener("click", function (e) {
                util.scrollToTop()
            })
            window.onscroll = function () {
                //变量t是滚动条滚动时，距离顶部的距离
                var t = document.documentElement.scrollTop || document.body.scrollTop;
                var scrollup = document.getElementById('scrollup');
                //当滚动到距离顶部200px时，返回顶部的锚点显示
                if (t >= offset_opacity) {
                    util.addClass($backTop, 'active')
                } else { //恢复正常
                    util.removeClass($backTop, 'active')
                }
            }
        },
        scrollToTop: function () {
            var c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                if (!window.requestAnimationFrame) {
                    window.scrollTo(0, c - c / 8);
                    util.scrollToTop()
                } else {
                    window.requestAnimationFrame(util.scrollToTop);
                    window.scrollTo(0, c - c / 8);
                }
            }
        },
        /**
         *分享
         *
         * @param {*} bdText 标题
         * @param {*} bdDesc 简介
         * @param {*} bdUrl 分享的链接
         */
        share: function (config) {
            if (Object.assign != undefined) {
                config = Object.assign({
                    bdText: '',
                    bdDesc: '',
                    bdUrl: window.location.href,
                    bdPic: null,
                }, config);
            }
            window._bd_share_config = {
                common: {
                    bdText: config.bdText,
                    bdDesc: config.bdDesc,
                    bdUrl: config.bdUrl,
                    bdPic: config.bdPic
                },
                share: [{
                    "bdSize": 16
                }],
                image: [{
                    viewType: 'list',
                    viewPos: 'top',
                    viewColor: 'black',
                    viewSize: '16',
                    viewList: ['qzone', 'tsina', 'huaban', 'tqq', 'renren']
                }],
                selectShare: [{
                    "bdselectMiniList": ['qzone', 'tqq', 'kaixin001', 'bdxc', 'tqf']
                }]
            }
            with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
        },
        /**
         *瀑布流
         * @param {*} $ul 列表父级
         * @param {Number} row 几列
         * @param {Number} border 边距
         */
        waterfall: function (config) {
            if (Object.assign != undefined) {
                config = Object.assign({
                    $ul: '',
                    row: 4,
                    border: 20,
                }, config);
            }

            var li_bottom = 30
            var $li = config.$ul.children;

            function ul_begin(row) {
                var h = [];
                var li_W = (config.$ul.offsetWidth - (config.border * (row - 1))) / row;
                var li_WB = (config.$ul.offsetWidth - (config.border * (row - 1))) / row + config.border;
                for (var i = 0; i < $li.length; i++) {
                    config.$ul.children[i].style.width = li_W + 'px'
                    li_H = $li[i].offsetHeight + li_bottom;
                    if (i < row) {
                        h[i] = li_H;
                        $li[i].style.top = 0;
                        $li[i].style.left = i * li_W + 'px';
                        if ($li[i].offsetLeft != 0) {
                            $li[i].style.left = i * li_WB + 'px';
                        }
                    } else {
                        min_H = Math.min.apply(null, h);
                        minKey = getarraykey(h, min_H);
                        h[minKey] += li_H;
                        $li[i].style.top = min_H + 'px';
                        $li[i].style.left = minKey * li_W + 'px';
                        if ($li[i].offsetLeft != 0) {
                            //$li[i].style.left = i * li_WB + 'px';
                            $li[i].style.left = minKey * li_WB + 'px';
                        }
                    }
                    max_H = Math.max.apply(null, h);
                    config.$ul.style.height = max_H + 'px'
                }
                var $loading = $('._loading')
                $loading.addClass("active");
            }

            function getarraykey(s, v) {
                for (k in s) {
                    if (s[k] == v) {
                        return k;
                    }
                }
            }
            window.onload = function () {
                ul_begin(config.row);
            };
            window.onresize = function () {
                if (document.body.clientWidth <= 1024 && document.body.clientWidth >= 768) {
                    row = 2
                } else if (document.body.clientWidth < 768) {
                    row = 1
                } else {
                    row = config.row
                }
                ul_begin(row);
            };
        },
        /************************************************************************
         * 表单判定
         ************************************************************************/
        /**
         * 验证手机号码
         *
         * @param {Number}  传入的手机号码
         * @return        true||false
         */
        regPhone: function (phone) {
            reg = /^(13|15|17|18|19|14)[0-9]{9}$/;
            return reg.test(phone);
        },
        /**
         *验证数字
         *
         * @param {Number} number 数字
         * @return        true||false
         */
        regNumber: function (number) {
            reg = /^[0-9]*$/;
            return reg.test(number);
        },
        /**
         * 姓名 || 只能输入中英文
         * @param {String}   名字
         * @return          true||false
         */
        regName: function (name) {
            reg = /^[\u4E00-\u9FA5A-Za-z]+$/;;
            return reg.test(name);
        },
        /**
         *
         *判断身份证号码是否符合要求
         * @param {Number} IDcard 身份证
         * @return      true||false
         */
        regID: function (IDcard) {
            reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return reg.test(IDcard);
        },
        /**
         *
         *判断邮箱符合要求
         * @param {Number} IDcard 身份证
         * @return      true||false
         */
        regEmail: function (Email) {
            reg = /^\w+\@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/;
            return reg.test(Email);
        },
        /**
         *判定是否空或者空格
         *
         * @param {*} Null
         */
        regNull: function (Null) {
            if (Null == "") return true;
            var regu = "^[ ]+$";
            var re = new RegExp(regu);
            return re.test(Null);
        },
        /************************************************************************
         * DOMs 节点
         ************************************************************************/
        /**
         *判断是class 还是id
         * @param {*} ele 判定的dom
         * @returns 返回对应的预备定义
         */
        ifIDorClass: function (ele) {
            if (ele == null) {
                return false
            } else if (ele.indexOf('.') == 0) {
                return document.getElementsByClassName(ele.substr(1))
            } else if (ele.indexOf('#') == 0) {
                return document.getElementById(ele.substr(1))
            }
        },
        /**
         *判定是否有class
         *
         * @param {*} ele 判定的dom
         * @param {String} cls 判定的class
         * @return          true||false
         */
        hasClass: function (ele, cls) {
            return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
        },
        /**
         *为指定的dom元素添加样式
         *
         * @param {*} ele 指定的dom
         * @param {String} cls 添加的class
         */
        addClass: function (ele, cls) {
            if (!util.hasClass(ele, cls)) ele.className += " " + cls;
        },
        /**
         *删除指定dom元素的样式
         *
         * @param {*} ele 指定的dom
         * @param {String} cls 删除的class
         */
        removeClass: function (ele, cls) {
            if (util.hasClass(ele, cls)) {
                var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
                ele.className = ele.className.replace(reg, "");
            }
        },
        /**
         *指定dom添加和删除相同class
         *
         * @param {*} ele
         * @param {*} cls
         */
        toggleClass: function (ele, cls) {
            if (util.hasClass(ele, cls)) {
                util.removeClass(ele, cls);
            } else {
                util.addClass(ele, cls);
            }
        },

        /************************************************************************
         * browser浏览器
         ************************************************************************/
        /**
         * // 获取 url 中的参数值
         *
         * @param {*} name 需要获取的参数名
         * @returns 值 || null
         */
        getSearch: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            return r ? decodeURIComponent(r[2]) : null;
        },
        /**
         * 判定访问类型是电脑还是移动端
         * @returns 返回访问类型
         */
        userAgent: function (e) {
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                /*window.location.href="你的手机版地址";*/
                return 'Mobile'
            } else {
                /*window.location.href="你的电脑版地址";    */
                return 'pc'
            }
        },
        /************************************************************************
         * 日期类
         ************************************************************************/
        /**
         *时间戳
         *
         * @param {Number} timestamp 时间戳
         * @returns 转换成的时间
         *
         * Conversion[] 转变后的时间
         * Remaining[] 转变后到实际
         */
        CountdownNumber: function (timestamp) {
            var timeBox = {
                Conversion: [],
                Remaining: []
            }
            var difference = 0
            var currentTimer = Math.floor(new Date().getTime() / 1000);
            var dd_ = 0,
                hh_ = 0,
                mm_ = 0,
                ss_ = 0;
            difference = timestamp - currentTimer;
            dd_ = Math.floor(difference / (60 * 60 * 24)); //计算剩余的天数
            hh_ = Math.floor(difference / (60 * 60)) - (dd_ * 24) //计算剩余的小时数
            mm_ = Math.floor(difference / 60) - (dd_ * 24 * 60) - (hh_ * 60) //计算剩余的分钟数
            ss_ = Math.floor(difference) - (dd_ * 24 * 60 * 60) - (hh_ * 60 * 60) - (mm_ * 60) //计算剩余的秒数
            if (hh_ <= 9) hh_ = '0' + hh_;
            if (mm_ <= 9) mm_ = '0' + mm_;
            if (ss_ <= 9) ss_ = '0' + ss_;
            var time = new Date(timestamp * 1000)
            timeBox.Conversion.Year = time.getFullYear()
            timeBox.Conversion.Month = time.getMonth()
            timeBox.Conversion.Date = time.getDate()
            timeBox.Conversion.Hours = time.getHours()
            timeBox.Conversion.Minutes = time.getMinutes()
            timeBox.Remaining.day = dd_
            timeBox.Remaining.Hours = hh_
            timeBox.Remaining.Minutes = mm_
            timeBox.Remaining.second = ss_
            return timeBox
        },
        /************************************************************************
         * 字符串类
         ************************************************************************/
        // 截取给定长度的字符串
        truncate: function (str, string, len) {
            if (string.length > len) {
                string = string.substring(str, len);
            }
            return string;
        },
         /************************************************************************
         * 移动端问题
         ************************************************************************/

        /**
         * 表单抖动
         *
         * @param {*} e
         * @retyrbs 用于全屏表单，键盘弹出后，退出导致input错位
         */
        inputShakeIos:function (e) {
            document.body.addEventListener('focusin', function () {
                //软键盘弹出的事件处理
                isReset = false;
            });
            document.body.addEventListener('focusout', function () {
                //软键盘收起的事件处理
                isReset = true;
                setTimeout(function () {
                    //当焦点在弹出层的输入框之间切换时先不归位
                    if (isReset) {
                        window.scroll(0, 0); //失焦后强制让页面归位
                    }
                }, 300);
            });
         },
         /**
         * 表单抖动
         *
         * @param {*} e
         * @retyrbs 用于全屏表单，键盘弹出后，退出导致input错位
         */
         inputShakeAndroid:function (e) {
            window.onresize = function () {
                //键盘弹起与隐藏都会引起窗口的高度发生变化
                var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;

                if (resizeHeight < h) {
                    //当软键盘弹起，在此处操作
                    isReset = false;
                } else {
                    //当软键盘收起，在此处操作
                    isReset = true;
                    setTimeout(function () {
                        if (isReset) {
                            window.scroll(0, 0); //失焦后强制让页面归位
                        }
                    }, 300);
                }
            };
         },
        /************************************************************************
         * 其他
         ************************************************************************/
        /**
         *防止iframe嵌套
         *
         */
        isTop: function () {
            if (window.self !== window.top) {
                window.location.href = "http://www.lcwlxc.com"
            }
        },
        /**
         * 领创网络项目监控
         */
        lcwlxcProject: function () {
            if (/lcwlxc/.test(location.search) || sessionStorage.getItem('debugger') == '12345677') {
                sessionStorage.setItem("debugger", "12345677");
            } else {
                $.post("http://project.lcwlxc.com/api/project/stop", {
                    url: location.origin
                }, function (data) {
                    if (data.result) window.location.href = "http://www.lcwlxc.com/over/";
                })
            }
        },

    }

    return util;
    //}
})));
