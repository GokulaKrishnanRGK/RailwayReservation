import Model, { attr } from '@ember-data/model';

export default class TicketModel extends Model {
  @attr('number') classId;
  @attr('string') className;
  @attr('number') available;
  @attr('number') waiting;
}
