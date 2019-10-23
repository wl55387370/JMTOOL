$(function () {
	$(document).ready(function() {
	    new QWebChannel(qt.webChannelTransport, function (channel) {
                window.pyjs = channel.objects.pyjs;
            });
		setTimeout(init,2000);
	});
});

// 加载页面
function init(){
	trunning = window.setInterval(function()
	{
		getRun();
	}, 2000);
	showmsg("页面正在初始化...");
	var cases = run.getCaseName();
	if(cases=="-1"){
		showmsg("系统文件夹读取错误！");
	}else{
		if(cases=="0"){
			;
		}else{
			var casees = cases.split(";");
			var html="";
			for (var i=0;i<casees.length;i++){
				if(casees[i].length>0){
					html += '<div><input name="case" type="checkbox" value="'+ casees[i] +'" />'+casees[i]+'</div>';
				}
			}
			document.getElementById("cases").innerHTML = html;
		}
	}
	$('[type="checkbox"]').click(function(){
		check();
	});
}

//响应选中
function check(){ 
    var obj=document.getElementsByName('case'); // 选择所有name="'test'"的对象，返回数组
    // 取到对象数组后，我们来循环检测它是不是被选中
    var s=''; 
    for(var i=0; i<obj.length; i++){ 
        if(obj[i].checked) s+=obj[i].value+';'; // 如果选中，将value添加到变量s中
    }
    document.getElementById('casefile').value = s;
}

var trunning;
var runType = "0";

// 设置运行类型
function setType(t){
	runType = t;
	if(t=="0"){
		var cases = run.getCaseName();
		if(cases=="-1"){
			showmsg("系统文件夹读取错误！");
			document.getElementById("cases").innerHTML = '<div><input name="case" type="checkbox" value="请选择" />请选择</div>';
		}else{
			if(cases=="0"){
				document.getElementById("cases").innerHTML = '<div><input name="case" type="checkbox" value="请选择" />请选择</div>';
			}else{
				var casees = cases.split(";");
				var html="";
				for (var i=0;i<casees.length;i++){
					if(casees[i].length>0){
						html += '<div><input name="case" type="checkbox" value="'+ casees[i] +'" />'+casees[i]+'</div>';
					}
				}
				document.getElementById("cases").innerHTML = html;
			}
		}
	}else{
		var cases = record.getCaseName();
		if(cases=="-1"){
			showmsg("系统文件夹读取错误！");
			document.getElementById("cases").innerHTML = '<div><input name="case" type="checkbox" value="请选择" />请选择</div>';
		}else{
			if(cases=="0"){
				document.getElementById("cases").innerHTML = '<div><input name="case" type="checkbox" value="请选择" />请选择</div>';
			}else{
				var casees = cases.split(";");
				var html="";
				for (var i=0;i<casees.length;i++){
					if(casees[i].length>0){
						html += '<div><input name="case" type="checkbox" value="'+ casees[i] +'" />'+casees[i]+'</div>';
					}
				}
				document.getElementById("cases").innerHTML = html;
			}
		}
	}
	$('[type="checkbox"]').click(function(){
		check();
	});
}

// 获取当前在执行的用例
function getRun(){
	var res = "null";
	res = run.getRunnings("APP");
	if (res=="null" || res==""){
		res = record.getRunnings("APP");
	}
	if (res=="null" || res==""){
		//showmsg("用例执行完成！");
		document.getElementById("runmsg").innerHTML = "<i class=\"icon ion-md-checkmark-circle-outline\">执行状态：</i>所有用例执行完成！";
		clearTimeout(trunning);
		document.getElementById("runbutton").disabled=false;
	}else{
		document.getElementById("runmsg").innerHTML = "<i class=\"icon ion-md-checkmark-circle-outline\">执行状态：</i>用例"+res+"正在执行。";
	}
}

// 运行用例
function runCase(){
	document.getElementById("runbutton").disabled = true;
	var res = run.getRunnings("APP");
	if (res=="null" || res==""){
		if(runType=="0"){
			var name = "";
			try{
				name = document.getElementById("casefile").value;
			}catch (err){
				;
			}
			if(name!="" && name!="请选择"){
				var msg = run.GetCase(name,"false");
				document.getElementById("runmsg").innerHTML = "<i class=\"icon ion-md-checkmark-circle-outline\">执行状态：</i>" + msg;
				if(msg.indexOf("正在")>=0){
					trunning = window.setInterval(function()
					{
						getRun();
					}, 3000);
				}
			}else{
				showmsg("请先选择用例...");
			}
		}else{
			var name = "";
			try{
				name = document.getElementById("casefile").value;
			}catch (err){
				;
			}
			var msg = record.GetCase(name,"false");
			document.getElementById("runmsg").innerHTML = "<i class=\"icon ion-md-checkmark-circle-outline\">执行状态：</i>" + msg;
			if(msg.indexOf("正在")>=0){
				trunning = window.setInterval(function()
				{
					getRun();
				}, 3000);
			}
		}
	}else{
		showmsg("用例" + res + "正在执行...");
	}
}

// 显示提示区
function showCases(){
	document.getElementById('cases').style.display = "block";
}

// 隐藏提示区
function hideCases(){
	if(document.getElementById('cases').style.display=="none")
		document.getElementById('cases').style.display = "block";
	else
		document.getElementById('cases').style.display = "none";
}

// 提示区域
var tshow;

function showmsg(str){
    if(tshow != undefined){
        window.clearInterval(tshow);
        tshow = undefined;
    }
    document.getElementById('show').innerHTML=str;
    document.getElementById('show').style.display = "block";
    var div=document.getElementById('show');
    div.style.opacity=1;
    hidden(document.getElementById("show"),1,-0.01);
}
function hidden(o,i,s){
    tshow=setInterval(function(){
    i+=s;
    o.style.opacity=i;
    if(i<0.2){
        window.clearInterval(tshow);
        tshow = undefined;
        document.getElementById('show').style.display = "none";
        document.getElementById("runbutton").disabled = false;
        document.getElementById("logbutton").disabled = false;
    }
    },20);
};