window.staffsignupmodal = function (){
    return `
    <!-- Staff create account -->
    <div class="modal fade" id="authModalStaffSignUp" aria-hidden="true" aria-labelledby="authModalToggleLabel4">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="authModalToggleLabel4">Add a staff
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="/auth/addstaff" class="signUpFormStaff" data-role="staff">
              <div class="mb-3">
                <label for="fullnameStaff" class="form-label">FullName:</label>
                <input type="text" class="form-control" id="fullnameStaff" name="name" />
                <div class="button text-danger name_error"></div>
              </div>
              <div class="mb-3">
                <label for="emailStaff" class="form-label">Email:</label>
                <input type="text" class="form-control" id="emailStaff" name="email" />
                <div class="button text-danger email_error"></div>
              </div>
              <div class="mb-3">
                <label for="signupPasswordStaff" class="form-label">Password:</label>
                <input type="password" class="form-control" id="signupPasswordStaff" name="password" />
                <div class="button text-danger password_error"></div>
              </div>
              <div class="mb-3">
                <label for="confirmPasswordStaff" class="form-label">Confirm Password:</label>
                <input type="password" class="form-control" id="confirmPasswordStaff" name="confirmPassword" />
                <div class="button text-danger confirmPassword_error"></div>
              </div>
              <button type="submit" class="btn btn-primary signupbtn">Signup</button>
              <div class="login_error text-danger"></div>
            </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>


    `
}