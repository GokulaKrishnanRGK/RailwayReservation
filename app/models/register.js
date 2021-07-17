import Model, { attr } from '@ember-data/model';

export default class RegisterModel extends Model {
    @attr('number') phoneno;
    @attr('string') userid;
    @attr('string') name;
    @attr('date') dob;
    @attr('string') password;
    @attr('string') cnfmpassword;
}