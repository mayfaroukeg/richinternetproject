/**
 * Created by NSCC Student on 4/10/2017.
 */





$(document).ready(function() {


    $.ajax({
            url: "http://localhost:3000/foods",
            type: "GET",
            dataType: 'jsonp',
            async: false,
            contentType: "application/json; charset=utf-8",

            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            },
            success: function (data) {

                var table = $("#table");

                var i = 0;
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var ID = data[i].id;
                        var cals = data[i].cals;
                        table.append("<tbody id='oldTable'><tr id='old'><td>" + data[i].name +

                            "</td><td id='body'> <div><input type='checkbox' data='" + data[i].cals + "' class='chk'  value= '2' ><label for='chk'>" + data[i].cals + "</label></div>" +

                            "</td><td id='body'> <div><input type='checkbox' data='" + data[i].fats+ "' class='chk'  value= '2' ><label for='chk'>" + data[i].fats + "</label></div>" +

                            "</td><td><button class='btn btn-secondary' onclick='myfunction(\"" + ID + "\")' >" +
                            "delete </button> </td>" +
                            "<td><button class='btn btn-secondary' id='update' onclick='updatefunction(\"" + ID + "\")' >" +
                            "update </button> </td>" +
                            "</tr></tbody>");

                        $("#title").click(function () {
                            $("#body").toggle();
                        });

                    }
                }
            }
        }
    );
    function validateForm() {
        var x = document.forms["myForm"]["name"].value;
        if (x == "") {
            alert("Name must be filled out");
            return true;
        }
    }


    if (validateForm()) {
        $("#buttons").click(function() {

            var name= document.getElementById("name").value;
            var calorie= document.getElementById("calorie").value ;
            var fat= document.getElementById("fat").value ;




            var sendInfo = {

                name: name,
                cals:  calorie,
                fats: fat,


            };
            $.ajax({

                type: "POST",
                url: "http://localhost:3000/foods",
                dataType: "json",
                success: function (msg) {
                    if (msg) {
                        alert("title" + name + " was added in list !");
                        location.reload(true);
                    } else {
                        alert("Cannot add to list !");
                    }
                },

                data: sendInfo
            });

        });




    };

});









function myfunction(ID) {
    // var deleteButtons = document.getElementsByTagName('button');

    //   for( var i = 1; i < deleteButtons.length; i++ ) {
    //   deleteButtons[i].onclick = new Function(


    $.ajax({

        type: "DELETE",
        url: "http://localhost:3000/foods/"+ID,
        dataType: "json",
        success: function (msg) {
            if (msg) {
                alert("article was deleted !");
                location.reload(true);
            } else {
                alert("Cannot delete!");
            }
        },


    })

    //    );
    //   }
};


function updatefunction(ID) {
    // var deleteButtons = document.getElementsByTagName('button');

    //   for( var i = 1; i < deleteButtons.length; i++ ) {
    //   deleteButtons[i].onclick = new Function(
    var date = new Date();


    var name= document.getElementById("name").value;
    var calorie= document.getElementById("calorie").value ;
    var fat= document.getElementById("fat").value ;

    var sendInfo = {
        name: name,
        cals:  calorie,
        fats: fat,

    };
    var xhr = $.ajax({

        type: "PUT",
        url: "http://localhost:3000/foods/"+ID,
        dataType: "json",
        success: function (response) {
            if (response) {
                alert("article was updated");

                location.reload(true);
            } else {
                alert("Cannot update!");
            }
        },

        data: sendInfo
    })

    //    );
    //   }
};


function sortDescFat() {
    var table= document.getElementById("table");
    table.innerHTML="";
    var newtable= document.getElementById("newtable");
    newtable.innerHTML="";

    var HTML="<thead><tr>";
    HTML += "<th data-defaultsign='AZ'> Name</th>";
    HTML+="<th data-defaultsign='AZ' onClick='sortAscCal()'> Calories</th>";
    HTML+="<th data-defaultsign='AZ' onClick='sortAscFat()'>Fats</th>";
    HTML+="<th data-defaultsign='AZ'> Modify</th>";
    HTML += "</tr>";
    HTML +="</thead>";
    HTML += "<tbody >";
    HTML += "</tbody>";

    //newtable.append(HTML);
    $("#newtable").append(HTML);


    $.ajax({
            url: "http://localhost:3000/foods/?_sort=fats&_order=DESC",
            type: "GET",
            dataType: 'jsonp',
            async: false,
            contentType: "application/json; charset=utf-8",

            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            },
            success: function (data) {

                var table = $("#newtable");

                var i = 0;
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var ID = data[i].id;
                        var cals = data[i].cals;
                        table.append("<tr><td id='id'>" + data[i].name +

                            "</td><td id='body'> <div><input type='checkbox' data='" + data[i].cals + "' class='chk'  value= '2' ><label for='chk'>" + data[i].cals + "</label></div>" +

                            "</td><td id='body'> <div><input type='checkbox' data='" + data[i].fats+ "' class='chk'  value= '2' ><label for='chk'>" + data[i].fats + "</label></div>" +

                            "</td><td><button class='btn btn-secondary' onclick='myfunction(\"" + ID + "\")' >" +
                            "delete </button> </td>" +
                            "<td><button class='btn btn-secondary' id='update' onclick='updatefunction(\"" + ID + "\")' >" +
                            "update </button> </td>" +
                            "</tr>")
                        ;

                        $("#title").click(function () {
                            $("#body").toggle();
                        });

                    }
                }
            }
        }
    );

    return false
};

function sortDescCal() {
    var table= document.getElementById("table");
    table.innerHTML="";
    var newtable= document.getElementById("newtable");
    newtable.innerHTML="";

    var HTML="<thead><tr>";
    HTML += "<th data-defaultsign='AZ'> Name</th>";
    HTML+="<th data-defaultsign='AZ' onClick='sortAscCal()'> Calories</th>";
    HTML+="<th data-defaultsign='AZ' onClick='sortAscFat()'>Fats</th>";
    HTML+="<th data-defaultsign='AZ'> Modify</th>";
    HTML += "</tr>";
    HTML +="</thead>";
    HTML += "<tbody >";
    HTML += "</tbody>";

    //newtable.append(HTML);
    $("#newtable").append(HTML);


    $.ajax({
            url: "http://localhost:3000/foods/?_sort=cals&_order=DESC",
            type: "GET",
            dataType: 'jsonp',
            async: false,
            contentType: "application/json; charset=utf-8",

            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            },
            success: function (data) {

                var table = $("#newtable");

                var i = 0;
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var ID = data[i].id;
                        var cals = data[i].cals;
                        table.append("<tr><td id='id'>" + data[i].name +

                            "</td><td id='body'> <div><input type='checkbox' data='" + data[i].cals + "' class='chk'  value= '2' ><label for='chk'>" + data[i].cals + "</label></div>" +

                            "</td><td id='body'> <div><input type='checkbox' data='" + data[i].fats+ "' class='chk'  value= '2' ><label for='chk'>" + data[i].fats + "</label></div>" +

                            "</td><td><button class='btn btn-secondary' onclick='myfunction(\"" + ID + "\")' >" +
                            "delete </button> </td>" +
                            "<td><button class='btn btn-secondary' id='update' onclick='updatefunction(\"" + ID + "\")' >" +
                            "update </button> </td>" +
                            "</tr>")
                        ;

                        $("#title").click(function () {
                            $("#body").toggle();
                        });

                    }
                }
            }
        }
    );

    return false
};
function sortAscFat() {
    var table= document.getElementById("table");
    table.innerHTML="";
    var newtable= document.getElementById("newtable");
    newtable.innerHTML="";

    var HTML="<thead><tr>";
    HTML += "<th data-defaultsign='AZ'> Name</th>";
    HTML+="<th data-defaultsign='AZ' onClick='sortDescCal()'> Calories</th>";
    HTML+="<th data-defaultsign='AZ' onClick='sortDescFat()'>Fats</th>";
    HTML+="<th data-defaultsign='AZ'> Modify</th>";
    HTML += "</tr>";
    HTML +="</thead>";
    HTML += "<tbody >";
    HTML += "</tbody>";

    //newtable.append(HTML);
    $("#newtable").append(HTML);


    $.ajax({
            url: "http://localhost:3000/foods/?_sort=fats&_order=ASC",
            type: "GET",
            dataType: 'jsonp',
            async: false,
            contentType: "application/json; charset=utf-8",

            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            },
            success: function (data) {

                var table = $("#newtable");

                var i = 0;
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var ID = data[i].id;
                        var cals = data[i].cals;
                        table.append("<tr><td id='id'>" + data[i].name +

                            "</td><td id='body'> <div><input type='checkbox' data='" + data[i].cals + "' class='chk'  value= '2' ><label for='chk'>" + data[i].cals + "</label></div>" +

                            "</td><td id='body'> <div><input type='checkbox' data='" + data[i].fats+ "' class='chk'  value= '2' ><label for='chk'>" + data[i].fats + "</label></div>" +

                            "</td><td><button class='btn btn-secondary' onclick='myfunction(\"" + ID + "\")' >" +
                            "delete </button> </td>" +
                            "<td><button class='btn btn-secondary' id='update' onclick='updatefunction(\"" + ID + "\")' >" +
                            "update </button> </td>" +
                            "</tr>")
                        ;

                        $("#title").click(function () {
                            $("#body").toggle();
                        });

                    }
                }
            }
        }
    );

    return false
};



function sortAscCal() {
    var table= document.getElementById("table");
    table.innerHTML="";
    var newtable= document.getElementById("newtable");
    newtable.innerHTML="";

    var HTML="<thead><tr>";
    HTML += "<th data-defaultsign='AZ'> Name</th>";
    HTML+="<th data-defaultsign='AZ' onClick='sortDescCal()'> Calories</th>";
    HTML+="<th data-defaultsign='AZ' onClick='sortDescFat()'>Fats</th>";
    HTML+="<th data-defaultsign='AZ'> Modify</th>";
    HTML += "</tr>";
    HTML +="</thead>";
    HTML += "<tbody >";
    HTML += "</tbody>";

    //newtable.append(HTML);
    $("#newtable").append(HTML);


    $.ajax({
            url: "http://localhost:3000/foods/?_sort=cals&_order=ASC",
            type: "GET",
            dataType: 'jsonp',
            async: false,
            contentType: "application/json; charset=utf-8",

            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            },
            success: function (data) {

                var table = $("#newtable");

                var i = 0;
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var ID = data[i].id;
                        var cals = data[i].cals;
                        table.append("<tr><td id='id'>" + data[i].name +

                            "</td><td id='body'> <div><input type='checkbox' data='" + data[i].cals + "' class='chk'  value= '2' ><label for='chk'>" + data[i].cals + "</label></div>" +

                            "</td><td id='body'> <div><input type='checkbox' data='" + data[i].fats+ "' class='chk'  value= '2' ><label for='chk'>" + data[i].fats + "</label></div>" +

                            "</td><td><button class='btn btn-secondary' onclick='myfunction(\"" + ID + "\")' >" +
                            "delete </button> </td>" +
                            "<td><button class='btn btn-secondary' id='update' onclick='updatefunction(\"" + ID + "\")' >" +
                            "update </button> </td>" +
                            "</tr>")
                        ;

                        $("#title").click(function () {
                            $("#body").toggle();
                        });

                    }
                }
            }
        }
    );

    return false
};


/* if the page has been fully loaded we add two click handlers to the button */
$(document).ready(function () {
    /* Get the checkboxes values based on the class attached to each check box */
    $("#buttonClass").click(function() {
        getValueUsingClass();
    });


});

function getValueUsingClass(){
    /* declare an checkbox array */
    var chkArray = [];

    /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
    $(".chk:checked").each(function() {

        var element=parseInt(this.getAttribute("data"));

        chkArray.push(element);

    });





    selected = chkArray.reduce(function(a, b) {

        var x= parseInt(a) + parseInt(b);
        return x;
    }, 0);





    /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
    if(selected > 1){

        total=document.getElementById("total");
        total.innerHTML= (" total value is "+ selected);

    }else{
        alert("Please at least one of the checkbox");
    }
}






