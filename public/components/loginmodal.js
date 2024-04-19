window.loginmodal = function() {
    return `
    <!-- Student create account -->
    <div class="modal fade" id="authModalStudentSignUp" aria-hidden="true" aria-labelledby="authModalToggleLabel" >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="authModalToggleLabel">Student Signup - MagicalMeals</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="/auth/signup" class="signupForm" data-role="student" data-type="auth">
              <div class="mb-3">
                <label for="fullname1" class="form-label">FullName:</label>
                <input type="text" class="form-control" id="fullname1" name="name" />
                <div class="button text-danger name_error"></div>
              </div>
              <div class="mb-3">
                <label for="email1" class="form-label">Email:</label>
                <input type="text" class="form-control" id="email1" name="email" />
                <div class="button text-danger email_error"></div>
              </div>
              <div class="mb-3">
                <label for="signupPassword1" class="form-label">Password:</label>
                <input type="password" class="form-control" id="signupPassword1" name="password" />
                <div class="button text-danger password_error"></div>
              </div>
              <div class="mb-3">
                <label for="confirmPassword1" class="form-label">Confirm Password:</label>
                <input type="password" class="form-control" id="confirmPassword1" name="confirmPassword" />
                <div class="button text-danger confirmPassword_error"></div>
              </div>
              <button type="submit" class="btn btn-primary signupbtn">Signup</button>
              <a type="button" class="btn btn-outline-primary" href="/auth/google">SignIn Using CollegeID</a>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary studentlogintrigger">Want to login?</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Student login -->
    <div class="modal fade" id="authModalStudentLogin" aria-hidden="true" aria-labelledby="authModalToggleLabel2" >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="authModalToggleLabel2">Login - Student
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="/auth/login" id="loginFormStudent" data-role="student" data-type="auth">
              <div class="mb-3">
                <label for="loginemail" class="form-label">Email:</label>
                <input type="text" class="form-control" id="loginemail" name="email" />
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">Password:</label>
                <input type="password" class="form-control" id="loginPasswordStudent" name="loginPassword" />
              </div>
              <button type="submit" class="btn btn-primary loginbtn">Login</button>
              <a type="button" class="btn btn-outline-primary" href="/auth/google">SignIn Using CollegeID</a>
              <div class="mt-3 text-danger login_error"></div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary studentsignuptrigger">Signup</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Staff login -->
    <div class="modal fade" id="authModalStaffLogin" aria-hidden="true" aria-labelledby="authModalToggleLabel2" >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="authModalToggleLabel2">Login - Staff
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="/auth/login" id="loginFormStaff" data-role="staff" data-type="auth">
              <div class="mb-3">
                <label for="loginemail2" class="form-label">Email:</label>
                <input type="text" class="form-control" id="loginemail2" name="email" />
              </div>
              <div class="mb-3">
                <label for="loginPassword2" class="form-label">Password:</label>
                <input type="password" class="form-control" id="loginPassword2" name="password" />
              </div>
              <button type="submit" class="btn btn-primary loginbtn">Login</button>
              <button type="button" class="btn btn-outline-primary ownerlogintrigger">Login as Owner</button>
              <div class="login_error text-danger"></div>
            </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
    
    <!-- Owner login -->
    <div class="modal fade" id="authModalOwnerLogin" aria-hidden="true" aria-labelledby="authModalToggleLabel3" >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="authModalToggleLabel3">Login - Canteen Owner
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="/auth/ownerlogin" id="loginFormOwner" data-role="owner" data-type="auth">
              <div class="mb-3">
                <label for="secrettoken" class="form-label">Secret Token:</label>
                <input type="password" class="form-control" id="secrettoken" name="token" />
              </div>
              <button type="submit" class="btn btn-primary loginbtn">Login</button>
            </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
    `
}