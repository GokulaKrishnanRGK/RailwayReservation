import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
    authorize(jqXHR, requestOptions) {
        requestOptions.contentType = 'application/json;charset=utf-8';
        requestOptions.crossDomain = true;
        requestOptions.xhrFields = {
            withCredentials: true
        };

        if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
            jqXHR.setRequestHeader('X-CSRF-Token', token);
        }
    }
});

// import OAuth2Bearer from 'ember-simple-auth/authorizers/oauth2-bearer';

// export default OAuth2Bearer.extend({});