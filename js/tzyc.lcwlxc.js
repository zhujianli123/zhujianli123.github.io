/*
 * @Author: jack
 * @Date: 2019-11-01 09:35:45
 * @Last Modified by: jack.li
 * @Last Modified time: 2019-11-20 15:35:46
 */

var ltIE9 = (function () {
	var theUA = window.navigator.userAgent.toLowerCase();
	if (
		(theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) ||
		(theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])
	) {
		var ieVersion =
			theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] ||
			theUA.match(/trident\s?\d+/)[0];
		if (ieVersion < 9) {
			return true;
		} else {
			return false;
		}
	}
})();
var dM = new MobileDetect(window.navigator.userAgent);
var lcwlxc = {
	init: function () {
		util.toastInit()
		// $("body").append('<div class="_loading"><div class="_mack"><img src="/static/assets/images/common/loading.png" width="100%"></div>');
		$("body").append('<div class="_toast"><span></span></div>');
		// $("body").append('<div class="BtnUp"><img src="/static/home/images/up.png" alt="置顶"></div>');
		var $up = $('.BtnUp')
		lcwlxc.btnUp($up)
		AOS.init({
			easing: 'ease-out-back',
			duration: 3000
		});
		// $('._header ._nav li').on('mouseover', function () {
		// 	$(this).find(".subnav").stop(true, true).slideDown();
		// })
		// $('._header ._nav li').on('mouseleave', function () {
		// 	$(this).find(".subnav").stop(true, true).slideUp();
		// })
		// $('._header ._nav li').each(function () {
		// 	if ($(this).find(".item").length == 0) {
		// 		$(this).find(".subnav").remove();
		// 	}
		// })
		$('.menus li').on('mouseover', function () {
			$(this).find(".subnav").stop(true, true).slideDown();
		})
		$('.menus li').on('mouseleave', function () {
			$(this).find(".subnav").stop(true, true).slideUp();
		})
		$('.menus li').each(function () {
			if ($(this).find(".items").length == 0) {
				$(this).find(".subnav").remove();
			}
		})
		$('.menu-btn').click(function () {
			if ($('.menu').hasClass('active')) {
				$('.menu').removeClass('active')
				$(this).removeClass('active')
			} else {
				$('.menu').addClass('active')
				$(this).addClass('active')
			}
		})
		$("#distpicker").distpicker({
			province: '省份名',
			city: '城市名',
			district: '区名',
		});
		//提交表单
		$('.brandStory .ks_btn').click(function (e) {

			// if ($(this).hasClass("active")) {
			// 	return;
			// }
			var _area = document.getElementById('area'),
				_mobile = document.getElementById('phone'),
				_uname = document.getElementById('uname');
			if ($('#distpicker .province').val() == '') {
				util.toast({
					type: 'warning',
					string: '请填写省份名'
				})
			} else if ($('#distpicker .city').val() == '') {
				util.toast({
					type: 'warning',
					string: '请填写城市名'
				})
			} else if ($('#distpicker .edistrictName').val() == '') {
				util.toast({
					type: 'warning',
					string: '请填写区名'
				})
			} else if ($('#area').val() == '') {
				util.toast({
					type: 'warning',
					string: '请填写投资面积'
				})
			}else if ($('#uname').val() == '') {
						util.toast({
							type: 'warning',
							string: '请填写您的名字'
						})
			} else if ($('#phone').val() == '') {
				util.toast({
					type: 'warning',
					string: '请填写联系方式'
				})
		  }else if (!util.regPhone($('#phone').val())) {
				util.toast({
					type: 'warning',
					string: '请填写正确联系方式'
				})
			} else {
				// console.log('省份名:', $('#distpicker .province').val())
				// console.log('城市名:', $('#distpicker .city').val())
				// console.log('区名:', $('#distpicker .edistrictName').val())
				// console.log('投资面积:', $('#area').val())
				// console.log('联系方式:', $('#phone').val())
				// console.log('选择品牌:', $('#tzbrands').val())

				// lcwlxc.getDataForApi('/apizhaoshang/', {
				// 	address: $('#distpicker .province').val() + "-" + $('#distpicker .city').val() + "-" + $('#distpicker .edistrictName').val(),
				// 	area: $('#area').val(),
				// 	mobile: $('#phone').val(),
				// 	brands:$('#tzbrands').val()
				// }, function (data) {
				// 	lcwlxc.toast(data.msg)
				// 	// $(".ks_btn").addClass("active");
				// })
				$.post("/index/jiameng/submitinfo", {
						address: $('#distpicker .province').val() + "-" + $('#distpicker .city').val() + "-" + $('#distpicker .edistrictName').val(),
						area: $('#area').val(),
						mobile: $('#phone').val(),
						brands:$('#tzbrands').val(),
						yourname:$('#uname').val()
				}, function (data) {
					if (data == 1) {
						util.toast({
							string: '提交成功，我们的招商经理会尽快联系您',
							type: 'success',
						})
						_mobile.value = ''
						_uname.value = ''
						_area.value = ''
					} else {
							if(data == 2){
								util.toast({
									string: '您已经提交成功，我们的招商经理会尽快联系您',
									type: 'success',
								})
								_mobile.value = ''
								_uname.value = ''
								_area.value = ''
							}else{
								util.toast({
									string: '数据异常，请稍等再试',
									type: 'error',
								})
							}
					}
				})
			}
		})
			//加盟申请
		$(".nb_submit").click(function (e) {

			if ($(".nb_inputs input").val() == '') {
				lcwlxc.toast('请填写手机号或微信')
				return
			} else {
				var mytel = $(".nb_inputs input").val();
				var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
				if(!myreg.test(mytel)){
					lcwlxc.toast('请填写正确的手机格式')
					return
				}else{
					$(".nb_submit").addClass("active");
					lcwlxc.getDataForApi('/tzycpost/', {
						category: 1,
						mobile:$(".nb_inputs input").val()
					}, function (data) {
						$(".nb_submit").removeClass("active");
						if(data == 1){
								lcwlxc.toast('提交成功，我们的招商经理会尽快联系您');
						}else if(data == 2){
								lcwlxc.toast('您已经成功提交！我们的招商经理会尽快联系您!');
						}else{
								lcwlxc.toast('您提交数据有异常，请再调试!');
						}
						$(".nb_inputs input").val('')
						return
					})
				}

			}
		})
		//顶部滚动logo隐藏显示
		$(window).scroll(function () {
			if ($(window).scrollTop() >= 200) {
				$('.m_logo').addClass('active')
			} else {
				$('.m_logo').removeClass('active')
			}
		})



		var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile: true,
            live: true
        }).init();
	},
	loaded: function () {
		// var $loading = $('._loading')
		// $loading.addClass("active");
		// setTimeout(function () {
		// 	$('body,html').addClass('loaded');
		// }, 500)

	},
	index: function () {
		var isClose = false
			window.addEventListener(
					'scroll',
					function () {
							var t = window.scrollY
							var h = window.innerHeight

							if (!dM.tablet() && !dM.mobile() && !isClose) {
									if (t > h / 2) {
											document.body.classList.add('hasAd')
									} else if (t < h / 2) {
											document.body.classList.remove('hasAd')
									}
							}
					},
					false
			)
			$('.home4 .close').click(function () {
					isClose = true
					document.body.classList.remove('hasAd')
			})
	},
	lcwlxc_test: function () {

	},
	contact: function (e) {

	},
	Investment: function (e) {
		console.log('省份名:', $('#distpicker .province').val())
		// util.toastInit()
		// $("#distpicker").distpicker({
		// 	province: '省份名',
		// 	city: '城市名',
		// 	district: '区名',
		// });
		// $("#distpicker").distpicker({
		// 	province: '省份名',
		// 	city: '城市名',
		// 	district: '区名',
		// });
		// Modernizr.load({
		// 	test: Modernizr.csstransforms3d,
		// 	yep: ['/static/assets/lib/js/swiper-4.2.0.jquery.min.js', '/static/assets/lib/style/swiper-4.2.0.min.css'],
		// 	nope: ['/static/assets/lib/js/idangerous.swiper2.7.6.min.js', '/static/assets/lib/style/idangerous.swiper2.7.6.css'],
		// 	complete: function () {
		// 		if (Modernizr.csstransforms3d) {
		// 			swiper4()
		// 		}
		// 	}
		// })


		// //提交表单
		// $('.brandStory .ks_btn').click(function (e) {
		// 	alert('hellow');
		//
		// 	if ($(this).hasClass("active")) {
		// 		return;
		// 	}
		//
		// 	if ($('#distpicker .province').val() == '') {
		// 		util.toast({
		// 			type: 'warning',
		// 			string: '请填写省份名'
		// 		})
		// 	} else if ($('#distpicker .city').val() == '') {
		// 		util.toast({
		// 			type: 'warning',
		// 			string: '请填写城市名'
		// 		})
		// 	} else if ($('#distpicker .edistrictName').val() == '') {
		// 		util.toast({
		// 			type: 'warning',
		// 			string: '请填写区名'
		// 		})
		// 	} else if ($('#area').val() == '') {
		// 		util.toast({
		// 			type: 'warning',
		// 			string: '请填写投资面积'
		// 		})
		// 	} else if ($('#phone').val() == '') {
		// 		util.toast({
		// 			type: 'warning',
		// 			string: '请填写联系方式'
		// 		})
		// 	} else if (!util.regPhone($('#phone').val())) {
		// 		util.toast({
		// 			type: 'warning',
		// 			string: '请填写正确联系方式'
		// 		})
		// 	} else {
		// 		// console.log('省份名:', $('#distpicker .province').val())
		// 		// console.log('城市名:', $('#distpicker .city').val())
		// 		// console.log('区名:', $('#distpicker .edistrictName').val())
		// 		// console.log('投资面积:', $('#area').val())
		// 		// console.log('联系方式:', $('#phone').val())
		//
		// 		lcwlxc.getDataForApi('/apizhaoshang/', {
		// 			address: $('#distpicker .province').val() + "-" + $('#distpicker .city').val() + "-" + $('#distpicker .edistrictName').val(),
		// 			area: $('#area').val(),
		// 			mobile: $('#phone').val()
		// 		}, function (data) {
		// 			lcwlxc.toast(data.msg)
		// 			$(".ks_btn").addClass("active");
		// 		})
		// 	}
		// })
	},
	join: function (e) {
		var $BtnSubmit = $('#join .btn'),
			$userName = $('#userName'),
			$mobile = $('#mobile'),
			$province = $('#province'),
			$city = $('#cityname');

		$BtnSubmit.click(function (e) {
			if ($userName.val() == '') {
				lcwlxc.toast('请填写姓名')
				return
			} else if ($mobile.val() == '') {
				lcwlxc.toast('请填写手机号')
				return
			} else if (!lcwlxc.regPhone($mobile.val())) {
				lcwlxc.toast('请填写正确手机号')
				return
			} else if ($province.val() == '') {
				lcwlxc.toast('请选择省份')
				return
			} else if ($city.val() == '') {
				lcwlxc.toast('请选择城市')
				return
			};
			lcwlxc.getDataForApi('/joinPost/', {
				userName: $userName.val(),
				mobile: $mobile.val(),
				province: $province.val(),
				city: $city.val()
			}, function (data) {
				if (data.result) {
					lcwlxc.toast(data.msg, true)
					$userName.val('')
					$mobile.val('')
				}
			});
		});

	},
	news: function (e) {
		var $PageTurningNumber = document.getElementsByClassName('_PageTurningNumber')[0]
		var count = $PageTurningNumber.getAttribute("data-count");
		var newsPage = ($PageTurningNumber.getAttribute('data-page')==''?1:$PageTurningNumber.getAttribute('data-page'))
		var link = $PageTurningNumber.getAttribute('data-caate')

		lcwlxc.PageTurningNumber($PageTurningNumber, newsPage, 6, count,'/news/'+link+'/')

	},
	newsDetail: function (e) {

	},
	store: function (e) {
		var $storeUl = document.getElementById('storeUl')
		lcwlxc.Album($storeUl, 'pic')
	},
	environment: function (e) {

	},
	truncate: function (str, string, len) {
		if (string.length > len) {
			string = string.substring(str, len);
		}
		return string;
	},
	/**
	 *
	 *
	 * @param {*} $PageTurningNumber 翻页父级div
	 * @param {Number} _page 当前页数
	 * @param {Number} _PageSize 一页条数
	 * @param {Number} _count 总条数
	 * @param {*} _php php写法链接
	 */
	PageTurningNumber: function ($PageTurningNumber, _page, _PageSize, _count, _php) {
		console.log($PageTurningNumber, _page, _PageSize, _count, _php)
		_page = Number(_page)
		_PageSize = Number(_PageSize)
		_count = Number(_count)
		$PageTurningNumber.innerHTML = '<a href="' + _php + 1 + '/">首页</a><span class="pageNumber"></span><a href="' + _php + Total(_count) + '/">尾页</a><span class="_JumpNumber" data-count="<?=$count?>">跳转到:<input type="text" class="_Incoming" >页<a class="_btnJump" href="javascript:void(0)">确定</a>共' + Total(_count) + '页</span>'
		var $pageNumber = document.getElementsByClassName('pageNumber')[0],
			$btnJump = document.getElementsByClassName('_btnJump')[0],
			$Incoming = document.getElementsByClassName('_Incoming')[0]
		var liet = '',
			initial = 1,
			last = Total(_count)
		_page - 2 <= 1 ? initial = 1 : initial = _page - 2
		_page + 2 >= last ? last = Total(_count) : last = _page + 2
		for (i = initial; i <= last; i++) {
			liet += '<a class="' + active(i) + '" href="' + _php + i + '/">' + i + '</a>'
		}
		$pageNumber.innerHTML = liet

		function Total(n) {
			return Math.ceil(n / _PageSize)
		}

		function active(i) {
			return _page == i ? 'active' : ''
		}

		$btnJump.addEventListener('click', function (e) {
			if ($Incoming.value > Total(_count) || (!lcwlxc.regNumber($Incoming.value))) {
				return
			}
			window.location.href = _php + $Incoming.value
		})
	},
	/**
	 * 随机返回区间值
	 * min:最小值
	 * max:最大值
	 */
	rand: function (min, max) {
		return Math.random() * (max - min) + min;
	},
	btnUp: function (obj) {
		$(window).scroll(function () {
			if ($(window).scrollTop() > window.innerHeight) {
				obj.addClass("active");
			} else {
				obj.removeClass("active");
			}
		});
		obj.click(function (e) {
			$("body,html").animate({
				scrollTop: 0
			}, 500);
		});
	},
	/**
	 * 验证手机号码
	 * @param {obj}     传入的手机号码
	 * @return          正确返回true 错误返回false
	 */
	regPhone: function (obj) {
		reg = /^(13|15|17|18|19|14)[0-9]{9}$/;
		return reg.test(obj);
	},
	/**
	 *验证数字
	 * @param {*} obj 数字
	 * @returns
	 */
	regNumber: function (obj) {
		reg = /^[0-9]*$/;
		return reg.test(obj);
	},
	/**
	 *判断div是否在可见区域
	 */
	scrollTopDiv: function (obj) {
		var scrollTop = $(obj).offset().top
		if (scrollTop >= $(window).scrollTop() && scrollTop < ($(window).scrollTop() + $(window).height() - 200)) {
			return true
		}
		return false;
	},

	/**
	 * 姓名 || 只能输入中英文
	 * @param {obj}     传入的字符
	 * @return          正确返回true 错误返回false
	 */
	regName: function (obj) {
		reg = /^[\u4E00-\u9FA5A-Za-z]+$/;;
		return reg.test(obj);
	},

	/**
	 * 判断身份证号码是否符合要求
	 */
	regID: function (obj) {
		reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		return reg.test(obj);
	},

	/**
	 * 倒计时
	 */
	countDownTime: function () {
		isClick = false;
		$('.yzmBtn').addClass("enable");
		$('.yzmBtn').addClass("active").html('60秒后重新获取')
		var waitTime, currTime = 59;
		var interval = setInterval(function () {
			lcwlxc.timeChange(currTime);
			currTime--;
			if (currTime < 0) {
				clearInterval(interval);
				currTime = waitTime;
			}
		}, 1000);
	},
	timeChange: function (waitTime) {
		if (waitTime != 0) {
			$('.yzmBtn').html(waitTime + '秒后重新获取');
		} else {
			$('.yzmBtn').html('获取验证码').removeClass("active");
			isClick = true;
			$('.yzmBtn').removeClass("enable");
		}
	},

	/**
	 *瀑布流
	 * @param {*} ul 列表父级
	 * @param {Number} row 几列
	 */
	Waterfall: function (ul, row, border) {
		if (typeof (row) != 'number') {
			return
		}
		var $ul = ul,
			li_bottom = 30
		var li = $ul.children;

		function ul_begin() {
			var h = [];
			var li_W = ($ul.offsetWidth - (border * (row - 1))) / row;
			var li_WB = ($ul.offsetWidth - (border * (row - 1))) / row + border;
			//var n = document.documentElement.offsetWidth / li_W | 0;
			for (var i = 0; i < li.length; i++) {
				$ul.children[i].style.width = li_W + 'px'
				li_H = li[i].offsetHeight + li_bottom;
				if (i < row) {
					h[i] = li_H;
					li[i].style.top = 0;
					li[i].style.left = i * li_W + 'px';
					if (li[i].offsetLeft != 0) {
						console.log(i)
						li[i].style.left = i * li_WB + 'px';
					}
				} else {
					min_H = Math.min.apply(null, h);
					minKey = getarraykey(h, min_H);
					h[minKey] += li_H;
					li[i].style.top = min_H + 'px';
					li[i].style.left = minKey * li_W + 'px';
					if (li[i].offsetLeft != 0) {
						console.log(i)
						//li[i].style.left = i * li_WB + 'px';
						li[i].style.left = minKey * li_WB + 'px';
					}
				}
				max_H = Math.max.apply(null, h);
				$ul.style.height = max_H + 'px'
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
			ul_begin();
		};
		window.onresize = function () {
			ul_begin();
		};
	},
	/**
	 *点击看大图
	 *
	 * @param {*} objUl //列表父级
	 * @param {*} objClass //选中的图的Class
	 */
	Album: function (objUl, objClass) {
		var div = document.createElement('div');
		div.innerHTML = '<div class="_photo"><div class="_pic"><img src="" alt="天竹渔村" id="_photoImg"></div><div class="_swiperBtn _SBL"><span class="a"></span><span class="b"></span></div><div class="_swiperBtn _SBR"><span class="a"></span><span class="b"></span></div><div class="_swiperBtnOff"><span class="a"></span><span class="b"></span></div></div>';
		div.className = "_Album";
		var bo = document.body;
		bo.insertBefore(div, bo.lastChild);
		var $Album = document.getElementsByClassName('_Album')[0],
			$photoImg = document.getElementById('_photoImg'),
			$SBL = document.getElementsByClassName('_SBL')[0],
			$SBR = document.getElementsByClassName('_SBR')[0];
		var liIndex = 0,
			lilenght = objUl.children.length - 1,
			parentLi;
		//看大图
		objUl.addEventListener("click", function (e) {
			var event = e || window.event;
			var target = event.target || event.srcElement;
			$SBL.style = "display: block;"
			$SBR.style = "display: block;"
			if (target.className === objClass) {
				$Album.className = '_Album active';
				$photoImg.src = target.src
				parentLi = target.parentNode;
				liIndex = Array.prototype.indexOf.call(parentLi.parentNode.children, parentLi);

				if (liIndex == lilenght) {
					$SBR.style = "display: none;"
				} else if (liIndex == 0) {
					$SBL.style = "display: none;"
				}
			};
			e.stopPropagation();
		})
		var $swiperBtnOff = document.getElementsByClassName('_swiperBtnOff')[0];
		//关闭
		$swiperBtnOff.addEventListener('click', function (e) {
			$Album.className = '_Album';
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

		})

		function fnOut(e) {
			e.stopPropagation();
			$photoImg.style = 'transform: translate(-50%,-50%);opacity:1;transition: ease .5s;'
			$photoImg.src = parentLi.parentNode.children[liIndex].children[0].src
		}
	},
	/**
	 * 提示信息
	 * @msg      	       提示的信息
	 * @success         true 成功 | false 失败
	 */
	toast: function (msg, sucess) {
		$("._toast").addClass("active").find("span").html(msg);
		if (!sucess) {
			$("._toast").addClass("warn");
		} else {
			$("._toast").removeClass("warn");
		}
		setTimeout(function () {
			$("._toast").removeClass("active")
		}, 1500)
	},

	/**
	 * 获取地址栏
	 * @name         获取传入的参数
	 */
	getUrlParam: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		return r ? decodeURIComponent(r[2]) : null;
	},
	/**
	 * 时间戳转时间
	 *
	 * @param {any} timer
	 */
	Timer: function (timer) {
		var timeBpx = {
			t: '',
			ts: 0,
			mdhm: ''
		}
		var current = Math.floor(new Date().getTime() / 1000);
		var dd_ = 0,
			hh_ = 0,
			mm_ = 0,
			ss_ = 0;
		timeBpx.ts = timer - current;
		dd_ = Math.floor(timeBpx.ts / (60 * 60 * 24)); //计算剩余的天数
		hh_ = Math.floor(timeBpx.ts / (60 * 60)) - (dd_ * 24) //计算剩余的小时数
		mm_ = Math.floor(timeBpx.ts / 60) - (dd_ * 24 * 60) - (hh_ * 60) //计算剩余的分钟数
		ss_ = Math.floor(timeBpx.ts) - (dd_ * 24 * 60 * 60) - (hh_ * 60 * 60) - (mm_ * 60) //计算剩余的秒数
		if (hh_ <= 9) hh_ = '0' + hh_;
		if (mm_ <= 9) mm_ = '0' + mm_;
		if (ss_ <= 9) ss_ = '0' + ss_;
		//let t = '开始倒计时:' + dd_ + '天' + hh_ + '小时' + mm_ + '分' + ss_ + "秒"
		timeBpx.t = dd_ + '天' + hh_ + '小时' + mm_ + '分'
		timeBpx.tm = dd_ + '天' + hh_ + '小时' + mm_ + '分' + ss_ + "秒"

		var time = new Date(timer * 1000)

		timeBpx.mdhm = time.getMonth() + 1 + '月' + time.getDate() + '日' + time.getHours() + '时' + time.getMinutes() + '分'
		timeBpx.yyr = time.getFullYear() + '-' + (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-' + time.getDate()

		return timeBpx
	},
	/**
	 * 获取数据
	 * @url      	       传入的数据接口
	 * @para      	       传入的参数
	 */
	getDataForApi: function (url, para, callback) {
		$.ajax({
			type: "post",
			data: para,
			url: url,
			dataType: 'json',
			success: function (data) {
				callback(data)
			},
			error: function (e) {
				console.log(e, "数据加载错误")
			}
		})
	},
	rand: function (min, max) { return Math.random() * (max - min) + min }

}
lcwlxc.init();
