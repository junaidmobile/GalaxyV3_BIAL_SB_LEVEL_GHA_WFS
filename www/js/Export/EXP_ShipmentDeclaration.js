var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var companyCode = window.localStorage.getItem("companyCode");
var UserName = window.localStorage.getItem("UserName");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var SelectedHawbId;
var SelectedHawbIdCMS;
var SelectedHawbNo;
var IGMno;
var strXmlStore;
var locPieces;
var html;
var FromLoc;
var GHAMawbid;
var Hawbid;
var GHAhawbid;
var IsFlightFinalized;
var GHAflightSeqNo;
var _FlightSeqNo;
var _MAWBNo;
var _HAWBNo;
var _LocId;
var _HAWBId;
var _LocCode;
var _LocPieces;
var _IGMNo;
var _GroupId;
var _Remarks;
var CMSGHAFlag;
var _SBId;
var autoLocationArray;
var shipperLists = [];
var flightAirNoLists = [];
var selectedRowHAWBNo;
var selectedShpper;
var ConsigneeLists = [];
var AgentNameLists = [];
var checkingStatus;
var A_List = [];
var S_List = [];
var C_List = [];
var _xmlDocTable;
var shipperCode = [];
var consigneeCode = [];
var agentCode = [];
var commodiyCode = [];
var ppcs = '';
var passCommoId = '';
var passCommoSHC = '';
var Shipper_SCustID;
var Consignee_CCustID;
var AgentName_IACustID;
var xmlDocForTrolley;
var AutoTSP;
var ConsignmentRowIDForSave;
var flightSeqNo;
var ULDSeqNo;
var TotalvolumatricChWt;
var counter = 1;
var HAWBNo;
var RemainingPkg;
var IsBaggage;
var RemainingWt;
var WtUOM;
var IsSecured;
var REFERENCE_DESCRIPTION;
var REFERENCE_DATA_IDENTIFIER;
var REFERENCE_NUMBER_1;
var _xmlDocTable;
var isSecuredFlag;
var REFERENCE = '0';
var IDENTIFIER = '-1';;
var nextValue;
var inputRows = '';
var ConsignmentRowID;
var DocumentNo;
var IsSecuredTF;
var selectTestHaWB = 'select';
var _vlaueofTrolleytext;
var MawbNo;
var HawbNo;
var volumatricChWt;
var flightAirNoListsNoCarrierCode = [];
var AL_ROWID_I;
var SDA_ROWID_I;
var SDA_SBNo_C;
var SDA_AWBNumber_C;
var SDA_HAWBNo_C;
var SDA_PackageCount;
var SDA_GrossWt_I;
var SDA_TimeStamp_Dt;
var SDA_LockStatus_I;
var SDA_IsManaual_B;
var SDA_SBDate;
var selectedAWBNo = '';
var aaSDA_SBNo_C;
var ExpAwbRowId;
var TrolleyNo;
var TrolleyGrossWt;
var TrolleyTareWt;
var _TLRowId = '0';
var remPCS;
var allSHCCodeSave = '';
var CommSrNo;
var IsSecured;
var WtUOM;
var filteredArrforno = [];
$(function () {



    GetButtonRights_v3();

    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var t = formattedDate.getTime();
    var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    $('#txtFlightDate').val(newDate);


    $('#txtAWBNo').focus();
    if (window.localStorage.getItem("RoleIMPBinning") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    selectedRowHAWBNo = amplify.store("selectedRowHAWBNo");
    selectedShpper = amplify.store("selectedShpper");
    ConsigneeLists = amplify.store("ConsigneeLists");
    AgentNameLists = amplify.store("AgentNameLists");

    //var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';

    //SHCSpanHtml(stringos);

    getAgentList();
    getShiperList();
    getConsigneeList();
    GetCommodityDataV3();
    GetAWBDetailSearch_V3_onLoad();

    $("input").keyup(function () {
        var string = $(this).val();
        // var string = $('#txtOrigin').val();
        if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓π@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
            /*$('#txtOrigin').val('');*/
            $(this).val('');
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }

    });





    $('#txtFlightDate').change(function () {
        var date = $(this).val();
        GetFlightRoutingDetails_V3(date)
    });


    $("#ddlAccCMIN").change(function () {
        if ($(this).val() == '-1') {

            $('#txtAccPieces').val('').removeAttr('disabled');
            $('#txtAccLength').val('').removeAttr('disabled');
            $('#txtAccWidth').val('').removeAttr('disabled');
            $('#txtAccHeight').val('').removeAttr('disabled');
            return;
        }

        $('#txtAccPieces').val('').removeAttr('disabled');
        $('#txtAccLength').val('').removeAttr('disabled');
        $('#txtAccWidth').val('').removeAttr('disabled');
        $('#txtAccHeight').val('').removeAttr('disabled');

        $("#btnAddDimention").removeAttr('disabled');


        var arr = $(this).val().split('~')
        var is1 = arr[0];
        var isFixed = arr[1];
        var isLength = arr[2];
        var isWidth = arr[3];
        var isHeight = arr[4];
        var isUnit = arr[5];
        var L;
        var W;
        var H;

        if (ExpAwbRowId != '-1') {
            $("#Pieces1").val(isFixed).attr('disabled', 'disabled');
        }

        if (isFixed != '0') {
            $("#txtAccLength").val(isLength).attr('disabled', 'disabled');
            $("#txtAccWidth").val(isWidth).attr('disabled', 'disabled');
            if (isHeight > 0) {
                $("#txtAccHeight").val(isHeight).attr('disabled', 'disabled');
            } else {
                $("#txtAccHeight").val('').removeAttr('disabled');
            }
        } else {
            if (isLength > 0) {
                $("#txtAccLength").val(isLength).attr('disabled', 'disabled');
                $("#txtAccWidth").val(isWidth).attr('disabled', 'disabled');
                $("#txtAccHeight").val(isHeight).attr('disabled', 'disabled');
            } else {
                $("#txtAccLength").val('').removeAttr('disabled');
                $("#txtAccWidth").val('').removeAttr('disabled');
                $("#txtAccHeight").val('').removeAttr('disabled');
            }



        }
    });


});

min_allVolumn_1 = 0;
min_allCharWt_1 = 0;

function deleteRow(buttonId, REFERENCE_DATA_IDENTIFIER, txtAccPieces, txtAccLength, txtAccWidth, txtAccHeight, TrolleyFixed) {


    //if ($("#txtAccPieces").val() == '') {
    //    return;
    //}
    //if ($("#txtAccHeight").val() == '') {
    //    return;
    //}
    if ($("#dtable tbody").find("tr").length != 1) {
        var decChargeableWt;

        if (TrolleyFixed != '0') {
            // if (REFERENCE_DATA_IDENTIFIER != '-1' && REFERENCE_DATA_IDENTIFIER != 'cms') {
            //if gage selected

            if ($("#ddlUnit1").val() == 'cm') {
                //if centimeter calculate chargeable wt start here
                decChargeableWt = (1 * parseFloat(txtAccLength) *
                    parseFloat(txtAccWidth) *
                    parseFloat(txtAccHeight)) /
                    6000;
                /// end ch wt calculation

                //vol wt cal start here
                volumetricWt = (1 * parseFloat(txtAccLength) *
                    parseFloat(txtAccWidth) *
                    parseFloat(txtAccHeight)) /
                    1000000;
                /// end vloume wt calculation


            } else {
                // if inches ch wt start here
                decChargeableWt = (1 * parseFloat(txtAccLength) *
                    parseFloat(txtAccWidth) *
                    parseFloat(txtAccHeight)) /
                    366;

                volumetricWt = (1 * parseFloat(txtAccLength) *
                    parseFloat(txtAccWidth) *
                    parseFloat(txtAccHeight)
                        // $("#txtAccPieces").val()) /  calculate with static 1 change by junaid 16032023
                        (1 * 16.39)) /
                    1000000;
            }

        } else {


            //if CMS selected fro ddl

            if ($("#ddlUnit1").val() == 'cm') {
                //if centimeter calculate chargeable wt start here
                decChargeableWt = (parseInt(txtAccPieces) *
                    parseFloat(txtAccLength) *
                    parseFloat(txtAccWidth) *
                    parseFloat(txtAccHeight)) /
                    6000;
                /// end ch wt calculation

                //vol wt cal start here
                volumetricWt = (parseInt(txtAccPieces) *
                    parseFloat(txtAccLength) *
                    parseFloat(txtAccWidth) *
                    parseFloat(txtAccHeight)) /
                    1000000;
                /// end vloume wt calculation


            } else {
                // if inches ch wt start here
                decChargeableWt = (parseInt(txtAccPieces) *
                    parseFloat(txtAccLength) *
                    parseFloat(txtAccWidth) *
                    parseFloat(txtAccHeight)) /
                    366;

                volumetricWt = (parseFloat(txtAccLength) *
                    parseFloat(txtAccWidth) *
                    parseFloat(txtAccHeight) *
                    // $("#txtAccPieces").val()) /  calculate with static 1 change by junaid 16032023
                    (txtAccPieces * 16.39)) /
                    1000000;
            }

        }



        min_allVolumn_1 = Number(parseFloat($("#txtVolume").val()) - volumetricWt);
        min_allCharWt_1 = Number(parseFloat($("#txtCharWt").val()) - decChargeableWt);
        $("#txtVolume").val(parseFloat(min_allVolumn_1).toFixed(2));
        allVolumn_1 = min_allVolumn_1;
        allCharWt_1 = min_allCharWt_1;
        //var grWT = parseFloat($("#txtGrWt").val());
        //var chaWT = parseFloat(allCharWt_1);
        if (parseFloat($("#txtGrWt").val()) > parseFloat(min_allCharWt_1)) {
            $("#txtCharWt").val($("#txtGrWt").val().toFixed(2));
        } else {
            $("#txtCharWt").val(min_allCharWt_1.toFixed(2));
        }

        $("#" + buttonId).each(function () {
            {
                $(this).parents("tr").remove();
            }
        });

    } else {
        $("#txtVolume").val('');
        $("#txtCharWt").val('');

        $("#" + buttonId).each(function () {
            {
                $(this).parents("tr").remove();
            }
        });
        $("#dtable").hide();
        allVolumn_1 = 0;
        allCharWt_1 = 0;
    }


};

getAllValues = function () {
    inputRows = '';


    var TableData = new Array();
    $("#dtable tbody").find("tr").each(function () { //get all rows in table

        inputRows += "<Rows>"

        inputRows += "<REFERENCE_DATA_IDENTIFIER>" + $(this).find("td").eq(0).text() + "</REFERENCE_DATA_IDENTIFIER>";
        inputRows += "<TrolleyFixed>" + $(this).find("td").eq(1).text() + "</TrolleyFixed>";
        inputRows += "<TrolleyWt>" + $(this).find("td").eq(2).text() + "</TrolleyWt>";
        inputRows += "<Pieces>" + $(this).find("td").eq(4).text() + "</Pieces>";
        inputRows += "<Length>" + $(this).find("td").eq(5).text() + "</Length>";
        inputRows += "<Width>" + $(this).find("td").eq(6).text() + "</Width>";
        inputRows += "<Height>" + $(this).find("td").eq(7).text() + "</Height>";

        inputRows += "</Rows>";
    });
    console.log(inputRows)
}

function CheckEmpty() {

    if ($('#txtGroupId').val() != '' && $('#txtLocation').val() != '') {
        $('#btnMoveDetail').removeAttr('disabled');
    } else {
        $('#btnMoveDetail').attr('disabled', 'disabled');
        return;
    }

}

function compareOriginDest() {
    var org = $('#txtOrigin').val();
    var dest = $('#txtDestination').val();
    let result = org.localeCompare(dest);

    if ($('#txtOrigin').val() == '') {
        return;
    }
    if ($('#txtDestination').val() == '') {
        return;
    }

    if (result == 0) {
        $("#AllMsg").text('Origin and Destination should be different.').css({ 'color': 'red' });
    } else {
        $("#AllMsg").text('');
    }
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
                console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}

function checkSpecialCharforFlightNo() {
    var string = $('#txtFlightNo').val();
    if (string.match(/[`!₹@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        $('#txtFlightNo').val('');
        return true;    // Contains at least one special character or space
    } else {
        return false;
    }
}


function checkSpecialCharforAWBNo() {
    var string = $('#txtAWBNo').val();
    if (string.match(/[`!₹@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        $('#txtAWBNo').val('');
        return true;    // Contains at least one special character or space
    } else {
        return false;
    }
}

function checkSpecialCharforOrigin() {
    var string = $('#txtOrigin').val();
    if (string.match(/[`!₹@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        $('#txtOrigin').val('');
        return true;    // Contains at least one special character or space
    } else {
        return false;
    }
}


function checkSpecialCharforDestination() {
    var string = $('#txtDestination').val();
    if (string.match(/[`!₹@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        $('#txtDestination').val('');
        return true;    // Contains at least one special character or space
    } else {
        return false;
    }
}

function checkSpecialCharforDestination123() {
    var string = $('#txtDestination').val();
    if (string.match(/[`!₹@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        $('#txtDestination').val('');
        return true;    // Contains at least one special character or space
    } else {
        return false;
    }
}
function checkSpecialCharship() {
    var string = $('.classSpecialChr').val();
    if (string.match(/[`!₹@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        $('.classSpecialChr').val('');
        return true;    // Contains at least one special character or space
    } else {
        return false;
    }
}



function GetAWBDetailSearch_V3() {
    $("#dtable tbody").empty();
    min_allVolumn_1 = 0;
    min_allCharWt_1 = 0;
    allVolumn_1 = 0;
    allCharWt_1 = 0;
    if ($('#txtAWBNo').val() == '') {
        return;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();
    let AWBPrefix = MAWBNo.slice(0, 3);
    let AWBNo = MAWBNo.slice(3, 11);
    if (MAWBNo == '') {
        shipperLists = [];
        flightAirNoLists = [];
        ConsigneeLists = [];
        AgentNameLists = [];
        A_List = [];
        S_List = [];
        C_List = [];
        // return;
    }

    var InputXML = '<Root><AWBPrefix>' + AWBPrefix + '</AWBPrefix><AWBNo>' + AWBNo + '</AWBNo><HouseNo></HouseNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><AWBRowID>-1</AWBRowID><FlightAirline></FlightAirline><FlightNumber></FlightNumber></Root>';
    //var InputXML ='<Root><AWBPrefix>125</AWBPrefix><AWBNo>66778522</AWBNo><HouseNo></HouseNo><AirportCity>BLR</AirportCity><CompanyCode>3</CompanyCode><AWBRowID>-1</AWBRowID><FlightAirline>BA</FlightAirline><FlightNumber>2023</FlightNumber></Root>'

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetAWBDetailSearch_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                clearALLNew();
                var xmlDoc = $.parseXML(response);
                $('#ddlFlightNo').empty();
                $('#AllMsg').text('');
                filteredArrforno = [];
                flightAirNoLists = [];

                console.log('All Data after save');
                console.log(xmlDoc);
                var Status;
                var flagforcheck2 = '0';
                var StrMessage;
                $('#ddlAccCMIN').empty();

                $(xmlDoc).find('Table').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    checkingStatus = Status;
                    if (Status == 'E') {
                        // $.alert(StrMessage).css('color', 'red');
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtAWBNo').focus();
                        //});
                        //return true;
                        $('#txtPieces').removeAttr('disabled', 'disabled');
                        $('#txtGrWt').removeAttr('disabled', 'disabled');
                        $('#txtCharWt').removeAttr('disabled', 'disabled');
                        $('#txtVolume').removeAttr('disabled', 'disabled');
                        //$('#txtOrigin').removeAttr('disabled', 'disabled');
                        //$('#txtDestination').removeAttr('disabled', 'disabled');
                    }
                });


                $(xmlDoc).find('Table1').each(function () {
                    ExpAwbRowId = $(this).find('ExpAwbRowId').text();
                    var AwbPrefix = $(this).find('AwbPrefix').text();
                    var AwbNo = $(this).find('AwbNo').text();
                    var ShipperId = $(this).find('ShipperId').text();
                    var ConsigneeId = $(this).find('ConsigneeId').text();
                    var AgentId = $(this).find('AgentId').text();
                    var AgentShortCode = $(this).find('AgentShortCode').text();
                    var AgentName = $(this).find('AgentName').text();
                    var Pieces = $(this).find('Pieces').text();
                    var Weight = $(this).find('Weight').text();
                    var Volume = $(this).find('Volume').text();
                    var ChargeableWt = $(this).find('ChargeableWt').text();
                    var FlightNo = $(this).find('FlightNo').text();
                    var FlightDate = $(this).find('FlightDate').text();
                    var Origin = $(this).find('Origin').text();
                    var Destination = $(this).find('Destination').text();
                    var ShipperName = $(this).find('ShipperName').text();
                    var ConsigneeName = $(this).find('ConsigneeName').text();
                    var ShipperShortCode = $(this).find('ShipperShortCode').text();
                    var ConsigneeShortCode = $(this).find('ConsigneeShortCode').text();
                    var AgentShortCode = $(this).find('AgentShortCode').text();
                    var Commodity = $(this).find('CommSearchCode').text();
                    var CommodityDesc = $(this).find('Description').text();
                    var OffPoint = $(this).find('OffPoint').text();
                    var FlightAirline = $(this).find('FlightAirline').text();
                    var FlightNumber = $(this).find('FlightNumber').text();
                    var SHCCode = $(this).find('SHCCode').text();


                    ppcs = Pieces;
                    if (Pieces != '') {
                        $('#txtPieces').val(Pieces).css('text-align', 'right').attr('disabled', 'disabled');
                        $('#txtGrWt').val(Weight).css('text-align', 'right').attr('disabled', 'disabled');
                        $('#txtCharWt').val(ChargeableWt).css('text-align', 'right').attr('disabled', 'disabled');
                        $('#txtVolume').val(Volume).css('text-align', 'right').attr('disabled', 'disabled');
                        $('#txtCommodity').val(CommodityDesc).css('text-align', 'left').attr('disabled', 'disabled');
                        $('#txtOffpoint').val(OffPoint).css('text-align', 'left').attr('disabled', 'disabled');
                        $('#txtSHCCode').val(SHCCode).css('text-align', 'left').attr('disabled', 'disabled');

                        $('#ddlShipper').val(ShipperId);
                        $('#ddlConsignee').val(ConsigneeId);
                        $('#txtAgentName').val(AgentId);
                        $('#ddlCommodity').val(Commodity);
                        $('#txtAirline').val(FlightAirline);
                        $('#txtFlightNo').val(FlightNumber);
                        $('#txtSHCCode').val(SHCCode);


                        $('#ddlShipper').trigger("change");
                        $('#ddlConsignee').trigger("change");
                        $('#ddlAgentName').trigger("change");
                        $('#ddlCommodity').trigger("change");

                        //$('#txtPieces').val(Pieces).css('text-align', 'right');
                        //$('#txtGrWt').val(Weight).css('text-align', 'right');
                        //$('#txtCharWt').val(ChargeableWt).css('text-align', 'right');
                        //$('#txtVolume').val(Volume).css('text-align', 'right');
                        //$('#txtOrigin').val('BLR');
                        $('#txtDestination').val(Destination);
                        $('#txtShipperPrifix').val(ShipperShortCode);
                        $('#txtShipper').val(ShipperName);
                        $('#txtConsignee').val(ConsigneeName);
                        $('#txtConsigneePrifix').val(ConsigneeShortCode);
                        $('#txtAgentName').val(AgentName);
                        $('#txtAgentNamePrifix').val(AgentShortCode);

                        //  $('#txtFlightNo').val(FlightNo);
                        //$('#txtOffpoint').val(OffPoint);

                        var date = FlightDate;

                        var newdate = date.split("-").reverse().join("-");

                        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ];

                        var d = new Date(date);

                        _Mont = monthNames[d.getMonth()]

                        DD = FlightDate.split("-")[2];
                        MM = FlightDate.split("-")[1];
                        YY = FlightDate.split("-")[0];


                        var ulddate = DD + '-' + _Mont + '-' + YY;
                        $('#txtFlightDate').val(FlightDate);
                        return
                    } else {
                        $('#txtPieces').removeAttr('disabled', 'disabled');
                        $('#txtGrWt').removeAttr('disabled', 'disabled');
                        $('#txtCharWt').removeAttr('disabled', 'disabled');
                        $('#txtVolume').removeAttr('disabled', 'disabled');
                        $('#txtCommodity').val('').removeAttr('disabled');
                        $('#txtSHCCode').val('').removeAttr('disabled');
                        if ($("#txtAWBNo").val() != '') {
                            $("#txtFlightNo").focus();
                        }

                    }

                });

                var filteredArr;

                $(xmlDoc).find('Table2').each(function (index) {

                    flagforcheck2 = '1';

                    var FlightDate = $(this).find('FlightDate').text();
                    var FlightAirline = $(this).find('FlightAirline').text();
                    var FlightNumber = $(this).find('FlightNumber').text();

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlFlightNo');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(FlightAirline + '~' + FlightNumber).text(FlightAirline);
                    newOption.appendTo('#ddlFlightNo');

                    //$("#ddlFlightNo option").each(function () {
                    //    $(this).siblings('[value="' + this.value + '"]').remove();
                    //});

                    filteredArrforno.push({ 'value': FlightAirline + '~' + FlightNumber, 'label': FlightNumber });
                    console.log(filteredArrforno)
                    flightAirNoLists.push(FlightAirline);

                    //flightAirNoLists.filter(function (value, index) { return flightAirNoLists.indexOf(value) == index });
                    filteredArr = flightAirNoLists.filter(function (item, index) {
                        if (flightAirNoLists.indexOf(item) == index)
                            return item;
                    });
                    //console.log(filteredArr)
                    if (selectedRowHAWBNo != '') {
                        //TODO :Change selectedRowHAWBNo to  $("#hawbLists").val()
                        $("#ddlFlightNo option").each(function () {
                            if ($(this).text() == selectedRowHAWBNo) {
                                $(this).attr('selected', 'selected');
                                var selectedFlightNo = $(this).val();

                                GetAWBDetailSearch_V3_onChangeFlight(selectedFlightNo);
                            }
                        });
                    }
                });


                if (filteredArrforno.length > 0) {
                    $("#txtFlightNo").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: filteredArrforno,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            $("#txtFlightNo").focus();
                            $("#txtFlightNo").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtFlightNo").val(ui.item.label);
                            //  $('#ddlHAWBNo').val(ui.item.value)
                            $('#ddlFlightNo').val(ui.item.value);
                            console.log(ui.item.value)
                            GetAWBDetailSearch_V3_onChangeFlight($('#ddlFlightNo').val());

                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtFlightNo").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });


                }


                xmlDocForTrolley = xmlDoc;

                html = "";

                html =
                    "<table id='tblDimentionAcceptance' border='1' style='padding:20px;width: 100%; background-color: white;'>";
                html += "<thead><tr>";

                html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Trolley</th>";
                html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pieces</th>";
                // html += "<th style='background-color:#bcd233;'>Gr.Wt.</th>";
                html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Length</th>";
                html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Width</th>";
                html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Height</th>";
                // html += "<th style='background-color:#bcd233;'>Vol. Wt.</th>";
                /*  html += "<th>UOM</th>";*/
                //html += "<th></th>";
                //html += "<th></th>";
                // html += "<th style='background-color:#bcd233;'>Action</th>";

                html += "</tr></thead>";
                html += "<tbody>";

                if (ExpAwbRowId != '-1') {
                    $('#btnSubmit').attr('disabled', 'disabled');
                    $('#divAddDim').hide();

                    $(xmlDoc).find('Table5').each(function (index) {


                        var REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                        var TrolleyCode = $(this).find('TrolleyCode').text();
                        var REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text();
                        var REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                        var TrolleyFixed = $(this).find('TrolleyFixed').text();


                        var arr = TrolleyCode.split('~');
                        var is1 = arr[0];
                        var isFixed = arr[1];
                        var isLength = arr[2];
                        var isWidth = arr[3];
                        var isHeight = arr[4];
                        var isUnit = arr[5];
                        var L;
                        var W;
                        var H;

                        scalDetailTableForAcceptance(REFERENCE_DESCRIPTION, isFixed, isLength, isWidth, isHeight, isUnit, index);



                    });

                    html += "</tbody></table>";

                    $("#divAcceptPoPUp").html(html);



                } else {
                    $('#btnSubmit').removeAttr('disabled');
                    $('#divAddDim').show();
                    $(xmlDoc).find('Table4').each(function (index) {

                        flagforcheck2 = '1';

                        var REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                        var TrolleyCode = $(this).find('TrolleyCode').text();
                        var REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text();
                        var REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                        var TrolleyFixed = $(this).find('TrolleyFixed').text();


                        var newOption = $('<option></option>');
                        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                        newOption.appendTo('#ddlAccCMIN');



                    });

                    //$("#btnSubmit").removeAttr('disabled');

                }

                if (flagforcheck2 == '0' && Status == 'E') {
                    $("#AllMsg").text(StrMessage).css({ 'color': 'red' });
                    $("#txtAWBNo").val('');
                    $("#txtAWBNo").focus();
                    return;
                }



                if (filteredArr.length > 0) {
                    $("#txtAirline").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: filteredArr,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }


                            $("#txtAirline").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtAirline").val(ui.item.label);
                            //  $('#ddlHAWBNo').val(ui.item.value)

                            //$('#ddlFlightNo').val(ui.item.value);

                            //GetAWBDetailSearch_V3_onChangeFlight($('#ddlFlightNo').val());

                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtAirline").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });

                    if ($("#txtAWBNo").val() != '') {
                        $("#txtAirline").focus();
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

var _selectIndex = 0
function scalDetailTableForAcceptance(REFERENCE_DESCRIPTION, isFixed, isLength, isWidth, isHeight, isUnit, index) {

    _selectIndex = index;
    // textBoxID = "txt" + _selectIndex.toString();
    html += "<tr " + _selectIndex + ">";
    // html += "<td style='padding: 2px;display:none;' align='right'><input id='' class='form-control' type='text' value='" + RowId + "' disabled></td>";
    html += "<td style='padding: 2px;text-align: left;' >" + REFERENCE_DESCRIPTION + "</td>";
    html += "<td style='padding: 2px;' >" + isFixed + "</td>";
    html += "<td style='padding: 2px;' >" + isLength + "</td>";
    html += "<td style='padding: 2px;' >" + isWidth + "</td>";
    html += "<td style='padding: 2px;' >" + isHeight + "</td>";
    //html += "<td style='padding: 2px;' align='left'><input id='textVol" + _selectIndex + "' class='form-control' type='text' value='" + isUnit + "' disabled='disabled'></td>";

    //html += "<td style='padding: 2px;' align='right'> <select class='form-control pnlTextBox' id='ddlAccCMINDynamic" + _selectIndex + "'  onchange='getValues(" + _selectIndex + ")' disabled='disabled'>></select></td>";

    //  html += "<td contenteditable='false' style='padding: 2px;' align='center'><button onclick="deleteAcceptanceDimention(\'' + RowId + '\',\'' + NOP + '\',\'' + WEIGHT + '\',\'' + Length + '\',\'' + Width + '\',\'' + Height + '\',\'' + Volume + '\')" type='button' style='background-color:#bcd233;color:black;' id='addButton' class='btn'><span class='glyphicon glyphicon-pencil'></span></button></td>";
    //html += '<td onclick="editAcceptanceDimention(\'' + RowId + '\',\'' + NOP + '\',\'' + WEIGHT + '\',\'' + Length + '\',\'' + Width + '\',\'' + Height + '\',\'' + Volume + '\',this)" style="padding: 2px;" align="center" id="pencil"><span  class="glyphicon glyphicon-pencil"></span></td>';

    //html += '<td id="fnPencil"  style="padding: 2px;" align="center" id="pencil"><span  class="glyphicon glyphicon-pencil"></span></td>';
    //html += '<td id="fnSaveFile" onclick="SaveDimentionGrigValue(this);hideShow(\'' + 'S' + '\');" style="padding: 2px;display:none;" align="center" id="file-save"><span  class="glyphicon glyphicon-save-file"></span></td>';
    // html += '<td onclick="deleteAcceptanceDimention(\'' + RowId + '\',\'' + NOP + '\',\'' + WEIGHT + '\',\'' + Length + '\',\'' + Width + '\',\'' + Height + '\',\'' + Volume + '\')" style="padding: 2px;" align="center"><i class="glyphicon glyphicon-trash"></i></td>';
    // html += '<td onclick="deleteAcceptanceDimention()" style="padding: 2px;" align="center"><i class="glyphicon glyphicon-trash"></i></td>';

    html += "</tr>";
    //_selectIndex = _selectIndex + 1;

}
var $input;
var formElements = new Array();
var counterForDim = 0;
function addDimentionRows() {

    if ($('#ddlAccCMIN').val() == '-1') {
        $('#AllMsg').text("Please select Trolley.").css('color', 'red');
        return
    } else {
        $('#AllMsg').text("");
    }

    if ($('#txtAccPieces').val() == '' || $('#txtAccLength').val() == '' || $('#txtAccWidth').val() == '' || $('#txtAccHeight').val() == '') {
        $('#AllMsg').text("Please fill all values in current row.").css('color', 'red');
        return
    } else {
        $('#AllMsg').text("");
    }

    CalculateVol_1();

    $("#dtable").show();
    var arr = $('#ddlAccCMIN').val().split('~')
    var REFERENCE_DATA_IDENTIFIER = arr[0];
    var TrolleyFixed = arr[1];
    var isLength = arr[2];
    var isWidth = arr[3];
    var isHeight = arr[4];
    var isUnit = arr[5];
    var TrolleyWt = arr[6];
    //const tr = document.createElement('tr');


    //var supname = $("#supplyingLocation").val();
    //$('#supplyingLocation').val('');
    const ddlAccCMIN = $("#ddlAccCMIN option:selected").text();//document.getElementById('ddlAccCMIN');

    const txtAccPieces = document.getElementById('txtAccPieces').value;
    const txtAccLength = document.getElementById('txtAccLength').value;
    const txtAccWidth = document.getElementById('txtAccWidth').value;
    const txtAccHeight = document.getElementById('txtAccHeight').value;

    var buttonId = "deletesupLoc" + parseInt(counterForDim + 1);
    var supDeleteButton = $("<i class='glyphicon glyphicon-trash' id='" + buttonId + "'></i>");
    $(document).on('click', '#' + buttonId, function () { deleteRow(buttonId, REFERENCE_DATA_IDENTIFIER, txtAccPieces, txtAccLength, txtAccWidth, txtAccHeight, TrolleyFixed); });
    var supRow = $("<tr>");
    supRow.append("<td>" + REFERENCE_DATA_IDENTIFIER + "");
    supRow.append("<td>" + TrolleyFixed + "");
    supRow.append("<td>" + TrolleyWt + "");
    supRow.append("<td>" + ddlAccCMIN + "");
    supRow.append("<td>" + txtAccPieces + "");
    supRow.append("<td>" + txtAccLength + "");
    supRow.append("<td>" + txtAccWidth + "");
    supRow.append("<td>" + txtAccHeight + "");
    supRow.append("<td><i class='glyphicon glyphicon-trash' id='" + buttonId + "'></i>");

    // supRow.append("<td>").append(supDeleteButton);

    $("#dtable tbody").append(supRow);
    counterForDim++;



    $('#txtAccPieces').val('').removeAttr('disabled');
    $('#txtAccLength').val('').removeAttr('disabled');
    $('#txtAccWidth').val('').removeAttr('disabled');
    $('#txtAccHeight').val('').removeAttr('disabled');
    $('#ddlAccCMIN').val('-1').removeAttr('disabled');

}


function hideTdVal() {
    var TableData = new Array();
    inputRowsforLocation = "";

    //$('#dtable tbody tr').each((tr_idx, tr) => {
    //    $(tr).children('td').each((td_idx, td) => {

    //        console.log('[' + tr_idx + ',' + td_idx + '] => ' + $(td).text());
    //    });
    //});

    $('#dtable tbody').find('tr').each(function (tr_idx, tr) {


        $(tr).children('td').each((td_idx, td) => {
            if (td_idx == 0) {
                $(td).hide();
            }
            if (td_idx == 1) {
                $(td).hide();
            }
            if (td_idx == 2) {
                $(td).hide();
            }
            console.log('[' + tr_idx + ',' + td_idx + '] => ' + $(td).text());
        });
    });
    $("td:empty").remove();
}


function GetAWBDetailSearch_V3_onLoad() {


    //if ($('#txtAWBNo').val() == '') {
    //    return;
    //}


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();
    let AWBPrefix = MAWBNo.slice(0, 3);
    let AWBNo = MAWBNo.slice(3, 11);
    if (MAWBNo == '') {
        shipperLists = [];
        flightAirNoLists = [];
        ConsigneeLists = [];
        AgentNameLists = [];
        A_List = [];
        S_List = [];
        C_List = [];
        // return;
    }

    var InputXML = '<Root><AWBPrefix>' + AWBPrefix + '</AWBPrefix><AWBNo>' + AWBNo + '</AWBNo><HouseNo></HouseNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><AWBRowID>-1</AWBRowID><FlightAirline></FlightAirline><FlightNumber></FlightNumber></Root>';
    //var InputXML ='<Root><AWBPrefix>125</AWBPrefix><AWBNo>66778522</AWBNo><HouseNo></HouseNo><AirportCity>BLR</AirportCity><CompanyCode>3</CompanyCode><AWBRowID>-1</AWBRowID><FlightAirline>BA</FlightAirline><FlightNumber>2023</FlightNumber></Root>'

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetAWBDetailSearch_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                //clearALLNew();
                var xmlDoc = $.parseXML(response);
                $('#ddlFlightNo').empty();
                // $('#AllMsg').text('');
                filteredArrforno = [];
                flightAirNoLists = [];
                console.log(xmlDoc);
                var Status;
                var flagforcheck2 = '0';
                var StrMessage;
                $('#ddlEquTrolley1').empty();
                $('#ddlEquTrolley2').empty();
                $('#ddlEquTrolley3').empty();
                $('#ddlEquTrolley4').empty();
                $('#ddlEquTrolley5').empty();
                $(xmlDoc).find('Table').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    checkingStatus = Status;
                    if (Status == 'E') {
                        // $.alert(StrMessage).css('color', 'red');
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtAWBNo').focus();
                        //});
                        //return true;
                        $('#txtPieces').removeAttr('disabled', 'disabled');
                        $('#txtGrWt').removeAttr('disabled', 'disabled');
                        $('#txtCharWt').removeAttr('disabled', 'disabled');
                        $('#txtVolume').removeAttr('disabled', 'disabled');
                        //$('#txtOrigin').removeAttr('disabled', 'disabled');
                        //$('#txtDestination').removeAttr('disabled', 'disabled');
                    }
                });


                $(xmlDoc).find('Table1').each(function () {
                    ExpAwbRowId = $(this).find('ExpAwbRowId').text();
                    var AwbPrefix = $(this).find('AwbPrefix').text();
                    var AwbNo = $(this).find('AwbNo').text();
                    var ShipperId = $(this).find('ShipperId').text();
                    var ConsigneeId = $(this).find('ConsigneeId').text();
                    var AgentId = $(this).find('AgentId').text();
                    var AgentShortCode = $(this).find('AgentShortCode').text();
                    var AgentName = $(this).find('AgentName').text();
                    var Pieces = $(this).find('Pieces').text();
                    var Weight = $(this).find('Weight').text();
                    var Volume = $(this).find('Volume').text();
                    var ChargeableWt = $(this).find('ChargeableWt').text();
                    var FlightNo = $(this).find('FlightNo').text();
                    var FlightDate = $(this).find('FlightDate').text();
                    var Origin = $(this).find('Origin').text();
                    var Destination = $(this).find('Destination').text();
                    var ShipperName = $(this).find('ShipperName').text();
                    var ConsigneeName = $(this).find('ConsigneeName').text();
                    var ShipperShortCode = $(this).find('ShipperShortCode').text();
                    var ConsigneeShortCode = $(this).find('ConsigneeShortCode').text();
                    var AgentShortCode = $(this).find('AgentShortCode').text();
                    var Commodity = $(this).find('CommSearchCode').text();
                    var CommodityDesc = $(this).find('Description').text();
                    var OffPoint = $(this).find('OffPoint').text();
                    var FlightAirline = $(this).find('FlightAirline').text();
                    var FlightNumber = $(this).find('FlightNumber').text();


                    ppcs = Pieces;
                    if (Pieces != '') {
                        $('#txtPieces').val(Pieces).css('text-align', 'right').attr('disabled', 'disabled');
                        $('#txtGrWt').val(Weight).css('text-align', 'right').attr('disabled', 'disabled');
                        $('#txtCharWt').val(ChargeableWt).css('text-align', 'right').attr('disabled', 'disabled');
                        $('#txtVolume').val(Volume).css('text-align', 'right').attr('disabled', 'disabled');
                        $('#txtCommodity').val(CommodityDesc).css('text-align', 'left').attr('disabled', 'disabled');
                        $('#txtOffpoint').val(OffPoint).css('text-align', 'left').attr('disabled', 'disabled');

                        $('#ddlShipper').val(ShipperId);
                        $('#ddlConsignee').val(ConsigneeId);
                        $('#txtAgentName').val(AgentId);
                        $('#ddlCommodity').val(Commodity);
                        $('#txtAirline').val(FlightAirline);
                        $('#txtFlightNo').val(FlightNumber);


                        $('#ddlShipper').trigger("change");
                        $('#ddlConsignee').trigger("change");
                        $('#ddlAgentName').trigger("change");
                        $('#ddlCommodity').trigger("change");

                        //$('#txtPieces').val(Pieces).css('text-align', 'right');
                        //$('#txtGrWt').val(Weight).css('text-align', 'right');
                        //$('#txtCharWt').val(ChargeableWt).css('text-align', 'right');
                        //$('#txtVolume').val(Volume).css('text-align', 'right');
                        //$('#txtOrigin').val(Origin);
                        $('#txtDestination').val(Destination);
                        $('#txtShipperPrifix').val(ShipperShortCode);
                        $('#txtShipper').val(ShipperName);
                        $('#txtConsignee').val(ConsigneeName);
                        $('#txtConsigneePrifix').val(ConsigneeShortCode);
                        $('#txtAgentName').val(AgentName);
                        $('#txtAgentNamePrifix').val(AgentShortCode);

                        //  $('#txtFlightNo').val(FlightNo);
                        //$('#txtOffpoint').val(OffPoint);

                        var date = FlightDate;

                        var newdate = date.split("-").reverse().join("-");

                        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ];

                        var d = new Date(date);

                        _Mont = monthNames[d.getMonth()]

                        DD = FlightDate.split("-")[2];
                        MM = FlightDate.split("-")[1];
                        YY = FlightDate.split("-")[0];


                        var ulddate = DD + '-' + _Mont + '-' + YY;
                        $('#txtFlightDate').val(FlightDate);

                    } else {
                        $('#txtPieces').removeAttr('disabled', 'disabled');
                        $('#txtGrWt').removeAttr('disabled', 'disabled');
                        $('#txtCharWt').removeAttr('disabled', 'disabled');
                        $('#txtVolume').removeAttr('disabled', 'disabled');
                        $('#txtCommodity').val('').removeAttr('disabled');

                    }

                });

                var filteredArr;

                $(xmlDoc).find('Table2').each(function (index) {

                    flagforcheck2 = '1';

                    var FlightDate = $(this).find('FlightDate').text();
                    var FlightAirline = $(this).find('FlightAirline').text();
                    var FlightNumber = $(this).find('FlightNumber').text();

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlFlightNo');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(FlightAirline + '~' + FlightNumber).text(FlightAirline);
                    newOption.appendTo('#ddlFlightNo');

                    //$("#ddlFlightNo option").each(function () {
                    //    $(this).siblings('[value="' + this.value + '"]').remove();
                    //});

                    filteredArrforno.push({ 'value': FlightAirline + '~' + FlightNumber, 'label': FlightNumber });
                    console.log(filteredArrforno)
                    flightAirNoLists.push(FlightAirline);

                    //flightAirNoLists.filter(function (value, index) { return flightAirNoLists.indexOf(value) == index });
                    filteredArr = flightAirNoLists.filter(function (item, index) {
                        if (flightAirNoLists.indexOf(item) == index)
                            return item;
                    });
                    //console.log(filteredArr)
                    if (selectedRowHAWBNo != '') {
                        //TODO :Change selectedRowHAWBNo to  $("#hawbLists").val()
                        $("#ddlFlightNo option").each(function () {
                            if ($(this).text() == selectedRowHAWBNo) {
                                $(this).attr('selected', 'selected');
                                var selectedFlightNo = $(this).val();

                                GetAWBDetailSearch_V3_onChangeFlight(selectedFlightNo);
                            }
                        });
                    }
                });


                if (filteredArrforno.length > 0) {
                    $("#txtFlightNo").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: filteredArrforno,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            $("#txtFlightNo").focus();
                            $("#txtFlightNo").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtFlightNo").val(ui.item.label);
                            //  $('#ddlHAWBNo').val(ui.item.value)
                            $('#ddlFlightNo').val(ui.item.value);
                            console.log(ui.item.value)
                            GetAWBDetailSearch_V3_onChangeFlight($('#ddlFlightNo').val());

                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtFlightNo").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });
                    if ($("#txtAWBNo").val() != '') {
                        $("#txtFlightNo").focus();
                    }


                }

                $('#ddlAccCMIN').empty();
                xmlDocForTrolley = xmlDoc;
                $(xmlDoc).find('Table4').each(function (index) {

                    flagforcheck2 = '1';

                    var REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                    var TrolleyCode = $(this).find('TrolleyCode').text();
                    var REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text();
                    var REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    var TrolleyFixed = $(this).find('TrolleyFixed').text();


                    var newOption = $('<option></option>');
                    newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                    newOption.appendTo('#ddlAccCMIN');

                });

                if (flagforcheck2 == '0' && Status == 'E') {
                    $("#AllMsg").text(StrMessage).css({ 'color': 'red' });
                    $("#txtAWBNo").val('');
                    $("#txtAWBNo").focus();
                    return;
                }



                if (filteredArr.length > 0) {
                    $("#txtAirline").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: filteredArr,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }


                            $("#txtAirline").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtAirline").val(ui.item.label);
                            //  $('#ddlHAWBNo').val(ui.item.value)

                            //$('#ddlFlightNo').val(ui.item.value);

                            //GetAWBDetailSearch_V3_onChangeFlight($('#ddlFlightNo').val());

                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtAirline").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });

                    if ($("#txtAWBNo").val() != '') {
                        $("#txtAirline").focus();
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

function fnOffpoint() {

}
function onChangeComm(commID) {


    if (commID == null) {
        return
    }
    var arr = commID.split('~');

    passCommoId = arr[0];
    passCommoSHC = arr[1];
    $('#txtSHCCode').val(passCommoSHC);
}



function GetAWBDetailSearch_V3_onChangeFlight(FlightAirlineNo) {



    //$(xmlDocForTrolley).find('Table2').each(function (index) {

    //    flagforcheck2 = '1';

    //    var FlightDate = $(this).find('FlightDate').text();
    //    var FlightAirline = $(this).find('FlightAirline').text();
    //    var FlightNumber = $(this).find('FlightNumber').text();

    //    if (index == 0) {
    //        var newOption = $('<option></option>');
    //        newOption.val(0).text('Select');
    //        newOption.appendTo('#ddlFlightNoPrefix');
    //    }

    //    var newOption = $('<option></option>');
    //    newOption.val(FlightNumber).text(FlightNumber);
    //    newOption.appendTo('#ddlFlightNoPrefix');

    //    $("#ddlFlightNoPrefix option").each(function () {
    //        $(this).siblings('[value="' + this.value + '"]').remove();
    //    });

    //    flightAirNoListsNoCarrierCode.push(FlightNumber);
    //    //flightAirNoLists.filter(function (value, index) { return flightAirNoLists.indexOf(value) == index });
    //    filteredArrforno = flightAirNoListsNoCarrierCode.filter(function (item, index) {
    //        if (flightAirNoListsNoCarrierCode.indexOf(item) == index)
    //            return item;
    //    });
    //    console.log(filteredArrforno)
    //    if (selectedRowHAWBNo != '') {
    //        //TODO :Change selectedRowHAWBNo to  $("#hawbLists").val()
    //        $("#ddlFlightNoPrefix option").each(function () {
    //            if ($(this).text() == selectedRowHAWBNo) {
    //                $(this).attr('selected', 'selected');
    //                var selectedFlightNo = $(this).val();

    //                GetAWBDetailSearch_V3_onChangeFlightFlightNoPrefix(selectedFlightNo);
    //            }
    //        });
    //    }

    //});






    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();
    let AWBPrefix = MAWBNo.slice(0, 3);
    let AWBNo = MAWBNo.slice(3, 11);


    let FlNo = FlightAirlineNo.split('~');
    let FlightAirline = FlNo[0];
    let FlightNumber = FlNo[1];

    if (MAWBNo == '') {
        return;
    }

    var InputXML = '<Root><AWBPrefix>' + AWBPrefix + '</AWBPrefix><AWBNo>' + AWBNo + '</AWBNo><HouseNo></HouseNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><AWBRowID>-1</AWBRowID><FlightAirline>' + FlightAirline + '</FlightAirline><FlightNumber>' + FlightNumber + '</FlightNumber></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetAWBDetailSearch_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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


                // console.log(xmlDoc);
                var Status;
                $(xmlDoc).find('Table').each(function () {
                    Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        // $.alert(StrMessage).css('color', 'red');
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtAWBNo').focus();
                        //});
                        //return true;

                        //$('#txtOrigin').removeAttr('disabled', 'disabled');
                        //$('#txtDestination').removeAttr('disabled', 'disabled');
                    }
                });

                $(xmlDoc).find('Table3').each(function () {

                    var Origin = $(this).find('Origin').text();
                    var Destination = $(this).find('Destination').text();
                    $('#txtOrigin').val(Origin);
                    $('#txtDestination').val(Destination);
                });

                if (ppcs == '') {
                    $('#txtCommodity').focus();
                } else {
                    $('#txtShipperPrifix').focus();
                }



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

function grplength() {
    if ($('#txtGroupId').val().length == 14) {
        $('#txtLocation').focus();
    }
}

//function VCTNoDetails(MAWBNo, HAWBNo, SBNo, Remarks, LocPieces) {

//    html += '<tr>';
//    html += '<td style="background: rgb(224, 243, 215);">' + MAWBNo + '</td>';
//    html += '<td style="background: rgb(224, 243, 215);">' + HAWBNo + '</td>';
//    html += '<td style="background: rgb(224, 243, 215);">' + SBNo + '</td>';
//    html += '<td style="background: rgb(224, 243, 215);">' + Remarks + '</td>';
//    html += '<td style="background: rgb(224, 243, 215);">' + LocPieces + '</td>';
//    html += '</tr>';
//}

function Shipper_GetShipperConsigneeWithShortCode_V3() {
    if ($("#txtShipperPrifix").val().length != '3') {
        return;
    }
    if ($("#txtShipperPrifix").val() == '') {
        $("#txtShipper").val('');
        // $("#txtShipper").focus();
        getShiperList();
        return;
    }



    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var InputXML = '<Root><SCode>' + $("#txtShipperPrifix").val() + '</SCode><Type>C</Type><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetShipperConsigneeWithShortCode_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                // console.log(xmlDoc);
                $('#ddlShipper').empty();
                shipperLists = [];
                $(xmlDoc).find('Table').each(function () {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Status = $(this).find('Status').text();
                    var OutMsg = $(this).find('OutMsg').text();

                    if (status == 'E') {
                        $.alert($(this).find('OutMsg').text()).css('color', 'red');
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtGroupId').focus();
                        //});
                        return true;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Id = $(this).find('Id').text();
                    var ShortCode = $(this).find('ShortCode').text();
                    var Name = $(this).find('Name').text();

                    Shipper_SCustID = Id;

                    $('#txtShipper').val(Name);

                    //if (index == 0) {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlShipper');
                    //}

                    var newOption = $('<option></option>');
                    newOption.val(Id).text(Name);
                    newOption.appendTo('#ddlShipper');


                    shipperLists.push({ 'value': Id, 'label': Name });

                    if (selectedShpper != '') {
                        //TODO :Change selectedRowHAWBNo to  $("#hawbLists").val()
                        $("#ddlShipper option").each(function () {
                            if ($(this).text() == selectedShpper) {
                                $(this).attr('selected', 'selected');
                                var selectedship = $(this).val();
                                onChangeShipperText(selectedship);
                                // onChangeShipper(selectedship);
                            }
                        });
                    }
                });


                if (shipperLists.length > 0) {
                    $("#txtShipper").autocomplete({
                        minChars: 0,
                        minLength: 2,
                        source: shipperLists,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            $("#txtShipper").focus();
                            $("#txtShipper").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtShipper").val(ui.item.label);
                            $('#ddlShipper').val(ui.item.value);

                            onChangeShipperText($('#ddlShipper').val());
                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtShipper").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });
                    //$("#txtShipper").focus();
                }

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

function onChangeShipperText(shippID) {

    Shipper_SCustID = shippID;
}


function Consignee_GetShipperConsigneeWithShortCode_V3() {
    if ($("#txtConsigneePrifix").val().length != '3') {
        return;
    }


    if ($("#txtConsigneePrifix").val() == '') {
        $("#txtConsignee").val('');
        // $("#txtShipper").focus();
        getConsigneeList();
        return;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var InputXML = '<Root><SCode>' + $("#txtConsigneePrifix").val() + '</SCode><Type>C</Type><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetShipperConsigneeWithShortCode_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                // console.log(xmlDoc);
                $('#ddlConsignee').empty();
                ConsigneeLists = [];
                $(xmlDoc).find('Table').each(function () {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Status = $(this).find('Status').text();
                    var OutMsg = $(this).find('OutMsg').text();

                    if (status == 'E') {
                        $.alert($(this).find('OutMsg').text()).css('color', 'red');
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtGroupId').focus();
                        //});
                        return true;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Id = $(this).find('Id').text();
                    var ShortCode = $(this).find('ShortCode').text();
                    var Name = $(this).find('Name').text();
                    Consignee_CCustID = Id;

                    $('#txtConsignee').val(Name);

                    //if (index == 0) {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlConsignee');
                    //}

                    var newOption = $('<option></option>');
                    newOption.val(Id).text(Name);
                    newOption.appendTo('#ddlConsignee');
                    ConsigneeLists.push({ 'value': Id, 'label': Name })
                });


                if (ConsigneeLists.length > 0) {
                    $("#txtConsignee").autocomplete({
                        minChars: 0,
                        minLength: 2,
                        source: ConsigneeLists,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            $("#txtConsignee").focus();
                            $("#txtConsignee").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtConsignee").val(ui.item.label);
                            $('#ddlConsignee').val(ui.item.value)

                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtConsignee").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });
                    // $("#txtConsignee").focus();
                }

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


function AgentName_GetShipperConsigneeWithShortCode_V3() {
    if ($("#txtAgentNamePrifix").val().length != '3') {
        return;
    }
    if ($("#txtAgentNamePrifix").val() == '') {
        $("#txtAgentName").val('');
        // $("#txtShipper").focus();
        getAgentList();
        return;
    }


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var InputXML = '<Root><SCode>' + $("#txtAgentNamePrifix").val() + '</SCode><Type>A</Type><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetShipperConsigneeWithShortCode_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                //  console.log(xmlDoc);
                $('#ddlAgentName').empty();
                AgentNameLists = [];
                $(xmlDoc).find('Table').each(function () {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Status = $(this).find('Status').text();
                    var OutMsg = $(this).find('OutMsg').text();

                    if (status == 'E') {
                        $.alert($(this).find('OutMsg').text()).css('color', 'red');
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtGroupId').focus();
                        //});
                        return true;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Id = $(this).find('Id').text();
                    var ShortCode = $(this).find('ShortCode').text();
                    var Name = $(this).find('Name').text();
                    $('#txtAgentName').val(Name);
                    //if (index == 0) {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlAgentName');
                    //}

                    var newOption = $('<option></option>');
                    newOption.val(Id).text(Name);
                    newOption.appendTo('#ddlAgentName');

                    AgentNameLists.push({ 'value': Id, 'label': Name });
                    $('#ddlAgentName').trigger('change');
                });


                if (AgentNameLists.length > 0) {
                    $("#txtAgentName").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: AgentNameLists,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            $("#txtAgentName").focus();
                            $("#txtAgentName").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtAgentName").val(ui.item.label);
                            $('#ddlAgentName').val(ui.item.value)

                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtAgentName").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });
                    $("#txtAgentName").focus();
                }

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




function getAgentList() {

    shipperCode = [];
    consigneeCode = [];
    agentCode = [];
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var InputXML = '<Root><Type>A</Type><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';
    var InputXML = '<Root><SCode></SCode><Type>A</Type><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetShipperConsigneeWithShortCode_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                //  console.log(xmlDoc);
                _xmlDocTableAgentName = xmlDoc;
                $('#ddlAgentName').empty();
                A_List = [];
                $(xmlDoc).find('Table').each(function () {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Status = $(this).find('Status').text();
                    var OutMsg = $(this).find('OutMsg').text();

                    if (status == 'E') {
                        $.alert($(this).find('OutMsg').text()).css('color', 'red');
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtGroupId').focus();
                        //});
                        return true;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Id = $(this).find('Id').text();
                    var ShortCode = $(this).find('ShortCode').text();
                    var Name = $(this).find('Name').text();
                    // $('#txtAgentName').val(Name);

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlAgentName');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(Id).text(Name);
                    newOption.appendTo('#ddlAgentName');
                    A_List.push({ 'value': Id, 'label': Name });
                    agentCode.push({ 'value': Id, 'label': ShortCode });
                    // console.log('AgentNameLists ==> ' + Name)

                    if (selectedShpper != '') {
                        // alert('oi')
                        //TODO :Change selectedRowHAWBNo to  $("#hawbLists").val()
                        $("#ddlAgentName option").each(function () {
                            if ($(this).text() == selectedShpper) {
                                $(this).attr('selected', 'selected');
                                var selectedagent = $(this).val();
                                onChangeAgentName(selectedagent);
                                // onChangeShipper(selectedship);
                            }
                        });
                    }

                });


                if (A_List.length > 0) {
                    $("#txtAgentName").autocomplete({
                        minChars: 0,
                        minLength: 2,
                        source: A_List,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            $("#txtAgentName").focus();
                            $("#txtAgentName").val(ui.item.label);

                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtAgentName").val(ui.item.label);
                            $('#ddlAgentName').val(ui.item.value)
                            onChangeAgentName($('#ddlAgentName').val());
                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtAgentName").focus(function () {
                        //  $(this).autocomplete("search", $(this).val());
                    });

                }


                if (agentCode.length > 0) {
                    $("#txtAgentNamePrifix").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: agentCode,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            // $("#txtConsigneePrifix").focus();
                            $("#txtAgentNamePrifix").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtAgentNamePrifix").val(ui.item.label);
                            //$('#ddlConsignee').val(ui.item.value)

                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtAgentNamePrifix").focus(function () {
                        //  $(this).autocomplete("search", $(this).val());
                    });
                    // $("#txtConsignee").focus();
                }

                $('#txtAgentName').blur(function () {

                    ConsigneeID = $('#ddlAgentName').val();// $(this).find("option:selected").val();
                    if (ConsigneeID == '0') {
                        return
                    }
                    $(_xmlDocTableAgentName).find('Table1').each(function (index) {
                        if (ConsigneeID == $(this).find('Id').text()) {
                            ShortCode = $(this).find('ShortCode').text();
                            if ($('#txtAgentName').val() != '') {
                                $('#txtAgentNamePrifix').val(ShortCode);

                            }

                        }
                    });
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

function onChangeAgentName(aName) {

    AgentName_IACustID = aName;
    //if (AgentName_IACustID == null) {
    //    AgentName_IACustID = $('#ddlAgentName').val();
    //}


}

function getShiperList() {
    shipperCode = [];
    consigneeCode = [];
    agentCode = [];

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //  var InputXML = '<Root><SCode>' + $("#txtShipperPrifix").val() + '</SCode><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';
    var InputXML = '<Root><SCode></SCode><Type>C</Type><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetShipperConsigneeWithShortCode_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                //console.log(xmlDoc);
                _xmlDocTable = xmlDoc;
                $('#ddlShipper').empty();
                S_List = [];
                $(xmlDoc).find('Table').each(function () {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Status = $(this).find('Status').text();
                    var OutMsg = $(this).find('OutMsg').text();

                    if (status == 'E') {
                        $.alert($(this).find('OutMsg').text()).css('color', 'red');
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtGroupId').focus();
                        //});
                        return true;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Id = $(this).find('Id').text();
                    var ShortCode = $(this).find('ShortCode').text();
                    var Name = $(this).find('Name').text();

                    //  $('#txtShipper').val(Name);
                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlShipper');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(Id).text(Name);
                    newOption.appendTo('#ddlShipper');


                    S_List.push({ 'value': Id, 'label': Name });
                    shipperCode.push({ 'value': Id, 'label': ShortCode });

                    //console.log('Shipper ==> ' + Name);

                    if (selectedShpper != '') {
                        //TODO :Change selectedRowHAWBNo to  $("#hawbLists").val()
                        $("#ddlShipper option").each(function () {
                            if ($(this).text() == selectedShpper) {
                                $(this).attr('selected', 'selected');
                                var selectedship = $(this).val();

                                onChangeShipperText(selectedship);
                            }
                        });
                    }
                });


                if (S_List.length > 0) {
                    $("#txtShipper").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: S_List,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            $("#txtShipper").focus();
                            $("#txtShipper").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtShipper").val(ui.item.label);
                            $('#ddlShipper').val(ui.item.value)
                            onChangeShipperText($('#ddlShipper').val());
                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtShipper").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });
                    //$("#txtShipper").focus();
                }

                if (shipperCode.length > 0) {
                    $("#txtShipperPrifix").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: shipperCode,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            //  $("#txtShipperPrifix").focus();
                            $("#txtShipperPrifix").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtShipperPrifix").val(ui.item.label);
                            // $('#ddlShipper').val(ui.item.value)

                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtShipperPrifix").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });
                    //$("#txtShipper").focus();
                }


                $('#txtShipper').blur(function () {

                    shipperID = $('#ddlShipper').val();

                    if (shipperID == '0') {
                        return;
                    }

                    // $(this).find("option:selected").val();
                    $(_xmlDocTable).find('Table1').each(function (index) {
                        if (shipperID == $(this).find('Id').text()) {
                            ShortCode = $(this).find('ShortCode').text();
                            if ($('#txtShipper').val() != '') {
                                $('#txtShipperPrifix').val(ShortCode);

                            }

                        }
                    });
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


function getConsigneeList() {

    shipperCode = [];
    consigneeCode = [];
    agentCode = [];
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var InputXML = '<Root><SCode></SCode><Type>C</Type><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetShipperConsigneeWithShortCode_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                // console.log(xmlDoc);
                _xmlDocTableConsignee = xmlDoc;
                $('#ddlConsignee').empty();
                ConsigneeLists = [];
                $(xmlDoc).find('Table').each(function () {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Status = $(this).find('Status').text();
                    var OutMsg = $(this).find('OutMsg').text();

                    if (status == 'E') {
                        $.alert($(this).find('OutMsg').text()).css('color', 'red');
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtGroupId').focus();
                        //});
                        return true;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Id = $(this).find('Id').text();
                    var ShortCode = $(this).find('ShortCode').text();
                    var Name = $(this).find('Name').text();
                    /* $('#txtConsignee').val(Name);*/

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlConsignee');
                    }


                    var newOption = $('<option></option>');
                    newOption.val(Id).text(Name);
                    newOption.appendTo('#ddlConsignee');
                    C_List.push({ 'value': Id, 'label': Name });
                    consigneeCode.push({ 'value': Id, 'label': ShortCode });

                    // console.log('consigneeCode ==> ' + ShortCode)
                    if (selectedShpper != '') {
                        //TODO :Change selectedRowHAWBNo to  $("#hawbLists").val()
                        $("#ddlConsignee option").each(function () {
                            if ($(this).text() == selectedShpper) {
                                $(this).attr('selected', 'selected');
                                var selectedCons = $(this).val();

                                onChangeConsineeName(selectedCons);
                            }
                        });
                    }
                });


                if (C_List.length > 0) {
                    $("#txtConsignee").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: C_List,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            $("#txtConsignee").focus();
                            $("#txtConsignee").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtConsignee").val(ui.item.label);
                            $('#ddlConsignee').val(ui.item.value)
                            onChangeConsineeName($('#ddlConsignee').val());
                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtConsignee").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });
                    // $("#txtConsignee").focus();
                }

                if (consigneeCode.length > 0) {
                    $("#txtConsigneePrifix").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: consigneeCode,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            // $("#txtConsigneePrifix").focus();
                            $("#txtConsigneePrifix").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtConsigneePrifix").val(ui.item.label);
                            //$('#ddlConsignee').val(ui.item.value)

                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtConsigneePrifix").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });
                    // $("#txtConsignee").focus();
                }

                $('#txtConsignee').blur(function () {

                    ConsigneeID = $('#ddlConsignee').val();// $(this).find("option:selected").val();
                    if (ConsigneeID == '0') {
                        return
                    }
                    $(_xmlDocTableConsignee).find('Table1').each(function (index) {
                        if (ConsigneeID == $(this).find('Id').text()) {
                            ShortCode = $(this).find('ShortCode').text();
                            if ($('#txtConsignee').val() != '') {
                                $('#txtConsigneePrifix').val(ShortCode);

                            }

                        }
                    });
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

function onChangeConsineeName(sssid) {
    Consignee_CCustID = sssid;
}


function GetAWBDetailSave_V3() {

    //if ($('#txtAWBNo').val() == "") {
    //    $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
    //    return;
    //} else {
    //    $("#AllMsg").text('');
    //}


    //if ($('#txtFlightNo').val() == "") {
    //    $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
    //    return;
    //} else {
    //    $("#AllMsg").text('');
    //}

    if ($('#txtOrigin').val() == "") {
        $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }

    if ($('#txtDestination').val() == "") {
        $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }

    if ($('#txtCommodity').val() == "") {
        $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }

    if ($('#txtPieces').val() == "") {
        $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }

    if ($('#txtGrWt').val() == "") {
        $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }

    if ($('#txtCharWt').val() == "") {
        $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }
    if ($('#txtShipper').val() == "") {
        $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }

    if ($('#txtConsignee').val() == "") {
        $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }
    if ($('#txtAgentName').val() == "") {
        $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }

    if ($("#dtable tbody").find("tr").length == 0) {
        $("#AllMsg").text('Please add dimension data.').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }


    getAllValues();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();
    let AWBPrefix = MAWBNo.slice(0, 3);
    let AWBNo = MAWBNo.slice(3, 11);

    // var Shipper_SCustID = $('#ddlShipper').val();
    // var Consignee_CCustID = $('#ddlConsignee').val();
    // var AgentName_IACustID = $('#ddlAgentName').val();
    if (Shipper_SCustID == null) {
        Shipper_SCustID = '';
    }
    if (Consignee_CCustID == null) {
        Consignee_CCustID = '';
    }
    if (AgentName_IACustID == null) {
        AgentName_IACustID = '';
    }

    var shipConAgtXML = '<SCustID>' + Shipper_SCustID + '</SCustID><SName>' + $("#txtShipper").val().toUpperCase() + '</SName><CCustID>' + Consignee_CCustID + '</CCustID><CName>' + $("#txtConsignee").val().toUpperCase() + '</CName><IACustID>' + AgentName_IACustID + '</IACustID><IAName>' + $("#txtAgentName").val().toUpperCase() + '</IAName><AgentID>' + AgentName_IACustID + '</AgentID>';

    var InputXML = '<Root><EAID>0</EAID><AWBPrefix>' + AWBPrefix + '</AWBPrefix><AWBNo>' + AWBNo + '</AWBNo><Origin>' + $("#txtOrigin").val().toUpperCase() + '</Origin><Dest>' + $("#txtDestination").val().toUpperCase() + '</Dest><OffPoint>' + $("#txtOffpoint").val().toUpperCase() + '</OffPoint><ComSearchCode>' + passCommoId + '</ComSearchCode><FlightAirline>' + $("#txtAirline").val().toUpperCase() + '</FlightAirline><FlightNumber>' + $("#txtFlightNo").val().toUpperCase() + '</FlightNumber><SHCCode>' + $("#txtSHCCode").val().toUpperCase() + '</SHCCode><FlightDate1>' + $("#txtFlightDate").val() + '</FlightDate1><Pieces>' + $("#txtPieces").val() + '</Pieces><GrWt>' + $("#txtGrWt").val() + '</GrWt><ChWt>' + $("#txtCharWt").val() + '</ChWt><Volume>' + $("#txtVolume").val() + '</Volume><DimUom>' + $("#ddlUnit1").val() + '</DimUom><DimDetails>' + inputRows + '</DimDetails><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><UserID>' + UserID + '</UserID>' + shipConAgtXML + '</Root > ';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetAWBDetailSave_V3",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                //console.log(xmlDoc);
                $("#AllMsg").text('');
                $(xmlDoc).find('Table').each(function () {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Status = $(this).find('Status').text();
                    var OutMsg = $(this).find('OutMsg').text();

                    if (Status == 'S') {
                        $("#AllMsg").text(OutMsg).css({ 'color': 'green' });
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtGroupId').focus();
                        //});
                        clearALLafterSave();
                        return;
                    } else {
                        $("#AllMsg").text(OutMsg).css({ 'color': 'red' });
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

function log(message) {
    $("<div>").text(message).prependTo("#log");
    $("#log").scrollTop(0);
}



function clearALLafterSave() {
    $('#txtAWBNo').val('');
    //$('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtFlightNo').val('');
    $('#txtPieces').val('');
    $('#txtGrWt').val('');
    $('#txtCharWt').val('');
    $('#txtVolume').val('');
    $('#txtShipperPrifix').val('');
    $('#txtShipper').val('');
    $('#txtConsigneePrifix').val('');
    $('#txtConsignee').val('');
    $('#txtAgentNamePrifix').val('');
    $('#txtAgentName').val('');
    shipperLists = [];
    flightAirNoLists = [];
    ConsigneeLists = [];
    AgentNameLists = [];
    $('#txtAWBNo').focus();
    //let date = new Date();
    //const day = date.toLocaleString('default', { day: '2-digit' });
    //const month = date.toLocaleString('default', { month: 'short' });
    //const year = date.toLocaleString('default', { year: 'numeric' });
    //var today = day + '-' + month + '-' + year;

    //$('#txtFlightDate').val(today);

    //$("#txtFlightDate").datepicker({
    //    shortYearCutoff: 1,
    //    changeMonth: true,
    //    changeYear: true,
    //    dateFormat: 'dd-M-yy',

    //});
    $('#txtSHCCode').val('');
    shipperCode = [];
    consigneeCode = [];
    agentCode = [];

    A_List = [];
    S_List = [];
    C_List = [];

    $('#ddlFlightNo').empty();
    $('#dtable').hide();
    $('#txtCommodity').val('');
    passCommoId = '';
    commodiyCode = [];
    $('#txtPieces').removeAttr('disabled', 'disabled');
    $('#txtGrWt').removeAttr('disabled', 'disabled');
    $('#txtCharWt').removeAttr('disabled', 'disabled');
    $('#txtVolume').removeAttr('disabled', 'disabled');
    $('#txtCommodity').removeAttr('disabled');
    $('#txtOffpoint').removeAttr('disabled');
    GetCommodityDataV3();

    $('#txtAirline').val('');
    $('#txtFlightNo').val('');
    $('#txtOffpoint').val('');

    GetAWBDetailSearch_V3_onLoad();
    clearGrid();

    $('#txtAccPieces').val('');
    $('#txtAccLength').val('');
    $('#txtAccWidth').val('');
    $('#txtAccHeight').val('');
    $('#ddlAccCMIN').val('-1');


}


function clearALL() {
    /* $('#dtable').hide();*/
    $("#dtable tbody").empty();
    min_allVolumn_1 = 0;
    min_allCharWt_1 = 0;
    allVolumn_1 = 0;
    allCharWt_1 = 0;
    $('#txtAWBNo').val('');
    $('#txtSHCCode').val('');
    //$('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtFlightNo').val('');
    $('#txtPieces').val('');
    $('#txtGrWt').val('');
    $('#txtCharWt').val('');
    $('#txtVolume').val('');
    $('#txtShipperPrifix').val('');
    $('#txtShipper').val('');
    $('#txtConsigneePrifix').val('');
    $('#txtConsignee').val('');
    $('#txtAgentNamePrifix').val('');
    $('#txtAgentName').val('');
    shipperLists = [];
    flightAirNoLists = [];
    flightAirNoListsNoCarrierCode = [];
    ConsigneeLists = [];
    AgentNameLists = [];
    $('#txtAWBNo').focus();
    //let date = new Date();
    //const day = date.toLocaleString('default', { day: '2-digit' });
    //const month = date.toLocaleString('default', { month: 'short' });
    //const year = date.toLocaleString('default', { year: 'numeric' });
    //var today = day + '-' + month + '-' + year;
    //$('#txtFlightDate').val(today);

    //$("#txtFlightDate").datepicker({
    //    shortYearCutoff: 1,
    //    changeMonth: true,
    //    changeYear: true,
    //    dateFormat: 'dd-M-yy',

    //});
    $('#AllMsg').text('');

    shipperCode = [];
    consigneeCode = [];
    agentCode = [];

    A_List = [];
    S_List = [];
    C_List = [];

    $('#txtFlightNo').removeClass('ui-autocomplete-input');
    $('#ddlFlightNo').empty();
    $("#txtFlightNo").autocomplete({
        disabled: true
    });
    $('#txtFlightNo').data().term = null;
    $('#ddlCommodity').data().term = null;
    $('#txtCommodity').val('');
    passCommoId = '';
    commodiyCode = [];
    //$("#txtCommodity").autocomplete({
    //    disabled: true
    //});

    $('#txtAirline').val('');
    $('#txtFlightNo').val('');
    $('#txtOffpoint').val('');



    $('#ddlEquTrolley1').val('-1');
    $('#ddlEquTrolley2').val('-1');
    $('#ddlEquTrolley3').val('-1');
    $('#ddlEquTrolley4').val('-1');
    $('#ddlEquTrolley5').val('-1');


    $('#txtPieces').removeAttr('disabled', 'disabled');
    $('#txtGrWt').removeAttr('disabled', 'disabled');
    $('#txtCharWt').removeAttr('disabled', 'disabled');
    $('#txtVolume').removeAttr('disabled', 'disabled');
    $('#txtCommodity').removeAttr('disabled');
    $('#txtOffpoint').removeAttr('disabled');
    GetCommodityDataV3();
    GetAWBDetailSearch_V3_onLoad();
    clearGrid();
    $('#divAcceptPoPUp').empty();
    $('#dtable').hide();
    $('#divAddDim').show();
}

function clearGrid() {
    $('#divAcceptPoPUp').empty();
    $('#dtable').hide();
    $("#Pieces1").val('').removeAttr('disabled');
    $("#Length1").val('').removeAttr('disabled');
    $("#Width1").val('').removeAttr('disabled');
    $("#Height1").val('').removeAttr('disabled');

    $("#Pieces2").val('').removeAttr('disabled');
    $("#Length2").val('').removeAttr('disabled');
    $("#Width2").val('').removeAttr('disabled');
    $("#Height2").val('').removeAttr('disabled');

    $("#Pieces3").val('').removeAttr('disabled');
    $("#Length3").val('').removeAttr('disabled');
    $("#Width3").val('').removeAttr('disabled');
    $("#Height3").val('').removeAttr('disabled');

    $("#Pieces4").val('').removeAttr('disabled');
    $("#Length4").val('').removeAttr('disabled');
    $("#Width4").val('').removeAttr('disabled');
    $("#Height4").val('').removeAttr('disabled');

    $("#Pieces5").val('').removeAttr('disabled');
    $("#Length5").val('').removeAttr('disabled');
    $("#Width5").val('').removeAttr('disabled');
    $("#Height5").val('').removeAttr('disabled');
}

function clearALLNew() {

    // $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtFlightNo').val('');
    $('#txtPieces').val('');
    $('#txtGrWt').val('');
    $('#txtCharWt').val('');
    $('#txtVolume').val('');
    $('#txtShipperPrifix').val('');
    $('#txtShipper').val('');
    $('#txtConsigneePrifix').val('');
    $('#txtConsignee').val('');
    $('#txtAgentNamePrifix').val('');
    $('#txtAgentName').val('');
    shipperLists = [];
    flightAirNoLists = [];
    ConsigneeLists = [];
    AgentNameLists = [];

    //let date = new Date();
    //const day = date.toLocaleString('default', { day: '2-digit' });
    //const month = date.toLocaleString('default', { month: 'short' });
    //const year = date.toLocaleString('default', { year: 'numeric' });
    //var today = day + '-' + month + '-' + year;
    //$('#txtFlightDate').val(today);

    //$("#txtFlightDate").datepicker({
    //    shortYearCutoff: 1,
    //    changeMonth: true,
    //    changeYear: true,
    //    dateFormat: 'dd-M-yy',

    //});
    $('#AllMsg').text('');

    shipperCode = [];
    consigneeCode = [];
    agentCode = [];

    A_List = [];
    S_List = [];
    C_List = [];

    $('#ddlFlightNo').removeClass('ui-autocomplete-input');
    $('#txtCommodity').val('').removeAttr('disabled');
    $('#txtPieces').removeAttr('disabled', 'disabled');
    $('#txtGrWt').removeAttr('disabled', 'disabled');
    $('#txtCharWt').removeAttr('disabled', 'disabled');
    $('#txtVolume').removeAttr('disabled', 'disabled');
    $('#txtCommodity').removeAttr('disabled');
    //$('#btnSubmit').removeAttr('disabled');
    $('#txtOffpoint').removeAttr('disabled');
    $('#divAcceptPoPUp').empty();
    $('#dtable').hide();
}

function ClearIGM() {

    $('#ddlIGM').empty();
}

function clearBeforePopulate() {
    $('#divAcceptPoPUp').empty();
    $('#dtable').hide();
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
}

function ChkAndValidate() {

    var ScanCode = $('#txtAWBNo').val();
    ScanCode = ScanCode.replace(/\s+/g, '');
    ScanCode = ScanCode.replace("-", "").replace("–", "");

    if (ScanCode.length >= 11) {

        $('#txtAWBNo').val(ScanCode.substr(0, 11));
        //$('#txtAWBNo').val(ScanCode.substr(3, 8));
        //$('#txtScanCode').val('');

        //GetShipmentStatus();
    }
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

$(function () {
    //$("#txtBCDate").datepicker({
    //    dateFormat: "dd/mm/yy"
    //});
    //$("#txtBCDate").datepicker().datepicker("setDate", new Date());
});


function GetCommodityDataV3() {

    commodiyCode = [];

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var InputXML = '<Root><validfor>A</validfor><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetCommodityListV3",
            data: JSON.stringify({ 'InputXML': InputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;                

                response = response.d;
                var xmlDoc = $.parseXML(response);
                // console.log(xmlDoc);
                commodiyCode = [];
                
                $(xmlDoc).find('Table').each(function () {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var Status = $(this).find('Status').text();
                    var OutMsg = $(this).find('OutMsg').text();

                    if (status == 'E') {
                        $.alert($(this).find('OutMsg').text()).css('color', 'red');
                        //$(".alert_btn_ok").click(function () {
                        //    $('#txtGroupId').focus();
                        //});
                        return true;
                    }
                });
                var _data;
                $(xmlDoc).find('Table1').each(function () {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var SrNO = $(this).find('SrNO').text();
                    var Description = $(this).find('Description').text();
                    var GroupCode = $(this).find('GroupCode').text();
                    /* $('#txtConsignee').val(Name);*/

                    var newOption = $('<option></option>');
                    newOption.val(SrNO + '~' + GroupCode).text(Description);
                    newOption.appendTo('#ddlCommodity');

                    commodiyCode.push({ 'value': SrNO + '~' + GroupCode, 'label': Description });
                    _data = JSON.stringify(commodiyCode);


                    // $('#attribute').select2();
                    //$("#ddlCommodity").select2({
                    //    data: [
                    //        { id: SrNO, text: SrNO }]
                    //});
                });
                //console.log(_data)
                //$("#ddlCommodity").select2({
                //    data: _data
                //});

                if (selectedRowHAWBNo != '') {
                    //TODO :Change selectedRowHAWBNo to  $("#hawbLists").val()
                    $("#ddlCommodity option").each(function () {
                        if ($(this).text() == selectedRowHAWBNo) {
                            $(this).attr('selected', 'selected');
                            var selectedCommodity = $(this).val();

                            onChangeComm(selectedCommodity);
                        }
                    });
                }

                if (commodiyCode.length > 0) {
                    $("#txtCommodity").autocomplete({
                        minChars: 0,
                        minLength: 1,
                        source: commodiyCode,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            // $("#txtCommodity").focus();
                            $("#txtCommodity").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#txtCommodity").val(ui.item.label);
                            $('#ddlCommodity').val(ui.item.value)
                            onChangeComm($('#ddlCommodity').val());
                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#txtCommodity").focus(function () {
                        // $(this).autocomplete("search", $(this).val());
                    });

                    $.ui.autocomplete.filter = function (array, term) {
                        var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
                        return $.grep(array, function (value) {
                            return matcher.test(value.label || value.value || value);
                        });
                    };
                    // $("#txtConsignee").focus();
                }

                $("body").mLoading('hide');

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

let allVolumn_1 = 0;
let allCharWt_1 = 0;

//$('#ddlAccCMIN').empty();

function CalculateVol_1() {
    if ($("#txtAccPieces").val() == '') {
        return;
    }
    if ($("#txtAccHeight").val() == '') {
        return;
    }
    var arr = $("#ddlAccCMIN").val().split('~')
    var is1 = arr[0];
    var isFixed = arr[1];
    var isLength = arr[2];
    var isWidth = arr[3];
    var isHeight = arr[4];
    var isUnit = arr[5];
    var L;
    var W;
    var H;
    var decChargeableWt;

    if ($("#ddlAccCMIN").val() != '-1' && isFixed != 0) {
        //if gage selected

        if ($("#ddlUnit1").val() == 'cm') {
            //if centimeter calculate chargeable wt start here
            decChargeableWt = (1 * parseFloat($("#txtAccLength").val()) *
                parseFloat($("#txtAccWidth").val()) *
                parseFloat($("#txtAccHeight").val())) /
                6000;
            /// end ch wt calculation

            //vol wt cal start here
            volumetricWt = (1 * parseFloat($("#txtAccLength").val()) *
                parseFloat($("#txtAccWidth").val()) *
                parseFloat($("#txtAccHeight").val())) /
                1000000;
            /// end vloume wt calculation


        } else {
            // if inches ch wt start here
            decChargeableWt = (parseFloat($("#txtAccLength").val()) *
                parseFloat($("#txtAccWidth").val()) *
                parseFloat($("#txtAccHeight").val()) *
                1) /
                366;

            volumetricWt = (parseFloat($("#txtAccLength").val()) *
                parseFloat($("#txtAccWidth").val()) *
                parseFloat($("#txtAccHeight").val()) *
                // $("#txtAccPieces").val()) /  calculate with static 1 change by junaid 16032023
                (1 * 16.39)) /
                1000000;
        }

    } else {


        //if CMS selected fro ddl

        if ($("#ddlUnit1").val() == 'cm') {
            //if centimeter calculate chargeable wt start here
            decChargeableWt = (parseInt($("#txtAccPieces").val()) * parseFloat($("#txtAccLength").val()) *
                parseFloat($("#txtAccWidth").val()) *
                parseFloat($("#txtAccHeight").val())) /
                6000;
            /// end ch wt calculation

            //vol wt cal start here
            volumetricWt = (parseInt($("#txtAccPieces").val()) * parseFloat($("#txtAccLength").val()) *
                parseFloat($("#txtAccWidth").val()) *
                parseFloat($("#txtAccHeight").val())) /
                1000000;
            /// end vloume wt calculation


        } else {
            // if inches ch wt start here
            decChargeableWt = (parseFloat($("#txtAccLength").val()) *
                parseFloat($("#txtAccWidth").val()) *
                parseFloat($("#txtAccHeight").val()) *
                parseInt($("#txtAccPieces").val())) /
                366;

            volumetricWt = (parseFloat($("#txtAccLength").val()) *
                parseFloat($("#txtAccWidth").val()) *
                parseFloat($("#txtAccHeight").val()) *
                // $("#txtAccPieces").val()) /  calculate with static 1 change by junaid 16032023
                ($("#txtAccPieces").val() * 16.39)) /
                1000000;
        }

    }

    allVolumn_1 += Number(volumetricWt.toFixed(2));
    allCharWt_1 += Number(decChargeableWt.toFixed(2));
    $("#txtVolume").val(parseFloat(allVolumn_1.toFixed(2)));

    //var grWT = parseFloat($("#txtGrWt").val());
    //var chaWT = parseFloat(allCharWt_1);
    if (parseFloat($("#txtGrWt").val()) > parseFloat(allCharWt_1)) {
        $("#txtCharWt").val($("#txtGrWt").val());
    } else {
        $("#txtCharWt").val(allCharWt_1.toFixed(2));
    }

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
                        if (ButtonId == 'btnSubmit' && IsEnable == 'Y') {
                            $("#btnSubmit").removeAttr('disabled');
                        } else {
                            $("#btnSubmit").attr('disabled', 'disabled');

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

function GetFlightRoutingDetails_V3(flightDateForFetch) {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><FlightAirline>' + $("#txtAirline").val() + '</FlightAirline><FlightNumber>' + $("#txtFlightNo").val() + '</FlightNumber><FlightDate>' + flightDateForFetch + '</FlightDate></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetFlightRoutingDetails_V3",
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
                $("#txtDestination").val('');
                $("#txtOffpoint").val('');
                console.log(xmlDoc)
                $(xmlDoc).find('Table1').each(function (index) {

                    AirportCity_1 = $(this).find('AirportCity').text();
                    Indicator = $(this).find('Indicator').text();

                    if (Indicator == 'D') {
                        $("#txtDestination").val(AirportCity_1);
                    }
                    if (Indicator == 'T') {
                        $("#txtOffpoint").val(AirportCity_1);
                    } else {
                        $("#txtOffpoint").val(AirportCity_1);

                    }

                    //if (index == 0) {
                    //    if (ButtonId == 'btnSubmit' && IsEnable == 'Y') {
                    //        $("#btnSubmit").removeAttr('disabled');
                    //    } else {
                    //        $("#btnSubmit").attr('disabled', 'disabled');

                    //    }
                    //}


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

function GetFlightRoutingDetails_V3_onblure() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><FlightAirline>' + $("#txtAirline").val() + '</FlightAirline><FlightNumber>' + $("#txtFlightNo").val() + '</FlightNumber><FlightDate>' + $("#txtFlightDate").val() + '</FlightDate></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetFlightRoutingDetails_V3",
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
                $("#txtDestination").val('');
                $("#txtOffpoint").val('');

                console.log(xmlDoc)
                $(xmlDoc).find('Table1').each(function (index) {

                    AirportCity_1 = $(this).find('AirportCity').text();
                    Indicator = $(this).find('Indicator').text();

                    if (Indicator == 'D') {
                        $("#txtDestination").val(AirportCity_1);
                        
                    }
                    if (Indicator == 'T') {
                        $("#txtOffpoint").val(AirportCity_1);
                    } else {
                        if ($("#txtOrigin").val() == AirportCity_1) {
                            $("#txtOffpoint").val($("#txtDestination").val());
                        }

                    }

                    //if (index == 0) {
                    //    if (ButtonId == 'btnSubmit' && IsEnable == 'Y') {
                    //        $("#btnSubmit").removeAttr('disabled');
                    //    } else {
                    //        $("#btnSubmit").attr('disabled', 'disabled');

                    //    }
                    //}


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

