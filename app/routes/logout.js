import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LogoutRoute extends Route {
    @service session;
    beforeModel(transition) {
        var result;
        $.ajax({
            url: 'http://localhost:8080/railway/user/logout',
            type: 'get',
            xhrFields: {
                withCredentials: true,
            },
            async: false,
            success: function(data) {
                result = data;
            },
            error: function(data) {
                result = data;
            }
        });
        this.session.invalidate();
        this.transitionTo('login');
    }

    // async function postData(url = 'http://localhost:8080/railway/user/logout', data = {}) {
    //     // Default options are marked with *
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         mode: 'cors', // no-cors, *cors, same-origin
    //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: 'same-origin', // include, *same-origin, omit
    //         headers: {
    //             'Content-Type': 'application/json'
    //                 // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         redirect: 'follow', // manual, *follow, error
    //         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     });
    // }
}