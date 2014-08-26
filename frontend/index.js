/*=====================HEADER*/
const LOGOTYPE = '<div style="float: left"><h1><a href="#">Internet News</a></h1></div>'; //text of the site logotipe
const SLOGAN = '<b>Connecting Online People</b></br>Sharing IT trends'; //text of the site slogan
const HEADER_MENU = '<p><a href="#">Home</a></p><p><a href="#">Browse News</a></p><p><a href="#">Submit News</a></p>'; //header menu
const LOGIN_TEXT = 'Hi, You can <a href="#">Login</a> here.'; //text of the login text at the header

/*=====================MAIN*/
//search element at the sidebar
const SEARCH_FORM = '<form action="#" id="search_form1"><input id="search_field" name="search_field" type="text" value=""/><input type="submit" name="submit" class="button" value="search"/></form>';
const FEATURED_POSTS = '<p><a href="#">Featured Posts</a></p>'; //featured posts block at the sidebar
const TOP_NEWS = '<p><a href="#">Top 10 News</a></p>'; //top news block at the sidebar
const NEW_POSTS = '<h1>New posts</h1>';  //title of the block of articles at the content block
const ARTICLE_NAME = '<a href="#">Lorem ipsum</a>'; //title of the article at the content block
//preview of the articles at the content block
const ARTICLE_PREVIEW = '<p class="previewText">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent lupt...</p>';
//date of the artile at the content clock
const DATE = '<span id="author">Posted by: <i>John Doe</i></span><span id="actualDate"><a href="#"> 10th Jan, 2006</a></span><span id="comments"><a href="#"> Comments(7)</a></span><span id="readMore"><a href="#"> Read more</a></span>';
const PREV_PAGE = '<button>Prev</button>'; //previous page button
const PAGE_NUM = 'Page 1'; //number of the pagination block of 3 articles
const NEXT_PAGE = '<button>Next</button>'; //next page button
//info block at the sidebar
const INFO = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci.</p>';

const ADD_FORM = 'Add new article: </br><form action="#" id="addArticle">Title: <input id="articleTitle" name="title" type="text" value=""/> Author: <input id="articleAuthor" name="author" type="text" value=""/></br></br>Text: </br><textarea id="articleText" name="text" rows="5" cols="100"  value=""></textarea></br><input type="submit" name="submitArticle" class="button" value="Add new"/></form>';

/*const ADD_FORM = '';*/
/*=====================FOOTER*/
const QUOTE = "<p><b>Lovely Quote:</b> There may be no 'I' in team, but there's a 'ME' if you look hard enough. - David Brent</p>"; //quote at the footer
//left side links in the footer
const FOOTER_LINKS_LEFT = '<p style="float:left"><a href="#">Archive</a> <img src="./images/separator.gif" alt> <a href="#">RSS Feed</a> </br> <a href="#">CSS</a> and <a href="#">XHTML</a> <img src="./images/separator.gif" alt> <a href="#">Accessibility</a></p>';
//right side links in the footer
const FOOTER_LINKS_RIGHT = '<p style="float:right"><a href="#" style="float:right">Contact Us</a></br>&copy 2014, <a href="#">Internet Jobs</a></p>';


$(document).ready(function(){
  $.addTemplateFormatter({
    UpperCaseFormatter : function(value, template) {
      console.log("11111");
      return value.toUpperCase();
    },
    LowerCaseFormatter : function(value, template) {
      return value.toLowerCase();
    },
    SameCaseFormatter : function(value, template) {
      if(template == "upper") {
        return value.toUpperCase();
      } else {
        return value.toLowerCase();
      }
    }
  });

  $("#header-container").loadTemplate("#headerTemplate",
    {
      logotype: LOGOTYPE,
      slogan: SLOGAN,
      hmenu: HEADER_MENU,
      login: LOGIN_TEXT
    });

  $("#content-container").loadTemplate("#contentTemplate",
    {
      searchform: SEARCH_FORM,
      featuredPosts: FEATURED_POSTS,
      topNews: TOP_NEWS,
      newPosts: NEW_POSTS,
      prevPage: PREV_PAGE,
      pagenum: PAGE_NUM,
      nextPage: NEXT_PAGE,
      info: INFO,
      addForm: ADD_FORM
    });

  $("#footer-container").loadTemplate("#footerTemplate",
    {
      quote: QUOTE,
      linksLeft: FOOTER_LINKS_LEFT,
      linksRight: FOOTER_LINKS_RIGHT
    });

  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;
   
      // an array that will be populated with substring matches
      matches = [];
   
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
   
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          // the typeahead jQuery plugin expects suggestions to a
          // JavaScript object, refer to typeahead docs for more info
          matches.push({ value: str });
        }
      });
   
      cb(matches);
    };
  };
   
  var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
   
  $('#search_field').typeahead({
    hint: false,
    highlight: false,
    minLength: 1
  },
  {
    name: 'states',
    displayKey: 'value',
    source: substringMatcher(states)
  }).on('typeahead:selected', function() {
    window.location.hash = "location=" + $('#search_field').val();
  });


  require(["helper/headerMenu"], function(headerMenu) {

  });

  //adds new article using form
  $('#addArticle').submit(function() {
    $.ajax({url:"http://localhost:9000/api/posts?title=" + $('#articleTitle').val() + "&author=" + $('#articleAuthor').val() +"&text=" + $('#articleText').val(), type:'POST',success:function(result){
    //  console.log(result);
    }});
  });
});