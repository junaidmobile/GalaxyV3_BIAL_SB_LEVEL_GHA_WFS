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
    ImportAirside_Search_V3();
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

//function goToGPDetailsPage(flSQ, uldSQ, uldtyp) {

//    localStorage.setItem('flSeqID', flSQ + '~' + uldSQ);
//    localStorage.setItem('_uldtyp', uldtyp);

//    window.location.href = 'EXP_GatePassDetails.html';
//}


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






function ImportAirside_Search_V3() {
    //  clearALLBeforeSearch();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var SacnULD = $('#txtSacnULD').val();

    //var InputXML = '<Root><BarCode></BarCode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';
    // var InputXML = '<Root><Gatepass></Gatepass><UldSeqNo>-1</UldSeqNo><ULDType></ULDType><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';
    var InputXML = '<Root><Gatepass></Gatepass><Area></Area><GroupID></GroupID><IsTrans>Y</IsTrans><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId><DocumentNo></DocumentNo></Root>';

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
                var xmlDoc = $.parseXML(response);
                str = response;
                console.log(xmlDoc);

                var flag = '0';
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        // $.alert(StrMessage).css('color', 'red');
                        $("#spnMsg").text(StrMessage).css({ 'color': 'red' });
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
                    html += '<th style="background-color:rgb(208, 225, 244);">WDO No.</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">AWB No.</th>';
                    html += '<th colspan="3" style="background-color:rgb(208, 225, 244);">Action</th>';
                    html += '</tr >';
                    html += '</thead >';
                    html += '<tbody>';

                    // var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {

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

                        gatePassNoDetails(WDONo, AWBNo, IsLocked, IsCompleted, WDOStatus);
                    });
                    html += "</tbody ></table>";
                    $('#divVCTDetail').show();
                    $('#divVCTDetail').append(html);
                    //if (_GroupId != '') {
                    //    $('#divVCTDetail').show();
                    //    $('#divVCTDetail').append(html);
                    //}


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


function gatePassNoDetails(WDONo, AWBNo, IsLocked, IsCompleted, WDOStatus) {
    if (WDOStatus == 'P') {
        html += '<tr style="background-color:#FFFFED;">';
        html += '<td>' + WDONo + '</td>';
        html += '<td >' + AWBNo + '</td>';
        html += '<td style="text-align: center;"><a onclick="goToGPDetailsPage(\'' + WDONo + '\',\'' + AWBNo + '\');" style="color: #065da1;" class="glyphicon glyphicon-play"></a></td>';
        //html += '<td><a style="color: green;padding-left:10%;" class="glyphicon glyphicon-ok"></a></td>';
        //html += '<td><img style="width:15px;height:15px;" src="images/OIP.jpeg"</td>';

        //if (WDOStatus == 'P') {
        //   // html += '<td >Pending</td>';

        //} else {
        //    html += '<td><a style="color: red; padding-left: 10%;" class="glyphicon glyphicon-lock"></a></td>';
        //}
        html += '</tr>';
    }
    if (WDOStatus == 'I') {
        html += '<tr style="background-color:#fff;">';
        html += '<td>' + WDONo + '</td>';
        html += '<td >' + AWBNo + '</td>';
        html += '<td style="text-align: center;"><a onclick="goToGPDetailsPage(\'' + WDONo + '\',\'' + AWBNo + '\');" style="color: #065da1;" class="glyphicon glyphicon-play"></a></td>';
        //html += '<td><a style="color: green;padding-left:10%;" class="glyphicon glyphicon-ok"></a></td>';
        //html += '<td><img style="width:15px;height:15px;" src="images/OIP.jpeg"</td>';

        //if (WDOStatus == 'P') {
        //   // html += '<td >Pending</td>';

        //} else {
        //    html += '<td><a style="color: red; padding-left: 10%;" class="glyphicon glyphicon-lock"></a></td>';
        //}
        html += '</tr>';
    }

    if (WDOStatus == 'C') {
        html += '<tr style="background-color:#90EE90;">';
        html += '<td>' + WDONo + '</td>';
        html += '<td >' + AWBNo + '</td>';
        html += '<td style="text-align: center;"><a onclick="goToGPDetailsPage(\'' + WDONo + '\',\'' + AWBNo + '\');" style="color: #065da1;" class="glyphicon glyphicon-play"></a></td>';
        //html += '<td><a style="color: green;padding-left:10%;" class="glyphicon glyphicon-ok"></a></td>';
        //html += '<td><img style="width:15px;height:15px;" src="images/OIP.jpeg"</td>';

        //if (WDOStatus == 'P') {
        //   // html += '<td >Pending</td>';

        //} else {
        //    html += '<td><a style="color: red; padding-left: 10%;" class="glyphicon glyphicon-lock"></a></td>';
        //}
        html += '</tr>';
    }
}

function goToGPDetailsPage(wdono, docno) {

    localStorage.setItem('_WDONo', wdono);
    localStorage.setItem('_DocNo', docno);

    window.location.href = 'IMP_OutOfWarehouse.html';
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
    $('#spnMsg').text('');
    $('#btnPayTSP').attr('disabled', 'disabled');
    $('#txtRemark').val('');
}


function clearALL() {
    $('#txtSacnULD').val('');
    $('#txtSacnULD').focus();
    $('#spnMsg').text('');
    $('#divVCTDetail').empty();
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


function ImportAirside_Search_V3_OnBlure() {

    if ($('#txtSacnULD').val() == '') {
        return;
    }
    //  clearALLBeforeSearch();
    $("#spnMsg").text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var SacnULD = $('#txtSacnULD').val();

    //var InputXML = '<Root><BarCode></BarCode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';
    var InputXML = '<Root><Gatepass>' + SacnULD + '</Gatepass><UldSeqNo>-1</UldSeqNo><ULDType></ULDType><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId><DocumentNo></DocumentNo></Root>';

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
                var xmlDoc = $.parseXML(response);
                str = response;
                console.log(xmlDoc);

                var flag = '0';
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        // $.alert(StrMessage).css('color', 'red');
                        $("#spnMsg").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();
                        return true;
                    } else {
                        if (StrMessage == 'No record found.') {
                            $("#spnMsg").text(StrMessage).css({ 'color': 'red' });
                        }
                    }
                });

                if (str != null && str != "") {

                    $('#divVCTDetail').empty();
                    html = '';
                    html += '<table id="tblNewsForGatePass" class="table table-striped table-bordered">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th style="background-color:rgb(208, 225, 244);">Gate Pass No.</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">Document No.</th>';
                    html += '<th colspan="3" style="background-color:rgb(208, 225, 244);">Action</th>';
                    html += '</tr >';
                    html += '</thead >';
                    html += '<tbody>';

                    // var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {

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

                        localStorage.setItem('_WDONo', WDONo);
                        localStorage.setItem('_DocNo', AWBNo);

                        window.location.href = 'IMP_OutOfWarehouse.html';
                        // gatePassNoDetails(WDONo, AWBNo, IsLocked, IsCompleted, WDOStatus);
                    });
                    html += "</tbody ></table>";
                    $('#divVCTDetail').show();
                    $('#divVCTDetail').append(html);
                    //if (_GroupId != '') {
                    //    $('#divVCTDetail').show();
                    //    $('#divVCTDetail').append(html);
                    //}


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