import Model, { attr } from '@ember-data/model';

export default class PassengerModel extends Model {
    @attr('string') userid;
    @attr('number') bookingId;
    @attr('number') customerId;
    @attr('number') age;
    @attr('number') cost;
    @attr('number') seatNo;
    @attr('number') classId;
    @attr('number') isCancelled;

    @attr('string') name;
    @attr('string') gender;
    @attr('string') status;
    @attr('string') source;
    @attr('string') destination;
    @attr('string') className;
}