// import Base from 'ember-simple-auth/authorizers/base';

// export default Base.extend({
//   authorize(/*data, block*/) {},
// });

import OAuth2Bearer from 'ember-simple-auth/authorizers/oauth2-bearer';

export default OAuth2Bearer.extend({

    // authorize(xhr) {
    //     // let { access_token } = this.get('session.data.authenticated');
    //     // console.log(access_token);
    //     xhr.setRequestHeader('Authorization', `Bearer gokulshyam567@gmail.com}`);
    //     if (isPresent(access_token)) {
    //         alert("Here");
    //         xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
    //     }
    // }

    authorize(jqXHR, requestOptions) {
        requestOptions.contentType = 'application/json;charset=utf-8';
        requestOptions.crossDomain = true;
        requestOptions.xhrFields = {
            withCredentials: true
        };

        if (this.get('session.isAuthenticated')) {
            jqXHR.setRequestHeader('X-CSRF-Token', "1234");
        }
    }
});