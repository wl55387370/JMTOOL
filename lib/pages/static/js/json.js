
function Analysis(){
	var json = document.getElementById('jsontext').value;
	var obj = null;
	try{
		obj = eval("("+json+")");
	}catch (err){
		showmsg("json格式错误！")
		return;
	}
	var html = gethtml(obj);
	document.getElementById('myjson').innerHTML = "{" + html + "}";
}

function gethtml(obj){
	var html = "";
	for(key in obj){
		if(typeof(obj[key])=="object" && obj[key].length==undefined){
			html+="<div ondblclick=\"javascript:event.cancelBubble = true;javascript:showDetails(this);\" onclick=\"javascript:event.cancelBubble = true;getJsonPath(this);\" class=\"json\" id=\""+key+"\">" +key+":{";
			html+="<div>";
			html+=gethtml(obj[key]);
			html += "</div>";
			html += "...}</div>";
		}else{
			if(typeof(obj[key])=="object"){
				var o = obj[key];
				html+="<div ondblclick=\"javascript:event.cancelBubble = true;\" onclick=\"javascript:event.cancelBubble = true;getJsonPath(this);\" class=\"json\" id=\""+key+"\">" +key+":";
				for(var i=0; i<o.length; i++){
					html+="<div class=\"json\" ondblclick=\"javascript:event.cancelBubble = true;javascript:showDetails(this);\" id=\"["+i+"]\">[" + i;
					html+="<div style=\"display:none;\">";
					html += gethtml(o[i]);
					html += "</div>";
					html += "]</div>";
				}
				html += "</div>";
			}else{
				html += "<div ondblclick=\"javascript:event.cancelBubble = true;\" onclick=\"javascript:event.cancelBubble = true;getJsonPath(this);\" class=\"json\" id=\""+key+"\">" +key+": "+obj[key]+"</div>";
			}
		}
	}
	return html;
}

function getJsonPath(ele){
	var path = "";
	while(ele.id!="myjson"){
		if(ele.id!=undefined && ele.id!=""){
			if(path==""){
				path = ele.id;
			}else{
				path = ele.id + "." + path;
			}
		}
		ele = ele.parentNode;
	}
	path = "$." + path
	document.getElementById('jsonpath').value = path;
}

function showDetails(ele){
	if(ele.children[0].style.display=="none"){
		ele.children[0].style.display="";
	}else{
		ele.children[0].style.display="none";
	}
}


//提示区域
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