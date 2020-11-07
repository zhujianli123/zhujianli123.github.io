//产品页面生成一个随机访客数数
function sjorders(code) {
    var now = new Date();
    var date = new Date();

	now.getYear(); //获取当前年份(2位)
	now.getFullYear(); //获取完整的年份(4位)
	now.getMonth(); //获取当前月份(0-11,0代表1月)
	now.getDate(); //获取当前日(1-31)

	var code_int = parseInt(code.substring(code.length-4)); //截取字符串后四位并转为数字类型
  var info_int = parseInt(code.substring(code.length-3)); //截取字符串后三位并转为数字类型
  var randnum = sj();


    sde = now.getFullYear() + now.getYear() + now.getMonth() + now.getDate() + code_int;
    sdee= info_int + 415 + randnum + now.getMonth();
    $('.visitnum').html(sde);
    $('.getinfonum').html(sdee);
}


function sj() {
    //x上限，y下限
    var x = 9;
    var y = 1;
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}
