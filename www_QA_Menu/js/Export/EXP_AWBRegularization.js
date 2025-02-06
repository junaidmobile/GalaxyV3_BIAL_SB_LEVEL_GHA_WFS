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

  //  document.addEventListener('deviceready', AddLocation, false);
    //document.addEventListener('deviceready', AddingTestLocation, false);

    // ImportDataList();

    //var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';

    //SHCSpanHtml(stringos);

    $("input").keyup(function () {
        var string = $(this).val();
        // var string = $('#txtOrigin').val();
        if (string.match(/[`!₹@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
            /*$('#txtOrigin').val('');*/
            $(this).val('');
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }

    });

});


function checkSpecialChar() {
    var string = $('#txtAWBNo').val();
    if (string.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        $('#txtAWBNo').val('');
        return true;    // Contains at least one special character or space
    } else {
        return false;
    }
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



function ChangeAWBNo_GetData() {

    if ($('#txtAWBNo').val() == '') {
        //$('#spnErrormsg').text('Please enter Old AWB No.').css('color', 'red');
        return;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    var InputXML = '<Root> <OldAWBNo>' + $('#txtAWBNo').val() + '</OldAWBNo> <AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "ChangeAWBNo_GetData",
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
                $("#spnErrormsg").text('');
                //$('#divVCTDetail').html('');
                //$('#divVCTDetail').empty();
                console.log(xmlDoc);
                if (response != null && response != "") {
                    $('#divVCTDetail').hide();
                    $('#divVCTDetail').empty();
                    $('#tblOldAWBDetails').empty();
                    html = '';

                    //html += '<table id="tblOldAWBDetails" class="table table-striped table-bordered" style="font-size: 20px; margin-top: 10px !important; margin-bottom: 0px; ">';
                    //html += '<thead style="background-color:rgb(208, 225, 244);">';
                    //html += '<tr>';
                    //html += '<th>Pcs.</th>';
                    //html += '<th>Gr. Wt.</th>';
                    //html += '<th>Ch. Wt.</th>';
                    //html += '<th>NOG </th>';
                    //html += '<th>Agt. </th>';
                    //html += '</tr>';
                    //html += '</thead>';
                    //html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
                    $(xmlDoc).find('Table1').each(function (index) {
                        $('#lblMessage').text('');
                        //var Status = $(this).find('Status').text();
                        //var StrMessage = $(this).find('StrMessage').text();
                        //if (Status == 'E') {
                        //    $.alert(StrMessage);
                        //    $('#divULDNumberDetails').empty();
                        //    $('#divULDNumberDetails').hide();
                        //    html = '';
                        //    return;
                        //}

                        flag = '1';

                        Pieces = $(this).find('Pieces').text();
                        GrWt = $(this).find('GrWt').text();
                        ChWt = $(this).find('ChWt').text();
                        Commodity = $(this).find('Commodity').text();
                        Agent = $(this).find('Agent').text();


                        OldAWBNoDetails(Pieces, GrWt, ChWt, Commodity, Agent);
                    });
                    html += "</tbody></table>";
                    $('#divVCTDetail').show();
                    $('#divVCTDetail').append(html);
                    //if (_GroupId != '') {
                    //    $('#divVCTDetail').show();
                    //    $('#divVCTDetail').append(html);
                    //}


                    $(xmlDoc).find('Table').each(function () {

                        var Status = $(this).find('Status').text();
                        var StrMessage = $(this).find('StrMessage').text();
                        if (flag == '0') {
                            $("#spnErrormsg").text('');
                            $("#spnErrormsg").text('AWB No. not found.').css('color', 'red');
                            html = '';
                            $('#divVCTDetail').empty();
                            $('#txtAWBNo').val('');
                            $('#txtAWBNo').focus();
                            return true;
                        }
                    });


                } else {
                    errmsg = 'No data found.';
                    $.alert(errmsg);
                }
            },
            //error: function (msg) {
            //    //debugger;
            //    $("body").mLoading('hide');
            //    var r = jQuery.parseJSON(msg.responseText);
            //    $.alert(r.Message);
            //}
            error: function (xhr, textStatus, errorThrown) {
                $("body").mLoading('hide');
                //alert('Server not responding...');
                console.log(xhr.responseText);
                alert(xhr.responseText);
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

function grplength() {
    if ($('#txtGroupId').val().length == 14) {
        $('#txtLocation').focus();
    }
}

function OldAWBNoDetails(Pieces, GrWt, ChWt, Commodity, Agent) {

    html += '<table id="tblOldAWBDetails" class="table table-striped table-bordered" style="font-size: 20px; margin-top: 10px !important; margin-bottom: 0px; ">';
   // html += '<thead style="background-color:rgb(208, 225, 244);">';
    html += '<tbody>';
    html += '<tr>';
    html += '<td>Pieces</td><td class="txtRight">' + Pieces + '</td>';
    html += '</tr>';
    html += '<tr>';
    html += '<td>Gr. Wt.</td><td class="txtRight">' + GrWt + '</td>';
    html += '</tr>';
    html += '<tr>';
    html += '<td>Ch. Wt.</td><td class="txtRight">' + ChWt + '</td>';
    html += '</tr>';
    html += '<tr>';
    html += '<td>NOG </td><td>' + Commodity + '</td>';
    html += '</tr>';
    html += '<tr>';
    html += '<td>Agent Name </td><td>' + Agent + '</td>';
    html += '</tr>';
   // html += '</thead>';
   

    //html += '<tr>';
    //html += '<td style="background: rgb(224, 243, 215);">' + Pieces + '</td>';
    //html += '<td style="background: rgb(224, 243, 215);">' + GrWt + '</td>';
    //html += '<td style="background: rgb(224, 243, 215);">' + ChWt + '</td>';
    //html += '<td style="background: rgb(224, 243, 215);">' + Commodity + '</td>';
    //html += '<td style="background: rgb(224, 243, 215);">' + Agent + '</td>';
    //html += '</tr>';
}


function ChangeAWBNo_SaveData() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if ($('#txtAWBNo').val() == '') {
        $('#spnErrormsg').text('Please enter Old AWB No.').css('color', 'red');
        return;
    } else {
        $('#spnErrormsg').text('');

    }
    if ($('#txtNewAWBNo').val() == '') {
        $('#spnErrormsg').text('Please enter New AWB No.').css('color', 'red');
        return;
    } else {
        $('#spnErrormsg').text('');

    }

    // var InputXML = '<Root> <OldAWBNo>' + $('#txtAWBNo').val() + '</OldAWBNo> <AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';
    var InputXML = '<Root> <OldAWBNo>' + $('#txtAWBNo').val() + '</OldAWBNo><NewAWBNo>' + $('#txtNewAWBNo').val() + '</NewAWBNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><CreatedBy>' + UserID + '</CreatedBy></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "ChangeAWBNo_SaveData",
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
                $(xmlDoc).find('Table').each(function () {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();


                    if (Status == 'E') {
                        $("#spnErrormsg").text('');
                        $("#spnErrormsg").text(StrMessage).css('color', 'red');
                        //$('#divVCTDetail').empty();
                        //$('#divVCTDetail').hide();
                        html = '';
                        return true;
                    } else {
                        $('#txtAWBNo').val('');
                        $('#txtNewAWBNo').val('');
                        $('#divVCTDetail').empty();
                        $("#spnErrormsg").text('');
                        $("#spnErrormsg").text(StrMessage).css('color', 'green');
                        $('#txtAWBNo').focus();

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



function clearALL() {
    $('#txtAWBNo').val('');
    $('#txtNewAWBNo').val('');
    $('#divVCTDetail').empty();
    $('#spnErrormsg').text('');
    $('#txtAWBNo').focus();

}

function ClearIGM() {

    $('#ddlIGM').empty();
}

function clearBeforePopulate() {
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
}

function ChkAndValidate() {

    var ScanCode = $('#txtAWBNo').val();
    ScanCode = ScanCode.replace(/\s+/g, '');
    ScanCode = ScanCode.replace("-", "").replace("–", "");

    if (ScanCode.length >= 11) {

        $('#txtAWBNo').val(ScanCode.substr(0, 11));
        //$('#txtAWBNo').val(ScanCode.substr(3, 8));
        //$('#txtScanCode').val('');

        //GetShipmentStatus();
    }
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

$(function () {
    //$("#txtBCDate").datepicker({
    //    dateFormat: "dd/mm/yy"
    //});
    //$("#txtBCDate").datepicker().datepicker("setDate", new Date());
});


