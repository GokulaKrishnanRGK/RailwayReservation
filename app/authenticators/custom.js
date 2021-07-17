import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import $ from 'jquery';

export default Base.extend({
    restore(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.session_name)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },

    authenticate(identification, password) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/railway/user/login',
                data: {
                    username: identification,
                    password: password,
                },
            }).then(
                function(response) {
                    Ember.run(function() {
                        resolve(response);
                    });
                },
                function(xhr, status, error) {
                    Ember.run(function() {
                        reject(xhr.responseJSON || xhr.responseText);
                    });
                }
            );
        });
    },

    invalidate() {
        console.log('invalidate...');

        return new Ember.RSVP.Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/railway/user/logout',
            }).then(
                function(response) {
                    Ember.run(function() {
                        resolve(response);
                    });
                },
                function(xhr, status, error) {
                    Ember.run(function() {
                        reject(xhr.responseJSON || xhr.responseText);
                    });
                }
            );
        });
    },
});