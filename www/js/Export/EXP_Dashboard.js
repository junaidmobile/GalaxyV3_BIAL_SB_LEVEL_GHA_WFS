
$(function () {
    document.addEventListener('backbutton', onBackKeyDown, false);
    $('#spnClientName').val(ClientName);
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

