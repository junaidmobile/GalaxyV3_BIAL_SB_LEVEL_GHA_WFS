

var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var _WDONo = window.localStorage.getItem("_WDONo");
var _DocNo = window.localStorage.getItem("_DocNo");
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


    //var formattedDate = new Date();
    //var d = formattedDate.getDate();
    //if (d.toString().length < Number(2))
    //    d = '0' + d;
    //var m = formattedDate.getMonth();
    //m += 1;  // JavaScript months are 0-11
    //if (m.toString().length < Number(2))
    //    m = '0' + m;
    //var y = formattedDate.getFullYear();
    //var t = formattedDate.getTime();
    //var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    //newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    //$('#txtFlightDate').val(newDate);

    //var h = date.getHours();
    //var m = date.getMinutes();
    //var s = date.getSeconds();
    $('#txtGatePass').val(_WDONo).attr('disabled', 'disabled');
    $('#DocumentNo').val(_DocNo).attr('disabled', 'disabled');
    ImportAirside_Search_V3();
});


function checkSpecialChar() {
    var string = $('#txtGroupId').val();
    if (string.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        $('#txtGroupId').val('');
        return true;    // Contains at least one special character or space
    } else {
        return false;
    }
}

function checkLocation() {
    var location = $('#txtLocation').val().toUpperCase();
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



function gatePassChangeFocus() {
    if ($('#txtGatePass').val().length == 14) {
        $('#txtGroupId').focus();
    }
}

function ImportAirside_Search_V3() {

    $('#divVCTDetail').html('');
    $('#divVCTDetail').empty();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var InputXML = '<Root><Gatepass>' + $('#txtGatePass').val() + '</Gatepass><Area></Area><GroupID></GroupID><IsTrans>Y</IsTrans><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><DocumentNo>' + $('#DocumentNo').val() + '</DocumentNo></Root>';

    $('#lblMessage').text('');
    // if (txtGatePass.length >= '8') {
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "ImportAirside_Search_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);

                //$('#divVCTDetail').html('');
                //$('#divVCTDetail').empty();
                console.log(xmlDoc);

                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $.alert(StrMessage).css('color', 'red');
                        // $("#lblMessage").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();
                        return true;
                    } else {
                        $("#lblMessage").text('');
                    }
                });

                if (response != null && response != "") {

                    html = '';

                    html += '<table id="tblNewsForGatePass" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Group Id</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Pieces</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Revoke</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
                    $(xmlDoc).find('Table1').each(function (index) {
                        $('#lblMessage').text('');

                        flag = '1';

                        WDODT = $(this).find('WDODT').text();
                        WDONo = $(this).find('WDONo').text();
                        AWBNo = $(this).find('AWBNo').text();
                        ReleaseStatus = $(this).find('ReleaseStatus').text();
                        IsActive = $(this).find('IsActive').text();
                        PkgRecd = $(this).find('PkgRecd').text();
                        GroupId = $(this).find('GroupId').text();
                        WareHouseLocation = $(this).find('WareHouseLocation').text();
                        IsLocked = $(this).find('IsLocked').text();
                        IsCompleted = $(this).find('IsCompleted').text();
                        WDOStatus = $(this).find('WDOStatus').text();

                        VCTNoDetails(GroupId, PkgRecd, WDOStatus);
                    });
                    html += "</tbody></table>";
                    if (flag == '1') {
                        $('#divVCTDetail').show();
                        $('#divVCTDetail').append(html);
                    }


                } else {
                    errmsg = 'VCT No. does not exists.';
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
    //  }
}



function VCTNoDetails(GroupId, PkgRecd, WDOStatus) {

    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;">' + GroupId + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + PkgRecd + '</td>';
    if (WDOStatus != 'C') {
        //html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:center;color:gray;"><span class="glyphicon glyphicon-remove"></span></td>';
        html += '<td style="font-size:14px;padding: 5px;background: rgb(224, 243, 215);" class="text-center align-middle"><button  class="btn" disabled align="center">Revoke</button></td>';
    } else {
        //html += '<td onclick="SaveOutforWarehouseRevoke(\'' + GroupID + '\');" style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:center;color:red;"><span class="glyphicon glyphicon-remove"></span></td>';
        html += '<td style="font-size:14px;padding: 5px;background: rgb(224, 243, 215);" class="text-center align-middle"><button onclick="SaveOutforWarehouseRevoke(\'' + GroupId + '\');" class="btn ButtonColor" align="center">Revoke</button></td>';
    }

    html += '</tr>';
}


function SaveOutforWarehouse() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var InputXML = '<Root><Gatepass>' + $('#txtGatePass').val() + '</Gatepass><GroupID>' + $('#txtGroupId').val() + '</GroupID><Mode>O</Mode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "WDOOutForDelivery",
            data: JSON.stringify({ 'InputXML': InputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $('#lblMessage').text('');
                $('#lblMessageSuccess').text('');
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $("#btnScanAccpt").removeAttr('disabled');
                //  $('#tblNewsForGatePass').hide();
                // $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $.alert(StrMessage).css('color', 'red');

                        // $("#lblMessage").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();
                        return true;
                    } else {
                        $("#txtGroupId").val('');
                        //$("#lblMessage").text('');
                        $.alert(StrMessage).css('color', 'green');
                    }
                });

                ImportAirside_Search_V3();
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


function SaveOutforWarehouseRevoke(GroupID) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    // var txtGatePass = $('#txtGatePass').val();
    // var txtGroupId = $('#txtGroupId').val();
    var InputXML = '<Root><Gatepass>' + $('#txtGatePass').val() + '</Gatepass><GroupID>' + GroupID + '</GroupID><Mode>R</Mode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "WDOOutForDelivery",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                //$("#btnScanAccpt").removeAttr('disabled');
                // $('#tblNewsForGatePass').hide();
                // $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $.alert(StrMessage).css('color', 'red');
                        //$("#lblMessage").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();
                        return true;
                    } else {
                        // $("#lblMessage").text(StrMessage).css({ 'color': 'green' });
                        $("#txtGroupId").val('');
                        $.alert(StrMessage).css('color', 'green');
                    }
                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });

                ImportAirside_Search_V3();

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
    //$('#txtGatePass').val('');
    $('#txtGroupId').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    //$('#divVCTDetail').hide();
    // $('#divVCTDetail').empty();
    $('#txtFlightDate').val('');
    $('#txtLocation').val('');
    $('#spnMsg').text('');
    $('#lblMessageSuccess').text('');
    $('#lblMessage').text('');
    $('#txtGatePass').focus();
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

