var excels;
var files;

$(function () {
	$(document).ready(function() {
		setTimeout(init,200);
	});
});

//加载页面
function init(){
	showmsg("页面正在初始化...");
	var cases = result.getCaseName("0");
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

var trunning;
var ctype = "0";
var name = "";

//选择用例类型
function setType(t){
	ctype = t;
	document.getElementById('casefile').value = "请选择";
	var cases = result.getCaseName(t);
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
    var obj=document.getElementsByName('case'); //选择所有name="'test'"的对象，返回数组 
    //取到对象数组后，我们来循环检测它是不是被选中 
    var s=''; 
    for(var i=0; i<obj.length; i++){ 
        if(obj[i].checked) s+=obj[i].value+';'; //如果选中，将value添加到变量s中 
    } 
    document.getElementById('casefile').value = s;
}

//显示提示区
function showCases(){
	document.getElementById('cases').style.display = "block";
}

//隐藏提示区
function hideCases(){
	if(document.getElementById('cases').style.display=="none")
		document.getElementById('cases').style.display = "block";
	else
		document.getElementById('cases').style.display = "none";
}

//发送邮件
function sendMail(){
	showmsg("正在发送邮件，请稍等...");
	document.getElementById("mailbutton").disabled = true;
	try{
		name = document.getElementById("casefile").value;
	}catch (err){
		;
	}
	if(name!="" && name!="请选择"){
		setTimeout(Mail,200);
	}else{
		showmsg("请先选择用例...");
	}
	document.getElementById("mailbutton").disabled = false;
}

function Mail(){
	var msg = result.getMail(ctype,name);
	showmsg(msg);
}


function getReports(){
	document.getElementById("runbutton").disabled = true;
	var name = "";
	try{
		name = document.getElementById("casefile").value;
	}catch (err){
		;
	}
	if(name!="" && name!="请选择"){
		showmsg("正在生成，请稍等...");
		var msg = result.getCases(ctype,name);
		files = name.split(";");
		if(msg.length>=20){
			var reg = new RegExp('\\+',"g");
			msg = msg.replace(reg," ");
			excels = eval("(" +msg + ")");
			showReports();
		}else{
			showmsg(msg);
		}
	}else{
		showmsg("请先选择用例...");
	}
}

function showReports(){
	var html = "";
	//文件
	for(var i=0;i<excels.length;i++){
		html += '<div class="row"><div class="col-md-6"><div class="pricing-box"><span><h4>';
		html += decodeURIComponent(excels[i][0][0]["分组"]) + '</h4></span><small>';
		html += files[i] + '</small>'
		//sheet
		for(var j=0;j<excels[i].length;j++){
			var sheetname = excels[i][j][excels[i][j].length-1]["sheetname"];
			var groupstart=0;
			//sheet里面的用例
			for(var k=1;k<excels[i][j].length-1;k++){
				if(excels[i][j][k]["分组"]!=undefined && excels[i][j][k]["分组"].length>2){
					if(groupstart!=0){
						html += '</div></div>';
					}
					html +='<br><br><div class="case-group"><div class="group-title" onclick="javascript:showCase(\'';
					html += 'group' + i + j + k + '\');"><h4><a>';
					html += sheetname + ">>" + decodeURIComponent(excels[i][j][k]["分组"]);
					html += '</a><a style="float:right;">+</a></h4></div><div class="case-case" id="group' + i + j + k +'">';
					groupstart = 1;
				}else{
					if(excels[i][j][k]["状态"]=="FAIL")
						html += '<div class="case-cases" style="border-color: red;">';
					else{
						html += '<div class="case-cases">';
					}
					html += '<div class="case-title" onclick="javascript:showCase(\'details' + i + j + k + '\');"><h5><a>';
					html += decodeURIComponent(excels[i][j][k]["用例名"]) + ': '+ decodeURIComponent(excels[i][j][k]["关键字"]);
					html += '</a><a style="float:right;">+</a>';
					if(excels[i][j][k]["状态"]=="FAIL"){
						html += '<a style="float:right;right: 5.3%;position: relative;color: red;">'+excels[i][j][k]["状态"];
						html += '</a></h5></div><div id="details' + i + j + k + '" class="case-case" style="display: none;color:red;">';
					}else{
						html += '<a style="float:right;right: 5%;position: relative;">'+excels[i][j][k]["状态"];
						html += '</a></h5></div><div id="details' + i + j + k + '" class="case-case" style="display: none;">';
					}
					var flg = 0;
					if(excels[i][j][k]["param1"]!=undefined && excels[i][j][k]["param1"].length>2){
						html += decodeURIComponent(excels[i][j][k]["param1"]);
						flg = 1;
					}else{
						flg = 0;
					}
					if(excels[i][j][k]["param2"]!=undefined && excels[i][j][k]["param2"].length>2){
						if(flg==1)
							html += '，&nbsp&nbsp' + decodeURIComponent(excels[i][j][k]["param2"]);
						else
							html += decodeURIComponent(excels[i][j][k]["param2"]);
						
						flg = 1;
					}else{
						flg = 0;
					}
					if(excels[i][j][k]["param3"]!=undefined && excels[i][j][k]["param1"].length>2){
						if(flg==1)
							html += '，&nbsp&nbsp' + decodeURIComponent(excels[i][j][k]["param3"]);
						else
							html += decodeURIComponent(excels[i][j][k]["param3"]);
						
						flg = 1;
					}
					html +='<br><br>' + decodeURIComponent(excels[i][j][k]["实际结果"]);			
					html += '</div></div><br>';
				}
			}
			html += '</div></div>';
		}
		html += "</div></div></div>";
	}
	if(html.length>2){
		document.getElementById("all").innerHTML = html;
	}
	showmsg("报告生成完成，请查看");
	excels = undefined;
}

//显示和隐藏
function showCase(id){
	var ele = document.getElementById(id);
	if (ele.style.display=="none"){
		ele.style.display = "block";
	}else{
		ele.style.display = "none";
	}
}

function getExcel(f) {// 读取excel
	var wb;// 读取完成的数据
	var rABS = false; // 是否将文件读取为二进制字符串
	var reader = new FileReader();
	if (rABS) {
		reader.readAsArrayBuffer(f);
	} else {
		reader.readAsBinaryString(f);
	}
	reader.onload = function(e) {
		var data = e.target.result;
		if (rABS) {
			wb = XLSX.read(btoa(fixdata(data)), {// 手动转化
				type : 'base64'
			});
		} else {
			wb = XLSX.read(data, {
				type : 'binary'
			});
		}
		var excel=[];
		// wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
		// wb.Sheets[Sheet名]获取第一个Sheet的数据
		for (var i=0;i<wb.SheetNames.length;i++){
			var excel1 = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[i]])
			excel1.push(wb.SheetNames[i]);
			excel.push(excel1);
		}
		
		excels.push(excel);
	};
}

function fixdata(data) { // 文件流转BinaryString
	var o = "", l = 0, w = 10240;
	for (; l < data.byteLength / w; ++l)
		o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l
				* w + w)));
	o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
	return o;
}

// 提示区域
var tshow;

function showmsg(str) {
	if (tshow != undefined) {
		window.clearInterval(tshow);
		tshow = undefined;
	}
	document.getElementById('show').innerHTML = str;
	document.getElementById('show').style.display = "block";
	var div = document.getElementById('show');
	div.style.opacity = 1;
	hidden(document.getElementById("show"), 1, -0.01);
}
function hidden(o, i, s) {
	tshow = setInterval(function() {
		i += s;
		o.style.opacity = i;
		if (i < 0.2) {
			window.clearInterval(tshow);
			tshow = undefined;
			document.getElementById('show').style.display = "none";
			document.getElementById("runbutton").disabled = false;
			document.getElementById("logbutton").disabled = false;
		}
	}, 20);
};