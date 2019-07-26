//找到顶部时间栏
var timeTop = document.getElementById("topTime");
//找出所有的数字以及小数点
var nums = document.getElementsByClassName("num");
//找出所有的运算符
var opera = document.getElementsByClassName("operation");
//找到=、清除键、退格键
var equal = document.getElementById("result");
var clear = document.getElementById("clean");
var back = document.getElementById("del");
//找到显示器
var show_text = document.getElementById("show_textTop");
var showtext = document.getElementById("show_textDown");
//找到小数点
var clickPoint = document.getElementById("point");
//定义2个变量来存储用户点击的数字
var numbervalue1 = "";
var numbervalue2 = "";
//定义1个变量来存储用户点击的运算符
var numbervalue3 = "";
//封装点击home键的方法
function cli(obj) {
	if(obj.style.display == "block") {
		obj.style.display = "none";
	} else {
		obj.style.display = "block";
	}
}
//给home键添加点击事件
window.onload = function() {
		//获取到显示器开启
		var displayer = document.getElementById("bigDivClose");
		//获取到home键盘
		var home = document.getElementById("home");
		home.onclick = function() {
			cli(displayer);
		}
	}
	//获取当前时间,先手动调用一次
showTime();
var cycleTime = setInterval(showTime, 500);

function showTime() {
	var myTime = new Date();
	//获取分钟值
	var times = myTime.getUTCHours();
	//输出到顶部时间栏；
	var timeNow = myTime.toLocaleTimeString();
	timeTop.innerHTML = timeNow;
}

//用循环给每个数字添加点击事件
for(var i = 0; i < nums.length; i++) {
	nums[i].onclick = function() {
		//判断用户是否小数点
		if(this.innerHTML == ".") {
			//规定用户不能第一次点击小数点也不能出现两个小数点
			if(numbervalue1.indexOf(".") == -1 && numbervalue1.length > 0) {
				//用户没有点击小数点正常拼接
				numbervalue1 += this.innerHTML;
			} else {
				//有就不管
			}
		} else {
			//用户没有点小数点正常拼接
			numbervalue1 += this.innerHTML;
		}
		if(numbervalue1.length >= 13) {
			numbervalue1 = numbervalue1.substring(0, 13);
			showtext.value = "长度溢出！";
		}
		//显示器记录点击的数字
		show_text.value = numbervalue1 * 1;
	}
}
//用循环给运算符添加点击事件
for(var i = 0; i < opera.length; i++) {
	opera[i].onclick = function() {
		//显示器记录键入的数字
		show_text.value = numbervalue1;
		//规定输入的最大长度
		if(numbervalue1.length >= 13) {
			numbervalue1 = numbervalue1.substring(0, 13);
			showtext.value = "长度溢出！";
		}
		if(numbervalue2 == "") {
			//将用户输入的第一个数字串传给第二个储存空间，并将第一个存储空间清空
			numbervalue2 = numbervalue1;
			numbervalue1 = "";
			//保存用户键入的运算符
			numbervalue3 = this.innerHTML;
		} else {
			//调用一次前一次的运算结果
			oper();
			//保存用户键入的运算符
			numbervalue3 = this.innerHTML;
		}
	}
}

//给=号添加点击事件
equal.onclick = function() {
		oper();
	}
	//给清除键添加点击事件
clear.onclick = function() {
		numbervalue1 = "";
		numbervalue2 = "";
		numbervalue3 = "";
		show_textTop.value = "";
		show_textDown.value = "";
	}
	//给退格键添加点击事件
back.onclick = function del() {
	//判断用户输入的数字串长度是否大于1位，如果大于1位，则启动退格功能
	if(numbervalue1.length > 1) {
		var newNum = numbervalue1.substring(0, numbervalue1.length - 1);
		numbervalue1 = newNum;
		show_text.value = numbervalue1;
	}
}

//用户点击运算结果的方法
function oper() {
	//将两个输入数字转换成数字类型
	var firstNum = new Number(numbervalue1);
	var secondNum = new Number(numbervalue2);
	//定义一个保存变量的值
	var resu = null;
	switch(numbervalue3) {
		case "+":
			resu = secondNum + firstNum;
			break;
		case "﹣":
			resu = secondNum - firstNum;
			break;
		case "x":
			resu = secondNum * firstNum;
			break;
		case "÷":
			if(firstNum == 0) {
				showtext.value = "被除数不能为0!";
				numbervalue1 = "";
				numbervalue2 = "";
				numbervalue3 = "";
				keyBoardText = [];
				return;
			} else {
				resu = secondNum / firstNum;
				showtext.value = resu;
			}
			break;
	}
	//用户第二次点击接着运算，调用第一次的运算结果
	numbervalue2 = resu;
	numbervalue1 = "";
	//显示运算结果
	showtext.value = new Number(resu).toPrecision(9) * 1;
}