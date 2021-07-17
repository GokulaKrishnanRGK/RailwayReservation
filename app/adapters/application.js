// app/adapters/application.js
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
    @service session;

    @computed('session.{data.authenticated.access_token,isAuthenticated}')
    get headers() {
        let headers = {};
        if (this.session.isAuthenticated) {
            // OAuth 2
            headers[
                'Authorization'
            ] = `${this.session.data.authenticated.access_token}`;
        }
        return headers;
    }
}