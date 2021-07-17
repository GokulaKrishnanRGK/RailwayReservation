import Model, { attr } from '@ember-data/model';

export default class BookingModel extends Model {
    @attr('number') id;
    @attr('string') name;
    @attr('number') age;
    @attr('string') gender;
}