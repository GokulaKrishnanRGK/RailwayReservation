import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CancelRoute extends Route {
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
        // model() {
        //     return this.store.findAll('passenger');
        // }

    model() {
        var result;
        $.ajax({
            url: 'http://localhost:8080/railway/user/passengers',
            type: 'get',
            xhrFields: {
                withCredentials: true,
            },
            async: false,
            success: function(data) {
                result = data;
            }
        });
        let passengerList = result.passengers;
        for (var i = 0; i < passengerList.length; i++) {
            this.store.push(this.store.normalize('passenger', passengerList[i]));
        }
        return this.store.peekAll('passenger');
    }
}