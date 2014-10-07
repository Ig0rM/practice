require.config({

  baseUrl: "../vendor",

  paths: {
    jquery: 'jquery-1.11.1.min',
    jquery_ui: 'jquery-ui.min',
    underscore: 'underscore',
    backbone: 'backbone',
    bootstrap: 'bootstrap.min',
    url: 'url.min',
    typeahead: 'typeahead.bundle.min',
    appModels: '../js/Models',
    appViews: '../js/Views',
    appCollections: '../js/Collections',
    appTemplates: '../templates'
  },

  shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery', 'url'],
            exports: 'Backbone'
        },
        'typeahead': {
          deps: ['jquery'],
          exports: 'typeahead'
        },
        'jquery_ui': {
          deps: ['jquery'],
          exports: 'jquery_ui'
        },
        'bootstrap': {
          deps: ['jquery'],
          exports: 'bootstrap'
        }
    }

});

require([
    'url',
    'jquery', 
    'jquery_ui', 
    'typeahead', 
    'bootstrap', 
    'Backbone', 
    '../js/application'
  ], function (url, jquery, jquery_ui, typeahead, bootstrap, Backbone, Application) {
    
    $(function() {
      Application.init();
    });

}); 
