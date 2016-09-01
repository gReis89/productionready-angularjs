class AuthCtrl {
    constructor(User, $state) {
      'ngInject';

      this._User = User;
      this._$state = $state;

      this.title = $state.current.title;
      this.authType = $state.current.name.replace('app.', '');

    }

    submitForm(){
      this.isSubmitting = true;

      this._User.attemptAuth(this.authType, this.formData).then(
        (res) => {
          this.isSubmitting = false;
          this._$state.go('app.home');
        },
        (err) => {
          this.isSubmitting = false;
          this.errors = err.data.errors;
        }
      );
    }

    logout(){
      this._User.logout();
    }
}

export default AuthCtrl;
