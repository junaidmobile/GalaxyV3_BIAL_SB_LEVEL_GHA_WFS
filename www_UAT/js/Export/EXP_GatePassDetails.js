var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var companyCode = window.localStorage.getItem("companyCode");
var UserName = window.localStorage.getItem("UserName");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var flSeqID = localStorage.getItem('flSeqID');
var SHED_CODE = localStorage.getItem('SHED_CODE');
var _uldtyp = localStorage.getItem('_uldtyp');
var gatePassComing = localStorage.getItem('gatePassComing');

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
var PermitNo;
var _ulddSQ;
var uldComing;
$(function () {

    if (window.localStorage.getItem("RoleIMPBinning") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    var arr1 = flSeqID.split('~')
    var flSq = arr1[0];
    var uldSq = arr1[1];
    // ImportDataList();
    _ulddSQ = uldSq;
    //var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';

    //SHCSpanHtml(stringos);

    $("input").keyup(function () {
        var string = $(this).val();
        // var string = $('#txtOrigin').val();
        if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓π@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
            /*$('#txtOrigin').val('');*/
            $(this).val('');
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }

    });

    $("textarea").keyup(function () {
        var string = $(this).val();
        // var string = $('#txtOrigin').val();
        if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓π@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
            /*$('#txtOrigin').val('');*/
            $(this).val('');
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }

    });

    $('#btnPayTSP').attr('disabled', 'disabled');



    //  var InputXML = '<Root><BarCode>' + flSeqID + '</BarCode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';
    ExportAirside_Search_V3_Onblur();


    //$('#signature-pad').on('mouseout',function () {
    //    canvas = document.getElementById('signature-pad');
    //    signitureData = canvas.toDataURL("image/jpeg");
    //    str = signitureData;
    //    signitureDataURL = str.substring(23);

    //});

});




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


function ExportAirside_Search_V3_Onblur() {
    //  clearALLBeforeSearch();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    // var MAWBNo = $('#txtAWBNo').val();

    var InputXML = '<Root><BarCode>' + gatePassComing + '</BarCode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';

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
                $('#containerDiv').empty();
                $('#divContainer').empty();
                $('#divPallets').empty();
                $('#divULDTrolley').empty();

                var flag = '0';
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        //  $.alert(StrMessage).css('color', 'red');
                        $("#errorMsg").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();
                        return true;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    if (index == 0) {


                        ULDNo = $(this).find('ULDNo').text();
                        ULDSqNo = $(this).find('ULDSqNo').text();
                        FltNo = $(this).find('FltNo').text();
                        FlightDate = $(this).find('FlightDate').text();
                        FltSqNo = $(this).find('FltSqNo').text();
                        Utype = $(this).find('Utype').text();
                        Status = $(this).find('Status').text();
                        FLIGHT_ROUTE_POINT_APT_CITY = $(this).find('FLIGHT_ROUTE_POINT_APT_CITY').text();
                        ULD_TYPE_I802 = $(this).find('ULD_TYPE_I802').text();
                        AWBNo = $(this).find('AWBNo').text();
                        PermitNo = $(this).find('PermitNo').text();
                        PermitDate = $(this).find('PermitDate').text();
                        BARCODE_PATH = $(this).find('BARCODE_PATH').text();
                        CreatedDate = $(this).find('CreatedDate').text();
                        CreatedBy = $(this).find('CreatedBy').text();
                        Rpt_Header = $(this).find('Rpt_Header').text();
                        ChangePermitNo = $(this).find('ChangePermitNo').text();
                        ChangePermitDate = $(this).find('ChangePermitDate').text();
                        ReleaseSummary = $(this).find('ReleaseSummary').text();
                        Priority = $(this).find('Priority').text();
                        Origin = $(this).find('Origin').text();
                        Destination = $(this).find('Destination').text();
                        Commodity = $(this).find('Commodity').text();
                        ScreeningMethod = $(this).find('ScreeningMethod').text();
                        CurrentDate = $(this).find('CurrentDate').text();
                        IsReleased = $(this).find('IsReleased').text();
                        
                        //JsBarcode("#barcode", PermitNo, {

                        //    width: 2,
                        //    height: 40,
                        //    displayValue: false
                        //});

                        if (IsReleased == 'R') {
                            $('#btnReleased').attr('disabled', 'disabled');
                        } else {
                            $('#btnReleased').removeAttr('disabled');
                        }


                        $('#spnRunDate').text(CurrentDate);
                        $('#spnGatePassNo').text(PermitNo);
                        $('#spnFlightNo').text(FltNo);
                        $('#spnGatePassDate').text(PermitDate);
                        $('#spnFlightDate').text(FlightDate);

                    }

                });

                $(xmlDoc).find('Table2').each(function () {

                    Rpt_Header = $(this).find('Rpt_Header').text();
                    ChangePermitNo = $(this).find('ChangePermitNo').text();
                    ChangePermitDate = $(this).find('ChangePermitDate').text();
                    ReleaseSummary = $(this).find('ReleaseSummary').text();
                    $('#trSumm').text(ReleaseSummary);
                    //$('#spnlblGP').text(ChangePermitNo);


                });

                if (response != null && response != "") {

                    html = '';
                    html += "<table border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += '<thead>';
                    html += "'<tr>";
                    html += "<th style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px'>No of Containers</th>";
                    html += "<th style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px'> No.of Pallets</th >";
                    html += "<th style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px'> BULK</th >";
                    html += "</tr>";
                    html += "</thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
                    uldddT = '';
                    $(xmlDoc).find('Table3').each(function (index) {
                        flag = '1';

                        ContainerCount = $(this).find('ContainerCount').text();
                        PalletCount = $(this).find('PalletCount').text();
                        BulkCount = $(this).find('BulkCount').text();
                        uldddT = $(this).find('UType').text();
                        if (uldddT == '') {
                            uldComing = _uldtyp;
                        } else {
                            uldComing = $(this).find('UType').text();
                        }


                        fnContainerCount(ContainerCount, PalletCount, BulkCount);
                    });
                    html += "</tbody></table>";
                    $('#containerDiv').show();
                    $('#containerDiv').append(html);
                    //if (_GroupId != '') {
                    //    $('#divVCTDetail').show();
                    //    $('#divVCTDetail').append(html);
                    //}


                } else {
                    errmsg = 'No record found';
                    $.alert(errmsg);
                }

                if (response != null && response != "") {
                    ContainersFlag = 0;
                    html1 = '';
                    html1 += "  <table border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";

                    html1 += "<tr>";
                    html1 += "<td style='font-size: 14px;' colspan='2'>Containers Details</td>";
                    html1 += "</tr>";
                    html1 += "<tr>";
                    html1 += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center' font-weight:'bold'>Containers No.</th>";
                    html1 += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center' font-weight:'bold'> Containers Status</th >";
                    html1 += "</tr>";
                    html1 += "</thead>";
                    html1 += "<tbody>";
                    var xmlDoc = $.parseXML(response);
                    $(xmlDoc).find('Table4').each(function (index) {
                        ContainersFlag = 1;
                        ULDNo = $(this).find('ULDNo').text();
                        Status = $(this).find('Status').text();

                        fnContainer(ULDNo, Status);
                    });

                    if (ContainersFlag == 1) {
                        html += "</tbody></table>";
                        $('#divContainer').show();
                        $('#divContainer').append(html1);
                    }


                } else {
                    errmsg = 'No record found';
                    $.alert(errmsg);
                }
                if (response != null && response != "") {
                    Palletsflag = 0;
                    html2 = '';
                    html2 += "  <table border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html2 += "<tr>";
                    html2 += "<td style='font-size: 14px;' colspan='2'>Pallets Details</td>";
                    html2 += "</tr>";
                    html2 += "<tr>";
                    html2 += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center' font-weight:'bold'>Pallets No.</th>";
                    html2 += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center' font-weight:'bold'>Pallets Status</th >";
                    html2 += "</tr>";
                    html2 += "</thead>";
                    html2 += "<tbody>";
                    var xmlDoc = $.parseXML(response);
                    $(xmlDoc).find('Table5').each(function (index) {
                        Palletsflag = 1;
                        ULDNo = $(this).find('ULDNo').text();
                        Status = $(this).find('Status').text();

                        fnPallets(ULDNo, Status);
                    });

                    if (Palletsflag == 1) {
                        html += "</tbody></table>";
                        $('#divPallets').show();
                        $('#divPallets').append(html2);
                    }


                } else {
                    errmsg = 'No record found';
                    $.alert(errmsg);
                }


                if (response != null && response != "") {
                    BULKflag = 0;
                    html3 = '';
                    html3 += " <table border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html3 += "<tr>";
                    html3 += "<td style='font-size: 14px;' colspan='2'>BULK Details</td>";
                    html3 += "<tr>";
                    html3 += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center' font-weight:'bold'>Trolley No.</th>";
                    html3 += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center' font-weight:'bold'>AWB No.</th>";
                    html3 += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center' font-weight:'bold' > No.of Packages</th >";
                    html3 += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center' font-weight:'bold' > Gross Weight</th >";
                    html3 += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center' font-weight:'bold' > Screening</th >";
                    html3 += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center' font-weight:'bold' > Priority</th >";
                    html3 += "</tr>";
                    html3 += "</thead>";
                    html3 += "<tbody>";
                    var xmlDoc = $.parseXML(response);
                    $(xmlDoc).find('Table6').each(function (index) {
                        BULKflag = 1;
                        ULDNo = $(this).find('ULDNo').text();
                        AWBNo = $(this).find('AWBNo').text();
                        NOP = $(this).find('NOP').text();
                        GrossWt = $(this).find('GrossWt').text();
                        Screening = $(this).find('Screening').text();
                        FltSqNo = $(this).find('FltSqNo').text();
                        ULDSqNo = $(this).find('ULDSqNo').text();
                        PermitNo = $(this).find('PermitNo').text();
                        Priority = $(this).find('Priority').text();

                        fnBULKDetails(ULDNo, AWBNo, NOP, GrossWt, Screening, FltSqNo, ULDSqNo, PermitNo, Priority);
                    });

                    if (BULKflag == 1) {
                        html += "</tbody></table>";
                        $('#divULDTrolley').show();
                        $('#divULDTrolley').append(html3);
                    }


                } else {
                    errmsg = 'No record found';
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

function fnContainerCount(ContainerCount, PalletCount, BulkCount) {

    html += "<tr>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='right'>" + ContainerCount + "</td>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='right'>" + PalletCount + "</td>";
    html += "<td height='30' style='background: rgb(224, 243, 215); padding - left: 4px; font - size: 14px' align='right'>" + BulkCount + "</td>";
    html += "</tr>";
}

function fnContainer(ULDNo, Status) {
    html1 += "<tr>";
    html1 += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='left'>" + ULDNo + "</td>";
    html1 += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='left'>" + Status + "</td>";
    html1 += "</tr>";
}

function fnPallets(ULDNo, Status) {

    html2 += "<tr>";
    html2 += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='left'>" + ULDNo + "</td>";
    html2 += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='left'>" + Status + "</td>";
    html2 += "</tr>";
}

function fnBULKDetails(ULDNo, AWBNo, NOP, GrossWt, Screening, FltSqNo, ULDSqNo, PermitNo, Priority) {
    html3 += "<tr>";
    html3 += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='left'>" + ULDNo + "</td>";
    html3 += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='left'>" + AWBNo + "</td>";
    html3 += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='right'>" + NOP + "</td>";
    html3 += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='right'>" + GrossWt + "</td>";
    html3 += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='left'>" + Screening + "</td>";
    html3 += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px' align='left'>" + Priority + "</td>";
    html3 += "</tr>";
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
    $('#spnErrormsg').text('');
    $('#btnPayTSP').attr('disabled', 'disabled');
    $('#txtRemark').val('');

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




function ExportAirside_SignUpload_V3_1() {

    var arr = flSeqID.split('~')
    var flSq = arr[0];
    var uldSq = arr[1];

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //if ($("#txtCustomerName").val() == "") {
    //    return
    //}

    //if ($("#txtCustomerName").val() == "") {
    //    $("#showMsg1").text('Please enter customer name and signature.').css({ 'color': 'red' });
    //    return
    //} else {
    //    $("#showMsg1").text('');
    //}

    //if (signaturePad.isEmpty()) {
    //    $("#showMsg1").text('Signature is mandatory.').css({ 'color': 'red' });
    //    return;
    //    //  signitureDataURL = '';
    //} else {
    //    $("#showMsg1").text('');
    //}

    canvas = document.getElementById('signature-pad');
    signitureData = canvas.toDataURL("image/jpeg");
    str = signitureData;
    signitureDataURL = str.substring(23);

    var InputXML = '<Root><BinaryImage>' + signitureDataURL + '</BinaryImage><DesigType>C</DesigType><GpNo>' + PermitNo + '</GpNo><FlightSeqNo>' + flSq + '</FlightSeqNo><ULDSeqNo>' + uldSq + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><UserId>' + UserID + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "ExportAirside_SignUpload_V3",
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
                        $("#spnErrormsg").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();
                        return true;
                    } else {
                        $("#spnErrormsg").text(StrMessage).css({ 'color': 'green' });
                        // $("#txtCustomerName").val('');

                        signaturePad.clear();
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




function ExportAirside_SignUpload_V3_2() {

    var arr = flSeqID.split('~')
    var flSq = arr[0];
    var uldSq = arr[1];

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //if ($("#txtSecuirty").val() == "") {
    //    return
    //}

    //if ($("#txtSecuirty").val() == "") {
    //    $("#showMsg2").text('Please enter Security name and signature.').css({ 'color': 'red' });
    //    return
    //} else {
    //    $("#showMsg2").text('');
    //}

    //if (signaturePad_1.isEmpty()) {
    //    $("#showMsg2").text('Signature is mandatory.').css({ 'color': 'red' });
    //    return;
    //    //  signitureDataURL = '';
    //} else {
    //    $("#showMsg2").text('');
    //}

    canvas = document.getElementById('sig_2');
    asd = canvas.toDataURL("image/jpeg");
    str = asd;
    signitureDataURL = str.substring(23);

    var InputXML = '<Root><DesigType>A</DesigType><BinaryImage>' + signitureDataURL + '</BinaryImage><DesigType>A</DesigType><GpNo>' + PermitNo + '</GpNo><FlightSeqNo>' + flSq + '</FlightSeqNo><ULDSeqNo>' + uldSq + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><UserId>' + UserID + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "ExportAirside_SignUpload_V3",
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
                        $("#spnErrormsg").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();
                        return true;
                    } else {
                        $("#spnErrormsg").text(StrMessage).css({ 'color': 'green' });
                        // $("#txtSecuirty").val('');
                        signaturePad_2.clear();

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







function ExportAirside_SignUpload_V3_3() {

    var arr = flSeqID.split('~')
    var flSq = arr[0];
    var uldSq = arr[1];
    _ulddSQ = flSq;
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //if ($("#txtAirline").val() == "") {
    //    return
    //}

    //if ($("#txtAirline").val() == "") {
    //    $("#showMsg2").text('Please enter Security name and signature.').css({ 'color': 'red' });
    //    return
    //} else {
    //    $("#showMsg2").text('');
    //}

    //if (signaturePad_1.isEmpty()) {
    //    $("#showMsg2").text('Signature is mandatory.').css({ 'color': 'red' });
    //    return;
    //    //  signitureDataURL = '';
    //} else {
    //    $("#showMsg2").text('');
    //}

    _canvas = document.getElementById('sig_1');
    signitureData = _canvas.toDataURL("image/jpeg");
    _str = signitureData;
    _signitureDataURL = _str.substring(23);

    var InputXML = '<Root><BinaryImage>' + _signitureDataURL + '</BinaryImage><DesigType>S</DesigType><GpNo>' + PermitNo + '</GpNo><FlightSeqNo>' + flSq + '</FlightSeqNo><ULDSeqNo>' + uldSq + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><UserId>' + UserID + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "ExportAirside_SignUpload_V3",
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
                        $("#spnErrormsg").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();
                        return true;
                    } else {
                        $("#spnErrormsg").text(StrMessage).css({ 'color': 'green' });
                        //  $("#txtAirline").val('');
                        signaturePad_1.clear();
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

function onExit() {
    localStorage.removeItem('flSeqID');
    localStorage.removeItem('_uldtyp');
    localStorage.removeItem('gatePassComing');
    window.location.href = 'EXP_AirsideRelease_Search.html'
}


function ReleaseULDBulk() {

    //if (flag == 'U') {
    //    if ($('#ddlULD').find('option:selected').text() == "" || $('#ddlULD').find('option:selected').text() == "Select") {
    //        //errmsg = "ULD not selected";
    //        //$.alert(errmsg);
    //        $('#spnValMsg').text('ULD not selected').css('color', 'red');
    //        return;
    //    } else {
    //        $('#spnValMsg').text('');
    //    }
    //}

    //if (flag == 'T') {
    //    if ($('#ddlBulk').find('option:selected').text() == "" || $('#ddlBulk').find('option:selected').text() == "Select") {
    //        //errmsg = "Bulk not selected";
    //        //$.alert(errmsg);
    //        $('#spnValMsg').text('Bulk not selected').css('color', 'red');
    //        return;
    //    } else {
    //        $('#spnValMsg').text('');
    //    }
    //}

    //if ($('#txtGPNo1').val() == "") {
    //    //errmsg = "Please enter GP No.";
    //    //$.alert(errmsg);
    //    $('#spnValMsg').text('Please enter GP No.').css('color', 'red');
    //    return;
    //} else {
    //    $('#spnValMsg').text('');
    //}

    //if ($('#txtGPNo1').val().length != '14') {
    //    //errmsg = "Please enter valid GP No.";
    //    //$.alert(errmsg);
    //    $('#spnValMsg').text('Please enter valid GP No.').css('color', 'red');
    //    return;
    //} else {
    //    $('#spnValMsg').text('');
    //}

    //if (flag == 'U')
    //    var ULDseqNo = $('#ddlULD').find('option:selected').val();
    //if (flag == 'T')
    //    var ULDseqNo = $('#ddlBulk').find('option:selected').val();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var inputXML = '<Root><ULDSeqNo>' + ULDseqNo + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><GPNo>' + PermitNo + '</GPNo><ULDSeqNo>' + _ulddSQ + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity><ULDType>' + uldComing + '</ULDType><UserId>' + UserId + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            //   url: GHAExportFlightserviceURL + "UpdateULDRelease",
            url: GHAExportFlightserviceURL + "ExportAirside_Release_V3",
            data: JSON.stringify({ 'InputXML': inputXML }),
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

                $(xmlDoc).find('Table').each(function () {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $.alert(StrMessage).css('color', 'red');
                        //  $("#showMsg2").text(StrMessage).css({ 'color': 'red' });
                        // clearALL();

                        return true;
                    } else {
                        $.alert(StrMessage).css({ 'color': 'green' });
                        // $("#txtAirline").val('');
                        // signaturePad.clear();
                        $('.alert_btn_ok').click(function () {
                            window.location.href = 'EXP_AirsideRelease_Search.html';

                        });
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



//1
var canvas = document.getElementById('signature-pad');

var signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});

var canvas_1 = document.getElementById('sig_1');

var signaturePad_1 = new SignaturePad(canvas_1, {
    backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});

var canvas_2 = document.getElementById('sig_2');

var signaturePad_2 = new SignaturePad(canvas_2, {
    backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});


function resizeCanvas() {
    var cachedWidth;
    var cachedImage;

    if (canvas.offsetWidth !== cachedWidth) { //add
        if (typeof signaturePad != 'undefined') { // add
            cachedImage = signaturePad.toDataURL("image/png");
        }
        cachedWidth = canvas.offsetWidth;   //add
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        if (typeof signaturePad != 'undefined') {
            // signaturePad.clear(); // remove
            signaturePad.fromDataURL(cachedImage); // add
        }
    }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


function resizeCanvas_1() {
    var cachedWidth;
    var cachedImage;

    if (canvas.offsetWidth !== cachedWidth) { //add
        if (typeof signaturePad_1 != 'undefined') { // add
            cachedImage = signaturePad_1.toDataURL("image/png");
        }
        cachedWidth = canvas.offsetWidth;   //add
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        if (typeof signaturePad_1 != 'undefined') {
            // signaturePad.clear(); // remove
            signaturePad_1.fromDataURL(cachedImage); // add
        }
    }
}

window.addEventListener("resize", resizeCanvas_1);
resizeCanvas_1();



