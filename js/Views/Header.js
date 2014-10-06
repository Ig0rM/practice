define([
    'Backbone',
    'text!appTemplates/header.html'
  ], function (Backbone, headerTemplate) {
  //Header view
  Header = Backbone.View.extend({
    siteHeader: $("#header"),

    initialize: function(){
      this.render();

      //login form slide Up
      $(".glyphicon-chevron-up").on("click", function(){
          $(".glyphicon-chevron-up").fadeOut(0);
          $(".glyphicon-chevron-down").fadeIn(100, function(){
              $("#loginForm").slideUp(400);
          });
      });

      //login form slide Down
      $(".glyphicon-chevron-down").on("click", function(){
          $(".glyphicon-chevron-down").fadeOut(0);
          $(".glyphicon-chevron-up").fadeIn(100, function(){
              $("#loginForm").slideDown(400);
          });
      });

      //search form typeahead
      var states = [
          'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
          'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
          'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
          'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
          'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
          'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
          'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
          'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
          'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ];

      var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
          var matches, substrRegex;

          matches = [];

          substrRegex = new RegExp(q, 'i');

          $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
              matches.push({ value: str });
            }
          });
       
          cb(matches);
        };
      };
       
      $('#searchField').typeahead({
        hint: false,
        highlight: false,
        minLength: 1
      },
      {
        name: 'states',
        displayKey: 'value',
        source: substringMatcher(states)
      }).on('typeahead:selected', function() {
        window.location.hash = "location=" + $('#searchField').val();
      });
      /* -== search form typeahead ==- */
    },

    render: function(){
      var template = headerTemplate;
      // console.log(headerTemplate);
      // console.log(this.$el.find("#siteHeader1"));
       // this.$el.find("#siteHeader1");
      var compiledTemplate = _.template( template );
      this.$el.append( compiledTemplate );
      // this.siteHeader.html( _.template( template ) );
      // this.siteHeader.append(template);
      return this;
    }
  });

  return Header;

});