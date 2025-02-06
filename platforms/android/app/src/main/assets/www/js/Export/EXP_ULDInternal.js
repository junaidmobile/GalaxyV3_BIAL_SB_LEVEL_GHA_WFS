
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var UserId = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var TotPackages;
var OldLocationId;
var OldLocationPieces;
var strXmlStore;
var locPieces;
var html;
var Flight_SeqNo
var ULD_SeqNo
var location
var LocationID
var availableLoc = [];
var availableID = [];
$(function () {
    GetETVLocation();

    if (window.localStorage.getItem("RoleExpIntlMvmt") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    //$('#txtScanID').keypress(function (event) {
    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        $('body').mLoading({
    //            text: "Please Wait..",
    //        });
    //        if ($("#txtScanID").val() == '') {
    //            $("body").mLoading('hide');
    //            errmsg = "Please Scan No.</br>";
    //            $.alert(errmsg);
    //            return;
    //        } else {

    //        //    <Root><ULDNo>AKE12346BA</ULDNo><AirportCity>DEL</AirportCity><UserID>1</UserID></Root>

    //            GetETVULDDetails();
    //        }
    //    }
    //    //Stop the event from propogation to other handlers
    //    //If this line will be removed, then keypress event handler attached 
    //    //at document level will also be triggered
    //    event.stopPropagation();
    //});

});

function SaveShipmentInternalMovement() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var ULDNo = $('#txtScanID').val();
    var FromLoc = $('#txtFromLocation').val().toUpperCase();
    var newLocCode = $('#txtNewLocation').val().toUpperCase();
    if (FromLoc == "") {
        var oldLocCode = "";
        var oldETVLocCode = "";
    } else {
        var oldLocCode = FromLoc;
        var oldETVLocCode = LocationID;
    }

    let ticketData = availableID.reduce((result, value, index) => {
        console.log(result);
        result[value] = availableLoc[index];
        return result;
    }, {});

    //   console.log(ticketData);

    for (const key in ticketData) {
        if (ticketData[key] == newLocCode) {
            var newLocCodeID = key;
            console.log(key);
        }
        // console.log(`${key} => ${ticketData[key]}`);
    }

    // let index = availableLoc.indexOf(newLocCode);

    // var newLocCodeID =index+1;

    if (ULDNo == "") {

        errmsg = "Please enter Scan Id.</br>";
        $.alert(errmsg);
        return;

    }

    if ($('#txtNewLocation').val() == "") {

        errmsg = "Please enter new location</br>";
        $.alert(errmsg);
        return;

    }

    _InputXML = "<Root><ULDSeqNo>" + ULD_SeqNo + "</ULDSeqNo><AirportCity>" + AirportCity + "</AirportCity><UserID>" + UserId + "</UserID><LocationCode>" + newLocCode + "</LocationCode><ETVLocationID>" + newLocCodeID + "</ETVLocationID><OldLocationCode>" + oldLocCode + "</OldLocationCode><OldETVLocationID>" + oldETVLocCode + "</OldETVLocationID><Flight_SeqNo>" + Flight_SeqNo + "</Flight_SeqNo></Root>";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "/UpdateULDLocation",
            data: JSON.stringify({ "InputXML": _InputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response, xhr, textStatus) {
                //console.log(response.d);
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {
                    $("#btnDiv").show('slow');
                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        Status = $(this).find('Status').text();
                        StrMessage = $(this).find('OutMsg').text();
                        if (Status == 'E') {
                            $.alert(StrMessage);

                        } else {
                            $.alert(StrMessage);
                        }
                    });
                    GetETVULDDetails();
                    $('#txtNewLocation').val('');
                } else {
                    $("body").mLoading('hide');
                    //errmsg = "WDO No. not found</br>";
                    //$.alert(errmsg);
                    //return;
                }
            },

            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}





function GetETVLocation() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    _InputXML = "<Root><LocationCode></LocationCode></Root>";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "/GetETVLocation",
            data: JSON.stringify({ "InputXML": _InputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d;
                console.log(str)
                strXmlStore = str;

                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);



                    availableLoc.length = 0;
                    availableID.length = 0;
                    $(xmlDoc).find('Table').each(function (index) {
                        availableLoc.push($(this).find('LocationCode').text());
                        availableID.push($(this).find('RowID').text());
                    });


                    autocomplete(document.getElementById("txtNewLocation"), availableLoc);
                    // $("#txtNewLocation").autocomplete({
                    //     source: availableLoc,
                    //     minLength: 1,
                    //     select: function (event, ui) {

                    //         log(ui.item ?
                    //             "Selected: " + ui.item.label :
                    //             "Nothing selected, input was " + this.value);
                    //     },
                    //     open: function () {
                    //         $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                    //     },
                    //     close: function () {
                    //         $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                    //     }
                    // });


                }
                else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = (msg.responseText);
                // $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}



function GetETVULDDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    if ($("#txtScanID").val() == '') {
        //errmsg = "Please enter valid AWB No.";
        //$.alert(errmsg);
        return;
    }
    //  _InputXML = "Root><ULDNo>AKE12346BA</ULDNo><AirportCity>DEL</AirportCity><UserID>1</UserID></Root>";
    HideLoader();
    var ULDNo = $("#txtScanID").val();
    var inputxml = "<Root><ULDNo>" + ULDNo + "</ULDNo><AirportCity>" + AirportCity + "</AirportCity><UserID>" + UserId + "</UserID></Root>"
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "/GetETVULDDetails",
            data: JSON.stringify({ "InputXML": inputxml }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d;
                console.log("str =", str)
                strXmlStore = str;

                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        Status = $(this).find('Status').text();
                        StrMessage = $(this).find('OutMsg').text();
                        if (Status == 'E') {
                            $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                        } else {
                            $(".ibiSuccessMsg").text('');
                        }
                        if ($(this).find('LocCode').text() != '') {
                            $.alert($(this).find('LocCode').text());
                            return;
                        }
                        $("#txtNOG").val($(this).find('nog').text());
                        $("#txtUldNo").val($(this).find('ULDNo').text());
                        var LocationStatusColor = ($(this).find('LocationStatusColor').text());
                        $("#statusULD").text($(this).find('LocationStatus').text()).css({ 'color': "" + LocationStatusColor + "" });
                        $("#txtOrigin").val($(this).find('Origin').text());
                        $("#txtDestination").val($(this).find('Destination').text());

                        $("#txtFlightNo").val($(this).find('Flight_No').text());
                        $("#txtFlightDate").val($(this).find('FlightDateTime').text());
                        // $("#txtFromLocation").text($(this).find('Location').text());
                        $("#txtFromLocation").val($(this).find('Location').text());

                        Flight_SeqNo = ($(this).find('Flight_SeqNo').text());
                        ULD_SeqNo = ($(this).find('ULD_SeqNo').text());
                        LocationID = ($(this).find('LocationID').text());


                        // var newOption = $('<option></option>');
                        // newOption.val(EWRval).text(EWRno);
                        // newOption.appendTo('#ddlEWRno');

                    });
                    $("#txtNewLocation").focus();
                }
                else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                // $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}



function clearALL() {
    $('#txtAWBNo').val('');
    $('#txtFromLocation').val('');
    $('#txtTotalPkg').val('');
    $('#txtMovePackages').val('');
    $('#txtNewLocation').val('');
    $('#divAddTestLocation').empty();

    $('#ddlEWRno').empty();
    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtAWBNo').focus();
    $('#txtScanID').val('');
    $('#txtUldNo').val('');
    $('#statusULD').text('');
    $('#txtFlightNo').val('');
    $('#txtFlightDate').val('');
    $(".ibiSuccessMsg").text('');

}

function clearBeforePopulate() {
    $('#txtFromLocation').val('');
    $('#txtTotalPkg').val('');
    $('#txtMovePackages').val('');
    $('#txtNewLocation').val('');

    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtCommodity').val('');
    $('#txtTotalPkg').val('');
    $('#txtLoader').val('');

    $('#divAddLocation').empty();
    html = '';
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function log(message) {
    $("<div>").text(message).prependTo("#log");
    $("#log").scrollTop(0);
}

function clearMsg() {

    $(".ibiSuccessMsg").text('');
}

function checkLocation() {

    var newLocCode = $('#txtNewLocation').val().toUpperCase();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (newLocCode == "") {
        $(".ibiSuccessMsg").text('');
        return;
    }


    _InputXML = "<Root><LocationCode>" + newLocCode + "</LocationCode></Root>";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "/VerifyETVLocation",
            data: JSON.stringify({ "InputXML": _InputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response, xhr, textStatus) {
                //console.log(response.d);
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {
                    $("#btnDiv").show('slow');
                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        Status = $(this).find('Status').text();
                        StrMessage = $(this).find('OutMsg').text();
                        if (Status == 'E') {
                            $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                        } else {
                            $(".ibiSuccessMsg").text('');
                            SaveShipmentInternalMovement();
                        }
                    });

                } else {
                    $("body").mLoading('hide');
                    //errmsg = "WDO No. not found</br>";
                    //$.alert(errmsg);
                    //return;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $("body").mLoading('hide');
                //alert('Server not responding...');
                console.log(xhr.responseText);
                alert(xhr.responseText);
            }
        });
    }
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        var styleId = this.id + "autocomplete-list";

        // $("#"+styleId).css({'font-size': '20px','font-weight': 'bold','position': 'fixed','z-index': '1'});
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = arr[i].substr(0, val.length);
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}