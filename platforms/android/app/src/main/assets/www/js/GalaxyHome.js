var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var CompanyCode = window.localStorage.getItem("companyCode");
var SHEDCODE = window.localStorage.getItem("SHED_CODE");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var ParentChildId;
var xmlDocForClickSet;
$(function () {
    document.addEventListener('backbutton', onBackKeyDown, false);
    //document.addEventListener('deviceready', DropDown, false);
    GetMenuRolesRights();
});
function onBackKeyDown() {
    //if ($('#divDashBoardImport').is(':visible')) {
    //    $('#divMode').show();
    //    $('#divDashBoardImport').hide();
    //    $('#divDashBoardExport').hide();
    //}
    //else if ($('#divDashBoardExport').is(':visible')) {
    //    $('#divMode').show();
    //    $('#divDashBoardImport').hide();
    //    $('#divDashBoardExport').hide();
    //}
    //else {
    //    navigator.app.backHistory();
    //}
    window.location.href = 'Login.html';
}
function DropDownClick() {
    //if (element.id == "aImport") {
    //    if ($('#aImport').attr('aria-expanded').toString() == "false") {
    //        $('#divMain').removeClass("VerticallyCenter");
    //    }
    //    else {
    //        $('#divMain').addClass("VerticallyCenter");
    //    }
    //}
    //else if (element.id == "aExport") {
    //    if ($('#aExport').attr('aria-expanded').toString() == "false") {
    //        $('#divMain').removeClass("VerticallyCenter");
    //    }
    //    else {
    //        $('#divMain').addClass("VerticallyCenter");
    //    }
    //}

    if ($('#btnnavbar').attr('aria-expanded').toString() == "false") {
        $('#divMain').removeClass("VerticallyCenter");
    }
    else {
        $('#divMain').addClass("VerticallyCenter");
    }

}
function DisplayScreen(Mode) {
    if (Mode == "Import") {

        if (window.localStorage.getItem("RoleImpDashboard") == '0') {
            $.alert('You are not authorized for Imports');
            return;
        }
        else if (window.localStorage.getItem("RoleImpDashboard") == '1' || window.localStorage.getItem("RoleImpDashboard") == null)
            setLocalStorageForHomeMenu();
        window.location.href = "IMP_Dashboard.html";

    }
    else if (Mode == "Export") {

        if (window.localStorage.getItem("RoleExpDashboard") == '0') {
            $.alert('You are not authorized for Exports');
            return;
        }
        else if (window.localStorage.getItem("RoleExpDashboard") == '1' || window.localStorage.getItem("RoleExpDashboard") == null)
            setLocalStorageForHomeMenu();
        window.location.href = "EXP_Dashboard.html";

    }
    else if (Mode == "VT") {

        if (window.localStorage.getItem("RoleExpDashboard") == '0') {
            $.alert('You are not authorized for Exports');
            return;
        }
        else if (window.localStorage.getItem("RoleExpDashboard") == '1' || window.localStorage.getItem("RoleExpDashboard") == null)
            setLocalStorageForHomeMenu();
        window.location.href = "EXP_ScanningLocationMain.html";

    }
}




function GetMenuRolesRights() {

    InputXML = '<Root><ParentChildId>0</ParentChildId><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + CompanyCode + '</CompanyCode><Userid>' + UserId + '</Userid><Culture>' + PreferredLanguage + '</Culture></Root>';

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
                    Sequence = $(this).find('Sequence').text();
                    ShortKey = $(this).find('ShortKey').text();
                    ParentChildId = $(this).find('ParentChildId').text();

                    if (index == 0) {
                        if (ControlId == 'divImportMenu') {
                            $('#divImportMenu').show();
                        } else {
                            $('#divImportMenu').hide();
                        }
                    }

                    if (index == 1) {
                        if (ControlId == 'divExportMenu') {
                            $('#divExportMenu').show();
                        } else {
                            $('#divExportMenu').hide();
                        }
                    }

                    if (index == 2) {
                        if (ControlId == 'divVTMenu') {
                            $('#divVTMenu').show();
                        } else {
                            $('#divVTMenu').hide();
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

function setLocalStorageForHomeMenu() {
    $(xmlDocForClickSet).find('Table1').each(function (index) {
        ParentChildId = $(this).find('ParentChildId').text();
        ControlId = $(this).find('ControlId').text();
        if (ControlId == 'divImportMenu') {
            localStorage.setItem('ParentChildId_Import', ParentChildId)
        }

        if (ControlId == 'divExportMenu') {
            localStorage.setItem('ParentChildId_Export', ParentChildId)
        }

        if (ControlId == 'divVTMenu') {
            localStorage.setItem('ParentChildId_VT', ParentChildId)
        }

    });
}