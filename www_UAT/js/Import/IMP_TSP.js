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

    if (window.localStorage.getItem("RoleIMPBinning") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }
    
    
    // ImportDataList();

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
        if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓π@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
            /*$('#txtOrigin').val('');*/
            $(this).val('');
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }

    });

    $('#btnPayTSP').attr('disabled', 'disabled');


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



function CalculateTSP() {
    clearALLBeforeSearch();

    if ($('#txtAWBNo').val() == '') {
        return;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();

    var InputXML = '<Root><AWBNumber>' + MAWBNo + '</AWBNumber><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserID + '</UserId><PaymentMode></PaymentMode><GSTIN></GSTIN><Remark></Remark></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "CalculateImportTSPDetails",
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
                $('#ddlPaymentMode').empty();
                console.log(xmlDoc);
                var Status
                var StrMessage

                $(xmlDoc).find('Table2').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                });
                $(xmlDoc).find('Table3').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                });
                $(xmlDoc).find('Table4').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                });
                $(xmlDoc).find('Table5').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                });
                $(xmlDoc).find('Table6').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                });

                if (Status == 'E') {
                    $("#spnErrormsg").text(StrMessage).css({ 'color': 'red' });
                    $('#btnPayTSP').attr('disabled', 'disabled');

                    return;
                } else {
                    $("#spnErrormsg").text('');
                    $('#btnPayTSP').removeAttr('disabled');

                }

                $(xmlDoc).find('Table1').each(function () {

                    var Totalchargeamount = $(this).find('TotalCharge').text();
                    var TotalTax = $(this).find('TotalTax').text();
                    var TotalAmount = $(this).find('TotalAmount').text();
                    var TotalAdjustableAmt = $(this).find('TotalAdjustableAmt').text();
                    var TotalPayableAmount = $(this).find('TotalPayableAmount').text();

                    $("#tdAmount").text(Totalchargeamount);
                    $("#tdTexAmount").text(TotalTax);
                    $("#tdTotalInvoicAmount").text(TotalAmount);
                    $("#tdRoundOffAmount").text(TotalAdjustableAmt);
                    $("#tdFinalInvoiceAmount").text(TotalPayableAmount);

                });

                $(xmlDoc).find('Table3').each(function () {

                    var PaymentId = $(this).find('PaymentId').text();
                    var PaymentMode = $(this).find('PaymentMode').text();

                    var newOption = $('<option></option>');
                    newOption.val(PaymentId).text(PaymentMode);
                    newOption.appendTo('#ddlPaymentMode');
                });

                $(xmlDoc).find('Table4').each(function () {
                    Pieces = $(this).find('Pieces').text();
                    ChargebleWeight = $(this).find('ChargebleWeight').text();
                    GrossWeight = $(this).find('GrossWeight').text();
                    Commodity = $(this).find('Commodity').text();
                    SHC = $(this).find('SHC').text();
                    AgentId = $(this).find('AgentId').text();
                    Agent = $(this).find('Agent').text();
                    AgentShortCode = $(this).find('AgentShortCode').text();
                    DocType = $(this).find('DocType').text();
                    RefType = $(this).find('RefType').text();
                    DocumentId = $(this).find('DocumentId').text();
                    DueDate = $(this).find('DueDate').text();
                    ShipperId = $(this).find('ShipperId').text();
                    PaymentMode = $(this).find('PaymentMode').text();
                    TaxId = $(this).find('TaxId').text();
                    
                    $("#tdPieces").text(Pieces);
                    $("#tdGrWt").text(GrossWeight);
                    $("#tdChWt").text(ChargebleWeight);
                    $("#txtAgentName").val(Agent);
                    $("#txtCommodity").val(Commodity);
                    $("#ddlPaymentMode").val(PaymentMode);
                    $("#txtGSTIN").val(TaxId);
                    
                    SHCSpanHtml(SHC);
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

function PayTSP() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if ($('#txtAWBNo').val() == '') {
        $("#spnErrormsg").text('Please enter AWB No.').css({ 'color': 'red' });

        return;
    }


    if ($('#ddlPaymentMode').val() == '-1') {
        $("#spnErrormsg").text('Please select Payment Mode.').css({ 'color': 'red' });

        return;
    }

    var MAWBNo = $('#txtAWBNo').val();

    var InputXML = '<Root><AWBNumber>' + MAWBNo + '</AWBNumber><AirportCity>' + AirportCity + '</AirportCity><Culture>' + AirportCity + '</Culture><UserId>' + UserID + '</UserId><PaymentMode>' + $('#ddlPaymentMode').val() + '</PaymentMode><GSTIN>' + $('#txtGSTIN').val() + '</GSTIN><Remark>' + $('#txtRemark').val() + '</Remark></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "PayImportTSP",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                var Status;
                var StrMessage;
                $(xmlDoc).find('Table').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $("#spnErrormsg").text(StrMessage).css({ 'color': 'red' });
                        return;
                    } else {
                        $("#spnErrormsg").text(StrMessage).css({ 'color': 'green' });
                        $('#btnPayTSP').attr('disabled', 'disabled');
                        clearALLafterSave();
                    }
                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert(msg.d);
            }
        });
        return false;
    }

}


function checkGSTNumber() {
    if ($('#txtGSTIN').val() != '') {
        var GSTIN = $('#txtGSTIN').val();
        var reggst = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;
        if (!reggst.test(GSTIN)) {
            $("#spnErrormsg").text('GST Identification Number is not valid. It should be in this "11AAAAA1111Z1A1" format').css({ 'color': 'red' });
            $('#txtGSTIN').val('');
        } else {
            $("#spnErrormsg").text('');
        }
    }
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




