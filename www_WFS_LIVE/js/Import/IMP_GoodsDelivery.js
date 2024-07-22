

var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var UserId = window.localStorage.getItem("UserID");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var companyCode = window.localStorage.getItem("companyCode");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var WDOSeqNo;
var WDONo;
var html;
var LocationRowID;
var AWBRowID;
var HAWBId;
var inputRowsforLocation = "";
var _ULDFltSeqNo;
var imgDataForSave = '';

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


    document.getElementById("cameraTakePicture").addEventListener
        ("click", cameraTakePicture);

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


function cameraTakePicture() {

    navigator.camera.getPicture(onSuccess, onFail, {
        //quality: 100,
        //encodingType: Camera.EncodingType.JPEG,
        ////allowEdit: true,
        ////correctOrientation: true,
        //targetWidth: 250,
        //targetHeight: 250,
        //destinationType: Camera.DestinationType.DATA_URL
        destinationType: Camera.DestinationType.DATA_URL, //DATA_URL , FILE_URI
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true,
        correctOrientation: true //Corrects Android orientation quirks
    });


}

function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    var data = "data:image/jpeg;base64," + imageData;
    imgDataForSave = imageData;
    $('#myImage').attr('src', data);
    $('#myImage').css('display', 'block');

}

function onFail(message) {
    alert('Failed because: ' + message);
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


function onKeypreessVTNo() {
    if ($("#txtGatePassScanNo").val().length == 14) {
        GetGatePassDetails();
    }
}

function GetGatePassDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePassScanNo = $('#txtGatePassScanNo').val().toUpperCase();

    if (txtGatePassScanNo.length >= "8") {
        $('#btnGoodsDelever').removeAttr('disabled');
    } else {
        $('#btnGoodsDelever').attr('disabled', 'disabled');
        return;
    }
    $('#spnMsg').text('');
    var InputXML = '<Root><WDONo>' + $('#txtGatePassScanNo').val() + '</WDONo><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture></Root>';
   
    if (txtGatePassScanNo.length >= '8') {
        if (errmsg == "" && connectionStatus == "online") {
            $.ajax({
                type: 'POST',
                url: GHAImportFlightserviceURL + "GetHHTImportWDOSearchV3",
                data: JSON.stringify({
                    'InputXML': InputXML,
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
                    var StrMessage;
                    $(xmlDoc).find('Table').each(function () {

                        var Status = $(this).find('Status').text();

                        StrMessage = $(this).find('StrMessage').text()
                        var TxtColor = $(this).find('TxtColor').text()


                        if (Status == 'E') {
                            $("#spnMsg").text('');
                            $("#spnMsg").text(StrMessage).css({ 'color': 'red' });
                            $('#btnGoodsDelever').attr('disabled', 'disabled');
                            //$('#divVCTDetail').empty();
                            //$('#divVCTDetail').hide();
                            html = '';
                            return true;
                        }


                    });

                    if (response != null && response != "") {

                        //html = '';

                        //html += '<table id="tblNewsForGatePass" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;">';
                        //html += '<thead>';
                        //html += '<tr>';
                        //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">MAWB No.</th>';
                        //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">HAWB No.</th>';
                        //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Pieces</th>';
                        ////html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Remarks</th>';
                        //html += '</tr>';
                        //html += '</thead>';
                        //html += '<tbody>';

                        //var xmlDoc = $.parseXML(response);
                        //var flag = '0';
                        $(xmlDoc).find('Table1').each(function (index) {

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

                            WDOSeqNo = $(this).find('WDOSeqNo').text();
                            WDONo = $(this).find('WDONo').text();

                            //  VCTNoDetails(MAWBNO, HAWBNO, DlvblPkgs, Remarks);
                            //if (DeliveryStatus == 'Delivered') {
                            //    $("#spnMsg").text('');
                            //    $("#spnMsg").text('Goods already delivered.').css({ 'color': 'red' });
                            //    $('#btnGoodsDelever').attr('disabled', 'disabled');
                            //    //$('#divVCTDetail').empty();
                            //    //$('#divVCTDetail').hide();
                            //    html = '';
                            //    return true;
                            //} else {
                            //    VCTNoDetails(MAWBNO, HAWBNO, DlvblPkgs, Remarks);
                            //}

                        });
                        //html += "</tbody></table>";
                        //$('#divVCTDetail').show();
                        //$('#divVCTDetail').append(html);
                        //if (GPNo != '') {

                        //}


                    } else {
                        //errmsg = 'GP No. does not exists.';
                        //$.alert(errmsg);
                        $("#spnMsg").text('GP No. does not exists.').css('color', 'red');
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
}

var canvas = document.getElementById('signature-pad');

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
//function resizeCanvas() {

//    // When zoomed out to less than 100%, for some very strange reason,
//    // some browsers report devicePixelRatio as less than 1
//    // and only part of the canvas is cleared then.
//    var ratio = Math.max(window.devicePixelRatio || 1, 1);
//    canvas.width = canvas.offsetWidth * ratio;
//    canvas.height = canvas.offsetHeight * ratio;
//    canvas.getContext("2d").scale(ratio, ratio);
//}

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

var signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});



document.getElementById('clear').addEventListener('click', function () {
    signaturePad.clear();
});
var data = signaturePad.toData();
document.getElementById('undo').addEventListener('click', function () {

    if (data) {
        data.pop(); // remove the last dot or line
        signaturePad.fromData(data);
    }
});

signaturePad.fromData(data, { clear: false });

function RecordGoodsDelivery_PDA() {

    if (signaturePad.isEmpty()) {
        $("#spnMsg").text('Signature is mandatory.').css({ 'color': 'red' });
        return;
        //  signitureDataURL = '';
    } else {
        $("#spnMsg").text('');
    }

    canvas = document.getElementById('signature-pad');
    signitureData = canvas.toDataURL("image/jpeg");
    str = signitureData;
    signitureDataURL = str.substring(23);


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePassScanNo = $('#txtGatePassScanNo').val();

    if (txtGatePassScanNo != "") {
        $('#btnGoodsDelever').removeAttr('disabled');
    } else {
        $('#btnGoodsDelever').attr('disabled', 'disabled');
        return;
    }

    var InputXML = '<Root><WDOSEQNO>' + WDOSeqNo + '</WDOSEQNO><SignatureImage>' + signitureDataURL + '</SignatureImage><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserID>' + UserId + '</UserID></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "ReleaseHHTImportWDOV3",
            data: JSON.stringify({
                'InputXML': InputXML,

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
                //var str = response.d;
                // $.alert(response);
                $(xmlDoc).find('Table1').each(function (index) {
                    var Status = $(this).find('Status').text();

                    if (Status == 'E') {
                        $("#spnMsg").text($(this).find('OutMsg').text()).css('color', 'red');
                        $('#txtAWBNo').val('');
                        $('#divAddLocation').empty();
                        return;
                    } else {
                        $("#spnMsg").text($(this).find('OutMsg').text()).css('color', 'green');

                    }

                });
                //$("#spnMsg").text('');
                //$("#spnMsg").text(response);
                //signaturePad.clear();
                //$('#txtGatePassScanNo').val('');
                //$('#tblNewsForGatePass').hide();
                //$('#divVCTDetail').empty();
                //$('#myImage').hide();
                //$('#txtGatePassScanNo').focus();
                //$('#btnGoodsDelever').attr('disabled', 'disabled');
                // GetGatePassDetails();
                // $('#btnGoodsDelever').attr('disabled', 'disabled');
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


function VCTNoDetails(MAWBNO, HAWBNO, DlvblPkgs, Remarks) {

    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;">' + MAWBNO + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;">' + HAWBNO + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:center;">' + DlvblPkgs + '</td>';
    //html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + Remarks + '</td>';
    html += '</tr>';
}



function clearAWBDetails() {
    $('#txtGatePassScanNo').val('');
    $('#tblNewsForGatePass').hide();
    $('#divVCTDetail').empty();
    $('#myImage').hide();
    $('#spnMsg').text('');
    $('#txtGatePassScanNo').focus();
    $('#btnGoodsDelever').attr('disabled', 'disabled');
    signaturePad.clear();

}




function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

