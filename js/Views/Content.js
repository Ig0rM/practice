define([
    'Backbone',
    'text!appTemplates/rightSide.html',
    'text!appTemplates/createForm.html',
    'text!appTemplates/pagination.html',
    'text!appTemplates/mainArticle.html',
    'text!appTemplates/accordionPanel.html'
  ], function (Backbone, rightSideTemplate, createFormTemplate, paginationTemplate, mainArticleTemplate, accordionPanelTemplate) {

  var DEFAULT_LIMIT = 4;

  //Content view
	Content = Backbone.View.extend({

    initialize: function(){
    },

    //search by text
    findBySearch: function(word){
      var self = this;
      var nextButton = self.$el.find("#nextListOfPages");
      var prevButton = self.$el.find("#previousListOfPages");
      var accordion = self.$el.find("#accordion");

      nextButton.val(0);
      prevButton.val(0);

      self.collection.fetch({
            data: {word: word},

            success: function (data) {
              var list = data.toJSON();

              accordion.empty();

              _.each(list, function(article){
                  accordion.html(accordion.html() + _.template( accordionPanelTemplate ) (article))
              });

              self.addEditButton(self.collection.model);
              self.addDelButton(self.collection.model);
            }
      });

    },

    //when creates new article
    createArticle: function(Model){
      var self = this;
      var model = new Model();
      var title = self.$el.find('#inputTitle').val();
      var text = self.$el.find('#inputText').val();
			var successNote = self.$el.find('.notification-success');
			var creationForm = self.$el.find('#addOrEditArticleBlock');

      model.set({
        title: title,
        text: text
      });

      model.save();

      //notification window
      successNote.addClass('center');
     	successNote.find('.alert-success').text('Article was successfully created!');
      successNote.fadeIn(1000).delay(1000).fadeOut(1000);
      creationForm.slideUp(500);
    },

    addEditButton: function(Model){
    	var model = new Model();
    	var self = this;
    	var button = self.$el.find('.editButton');

      //editing button click event
      button.on('click', function(){
      	var creationForm = self.$el.find('#addOrEditArticleBlock');
      	var creationFormTitle = self.$el.find('#addOrEditArticleFormTitle');
      	var submitButton = self.$el.find('#addSubmit');
        
        //check if the form is visible
        if (!creationForm.is(':visible')){
            var id = $(this).val();
          	var successNote = self.$el.find('.notification-success');

            var oldTitle = self.$el.find('#articleTitle-' + id);
            var oldText = self.$el.find('#articleContent-' + id);
            var oldAuthor = self.$el.find('#articleAuthor-' + id);

            var newTitle = self.$el.find('#inputTitle');
            var newText = self.$el.find('#inputText');
            var newAuthor = self.$el.find('#inputAuthor');

            //sliding edit form down
            creationForm.slideDown(500);

            //change title from add new article to edit article and submit button text to confirm
            creationFormTitle.text('Edit article');
           	submitButton.text('Confirm');

            //inserting previous content of article to the edition form
            newTitle.val(oldTitle.text());
            newText.val(oldText.text());
            newAuthor.val(oldAuthor.text());

            creationForm.off('submit');
            //when submited
            creationForm.on('submit', function(){

            model.set({
              id: id,
              title: newTitle.val(),
              author: newAuthor.val(),
              text: newText.val()
            });
            model.save();

            //show changes
            oldTitle.text(model.get('title'));
            oldText.text(model.get('text'));
            oldAuthor.text(model.get('author'));

            successNote.addClass('center');
            successNote.find('.alert-success').text('Article was successfully edited!');
            successNote.fadeIn(1000).delay(1000).fadeOut(1000);

            //slide up when edited
            creationForm.slideUp(500);

            return false;
          }); //when submited
        }else{
            //sliding edit form up
            creationForm.slideUp(500);
        }
      });//editing
    },

    addDelButton: function(Model){
    	var model = new Model()
    	var self = this;
    	var button = self.$el.find('.delButton');

      //deletion button click event
      button.on('click', function(){
          var id = $(this).val();
          var panel = self.$el.find('#panel-' + id);
          var dangerNote = self.$el.find('.notification-danger');
          var successNote = self.$el.find('.notification-success');
          var creationForm = self.$el.find('#addOrEditArticleBlock');

          //first finish article editing or creation
          if (creationForm.is(':visible')){
              dangerNote.addClass('center');
              dangerNote.find('.alert-danger').text('First finish article editiong');
              dangerNote.fadeIn(1000).delay(1000).fadeOut(1000);
          }else{
              if(confirm("You want to delete this article?")){
                  panel.fadeOut(500);

                  model.set({id: id});

                  model.destroy({
                    data: id,
                    success: function () {},
                    error: function () {}
                  });

                  successNote.addClass('center');
                  successNote.find('.alert-success').text('Article was successfully deleted!');
                  successNote.fadeIn(1000).delay(1000).fadeOut(1000);
              }
          }
      });//deletion
    },

    startArticles: function(lim, pg){
      var self = this;
      var posts = {
        limit: lim || 4,
        page: pg || 0
      };
      self.showArticles(posts);
    },

    //show panels of articles
    showArticles: function(posts){
      var self = this;
      var nextButton = self.$el.find("#nextListOfPages");
      var prevButton = self.$el.find("#previousListOfPages");
      var accordion = self.$el.find("#accordion");

      nextButton.val(posts.page);
      prevButton.val(posts.page);

      self.collection.fetch({
						data: posts,

						success: function (data) {
								var list = data.toJSON();

                if(list.length < 4){
                  nextButton.addClass("disabled");
		            }else{
                  list.pop();
                  nextButton.removeClass("disabled");
                }

		            if(posts.page == 0){
	              	prevButton.addClass("disabled");
		            }else{
                  prevButton.removeClass("disabled");
                }

		           	accordion.empty();

                _.each(list, function(article){
                  accordion.html(accordion.html() + _.template( accordionPanelTemplate ) (article))
                });

		            self.addEditButton(self.collection.model);
		            self.addDelButton(self.collection.model);
		            return this;
			   		}

			});

    },

    render: function(){
      var self = this;

      var dateNav = self.$el.find("#rightSide");
      var creationForm = self.$el.find("#addOrEditArticleBlock");
      var pagination = self.$el.find("#paginationBlock");
      var mainArticle = self.$el.find("#mainArticleBlock");

      dateNav.append( _.template( rightSideTemplate ) );
      creationForm.append( _.template( createFormTemplate ) );
      pagination.append( _.template( paginationTemplate ) );
      mainArticle.append( _.template( mainArticleTemplate ) );

      var nextButton = self.$el.find('#nextListOfPages');
      var prevButton = self.$el.find('#previousListOfPages');
      var creationForm = self.$el.find('#addOrEditArticleBlock');
      var showCreationFormButton = self.$el.find('#createButton');

      nextButton.val(0);
      prevButton.val(0);

      //when click next/prev on pagination button
      nextButton.on('click', function(){
        if(!$(this).hasClass('disabled')){
          var page = parseInt($(this).val());
          page += ( DEFAULT_LIMIT-1 );
          $(this).val(page);
          location.hash = "limit/" + DEFAULT_LIMIT + "/page/" + page;
        }
      });

      prevButton.on('click', function(){
        if(!$(this).hasClass('disabled')){
            var page = parseInt($(this).val());
            page -= ( DEFAULT_LIMIT-1 );
            $(this).val(page);
            location.hash = "limit/" + DEFAULT_LIMIT + "/page/" + page;
        }
      });

      //submitting creation form
      creationForm.off("submit").on('submit', function(){
        self.createArticle(self.collection.model);

        if (creationForm.is(':visible')){
          creationForm.slideUp(500);
        }else{
          creationForm.slideDown(500);
        }
        return false;
      });

      //show creation form
      showCreationFormButton.on('click', function(){
        if (creationForm.is(':visible')){
          creationForm.slideUp(500);
        }else{
          creationForm.slideDown(500);
        }
      });

      return this;
    },

    //remove all elements of content
    removeAll: function() {
      var self = this;
      self.$el.find("#accordion").empty();
      self.$el.find("#addOrEditArticleBlock").empty();
      self.$el.find("#rightSide").empty();
      self.$el.find("#paginationBlock").empty();
      self.$el.find("#mainArticleBlock").empty();
    }

  });

	return Content;
});