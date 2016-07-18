var React = require('react');
var $ = require('jquery');

var models = require('../models/recipes');
var User = require('../models/user').User;

var LoginComponent = React.createClass({
  getInitialState: function(){
    return {
      hidden: true
    }
  },

  toggle: function(){
    this.setState({hidden: !this.state.hidden});
  },

  userLogin: function(e){
    //console.log('test');
      e.preventDefault();
      var username = $('#username').val();
      var password = $('#password').val();
      var self = this;

      var loggedInUser = User.login(username, password);
      localStorage.setItem('username', username)

      loggedInUser.done(function(response){
        //console.log(username);
        self.props.router.navigate('recipes/', {trigger: true})

      }).fail(function(){

      });
  },

  rememberMe: function(){

  },


  render: function(){
    return (
      <div className="row">
        <div className="login-form col-md-6">
          <h1 className="login-header">Recipe Book</h1>
          <form onSubmit={this.userLogin} id="login">
            <div>
              <label onChange={this.rememberMe} className="login-label" htmlFor="username">Username:</label>
              <input id="username" type="username" placeholder="Username"/>
            </div>
            <div>
              <label className="login-label" htmlFor="password">Password:</label>
              <input id="password" type="password" placeholder="Password"/>
            </div>
            <div >
              <input className="remember-me" type="checkbox"/><span className="remember-me">Remember Me</span>
              <span className="error-message hidden">Username and/or password do not match our records.</span>
            </div>
            <input type="submit" className="login-account btn btn-success" value='Login'/>
          </form>
          <span className="create-or">or</span>
          <a href="#signup/"><button className="create-account btn btn-primary">Create Account</button></a>
        </div>
      </div>
    )
  }
});

var SignUpComponent = React.createClass({
  signup: function(e){
    e.preventDefault();
    var username = $('#signup-username').val();
    var password = $('#signup-password').val();
    var self = this;

    var newUser = new User();
    newUser.set({'username': username, 'password': password});

    console.log(newUser);

    newUser.save().done(function(){
      self.props.router.navigate('login/', {trigger: true})
    }).fail(function(){

    });
  },

  render: function(){
    return (
      <div className="row">
        <div className="sign-up-form col-md-6">
          <h1 className="sign-up-header">Create Account</h1>
          <form onSubmit={this.signup} id="sign-up">
            <div>
              <label className="sign-up-label" htmlFor="signup-username">Username:</label>
              <input id="signup-username" type="username" placeholder="Username"/>
            </div>
            <div>
              <label className="sign-up-label" htmlFor="signup-password">Password:</label>
              <input id="signup-password" type="password" placeholder="Password"/>
            </div>
            <input type="submit" className="sign-up-account btn btn-success" value='Create Account'/>
          </form>
          <a href="#"><button className="back-button btn btn-danger">Back</button></a>
        </div>
      </div>
    )
  }
});

module.exports = {
  'LoginComponent': LoginComponent,
  'SignUpComponent': SignUpComponent
};
