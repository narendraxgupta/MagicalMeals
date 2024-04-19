window.navbar = function () {
  return ` 
      <header id="header" class="header fixed-top d-flex align-items-center">
        <div class="container d-flex align-items-center justify-content-between">
          <a class="logo d-flex align-items-center me-auto me-lg-0" href="/">
            <img src="/assets/img/logo.png" alt=""> 
          </a>
    
          <nav id="navbar" class="navbar">
            <ul id="menu-items">
              <li><a href="/">Home</a></li>
              <li><a href="/menu#menu">Menu</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </nav>
    
          <a class="btn btn-info navauthbtn studentlogintrigger">Login</a>
          <i class="mobile-nav-toggle mobile-nav-show bi bi-list  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
          <ul class="dropdown-menu navbardropdown">
          <li><a class="dropdown-item active" href="/">Home</a></li>
          <li><a class="dropdown-item" href="/menu#menu">Menu</a></li>
          <li><a class="dropdown-item" href="/#contact">Contact</a></li>
         </ul>
          <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
        </div>
      </header>
    
      
    
    `;
};
