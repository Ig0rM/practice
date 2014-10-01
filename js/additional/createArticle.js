define(function () {

	return {
		//article creation
		create: function(config){
      var Article = Backbone.Model.extend({
		    urlRoot: '/api/posts'
		  });
      var article = new Article();

		  article.set({
		    title: $('#inputTitle').val(),
		    author: $('#inputAuthor').val(),
		    text: $('#inputText').val()
		  });

		  article.save();

      //notification window
      $('.notification-success').addClass('center');
      $('.notification-success .alert-success').text('Article was successfully created!');
      $('.notification-success').fadeIn(1000).delay(1000).fadeOut(1000);

      $('#addOrEditArticleBlock').slideUp(500);
    }
	} // return end
});