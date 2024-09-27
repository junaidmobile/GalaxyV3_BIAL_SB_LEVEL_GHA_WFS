
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var UserId = window.localStorage.getItem("UserID");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var companyCode = window.localStorage.getItem("companyCode");

var AWBid;
var type;
var VCTNo;
var flag = window.localStorage.getItem("flag");
var _vctno = window.localStorage.getItem("_vctno");
var _Door = window.localStorage.getItem("_Door");
var UserName = window.localStorage.getItem("UserName");
var flagclear = '';
var saveDocumentsList = [];
// console.log('date = ' + t);
//var dtHandoverDate = new Date();
//var dtTDGDate = new Date();
// var showDocs = false;
// var displayval= "none";

// // document.getElementById('documentLabel').style.display = "none";
// // document.getElementById('documentList').style.display = "none";

// document.getElementById('documentLabel').style.display =  "none";

$(function () {


    if (window.localStorage.getItem("RoleExpTDG") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    setTodaysDate();
    // getDocumentsFromMaster();
    // var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';
    AWBid = 0;
    //SHCSpanHtml(stringos);


});

function setTodaysDate() {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    var cDateTime = now.toISOString().slice(0, 16);
    // console.log('cDateTime = ' + cDateTime);
    dtHandoverDate = cDateTime;

    var splitArray = cDateTime.split('T');
    var splitString = splitArray[1];
    var dtMMDDformat = moment(cDateTime).format('DD/MM/YYYY') + ' ' + splitString;
    //  console.log('dtMMDDformat = ' + dtMMDDformat);

    document.getElementById('txtHandoverDt').value = dtHandoverDate;
    // document.getElementById("txtHandoverDt").max = dtHandoverDate;


    //let dateInput = document.getElementById("txtHandoverDt");
    //  dateInput.max = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));
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
                //console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                //console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}

function getDocumentsFromMaster() {
    if ($('#txtAwbNo').val() == '') {
        return;
    }

    if ($('#txtAwbNo').val().length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {

        var inpuXML = '<Root><AWBNumber>' + $('#txtAwbNo').val() + '</AWBNumber><CompanyCode>' + companyCode + '</CompanyCode><UserId>' + UserId + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetDocumentAcceptance",
            data: JSON.stringify({
                'InputXML': inpuXML
                // ,
                // 'pi_strUserName': window.localStorage.getItem("UserName"),
                // 'pi_strSession': ""
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                // console.log("response received");
                // console.log(response);
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
                //  console.log(xmlDoc);



                if (str != null && str != "") {
                    saveDocumentsList = [];
                    $(xmlDoc).find('Table').each(function (index) {
                        saveDocumentsList.push({
                            "DocCode": $(this).find('Id').text(),
                            "DocName": $(this).find('DocumentName').text(),
                            //"DOA_CreatedBy_C": UserName,
                            //"DOA_CreatedOn_D": dtHandoverDate,
                            //"isSelected": false,
                        });
                    });
                }

                //  console.log(saveDocumentsList);

                if (saveDocumentsList.length > 0)
                    buildDocumentsTable();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                //  $.alert(r.Message);
            }
        });
    }
}

function buildDocumentsTable() {
    var html = '';
    $('#documentList').empty();
    html = '';
    html = "  <div class='forms'>";
    html += "<div class='form-body' id='divMain'>";
    html += "  <form>";
    html += "<div style='text-align: center;' id='documentLabel'>";
    html += "<h5 id='lblDocuments' class='control-label labelFont'>Documents</h5>";
    html += "</div>";
    html += "<hr style='margin-top: 5px; margin-bottom: 5px;border: 0;border-top: 1px solid #ccc;'>";
    $.each(saveDocumentsList, function (i, d) {


        html += "<div class='row'>";
        html += "<div class='form-group col-xs-12 col-sm-6 col-md-6'>";
        html += " <div class='col-xs-6 col-form-label NoPadding'>";
        html += "  <label id='lblDocNAme'" + parseInt(i + 1) + "class='control-label'>" + saveDocumentsList[i].DocumentName.toString() + "</label>";
        html += "  </div>";
        html += " <div class='col-xs-6 NoPadding' style='text-align: center;'>";
        // if (saveDocumentsList[i].isSelected == true)
        //     html += "    <input type='checkbox' id='chkSelected +  parseInt(i + 1) + '" + " class="larger" checked  style="width: 20px;height: 20px;" name="completed">"';
        // else
        //     html += "    <input type='checkbox' id='chkSelected +  parseInt(i + 1) + '" + " class="larger"  style="width: 20px;height: 20px;" name="completed">"';


        if (saveDocumentsList[i].isSelected == true)
            html += '<input type="checkbox" id="chkSelected' + parseInt(i + 1) + '" class="larger" checked style="width: 20px;height: 20px;" name="completed">';
        else
            html += '<input type="checkbox" id="chkSelected' + parseInt(i + 1) + '" class="larger" style="width: 20px;height: 20px;" name="completed">';


        html += " </div>";
        html += "  </div>";

        html += "</div>";

    });


    html += "  </form>";
    html += "    </div>";
    html += "  </div>";
    html += "  </div>";
    $("#documentList").append(html);
}

function GetVCTDetailsForTDGAcceptance() {

    if ($('#txtAwbNo').val() == '') {
        return;
    }

    var awbNo = $('#txtAwbNo').val();
    // console.log('awbNo = ' + awbNo);
    if (awbNo.length != '11') {
        //clearBeforePopulate();
        errmsg = "Please enter valid AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    //   clearALL();

    // console.log(JSON.stringify({
    //     'pi_strAWBNo': awbNo
    // }));

    // console.log(CMSserviceURL + "GetDOCAcceptanceDetails_HHT");

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var inpuXML = '<Root><AWBNumber>' + $('#txtAwbNo').val() + '</AWBNumber><CompanyCode>' + companyCode + '</CompanyCode><UserId>' + UserId + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
    //  console.log('connectionStatus = ' + connectionStatus);
    if (errmsg == "" && connectionStatus == "online") {
        //clearBeforePopulate();
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetDocumentAcceptance",
            data: JSON.stringify({
                'InputXML': inpuXML
            }),

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                // console.log("response received");
                // console.log(response);
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
                var hasError = false;
                console.log(xmlDoc);

                if (str != null && str != "") {

                    $(xmlDoc).find('Table4').each(function (index) {


                        $('#txtAcceptedPieces').val($(this).find('NPX').text());
                        $('#txtAcceptedGrWt').val($(this).find('WeightExp').text());
                        $('#txtAcceptedChwt').val($(this).find('WeightRcv').text());
                        $('#txtRemarks').val($(this).find('Remarks').text());
                        AWBid = Number($(this).find('EXPAWBROWID').text());
                        var cDateTime = $(this).find('FLightDate').text();
                        var flightNoText = $(this).find('FlightNo').text() + ' ' + $(this).find('FLightDate').text();
                        $('#txtFlightNoDt').val($(this).find('FlightNoDate').text());
                        //var TDGDate = new Date($(this).find('TDGDate').text());
                        //TDGDate.setMinutes(TDGDate.getMinutes() - TDGDate.getTimezoneOffset());
                        //var TDGDateTime = TDGDate.toISOString().slice(0, 16);
                        //dtTDGDate = TDGDateTime;
                        // console.log('dtTDGDate from db= ' + dtTDGDate);
                        // alert(TDGDate)

                        // document.getElementById("txtHandoverDt").min = TDGDateTime;
                        // $('#txtHandoverDt').val(TDGDateTime);
                    });


                    if (response != null && response != "") {
                        $('#divVCTDetail').hide();
                        $('#documentList').empty();
                        html = '';


                        html += "<div class='form-body col-xs-12 col-form-label' style='text-align: center;' id='documentLabel'>";
                        html += "<h4 id='lblDocuments' class='control-label labelFont'>Documents</h4>";
                        html += "<hr style='margin-top: 5px; margin-bottom: 5px; border-top: 1px solid #000;'>";
                        html += "</div>";



                        var flag = '0';
                        $(xmlDoc).find('Table').each(function (index) {
                            flag = '1';

                            Srno = $(this).find('Srno').text();
                            Id = $(this).find('Id').text();
                            DocumentName = $(this).find('DocumentName').text();
                            ISMandetory = $(this).find('ISMandetory').text();
                            Description = $(this).find('Description').text();
                            filename = $(this).find('filename').text();
                            DEACTIVATED_INDICATOR = $(this).find('DEACTIVATED_INDICATOR').text();
                            IMPAWBROWID = $(this).find('IMPAWBROWID').text();
                            DOCUMENT_ID = $(this).find('DOCUMENT_ID').text();
                            NOG = $(this).find('NOG').text();


                            //var newSHC = $(this).find('SHCCodes').text();
                            //$("#TextBoxDiv").empty();
                            //// SHCSpanHtml(newSHC);

                            //$('#txtLocationShow').val(_LocCode);
                            //$('#txtNOG').val(NOG);
                            //$('#txtRemark').val(_Remarks);

                            DocumentDetails(Id, DocumentName, DOCUMENT_ID, ISMandetory);
                        });
                        html += "</tbody></table>";
                        $('#documentList').append(html);

                        $(xmlDoc).find('Table2').each(function (index) {
                            DocAcceptanceTime = $(this).find('DocAcceptanceTime').text();
                            DateAcceptance = $(this).find('Date').text();
                            StatusDocument = $(this).find('StatusDocument').text();
                            epouch = $(this).find('epouch').text();

                            if (StatusDocument == 'Accepted') {
                                $("#btnSave").attr('disabled', 'disabled');
                            } else {
                                $("#btnSave").removeAttr('disabled');
                            }

                        });
                    } else {
                        errmsg = 'VCT No. does not exists.';
                        $.alert(errmsg);
                    }

                }
                else {
                    errmsg = 'AWB No. does not exists';
                    // $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                //  $.alert(r.Message);
            }
        });
    }

}

function DocumentDetails(Id, DocumentName, DOCUMENT_ID, ISMandetory) {


    html += '<div class="form-body" style="padding: 0.1em 1.4em;">';
    html += '<div class="row">';
    html += '<div class="col-xs-12 col-form-label">';
    if (DOCUMENT_ID == '1') {
        html += '<label for="' + Id + '" class="checkbox-inline">' + DocumentName + '&nbsp;' + ISMandetory + '';
        html += '<input type="checkbox" id="' + Id + '" checked>';
        html += '</label>';
    } else {
        html += '<label for="' + Id + '" class="checkbox-inline">' + DocumentName + '&nbsp;<span style="color:red;">' + ISMandetory + '</span>';
        html += '<input type="checkbox" id="' + Id + '" >';
        html += '</label>';
    }

    html += '</div>';
    html += '</div>';
    html += '</div>';

}

function getRowData() {
    var MarkanLabelvalues = [];
    checkBox = '';
    $('#documentList').each(function () {
        $(this).find("input[type='checkbox']:checked").each(function () {
            /* var id = $(this).attr('id');*/
            MarkanLabelvalues.push($(this).attr('id'));
            checkBox += '<DocumentList Id="' + $(this).attr('id') + '" InsertUpdate="' + $(this).attr('id') + '" />'
        });
    });
    var MarkanLabelVal = MarkanLabelvalues.join(",");

}


function SaveDocumentAcceptance() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if ($("#txtAwbNo").val() == '') {
        //errmsg = "Please enter AWB No.</br>";
        //$.alert(errmsg);
        return;
    }

    if ($("#txtAwbNo").val().length != '11') {
        errmsg = "Please enter valid AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    var splitArray = $("#txtHandoverDt").val().split('T');
    var splitDate = splitArray[0];
    var TimeForSave = splitArray[1];
    // var DateForSave = moment(splitDate).format('DD/MM/YYYY');
    DateForSave = splitDate.split("-").reverse().join("/");

    var DocumentListvalues = [];
    checkBoxcheckval = '';
    $('#documentList').each(function () {
        $(this).find("input[type='checkbox']:checked").each(function () {
            /* var id = $(this).attr('id');*/
            DocumentListvalues.push($(this).attr('id'));
            checkBoxcheckval += '<Rows><DocumentId>' + $(this).attr('id') + '</DocumentId><InsertUpdate>0</InsertUpdate></Rows>'
        });
    });
    checkBoxXml = checkBoxcheckval;
    /* var MarkanLabelVal = MarkanLabelvalues.join(",");*/
    if (DocumentListvalues.length == 0) {
        $.alert('Please select atleast one document.');
        return;
    }

    var inpuXML = '<Root><AWBNumber>' + $("#txtAwbNo").val() + '</AWBNumber><Date>' + DateForSave + '</Date><Time>' + TimeForSave + '</Time><CompanyCode>' + companyCode + '</CompanyCode><UserId>' + UserId + '</UserId><AirportCity>' + AirportCity + '</AirportCity><DocumentList>' + checkBoxXml + '</DocumentList></Root>';
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "SaveDocumentAcceptance",
            data: JSON.stringify({
                'InputXML': inpuXML
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
                var str = response.d

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    var status = $(this).find('Status').text();

                    if (status == 'E') {
                        $.alert($(this).find('StrMessage').text()).css('color', 'red');
                        // $('#spnValMsg').text($(this).find('StrMessage').text()).css('color', 'red');
                        return;
                    } else {
                        clearALL();
                        $.alert($(this).find('StrMessage').text());
                        return;
                    }
                    //if (index == 0) {
                    //    //if (($(this).find('OutMsg').text()).length < Number(5))
                    //    alert($(this).find('OutMsg').text());
                    //    //else
                    //    //    $.alert($(this).find('OutMsg').text());
                    //}
                });
                //clearALL();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                //$.alert('Some error occurred while saving data');
                var r = jQuery.parseJSON(msg.responseText);
                //  $.alert(r.Message);
            }
        });
        return false;
    }

}

function BackFromSbill() {
    $('#divShippingBillInfo').hide();
    $('#divTDGinfo').show();

}

function clearALL() {

    $("#btnSave").attr('disabled', 'disabled');

    $('#txtAwbNo').val('');
    $('#txtFlightNoDt').val('');
    $('#txtCommodity').val('');
    $('#txtAcceptedPieces').val('');
    $('#txtAcceptedGrWt').val('');
    $('#txtAcceptedChwt').val('');
    $('#documentList').empty();

    // $('#txtHandoverDt').val('');
    $('#txtRemarks').val('');
    $('#txtAwbNo').focus();

}

function FocusSlot() {
    if (type == 'S')
        $('#txtSlotNo').focus();
}

function clearBeforePopulate() {
    AWBid = 0;
    $('#txtFlightNoDt').val('');
    $('#txtCommodity').val('');
    $('#txtAcceptedPieces').val('');
    $('#txtAcceptedGrWt').val('');
    $('#txtAcceptedChwt').val('');

    // $('#txtHandoverDt').val('');
    $('#txtRemarks').val('');
    // $('#documentLabel').hide();
    // $('#documentList').hide();
    //setTodaysDate();
    //$.each(saveDocumentsList, function (i, d) {
    //    saveDocumentsList[i].isSelected = false;
    //});
    //// console.log(saveDocumentsList);
    //buildDocumentsTable();
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function clearModalTbl() {

    $('#divAddLocation').empty();


}
