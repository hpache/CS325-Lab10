/*
    File: submit.html
    Name: Henry Pacheco Cachon
    Class: CS325, January 2022
    Lab: 10
    Due: 25 January 2022
*/

$(document).ready( function() {

    // Get query string from the url
    let queryString = decodeURIComponent(window.location.search.split("=")[1]);
    // Convery query string to json object
    let jsonData = JSON.parse(queryString);

    // Get the database name from the json object
    let database = jsonData.database;
    let command_output = $("#command-out > strong");

    // Generate command output
    command_output.html('Database query "use ' + database + '" was successful');

    // When the submit button on the form is pressed..
    $("#submit-mysql-query").submit( function(e){

        // Prevent a redirect to the php file
        e.preventDefault();        

        // Get the current form and actionURL
        let form = $(this);
        let actionURL = form.attr('action');

        // Get the username and password from the json object from the query string
        let username = jsonData.username;
        let password = jsonData.password;
        // Get the query from the textarea input
        let query = $("#query-text").val();
        
        // Check the amount of commands in the query
        let num_commands = query.split(';').length - 1;

        // Only running query if the command starts with select (case insensitive)
        // And if there is only one command (no semicolon)
        if (query.match(/^select/i) && (num_commands==0)){

            // Checking if the limit 10 box is checked
            if ($("#limit")[0].checked){
                query += " limit 10";
            }
            
            // Making an ajax request
            $.ajax({
                type: "POST",
                url: actionURL,
                data: {username: username, password: password, database: database, queryText:query},
                success: function(data){

                    // If the query is successful, then make a table of the results
                    // And update the command output message
                    if (isNaN(data)){
                        command_output.removeClass('error');
                        let json_array = JSON.parse(data);
                        createTable(json_array);
                        command_output.html(`Database query "${query}" was successful!`);
                    }
                    // If the query is not successful, there was an issue with the syntax
                    // Update the command output with the error and make it red
                    else {
                        command_output.addClass('error');
                        command_output.html("Query failed, check syntax!")
                    }
                }
            })
        }

        // If the command does not start with select or if a semicolon was detected 
        // Don't run the command, update the command output with an error message explaining 
        // the possible error and make it red!
        else{
            command_output.addClass('error');
            command_output.html("Query must be a single select query! Note, you cannot put a ; for security reasons!!");
        }


    });

});

// Function creates the table head
function createTableHead(json_array){

    // Create table head
    let tableHead = $('<thead>');

    // Gather column names from a prototype element
    let prototypeElement = json_array[0];

    // Go through each key to create a table head element
    for (key in prototypeElement){
        tableHead.append($('<th>').html(key));
    }

    return tableHead;
}

// Function creates the table rows
function createTableRows(json_array, table){


    // Go through each json element in the json array
    for (let element of json_array){

        // Create table row
        let tableRow = $("<tr>");

        // Go through each entry in the json element
        for (key in element){

            // Getting data
            let data_element = element[key];
            // Creating table data tag
            let table_data = $('<td>');

            // If the element is a number then 
            // add the number css class to it
            if (! isNaN(data_element)){
                table_data.addClass("number");
            }

            // If the element is a word then
            // add the word css class to it
            else{
                table_data.addClass("word");
            }
            
            // Append element data to the current row
            tableRow.append(table_data.html(element[key]));
        }

        // Append the full row to the data table
        table.append(tableRow);
    }


}

// Function creates the table containing the jquery results
function createTable(json_array){

    // Check if there is already a table on the screen
    // If there is, remove it completely
    if ($(document).find('table').length != 0){
        $('table').remove();
    }

    // Create table
    table = $('<table>');
    
    // Add table head to the table
    table.append(createTableHead(json_array));

    // Add the data from the mysql query result
    createTableRows(json_array, table);

    // Add table to html page
    $("#table-container").append(table);
}