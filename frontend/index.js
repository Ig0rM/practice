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

const ADD_FORM = '<button class="addFormButton">+</button><i>Add new article</i></br><form action="#" id="articleForm">Title: <input id="articleTitle" name="title" type="text" value=""/> </br></br>Text: </br><textarea id="articleText" name="text" rows="5" cols="95"  value=""></textarea></br></br><div id="articleAuthor">Author: <input name="author" type="text" value=""/></div></br></br><input class="submitArticle" type="submit" name="submitArticle" class="button" value="Add new"/></form>';

/*const ADD_FORM = '';*/
/*=====================FOOTER*/
const QUOTE = "<p><b>Lovely Quote:</b> <span class='quoteText'>There may be no 'I' in team, but there's a 'ME' if you look hard enough. - David Brent</span></p>"; //quote at the footer
//left side links in the footer
const FOOTER_LINKS_LEFT = '<p style="float:left"><a href="#">Archive</a> <img src="./images/separator.gif" alt> <a href="#">RSS Feed</a> </br> <a href="#">CSS</a> and <a href="#">XHTML</a> <img src="./images/separator.gif" alt> <a href="#">Accessibility</a></p>';
//right side links in the footer
const FOOTER_LINKS_RIGHT = '<p style="float:right"><a href="#" style="float:right">Contact Us</a></br>&copy 2014, <a href="#">Internet Jobs</a></p>';

var quoteNumber = 0; //number of the first quote
var QOUTE_COUNT = 3; //count of all quotes
var oldQuoteNumber = 3; //number of the quote going before
var formHide = true; //indicates if the form is hide

//chose quote, after refreshing the page chose new quote
setQuote = function(){
  if(url('#quote')){
      quoteNumber = parseInt(url('#quote'));
  }

  //adding quote counter
  oldQuoteNumber = quoteNumber;
  if(quoteNumber == QOUTE_COUNT-1){
    quoteNumber = 0;
  }else{
    quoteNumber++;
  }

  $.ajax({url:"http://localhost:9000/quote?quote=" + quoteNumber, type:'GET', success:function(result){
    var article = JSON.parse(result);
    $(".quoteText").text(article.text + " - " + article.author);
  }});

  
  if(window.location.hash.search("quote=") == -1){
    window.location.hash += "&quote=" + quoteNumber;
  }else{
    var strQuote = "quote="+oldQuoteNumber;
    var strQuoteNew = "quote="+quoteNumber;
    var strHash = window.location.hash.replace('&quote='+oldQuoteNumber,'&quote='+ quoteNumber);
    window.location.hash = strHash;
  }
}


$(document).ready(function(){
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

  //matches for searchform
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

  setQuote();

  setInterval(setQuote, 10000);

  //adds new article using form
  $('#addArticle').submit(function() {
    $.ajax({url:"http://localhost:9000/api/posts?title=" + $('#articleTitle').val() + "&author=" + $('#articleAuthor').val() +"&text=" + $('#articleText').val(), type:'POST',success:function(result){
    }});
  });

  
  $(".addFormButton").on('click', function(){
    if(formHide){
      $("#articleForm").slideDown(400);
      formHide = false;
      $(".addFormButton").text("-");
    }else{
      $("#articleForm").slideUp(400);
      formHide = true;
      $(".addFormButton").text("+");
    }

  });
});