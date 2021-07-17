import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default class TicketsRoute extends Route {
    @service session;

    beforeModel(transition) {
        this.session.requireAuthentication(transition, 'login');
        var result;
        $.ajax({
            url: 'http://localhost:8080/railway/user/isValid',
            type: 'get',
            xhrFields: {
                withCredentials: true,
            },
            async: false,
            success: function(data) {
                result = data;
            }
        });
        if (result == "0") {
            this.session.invalidate();
            this.transitionTo('login');
        }
    }
    model() {
        return this.store.findAll('ticket');
    }

}