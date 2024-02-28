

var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");

var UserId = window.localStorage.getItem("UserID");
var html;
var LocationRowID;
var AWBRowID;
var HAWBId;
var inputRowsforLocation = "";
var _ULDFltSeqNo;
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

    if (window.localStorage.getItem("RoleIMPFinalDelivery") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }


    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var t = formattedDate.getTime();
    var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    $('#txtFlightDate').val(newDate);

    //var h = date.getHours();
    //var m = date.getMinutes();
    //var s = date.getSeconds();

});


function checkLocation() {
    var location = $('#txtLocation').val();
    if (location == "") {
        //errmsg = "Please scan/enter location.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter location.').css({ 'color': 'red' });

        return;
    } else {
        $('#txtSacnULD').focus();
        $("#spnMsg").text('');
    }
}

function GetImportULDList() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    $('#txtScanFlight').val('');

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();
    var location = $('#txtLocation').val();
    var txtSacnULD = $('#txtSacnULD').val();

    if (location == "") {
        //errmsg = "Please scan/enter location.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter location.').css({ 'color': 'red' });

        return;
    } else {
        $("#spnMsg").text('');
    }

    if (txtSacnULD == "") {
        //errmsg = "Please scan/enter ULD No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter ULD No.').css({ 'color': 'red' });

        return;
    } else {
        $("#spnMsg").text('');
    }

    // var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';
    //var inputXML = '<Root><ULDNo></ULDNo><FlightAirline></FlightAirline><FlightNo></FlightNo><FlightDate></FlightDate><AirportCity>MPM</AirportCity><UserId>1</UserId><LocCode>LOC11</LocCode></Root>';

    var inputXML = '<Root><ULDNo>' + txtSacnULD + '</ULDNo><FlightAirline></FlightAirline><FlightNo></FlightNo><FlightDate></FlightDate><AirportCity>BUD</AirportCity><UserId>1</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetImportULDList",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $('#tblNewsForGatePass').html('');
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {


                    var Status = $(this).find('Status').text();

                    var StrMessage = $(this).find('StrMessage').text()
                    var TxtColor = $(this).find('TxtColor').text()


                    if (Status == 'E') {
                        $("#spnMsg").text('');
                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        //$('#divULDNumberDetails').empty();
                        //$('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    }

                    //var status = $(this).find('Status').text();

                    //var StrMessage = $(this).find('StrMessage').text()
                    //var TxtColor = $(this).find('TxtColor').text()

                    //$("#spnMsg").text(StrMessage).css({ 'color': TxtColor });

                    //if (status == 'E') {
                    //    $.alert($(this).find('StrMessage').text());
                    //    return;
                    //}
                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });

                $(xmlDoc).find('Table1').each(function (index) {


                    ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                    FlightAirline = $(this).find('FlightAirline').text();
                    FlightNo = $(this).find('FlightNo').text();
                    FlightDate = $(this).find('FlightDate').text();
                    ButtonStatus = $(this).find('ButtonStatus').text();

                    $('#txtFlightPrefix').val(FlightAirline);
                    $('#txtFlightNo').val(FlightNo);


                    var newdate = FlightDate.split("-").reverse().join("-");

                    $('#txtFlightDate').val(newdate);

                    if (ButtonStatus == 'A') {
                        $("#btnScanAccpt").removeAttr('disabled');
                    }

                });

                $(xmlDoc).find('Table2').each(function (index) {


                    _ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                    ULDNo = $(this).find('ULDNo').text();
                    txtColor = $(this).find('txtColor').text();
                    ButtonStatus = $(this).find('ButtonStatus').text();


                    if (ButtonStatus == 'A') {
                        $("#btnScanAccpt").removeAttr('disabled');
                    } else if (ButtonStatus == 'D') {
                        $("#btnScanAccpt").attr('disabled', 'disabled');
                        $("#spnMsg").text('ULD No. does not exist.').css({ 'color': 'red' });

                        // $.alert('ULD does not exist.');
                    } else {
                        $("#spnMsg").text('');
                    }

                });



            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}


function GetImportULDListWithFlightDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    $('#txtSacnULD').val('');
    $('#txtScanFlight').val('');
    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();
    var location = $('#txtLocation').val();
    var txtSacnULD = $('#txtSacnULD').val();


    if (FlightPrefix == "" || FlightNo == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter valid flight No.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if (FlightDate == "") {
        //errmsg = "Please enter flight date";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter flight date').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }


    var inputXML = '<Root><ULDNo></ULDNo><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><AirportCity>BUD</AirportCity><UserId>1</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetImportULDList",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $('#divULDNumberDetails').empty();
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
                console.log(response.d)

                $("#btnScanAccpt").attr('disabled', 'disabled');


                $(xmlDoc).find('Table').each(function (index) {

                    var Status = $(this).find('Status').text();

                    var StrMessage = $(this).find('StrMessage').text()
                    var TxtColor = $(this).find('TxtColor').text()

                  
                    if (Status == 'E') {
                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        $('#divULDNumberDetails').empty();
                        $('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    }


                });

                if (str != null && str != "") {

                    html = '';

                    html = '<table id="tblULDNumberDetails" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: #ddd;margin-top: 2%;">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">ULD Number</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Action</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(str);
                    var f = '0';
                    $(xmlDoc).find('Table2').each(function (index) {

                        var Status = $(this).find('Status').text();
                        var StrMessage = $(this).find('StrMessage').text();
                        if (Status == 'E') {
                            $.alert(StrMessage);
                            $('#divULDNumberDetails').empty();
                            $('#divULDNumberDetails').hide();
                            html = '';
                            return;
                        }
                        f = '1';
                        ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                        ULDNo = $(this).find('ULDNo').text();
                        txtColor = $(this).find('txtColor').text();
                        ButtonStatus = $(this).find('ButtonStatus').text();

                        ULDNoList(ULDFltSeqNo, ULDNo, txtColor, ButtonStatus);
                    });
                    html += "</tbody></table>";
                    if (f == '1') {
                        $('#divULDNumberDetails').show();
                        $('#divULDNumberDetails').append(html);
                    }


                } else {
                    errmsg = 'Flight No. does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}


function ScanFlightDetail() {


    $('#txtSacnULD').val('');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var FlightPrefix = $('#txtFlightPrefix').val();
    //var FlightNo = $('#txtFlightNo').val();
    //var FlightDate = $('#txtFlightDate').val();
    //var location = $('#txtLocation').val();
    //var txtSacnULD = $('#txtSacnULD').val();


    //if (FlightPrefix == "" || FlightNo == "") {
    //    errmsg = "Please enter valid Flight No.";
    //    $.alert(errmsg);
    //    return;
    //}

    //if (FlightDate == "") {
    //    errmsg = "Please enter Flight Date";
    //    $.alert(errmsg);
    //    return;
    //}


    var inputXML = '<Root><ULDNo></ULDNo><FlightAirline></FlightAirline><FlightNo></FlightNo><FlightDate></FlightDate><AirportCity>BUD</AirportCity><UserId>1</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type><FltScanValue>' + $('#txtScanFlight').val() + '</FltScanValue></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetImportULDList",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $('#divULDNumberDetails').empty();
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
                console.log(response.d)


                $(xmlDoc).find('Table').each(function (index) {
                    $("#spnMsg").text('');
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    var TxtColor = $(this).find('TxtColor').text();

                    if (Status == 'E') {

                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        $('#divULDNumberDetails').empty();
                        $('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    }


                });


                $(xmlDoc).find('Table1').each(function (index) {


                    ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                    FlightAirline = $(this).find('FlightAirline').text();
                    FlightNo = $(this).find('FlightNo').text();
                    FlightDate = $(this).find('FlightDate').text();
                    ButtonStatus = $(this).find('ButtonStatus').text();

                    $('#txtFlightPrefix').val(FlightAirline);
                    $('#txtFlightNo').val(FlightNo);


                    var newdate = FlightDate.split("-").reverse().join("-");

                    $('#txtFlightDate').val(newdate);

                    if (ButtonStatus == 'A') {
                        $("#btnScanAccpt").removeAttr('disabled');
                    }

                });


                if (str != null && str != "") {

                    html = '';

                    html = '<table id="tblULDNumberDetails" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: #ddd;margin-top: 2%;">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">ULD Number</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Action</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(str);
                    var flag = '0';
                    $(xmlDoc).find('Table2').each(function (index) {

                        var Status = $(this).find('Status').text();
                        var StrMessage = $(this).find('StrMessage').text();
                        if (Status == 'E') {
                            $.alert(StrMessage);
                            $('#divULDNumberDetails').empty();
                            $('#divULDNumberDetails').hide();
                            html = '';
                            return;
                        }

                        flag = '1';

                        ULDFltSeqNo = $(this).find('ULDFltSeqNo').text();
                        ULDNo = $(this).find('ULDNo').text();
                        txtColor = $(this).find('txtColor').text();
                        ButtonStatus = $(this).find('ButtonStatus').text();

                        ULDNoList(ULDFltSeqNo, ULDNo, txtColor, ButtonStatus);
                    });
                    html += "</tbody></table>";
                    if (flag == '1') {
                        $('#divULDNumberDetails').show();
                        $('#divULDNumberDetails').append(html);
                    }


                } else {
                    errmsg = 'Flight No. does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}

function ULDNoList(ULDFltSeqNo, ULDNo, txtColor, ButtonStatus) {

    //html += "<tr>";
    //html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;' align='left'>" + EventDT + ' <br> ' + UserName + "</td>";
    //html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;' align='left'>" + EventName + "</td>";
    ////html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + UserName + "</td>";
    //html += "</tr>";

    html += '<tr>';

    html += '<td style="padding-left: 4px;font-size:14px;color:' + txtColor + ';" id="tdGatepass">' + ULDNo + '</td>';

    if (ButtonStatus == 'A') {
        html += '<td style="padding-left: 20%;font-size:14px;padding: 5px;padding-left: 20%;"><button onclick="ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn ButtonColor">Accept</button></td>';
    } else if (ButtonStatus == 'D') {
        html += '<td style="padding-left: 20%;font-size:14px;padding: 5px;padding-left: 20%;"><button onclick="ImportULDAcceptanceOnListClick(\'' + ULDFltSeqNo + '\');" class="btn ButtonColor" disabled>Accept</button></td>';
    }


    html += '</tr>';
}


function ImportULDAcceptance() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();
    var location = $('#txtLocation').val();
    var txtSacnULD = $('#txtSacnULD').val();


    var location = $('#txtLocation').val();
    var txtSacnULD = $('#txtSacnULD').val();

    if (location == "") {
        //errmsg = "Please scan/enter location.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter location.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if (txtSacnULD == "") {
        //errmsg = "Please scan/enter ULD No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter ULD No.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    // var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';
    //var inputXML = '<Root><ULDNo>' + txtSacnULD + '</ULDNo><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate>';

    var inputXML = '<Root><ULDFltSeqNo>' + _ULDFltSeqNo + '</ULDFltSeqNo><AirportCity>BUD</AirportCity><UserId>1</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "ImportULDAcceptance",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $("#btnScanAccpt").removeAttr('disabled');
                $('#tblNewsForGatePass').hide();
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {

                    //var status = $(this).find('Status').text();
                    //$.alert($(this).find('StrMessage').text());
                    //if (status == 'E') {
                    //    // $.alert($(this).find('StrMessage').text());
                    //}
                    $("#spnMsg").text('');
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    var TxtColor = $(this).find('TxtColor').text();

                    if (Status == 'E') {

                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        $('#divULDNumberDetails').empty();
                        $('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    } else {
                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                    }
                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });

                GetImportULDList();

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}


function ImportULDAcceptanceOnListClick(txtSacnULD) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();
    var location = $('#txtLocation').val();
    //var txtSacnULD = $('#txtSacnULD').val();


    //if (location == "") {
    //    errmsg = "Please enter Location.";
    //    $.alert(errmsg);
    //    return;
    //}

    if (txtSacnULD == "") {
        //errmsg = "Please scan/enter ULD No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter ULD No.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    // var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';
    //var inputXML = '<Root><ULDNo>' + txtSacnULD + '</ULDNo><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate>';

    var inputXML = '<Root><ULDFltSeqNo>' + ULDFltSeqNo + '</ULDFltSeqNo><AirportCity>BUD</AirportCity><UserId>1</UserId><LocationCode>' + $('#txtLocation').val() + '</LocationCode><Type>A</Type></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            //  url: 'http://10.22.2.72:8080/CELEBIBUD/Services/HHTImpServices.asmx/' + "ImportULDAcceptance",
            url: GHAImportFlightserviceURL + "ImportULDAcceptance",
            data: JSON.stringify({
                'InputXML': inputXML,
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $("#btnScanAccpt").removeAttr('disabled');
                $('#tblNewsForGatePass').hide();
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {

                    //var status = $(this).find('Status').text();
                    //$.alert($(this).find('StrMessage').text());
                    ////if (status == 'E') {
                    ////    $.alert($(this).find('StrMessage').text());
                    ////}
                    $("#spnMsg").text('');
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    var TxtColor = $(this).find('TxtColor').text();

                    if (Status == 'E') {

                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        $('#divULDNumberDetails').empty();
                        $('#divULDNumberDetails').hide();
                        html = '';
                        return true;
                    } else {
                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                    }
                });
                GetImportULDListWithFlightDetails();

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}


function clearAWBDetails() {
    $('#txtSacnULD').val('');
    $('#txtScanFlight').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    $('#tblNewsForGatePass').hide();
    $('#divULDNumberDetails').empty();

    $('#txtFlightDate').val('');
    $('#txtLocation').val('');
    $('#spnMsg').text('');
    


}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

