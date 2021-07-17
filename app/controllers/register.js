import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RegisterController extends Controller {
    @tracked errorMessage;
    @service session;

    @action
    registerUser(e) {
        e.preventDefault();
        if (this.password != this.cnfmpassword) {
            this.errorMessage = "Passwords must match!";
            // document.getElementById("errorMessage").setAttribute("style", "color:red");
            return;
        }
        const json = {
            "userid": this.userid,
            "name": this.username,
            "phoneno": this.phoneno,
            "dob": this.dob,
            "password": this.password
        };
        var result = this.sendRegisterRequest(json);

        if (result == "1") {
            this.errorMessage = "Registration Successful! <br> Redirecting to login...<br>";
            // document.getElementById("errorMessage").setAttribute("style", "color:green");
            setTimeout(function() {
                this.transitionTo('login');
            }, 3000);
        } else if (result == "0") {
            this.errorMessage = "User Exists!";
            // document.getElementById("errorMessage").setAttribute("style", "color:red");
        } else if (result == "-1") {
            this.errorMessage = "Error occured!";
            // document.getElementById("errorMessage").setAttribute("style", "color:red");
        }
    }

    @action
    sendRegisterRequest(json) {
        var result;
        $.ajax({
            url: 'http://localhost:8080/railway/register',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            success: function(data) {
                result = data;
            },
            data: JSON.stringify(json)
        });
        return result;
    }

}