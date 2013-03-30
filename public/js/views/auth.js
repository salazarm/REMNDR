// This view handles static content and is the main view.
// Handles login/logout flow.
App.Views.Auth = Backbone.View.extend({

	_loggedInView: $("#app-template"),
	_loginPage: $("#auth"),
	_loginForm: $("#login-form"),
	_signupForm: $("#signup-form"),
	_loginRelated: $("#login-related"),
	app: $("#app"),
	authForm : null,

	// for login
	_emailField : $("[name=email]"),
	_passwordField : $("[name=password]"),

	// for signup
	_newUserEmailField : $("#user_email"),
	_newUserPasswordField : $("#user_password"),
	_newUserPasswordConfirmationField : $("#user_password_confirmation"),

	events : {
		"click .signup" : "signupView",
		"click .login" : "loginView",
		"click #loginbtn" : "login",
		"click .logout" : "logout",
		"submit form#login-form-f" : "login",
		"submit form#new_user" : "signup"
	},

	initialize : function() {
		App.User.bind('change:loggedIn', this.render, this);
		this.bind('change:authForm', this.render, this);
		this.loginView();
	},

	render : function () {
		this._loginPage.show();
		if (App.User.get("loggedIn")){
			new App.Views.LoggedIn({ model: App.User, el: $("#user-display-container") });
			this._loginRelated.hide();
			$("#app").show();
		} else {
			this.app.hide();
			this._loginRelated.show();
			this._loginPage.show();
			this.authForm.show();
		}
	},

	signupView: function() {
		if (this.authForm != this._signupForm){
			this.authForm = this._signupForm;
			this._loginForm.hide();
			this.render();
		}
	},

	loginView : function() {
		if(this.authForm != this._loginForm){
			this.authForm = this._loginForm;
			this._signupForm.hide();
			this.render();
		}
	},

	login : function(e) {
		e.preventDefault();
		that = this;
		App.User.base = "sessions";
		App.User.save({
				email: this._emailField.val(),
				password: this._passwordField.val(),
			},{
				success: function(model, response, options){
					App.User.set({
						loggedIn: true, 
						password: null,
						email: response.email
					});
				},
				error: function(model, response, options) {
					restoreRailsErrors(response);
					that._emailField.val("");
					that._passwordField.val("");
				}
		});	
	},

	logout : function() {
		App.User.base = "sessions";
		that = this;
		App.User.destroy({
			success: function(model, response, options) {
				App.User.set({
					authenticty_token: null,
					email: null,
					id: null,
					loggedIn: false,
					name: "Not logged in!"
				});
			}
		});
	},

	signup : function(e) {
		e.preventDefault();
		that = this;
		App.User.base = "users";
		App.User.save({
			email: this._newUserEmailField.val(),
			password: this._newUserPasswordField.val(),
			password_confirmation: this._newUserPasswordConfirmationField.val()
		},{
			success : function(model, response, options) {
				App.User.set({
					loggedIn: true,
				});
			},
			error: function(model, response, options) {
				// reconstuct Rails error messages
				restoreRailsErrors(response);
				that._newUserPasswordField.val("");
				that._newUserPasswordConfirmationField.val("");
			}

		});
	}
});