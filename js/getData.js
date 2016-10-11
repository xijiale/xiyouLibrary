//接口地址host
var host = 'http://api.xiyoumobile.com/xiyoulibv2/';
function getRank(){
	var $box = $('#rankContent');
	var moban = '<div class="card">'+'<div class="card-header">ID:<%bookId%></div>'+
	    		  '<div class="card-content">'+
	      		  '<div class="card-content-inner"><%bookTitle%></div>'+
	    		  '</div></div>'
	var html = '';
	$.ajax({
		type:"get",
		url: host + "book/rank",
		dataType: 'jsonp',
		error: function(){
			alert('失败了');
		},
		success: function(data){
			console.log(data);
			if(!data || !data.Result || !data.Detail){
				alert('数据加载失败');
				return;
			}
			for (var i = 0; i < 3; i++) {
				var detail = data.Detail[i];
				html += moban.replace('<%bookId%>',detail['ID'] || '')
				             .replace('<%bookTitle%>',detail['Title'] || '');
			}
			$box.html(html);
		}
	});
}

getRank();