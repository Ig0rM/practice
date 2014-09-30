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
    }
	} // return end
});