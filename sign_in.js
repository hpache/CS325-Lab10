/*
    File: sign_in.js
    Name: Henry Pacheco Cachon
    Class: CS325, January 2022
    Lab: 10
    Due: 25 January 2022
*/

"use strict";

$(document).ready(function() {

    $("#sign").submit( function(e){

        // Prevent redirect to php file
        e.preventDefault();

        const form = $(this); // Form object
        const actionURL = form.attr('action'); // Geting php url

        // Getting username input
        const username = $("#username").val();
        // Getting password input
        const password = $("#password").val();
        // Getting database input
        const database = $("#database").val();

        // Making ajax request to sign_in.php
        $.ajax({
            type: "POST",
            url: actionURL,
            data: {username: username, password: password, database: database},

            success: function(data){

                // Get the response from sign_in.php
                let json_data = JSON.parse(data);
                // Get the new url stored in the json data 
                let new_url = json_data.url;
                // Delete the url from the json object
                delete json_data.url;
                // Convert json_data to string
                json_data = JSON.stringify(json_data);
                // Put remaining json_data into the new url and redirect to it
                window.location = new_url + "?response=" + encodeURIComponent(json_data);
            }
        })

    });

});