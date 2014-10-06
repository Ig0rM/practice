define([
    'Backbone',
    'text!appTemplates/rightSide.html',
    'text!appTemplates/createForm.html',
    'text!appTemplates/pagination.html',
    'text!appTemplates/mainArticle.html',
    'text!appTemplates/accordionPanel.html'
  ], function (Backbone, rightSideTemplate, createFormTemplate, paginationTemplate, mainArticleTemplate, accordionPanelTemplate) {

	Content = Backbone.View.extend({

    initialize: function(){

      this.render();
      var posts = this.checkUrl();
      var self = this;
      var nextList = this.$el.find('#nextListOfPages');
      var prevList = this.$el.find('#prevListOfPages');
      var creationForm = this.$el.find('#addOrEditArticleBlock');
      var submitCreation = this.$el.find('#createButton');

      // alert("stop");
      // console.log(posts);
      // if(posts.page == 0){
        // this.startArticles();
      // };

      nextList.on('click', function(config){
        if(!$(this).hasClass('disabled')){
         
          self.nextArticles();
        }
      });

      prevList.on('click', function(config){
        if(!$(this).hasClass('disabled')){
          self.prevArticles();
        }
      });

      creationForm.on('submit', function(){
        self.createArticle(self.collection.model);
        return false;
      });

      submitCreation.on('click', function(){
        if (creationForm.is(':visible')){
          creationForm.slideUp(500);
        }else{
          creationForm.slideDown(500);
        }
      });

    },

    createArticle: function(Model){
      var model = new Model();
      var title = this.$el.find('#inputTitle').val();
      var author = this.$el.find('#inputAuthor').val();
      var text = this.$el.find('#inputText').val();
			var successNote = this.$el.find('.notification-success');
			var creationForm = this.$el.find('#addOrEditArticleBlock');

      model.set({
        title: title,
        author: author,
        text: text
      });

      model.save();

      //notification window
      successNote.addClass('center');
     	successNote.find('.alert-success').text('Article was successfully created!');
      successNote.fadeIn(1000).delay(1000).fadeOut(1000);

      creationForm.slideUp(500);
    },

    checkUrl: function(){
      if(url('#limit') && url('#page')){
        return {
          limit: parseInt(url('#limit')),
          page: parseInt(url('#page'))
        };
      }else{
        return{limit: 4, page: 0};
      }
    },

    addEditButton: function(Model){
    	var model = new Model();
    	var self = this;
    	var button = this.$el.find('.editButton');
      //editing button click event
      button.each(function(){
        $(this).on('click', function(){
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
        });
      }); //editing
    },

    addDelButton: function(Model){
    	var model = new Model()
    	var self = this;
    	var button = this.$el.find('.delButton');
      //deletion button click event
      button.each(function(){
        $(this).on('click', function(){
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

                      success: function () {
                          // alert('Destroyed');
                      },
                      error: function () {
                          // alert('Destroyed (error)');
                      }
                    });

                    successNote.addClass('center');
                    successNote.find('.alert-success').text('Article was successfully deleted!');
                    successNote.fadeIn(1000).delay(1000).fadeOut(1000);
                }
            }
        });
      }); //deletion
    },

    startArticles: function(){
      var posts = this.checkUrl();
      this.showArticles(posts);
    },

    nextArticles: function(){
      var posts = this.checkUrl();
      posts.page += ( posts.limit-1 );
      this.showArticles(posts);
    },

    prevArticles: function(){
      var posts = checkUrl();
      posts.page -= ( posts.limit-1 );
      this.showArticles(posts);
    },

    showArticles: function(posts){
      var accordion = this.$el.find("#accordion");
      var template = accordionPanelTemplate;
      var compiledTemplate = _.template( template );
      // this.$el.append( compiledTemplate );

    	// var accordion = this.$el.find("#accordion");
    	// var panel = this.$el.find(".articlesShow");
    	// var panelTmp = _.template( this.$el.find(".articlesShow").html() );
      var self = this;

      this.collection.fetch({
						data: posts,
						      	
						success: function (data) {
								var list = data.toJSON();
								var prevList = self.$el.find('#previousListOfPages');
								var nextList;

								var j = 2;
		            if(list.length < 4){
		              j = 1;
		            }

		            if(posts.page == 0){
	              	prevList.addClass("disabled");
		            }

		           	accordion.html('');
		           	

		            for (var i = list.length - j; i >= 0; i--) {
		            	accordion.html(accordion.html() + _.template( template ) (list[i]));
		            }

		            self.addEditButton(self.collection.model);
		            self.addDelButton(self.collection.model);
		            return this;
			  		}

			});

      // Backbone.history.navigate("ssss");
      window.location.hash = "limit=" + posts.limit + "&page=" + posts.page;
    },

    render: function(){
      // alert('is using');
      var compiledTemplate;

      var dateNav = this.$el.find("#rightSide");
      var dateNavTmp = rightSideTemplate;
      compiledTemplate = _.template( dateNavTmp );
      dateNav.append( compiledTemplate );

      var creationForm = this.$el.find("#addOrEditArticleBlock");
      var creationFormTmp = createFormTemplate;
      compiledTemplate = _.template( creationFormTmp );
      creationForm.append( compiledTemplate );

      var pagination = this.$el.find("#paginationBlock");
      var paginationTmp = paginationTemplate;
      compiledTemplate = _.template( paginationTmp );
      pagination.append( compiledTemplate );

      var mainArticle = this.$el.find("#mainArticleBlock");
      var mainArticleTmp = mainArticleTemplate;
      compiledTemplate = _.template( mainArticleTmp );
      mainArticle.append( compiledTemplate );

      return this;
    },

    removeAll: function() {
      this.$el.find("#accordion").empty();
      this.$el.find("#addOrEditArticleBlock").empty();
      this.$el.find("#rightSide").empty();
      this.$el.find("#paginationBlock").empty();
      this.$el.find("#mainArticleBlock").empty();
    }

  });


	return Content;

});