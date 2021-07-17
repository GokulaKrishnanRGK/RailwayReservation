import EmberRouter from '@ember/routing/router';
import config from 'railwayreservation-ui/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login', { path: '/' });
  this.route('register');
  this.route('login');
  this.route('tickets');
  this.route('passengers');
  this.route('cancel');
  // this.route('authenticated', { path: '' }, function () {
  //   // all routes that require the session to be authenticated
  //   this.route('tickets');
  //   this.route('passengers');
  //   this.route('cancel');
  // });
  this.route('logout');
});
