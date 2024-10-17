var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var CompanyCode = window.localStorage.getItem("companyCode");
var SHEDCODE = window.localStorage.getItem("SHED_CODE");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
$(function () {
   
    $(".dropdown-menu").on('click', 'li', function () {
        
        //Export menu below----------------------------------------

        if ($(this).text() == 'Vehicle Tracking' && window.localStorage.getItem("RoleExpVehicleTracking") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }        

        if ($(this).text() == 'Cargo Acceptance' && window.localStorage.getItem("RoleExpTDG") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }        

        if ($(this).text() == 'Binning' && window.localStorage.getItem("RoleExpBinning") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }        

        if ($(this).text() == 'Internal/Exam Movement' && window.localStorage.getItem("RoleExpIntlMvmt") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }       

        if ($(this).text() == 'Unitization' && window.localStorage.getItem("RoleExpUnitization") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }       

        if ($(this).text() == 'Airside Release' && window.localStorage.getItem("RoleExpAirsideRelease") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }       

        if ($(this).text() == 'Export Query' && window.localStorage.getItem("RoleExpExportsQuery") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }        

        if ($(this).text() == 'VCT Check' && window.localStorage.getItem("RoleExpVCTCheck") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }

        //Import menu below------------------------------------------
       
        if ($(this).text() == 'Flight Check' && window.localStorage.getItem("RoleIMPFlightCheck") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }        

        if ($(this).text() == 'Segregation' && window.localStorage.getItem("RoleIMPSegregation") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }        

        if ($(this).text() == 'Binning' && window.localStorage.getItem("RoleIMPBinning") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }        

        if ($(this).text() == 'Internal Movement' && window.localStorage.getItem("RoleIMPIntlMvmt") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }       

        if ($(this).text() == 'Forward & Backward' && window.localStorage.getItem("RoleIMPFwdBkd") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }        

        if ($(this).text() == 'Final Delivery' && window.localStorage.getItem("RoleIMPFinalDelivery") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }        

        if ($(this).text() == 'Import Query' && window.localStorage.getItem("RoleIMPImportQuery") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }       

        if ($(this).text() == 'Document Upload' && window.localStorage.getItem("RoleIMPDocUpload") == '0') {
            $.alert('You are not authorized to view this page');
            return false;
        }

        if ($(this).text() == 'Log Out') {
            window.localStorage.clear();
        }

    });

    

    if (window.localStorage.getItem("RoleExpDashboard") == '0') {
        $("#aExport").css('pointer-events', 'none');
    }

    if (window.localStorage.getItem("RoleImpDashboard") == '0') {               
        $('#aImport').css('pointer-events', 'none');
    }
   // GetMenuRolesRights();
});

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

                //if (response.includes('Table1') == true) {
                //    if (response.includes('Table1') == true) {

                //    }
                //}

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
                    IsEnable = $(this).find('IsEnable').text();

                    if (index == 0) {
                        if (ControlId == 'divImportMenu' && IsEnable == 'Y') {
                            $('#aImport').show();
                        } else {
                            $('#aImport').hide();
                        }
                    }

                    if (index == 1) {
                        if (ControlId == 'divExportMenu' && IsEnable == 'Y') {
                            $('#aExport').show();
                        } else {
                            $('#aExport').hide();
                        }
                    }

                    if (index == 2) {
                        if (ControlId == 'divVTMenu' && IsEnable == 'Y') {
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