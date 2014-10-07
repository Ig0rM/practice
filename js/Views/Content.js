define([
    'Backbone',
    'text!appTemplates/rightSide.html',
    'text!appTemplates/createForm.html',
    'text!appTemplates/pagination.html',
    'text!appTemplates/mainArticle.html',
    'text!appTemplates/accordionPanel.html',
    'text!appTemplates/theme1.html',
    'text!appTemplates/theme2.html'
  ], function (Backbone, rightSideTemplate, createFormTemplate, paginationTemplate, mainArticleTemplate, accordionPanelTemplate, theme1Template, theme2Template) {

  var DEFAULT_LIMIT = 4;

  //Content view
	Content = Backbone.View.extend({

    initialize: function(){
    },

    //when creates new article
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
                      },
                      error: function () {
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

    startArticles: function(lim, pg){
      var posts = {
        limit: lim || 4,
        page: pg || 0
      };
      this.showArticles(posts);
    },

    showArticles: function(posts){
      var nextButton = this.$el.find("#nextListOfPages");
      var prevButton = this.$el.find("#previousListOfPages");
      
      var accordion = this.$el.find("#accordion");
      var template = accordionPanelTemplate;
      var compiledTemplate = _.template( template );

      nextButton.val(posts.page);
      prevButton.val(posts.page);

      var self = this;

      this.collection.fetch({
						data: posts,
						      	
						success: function (data) {
								var list = data.toJSON();
								
		            if(list.length < 4){
		              var j = 1;
                  nextButton.addClass("disabled");
		            }else{
                  var j = 2;
                  nextButton.removeClass("disabled");
                }

		            if(posts.page == 0){
	              	prevButton.addClass("disabled");
		            }else{
                  prevButton.removeClass("disabled");
                }

		           	accordion.html('');
		           	
		            for (var i = 0; i <= (list.length - j); i++) {
		            	accordion.html(accordion.html() + _.template( template ) (list[i]));
		            }

		            self.addEditButton(self.collection.model);
		            self.addDelButton(self.collection.model);
		            return this;
			  		}

			});

    },

    render: function(){
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
      var paginationNext = pagination.find("#nextListOfPages").val(0);
      var paginationPrev = pagination.find("#previousListOfPages").val(0);


      var mainArticle = this.$el.find("#mainArticleBlock");
      var mainArticleTmp = mainArticleTemplate;
      compiledTemplate = _.template( mainArticleTmp );
      mainArticle.append( compiledTemplate );


      var self = this;
      var nextButton = this.$el.find('#nextListOfPages');
      var prevButton = this.$el.find('#previousListOfPages');
      var creationForm = this.$el.find('#addOrEditArticleBlock');
      var submitCreation = this.$el.find('#createButton');


      var theme1 = $("#header").find("#theme1nav");
      var theme2 = $("#header").find("#theme2nav");

      theme1.on('click', function(){

        var theme1Tmp = theme1Template;
        compiledTemplate = _.template( theme1Tmp );
        mainArticle.empty();
        mainArticle.append( compiledTemplate );
      });

      theme2.on('click', function(){
        var theme2Tmp = theme2Template;
        compiledTemplate = _.template( theme2Tmp );
        mainArticle.empty();
        mainArticle.append( compiledTemplate );
      });

      nextButton.on('click', function(config){
        if(!$(this).hasClass('disabled')){
          var page = parseInt($(this).val());
          page += ( DEFAULT_LIMIT-1 );
          $(this).val(page);
          location.hash = "limit/" + DEFAULT_LIMIT + "/page/" + page;
        }
      });

      prevButton.on('click', function(config){
        if(!$(this).hasClass('disabled')){
            var page = parseInt($(this).val());
            page -= ( DEFAULT_LIMIT-1 );
            $(this).val(page);
            location.hash = "limit/" + DEFAULT_LIMIT + "/page/" + page;
        }
      });

      creationForm.off("submit").on('submit', function(){
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