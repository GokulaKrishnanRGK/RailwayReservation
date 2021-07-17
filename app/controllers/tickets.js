import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';

export default class TicketsController extends Controller {
    @tracked errorMessage;
    @service session;
    @tracked classChoiceId = 0;

    isClicked = false;

    // @action
    // addTable(e) {
    //     this.classChoiceId = e.target.value;
    //     if (!this.isClicked) {
    //         // var passengerDiv = $("#passengerDiv");
    //         // var table = $('<table cellpadding="10" id="passengerTable"><tr><th></th><th>Name</th><th>Age</th><th>Gender</th><th><input type="button" onclick="addPassenger()" value="Add Passenger" /><br></th></tr></table>');
    //         // passengerDiv.append(table);
    //         // addPassenger();
    //         // isClicked = true;
    //         this.isClicked = true;
    //     }
    // }

    @action
    addpassenger() {
        // $("<PassengerComponent/>").appendTo($('#passengerTable'));
        var passengerTable = $("#passengerTable");
        var row = $('<tr><td></td><td><input type="text" placeholder="Name" name="name"/></td> <td><input type="number" placeholder="Age" name="age"/> </td> <td> </td> <td></td></tr>');
        var gender = $('<select name="gender"><option value="select">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>');
        var remove = $('<input type="button" class="remove" onclick="removepassenger(this)" value="Remove"/>')
        row.children().eq(3).append(gender);
        row.children().eq(4).append(remove);
        row.appendTo(passengerTable);
    }

    @action
    addtable(e) {
        this.classChoiceId = e.target.value;
        console.log(this.classChoiceId);
        if (!this.isClicked) {
            // var passengerDiv = $("#passengerDiv");
            // var table = $('<table cellpadding="10" id="passengerTable"><tr><th></th><th>Name</th><th>Age</th><th>Gender</th><th><input type="button" onclick="addPassenger()" value="Add Passenger" /><br></th></tr></table>');
            // passengerDiv.append(table);
            // this.addpassenger();
            this.isClicked = true;
        }
    }

    @action
    bookTickets() {
        if (this.from == "" || this.to == "" || this.from == this.to) {
            this.errorMessage = "From and To should not be null or the same";
            // document.getElementById("errorMessage").setAttribute("style", "color:red");
            return;
        }
        var json = {};
        json["from"] = this.from;
        json["to"] = this.to;
        json["classId"] = this.classChoiceId;
        var otArr = [];
        var isValid = true;
        var tbl2 = $('#passengerTable tr').each(function(i) {
            if (i > 0) {
                var x = $(this).children();
                var itArr = [];
                var name = x.children().eq(0).val();
                var age = x.children().eq(1).val();
                var gender = x.children().eq(2).val();
                console.log(name);
                console.log(age);
                console.log(gender);
                if (name == "" || age == "" || gender == "select") {
                    this.errorMessage = "Invalid Passenger details";
                    // document.getElementById("errorMessage").setAttribute("style", "color:red");
                    isValid = false;
                    return;
                }
                itArr.push(name)
                itArr.push(age)
                itArr.push(gender)
                otArr.push(itArr);
            }
        })
        if (!isValid) {
            return;
        }
        if (otArr.length == 0) {
            this.errorMessage = "Add atleast 1 passenger";
            // document.getElementById("errorMessage").setAttribute("style", "color:red");
            return;
        }
        json["tickets"] = otArr;
        console.log(json);
        this.errorMessage = "Processing... <br><br>";
        // document.getElementById("errorMessage").setAttribute("style", "color:black");
        var result = this.sendBookingRequest(json);
        if (result == 1) {
            this.errorMessage = "Tickets Booked Successfully! Ticket Details Mailed!";
            // document.getElementById("errorMessage").setAttribute("style", "color:green");
            setTimeout(function() {
                window.location.href = 'tickets';
            }, 3000);
        } else {
            this.errorMessage = "Booking unsuccessfully!";
            // document.getElementById("errorMessage").setAttribute("style", "color:red");
        }
    }

    @action
    sendBookingRequest(json) {
        var isValid;
        $.ajax({
            url: 'http://localhost:8080/railway/user/isValid',
            type: 'post',
            xhrFields: {
                withCredentials: true,
            },
            async: false,
            success: function(data) {
                isValid = data;
            },
            data: {
                'auth_token': this.session.data.authenticated.access_token,
            }
        });
        if (isValid == "0") {
            this.session.invalidate();
            this.transitionToRoute('login');
        }

        var result;
        $.ajax({
            url: 'http://localhost:8080/railway/user/tickets',
            type: 'post',
            async: false,
            success: function(data) {
                result = data;
            },
            error: function(data) {
                result = data;
            },
            data: {
                "tickets": JSON.stringify(json),
                "auth_token": this.session.data.authenticated.access_token
            }
        });
        return result;
    }

}