var UserId = window.localStorage.getItem("UserID");
var CompanyCode = window.localStorage.getItem("companyCode");
var SHEDCODE = window.localStorage.getItem("SHED_CODE");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var ParentChildId = localStorage.getItem('ParentChildId_Import')
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");

$(function () {
    document.addEventListener('backbutton', onBackKeyDown, false);
    //document.addEventListener('deviceready', DropDown, false);
    GetMenuRolesRights();
    //if (window.localStorage.getItem("RoleExpVehicleTracking") == '0')
    //    $("#divVehicleTracking").css("display", "none");
    //if (window.localStorage.getItem("RoleExpVehicleTracking") == '0')
    //    $("#divVehicleTracking").css("display", "none");
});

function onBackKeyDown() {
    window.location.href = 'GalaxyHome.html';
}

function RedirectPage(pagename) {

    if (pagename == 'IMP_FlightCheck.html' && window.localStorage.getItem("RoleIMPFlightCheck") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_FlightCheck.html')
        window.location.href = pagename;

    if (pagename == 'IMP_Segregation.html' && window.localStorage.getItem("RoleIMPSegregation") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_Segregation.html')
        window.location.href = pagename;

    if (pagename == 'IMP_Binning.html' && window.localStorage.getItem("RoleIMPBinning") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_Binning.html')
        window.location.href = pagename;

    if (pagename == 'IMP_InternalMovement.html' && window.localStorage.getItem("RoleIMPIntlMvmt") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_InternalMovement.html')
        window.location.href = pagename;

    if (pagename == 'IMP_ForwardingBackwarding.html' && window.localStorage.getItem("RoleIMPFwdBkd") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_ForwardingBackwarding.html')
        window.location.href = pagename;

    if (pagename == 'IMP_FinalDelivery.html' && window.localStorage.getItem("RoleIMPFinalDelivery") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_FinalDelivery.html')
        window.location.href = pagename;

    if (pagename == 'IMP_ShipmentStatus.html' && window.localStorage.getItem("RoleIMPImportQuery") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_ShipmentStatus.html')
        window.location.href = pagename;

    if (pagename == 'IMP_DocumentUpload.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_DocumentUpload.html')
        window.location.href = pagename;

    if (pagename == 'IMP_DockInDockOutStatus.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_DockInDockOutStatus.html')
        window.location.href = pagename;

    if (pagename == 'IMP_OutOfWarehouse.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_OutOfWarehouse.html')
        window.location.href = pagename;

    if (pagename == 'IMP_GoodsDelivery.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_GoodsDelivery.html')
        window.location.href = pagename;

    if (pagename == 'IMP_ULDAcceptance.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_ULDAcceptance.html')
        window.location.href = pagename;

    if (pagename == 'IMP_Examination.html' && window.localStorage.getItem("RoleIMPBinning") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_Examination.html')
        window.location.href = pagename

    if (pagename == 'IMP_RecordDamage.html' && window.localStorage.getItem("RoleRecordDamage") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'IMP_RecordDamage.html')

        if (pagename == 'IMP_TSP.html' && window.localStorage.getItem("RoleRecordDamage") == '0') {
            $.alert('You are not authorized to view this page');
            return;
        }
        else if (pagename == 'IMP_TSP.html')



            localStorage.removeItem('AWB_Number');
    localStorage.removeItem('HAWB_Number');
    localStorage.removeItem('Flight_Seq_No');
    localStorage.removeItem('allIDs');
    localStorage.removeItem('remarkOfTextarea');

    window.location.href = pagename;
}

function GetMenuRolesRights() {

    InputXML = '<Root><ParentChildId>' + ParentChildId + '</ParentChildId><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + CompanyCode + '</CompanyCode><Userid>' + UserId + '</Userid><Culture>' + PreferredLanguage + '</Culture></Root>';

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetMenuRolesRights",
            data: JSON.stringify({ 'InputXML': InputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                xmlDocForClickSet = xmlDoc
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {


                    }
                });
                $(xmlDoc).find('Table1').each(function (index) {
                    MenuName = $(this).find('MENUNAME').text();
                    ControlName = $(this).find('ControlName').text();
                    MenuId = $(this).find('MenuId').text();
                    ControlId = $(this).find('ControlId').text();
                    MenuParent = $(this).find('MenuParent').text();
                    ShortKey = $(this).find('ShortKey').text();
                    ParentChildId = $(this).find('ParentChildId').text();

                    if (index == 0) {
                        if (ControlId == 'divBinning') {
                            $('#divBinning').show();
                        } else {
                            $('#divBinning').hide();
                        }
                    }

                    if (index == 1) {
                        if (ControlId == 'divFlightCheck') {
                            $('#divFlightCheck').show();
                        } else {
                            $('#divFlightCheck').hide();
                        }
                    }

                    if (index == 2) {
                        if (ControlId == 'divImportQuery') {
                            $('#divImportQuery').show();
                        } else {
                            $('#divImportQuery').hide();
                        }
                    }

                    if (index == 3) {
                        if (ControlId == 'divRecordDamage') {
                            $('#divRecordDamage').show();
                        } else {
                            $('#divRecordDamage').hide();
                        }
                    }
                    if (index == 4) {
                        if (ControlId == 'divSplitGroup') {
                            $('#divSplitGroup').show();
                        } else {
                            $('#divSplitGroup').hide();
                        }
                    }

                    if (index == 5) {
                        if (ControlId == 'divTSP') {
                            $('#divTSP').show();
                        } else {
                            $('#divTSP').hide();
                        }
                    }

                    if (index == 6) {
                        if (ControlId == 'divULDAcceptance') {
                            $('#divULDAcceptance').show();
                        } else {
                            $('#divULDAcceptance').hide();
                        }
                    }

                    if (index == 7) {
                        if (ControlId == 'divWDORelease') {
                            $('#divWDORelease').show();
                        } else {
                            $('#divWDORelease').hide();
                        }
                    }

                    if (index == 8) {
                        if (ControlId == 'divWDORetrieval') {
                            $('#divWDORetrieval').show();
                        } else {
                            $('#divWDORetrieval').hide();
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


