define(function () {

	return {
		//article creation
		create: function(config){
			var post = {
	      title: $('#inputTitle').val(),
	      text: $('#inputText').val(),
	      author: $('#inputAuthor').val()
	    };

      $.ajax({
	    	url: 'http://127.0.0.1:9000/api/posts',
	      type:'POST',
	      data: post,
	      success: function(result){
    		}
  		});

      //notification window
      $('.notification-success').addClass('center');
      $('.notification-success .alert-success').text('Article was successfully created!');
      $('.notification-success').fadeIn(1000).delay(1000).fadeOut(1000);

      $('#addOrEditArticleBlock').slideUp(500);
   //    var appState = new config.AppState();
   //    var view = new View({model: appState});
			// view.showArticles();
    }
	} // return end
});



//$.post('/api/posts', {
      //	beforeSend: function(xhrObj){
                // xhrObj.setRequestHeader("Content-Type","application/json");
                // xhrObj.setRequestHeader("Accept","application/json");
                // xhrObj.setRequestHeader("AJAX", "true");
     //   },
	    //	url: '/api/posts',
	    	//type: 'POST',
	      //data: post,

	    //  title: $('#inputTitle').val(),
	     // author: $('#inputAuthor').val(),
	     // text: $('#inputText').val(),

	     // success: function(result){
		        // var appState = new config.AppState();
		        // var view = new View({model: appState});
		        // var articles = JSON.parse(result);


		        // appState.set({articles: articles});
		        // view.showArticles();
    //		}
    	//	headers: {
           // "Allow" : "POST, GET, OPTIONS",
           // "Content-Type" : "application/x-www-form-urlencoded"
           //    "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept",
       //    "Access-Control-Max-Age" : "1728000"
			//	}
  	//	}, 'text');