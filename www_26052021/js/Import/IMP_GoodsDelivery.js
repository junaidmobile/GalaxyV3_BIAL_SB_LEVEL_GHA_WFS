

var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
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

function GetGatePassDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePassScanNo = $('#txtGatePassScanNo').val();



    if (txtGatePassScanNo != "") {
        $('#btnGoodsDelever').removeAttr('disabled');
    } else {
        $('#btnGoodsDelever').attr('disabled', 'disabled');
        return;
    }


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetImportsFinalDeliveryDetails_PDA",
            data: JSON.stringify({
                'pi_strGPNo': txtGatePassScanNo,
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);

                $('#divVCTDetail').html('');
                $('#divVCTDetail').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();

                    var StrMessage = $(this).find('StrMessage').text()
                    var TxtColor = $(this).find('TxtColor').text()


                    if (Status == 'E') {
                        $("#spnMsg").text('');
                        $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                        //$('#divVCTDetail').empty();
                        //$('#divVCTDetail').hide();
                        html = '';
                        return true;
                    }


                });

                if (response != null && response != "") {

                    html = '';

                    html += '<table id="tblNewsForGatePass" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">MAWB No.</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">HAWB No.</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Pieces</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
                    $(xmlDoc).find('Table').each(function (index) {

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

                        GPNo = $(this).find('GPNo').text();
                        DlvblPkgs = $(this).find('DlvblPkgs').text();
                        DlvblGrWt = $(this).find('DlvblGrWt').text();
                        DlvblChWt = $(this).find('DlvblChWt').text();
                        MAWBNO = $(this).find('MAWBNO').text();
                        HAWBNO = $(this).find('HAWBNO').text();
                        Remarks = $(this).find('Remarks').text();
                        DeliveredTo = $(this).find('DeliveredTo').text();
                        CHAName = $(this).find('CHAName').text();
                        DeliveryStatus = $(this).find('DeliveryStatus').text();
                        ISMEAShipment = $(this).find('ISMEAShipment').text();

                        VCTNoDetails(MAWBNO, HAWBNO, DlvblPkgs);
                    });
                    html += "</tbody></table>";
                    if (flag == '1') {
                        $('#divVCTDetail').show();
                        $('#divVCTDetail').append(html);
                    }


                } else {
                    errmsg = 'GP No. does not exists.';
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


function RecordGoodsDelivery_PDA() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePassScanNo = $('#txtGatePassScanNo').val();

    if (txtGatePassScanNo != "") {
        $('#btnGoodsDelever').removeAttr('disabled');
    } else {
        $('#btnGoodsDelever').attr('disabled', 'disabled');
        return;
    }


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "RecordGoodsDelivery_PDA",
            data: JSON.stringify({
                'pi_intHAWBid': '0',
                'pi_strGatePassNo': txtGatePassScanNo,
                'pi_strUserName': UserId

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
                $.alert(response);
               
                GetGatePassDetails();

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


function VCTNoDetails(MAWBNO, HAWBNO, DlvblPkgs) {

    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;">' + MAWBNO + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;">' + HAWBNO + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + DlvblPkgs + '</td>';
    html += '</tr>';
}



function clearAWBDetails() {
    $('#txtGatePassScanNo').val('');
    $('#tblNewsForGatePass').hide();
    $('#divVCTDetail').empty();
    $('#spnMsg').text('');
    $('#txtGatePassScanNo').focus();
    $('#btnGoodsDelever').attr('disabled', 'disabled');
}




function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

