var UserId = window.localStorage.getItem("UserID");
var CompanyCode = window.localStorage.getItem("companyCode");
var SHEDCODE = window.localStorage.getItem("SHED_CODE");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var ParentChildId_forfetch = localStorage.getItem('ParentChildId_Import')
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var ClientName = window.localStorage.getItem("ClientName");
var xmlDocForClickSet;
$(function () {
    document.addEventListener('backbutton', onBackKeyDown, false);
    $('#spnClientName').val(ClientName);
    localStorage.removeItem('_ParentChildId');
    GetMenuRolesRights();
    
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

    InputXML = '<Root><ParentChildId>' + ParentChildId_forfetch + '</ParentChildId><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + CompanyCode + '</CompanyCode><Userid>' + UserId + '</Userid><Culture>' + PreferredLanguage + '</Culture></Root>';

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
                    IsEnable = $(this).find('IsEnable').text();


                    if (index == 0) {
                        if (ControlId == 'divULDAcceptance' && IsEnable == 'Y') {
                            $('#divULDAcceptance').show();
                        } else {
                            $('#divULDAcceptance').hide();
                        }
                    }

                    if (index == 1) {
                        if (ControlId == 'divFlightCheck' && IsEnable == 'Y') {
                            $('#divFlightCheck').show();
                        } else {
                            $('#divFlightCheck').hide();
                        }
                    }


                    if (index == 2) {
                        if (ControlId == 'divRecordDamage' && IsEnable == 'Y') {
                            $('#divRecordDamage').show();
                        } else {
                            $('#divRecordDamage').hide();
                        }
                    }


                    if (index == 3) {
                        if (ControlId == 'divSplitGroup' && IsEnable == 'Y') {
                            $('#divSplitGroup').show();
                        } else {
                            $('#divSplitGroup').hide();
                        }
                    }

                    if (index == 4) {
                        if (ControlId == 'divWDORetrieval' && IsEnable == 'Y') {
                            $('#divWDORetrieval').show();
                        } else {
                            $('#divWDORetrieval').hide();
                        }
                    }

                    if (index == 5) {
                        if (ControlId == 'divWDORelease' && IsEnable == 'Y') {
                            $('#divWDORelease').show();
                        } else {
                            $('#divWDORelease').hide();
                        }
                    }


                    if (index == 6) {
                        if (ControlId == 'divImportQuery' && IsEnable == 'Y') {
                            $('#divImportQuery').show();
                        } else {
                            $('#divImportQuery').hide();
                        }
                    }

                    if (index == 7) {
                        if (ControlId == 'divBinning' && IsEnable == 'Y') {
                            $('#divBinning').show();
                        } else {
                            $('#divBinning').hide();
                        }
                    }

                    if (index == 8) {
                        if (ControlId == 'divTSP' && IsEnable == 'Y') {
                            $('#divTSP').show();
                        } else {
                            $('#divTSP').hide();
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

function baseFn(pagename) {

    $(xmlDocForClickSet).find('Table1').each(function (index) {
      //  ParentChildId = $(this).find('ParentChildId').text();
        ControlId = $(this).find('ControlId').text();
        IsEnable = $(this).find('IsEnable').text();
        
        if (pagename == 'IMP_ULDAcceptance.html') {
            if (ControlId == 'divULDAcceptance' && IsEnable == 'Y') {
                localStorage.setItem('_ParentChildId', $(this).find('ParentChildId').text());
                window.location.href = pagename;
            }
        }

        if (pagename == 'IMP_FlightCheck.html') {
            if (ControlId == 'divFlightCheck' && IsEnable == 'Y') {
                localStorage.setItem('_ParentChildId', $(this).find('ParentChildId').text())
                window.location.href = pagename;
            }
        }

        if (pagename == 'IMP_RecordDamage.html') {
            if (ControlId == 'divRecordDamage' && IsEnable == 'Y') {
                localStorage.setItem('_ParentChildId', $(this).find('ParentChildId').text())
                window.location.href = pagename;
            }
        }
        if (pagename == 'IMP_Examination.html') {
            if (ControlId == 'divSplitGroup' && IsEnable == 'Y') {
                localStorage.setItem('_ParentChildId', $(this).find('ParentChildId').text())
                window.location.href = pagename;
            }
        }

        if (pagename == 'IMP_WDO_Retrieval.html') {
            if (ControlId == 'divWDORetrieval' && IsEnable == 'Y') {
                localStorage.setItem('_ParentChildId', $(this).find('ParentChildId').text())
                window.location.href = pagename;
            }
        }

        if (pagename == 'IMP_GoodsDelivery.html') {
            if (ControlId == 'divWDORelease' && IsEnable == 'Y') {
                localStorage.setItem('_ParentChildId', $(this).find('ParentChildId').text())
                window.location.href = pagename;
            }
        }
        if (pagename == 'IMP_ShipmentStatus.html') {
            if (ControlId == 'divImportQuery' && IsEnable == 'Y') {
                localStorage.setItem('_ParentChildId', $(this).find('ParentChildId').text())
                window.location.href = pagename;
            }
        }

        if (pagename == 'IMP_Binning.html') {
            if (ControlId == 'divBinning' && IsEnable == 'Y') {
                localStorage.setItem('_ParentChildId', $(this).find('ParentChildId').text())
                window.location.href = pagename;
            }
        }

        if (pagename == 'IMP_TSP.html') {
            if (ControlId == 'divTSP' && IsEnable == 'Y') {
                localStorage.setItem('_ParentChildId', $(this).find('ParentChildId').text())
                window.location.href = pagename;
            }
        }

    });
}