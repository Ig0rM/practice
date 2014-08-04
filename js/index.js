/* window.onload = function(){
alert("it works!");
 };
*/
 $(document).ready(function(){
 		/*alert("it works");*/
/*
 		$(".header").css("min-height", "140px");
 		$(".header").css("min-width", "140px");
 		$(".header").css("background-color", "red");*/

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


$(function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#search_field" ).autocomplete({
      source: availableTags
    });
  });

/*

function showPrice(data) {
    alert("Symbol: " + data.symbol + ", Price: " + data.price);
}

showPrice({symbol: 'IBM', price: 91.42});
*/
$("#template-container1").loadTemplate("#template1",
    {
       header: '',
       logotype: '<div style="float: left"><h1><a href="#">Internet News</a></h1></div>',
       slogan: '<b>Connecting Online People</b></br>Sharing IT trends',
       hmenu: '<p><a href="#">Home</a></p><p><a href="#">Browse News</a></p><p><a href="#">Submit News</a></p>',
       login: 'Hi, You can <a href="#">Login</a> here.'
    });

$("#template-container2").loadTemplate("#template2",
    {
       searchform: '<form action="#" id="search_form1"><input id="search_field" name="search_field" type="text" value=""/><input type="submit" name="submit" class="button" value="search"/></form>',
       featuredPosts: '<p><a href="#">Featured Posts</a></p>',
       topNews: '<p><a href="#">Top 10 News</a></p>',
       newPosts: '<h1>New posts</h1>',
       articleName: '<a href="#">Lorem ipsum</a>',
       articlePreview: '<p class="previewText">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent lupt...</p>',
       date: '<span id="author">Posted by: <i>John Doe</i></span><span id="actualDate"><a href="#"> 10th Jan, 2006</a></span><span id="comments"><a href="#"> Comments(7)</a></span><span id="readMore"><a href="#"> Read more</a></span>',
       prevPage: '<button>Prev</button>',
       pagenum: '1',
       nextPage: '<button>Next</button>',
       info: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci.</p>'
    });

$("#template-container3").loadTemplate("#template3",
    {
       quote: "<p><b>Lovely Quote:</b> There may be no 'I' in team, but there's a 'ME' if you look hard enough. - David Brent</p>",
       linksLeft: '<p style="float:left"><a href="#">Archive</a> <img src="./images/separator.gif" alt> <a href="#">RSS Feed</a> </br> <a href="#">CSS</a> and <a href="#">XHTML</a> <img src="./images/separator.gif" alt> <a href="#">Accessibility</a></p>',
       linksRight: '<p style="float:right"><a href="#" style="float:right">Contact Us</a></br>&copy 2011, <a href="#">Internet Jobs</a></p>'
    });


for (var i = 0; i <= 1; i++) {
  $("#pagination").before($("#articlePreview").clone());
}

$('#hmenu p').on('mousemove', function() {
  $(this).css('background-image', '../images/hmenuarrowhover.gif');
  $(this).css('background-color', '#2A3E59');
  $(this).css('border-bottom', '3px solid navy');
  $(this).find('a').css('color', '#FFFFFF');

});

$('#hmenu p').on('mouseleave', function() {
  $(this).css('background-image', '../images/hmenuarrow.gif');
  $(this).css('background-color', '#CBCBCB');
  $(this).css('border-bottom', '3px solid #A5A1A1');
  $(this).find('a').css('color', 'black');
});
/*$('#searchform').on('mouseleave', function(){
  $('input:submit').click();
  console.log("222");

} );*/
/*header: '<div id="author">xxzczxcx</div>',*/
/*$("#template-container").loadTemplate($("#template2"),
    {
        sidebar: '25th May 2013',
    });

$("#template-container").loadTemplate($("#template3"),
    {
        content: 'Authors/JoeBloggs.jpg',
    });

$("#template-container").loadTemplate($("#template4"),
    {
        footer: 'This is the contents of my post'
    });*/
/*		$("#author").css("min-height", "140px");
 		$("#author").css("min-width", "140px");
 		$("#author").css("background-color", "blue");
*/


 });