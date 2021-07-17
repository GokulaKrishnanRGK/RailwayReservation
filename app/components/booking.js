import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BookingComponent extends Component {
    @service store

    id = 1;
    bookingDetails = [];

    @action
    addBooking() {
        let booking = { id: this.id, name: "", age: 0, gender: "select" };
        this.store.createRecord('booking', booking);
        this.bookingDetails.pushObject(booking);
        this.id = this.id + 1;
    }

    @action
    removeBooking(element) {
        let dId = element.targer.value;
        let booking = this.store.peekRecord('booking', dId);
        booking.deleteRecord();
        this.bookingDetails.forEach(b => {
            if (b.id == dId) {
                (this.bookingDetails).removeObject(b);
            }
        });
    }



}