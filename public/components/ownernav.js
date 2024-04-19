window.navbar = function () {
    return ` 
        <header id="header" class="header fixed-top d-flex align-items-center">
          <div class="container d-flex align-items-center justify-content-between">
            <a class="logo d-flex align-items-center me-auto me-lg-0" href="/">
              <img src="/assets/img/logo.png" alt=""> 
            </a>
      
            <nav id="navbar" class="navbar">
              <ul id="menu-items">
                <li><a href="/managestaff" class="owner-nav-action">Manage Staff</a></li>
                <li><a href="/editablemenu" class="owner-nav-action">Edit Menu</a></li>
                <li><a href="/order/order-request">Order Request</a></li>
                <li><a href="/feedback/getfeedbackpage" >Users Feedback</a></li>
              </ul>
            </nav>
      
            <a class="btn btn-info navauthbtn logoutbtn">Logout</a>
            <i class="mobile-nav-toggle mobile-nav-show bi bi-list  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item active" href="/order/order-request">Order Request</a></li>
            <li><a class="dropdown-item owner-nav-action" href="/editablemenu">Edit Menu</a></li>
            <li><a class="dropdown-item owner-nav-action" href="/managestaff">Manage Staff</a></li>
            <li><a class="dropdown-item" href="/feedback/getfeedbackpage">User Feedback</a></li>
           </ul>
            <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
          </div>
        </header>
      
      `;
  };
  