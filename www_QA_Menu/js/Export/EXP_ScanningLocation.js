
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var UserId = window.localStorage.getItem("UserID");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var EventType;
var ScanLocation = "";
var CurrentDate;
var html;
//document.addEventListener("pause", onPause, false);
//document.addEventListener("resume", onResume, false);
//document.addEventListener("menubutton", onMenuKeyDown, false);

//function onPause() {

//    HHTLogout();
//}

//function onResume() {
//    HHTLogout();
//}

//function onMenuKeyDown() {
//    HHTLogout();
//}
$(function () {

    OnPageLoad();

});
(function () {
    document.addEventListener("deviceready", OnPageLoad, false);

    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    CurrentDate = m + "/" + d + "/" + y;

})();

var LocationId;

function PutGPno() {

    //if (document.getElementById('chkManual').checked) {
    //    var formattedDate = new Date();
    //    var d = formattedDate.getDate();
    //    if (d.toString().length < Number(2))
    //        d = '0' + d;
    //    var m = formattedDate.getMonth();
    //    m += 1;  // JavaScript months are 0-11
    //    if (m.toString().length < Number(2))
    //        m = '0' + m;
    //    var y = formattedDate.getFullYear();
    //    CurrentDate = m + "/" + d + "/" + y;

    //    var date = 'S' + y.toString() + m.toString() + d.toString();
    //    $('#txtTokenNo').val(date);
    //    $('#txtTokenNo').focus();

    //} else {
    //    clearALL();
    //}

}

function OnPageLoad() {
    var Query = window.location.search;


    if ((Query.split('&')[0].split('=')[1]).toString() == "divGateIn") {
        ScanLocation = "Gate In";
        LocationId = 2;
        EventType = 'I';
    }
    else if ((Query.split('&')[0].split('=')[1]).toString() == "divDockIn") {
        ScanLocation = "Dock In";
        LocationId = 3;
        $("#divGateNo").show();
        EventType = 'I';
    }
    else if ((Query.split('&')[0].split('=')[1]).toString() == "divDockOut") {
        ScanLocation = "Dock Out";
        LocationId = 4;
        EventType = 'O';
    }
    else if ((Query.split('&')[0].split('=')[1]).toString() == "divGateOut") {
        ScanLocation = "Gate Out";
        LocationId = 5;
        EventType = 'O';
    }
    $('#txtScanLoc').val(ScanLocation);
}



function GetLocationScanDetails() {

    $("#divTable").hide();
    $("#divMain").show();
   // $("#spnValMsg").empty();

    clearBeforePopulate();

    $("#btnViewAWB").removeAttr("disabled");
    // $("#btnSave").removeAttr("disabled");

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var TokenNo = $('#txtTokenNo').val();

    if (TokenNo == '') {
        errmsg = "Please enter VCT No.";
        $.alert(errmsg);
        return;
    }
    var inpuXML = '<Root><VCTNo>' + $('#txtTokenNo').val() + '</VCTNo><ScannedNo></ScannedNo><AirportCity>' + AirportCity + '</AirportCity><Culture>en-us</Culture><UserId>' + UserId + '</UserId></Root >';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "VehicleTrackingGet_V3",
            data: JSON.stringify({ 'InputXML': inpuXML }),
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
                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        Status = $(this).find('Status').text();
                        StrMessage = $(this).find('StrMessage').text();
                        if (Status == 'E') {
                            $.alert(StrMessage);
                            $("#btnSave").attr("disabled", "disabled");
                            $("#txtTokenNo").val('');
                            return;
                        } else {
                            $("#btnSave").removeAttr("disabled");
                        }

                    });

                    $(xmlDoc).find('Table2').each(function (index) {

                        $('#divAddTestLocation').empty();
                        html = '';

                        html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                        html += "<thead><tr>";
                        html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>AWB No.</th>";
                        html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>TSP</th>";
                        html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pkgs.</th>";
                        html += "</tr></thead>";
                        html += "<tbody>";

                        var xmlDoc = $.parseXML(str);

                        $(xmlDoc).find('Table2').each(function (index) {

                            var location;
                            var locPieces;

                            AWB = $(this).find('AWBNO').text();
                            TSP = $(this).find('TSP ').text();
                            Pieces = $(this).find('Pieces').text();

                            AddTableAWBDetails(AWB, TSP, Pieces);
                        });

                        html += "</tbody></table>";
                        $('#divAddTestLocation').append(html);
                        if (index == 0) {

                            var outmsg = $(this).find('OutMsg').text()

                            //if (outmsg.length > Number(0)) {
                            //    errmsg = outmsg;
                            //    $.alert(errmsg);
                            //    $("#btnViewAWB").attr('disabled', 'disabled');
                            //    return;
                            //}

                            //else {
                            //$('#txtPieces').val($(this).find('TotPieces').text());
                            //$('#txtWeight').val($(this).find('TotGrWt').text());
                            //$('#txtVehicleNo').val($(this).find('VehicleNo').text());
                            //$('#txtDriverName').val($(this).find('DriverName').text());
                            //$('#txtArea').val($(this).find('Area').text());

                            if ($(this).find('DockNo').text() != '')
                                $('#txtGateNo').val($(this).find('DockNo').text());
                        }


                        // }
                    });


                    $(xmlDoc).find('Table1').each(function (index) {

                        VechileRowID = $(this).find('AWBNo').text();
                        Ship_NPX = $(this).find('AWBNo').text();
                        Ship_ExpWt = $(this).find('AWBNo').text();
                        DRIVER_NAME = $(this).find('AWBNo').text();
                        VEHICLE_NO = $(this).find('AWBNo').text();
                        Area = $(this).find('AWBNo').text();


                        $('#txtPieces').val($(this).find('Ship_NPX').text());
                        $('#txtWeight').val($(this).find('Ship_ExpWt').text());
                        $('#txtVehicleNo').val($(this).find('VEHICLE_NO').text());
                        $('#txtDriverName').val($(this).find('DRIVER_NAME').text());
                        $('#txtArea').val($(this).find('Area').text());

                        if (LocationId == 2) {
                            if ($(this).find('MainGateInStatus').text() == 'true') {
                                $("#btnSave").attr('disabled', 'disabled');
                                $("#spnValMsg").text('Main Gate In already done.').css('color', 'red');
                            } else {
                                $("#spnValMsg").text('');
                            }
                        }

                        if (LocationId == 3) {
                            if ($(this).find('DockInStatus').text() == 'true') {
                                $("#btnSave").attr('disabled', 'disabled');
                                $("#spnValMsg").text('Dock In already done.').css('color', 'red');
                            } else {
                                $("#spnValMsg").text('');
                            }
                        }

                        if (LocationId == 4) {
                            if ($(this).find('DockOutStatus').text() == 'true') {
                                $("#btnSave").attr('disabled', 'disabled');
                                $("#spnValMsg").text('Dock Out already done.').css('color', 'red');
                            } else {
                                $("#spnValMsg").text('');
                            }
                        }

                        if (LocationId == 5) {
                            if ($(this).find('MainGateOutStatus').text() == 'true') {
                                $("#btnSave").attr('disabled', 'disabled');
                                $("#spnValMsg").text('Main Gate Out already done.').css('color', 'red');
                            } else {
                                $("#spnValMsg").text('');
                            }
                        }

                        APIForBindDoorDDL();
                    });

                }
                else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
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

function AddTableAWBDetails(AWBno, TSP, Pieces) {

    html += "<tr>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + AWBno + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + TSP + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + Pieces + "</td>";

    html += "</tr>";

}

function DisplayAWBTable() {
    $("#divAddTestLocation").empty();
    GetLocationScanDetails();
    $("#divMain").hide();
    $("#divTable").show();
}

function DisplayMainDetails() {
    $("#divTable").hide();
    $("#divMain").show();
}


function checkAndSaveByEvent() {
    if (ScanLocation == "Gate In") {
        SaveGateIn();
        return;
    }
    if (ScanLocation == "Gate Out") {
        SaveGateOut();
        return;
    }
    if (ScanLocation == "Dock In") {
        saveDockIn();
        return;
    }
    if (ScanLocation == "Dock Out") {
        saveDockOut();
        return;
    }
}


function SaveGateIn() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var TokenNo = $('#txtTokenNo').val();
    var GateNo = $('#txtGateNo').val();

    if (TokenNo == "") {

        //errmsg = "Please enter Token No";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please enter VCT No.").css('color', 'red');
        return;

    } else {
        $('#spnValMsg').text("");
    }

    //if (GateNo == "") {

    //    errmsg = "Please enter Gate No";
    //    $.alert(errmsg);
    //    return;

    //}

    var inputXML = '<Root><VCTNo>' + $('#txtTokenNo').val() + '</VCTNo><EventType>' + EventType + '</EventType><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId></Root>'

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "SaveVCTGetInOut_V3",
            data: JSON.stringify({
                'InputXML': inputXML,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                var response = response.d;
                //$.alert(response.d);

                var xmlDoc = $.parseXML(response);
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'S') {
                        //$.alert(OutMsg);
                        $('#spnValMsg').text(StrMessage).css('color', 'green');
                        clearALL();
                    }
                    else
                        //$.alert(OutMsg);
                        $('#spnValMsg').text(StrMessage).css('color', 'red');
                });



            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}


function SaveGateOut() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var TokenNo = $('#txtTokenNo').val();
    var GateNo = $('#txtGateNo').val();

    if (TokenNo == "") {

        //errmsg = "Please enter Token No";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please enter VCT No.").css('color', 'red');
        return;

    } else {
        $('#spnValMsg').text("");
    }

    //if (GateNo == "") {

    //    errmsg = "Please enter Gate No";
    //    $.alert(errmsg);
    //    return;

    //}

    var inputXML = '<Root><VCTNo>' + $('#txtTokenNo').val() + '</VCTNo><EventType>' + EventType + '</EventType><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId></Root>'

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "SaveVCTGetInOut_V3",
            data: JSON.stringify({
                'InputXML': inputXML,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                var response = response.d;
                //$.alert(response.d);

                var xmlDoc = $.parseXML(response);
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'S') {
                        //$.alert(OutMsg);
                        $('#spnValMsg').text(StrMessage).css('color', 'green');
                        clearALL();
                    }
                    else
                        //$.alert(OutMsg);
                        $('#spnValMsg').text(StrMessage).css('color', 'red');
                });


            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}

function saveDockIn() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var TokenNo = $('#txtTokenNo').val();
    var GateNo = $('#txtGateNo').val();

    if (TokenNo == "") {

        //errmsg = "Please enter Token No";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please enter VCT No.").css('color', 'red');
        return;

    } else {
        $('#spnValMsg').text("");
    }

    //if (GateNo == "") {

    //    errmsg = "Please enter Gate No";
    //    $.alert(errmsg);
    //    return;

    //}

    var inputXML = '<Root><VCTNo>' + $('#txtTokenNo').val() + '</VCTNo><EventType>' + EventType + '</EventType><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId><Door>' + $('#ddDoor').find("option:selected").text() + '</Door></Root>'

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "SaveVCTStatus_V3",
            data: JSON.stringify({
                'InputXML': inputXML,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                var response = response.d;
                //$.alert(response.d);

                var xmlDoc = $.parseXML(response);
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'S') {
                        //$.alert(OutMsg);
                        $('#spnValMsg').text(StrMessage).css('color', 'green');
                        clearALL();
                    }
                    else
                        //$.alert(OutMsg);
                        $('#spnValMsg').text(StrMessage).css('color', 'red');
                });


            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}

function saveDockOut() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var TokenNo = $('#txtTokenNo').val();
    var GateNo = $('#txtGateNo').val();

    if (TokenNo == "") {

        //errmsg = "Please enter Token No";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please enter VCT No.").css('color', 'red');
        // $('#spnValMsg').text("Please enter VCT No.").css('color', 'red');
        return;

    } else {
        $('#spnValMsg').text("");
    }

    //if (GateNo == "") {

    //    errmsg = "Please enter Gate No";
    //    $.alert(errmsg);
    //    return;

    //}

    var inputXML = '<Root><VCTNo>' + $('#txtTokenNo').val() + '</VCTNo><EventType>' + EventType + '</EventType><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId></Root>'

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "SaveVCTStatus_V3",
            data: JSON.stringify({
                'InputXML': inputXML,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                var response = response.d;
                //$.alert(response.d);

                var xmlDoc = $.parseXML(response);
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'S') {
                        //$.alert(OutMsg);
                        $('#spnValMsg').text(StrMessage).css('color', 'green');
                        clearALL();
                    }
                    else
                        //$.alert(OutMsg);
                        $('#spnValMsg').text(StrMessage).css('color', 'red');
                });


            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}

function clearALL() {
    //$('#txtTokenNo').val('');
    $('#txtAWBNo').val('');
    $('#txtTSPNo').val('');
    $('#txtPieces').val('');
    $('#txtWeight').val('');
    $('#txtVehicleNo').val('');
    $('#txtDriverName').val('');
    $('#txtArea').val('');
    $('#txtGateNo').val('COG');
    $('#txtLocation').val('');
    $('#txtTokenNo').val('');
    $('#txtTokenNo').focus();
    // $('#spnValMsg').text('');
    $('#chkManual').removeAttr('checked');
}

function clearALLOnClick() {
    //$('#txtTokenNo').val('');
    $('#txtAWBNo').val('');
    $('#txtTSPNo').val('');
    $('#txtPieces').val('');
    $('#txtWeight').val('');
    $('#txtVehicleNo').val('');
    $('#txtDriverName').val('');
    $('#txtArea').val('');
    $('#txtGateNo').val('COG');
    $('#txtLocation').val('');
    $('#txtTokenNo').val('');
    $('#txtTokenNo').focus();
    $('#spnValMsg').text('');
    $('#chkManual').removeAttr('checked');
   // $('#ddDoor').val('-1');
    $('#ddDoor').empty();
    
}

function clearBeforePopulate() {
    $('#txtAWBNo').val('');
    $('#txtTSPNo').val('');
    $('#txtPieces').val('');
    $('#txtWeight').val('');
    $('#txtVehicleNo').val('');
    $('#txtDriverName').val('');
    $('#txtZone').val('');
    $('#txtGateNo').val('COG');
    $('#txtLocation').val('');
}

function APIForBindDoorDDL() {

    flagclear = 'a';
    localStorage.removeItem('_vctno');
    localStorage.removeItem('_Door');




    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //  $('#spnErrormsg').text('');
    if ($('#txtTokenNo').val() == '') {
        //errmsg = "Please scan/enter AWB No.";
        //$.alert(errmsg);
        return;
    }
    InputXML = '<Root><VCTNo>' + $('#txtTokenNo').val() + '</VCTNo><ScannedNo></ScannedNo><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetVCTDetails",
            data: JSON.stringify({ 'InputXML': InputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;
                var DOORforbind;
                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);

                    $('#ddDoor').empty();
                    var DOOR;
                    $(xmlDoc).find('Table1').each(function () {
                        DOOR = $(this).find('DOOR').text();
                       
                    });

                    $(xmlDoc).find('Table2').each(function () {
                        Code = $(this).find('Code').text();
                        Name = $(this).find('Name').text();

                        var newOption = $('<option></option>');
                        newOption.val(Code).text(Name);
                        newOption.appendTo('#ddDoor');
                        $('#ddDoor').val(DOOR)
                    });



                    //$(xmlDoc).find('Table').each(function () {
                    //    var Status = $(this).find('Status').text();
                    //    var StrMessage = $(this).find('StrMessage').text();

                    //    if (Status == 'S') {
                    //        //$.alert(OutMsg);
                    //        $('#spnValMsg').text(StrMessage).css('color', 'green');
                          
                    //    }
                    //    else
                    //        //$.alert(OutMsg);
                    //        $('#spnValMsg').text(StrMessage).css('color', 'red');

                    //});
                }
                else {
                    errmsg = 'VT No. does not exists';
                    // $.alert(errmsg);
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




