

var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var html;
var LocationRowID;
var AWBRowID;
var HAWBId;
var inputRowsforLocation = "";
var _ULDFltSeqNo;
var formatedDataofPRN;
var _calCharWt;
var Barcode_PRN_Values;
var _HAWBNo;
var isMPS = '0';
var MPSStatus;
var sendValueToPrinter;
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

    if (window.localStorage.getItem("RoleIMPRePrint") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }


    let date = new Date();
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    var today = day + '-' + month + '-' + year;
    $('#txtFlightDate').val(today);

    $("#txtFlightDate").datepicker({
        shortYearCutoff: 1,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy'
    });


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


    //$('#chkHWABNo').click(function () {
    //    var checked = $(this).attr('checked', true);
    //    if (checked) {
    //        $('#lblHAWBNO').show();
    //        $('#lblmpsno').hide();
    //        $('#txtHAWBNo').focus();
    //        $('#txtHAWBNo').val('');
    //        clearBeforePopulate();
    //        isMPS == false;
    //    }

    //});


    //$('#chkMPSNo').click(function () {
    //    var checked = $(this).attr('checked', true);
    //    if (checked) {
    //        $('#lblHAWBNO').hide();
    //        $('#lblmpsno').show();
    //        $('#txtHAWBNo').focus();
    //        $('#txtHAWBNo').val('');
    //        clearBeforePopulate();
    //        isMPS == true;
    //    }

    //});

    //  GetBarcodeSettings_HHT();
    // EnableMPSNo();
});

function EnableMPSNo() {
    MPSStatus = document.getElementById("chkMPSNo").checked;

    if (MPSStatus == false) {
        isMPS = '0';
        $('#lblHAWBNO').show();
        $('#lblIMPSNo').hide();
        $('#txtHAWBNo').val('');
        $('#txtHAWBNo').focus();
        clearBeforePopulate();
    }

    if (MPSStatus == true) {
        isMPS = '1';
        $('#txtHAWBNo').val('');
        $('#txtHAWBNo').focus();
        $('#lblHAWBNO').hide();
        $('#lblIMPSNo').show();
        clearBeforePopulate();
    }
}

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

function searchMPSHAWBNumbers() {
    // alert('in scan function')
    if ($('#txtHAWBNo').val() == "") {
        return;
    }

    if (isMPS == '1') {
        GetPackageIdBarcodeLabelList_HHTMPSWise();
        return;

    }

    if (isMPS == '0') {
        GetPackageIdBarcodeLabelList_HHT();
        return;

    }
}

function GetTrolleyDetails() {


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if ($('#txtFlightPrefix').val() == "") {
        //  errmsg = "Please enter IGM No first";
        //  $.alert(errmsg);
        $('#spnValMsg').text("Please enter Flight Prefix").css('color', 'red');
        $('#txtFlightPrefix').focus();
        return;
    } else {
        $('#spnValMsg').text("");
    }
    if ($('#txtFlightNo').val() == "") {
        //  errmsg = "Please enter IGM No first";
        //  $.alert(errmsg);
        $('#spnValMsg').text("Please enter Flight No.").css('color', 'red');
        $('#txtFlightNo').focus();

        return;
    } else {
        $('#spnValMsg').text("");
    }
    if ($('#txtFlightDate').val() == "") {
        //  errmsg = "Please enter IGM No first";
        //  $.alert(errmsg);
        $('#spnValMsg').text("Please enter Flight Date").css('color', 'red');
        $('#txtFlightDate').focus();

        return;
    } else {
        $('#spnValMsg').text("");
    }
    inputxml = '<Root><FlightNo>' + $('#txtFlightPrefix').val() + '' + $('#txtFlightNo').val() + '</FlightNo><FlightDate>' + $('#txtFlightDate').val() + '</FlightDate><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId><TrollyRowId></TrollyRowId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetTrolleyDetails",
            data: JSON.stringify({
                'InputXML': inputxml
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);

                $('#divVCTDetail').html('');
                $('#divVCTDetail').empty();
                console.log(xmlDoc);
                var StrMessage;

                if (response != null && response != "") {

                    html = '';

                    html += '<table id="tblPAckageIDs" class="table table-bordered table-striped">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" >Trolley Number</th>';
                    /*html += '<th height="30" style="background-color:rgb(208, 225, 244);" >Package Count</th>';*/
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" >Action</th>';
                    //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Remarks</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
                    $(xmlDoc).find('Table1').each(function (index) {

                        TrollyRowId = $(this).find('TrollyRowId').text();
                        FlightSeqNo = $(this).find('FlightSeqNo').text();
                        TrolleyNumber = $(this).find('TrolleyNumber').text();
                        StickerValue = $(this).find('StickerValue').text();
                        TrolleyStatus = $(this).find('TrolleyStatus').text();
                        StickerPrintData = $(this).find('StickerPrintData').text();


                        fnPackageIDList(TrollyRowId, FlightSeqNo, TrolleyNumber, StickerValue, TrolleyStatus, StickerPrintData);


                    });
                    html += "</tbody></table>";

                    $('#divVCTDetail').append(html);



                } else {
                    //errmsg = 'Data not found.';
                    //$.alert(errmsg);
                    $('#spnValMsg').text("Data not found.").css('color', 'red');
                }

                $(xmlDoc).find('Table').each(function (index) {


                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $('#spnValMsg').text(StrMessage).css('color', 'red');
                        return;
                    } else {
                        $('#spnValMsg').text('');
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



function fnPackageIDList(TrollyRowId, FlightSeqNo, TrolleyNumber, StickerValue, TrolleyStatus, StickerPrintData) {
    //if (PackageId != '') {
    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px">' + TrolleyNumber + '</td>';
    /* html += '<td style="background: rgb(224, 243, 215);">' + TrolleyStatus + '</td>';*/
    // html += '<td style="background: rgb(224, 243, 215);">  <a style="text-align: center;argin-left: 5px;background-color: #065da1;color: #fff;" type="button" onclick="getFormatedPRNText(\'' + HAWBNo + '\',\'' + Destination + '\',\'' + IGMNo + '\',\'' + MAWBNo + '\',\'' + PkgOfPkgCount + '\',\'' + FlightArrivalDate + '\',\'' + FlightArrivalTime + '\',\'' + CleintName + '\',\'' + MPSNo + '\',\'' + PackageId + '\');"class=" form-control glyphicon glyphicon-print"></a></td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px">  <a style="text-align: center;margin-left: 5px;color: #000;background-color: rgb(224, 243, 215);"  onclick="GetTrolleyDetailsonClickPrint(\'' + TrollyRowId + '\');"class=" form-control glyphicon glyphicon-print"></a></td>';
    //html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + Remarks + '</td>';
    html += '</tr>';
    //  }
}


function GetTrolleyDetailsonClickPrint(TrollyRowId) {


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if ($('#txtFlightPrefix').val() == "") {
        //  errmsg = "Please enter IGM No first";
        //  $.alert(errmsg);
        $('#spnValMsg').text("Please enter Flight Prefix").css('color', 'red');
        $('#txtFlightPrefix').focus();
        return;
    } else {
        $('#spnValMsg').text("");
    }
    if ($('#txtFlightNo').val() == "") {
        //  errmsg = "Please enter IGM No first";
        //  $.alert(errmsg);
        $('#spnValMsg').text("Please enter Flight No.").css('color', 'red');
        $('#txtFlightNo').focus();

        return;
    } else {
        $('#spnValMsg').text("");
    }
    if ($('#txtFlightDate').val() == "") {
        //  errmsg = "Please enter IGM No first";
        //  $.alert(errmsg);
        $('#spnValMsg').text("Please enter Flight Date").css('color', 'red');
        $('#txtFlightDate').focus();

        return;
    } else {
        $('#spnValMsg').text("");
    }
    inputxml = '<Root><FlightNo>' + $('#txtFlightPrefix').val() + '' + $('#txtFlightNo').val() + '</FlightNo><FlightDate>' + $('#txtFlightDate').val() + '</FlightDate><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId><TrollyRowId>' + TrollyRowId+'</TrollyRowId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetTrolleyDetails",
            data: JSON.stringify({
                'InputXML': inputxml
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);
                console.log(xmlDoc);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $('#spnValMsg').text(StrMessage).css('color', 'red');
                        return;
                    } else {
                        $('#spnValMsg').text('');
                    }

                });

                $(xmlDoc).find('Table1').each(function (index) {

                    TrollyRowId = $(this).find('TrollyRowId').text();
                    FlightSeqNo = $(this).find('FlightSeqNo').text();
                    TrolleyNumber = $(this).find('TrolleyNumber').text();
                    StickerValue = $(this).find('StickerValue').text();
                    TrolleyStatus = $(this).find('TrolleyStatus').text();
                    StickerPrintData = $(this).find('StickerPrintData').text();
                    strPrint = String(StickerPrintData);
                    console.log(strPrint);
                    finalPRintingSlip(strPrint);

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


function clearBeforePopulate() {
    $('#ddlMAWBNo').empty();
    $('#txtHAWBNo').val('');
    $('#divVCTDetail').empty();
    $('#spnValMsg').text('');
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlMAWBNo');
    // $('#btnGoodsDelever').attr('disabled', 'disabled');

    $('#txtFlightPrefix').val('');
    $('#txtFlightPrefix').focus();
    $('#txtFlightNo').val('');
    
    let date = new Date();
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    var today = day + '-' + month + '-' + year;
    $('#txtFlightDate').val(today);

    $("#txtFlightDate").datepicker({
        shortYearCutoff: 1,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy'
    });


}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}



function finalPRintingSlip(strPrint) {
    window.DatecsPrinter.listBluetoothDevices(
        function (devices) {
            window.DatecsPrinter.connect(devices[0].address,
                function () {
                    // printLogo();
                    // alert('connection success');
                    PrintCourierData(strPrint);

                },
                function () {
                    // alert(JSON.stringify(error));
                }
            );
        },
        function (error) {
            // alert(JSON.stringify(error));
        }
    );

    function PrintCourierData() {
        // console.log(formatedDataofPRN)
        // alert('final  ' + printedData)
        window.DatecsPrinter.printText(strPrint, 'ISO-8859-1',
            function () {

                //  alert('print success');
                // printMyBarcode();
            }
        );
    }
}

function GetBarcodeSettings_HHT() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var IGMNo = $('#txtIGMNo').val();

    //if ($('#txtIGMNo').val() == "") {
    //    errmsg = "Please enter IGM No first";
    //    $.alert(errmsg);
    //    $('#txtAWBNo').val('');
    //    return;
    //}


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetBarcodeSettings_HHT",
            data: JSON.stringify({
                'strDeviceId': ''
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
                response = response.d;
                var xmlDoc = $.parseXML(response);
                //var PRNCode = $(xmlDoc).find('Table')[1];
                //var table = xmlDoc.getElementsByTagName('Table')[0];
                //_PRNCode = table.childNodes[3];
                $(xmlDoc).find('Table').each(function (index) {


                    Barcode_PRN_Text = $(this).find('Setting').text();
                    // Barcode_PRN_Values = $(this).find('Value').text();

                    //xHAWBNox = Barcode_PRN_Values.indexOf("xHAWBNox");

                    if (Barcode_PRN_Text == 'Barcode_PRN_Text') {
                        Barcode_PRN_Values = $(this).find('Value').text();
                    }


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