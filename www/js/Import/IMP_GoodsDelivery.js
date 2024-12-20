

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
var gatePassList = [];
var selectedRowHAWBNo = '1';
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


var ImagesXmlGen = '';
$(function () {
    GetButtonRights_v3();
    // $('#ddlGatePassScanNo').select2();
    if (window.localStorage.getItem("RoleIMPFinalDelivery") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }
    selectedRowHAWBNo = amplify.store("selectedRowHAWBNo");


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

    $("input").keyup(function () {
        var string = $(this).val();
        // var string = $('#txtOrigin').val();
        if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
            /*$('#txtOrigin').val('');*/
            $(this).val('');
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }

    });

    //$('#btnGoodsDelever').attr('disabled', 'disabled');
    //$('#cameraTakePicture').attr('disabled', 'disabled');

    $('#txtAWBNo').on('input', function () {
        if ($('#txtAWBNo').val().length == '11') {
            GetHHTImportWDOAWBSearchV3();
            $('#txtGatePassScanNo').focus();
        }
    });

});


//function cameraTakePicture() {

//    if ($('#txtGatePassScanNo').val() == '') {
//        $("#spnMsg").text('Please enter AWB No./WDO No.').css({ 'color': 'red' });
//        return;
//        //  signitureDataURL = '';
//    } else {
//        $("#spnMsg").text('');
//    }

//    navigator.camera.getPicture(onSuccess, onFail, {
//        //quality: 100,
//        //encodingType: Camera.EncodingType.JPEG,
//        ////allowEdit: true,
//        ////correctOrientation: true,
//        //targetWidth: 250,
//        //targetHeight: 250,
//        //destinationType: Camera.DestinationType.DATA_URL
//        destinationType: Camera.DestinationType.DATA_URL, //DATA_URL , FILE_URI
//        sourceType: Camera.PictureSourceType.CAMERA,
//        encodingType: Camera.EncodingType.JPG,
//        mediaType: Camera.MediaType.PICTURE,
//        targetWidth: 500,
//        targetHeight: 500,
//        saveToPhotoAlbum: true,
//        correctOrientation: true //Corrects Android orientation quirks
//    });


//}

var imageDataForArray = new Array();
function cameraTakePicture() {

    navigator.camera.getPicture(onSuccess, onFail, {

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
function ChkMaxLength(txt, len) {
    if ($('#' + txt.id).val().length > parseInt(len)) {
        $('#' + txt.id).val($('#' + txt.id).val().substring(0, len));
    }
}
//function onSuccess(imageData) {
//    var image = document.getElementById('myImage');
//    var data = "data:image/jpeg;base64," + imageData;
//    imgDataForSave = imageData;
//    $('#myImage').attr('src', data);
//    $('#myImage').css('display', 'block');

//}

function onSuccess(imageData) {
    //var image = document.getElementById('myImage');
    var data = "data:image/jpeg;base64," + imageData;
    imgDataForSave = imageData;
    //$('#myImage').attr('src', data);
    //$('#myImage').css('display', 'block');
    // console.log(imgData);
    imageDataForArray.push(imgDataForSave);
    htmlImages = '';
    // $("#onlyimageCount").text(imageDataForArray.length);
    //for (var i = 0; i < imageDataForArray.length; i++) {
    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
    htmlImages += '</div>';

    $('#divImages').append(htmlImages);
    if (imageDataForArray.length == 3) {
        $("#cameraTakePicture").attr('disabled', 'disabled');
    }
    console.log(imageDataForArray);

}

function onFail(message) {
    alert('Failed because: ' + message);
}



function AllImages(imageDataForArray) {
    ImagesXmlGen = '';
    // ImagesXmlGen = "<DamageRecordImage>";
    for (var n = 0; n < imageDataForArray.length; n++) {
        ImagesXmlGen += "<Image><WDOSEQNO>" + WDOSeqNo + "</WDOSEQNO><ImageData>" + imageDataForArray[n] + "</ImageData></Image>";
    }
    // ImagesXmlGen += "</DamageRecordImage>";
    console.log(ImagesXmlGen);
    return ImagesXmlGen;

}

function checkSpecialChar() {
    var string = $('#txtGatePassScanNo').val();
    if (string.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        $('#txtGatePassScanNo').val('');
        return true;    // Contains at least one special character or space
    } else {
        return false;
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


function onKeypreessVTNo() {
    if ($("#txtGatePassScanNo").val().length == 14) {
        GetGatePassDetails();
    }
}



function GetGatePassDetails() {
    WDOSeqNo = '';
    $('#divImages').empty();
    if ($('#txtGatePassScanNo').val() == '') {
        // $("#spnMsg").text('Please enter WDO No.').css({ 'color': 'red' });
        return;
        //  signitureDataURL = '';
    }



    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePassScanNo = $('#txtGatePassScanNo').val().toUpperCase();

    if (txtGatePassScanNo.length >= "8") {
        //  $('#btnGoodsDelever').removeAttr('disabled');
        $("#spnMsg").text('');
    } else {
        // $('#btnGoodsDelever').attr('disabled', 'disabled');
        $("#spnMsg").text('Please enter valid WDO No.').css({ 'color': 'red' });
        // $('#txtGatePassScanNo').val('');
        $('#divVCTDetail').empty();
        signaturePad.clear();
        return;
    }


    $('#spnMsg').text('');
    signaturePad.clear();
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
                            $('#cameraTakePicture').attr('disabled', 'disabled');

                            $('#divVCTDetail').empty();
                            $('#divVCTDetail').hide();
                            html = '';
                            // $('#txtGatePassScanNo').val('');
                            //$('#txtGatePassScanNo').focus();
                            signaturePad.clear();
                            return true;
                        } else {
                            //$('#btnGoodsDelever').removeAttr('disabled');
                            //$('#cameraTakePicture').removeAttr('disabled');

                        }


                    });

                    if (response != null && response != "") {

                        html = '';

                        html += '<table id="tblNewsForGatePass" class="table table-striped table-bordered" style="font-size: 20px; margin-top: 10px !important; margin-bottom: 0px; ">';
                        html += '<thead style="background-color:rgb(208, 225, 244);">';
                        html += '<tr>';
                        html += '<th>AWB No.</th>';
                        html += '<th>Pieces </th>';
                        html += '<th>BIN/Group Id.</th>';
                        html += '<th>Location</th>';
                        html += '</tr>';
                        html += '</thead>';
                        html += '<tbody>';



                        //var xmlDoc = $.parseXML(response);
                        var flag = '0';
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
                            AWBNo = $(this).find('AWBNo').text();
                            Pieces = $(this).find('Pieces').text();
                            GroupId = $(this).find('GroupId').text();
                            Location = $(this).find('Location').text();
                           
                            WDONoDetails(AWBNo, Pieces, GroupId, Location);

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

                        if (flag == '1') {
                            html += "</tbody></table>";
                            $('#divVCTDetail').show();
                            $('#divVCTDetail').append(html);
                        }


                    } else {
                        //errmsg = 'GP No. does not exists.';
                        //$.alert(errmsg);
                        $("#spnMsg").text('GP No. does not exists.').css('color', 'red');
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    $("body").mLoading('hide');
                    //alert('Server not responding...');
                    console.log(xhr.responseText);
                    alert(xhr.responseText);
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

    if ($('#txtGatePassScanNo').val() == '') {
        $("#spnMsg").text('Please enter AWB No./WDO No.').css({ 'color': 'red' });
        $('#divVCTDetail').empty();
        signaturePad.clear();
        return;
        //  signitureDataURL = '';
    } else {
        $("#spnMsg").text('');
    }

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

    AllImages(imageDataForArray);

    //if (ImagesXmlGen == '') {
    //    ImagesXmlGen = '<Images></Images>';
    //}

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePassScanNo = $('#txtGatePassScanNo').val();

    if (txtGatePassScanNo != "") {
        //$('#btnGoodsDelever').removeAttr('disabled');
    } else {
        //  $('#btnGoodsDelever').attr('disabled', 'disabled');
        return;
    }

    // imgDataForSave = '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';

    var InputXML = '<Root><WDOSEQNO>' + WDOSeqNo + '</WDOSEQNO><SignatureImage>' + signitureDataURL + '</SignatureImage><Images>' + ImagesXmlGen + '</Images><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserID>' + UserId + '</UserID></Root>';

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
                        // $('#txtAWBNo').val('');
                        $('#divAddLocation').empty();
                        return;
                    } else {
                        $("#spnMsg").text($(this).find('OutMsg').text()).css('color', 'green');
                        if ($(this).find('OutMsg').text() == 'Shipment released Successfully.') {
                            // $('#btnGoodsDelever').attr('disabled', 'disabled');
                            // $('#cameraTakePicture').attr('disabled', 'disabled');
                        }
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


function WDONoDetails(AWBNo, Pieces, GroupId, Location) {

    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;">' + AWBNo + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:right;">' + Pieces + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:center;">' + GroupId + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:center;padding-right: 4px;">' + Location + '</td>';
    html += '</tr>';
}



function clearAWBDetails() {
    $('#txtGatePassScanNo').val('');
    $('#tblNewsForGatePass').hide();
    $('#divVCTDetail').empty();
    $('#myImage').hide();
    $('#spnMsg').text('');
    // $('#txtGatePassScanNo').focus();
    //$('#btnGoodsDelever').attr('disabled', 'disabled');
    //$('#cameraTakePicture').attr('disabled', 'disabled');
    signaturePad.clear();
    $('#txtAWBNo').val('');
    $('#txtAWBNo').focus();
    gatePassList = [];
    $('#ddlGatePassScanNo').empty();
    $('#divImages').empty();
}




function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function GetHHTImportWDOAWBSearchV3() {

    clearBeforAWBSearch();
    if ($('#txtAWBNo').val() == '') {
        return;
        //  signitureDataURL = '';
    }
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();
    let AWBPrefix = MAWBNo.slice(0, 3);
    let AWBNo = MAWBNo.slice(3, 11);


    var InputXML = '<Root><AWBPrefix>' + AWBPrefix + '</AWBPrefix><AWBNo>' + AWBNo + '</AWBNo><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId><CompanyCode>' + companyCode + '</CompanyCode></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetHHTImportWDOAWBSearchV3",
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
                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();

                    if (Status == 'E') {
                        $("#spnMsg").text($(this).find('StrMessage').text()).css('color', 'red');
                        $('#txtGatePassScanNo').val('');
                        $('#divAddLocation').empty();
                        return;
                    }
                    //else {
                    //    $("#spnMsg").text($(this).find('OutMsg').text()).css('color', 'green');
                    //    if ($(this).find('OutMsg').text() == 'Shipment released Successfully.') {
                    //        $('#btnGoodsDelever').attr('disabled', 'disabled');
                    //    }
                    //}

                });
                gatePassList = [];
                var wddo;
                var arr = [];
                $(xmlDoc).find('Table1').each(function (index) {
                    var WDONo = $(this).find('WDONo').text();
                    var WDOSEQNO = $(this).find('WDOSEQNO').text();
                    var AWBNO = $(this).find('AWBNO').text();
                    var isActive = $(this).find('isActive').text();
                    wddo = WDONo;
                   
                    var newOption = $('<option></option>');
                    newOption.val(WDOSEQNO).text(WDONo);
                    newOption.appendTo('#ddlGatePassScanNo');


                    if (arr.indexOf(WDONo) == -1) {
                        arr.push(WDONo);
                        console.log(arr)
                    }


                    gatePassList = arr;
                    _data = JSON.stringify(arr);
                    // console.log(_data)


                    const options = []

                    document.querySelectorAll('#ddlGatePassScanNo > option').forEach((option) => {
                        if (options.includes(option.text)) option.remove()
                        else options.push(option.text)
                    })

                });

                if (selectedRowHAWBNo != '') {
                    //TODO :Change selectedRowHAWBNo to  $("#hawbLists").val()
                    $("#ddlGatePassScanNo option").each(function () {
                        if ($(this).text() == selectedRowHAWBNo) {
                            $(this).attr('selected', 'selected');
                            var selectedGatePass = $(this).val();

                            gatePassChange(selectedGatePass);
                        }
                    });
                }

                if (gatePassList.length > 0) {
                    $("#txtGatePassScanNo").autocomplete({
                        minLength: 0,
                        source: gatePassList,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            // $("#txtCommodity").focus();
                            $("#txtGatePassScanNo").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtGatePassScanNo").val(ui.item.label);
                            $('#ddlGatePassScanNo').val(ui.item.value)
                            gatePassChange($('#ddlGatePassScanNo').val());
                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    }).focus(function () {
                        $(this).autocomplete("search");
                    });

                    if ($(xmlDoc).find('Table1').length == 1) {
                        $('#ddlGatePassScanNo').trigger('change');
                        $("#txtGatePassScanNo").val(wddo);
                        $("#txtGatePassScanNo").focus();
                        $("#txtGatePassScanNo").blur();
                    } else {
                        $("#txtGatePassScanNo").focus();
                        $(this).autocomplete("search", $(this).val());
                        $("#txtGatePassScanNo").focus(function () {
                            $(this).autocomplete("search", $(this).val());
                        });
                    }
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

function gatePassChange(gpID) {

}

function clearBeforAWBSearch() {
    $('#txtGatePassScanNo').val('');
    $('#tblNewsForGatePass').hide();
    $('#divVCTDetail').empty();
    $('#myImage').hide();
    $('#spnMsg').text('');
    // $('#txtGatePassScanNo').focus();
    // $('#btnGoodsDelever').attr('disabled', 'disabled');
    signaturePad.clear();
    $('#divImages').empty();
    gatePassList = [];
    $('#ddlGatePassScanNo').empty();
}


function GetButtonRights_v3() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><ParentChildId>' + _ParentChildId + '</ParentChildId><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + CompanyCode + '</CompanyCode><UserId>' + UserId + '</UserId><Culture>' + PreferredLanguage + '</Culture></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetButtonRights_v3",
            data: JSON.stringify({ 'InputXML': inputXML }),
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
                console.log(xmlDoc)
                $(xmlDoc).find('Table1').each(function (index) {

                    ButtonId = $(this).find('ButtonId').text();
                    ButtonName = $(this).find('ButtonName').text();
                    IsEnable = $(this).find('IsEnable').text();

                    if (index == 0) {
                        if (ButtonId == 'cameraTakePicture' && IsEnable == 'Y') {
                            $("#cameraTakePicture").removeAttr('disabled');
                        } else {
                            $("#cameraTakePicture").attr('disabled', 'disabled');

                        }
                    }
                    if (index == 1) {
                        if (ButtonId == 'btnGoodsDelever' && IsEnable == 'Y') {
                            $("#btnGoodsDelever").removeAttr('disabled');
                        } else {
                            $("#btnGoodsDelever").attr('disabled', 'disabled');

                        }
                    }


                });

            },
            error: function (msg) {
                //debugger;
                HideLoader();
                var r = jQuery.parseJSON(msg.responseText);
                alert("Message: " + r.Message);
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