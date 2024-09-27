var UserId = window.localStorage.getItem("UserID");
var CompanyCode = window.localStorage.getItem("companyCode");
var SHEDCODE = window.localStorage.getItem("SHED_CODE");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var ParentChildId = localStorage.getItem('ParentChildId_Export')
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
    window.localStorage.setItem("flag", 0);
    if (pagename == 'EXP_ScanningLocationMain.html' && window.localStorage.getItem("RoleExpVehicleTracking") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_ScanningLocationMain.html')
        window.location.href = pagename;

    //if (pagename == 'EXP_EuroPalletAcceptance.html?TDG=TDG' && window.localStorage.getItem("RoleExpTDG") == '0') {
    //    $.alert('You are not authorized to view this page');
    //    return;
    //}
    else if (pagename == 'EXP_EuroPalletAcceptance.html')
        window.location.href = pagename;

    if (pagename == 'EXP_Binning.html' && window.localStorage.getItem("RoleExpBinning") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_Binning.html')
        window.location.href = pagename;

    if (pagename == 'EXP_MomentofShipment.html' && window.localStorage.getItem("RoleExpIntlMvmt") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_MomentofShipment.html')
        window.location.href = pagename;

    if (pagename == 'EXP_Unitization.html' && window.localStorage.getItem("RoleExpUnitization") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_Unitization.html')
        window.location.href = pagename;

    if (pagename == 'EXP_AirsideRelease.html' && window.localStorage.getItem("RoleExpAirsideRelease") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_AirsideRelease.html')
        window.location.href = pagename;

    if (pagename == 'EXP_ExportQuery.html' && window.localStorage.getItem("RoleExpExportsQuery") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_ExportQuery.html')
        window.location.href = pagename;

    if (pagename == 'EXP_VCTCheck.html' && window.localStorage.getItem("RoleExpVCTCheck") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_VCTCheck.html')
        window.location.href = pagename;

    if (pagename == 'EXP_DocumentUpload.html')
        window.location.href = pagename;

    if (pagename == 'EXP_DockInDockOutStatus.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_DockInDockOutStatus.html')
        window.location.href = pagename;

    if (pagename == 'EXP_Checklist.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_Checklist.html')
        window.location.href = pagename;


    if (pagename == 'EXP_DocumentAcceptance.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_DocumentAcceptance.html')
        window.location.href = pagename;

    if (pagename == 'EXP_ShipmentDeclaration.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_ShipmentDeclaration.html')
        window.location.href = pagename;

    if (pagename == 'EXP_AWBRegularization.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_AWBRegularization.html')
        window.location.href = pagename;

    if (pagename == 'EXP_TSP.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_TSP.html')
        window.location.href = pagename;

    if (pagename == 'EXP_SecurityScreening.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_SecurityScreening.html')
        window.location.href = pagename;

    if (pagename == 'EXP_BackToTown.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_BackToTown.html')
        window.location.href = pagename;

    if (pagename == 'EXP_OffloadULDShipment.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_OffloadULDShipment.html')
        window.location.href = pagename;

    if (pagename == 'EXP_AirsideRelease_Search.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_AirsideRelease_Search.html')
        window.location.href = pagename;

    if (pagename == 'EXP_GenerateBarcode.html' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
        $.alert('You are not authorized to view this page');
        return;
    }
    else if (pagename == 'EXP_GenerateBarcode.html')
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
                        if (ControlId == 'divCargoAcceptance') {
                            $('#divCargoAcceptance').show();
                        } else {
                            $('#divCargoAcceptance').hide();
                        }
                    }

                    if (index == 1) {
                        if (ControlId == 'divChangeOfAWB') {
                            $('#divChangeOfAWB').show();
                        } else {
                            $('#divChangeOfAWB').hide();
                        }
                    }

                    if (index == 2) {
                        if (ControlId == 'divChecklist') {
                            $('#divChecklist').show();
                        } else {
                            $('#divChecklist').hide();
                        }
                    }

                    if (index == 3) {
                        if (ControlId == 'divBinning') {
                            $('#divBinning').show();
                        } else {
                            $('#divBinning').hide();
                        }
                    }
                    
                    if (index == 4) {
                        if (ControlId == 'divExportQuery') {
                            $('#divExportQuery').show();
                        } else {
                            $('#divExportQuery').hide();
                        }
                    }

                    if (index == 5) {
                        if (ControlId == 'divGPRelease') {
                            $('#divGPRelease').show();
                        } else {
                            $('#divGPRelease').hide();
                        }
                    }

                    if (index == 6) {
                        if (ControlId == 'divLabelPrint') {
                            $('#divLabelPrint').show();
                        } else {
                            $('#divLabelPrint').hide();
                        }
                    }

                    if (index == 7) {
                        if (ControlId == 'divRemoveOffloadShipment') {
                            $('#divRemoveOffloadShipment').show();
                        } else {
                            $('#divRemoveOffloadShipment').hide();
                        }
                    }

                    if (index == 8) {
                        if (ControlId == 'divShipmentDeclaration') {
                            $('#divShipmentDeclaration').show();
                        } else {
                            $('#divShipmentDeclaration').hide();
                        }
                    }

                    if (index == 9) {
                        if (ControlId == 'divExpTSP') {
                            $('#divExpTSP').show();
                        } else {
                            $('#divExpTSP').hide();
                        }
                    }
                    if (index == 10) {
                        if (ControlId == 'divUnitization') {
                            $('#divUnitization').show();
                        } else {
                            $('#divUnitization').hide();
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