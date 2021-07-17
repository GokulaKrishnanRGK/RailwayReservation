import RESTAdapter from '@ember-data/adapter/rest';

export default class TicketAdapter extends RESTAdapter {
    host = 'http://localhost:8080';
    namespace = 'railway/user';
}