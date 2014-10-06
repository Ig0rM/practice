$("#header").html('<script type="text/template" id="siteHeader1">
        <div class="col-md-12">

          <div class="col-md-3 col-md-offset-2" id="logo">
            <div id="siteTitle">
              <h1><a>Lorem ipsum</a></h1>
              <p>Lorem ipsum, dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>

          <div class="col-md-2 col-md-offset-4" id="loginBlock">

            <form class="form-inline" role="form" id="loginForm">

              <div class="form-group">
                <div class="input-group">
                  <input class="form-control" type="text" placeholder="Enter login">
                </div>
              </div>
              <div class="form-group">
                <label class="sr-only" for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                <div class="checkbox">
                  <label>
                    <input type="checkbox"> Remember
                  </label>
                </div>
                <button type="submit" class="btn btn-default">Sign in</button>
              </div>
              
            </form>
            
            <span class="glyphicon glyphicon-chevron-up" id="arrowLogin"></span>
            <span class="glyphicon glyphicon-chevron-down" id="arrowLogin"></span>
          </div>

          <div class="col-md-12" id="hmenuAndSearch">

            <nav class="navbar navbar-default" id="hmenu" role="navigation">

              <form class="navbar-form" id="searchForm" role="search" action="#">
                <div class="form-group">
                  <input type="text" name="searchField" class="form-control" id="searchField" placeholder="Search" val="">
                </div>
                <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
              </form>

              <div class="container">
                <ul class="nav navbar-nav" >
                  <li><a href="#main">Home</a></li>
                  <li><a href="#profile">Profile</a></li>
                  <li><a href="#contacts">Contacts</a></li>
                  <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                      Themes <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                      <li id="theme1nav">Theme 1</li>
                      <li id="theme2nav">Theme 2</li>
                      <li id="theme3nav">Theme 3</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>

          </div>

        </div>
      </script>');