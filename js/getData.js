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


//获取图书详情
function getBookInfo(id,callback){
	var $title = $('#bookInfoTitle');
	var $content = $('#bookInfoContent');
	var moban = '<div valign="bottom" class="card-header color-white no-border no-padding">' +
      		    '<img class="card-cover" src="<%img%>" alt="">'+
    		    '</div><div class="card-content"><div class="card-content-inner">'+
        	    '<p>作&nbsp;&nbsp;&nbsp;&nbsp;者：<%author%></p><p>出版社：<%pub%></p><p>分&nbsp;&nbsp;&nbsp;&nbsp;类：<%subject%></p>'+
        		'<p>浏览次数：<%browsetimes%>次</p><p>收藏次数：<%favtimes%>次</p><p>可借数目：<%avaliable%>本</p></div>';
    
	$.ajax({
		type:"get",
		url: host + "book/detail/id/" + id,
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
			var detail = data.Detail;
			moban = moban.replace('<%author%>',detail['Author']  || '')
			             .replace('<%pub%>',detail['Pub'] || '')
			             .replace('<%subject%>',detail['Subject'] || '')
			             .replace('<%browsetimes%>',detail['BrowseTimes'] || '')
			             .replace('<%favtimes%>',detail['FavTimes'] || '')
			             .replace('<%avaliable%>',detail['Avaliable'] || '');
			if (detail['DoubanInfo'] && detail['DoubanInfo']['Images']) {
				var img = detail['DoubanInfo']['Images'];
				moban = moban.replace('<%img%>',img['large'] || img['medium'] || img['small'] || '');
			}else{
				moban = moban.replace('<%img%>','');
			}
			$title.html(detail['Title']);
			$content.html(moban);
          
		}
	});
}
getBookInfo('0100000015')
