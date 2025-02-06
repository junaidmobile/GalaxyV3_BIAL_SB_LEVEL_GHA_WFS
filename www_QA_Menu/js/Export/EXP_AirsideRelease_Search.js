var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var companyCode = window.localStorage.getItem("companyCode");
var UserName = window.localStorage.getItem("UserName");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var SelectedHawbId;
var SelectedHawbIdCMS;
var SelectedHawbNo;
var IGMno;
var strXmlStore;
var locPieces;
var html;
var FromLoc;
var GHAMawbid;
var Hawbid;
var GHAhawbid;
var IsFlightFinalized;
var GHAflightSeqNo;
var _FlightSeqNo;
var _MAWBNo;
var _HAWBNo;
var _LocId;
var _HAWBId;
var _LocCode;
var _LocPieces;
var _IGMNo;
var _GroupId;
var _Remarks;
var CMSGHAFlag;
var _SBId;
var autoLocationArray;
$(function () {
    ExportAirside_Search_V3();
    if (window.localStorage.getItem("RoleIMPBinning") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }


    // ImportDataList();

    //var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';

    //SHCSpanHtml(stringos);

    //$("input").keyup(function () {
    //    var string = $(this).val();
    //    // var string = $('#txtOrigin').val();
    //    if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓π@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    //        /*$('#txtOrigin').val('');*/
    //        $(this).val('');
    //        return true;    // Contains at least one special character or space
    //    } else {
    //        return false;
    //    }

    //});

    //$("textarea").keyup(function () {
    //    var string = $(this).val();
    //    // var string = $('#txtOrigin').val();
    //    if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓π@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    //        /*$('#txtOrigin').val('');*/
    //        $(this).val('');
    //        return true;    // Contains at least one special character or space
    //    } else {
    //        return false;
    //    }

    //});

    $('#btnPayTSP').attr('disabled', 'disabled');

    //JsBarcode("#barcode", "GP123456789", {

    //    width: 2,
    //    height: 40,
    //    displayValue: false
    //});


});

function goToGPDetailsPage(flSQ, uldSQ, uldtyp, GatepassNo) {

    localStorage.setItem('flSeqID', flSQ + '~' + uldSQ);
    localStorage.setItem('_uldtyp', uldtyp);
    localStorage.setItem('gatePassComing', GatepassNo);

    window.location.href = 'EXP_GatePassDetails.html';
}


function SHCSpanHtml(newSHC) {
    var spanStr = "<tr class=''>";
    var newSpanSHC = newSHC.split(',');
    var filtered = newSpanSHC.filter(function (el) {
        return el != "";
    });

    for (var n = 0; n < filtered.length; n++) {
        var blink = filtered[n].split('~');

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'Y' && filtered[n] != '~Y') {
                spanStr += "<td class='blink_me'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}






function ExportAirside_Search_V3() {
    //  clearALLBeforeSearch();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var SacnULD = $('#txtSacnULD').val();

    var InputXML = '<Root><BarCode></BarCode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "ExportAirside_Search_V3",
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
                str = response;
                console.log(xmlDoc);

                var flag = '0';
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        // $.alert(StrMessage).css('color', 'red');
                        $("#errorMsg").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();
                        return true;
                    }
                });

                if (str != null && str != "") {

                    $('#divVCTDetail').empty();
                    html = '';
                    html += '<table id="tblNewsForGatePass" class="table table-striped table-bordered">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th style="background-color:rgb(208, 225, 244);">Gate Pass No.</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">Status</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">Action</th>';
                    html += '</tr >';
                    html += '</thead >';
                    html += '<tbody>';

                    // var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {

                        ULDNo = $(this).find('ULDNo').text();
                        RTUnit = $(this).find('RTUnit').text();
                        Scale_Weight = $(this).find('Scale_Weight').text();
                        Status = $(this).find('Status').text();
                        IsReleased = $(this).find('IsReleased').text();
                        hdnValue = $(this).find('hdnValue').text();
                        //location = $(this).find('location').text();
                        FltSeqNo = $(this).find('FltSeqNo').text();
                        USeqNo = $(this).find('USeqNo').text();
                        GatepassNo = $(this).find('GatepassNo').text();
                        ULDType = $(this).find('ULDType').text();

                        gatePassNoDetails(GatepassNo, Status, IsReleased, FltSeqNo, USeqNo, ULDType);
                    });
                    html += "</tbody ></table>";
                    $('#divVCTDetail').show();
                    $('#divVCTDetail').append(html);
                    //if (_GroupId != '') {
                    //    $('#divVCTDetail').show();
                    //    $('#divVCTDetail').append(html);
                    //}

                    html += "</tbody></table>";

                    if (locPieces != '0')
                        $('#divAddTestLocation').append(html);
                }
                else {
                    errmsg = 'Shipment does not exists';
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


function gatePassNoDetails(GatepassNo, Status, IsReleased, FltSeqNo, USeqNo, ULDType) {


    html += '<tr>';
    html += '<td>' + GatepassNo + '</td>';
    html += '<td>' + Status + '</td>';

    html += '<td style="text-align: center;"><a style="color: #065da1;" class=" glyphicon glyphicon-eye-open" onclick="goToGPDetailsPage(\'' + FltSeqNo + '\',\'' + USeqNo + '\',\'' + ULDType + '\',\'' + GatepassNo + '\');"></a></td>';
    html += '</tr>';
}


function clearALLBeforeSearch() {
    $('#tdPieces').text('');
    $('#tdGrWt').text('');
    $('#tdChWt').text('');
    $('#txtCommodity').val('');
    $('#txtGSTIN').val('');
    $('#txtAgentName').val('');
    $('#tdPieces').text('');
    $('#TextBoxDiv').empty();
    $('#ddlPaymentMode').empty();
    $('#tdAmount').text('');
    $('#tdTexAmount').text('');
    $('#tdTotalInvoicAmount').text('');
    $('#tdRoundOffAmount').text('');
    $('#tdFinalInvoiceAmount').text('');
    $('#spnErrormsg').text('');
    $('#btnPayTSP').attr('disabled', 'disabled');
    $('#txtRemark').val('');
}


function clearALL() {
    $('#txtSacnULD').val('');
    $('#txtSacnULD').focus();
    $('#errorMsg').text('');
    //$('#txtAWBNo').focus();
    //$('#tdPieces').text('');
    //$('#tdGrWt').text('');
    //$('#tdChWt').text('');
    //$('#txtCommodity').val('');
    //$('#txtGSTIN').val('');
    //$('#txtAgentName').val('');
    //$('#tdPieces').text('');
    //$('#TextBoxDiv').empty();
    //$('#ddlPaymentMode').empty();
    //$('#tdAmount').text('');
    //$('#tdTexAmount').text('');
    //$('#tdTotalInvoicAmount').text('');
    //$('#tdRoundOffAmount').text('');
    //$('#tdFinalInvoiceAmount').text('');
    //$('#errorMsg').text('');
    //$('#btnPayTSP').attr('disabled', 'disabled');
    //$('#txtRemark').val('');

}

function clearALLafterSave() {
    $('#txtAWBNo').val('');
    $('#txtAWBNo').focus();
    $('#tdPieces').text('');
    $('#tdGrWt').text('');
    $('#tdChWt').text('');
    $('#txtCommodity').val('');
    $('#txtGSTIN').val('');
    $('#txtAgentName').val('');
    $('#tdPieces').text('');
    $('#TextBoxDiv').empty();
    $('#ddlPaymentMode').empty();
    $('#tdAmount').text('');
    $('#tdTexAmount').text('');
    $('#tdTotalInvoicAmount').text('');
    $('#tdRoundOffAmount').text('');
    $('#tdFinalInvoiceAmount').text('');
    $('#btnPayTSP').attr('disabled', 'disabled');
    $('#txtRemark').val('');

}


function ExportAirside_Search_V3_Onblur() {
    //  clearALLBeforeSearch();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if ($('#txtSacnULD').val() == '') {
        return;
    }

    // var MAWBNo = $('#txtAWBNo').val();

    var InputXML = '<Root><BarCode>' + $('#txtSacnULD').val() + '</BarCode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "ExportAirside_Search_V3",
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
                str = response;
                console.log(xmlDoc);

                var flag = '0';
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        //  $.alert(StrMessage).css('color', 'red');
                        $("#errorMsg").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();
                        return;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    if (index == 0) {

                        _FltSeqNo = $(this).find('FltSqNo').text();
                        _USeqNo = $(this).find('ULDSqNo').text();
                        _GatepassNo = $(this).find('PermitNo').text();
                        _ULDType = $(this).find('Utype').text();

                        localStorage.setItem('flSeqID', _FltSeqNo + '~' + _USeqNo);
                        localStorage.setItem('_uldtyp', _ULDType);

                        localStorage.setItem('gatePassComing', _GatepassNo);
                        if (_FltSeqNo != '') {
                            window.location.href = 'EXP_GatePassDetails.html';

                        }
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