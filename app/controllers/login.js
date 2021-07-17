import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
    @tracked errorMessage;
    @service session;

    @action
    async authenticate(e) {
        e.preventDefault();
        let { identification, password } = this;
        try {
            await this.session.authenticate('authenticator:oauth2', identification, password);
        } catch (error) {
            this.errorMessage = 'Invalid Credentials';
        }

        if (this.session.isAuthenticated) {
            this.transitionToRoute('tickets');
        }
    }
}

// import Ember from 'ember';
// import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

// export default Ember.Controller.extend(LoginControllerMixin, {
//   authenticator: 'authenticator:custom'
// });