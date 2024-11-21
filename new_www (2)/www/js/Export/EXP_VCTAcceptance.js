var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var UserId = window.localStorage.getItem("UserID");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var PreferredLanguage = window.localStorage.getItem("PreferredLanguage");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserName = window.localStorage.getItem("UserName");
var VCTNo = window.localStorage.getItem("VCTNo");
var VCTId = window.localStorage.getItem("VCTId");
var Door = window.localStorage.getItem("Door");
var companyCode = window.localStorage.getItem("companyCode");
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
var _XmlForSHCCode;
var joinAllValuesWithComma = '';
var allSHCCodeSave = '';
var values = [];
var TrolleyCode_1;
var TrolleyCode_2;
var TrolleyCode_3;
var TrolleyCode_4;
var TrolleyCode_5;
var isFiveFoure = '0';
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


    $('#lblVCTNo').text(VCTNo.toUpperCase());
    GetVCTUnScannedDetails_v3(VCTNo);

    //GetTrolleyListDetails_HHT();


    $('#ddlAWBNo').change(function () {

        if ($('#ddlAWBNo').val() == '0') {
            $('#btnComplete').attr('disabled', 'disabled');
            $('#btnSubmit').attr('disabled', 'disabled');
            clearALL();
            return;

        } else {
            $('#btnComplete').removeAttr('disabled');
            $('#btnSubmit').removeAttr('disabled');
        }

        var str = $(this).find("option:selected").text();
        selectedAWBNo = str.substring(0, 11);

        _Value = $("option:selected", this).val();

        //sbno = _Value.split(",")[0];
        //awbid = _Value.split(",")[1];

        ConsignmentRowID = $(this).find("option:selected").val();


        $(_xmlDocTable).find('Table1').each(function (index) {
            if (ConsignmentRowID == $(this).find('ConsignmentRowID').text()) {

                if ($(this).find('ConsignmentRowID').text() == ConsignmentRowID) {
                    SBNo = $(this).find('SBNo ').text();
                    HAWBNo = $(this).find('HAWBNo').text();

                    $('#txtSBNo').val(SBNo);
                    $('#txtHAWB').val(HAWBNo);

                    // $('#txPieces').val($(this).find('SDA_PackageCount_I').text());
                    $('#txPieces').val($(this).find('RemainingPkg').text());
                    $('#txtCommodity').val($(this).find('Description').text());
                    ConsignmentRowIDForSave = $(this).find('ConsignmentRowID').text();
                    IsSecured = $(this).find('IsSecured').text();
                    if (IsSecured == 'N') {
                        isSecuredFlag = 'false';
                    } else {
                        isSecuredFlag = 'true';
                    }
                    remPCS = $(this).find('RemainingPkg').text();
                    Type = $(this).find('Type').text();
                    AutoTSP = $(this).find('AutoTSP').text();
                    AcceptanceLevel = $(this).find('AcceptanceLevel').text();
                    CompleteAcceptance = $(this).find('CompleteAcceptance').text();

                    if (remPCS == '0') {
                        $('#btnSubmit').attr('disabled', 'disabled');
                    } else {
                        $('#btnSubmit').removeAttr('disabled');
                    }

                    if (AcceptanceLevel == 'S') {
                        $('#txtSBNo').removeAttr('disabled');
                        $('#txtHAWB').removeAttr('disabled');
                    } else {
                        $('#txtSBNo').attr('disabled', 'disabled');
                        $('#txtHAWB').attr('disabled', 'disabled');
                    }

                    if (AcceptanceLevel == 'H') {
                        $('#txtHAWB').removeAttr('disabled');
                    } else {
                        $('#txtHAWB').attr('disabled', 'disabled');
                    }

                    if (AcceptanceLevel == 'A') {
                        $('#txtSBNo').attr('disabled', 'disabled');
                        $('#txtHAWB').attr('disabled', 'disabled');
                    }


                    if (CompleteAcceptance != '0') {
                        $('#btnComplete').removeAttr('disabled');
                        // $('#btnSubmit').attr('disabled', 'disabled');

                    } else {
                        $('#btnComplete').attr('disabled', 'disabled');
                        // $('#btnSubmit').removeAttr('disabled');

                    }
                    var newSHC = $(this).find('SHCAll').text();
                    $("#TextBoxDivforSHCCode").empty();
                    SHCSpanHtml(newSHC);

                    // $('#txtScaleWt').val($(this).find('SDA_GrossWt_I').text());
                    $('#txtScaleWt').val($(this).find('RemainingWt').text());
                    $('#txtGroupId').focus();

                    aaSDA_SBNo_C = SDA_SBNo_C;

                    //if ($(this).find('RemainingPieces').text() == '0') {
                    //    errmsg = "TDG already done for Airway Bill No.:" + $(this).find('SDA_AWBNumber_C').text() + "/ Shipping Bill No.: " + $(this).find('SDA_SBNo_C').text() + "</br>";
                    //    $.alert(errmsg);
                    //    //  $("#spnMsg").text("TDG already done for Airway Bill No.:" + $(this).find('SDA_AWBNumber_C').text() + "/ Shipping Bill No.: " + $(this).find('SDA_SBNo_C').text()).css({ 'color': 'red' });
                    //    $('#btnSubmit').attr('disabled', 'disabled');
                    //    $('#txtGroupId').attr('disabled', 'disabled');
                    //    $('#txPieces').attr('disabled', 'disabled');
                    //    $('#txtScaleWt').attr('disabled', 'disabled');
                    //    $('#ddlEquTrolley').attr('disabled', 'disabled');
                    //    $('#addButton').attr('disabled', 'disabled');
                    //    // $('#spnMsg').text('');
                    //    //$('#TextBoxesGroup').empty();
                    //    $('#TextBoxesGroup').hide();
                    //    //  $('#TextBoxDiv1m').empty();

                    //    removeRowOnChange();

                    //    $('#Pieces1').val('');
                    //    $('#Length1').val('');
                    //    $('#Width1').val('');
                    //    $('#Height1').val('');
                    //    // $('#ddlUnit1').val('');
                    //    $('#txtGroupId').val('');
                    //    $('#ddlEquTrolley').val('0');


                    //    $('#Pieces1').hide();
                    //    $('#Length1').hide();
                    //    $('#Width1').hide();
                    //    $('#Height1').hide();
                    //    //  $('#ddlUnit1').hide();

                    //    return;

                    //} else {
                    //    $('#btnSubmit').removeAttr('disabled');
                    //    $('#txtGroupId').removeAttr('disabled');
                    //    $('#txPieces').removeAttr('disabled');
                    //    $('#txtScaleWt').removeAttr('disabled');
                    //    $('#ddlEquTrolley').removeAttr('disabled');
                    //    $('#addButton').removeAttr('disabled');
                    //    $('#spnMsg').text('');
                    //    $('#txtGroupId').focus();
                    //    $("#spnMsg").text('');

                    //    //$('Pieces1').val('');
                    //    //$('Length1').val('');
                    //    //$('Width1').val('');
                    //    //$('Height1').val('');
                    //    //$('ddlUnit1').val('');


                    //    $('#Pieces1').show();
                    //    $('#Length1').show();
                    //    $('#Width1').show();
                    //    $('#Height1').show();
                    //    $('#ddlUnit1').show();
                    //}
                }
            }
        });

        //$(_xmlDocTable).find('Table1').each(function (index) {
        //    sda_awbnumber_c = $(this).find('sda_awbnumber_c').text();
        //    sda_sbno_c = $(this).find('sda_sbno_c').text();
        //    EVD_LENGTH_D = $(this).find('EVD_LENGTH_D').text();
        //    EVD_WIDTH_D = $(this).find('EVD_WIDTH_D').text();
        //    EVD_HEIGTH_D = $(this).find('EVD_HEIGTH_D').text();
        //    EVD_PIECES_I = $(this).find('EVD_PIECES_I').text();
        //    EVD_UOM_C = $(this).find('EVD_UOM_C').text();
        //   // dynamicTrCreate(EVD_PIECES_I, EVD_LENGTH_D, EVD_WIDTH_D, EVD_HEIGTH_D, EVD_UOM_C);

        //    $("#Pieces1").val(EVD_PIECES_I);
        //    $("#Length1").val(parseFloat(EVD_LENGTH_D).toFixed(2));
        //    $("#Width1").val(parseFloat(EVD_WIDTH_D).toFixed(2));
        //    $("#Height1").val(parseFloat(EVD_HEIGTH_D).toFixed(2));
        //    $("#ddlUnit1").val(EVD_UOM_C);
        //});

        //selectedAWBNo = $(this).find("option:selected").text();
        //GetAWBDetailsForULDOnChange(selectedAWBNo);
    });

    //  dynamicTrCreate();

    //var $input;
    //var formElements = new Array();
    $("#addButton").click(function () {
        dynamicTrCreateaddRow();
        //    var firstTextBox = parseInt($("#Pieces1").val())
        //    var CurrSumDImPcs = 0;
        //    var j = 0
        //    $('#TextBoxesGroup').find('input').each(function (i, input) {
        //        $input = $(input);
        //        $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
        //        formElements.push($input.val());
        //        if ($(input).attr('id') == "Pieces" + parseInt(j + 1)) {
        //            CurrSumDImPcs = CurrSumDImPcs + parseInt($input.val());
        //            j++;
        //        }
        //    });
        //    if ($input.val() == '') {
        //        $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
        //    } else {


        //        if ($('#txPieces').val() == CurrSumDImPcs) {
        //            errmsg = "Sum of packages are equal to entered packages.</br>";
        //            $.alert(errmsg);
        //            return;

        //        } else if (CurrSumDImPcs < $('#txPieces').val()) {

        //            nextValue = $('#txPieces').val() - CurrSumDImPcs;
        //            //$(this).find('HAWBNo').text();

        //            //var ids = [];
        //            //$('#TextBoxesGroup tr').each(function () {
        //            //    ids.push($(this).find('td:first-child input[type="text"]').attr('id'));
        //            //    console.log(ids)
        //            //})
        //            //$("#textpackges1").val(nextValue)
        //            dynamicTrCreate(nextValue);
        //        }
        //        else if (CurrSumDImPcs > $('#txPieces').val()) {
        //            //errmsg = "Sum of dim packages are greater than remaining packages.</br>";
        //            //$.alert(errmsg);
        //            //return;
        //        }

        //    }

    });

    //$('#txtGroupId').blur(function () {
    //    $('#txPieces').focus();

    //});

    // $('#txtGroupId').focus();



    //$('#txPieces').blur(function (event) {

    //    if ($("#txPieces").val() == '') {
    //        return;
    //    }

    //    if (parseInt($("#txPieces").val()) > parseInt(remPCS)) {

    //        $("#txPieces").val(remPCS);
    //        //errmsg = "Entered pieces should not be greater than remaining pieces.</br>";
    //        //$.alert(errmsg);
    //        $("#spnMsg").text("Entered pieces should not be greater than remaining pieces.").css({ 'color': 'red' });
    //        $("#txPieces").focus();
    //        return;

    //    } else {
    //        $("#spnMsg").text('');
    //    }

    //    //if (parseInt($("#txPieces").val()) <= 0) {

    //    //    $("#txPieces").val(remPCS);
    //    //    $("#spnMsg").text('Entered pieces must be greater than 0.').css({ 'color': 'red' });
    //    //    //$.alert(errmsg);
    //    //    $("#txPieces").focus();
    //    //    return;

    //    //}



    //    if (remPCS == '0') {

    //        //errmsg = "Entered Pieces are greater than remaining packages; Action canceled.</br>";
    //        //$.alert(errmsg);
    //        return;

    //    }

    //    $('#Pieces1').val($("#txPieces").val())

    //    GetRemainingPackgs();

    //    //if (IsBaggage != 'Y') {
    //    //    if (parseInt($("#txPieces").val()) > parseInt(RemainingPkg)) {
    //    //        $("body").mLoading('hide');
    //    //        errmsg = "Entered Package(s) " + $("#txPieces").val() + " must be less than or equal to remaining Package(s) " + RemainingPkg + "</br>";
    //    //        $.alert(errmsg);
    //    //        $(".alert_btn_ok").click(function () {
    //    //            $("#txPieces").focus();
    //    //        });
    //    //    }
    //    //    else
    //    //        GetRemainingPackgs();
    //    //}
    //    //else
    //    //    GetRemainingPackgs();
    //});


    //$("#ddlEquTrolley").change(function () {
    //    //_vlaueofTrolley = $('option:selected', this).val();
    //    //_vlaueofTrolleytext = $('option:selected', this).text();

    //    ////REFERENCE = _vlaueofTrolley.split(",")[0];
    //    ////IDENTIFIER = _vlaueofTrolley.split(",")[1];

    //    //_TLRowId = _vlaueofTrolley.split(",")[0];
    //    //TrolleyGrossWt = _vlaueofTrolley.split(",")[1];
    //    //TrolleyTareWt = _vlaueofTrolley.split(",")[2];

    //    //var a = parseFloat($("#txtScaleWt").val());
    //    //var b = parseFloat(TrolleyGrossWt);
    //    //var x = (b + a).toFixed(3);
    //    //if (x == "NaN") {
    //    //    x = '';
    //    //} else {
    //    //    //var netWeight = parseInt($("#txtScaleWt").val()) - parseInt(REFERENCE)
    //    //    $("#NetWt").text(x);
    //    //    $('#TareWt').text(TrolleyGrossWt);
    //    //}

    //    _vlaueofTrolley = $('option:selected', this).val();
    //    _vlaueofTrolleytext = $('option:selected', this).text();

    //    REFERENCE = _vlaueofTrolley.split(",")[0]
    //    IDENTIFIER = _vlaueofTrolley.split(",")[1]

    //    var a = parseFloat($("#txtScaleWt").val());
    //    var b = parseFloat(REFERENCE);
    //    var x = (a - b).toFixed(2);
    //    if (x == "NaN") {
    //        x = '';
    //    } else {
    //        //var netWeight = parseInt($("#txtScaleWt").val()) - parseInt(REFERENCE)
    //        $("#NetWt").text(x);
    //        $('#TareWt').text(REFERENCE);
    //    }

    //});


    $("#txtScanAWB").blur(function () {

        if ($("#txtScanAWB").val() != '') {
            var value = this.value;// parseInt(this.value, 10),

            //  var res = value.replace(/(\d{3})/, "$1-")
            var res = value.replace()
            dd = document.getElementById('ddlAWBNo'),
                index = 0;

            $.each(dd.options, function (i) {
                console.log(this.text);
                if (this.text == res) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                // errmsg = "Please scan/enter valid AWB No.";
                // $.alert(errmsg);
                $('#successMsg').text('Please scan/enter valid AWB No.').css('color', 'red');
                return;
            }
            console.log(dd.selectedIndex);
            $('#successMsg').text('');
            $('#ddlAWBNo').trigger('change');
            //  $('#hawbLists').focus();

            // GetAWBDetailsForULD($('#ddlULDNo').val())
        }
    });



    $("input").keyup(function () {
        var string = $(this).val();
        // var string = $('#txtOrigin').val();
        if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓π@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
            /*$('#txtOrigin').val('');*/
            $(this).val('');
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }

    });

    getAgentList();
    getShiperList();
    getConsigneeList();
    GetCommodityDataV3();


    $("#ddlEquTrolley1").change(function () {
        // alert($(this).val());

        if ($("#ddlEquTrolley1").val() == '-1' || $("#ddlEquTrolley1").val() == '') {
            $("#Length1").val('').removeAttr('disabled');
            $("#Width1").val('').removeAttr('disabled');
            $("#Height1").val('').removeAttr('disabled');
            return;
        }
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

        if (isFiveFoure != '0') {
            $("#Pieces1").val(isFixed).attr('disabled', 'disabled');
        }

        $("#Length1").val(isLength).attr('disabled', 'disabled');
        $("#Width1").val(isWidth).attr('disabled', 'disabled');

        if (isHeight > 0) {
            $("#Height1").val(isHeight).attr('disabled', 'disabled');
        } else {
            $("#Height1").val('').removeAttr('disabled');
        }

    });

    $("#ddlEquTrolley2").change(function () {
        // alert($(this).val());
        if ($("#ddlEquTrolley2").val() == '-1' || $("#ddlEquTrolley2").val() == '') {
            $("#Length2").val('').removeAttr('disabled');
            $("#Width2").val('').removeAttr('disabled');
            $("#Height2").val('').removeAttr('disabled');
            return;
        }
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

        if (isFiveFoure != '0') {
            $("#Pieces2").val(isFixed).attr('disabled', 'disabled');
        }

        $("#Length2").val(isLength).attr('disabled', 'disabled');
        $("#Width2").val(isWidth).attr('disabled', 'disabled');

        if (isHeight > 0) {
            $("#Height2").val(isHeight).attr('disabled', 'disabled');
        } else {
            $("#Height2").val('').removeAttr('disabled');
        }

    });

    $("#ddlEquTrolley3").change(function () {
        // alert($(this).val());
        if ($("#ddlEquTrolley3").val() == '-1' || $("#ddlEquTrolley3").val() == '') {
            $("#Length3").val('').removeAttr('disabled');
            $("#Width3").val('').removeAttr('disabled');
            $("#Height3").val('').removeAttr('disabled');
            return;
        }
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

        if (isFiveFoure != '0') {
            $("#Pieces3").val(isFixed).attr('disabled', 'disabled');
        }

        $("#Length3").val(isLength).attr('disabled', 'disabled');
        $("#Width3").val(isWidth).attr('disabled', 'disabled');

        if (isHeight > 0) {
            $("#Height3").val(isHeight).attr('disabled', 'disabled');
        } else {
            $("#Height3").val('').removeAttr('disabled');
        }

    });

    $("#ddlEquTrolley4").change(function () {
        // alert($(this).val());
        if ($("#ddlEquTrolley4").val() == '-1' || $("#ddlEquTrolley4").val() == '') {
            $("#Length4").val('').removeAttr('disabled');
            $("#Width4").val('').removeAttr('disabled');
            $("#Height4").val('').removeAttr('disabled');
            return;
        }
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

        if (isFiveFoure != '0') {
            $("#Pieces4").val(isFixed).attr('disabled', 'disabled');
        }

        $("#Length4").val(isLength).attr('disabled', 'disabled');
        $("#Width4").val(isWidth).attr('disabled', 'disabled');

        if (isHeight > 0) {
            $("#Height4").val(isHeight).attr('disabled', 'disabled');
        } else {
            $("#Height4").val('').removeAttr('disabled');
        }

    });

    $("#ddlEquTrolley5").change(function () {
        // alert($(this).val());
        if ($("#ddlEquTrolley5").val() == '-1' || $("#ddlEquTrolley5").val() == '') {
            $("#Length5").val('').removeAttr('disabled');
            $("#Width5").val('').removeAttr('disabled');
            $("#Height5").val('').removeAttr('disabled');
            return;
        }
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

        if (isFiveFoure != '0') {
            $("#Pieces5").val(isFixed).attr('disabled', 'disabled');
        }

        $("#Length5").val(isLength).attr('disabled', 'disabled');
        $("#Width5").val(isWidth).attr('disabled', 'disabled');

        if (isHeight > 0) {
            $("#Height5").val(isHeight).attr('disabled', 'disabled');
        } else {
            $("#Height5").val('').removeAttr('disabled');
        }

    });



});

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

                    //if (index == 0) {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlAgentName');
                    //}

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


function onChangeComm(commID) {
    passCommoId = commID;
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
                    /* $('#txtConsignee').val(Name);*/
                    var newOption = $('<option></option>');
                    newOption.val(SrNO).text(Description);
                    newOption.appendTo('#ddlCommodity');
                    commodiyCode.push({ 'value': SrNO, 'label': Description });
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

function onChangeAgentName(aName) {

    AgentName_IACustID = aName;
    //if (AgentName_IACustID == null) {
    //    AgentName_IACustID = $('#ddlAgentName').val();
    //}

}
function onChangeConsineeName(sssid) {

    Consignee_CCustID = sssid;
}

function Shipper_GetShipperConsigneeWithShortCode_V3() {

    shipperID = $('#ddlShipper').val();

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
    $("#TextBoxDivforSHCCode").html(spanStr);
    return spanStr;

}
//function piecesOnBlure() {


//    if (parseInt($("#txPieces").val()) > parseInt(remPCS)) {

//        $("#txPieces").val(remPCS);
//        errmsg = "Entered pieces should not be greater than remaining pieces.</br>";
//        $.alert(errmsg);
//        return;

//    }

//    //if (parseInt($("#txPieces").val()) <= 0) {

//    //    $("#txPieces").val(remPCS);
//    //    errmsg = "Entered pieces must be greater than 0.</br>";
//    //    $.alert(errmsg);
//    //    return;

//    //}



//    if (remPCS == '0') {

//        //errmsg = "Entered Pieces are greater than remaining packages; Action canceled.</br>";
//        //$.alert(errmsg);
//        return;

//    }



//    if (IsBaggage != 'Y') {
//        if (parseInt($("#txPieces").val()) > parseInt(RemainingPkg)) {
//            $("body").mLoading('hide');
//            errmsg = "Entered Package(s) " + $("#txPieces").val() + " must be less than or equal to remaining Package(s) " + RemainingPkg + "</br>";
//            $.alert(errmsg);
//            $(".alert_btn_ok").click(function () {
//                $("#txPieces").focus();
//            });
//        }
//        else
//            GetRemainingPackgs();
//    }
//    else
//        GetRemainingPackgs();

//}

//function dynamicTrCreate(piecesValue) {

//    // if (counter > 5) {
//    //     //alert("Only 10 textboxes allow");
//    //     return false;
//    // }
//    var newTextBoxDiv = $(document.createElement('tr'))
//        .attr("id", 'TextBoxDiv' + counter);

//    newTextBoxDiv.after().html('<td><input onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" onkeypress="MoveToLen(this);" type="number" /></td>' +
//        '<td><input onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Length' + parseInt(counter + 1) + '" onkeypress="MoveToWid(this);"  type="number" /></td>' +
//        '<td><input onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Width' + parseInt(counter + 1) + '" onkeypress="MoveToHei(this);"  type="number" /></td>' +
//    '<td><input onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Height' + parseInt(counter + 1) + '"  type="text" /></td>' +
//        '<td><select id="ddlUnit' + parseInt(counter + 1) + '"><option value="cm">cm</option><option value="inch">inch</option></select></td>' +
//        '<td><button onclick="removeRow(' + counter + ');" type="button" id="btnAdd" style="background-color: red;" class=""><i class="glyphicon glyphicon-minus"></i></button></td>');


//    var one = parseInt($("#Pieces1").val());
//    var two = parseInt($("#Pieces2").val());
//    var sumOfTwoTextBox = one + two;

//    // if (parseInt($("#Pieces1").val()) == RemainingPkg) {
//    //     errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
//    //     $.alert(errmsg);

//    // } else if (sumOfTwoTextBox == RemainingPkg) {
//    //     $("#textpackges1").val(nextValue);
//    //     errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
//    //     $.alert(errmsg);

//    // } else {
//    newTextBoxDiv.appendTo("#TextBoxesGroup");
//    $("#textpackges1").val(nextValue);
//    counter++;

//    // }
//    GetRemainingPackgs();
//    $("#Pieces" + counter).focus();
//}








function GetRemainingPackgs() {
    piecesTyped = parseInt($("#txPieces").val());
    $('#TextBoxesGroup').show();
    $("#TextBoxDiv1m").show();
    if ($("#ddlMAWBNo").val() == '0') {
        $("#txPieces").val('');
        errmsg = "Please select MAWB No.</br>";
        $.alert(errmsg);
        return;
    }
    //else if (RemainingPkg > piecesTyped) {
    //    actualVal = RemainingPkg - $("#txPieces").val();
    //    $("#textpackgesFirst").val(piecesTyped)
    //} else if (RemainingPkg == piecesTyped) {
    //    $("#textpackgesFirst").val(RemainingPkg);
    //} else if (RemainingPkg < piecesTyped) {
    //    $("#textpackgesFirst").val(RemainingPkg);
    //    $("#txPieces").val(RemainingPkg);
    //    errmsg = "Enterd Package(s) must be less than or equal to remaining Package(s)</br>";
    //    $.alert(errmsg);
    //}


    var rpkg = piecesTyped;
    $('#TextBoxesGroup tr').each(function () {

        $(this).find("input").each(function () {

            ItemCode = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('Pieces') != -1) {
                // inputRows += "<Pieces>" + ItemCode + "</Pieces>"
                if ($(this).val() != "") {
                    rpkg = rpkg - parseInt($(this).val());

                }
                else {
                    $(this).val(rpkg);

                }
            }

        });

    });

    $('#TextBoxesGroup tr').each(function () {

        $(this).find("input").each(function () {

            ItemCode = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('Pieces') != -1) {
                $(this).val($('#txPieces').val());
            }

        });

    });

}

//getAllValues = function () {


//    inputRows = "";
//    $('#TextBoxesGroup tr').each(function () {

//        inputRows += "<Rows>"
//        $(this).find("input").each(function () {

//            ItemCode = $(this).val();
//            var id = $(this).attr('id');

//            if (id.toString().indexOf('Pieces') != -1) {
//                inputRows += "<Pieces>" + ItemCode + "</Pieces>"
//            }
//            else if (id.toString().indexOf('Length') != -1) {
//                inputRows += "<Length>" + ItemCode + "</Length>"
//            }
//            else if (id.toString().indexOf('Width') != -1) {
//                inputRows += "<Width>" + ItemCode + "</Width>"
//            }
//            else if (id.toString().indexOf('Height') != -1) {
//                inputRows += "<Height>" + ItemCode + "</Height>";
//            }
//        });
//        inputRows += "</Rows>";
//    });
//}

getAllValues = function () {

    if ($('#ddlEquTrolley1').val() != '-1' && $('#ddlEquTrolley1').val() != null) {

        if ($("#Pieces1").val() == '') {
            $("#Pieces1").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Pieces1").css('background-color', 'white');

        }
        if ($("#Length1").val() == '') {
            $("#Length1").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Length1").css('background-color', 'white');

        }
        if ($("#Width1").val() == '') {
            $("#Width1").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Width1").css('background-color', 'white');

        }

        if ($("#Height1").val() == '') {
            $("#Height1").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Height1").css('background-color', 'white');

        }


    } else {
        $("#Pieces1").css('background-color', 'white');
        $("#Length1").css('background-color', 'white');
        $("#Width1").css('background-color', 'white');
        $("#Height1").css('background-color', 'white');
    }

    if ($('#ddlEquTrolley2').val() != '-1' && $('#ddlEquTrolley2').val() != null) {

        if ($("#Pieces2").val() == '') {
            $("#Pieces2").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Pieces2").css('background-color', 'white');

        }
        if ($("#Length2").val() == '') {
            $("#Length2").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Length2").css('background-color', 'white');

        }
        if ($("#Width2").val() == '') {
            $("#Width2").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Width2").css('background-color', 'white');

        }


        if ($("#Height2").val() == '') {
            $("#Height2").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Height2").css('background-color', 'white');

        }


    } else {
        $("#Pieces2").css('background-color', 'white');
        $("#Length2").css('background-color', 'white');
        $("#Width2").css('background-color', 'white');
        $("#Height2").css('background-color', 'white');
    }

    if ($('#ddlEquTrolley3').val() != '-1' && $('#ddlEquTrolley3').val() != null) {

        if ($("#Pieces3").val() == '') {
            $("#Pieces3").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Pieces3").css('background-color', 'white');

        }
        if ($("#Length3").val() == '') {
            $("#Length2").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Length2").css('background-color', 'white');

        }
        if ($("#Width3").val() == '') {
            $("#Width3").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Width3").css('background-color', 'white');

        }


        if ($("#Height3").val() == '') {
            $("#Height3").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Height3").css('background-color', 'white');

        }


    } else {
        $("#Pieces3").css('background-color', 'white');
        $("#Length3").css('background-color', 'white');
        $("#Width3").css('background-color', 'white');
        $("#Height3").css('background-color', 'white');
    }

    if ($('#ddlEquTrolley4').val() != '-1' && $('#ddlEquTrolley4').val() != null) {

        if ($("#Pieces4").val() == '') {
            $("#Pieces4").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Pieces4").css('background-color', 'white');

        }
        if ($("#Length4").val() == '') {
            $("#Length4").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Length4").css('background-color', 'white');

        }
        if ($("#Width4").val() == '') {
            $("#Width4").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Width4").css('background-color', 'white');

        }


        if ($("#Height2").val() == '') {
            $("#Height2").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Height4").css('background-color', 'white');

        }


    } else {
        $("#Pieces4").css('background-color', 'white');
        $("#Length4").css('background-color', 'white');
        $("#Width4").css('background-color', 'white');
        $("#Height4").css('background-color', 'white');
    }

    if ($('#ddlEquTrolley5').val() != '-1' && $('#ddlEquTrolley5').val() != null) {

        if ($("#Pieces5").val() == '') {
            $("#Pieces5").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Pieces5").css('background-color', 'white');

        }
        if ($("#Length5").val() == '') {
            $("#Length5").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Length5").css('background-color', 'white');

        }
        if ($("#Width5").val() == '') {
            $("#Width5").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Width5").css('background-color', 'white');

        }


        if ($("#Height5").val() == '') {
            $("#Height5").css('background-color', '#FFCCCB');
            return;
        } else {
            $("#Height5").css('background-color', 'white');

        }


    } else {
        $("#Pieces5").css('background-color', 'white');
        $("#Length5").css('background-color', 'white');
        $("#Width5").css('background-color', 'white');
        $("#Height5").css('background-color', 'white');
    }
    var one = "";
    var two = "";
    var three = "";
    var foure = "";
    var five = "";
    if ($('#ddlEquTrolley1').val() != '-1' && $('#ddlEquTrolley1').val() != null) {

        selectedVal = $('#ddlEquTrolley1').val();
        var arr = selectedVal.split('~')
        var isREFERENCE_DATA_IDENTIFIER = arr[0];
        var isFixed = arr[1];
        var isLength = arr[2];
        var isWidth = arr[3];
        var isHeight = arr[4];
        var isUnit = arr[5];
        var isWeight = arr[6];
        var L;
        var W;
        var H;

        one += "<REFERENCE_DATA_IDENTIFIER>" + isREFERENCE_DATA_IDENTIFIER + "</REFERENCE_DATA_IDENTIFIER>";
        one += "<TrolleyFixed>" + isFixed + "</TrolleyFixed>";
        one += "<TrolleyWt>" + isWeight + "</TrolleyWt>";
        one += "<Pieces>" + $("#Pieces1").val() + "</Pieces>";
        one += "<Length>" + $("#Length1").val() + "</Length>";
        one += "<Width>" + $("#Width1").val() + "</Width>";
        one += "<Height>" + $("#Height1").val() + "</Height>";
        // $("#ddlUnit1").val()

        inputRows += '<DimDetails><Rows>' + one + '</Rows></DimDetails>';

    }

    if ($('#ddlEquTrolley2').val() != '-1' && $('#ddlEquTrolley2').val() != null) {

        selectedVal = $('#ddlEquTrolley2').val();
        var arr = selectedVal.split('~')
        var isREFERENCE_DATA_IDENTIFIER = arr[0];
        var isFixed = arr[1];
        var isLength = arr[2];
        var isWidth = arr[3];
        var isHeight = arr[4];
        var isUnit = arr[5];
        var isWeight = arr[6];
        var L;
        var W;
        var H;

        two += "<REFERENCE_DATA_IDENTIFIER>" + isREFERENCE_DATA_IDENTIFIER + "</REFERENCE_DATA_IDENTIFIER>";
        two += "<TrolleyFixed>" + isFixed + "</TrolleyFixed>";
        two += "<TrolleyWt>" + isWeight + "</TrolleyWt>";
        two += "<Pieces>" + $("#Pieces2").val() + "</Pieces>";
        two += "<Length>" + $("#Length2").val() + "</Length>";
        two += "<Width>" + $("#Width2").val() + "</Width>";
        two += "<Height>" + $("#Height2").val() + "</Height>";
        // $("#ddlUnit1").val()
        inputRows += '<DimDetails><Rows>' + two + '</Rows></DimDetails>';
    }

    if ($('#ddlEquTrolley3').val() != '-1' && $('#ddlEquTrolley3').val() != null) {

        selectedVal = $('#ddlEquTrolley3').val();
        var arr = selectedVal.split('~')
        var isREFERENCE_DATA_IDENTIFIER = arr[0];
        var isFixed = arr[1];
        var isLength = arr[2];
        var isWidth = arr[3];
        var isHeight = arr[4];
        var isUnit = arr[5];
        var isWeight = arr[6];
        var L;
        var W;
        var H;

        three += "<REFERENCE_DATA_IDENTIFIER>" + isREFERENCE_DATA_IDENTIFIER + "</REFERENCE_DATA_IDENTIFIER>";
        three += "<TrolleyFixed>" + isFixed + "</TrolleyFixed>";
        three += "<TrolleyWt>" + isWeight + "</TrolleyWt>";
        three += "<Pieces>" + $("#Pieces3").val() + "</Pieces>";
        three += "<Length>" + $("#Length3").val() + "</Length>";
        three += "<Width>" + $("#Width3").val() + "</Width>";
        three += "<Height>" + $("#Height3").val() + "</Height>";
        // $("#ddlUnit1").val()
        inputRows += '<DimDetails><Rows>' + three + '</Rows></DimDetails>';
    }

    if ($('#ddlEquTrolley4').val() != '-1' && $('#ddlEquTrolley4').val() != null) {

        selectedVal = $('#ddlEquTrolley4').val();
        var arr = selectedVal.split('~')
        var isREFERENCE_DATA_IDENTIFIER = arr[0];
        var isFixed = arr[1];
        var isLength = arr[2];
        var isWidth = arr[3];
        var isHeight = arr[4];
        var isUnit = arr[5];
        var isWeight = arr[6];
        var L;
        var W;
        var H;

        foure += "<REFERENCE_DATA_IDENTIFIER>" + isREFERENCE_DATA_IDENTIFIER + "</REFERENCE_DATA_IDENTIFIER>";
        foure += "<TrolleyFixed>" + isFixed + "</TrolleyFixed>";
        foure += "<TrolleyWt>" + isWeight + "</TrolleyWt>";
        foure += "<Pieces>" + $("#Pieces4").val() + "</Pieces>";
        foure += "<Length>" + $("#Length4").val() + "</Length>";
        foure += "<Width>" + $("#Width4").val() + "</Width>";
        foure += "<Height>" + $("#Height4").val() + "</Height>";
        // $("#ddlUnit1").val()
        inputRows += '<DimDetails><Rows>' + foure + '</Rows></DimDetails>';
    }

    if ($('#ddlEquTrolley5').val() != '-1' && $('#ddlEquTrolley5').val() != null) {

        selectedVal = $('#ddlEquTrolley5').val();
        var arr = selectedVal.split('~')
        var isREFERENCE_DATA_IDENTIFIER = arr[0];
        var isFixed = arr[1];
        var isLength = arr[2];
        var isWidth = arr[3];
        var isHeight = arr[4];
        var isUnit = arr[5];
        var isWeight = arr[6];
        var L;
        var W;
        var H;

        five += "<REFERENCE_DATA_IDENTIFIER>" + isREFERENCE_DATA_IDENTIFIER + "</REFERENCE_DATA_IDENTIFIER>";
        five += "<TrolleyFixed>" + isFixed + "</TrolleyFixed>";
        five += "<TrolleyWt>" + isWeight + "</TrolleyWt>";
        five += "<Pieces>" + $("#Pieces5").val() + "</Pieces>";
        five += "<Length>" + $("#Length5").val() + "</Length>";
        five += "<Width>" + $("#Width5").val() + "</Width>";
        five += "<Height>" + $("#Height5").val() + "</Height>";
        // $("#ddlUnit1").val()
        inputRows += '<DimDetails><Rows>' + five + '</Rows></DimDetails>';
    }
    console.log(inputRows)
}


//"<DimsP =2L =2W = 2H =2/>"
function GetULDDetailsforVCT() {

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    $('#ddlULDNo').empty();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CargoWorksServiceURL + "GetVCTULDDetail",
            data: JSON.stringify({
                'strVCTNo': $('#txtVCTNo').val(), 'strCompanyCode': CompanyCode, 'strAirportCity': AirportCity, 'strShedCode': SHEDCODE, 'strUserId': UserId,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                $(xmlDoc).find('Table').each(function (index) {

                    var ULDId;
                    var ULD;
                    ULDId = $(this).find('ULDSeqNo').text();
                    ULD = $(this).find('ULDNo').text();

                    var newOption = $('<option></option>');
                    newOption.val(ULDId).text(ULD);
                    newOption.appendTo('#ddlULDNo');

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Data could not be loaded');
            }
        });
        return false;
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

function GetTrolleyListDetails_HHT() {

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    $('#ddlEquTrolley').empty();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "GetTrolleyListDetails_HHT",
            data: JSON.stringify({}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                $(xmlDoc).find('Table').each(function (index) {


                    TLRowId = $(this).find('TLRowId').text();
                    TrolleyNo = $(this).find('TrolleyNo').text();
                    TrolleyGrossWt = $(this).find('TrolleyGrossWt').text();
                    TrolleyTareWt = $(this).find('TrolleyTareWt').text();


                    if (index == 0 && $("#ddlEquTrolley").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlEquTrolley');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(TLRowId + ',' + TrolleyGrossWt + ',' + TrolleyGrossWt).text(TrolleyNo);
                    newOption.appendTo('#ddlEquTrolley');

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Data could not be loaded');
            }
        });
        return false;
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

function GetVCTUnScannedDetails_v3(VCTNo) {
    $('#ddlAWBNo').empty();
    $('#Pieces1').val('');
    $('#Length1').val('');
    $('#Width1').val('');
    $('#Height1').val('');
    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    InputXML = '<Root><VCTNo>' + VCTNo + '</VCTNo><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId><ScanId></ScanId></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "GetVCTUnScannedDetails_v3",
            data: JSON.stringify({ 'InputXML': InputXML, }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                _xmlDocTable = xmlDoc;
                console.log(xmlDoc)
                $("body").mLoading('hide');
                $('#ddlEquTrolley1').empty();
                $('#ddlEquTrolley2').empty();
                $('#ddlEquTrolley3').empty();
                $('#ddlEquTrolley4').empty();
                $('#ddlEquTrolley5').empty();

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        //    $.alert(StrMessage);
                        //    return;
                        //}
                        $('#btnSubmit').attr('disabled', 'disabled');
                        $("#spnMsg").text(StrMessage).css({ 'color': 'red' });
                        return;
                    } else {
                        $('#btnSubmit').removeAttr('disabled');
                        $("#spnMsg").text('');
                    }

                });
                // $('#ddlEquTrolley').empty();
                $(xmlDoc).find('Table1').each(function (index) {

                    var ULDId;
                    var ULD;
                    //AL_ROWID_I = $(this).find('AL_ROWID_I').text();
                    //SDA_ROWID_I = $(this).find('SDA_ROWID_I').text();
                    //SDA_SBNo_C = $(this).find('SDA_SBNo_C').text();
                    //SDA_AWBNumber_C = $(this).find('SDA_AWBNumber_C').text();
                    //SDA_HAWBNo_C = $(this).find('SDA_HAWBNo_C').text();
                    //SDA_PackageCount_I = $(this).find('SDA_PackageCount_I').text();
                    //SDA_GrossWt_I = $(this).find('SDA_GrossWt_I').text();
                    //SDA_TimeStamp_Dt = $(this).find('SDA_TimeStamp_Dt').text();
                    //SDA_LockStatus_I = $(this).find('SDA_LockStatus_I').text();
                    //SDA_IsManaual_B = $(this).find('SDA_IsManaual_B').text();
                    //SDA_SBDate = $(this).find('SDA_SBDate').text();

                    //Type = $(this).find('Type').text();
                    //ConsignmentRowID = $(this).find('ConsignmentRowID').text();
                    //DocumentNo = $(this).find('DocumentNo').text();
                    //HAWBNo = $(this).find('HAWBNo').text();
                    //SBNo = $(this).find('SBNo').text();
                    //RemainingPkg = $(this).find('RemainingPkg').text();
                    //RemainingWt = $(this).find('RemainingWt').text();
                    //WtUOM = $(this).find('WtUOM').text();
                    //IsSecured = $(this).find('IsSecured').text();
                    //IsBaggage = $(this).find('IsBaggage').text();
                    //CommSrNo = $(this).find('CommSrNo').text();
                    //NOG = $(this).find('NOG').text();
                    //SHCAll = $(this).find('SHCAll').text();
                    //Remark = $(this).find('Remark').text();
                    //RemarkDate = $(this).find('RemarkDate').text();
                    //remarkPriority = $(this).find('remarkPriority').text();
                    //DisplayText = $(this).find('DisplayText').text();


                    Type = $(this).find('Type').text();
                    ConsignmentRowID = $(this).find('ConsignmentRowID').text();
                    DocumentNo = $(this).find('DocumentNo').text();
                    HAWBNo = $(this).find('HAWBNo').text();
                    SBNo = $(this).find('SBNo').text();
                    RemainingPkg = $(this).find('RemainingPkg').text();
                    RemainingWt = $(this).find('RemainingWt').text();
                    WtUOM = $(this).find('WtUOM').text();
                    IsSecured = $(this).find('IsSecured').text();
                    IsBaggage = $(this).find('IsBaggage').text();
                    CommSrNo = $(this).find('CommSrNo').text();
                    NOG = $(this).find('NOG').text();
                    SHCAll = $(this).find('SHCAll').text();
                    Remark = $(this).find('Remark').text();
                    RemarkDate = $(this).find('RemarkDate').text();
                    remarkPriority = $(this).find('remarkPriority').text();
                    AcceptanceLevel = $(this).find('AcceptanceLevel').text();
                    DisplayText = $(this).find('DisplayText').text();
                    CompleteAcceptance = $(this).find('CompleteAcceptance').text();
                    AutoTSP = $(this).find('AutoTSP').text();
                    IsDimensionDisable = $(this).find('IsDimensionDisable').text();
                    ShipperId = $(this).find('ShipperId').text();
                    ShipperShortCode = $(this).find('ShipperShortCode').text();
                    ShipperName = $(this).find('ShipperName').text();
                    ConsigneeId = $(this).find('ConsigneeId').text();
                    ConsigneeShortCode = $(this).find('ConsigneeShortCode').text();
                    ConsigneeName = $(this).find('ConsigneeName').text();
                    AgentCode = $(this).find('AgentCode').text();
                    AgentShortCode = $(this).find('AgentShortCode').text();
                    AgentName = $(this).find('AgentName').text();
                    FlightAirline = $(this).find('FlightAirline').text();
                    FlightNumber = $(this).find('FlightNumber').text();
                    FlightDate = $(this).find('FlightDate').text();
                    Origin = $(this).find('Origin').text();
                    Destination = $(this).find('Destination').text();
                    CommSearchCode = $(this).find('CommSearchCode').text();
                    Description = $(this).find('Description').text();
                    OffPoint = $(this).find('OffPoint').text();
                    ChargeableWt = $(this).find('ChargeableWt').text();
                    Volume = $(this).find('Volume').text();


                    $('#ddlShipper').val(ShipperId);
                    $('#ddlConsignee').val(ConsigneeId);
                    $('#txtAgentName').val(AgentCode);
                    $('#txtCommodity').val(Description);
                    $('#txtAirline').val(FlightAirline);
                    $('#txtFlightNo').val(FlightNumber);
                    $('#txtCharWt').val(ChargeableWt);
                    $('#txtVolume').val(Volume);
                    $('#ddlAgentName').val(AgentCode);
                    $('#ddlAgentName').val(CommSearchCode);

                    $('#txtOffpoint').val(OffPoint);
                    $('#txtOrigin').val(Origin);
                    $('#txtDestination').val(Destination);
                    $('#txtShipperPrifix').val(ShipperShortCode);
                    $('#txtShipper').val(ShipperName);
                    $('#txtConsignee').val(ConsigneeName);
                    $('#txtConsigneePrifix').val(ConsigneeShortCode);
                    $('#txtAgentName').val(AgentName);
                    $('#txtAgentNamePrifix').val(AgentShortCode);


                    if (ShipperShortCode != '') {
                        Shipper_SCustID = ShipperId;
                        // $('#ddlShipper').trigger("change");

                    }

                    if (ConsigneeShortCode != '') {
                        Consignee_CCustID = ConsigneeId;
                        // $('#ddlConsignee').trigger("change");

                    }

                    if (AgentShortCode != '') {
                        AgentName_IACustID = AgentCode;
                        // $('#ddlAgentName').trigger("change");
                    }

                    if (Description != '') {
                        passCommoId = CommSearchCode;
                        // $('#ddlCommodity').trigger("change");
                    }

                    if ($(xmlDoc).find('Table1').length > 1) {
                        if (index == 0 && $("#ddlAWBNo").val() != "0") {
                            var newOption = $('<option></option>');
                            newOption.val(0).text('Select');
                            newOption.appendTo('#ddlAWBNo');
                        }

                        var newOption = $('<option></option>');
                        newOption.val(ConsignmentRowID).text(DisplayText);
                        newOption.appendTo('#ddlAWBNo');
                    } else {
                        var newOption = $('<option></option>');
                        newOption.val(ConsignmentRowID).text(DisplayText);
                        newOption.appendTo('#ddlAWBNo');

                        $('#ddlAWBNo').trigger('change');
                    }

                });



                if (ConsignmentRowID != '-1') {
                    $(xmlDoc).find('Table4').each(function (index) {

                        var REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                        var TrolleyCode = $(this).find('TrolleyCode').text();
                        var REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text();


                    });
                    GetAWBDetailSearch_V3_onLoad();
                    // $("#btnSubmit").attr('disabled', 'disabled');
                }
                else {
                    // GetAWBDetailSearch_V3_onLoad();
                }
                //    $(xmlDoc).find('Table4').each(function (index) {


                //        flagforcheck2 = '1';

                //        var REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                //        var TrolleyCode = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                //        var REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text();



                //        var newOption = $('<option></option>');
                //        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                //        newOption.appendTo('#ddlEquTrolley1');

                //        var newOption = $('<option></option>');
                //        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                //        newOption.appendTo('#ddlEquTrolley2');


                //        var newOption = $('<option></option>');
                //        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                //        newOption.appendTo('#ddlEquTrolley3');

                //        var newOption = $('<option></option>');
                //        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                //        newOption.appendTo('#ddlEquTrolley4');

                //        var newOption = $('<option></option>');
                //        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                //        newOption.appendTo('#ddlEquTrolley5');

                //    });

                //    //   $("#btnSubmit").removeAttr('disabled');

                //}

                //$(xmlDoc).find('Table2').each(function (index) {

                //    flagforcheck2 = '1';

                //    var REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                //    var TrolleyCode = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                //    var REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text();



                //    var newOption = $('<option></option>');
                //    newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                //    newOption.appendTo('#ddlEquTrolley1');

                //    var newOption = $('<option></option>');
                //    newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                //    newOption.appendTo('#ddlEquTrolley2');


                //    var newOption = $('<option></option>');
                //    newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                //    newOption.appendTo('#ddlEquTrolley3');

                //    var newOption = $('<option></option>');
                //    newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                //    newOption.appendTo('#ddlEquTrolley4');

                //    var newOption = $('<option></option>');
                //    newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                //    newOption.appendTo('#ddlEquTrolley5');

                //});

                $(xmlDoc).find('Table3').each(function () {
                    //var outMsg = $(this).find('OutMsg').text(); //added on 17/06

                    var SrNO = $(this).find('SR_NO').text();
                    var Description = $(this).find('COMMODITY_TYPE').text();
                    /* $('#txtConsignee').val(Name);*/

                    var newOption = $('<option></option>');
                    newOption.val(SrNO).text(Description);
                    newOption.appendTo('#ddlCommodity');

                    commodiyCode.push({ 'value': SrNO, 'label': Description });
                    _data = JSON.stringify(commodiyCode);


                    // $('#attribute').select2();
                    //$("#ddlCommodity").select2({
                    //    data: [
                    //        { id: SrNO, text: SrNO }]
                    //});
                });

                $("#TextBoxesGroup").find("input,select").attr("disabled", "disabled");

            },
            error: function (xhr, textStatus, errorThrown) {
                $("body").mLoading('hide');
                //alert('Server not responding...');
                console.log(xhr.responseText);
                alert(xhr.responseText);
            }
        });
        return false;
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

function returnToBack() {

    window.localStorage.setItem("_vctno", VCTNo);
    window.localStorage.setItem("flag", 1);
    window.localStorage.setItem("_Door", Door);

    location.href = 'EXP_EuroPalletAcceptance.html';

}


function onchangeddlEquTrolley(valOfTrolley) {
    var arr = valOfTrolley.split('~')
    var is1 = arr[0];
    var isFixed = arr[1];
    var isLength = arr[2];
    var isWidth = arr[3];
    var isHeight = arr[4];
    var isUnit = arr[5];
    var L;
    var W;
    var H;
    if (isFixed == 1) {
        $('#TextBoxesGroup tr').each(function () {
            $(this).find("input").each(function () {
                ItemCode = $(this).val();
                var id = $(this).attr('id');
                if (id.toString().indexOf('Length') != -1) {
                    L = isLength;
                    $(this).val(L).attr('disabled', 'disabled');
                }
                if (id.toString().indexOf('Width') != -1) {
                    W = isWidth;
                    $(this).val(W).attr('disabled', 'disabled');

                }
                if (id.toString().indexOf('Heigh') != -1) {
                    if (isHeight > 0) {
                        H = isHeight;
                        $(this).val(H).attr('disabled', 'disabled');
                    } else {
                        $(this).val('').removeAttr('disabled');
                    }

                }

            });
        });
        //30,75~1~10~70~0~c
        $('#ddlUnit1').val(isUnit);
        //$('#addButton').attr('disabled', 'disabled');

    } else {
        $('#TextBoxesGroup tr').each(function () {
            $(this).find("input").each(function () {
                ItemCode = $(this).val();
                var id = $(this).attr('id');
                if (id.toString().indexOf('Length') != -1) {
                    $(this).val('').removeAttr('disabled');
                }
                if (id.toString().indexOf('Width') != -1) {
                    $(this).val('').removeAttr('disabled');
                }
                if (id.toString().indexOf('Heigh') != -1) {
                    $(this).val('').removeAttr('disabled');

                }

            });
        });
        // $('#addButton').removeAttr('disabled');
    }
}




function GetAWBDetailsForULDOnChange(_AWBNo) {

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';



    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "GetAWBSBDetail_HHT",
            data: JSON.stringify({
                'pi_strAWBNumber': _AWBNo, 'pi_strVCTNo': ''
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                $("body").mLoading('hide');
                $(xmlDoc).find('Table').each(function (index) {

                    //var AWBId;
                    //var AWB;
                    //AWBId = $(this).find('AWBNo').text();
                    //AWB = $(this).find('AWBNo').text();

                    //var newOption = $('<option></option>');
                    //newOption.val(AWBId).text(AWB);
                    //newOption.appendTo('#ddlAWBNo');

                    AL_ROWID_I = $(this).find('AL_ROWID_I').text();
                    SDA_ROWID_I = $(this).find('SDA_ROWID_I').text();
                    SDA_SBNo_C = $(this).find('SDA_SBNo_C').text();
                    SDA_AWBNumber_C = $(this).find('SDA_AWBNumber_C').text();
                    SDA_HAWBNo_C = $(this).find('SDA_HAWBNo_C').text();
                    SDA_PackageCount_I = $(this).find('SDA_PackageCount_I').text();
                    SDA_GrossWt_I = $(this).find('SDA_GrossWt_I').text();
                    SDA_TimeStamp_Dt = $(this).find('SDA_TimeStamp_Dt').text();
                    SDA_LockStatus_I = $(this).find('SDA_LockStatus_I').text();
                    SDA_IsManaual_B = $(this).find('SDA_IsManaual_B').text();
                    SDA_SBDate = $(this).find('SDA_SBDate').text();


                    $('#txtSBNo').val(SDA_SBNo_C)
                    $('#txtHAWB').val(SDA_HAWBNo_C)




                    //txtSBNo
                    //txtHAWB
                    //txtGroupId
                    //txtPieces
                    //txtGrossWt

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Data could not be loaded');
            }
        });
        return false;
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

function GetShipmentDetails(AWBid) {

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    $('#ddlShipmentNo').empty();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CargoWorksServiceURL + "GetVCTULDAWBDetail",
            data: JSON.stringify({
                'strAWBNo': AWBid, 'CompanyCode': CompanyCode, 'strAirportCity': AirportCity, 'strCycle': 'E',
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                $(xmlDoc).find('Table').each(function (index) {

                    Packages = $(this).find('NOP').text();
                    GrossWt = $(this).find('WEIGHT_KG').text();

                    $('#txtPackages').val('Packages');
                    $('#txtGrossWt').val('GrossWt');

                    var ShpmentId;
                    var ShpmentNo;
                    ShpmentId = $(this).find('SHIPMENT_NUMBER').text();
                    ShpmentNo = $(this).find('SHIPMENT_NUMBER').text();

                    var newOption = $('<option></option>');
                    newOption.val(ShpmentId).text(ShpmentNo);
                    newOption.appendTo('#ddlShipmentNo');

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Data could not be loaded');
            }
        });
        return false;
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

function onFocusChangeGrpID() {
    if ($('#txtGroupId').val().length == 14) {
        $('#txPieces').focus();
    } else {
        $('#txPieces').focus();
    }
}


function getAllSHCCodefromPopup() {
    var inputName = "";
    var values = "";
    var htmlVal = '';
    var jionOfComma = '';
    $('#dvSHCCode tr').each(function (i, el) {

        $(this).find("input").each(function () {
            inputName = $(this).attr("Value");
            values = $(this).val();
            if (i == 1) {
                htmlVal += '<SHC1>' + values.toUpperCase() + '</SHC1>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 2) {
                htmlVal += '<SHC2>' + values.toUpperCase() + '</SHC2>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 3) {
                htmlVal += '<SHC3>' + values.toUpperCase() + '</SHC3>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 4) {
                htmlVal += '<SHC4>' + values.toUpperCase() + '</SHC4>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 5) {
                htmlVal += '<SHC5>' + values.toUpperCase() + '</SHC5>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 6) {
                htmlVal += '<SHC6>' + values.toUpperCase() + '</SHC6>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 7) {
                htmlVal += '<SHC7>' + values.toUpperCase() + '</SHC7>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 8) {
                htmlVal += '<SHC8>' + values.toUpperCase() + '</SHC8>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 9) {
                htmlVal += '<SHC9>' + values.toUpperCase() + '</SHC9>';
                jionOfComma += values.toUpperCase()
            }
        });

    });

    allSHCCodeSave = htmlVal;
    joinAllValuesWithComma = jionOfComma;
    console.log("Values====", joinAllValuesWithComma)
    // ValidateSHCCodes();
}


function SaveVCTCargoDetails_v3() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    //var strAWBNo = $('#ddlAWBNo').find('option:selected').text();
    //var strPkgs = $('#txtPackages').val();
    //var strGrossWt = $('#txtGrossWt').val();
    //var strLocationCode = $('#txtLocation').val();
    //var strShipmentNo = $('#ddlShipmentNo').find('option:selected').text();
    //var strWtUnit = 'KG';

    //var receive = '1';

    //if (document.getElementById('chkReceive').checked) {
    //    receive = '1';
    //} else {
    //    receive = '0';
    //}


    //if (strAWBNo == "" || strPkgs == "" || strGrossWt == "" || strLocationCode) {

    //    errmsg = "Please enter all the required fields.</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    //if (strAWBNo.length != '11') {
    //    errmsg = "Please enter valid AWB No.";
    //    $.alert(errmsg);
    //    return;
    //}
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
    getAllValues();


    if (selectedAWBNo == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/select MAWB No.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    //if ($('#txtGroupId').val() == "") {
    //    //errmsg = "Please enter valid flight No.";
    //    //$.alert(errmsg);
    //    $("#spnMsg").text('Please enter group Id.').css({ 'color': 'red' });
    //    $('#txtGroupId').focus();
    //    return;
    //} else {
    //    $("#spnMsg").text('');
    //}

    //if (parseInt($("#txPieces").val()) <= 0) {

    //    $("#txPieces").val(remPCS);
    //    //errmsg = "Entered pieces must be greater than 0.</br>";
    //    //$.alert(errmsg);
    //    $("#spnMsg").text('Entered pieces must be greater than 0.').css({ 'color': 'red' });
    //    return;

    //} else {
    //    $("#spnMsg").text('');
    //}

    if ($('#txPieces').val() == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter pieces').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtScaleWt').val() == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter gross wt.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    //if ($('#ddlEquTrolley').val() == "0") {
    //    //errmsg = "Please enter valid flight No.";
    //    //$.alert(errmsg);
    //    $("#spnMsg").text('Please select trolley.').css({ 'color': 'red' });
    //    return;
    //} else {
    //    $("#spnMsg").text('');
    //}

    //var $input;
    //var formElements = new Array();
    //var firstTextBox = parseInt($("#Pieces1").val())
    //var CurrSumDImPcs = 0;
    //var j = 0
    //$('#TextBoxesGroup').find('input').each(function (i, input) {

    //    $input = $(input);
    //    $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
    //    formElements.push($input.val());

    //    if ($(input).attr('id') == "Pieces" + parseInt(j + 1)) {
    //        CurrSumDImPcs = CurrSumDImPcs + parseInt($input.val());
    //        j++;
    //    }

    //});



    //if ($input.val() == '') {
    //    $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
    //    $("#spnMsg").text('Please enter dimensions.').css({ 'color': 'red' });
    //    $("#Length1").focus();

    //    return;
    //}

    // inputxml = "<Root><VCTNo>" + VCTNo + "</VCTNo><VCTID>" + VCTId + "</VCTID><ISULD>False</ISULD><ConsignmentRowID>" + ConsignmentRowID + "</ConsignmentRowID><HouseRowId></HouseRowId><AWBULDNo>" + $("#ddlMAWBNo").val() + "</AWBULDNo><HAWB>" + $("#ddlHAWBNo option:selected").text() + "</HAWB><Package>" + $("#txPieces").val() + "</Package><GrossWt>" + $("#txtScaleWt").val() + "</GrossWt><WtUOM>KG</WtUOM><TrolleyCode>" + IDENTIFIER + "</TrolleyCode><TrolleyWt>" + REFERENCE + "</TrolleyWt><IsSecured>" + IsSecuredTF + "</IsSecured><GroupId>" + $("#txtGroupId").val() + "</GroupId><DimUOM>" + $("#ddlUnit").val() + "</DimUOM><DimDetails>" + inputRows + "</DimDetails><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId><NOG>" + $("#txtNOG").val() + "</NOG><CommSrNo>" + $("#ddlComCode").val() + "</CommSrNo>" + allSHCCodeSave + "</Root>"
    // var inputxml = "<Root><VCTNo>" + VCTNo + "</VCTNo><VCTID>" + VCTId + "</VCTID><ISULD>False</ISULD><ConsignmentRowID>" + ConsignmentRowIDForSave + "</ConsignmentRowID><HouseRowId></HouseRowId><AWBULDNo></AWBULDNo><HAWB></HAWB><Package>" + $("#txPieces").val() + "</Package><GrossWt>" + $("#txtScaleWt").val() + "</GrossWt><WtUOM>" + WtUOM + "</WtUOM><TrolleyCode>" + IDENTIFIER + "</TrolleyCode><TrolleyWt>" + REFERENCE + "</TrolleyWt><IsSecured>" + isSecuredFlag + "</IsSecured><GroupId>" + $("#txtGroupId").val() + "</GroupId><DimUOM>" + $("#ddlUnit1").val() + "</DimUOM><DimDetails>" + inputRows + "</DimDetails><AirportCity>" + AirportCity + "</AirportCity><Culture>" + PreferredLanguage + "</Culture><UserId>" + UserId + "</UserId><NOG></NOG><CommSrNo>" + CommSrNo + "</CommSrNo><SHC1></SHC1><SHC2></SHC2><SHC3></SHC3><SHC4></SHC4><SHC5></SHC5><SHC6></SHC6><SHC7></SHC7><SHC8></SHC8><SHC9></SHC9></Root>";
    var inputxml = "<Root><VCTNo>" + VCTNo + "</VCTNo><AWBNo>" + $("#ddlAWBNo option:selected").text() + "</AWBNo><SBNumber>" + $("#txtSBNo").val() + "</SBNumber><VCTID>" + VCTId + "</VCTID><ISULD>False</ISULD><ConsignmentRowID>" + ConsignmentRowIDForSave + "</ConsignmentRowID><HouseRowId></HouseRowId><AWBULDNo></AWBULDNo><HAWB></HAWB><Package>" + $("#txPieces").val() + "</Package><GrossWt>" + $("#txtScaleWt").val() + "</GrossWt><WtUOM>" + WtUOM + "</WtUOM><TrolleyCode>" + IDENTIFIER + "</TrolleyCode><TrolleyWt>" + REFERENCE + "</TrolleyWt><IsSecured>" + isSecuredFlag + "</IsSecured><GroupId>" + $("#txtGroupId").val() + "</GroupId><DimUOM>" + $("#ddlUnit1").val() + "</DimUOM>" + inputRows + "<AirportCity>" + AirportCity + "</AirportCity><Culture>" + PreferredLanguage + "</Culture><UserId>" + UserId + "</UserId><NOG></NOG><CommSrNo>" + CommSrNo + "</CommSrNo><SHC1></SHC1><SHC2></SHC2><SHC3></SHC3><SHC4></SHC4><SHC5></SHC5><SHC6></SHC6><SHC7></SHC7><SHC8></SHC8><SHC9></SHC9></Root>";
    console.log(inputxml);

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "SaveVCTCargoDetails_v3 ",
            data: JSON.stringify({
                'InputXML': inputxml,

            }),

            //url: CMSserviceURL + "CreateTDGAcceptance_SB_HHT ",
            //data: JSON.stringify({
            //    'pi_strGroupID': pi_strGroupID,
            //    'pi_intRemPkgs': pi_intRemPkgs,
            //    'pi_dcmlRemGrWt': pi_dcmlRemGrWt,
            //    'pi_dcmlTDGchrgWt': pi_dcmlTDGchrgWt,
            //    'pi_intEquipmentId': pi_intEquipmentId,
            //    'pi_strRemarks': '',
            //    'pi_strAWBNo': pi_strAWBNo,
            //    'pi_strSBNo': pi_strSBNo,
            //    'pi_dtTDGDate': newDate,
            //    'pi_xmlSBDimensions': pi_xmlSBDimensions,
            //    'pi_strUserName': pi_strUserName,
            //    'pi_strVCTNo': pi_strVCTNo

            //}),
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
                Result = response.d;
                var xmlDoc = $.parseXML(Result);
                //if (Result == '') {
                //    clearALL();
                //    $('#spnMsg').text('TDG acceptance done successfully').css('color', 'green');
                //    GetAWBSBDetail_HHT(VCTNo);
                //} else {

                //    $('#spnMsg').text(Result).css('color', 'red');
                //}
                var xmlDoc = $.parseXML(Result);
                $(xmlDoc).find('Table').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage ').text();
                    if (Status == 'E') {
                        // $('#spnMsg').text(StrMessage).css('color', 'red');
                        $.alert(StrMessage);
                        return;
                    }
                    if (Status == 'S') {
                        // $('#spnMsg').text(StrMessage).css('color', 'green');
                        $.alert(StrMessage);
                        _xmlDocTable = '';
                        clearALL();

                        // InputXML = '<Root><VCTNo>' + VCTNo + '</VCTNo><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId><ScanId></ScanId></Root>';
                        GetVCTUnScannedDetails_v3(VCTNo);
                        return;
                    }
                });


                //window.location.reload();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Some error occurred while saving data');
            }
        });
        return false;
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
        $("#spnMsg").text('Origin and Destination should be different.').css({ 'color': 'red' });
    } else {
        $("#spnMsg").text('');
    }
}

function SaveVCTCargoTrolleyDetailsBL_v3() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (selectedAWBNo == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txPieces').val() == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtScaleWt').val() == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtFlightNo').val() == "") {
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtOrigin').val() == "") {
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtDestination').val() == "") {
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtCommodity').val() == "") {
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtPieces').val() == "") {
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtGrWt').val() == "") {
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtCharWt').val() == "") {
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }
    //if ($('#txtShipper').val() == "") {
    //    $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
    //    return;
    //} else {
    //    $("#spnMsg").text('');
    //}

    //if ($('#txtConsignee').val() == "") {
    //    $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
    //    return;
    //} else {
    //    $("#spnMsg").text('');
    //}
    if ($('#txtAgentName').val() == "") {
        $("#spnMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }



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
    getAllValues();
    //getAllSHCCodefromPopup();

    allSHCCodeSave = "<SHC1></SHC1><SHC2></SHC2><SHC3></SHC3><SHC4></SHC4><SHC5></SHC5><SHC6></SHC6><SHC7></SHC7><SHC8></SHC8><SHC9></SHC9>";
    if (Shipper_SCustID == undefined) {
        Shipper_SCustID = '';
    }
    if (Consignee_CCustID == undefined) {
        Consignee_CCustID = '';
    }
    if (AgentName_IACustID == undefined) {
        AgentName_IACustID = '';
    }
    // var inputxml = "<Root><VCTNo>" + VCTNo + "</VCTNo><AWBNo>" + $("#ddlAWBNo option:selected").text() + "</AWBNo><SBNumber>" + $("#txtSBNo").val() + "</SBNumber><VCTID>" + VCTId + "</VCTID><ISULD>False</ISULD><ConsignmentRowID>" + ConsignmentRowIDForSave + "</ConsignmentRowID><HouseRowId></HouseRowId><AWBULDNo></AWBULDNo><HAWB></HAWB><Package>" + $("#txPieces").val() + "</Package><GrossWt>" + $("#txtScaleWt").val() + "</GrossWt><WtUOM>" + WtUOM + "</WtUOM><TrolleyCode>" + IDENTIFIER + "</TrolleyCode><TrolleyWt>" + REFERENCE + "</TrolleyWt><IsSecured>" + isSecuredFlag + "</IsSecured><GroupId>" + $("#txtGroupId").val() + "</GroupId><DimUOM>" + $("#ddlUnit1").val() + "</DimUOM><DimDetails>" + inputRows + "</DimDetails><AirportCity>" + AirportCity + "</AirportCity><Culture>" + PreferredLanguage + "</Culture><UserId>" + UserId + "</UserId><NOG></NOG><CommSrNo>" + CommSrNo + "</CommSrNo><SHC1></SHC1><SHC2></SHC2><SHC3></SHC3><SHC4></SHC4><SHC5></SHC5><SHC6></SHC6><SHC7></SHC7><SHC8></SHC8><SHC9></SHC9></Root>";
    var shipConAgtXML = '<SCustID>' + Shipper_SCustID + '</SCustID><SName>' + $("#txtShipper").val().toUpperCase() + '</SName><CCustID>' + Consignee_CCustID + '</CCustID><CName>' + $("#txtConsignee").val().toUpperCase() + '</CName><IACustID>' + AgentName_IACustID + '</IACustID><IAName>' + $("#txtAgentName").val().toUpperCase() + '</IAName><AgentID>' + AgentName_IACustID + '</AgentID>';

    var inputxml = "<Root><VCTNo>" + VCTNo + "</VCTNo><AWBNo>" + $("#ddlAWBNo option:selected").text() + "</AWBNo><SBNumber>" + $("#txtSBNo").val() + "</SBNumber><VCTID>" + VCTId + "</VCTID><ISULD>False</ISULD><ConsignmentRowID>" + ConsignmentRowIDForSave + "</ConsignmentRowID><HouseRowId></HouseRowId><AWBULDNo></AWBULDNo><HAWB></HAWB><Package>" + $("#txPieces").val() + "</Package><GrossWt>" + $("#txtScaleWt").val() + "</GrossWt><WtUOM>" + WtUOM + "</WtUOM><IsSecured>false</IsSecured><GroupId>" + $("#txtGroupId").val() + "</GroupId><DimUOM>" + $("#ddlUnit1").val() + "</DimUOM><ComSearchCode>" + passCommoId + "</ComSearchCode><FlightAirline>" + $("#txtAirline").val().toUpperCase() + "</FlightAirline><FlightNumber>" + $("#txtFlightNo").val().toUpperCase() + "</FlightNumber><FlightDate>" + $("#txtFlightDate").val() + "</FlightDate><OffPoint>" + $("#txtOffpoint").val().toUpperCase() + "</OffPoint>" + shipConAgtXML + "<Volume>" + $("#txtVolume").val() + "</Volume><ChargeableWeight>" + $("#txtCharWt").val() + "</ChargeableWeight><AirportCity>" + AirportCity + "</AirportCity><Culture>" + PreferredLanguage + "</Culture><UserId>" + UserId + "</UserId><NOG></NOG><CommSrNo>" + passCommoId + "</CommSrNo>" + allSHCCodeSave + inputRows + "</Root>";

    console.log(inputxml);

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "SaveVCTCargoTrolleyDetailsBL_v3 ",
            data: JSON.stringify({
                'InputXML': inputxml,

            }),

            //url: CMSserviceURL + "CreateTDGAcceptance_SB_HHT ",
            //data: JSON.stringify({
            //    'pi_strGroupID': pi_strGroupID,
            //    'pi_intRemPkgs': pi_intRemPkgs,
            //    'pi_dcmlRemGrWt': pi_dcmlRemGrWt,
            //    'pi_dcmlTDGchrgWt': pi_dcmlTDGchrgWt,
            //    'pi_intEquipmentId': pi_intEquipmentId,
            //    'pi_strRemarks': '',
            //    'pi_strAWBNo': pi_strAWBNo,
            //    'pi_strSBNo': pi_strSBNo,
            //    'pi_dtTDGDate': newDate,
            //    'pi_xmlSBDimensions': pi_xmlSBDimensions,
            //    'pi_strUserName': pi_strUserName,
            //    'pi_strVCTNo': pi_strVCTNo

            //}),
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
                Result = response.d;
                var xmlDoc = $.parseXML(Result);
                //if (Result == '') {
                //    clearALL();
                //    $('#spnMsg').text('TDG acceptance done successfully').css('color', 'green');
                //    GetAWBSBDetail_HHT(VCTNo);
                //} else {

                //    $('#spnMsg').text(Result).css('color', 'red');
                //}
                var xmlDoc = $.parseXML(Result);
                $(xmlDoc).find('Table').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage ').text();
                    if (Status == 'E') {
                        // $('#spnMsg').text(StrMessage).css('color', 'red');
                        $.alert(StrMessage);
                        return;
                    }
                    if (Status == 'S') {
                        // $('#spnMsg').text(StrMessage).css('color', 'green');
                        $.alert(StrMessage);
                        _xmlDocTable = '';
                        clearALL();

                        // InputXML = '<Root><VCTNo>' + VCTNo + '</VCTNo><AirportCity>' + AirportCity + '</AirportCity><Culture>' + PreferredLanguage + '</Culture><UserId>' + UserId + '</UserId><ScanId></ScanId></Root>';
                        GetVCTUnScannedDetails_v3(VCTNo);
                        return;
                    }
                });


                //window.location.reload();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function clearALL() {
    $('#txtScanAWB').val('');
    $('#txtSBNo').val('');
    $('#txtHAWB').val('');
    $('#txtGroupId').val('');
    $('#txPieces').val('');
    $('#txtScaleWt').val('');
    $('#txtCommodity').val('');
    $('#ddlEquTrolley').val(0);
    // $('#ddlAWBNo').val(0);

    //
    selectedAWBNo = '';


    //$('#TextBoxesGroup').empty();
    //$('#TextBoxesGroup').hide();
    //// $('#TextBoxDiv1m').empty();
    $("#TextBoxDivforSHCCode").empty();
    $('Pieces1').val('');
    $('Length1').val('');
    $('Width1').val('');
    $('Height1').val('');
    $('ddlUnit1').val('');


    //$('#Pieces1').hide();
    //$('#Length1').hide();
    //$('#Width1').hide();
    //$('#Height1').hide();
    //$('#ddlUnit1').hide();

    $('#txtManiPieces').val('');
    $('#txtReceivePieces').val('');
    $('#txtManiGrWt').val('');
    $('#txtReceiveGrWt').val('');
    $('#txtShortPieces').val('');
    $('#txtExcessPieces').val('');
    $('#txtDamagePieces').val('');

    //$('#ddlAWBNo').val('0');
    //  $('#ddlAWBNo').empty();
    $('#NetWt').text('');
    $('#TareWt').text('');
    $('#lblVCTNo').text('');
    // $('#spnMsg').text('');
    //dynamicTrCreate();

    $('#txtOrigin').val('');
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
    $('#spnMsg').text('');

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
    $('#btnSubmit').removeAttr('disabled');
}

function clearGrid() {
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

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function ClearFields() {
    $('.ClearFields input[type=text]').val("");
}

function MoveToLen(Pcsobj) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var PcsId = $(Pcsobj).attr('id');
        var index = PcsId.charAt(PcsId.length - 1);
        $('#Length' + index).focus();
    }
}

function MoveToWid(Pcsobj) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var PcsId = $(Pcsobj).attr('id');
        var index = PcsId.charAt(PcsId.length - 1);
        $('#Width' + index).focus();
    }
}

function MoveToHei(Pcsobj) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var PcsId = $(Pcsobj).attr('id');
        var index = PcsId.charAt(PcsId.length - 1);
        $('#Height' + index).focus();
    }
}


function removeRow(rowID) {

    //if (counter == 1) {
    //    alert("No more textbox to remove");
    //    return false;
    //}

    var lenRow = $('#TextBoxesGroup tbody tr').length;
    //alert(lenRow);
    if (lenRow == 1 || lenRow <= 1) {
        alert("Can't remove all row!");
    } else {
        $("#TextBoxDiv" + rowID).remove();
    }

    counter--;

    //$("#TextBoxDiv" + counter).remove();
}

function removeRowOnChange() {
    //if (counter == 1) {
    //    alert("No more textbox to remove");
    //    return false;
    //}

    counter--;

    $("#TextBoxDiv" + counter).remove();
}

function SaveCompleteAcceptance() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if ($('#ddlAWBNo').val() == '0') {
        $("#spnMsg").text('Please select AWB No.').css({ 'color': 'red' });
        return;

    } else {
        $("#spnMsg").text('');
    }
    // var txtGatePass = $('#txtGatePass').val();
    // var txtGroupId = $('#txtGroupId').val();
    var AWBPrefix = $("#ddlAWBNo option:selected").text().slice(0, 3);
    var AWBNo = $("#ddlAWBNo option:selected").text().slice(3, 11);
    var InputXML = '<Root><AWBPrefix>' + AWBPrefix + '</AWBPrefix><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + $('#txtHAWB').val() + '</HouseNo><SBNo>' + $('#txtSBNo').val() + '</SBNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><CompanyId>' + companyCode + '</CompanyId><AutoTSP>' + AutoTSP + '</AutoTSP><ConsignmentRowid>' + ConsignmentRowIDForSave + '</ConsignmentRowid></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "SaveCompleteAcceptance",
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
                $("#btnScanAccpt").removeAttr('disabled');
                $('#tblNewsForGatePass').hide();
                // $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {

                    var S = $(this).find('Status').text();
                    var SM = $(this).find('StrMessage').text();

                    if (S == 'E') {
                        // $.alert(StrMessage).css('color', 'red');
                        $("#spnMsg").text(SM).css({ 'color': 'red' });
                        // clearALL();
                        return true;
                    } else {
                        // $("#spnMsg").text(SM).css({ 'color': 'green' });
                        // $("#spnMsg").text('');
                        $.alert(SM).css({ 'color': 'green' });
                        _xmlDocTable = '';
                        clearALL();
                        GetVCTUnScannedDetails_v3(VCTNo);
                    }
                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });

                //  GetGroupIdBaseOnGatepass();

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





function dynamicTrCreate() {

    // if (counter > 5) {
    //     //alert("Only 10 textboxes allow");
    //     return false;
    // }
    //let i = 0;
    //while (i < 10) {
    //    if (i < 5) {
    // console.log('The Number is ' + i + '<br>');
    var newTextBoxDiv = $(document.createElement('tr'))
        .attr("id", 'TextBoxDiv' + counter);

    newTextBoxDiv.after().html('<td style="width: 30%;"><select class="clsEquTrolley form-control textpackges" id="ddlEquTrolley"></select></td><td><input  autocomplete="off" onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" onkeypress="MoveToLen(this);" type="number" /></td>' +
        '<td><input autocomplete="off"  onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Length' + parseInt(counter + 1) + '" onkeypress="MoveToWid(this);"  type="number" /></td>' +
        '<td><input autocomplete="off"  onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Width' + parseInt(counter + 1) + '" onkeypress="MoveToHei(this);"  type="number" /></td>' +
        '<td><input autocomplete="off"  onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Height' + parseInt(counter + 1) + '"  type="number" /></td>');
    //'<td></td>' +
    // '<td><button disabled onclick="removeRow(' + counter + ');" type="button" id="btnAdd" style="background-color: red;" class=""><i class="glyphicon glyphicon-minus"></i></button></td>');


    var one = parseInt($("#Pieces1").val());
    var two = parseInt($("#Pieces2").val());
    var sumOfTwoTextBox = one + two;

    // if (parseInt($("#Pieces1").val()) == RemainingPkg) {
    //     errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
    //     $.alert(errmsg);

    // } else if (sumOfTwoTextBox == RemainingPkg) {
    //     $("#textpackges1").val(nextValue);
    //     errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
    //     $.alert(errmsg);

    // } else {
    newTextBoxDiv.appendTo("#TextBoxesGroup");
    $("#textpackges1").val(nextValue);
    counter++;

    // }
    GetRemainingPackgs();
    //$("#Pieces" + counter).focus();
    //    }
    //    i++;
    //}


}

function dynamicTrCreateaddRow(piecesValue) {

    // if (counter > 5) {
    //     //alert("Only 10 textboxes allow");
    //     return false;
    // }
    var newTextBoxDiv = $(document.createElement('tr'))
        .attr("id", 'TextBoxDiv' + counter);

    newTextBoxDiv.after().html('<td style="width: 30%;"><select class="clsEquTrolley form-control textpackges" id="ddlEquTrolley"></select></td><td><input onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" onkeypress="MoveToLen(this);" type="number" /></td>' +
        '<td><input onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Length' + parseInt(counter + 1) + '" onkeypress="MoveToWid(this);"  type="number" /></td>' +
        '<td><input onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Width' + parseInt(counter + 1) + '" onkeypress="MoveToHei(this);"  type="number" /></td>' +
        '<td><input onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Height' + parseInt(counter + 1) + '"  type="number" /></td>' +
        //'<td><select id="ddlUnit' + parseInt(counter + 1) + '"><option value="cm">cm</option><option value="inch">inch</option></select></td>' +
        '<td><button onclick="removeRow(' + counter + ');" type="button" id="btnAdd" style="background-color: red;" class=""><i class="glyphicon glyphicon-minus"></i></button></td>');


    var one = parseInt($("#Pieces1").val());
    var two = parseInt($("#Pieces2").val());
    var sumOfTwoTextBox = one + two;

    // if (parseInt($("#Pieces1").val()) == RemainingPkg) {
    //     errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
    //     $.alert(errmsg);

    // } else if (sumOfTwoTextBox == RemainingPkg) {
    //     $("#textpackges1").val(nextValue);
    //     errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
    //     $.alert(errmsg);

    // } else {
    newTextBoxDiv.appendTo("#TextBoxesGroup");
    $("#textpackges1").val(nextValue);
    counter++;

    // }
    GetRemainingPackgs();
    // $("#Pieces" + counter).focus();

    $(xmlDocForTrolley).find('Table4').each(function (index) {

        flagforcheck2 = '1';

        var REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
        var TrolleyCode = $(this).find('TrolleyCode').text();
        var REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text();
        var REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
        var TrolleyFixed = $(this).find('TrolleyFixed').text();

        //if (index == 0) {
        //    var newOption = $('<option></option>');
        //    newOption.val(0).text('Select');
        //    newOption.appendTo('.clsEquTrolley');
        //}
        var newOption = $('<option></option>');
        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
        newOption.appendTo('.clsEquTrolley');

    });
}

function GetAWBDetailSearch_V3_onLoad() {


    //if ($('#txtAWBNo').val() == '') {
    //    return;
    //}


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $("#ddlAWBNo option:selected").text();
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
                //$(xmlDoc).find('Table').each(function () {
                //    Status = $(this).find('Status').text();
                //    StrMessage = $(this).find('StrMessage').text();
                //    checkingStatus = Status;
                //    if (Status == 'E') {
                //        // $.alert(StrMessage).css('color', 'red');
                //        //$(".alert_btn_ok").click(function () {
                //        //    $('#txtAWBNo').focus();
                //        //});
                //        //return true;
                //        $('#txtPieces').removeAttr('disabled', 'disabled');
                //        $('#txtGrWt').removeAttr('disabled', 'disabled');
                //        $('#txtCharWt').removeAttr('disabled', 'disabled');
                //        $('#txtVolume').removeAttr('disabled', 'disabled');
                //        //$('#txtOrigin').removeAttr('disabled', 'disabled');
                //        //$('#txtDestination').removeAttr('disabled', 'disabled');
                //    }
                //});


                //$(xmlDoc).find('Table1').each(function () {
                //    ExpAwbRowId = $(this).find('ExpAwbRowId').text();
                //    var AwbPrefix = $(this).find('AwbPrefix').text();
                //    var AwbNo = $(this).find('AwbNo').text();
                //    var ShipperId = $(this).find('ShipperId').text();
                //    var ConsigneeId = $(this).find('ConsigneeId').text();
                //    var AgentId = $(this).find('AgentId').text();
                //    var AgentShortCode = $(this).find('AgentShortCode').text();
                //    var AgentName = $(this).find('AgentName').text();
                //    var Pieces = $(this).find('Pieces').text();
                //    var Weight = $(this).find('Weight').text();
                //    var Volume = $(this).find('Volume').text();
                //    var ChargeableWt = $(this).find('ChargeableWt').text();
                //    var FlightNo = $(this).find('FlightNo').text();
                //    var FlightDate = $(this).find('FlightDate').text();
                //    var Origin = $(this).find('Origin').text();
                //    var Destination = $(this).find('Destination').text();
                //    var ShipperName = $(this).find('ShipperName').text();
                //    var ConsigneeName = $(this).find('ConsigneeName').text();
                //    var ShipperShortCode = $(this).find('ShipperShortCode').text();
                //    var ConsigneeShortCode = $(this).find('ConsigneeShortCode').text();
                //    var AgentShortCode = $(this).find('AgentShortCode').text();
                //    var Commodity = $(this).find('CommSearchCode').text();
                //    var CommodityDesc = $(this).find('Description').text();
                //    var OffPoint = $(this).find('OffPoint').text();
                //    var FlightAirline = $(this).find('FlightAirline').text();
                //    var FlightNumber = $(this).find('FlightNumber').text();


                //    ppcs = Pieces;
                //    if (Pieces != '') {
                //        $('#txtPieces').val(Pieces).css('text-align', 'right').attr('disabled', 'disabled');
                //        $('#txtGrWt').val(Weight).css('text-align', 'right').attr('disabled', 'disabled');
                //        $('#txtCharWt').val(ChargeableWt).css('text-align', 'right').attr('disabled', 'disabled');
                //        $('#txtVolume').val(Volume).css('text-align', 'right').attr('disabled', 'disabled');
                //        $('#txtCommodity').val(CommodityDesc).css('text-align', 'left').attr('disabled', 'disabled');
                //        $('#txtOffpoint').val(OffPoint).css('text-align', 'left').attr('disabled', 'disabled');

                //        $('#ddlShipper').val(ShipperId);
                //        $('#ddlConsignee').val(ConsigneeId);
                //        $('#txtAgentName').val(AgentId);
                //        $('#ddlCommodity').val(Commodity);
                //        $('#txtAirline').val(FlightAirline);
                //        $('#txtFlightNo').val(FlightNumber);


                //        $('#ddlShipper').trigger("change");
                //        $('#ddlConsignee').trigger("change");
                //        $('#ddlAgentName').trigger("change");
                //        $('#ddlCommodity').trigger("change");

                //        //$('#txtPieces').val(Pieces).css('text-align', 'right');
                //        //$('#txtGrWt').val(Weight).css('text-align', 'right');
                //        //$('#txtCharWt').val(ChargeableWt).css('text-align', 'right');
                //        //$('#txtVolume').val(Volume).css('text-align', 'right');
                //        $('#txtOrigin').val(Origin);
                //        $('#txtDestination').val(Destination);
                //        $('#txtShipperPrifix').val(ShipperShortCode);
                //        $('#txtShipper').val(ShipperName);
                //        $('#txtConsignee').val(ConsigneeName);
                //        $('#txtConsigneePrifix').val(ConsigneeShortCode);
                //        $('#txtAgentName').val(AgentName);
                //        $('#txtAgentNamePrifix').val(AgentShortCode);

                //        //  $('#txtFlightNo').val(FlightNo);
                //        //$('#txtOffpoint').val(OffPoint);

                //        var date = FlightDate;

                //        var newdate = date.split("-").reverse().join("-");

                //        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                //            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                //        ];

                //        var d = new Date(date);

                //        _Mont = monthNames[d.getMonth()]

                //        DD = FlightDate.split("-")[2];
                //        MM = FlightDate.split("-")[1];
                //        YY = FlightDate.split("-")[0];


                //        var ulddate = DD + '-' + _Mont + '-' + YY;
                //        $('#txtFlightDate').val(FlightDate);

                //    } else {
                //        $('#txtPieces').removeAttr('disabled', 'disabled');
                //        $('#txtGrWt').removeAttr('disabled', 'disabled');
                //        $('#txtCharWt').removeAttr('disabled', 'disabled');
                //        $('#txtVolume').removeAttr('disabled', 'disabled');
                //        $('#txtCommodity').val('').removeAttr('disabled');

                //    }

                //});

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


                xmlDocForTrolley = xmlDoc;
                $(xmlDoc).find('Table5').each(function (index) {
                    isFiveFoure = '1'
                });


                if (isFiveFoure == '1') {
                    $(xmlDoc).find('Table5').each(function (index) {
                        isFiveFoure = '1'
                        flagforcheck2 = '1';
                        $("#txtCharWt").attr('disabled', 'disabled');
                        var REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                        var TrolleyCode = $(this).find('TrolleyCode').text();
                        var REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text();
                        var REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                        var TrolleyFixed = $(this).find('TrolleyFixed').text();



                        if (index == 0) {
                            TrolleyCode_1 = TrolleyCode;
                            var newOption = $('<option></option>');
                            newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                            newOption.appendTo('#ddlEquTrolley1');
                            $('#ddlEquTrolley1').trigger('change');
                            $('#ddlEquTrolley1').attr('disabled', 'disabled');
                        }

                        if (index == 1) {
                            TrolleyCode_2 = TrolleyCode;
                            var newOption = $('<option></option>');
                            newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                            newOption.appendTo('#ddlEquTrolley2');
                            $('#ddlEquTrolley2').trigger('change');
                            $('#ddlEquTrolley2').attr('disabled', 'disabled');

                        }

                        if (index == 2) {
                            TrolleyCode_3 = TrolleyCode;
                            var newOption = $('<option></option>');
                            newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                            newOption.appendTo('#ddlEquTrolley3');
                            $('#ddlEquTrolley3').trigger('change');
                            $('#ddlEquTrolley3').attr('disabled', 'disabled');

                        }


                        if (index == 3) {
                            TrolleyCode_4 = TrolleyCode;
                            var newOption = $('<option></option>');
                            newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                            newOption.appendTo('#ddlEquTrolley4');
                            $('#ddlEquTrolley4').trigger('change');
                            $('#ddlEquTrolley4').attr('disabled', 'disabled');

                        }

                        if (index == 4) {
                            TrolleyCode_5 = REFERENCE_DESCRIPTION;
                            var newOption = $('<option></option>');
                            newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                            newOption.appendTo('#ddlEquTrolley5');
                            $('#ddlEquTrolley5').trigger('change');
                            $('#ddlEquTrolley5').attr('disabled', 'disabled');

                        }

                        $('#ddlEquTrolley1 option')
                            .filter(function () {
                                return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
                            })
                            .remove();

                        $('#ddlEquTrolley2 option')
                            .filter(function () {
                                return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
                            })
                            .remove();
                        $('#ddlEquTrolley3 option')
                            .filter(function () {
                                return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
                            })
                            .remove();
                        $('#ddlEquTrolley4 option')
                            .filter(function () {
                                return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
                            })
                            .remove();
                        $('#ddlEquTrolley5 option')
                            .filter(function () {
                                return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
                            })
                            .remove();

                    });
                } else {

                    $(xmlDoc).find('Table4').each(function (index) {
                        $("#txtCharWt").removeAttr('disabled');
                        flagforcheck2 = '1';

                        var REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                        var TrolleyCode = $(this).find('TrolleyCode').text();
                        var REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text();
                        var REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                        var TrolleyFixed = $(this).find('TrolleyFixed').text();


                        var newOption = $('<option></option>');
                        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                        newOption.appendTo('#ddlEquTrolley1');

                        var newOption = $('<option></option>');
                        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                        newOption.appendTo('#ddlEquTrolley2');


                        var newOption = $('<option></option>');
                        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                        newOption.appendTo('#ddlEquTrolley3');


                        var newOption = $('<option></option>');
                        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                        newOption.appendTo('#ddlEquTrolley4');

                        var newOption = $('<option></option>');
                        newOption.val(TrolleyCode).text(REFERENCE_DESCRIPTION);
                        newOption.appendTo('#ddlEquTrolley5');

                    });
                }
                if (flagforcheck2 == '0' && Status == 'E') {
                    $("#spnMsg").text(StrMessage).css({ 'color': 'red' });
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
                        $("#txtCommodity").focus();
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



var allVolumn_1;
var allCharWt_1;

var allVolumn_2;
var allCharWt_2;

var allVolumn_3;
var allCharWt_3;

var allVolumn_4;
var allCharWt_4;

var allVolumn_5;
var allCharWt_5;

function CalculateVol_1() {
    if ($("#Pieces1").val() == '') {
        return;
    }
    if ($("#Height1").val() == '') {
        return;
    }
    if ($("#txtPieces").val() == '') {
        return;
    }
    if ($("#txtGrWt").val() == '') {
        return;
    }
    var Volume;
    Volume =
        ($("#Length1").val() *
            $("#Width1").val() *
            $("#Height1").val() *
            // $("#txtAccPieces").val()) /  calculate with static 1 change by junaid 16032023
            $("#Pieces1").val()) /
        6000;

    tofixed = Volume.toFixed(2);
    var GrWtForShow = parseFloat($("#txtScaleWt").val()) * parseFloat($("#Length1").val()) / $("#txPieces").val();
    $("#txtCharWt").val(GrWtForShow.toFixed(2));
    $("#txtVolume").val(tofixed);
    allVolumn_1 = tofixed;
    allCharWt_1 = GrWtForShow.toFixed(2);
}


function CalculateVol_2() {
    if ($("#Pieces2").val() == '') {
        return;
    }
    if ($("#Height2").val() == '') {
        return;
    }
    if ($("#txtPieces").val() == '') {
        return;
    }
    if ($("#txtGrWt").val() == '') {
        return;
    }
    var Volume;
    Volume =
        ($("#Length2").val() *
            $("#Width2").val() *
            $("#Height2").val() *
            // $("#txtAccPieces").val()) /  calculate with static 1 change by junaid 16032023
            $("#Pieces2").val()) /
        6000;
    tofixed = Volume.toFixed(2);
    var GrWtForShow = $("#Length2").val() * $("#txtScaleWt").val() / $("#txPieces").val();
    allVolumn_2 = parseFloat(tofixed);
    allCharWt_2 = parseFloat(GrWtForShow.toFixed(2));
    var sv_1 = parseFloat(allVolumn_1) + parseFloat(allVolumn_2);
    var chwt_1 = parseFloat(allCharWt_1) + parseFloat(allCharWt_2);
    $("#txtCharWt").val(chwt_1.toFixed(2));
    $("#txtVolume").val(sv_1.toFixed(2));
}


function CalculateVol_3() {
    if ($("#Pieces3").val() == '') {
        return;
    }
    if ($("#Height3").val() == '') {
        return;
    }
    if ($("#txtPieces").val() == '') {
        return;
    }
    if ($("#txtGrWt").val() == '') {
        return;
    }
    var Volume;
    Volume =
        ($("#Length3").val() *
            $("#Width3").val() *
            $("#Height3").val() *
            // $("#txtAccPieces").val()) /  calculate with static 1 change by junaid 16032023
            $("#Pieces3").val()) /
        6000;
    tofixed = Volume.toFixed(2);
    var GrWtForShow = $("#Length3").val() * $("#txtScaleWt").val() / $("#txPieces").val();
    allVolumn_3 = parseFloat(tofixed);
    allCharWt_3 = parseFloat(GrWtForShow.toFixed(2));
    var sv_1 = parseFloat(allVolumn_1) + parseFloat(allVolumn_2) + parseFloat(allVolumn_3);
    var chwt_1 = parseFloat(allCharWt_1) + parseFloat(allCharWt_2) + parseFloat(allCharWt_3);
    $("#txtCharWt").val(chwt_1.toFixed(2));
    $("#txtVolume").val(sv_1.toFixed(2));
}

function CalculateVol_4() {
    if ($("#Pieces4").val() == '') {
        return;
    }
    if ($("#Height4").val() == '') {
        return;
    }
    if ($("#txtPieces").val() == '') {
        return;
    }
    if ($("#txtGrWt").val() == '') {
        return;
    }
    var Volume;
    Volume =
        ($("#Length4").val() *
            $("#Width4").val() *
            $("#Height4").val() *
            // $("#txtAccPieces").val()) /  calculate with static 1 change by junaid 16032023
            $("#Pieces4").val()) /
        6000;
    tofixed = Volume.toFixed(2);
    var GrWtForShow = $("#Length4").val() * $("#txtScaleWt").val() / $("#txPieces").val();
    allVolumn_4 = parseFloat(tofixed);
    allCharWt_4 = parseFloat(GrWtForShow.toFixed(2));
    var sv_1 = parseFloat(allVolumn_1) + parseFloat(allVolumn_2) + parseFloat(allVolumn_3) + parseFloat(allVolumn_4);
    var chwt_1 = parseFloat(allCharWt_1) + parseFloat(allCharWt_2) + parseFloat(allCharWt_3) + parseFloat(allCharWt_4);
    $("#txtCharWt").val(chwt_1.toFixed(2));
    $("#txtVolume").val(sv_1.toFixed(2));
}

function CalculateVol_5() {
    if ($("#Pieces5").val() == '') {
        return;
    }
    if ($("#Height5").val() == '') {
        return;
    }
    if ($("#txtPieces").val() == '') {
        return;
    }
    if ($("#txtGrWt").val() == '') {
        return;
    }
    var Volume;
    Volume =
        ($("#Length5").val() *
            $("#Width5").val() *
            $("#Height5").val() *
            // $("#txtAccPieces").val()) /  calculate with static 1 change by junaid 16032023
            $("#Pieces5").val()) /
        6000;
    tofixed = Volume.toFixed(2);
    var GrWtForShow = $("#Length5").val() * $("#txtScaleWt").val() / $("#txPieces").val();
    allVolumn_5 = parseFloat(tofixed);
    allCharWt_5 = parseFloat(GrWtForShow.toFixed(2));
    var sv_1 = parseFloat(allVolumn_1) + parseFloat(allVolumn_2) + parseFloat(allVolumn_3) + parseFloat(allVolumn_5);
    var chwt_1 = parseFloat(allCharWt_1) + parseFloat(allCharWt_2) + parseFloat(allCharWt_3) + parseFloat(allCharWt_5);
    $("#txtCharWt").val(chwt_1.toFixed(2));
    $("#txtVolume").val(sv_1.toFixed(2));
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


                    if (index == 3) {
                        if (ButtonId == 'btnSubmit' && IsEnable == 'Y') {
                            $("#btnSubmit").removeAttr('disabled');
                        } else {
                            $("#btnSubmit").attr('disabled', 'disabled');

                        }
                    }

                    if (index == 4) {
                        if (ButtonId == 'btnComplete' && IsEnable == 'Y') {
                            $("#btnComplete").removeAttr('disabled');
                        } else {
                            $("#btnComplete").attr('disabled', 'disabled');

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