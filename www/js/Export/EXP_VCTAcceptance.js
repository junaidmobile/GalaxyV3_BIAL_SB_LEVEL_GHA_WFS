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

var TrolleyNo;
var TrolleyGrossWt;
var TrolleyTareWt;
var _TLRowId = '0';
var remPCS;
var allSHCCodeSave = '';
var CommSrNo;
var IsSecured;
var WtUOM;
$(function () {


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
                    $('#txtCommodityType').val($(this).find('NOG').text());
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

    dynamicTrCreate();

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

    $('#txtGroupId').focus();



    $('#txPieces').blur(function (event) {

        if ($("#txPieces").val() == '') {
            return;
        }

        if (parseInt($("#txPieces").val()) > parseInt(remPCS)) {

            $("#txPieces").val(remPCS);
            //errmsg = "Entered pieces should not be greater than remaining pieces.</br>";
            //$.alert(errmsg);
            $("#spnMsg").text("Entered pieces should not be greater than remaining pieces.").css({ 'color': 'red' });
            $("#txPieces").focus();
            return;

        } else {
            $("#spnMsg").text('');
        }

        //if (parseInt($("#txPieces").val()) <= 0) {

        //    $("#txPieces").val(remPCS);
        //    $("#spnMsg").text('Entered pieces must be greater than 0.').css({ 'color': 'red' });
        //    //$.alert(errmsg);
        //    $("#txPieces").focus();
        //    return;

        //}



        if (remPCS == '0') {

            //errmsg = "Entered Pieces are greater than remaining packages; Action canceled.</br>";
            //$.alert(errmsg);
            return;

        }

        $('#Pieces1').val($("#txPieces").val())

        GetRemainingPackgs();

        //if (IsBaggage != 'Y') {
        //    if (parseInt($("#txPieces").val()) > parseInt(RemainingPkg)) {
        //        $("body").mLoading('hide');
        //        errmsg = "Entered Package(s) " + $("#txPieces").val() + " must be less than or equal to remaining Package(s) " + RemainingPkg + "</br>";
        //        $.alert(errmsg);
        //        $(".alert_btn_ok").click(function () {
        //            $("#txPieces").focus();
        //        });
        //    }
        //    else
        //        GetRemainingPackgs();
        //}
        //else
        //    GetRemainingPackgs();
    });


    $("#ddlEquTrolley").change(function () {
        //_vlaueofTrolley = $('option:selected', this).val();
        //_vlaueofTrolleytext = $('option:selected', this).text();

        ////REFERENCE = _vlaueofTrolley.split(",")[0];
        ////IDENTIFIER = _vlaueofTrolley.split(",")[1];

        //_TLRowId = _vlaueofTrolley.split(",")[0];
        //TrolleyGrossWt = _vlaueofTrolley.split(",")[1];
        //TrolleyTareWt = _vlaueofTrolley.split(",")[2];

        //var a = parseFloat($("#txtScaleWt").val());
        //var b = parseFloat(TrolleyGrossWt);
        //var x = (b + a).toFixed(3);
        //if (x == "NaN") {
        //    x = '';
        //} else {
        //    //var netWeight = parseInt($("#txtScaleWt").val()) - parseInt(REFERENCE)
        //    $("#NetWt").text(x);
        //    $('#TareWt').text(TrolleyGrossWt);
        //}

        _vlaueofTrolley = $('option:selected', this).val();
        _vlaueofTrolleytext = $('option:selected', this).text();

        REFERENCE = _vlaueofTrolley.split(",")[0]
        IDENTIFIER = _vlaueofTrolley.split(",")[1]

        var a = parseFloat($("#txtScaleWt").val());
        var b = parseFloat(REFERENCE);
        var x = (a - b).toFixed(2);
        if (x == "NaN") {
            x = '';
        } else {
            //var netWeight = parseInt($("#txtScaleWt").val()) - parseInt(REFERENCE)
            $("#NetWt").text(x);
            $('#TareWt').text(REFERENCE);
        }

    });


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

});


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

    newTextBoxDiv.after().html('<td><input tabindex="1" autocomplete="off" onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" onkeypress="MoveToLen(this);" type="number" /></td>' +
        '<td><input autocomplete="off" tabindex="2" onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Length' + parseInt(counter + 1) + '" onkeypress="MoveToWid(this);"  type="number" /></td>' +
        '<td><input autocomplete="off" tabindex="3" onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Width' + parseInt(counter + 1) + '" onkeypress="MoveToHei(this);"  type="number" /></td>' +
        '<td><input autocomplete="off" tabindex="4" onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Height' + parseInt(counter + 1) + '"  type="number" /></td>');
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
    $("#Pieces" + counter).focus();
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

    newTextBoxDiv.after().html('<td><input onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" onkeypress="MoveToLen(this);" type="number" /></td>' +
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
    $("#Pieces" + counter).focus();
}


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

getAllValues = function () {


    inputRows = "";
    $('#TextBoxesGroup tr').each(function () {

        inputRows += "<Rows>"
        $(this).find("input").each(function () {

            ItemCode = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('Pieces') != -1) {
                inputRows += "<Pieces>" + ItemCode + "</Pieces>"
            }
            else if (id.toString().indexOf('Length') != -1) {
                inputRows += "<Length>" + ItemCode + "</Length>"
            }
            else if (id.toString().indexOf('Width') != -1) {
                inputRows += "<Width>" + ItemCode + "</Width>"
            }
            else if (id.toString().indexOf('Height') != -1) {
                inputRows += "<Height>" + ItemCode + "</Height>";
            }
        });
        inputRows += "</Rows>";
    });
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
                $("body").mLoading('hide');
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
                    DisplayText = $(this).find('DisplayText').text();

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
                $('#ddlEquTrolley').empty();
                $(xmlDoc).find('Table2').each(function (index) {
                    //Type = $(this).find('Type').text();

                    //HAWBNo = $(this).find('HAWBNo').text();
                    //RemainingPkg = $(this).find('RemainingPkg').text();
                    //RemainingWt = $(this).find('RemainingWt').text();
                    //WtUOM = $(this).find('WtUOM').text();
                    //IsSecured = $(this).find('IsSecured').text();
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text() + "," + $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    IsBaggage = $(this).find('IsBaggage').text();

                    var newOption = $('<option></option>');
                    newOption.val(REFERENCE_NUMBER_1).text(REFERENCE_DESCRIPTION);
                    newOption.appendTo('#ddlEquTrolley');

                    // $('#ddlEquTrolley').trigger('change');

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
        $('#addButton').attr('disabled', 'disabled');

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
        $('#addButton').removeAttr('disabled');
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
    var inputxml = "<Root><VCTNo>" + VCTNo + "</VCTNo><AWBNo>" + $("#ddlAWBNo option:selected").text() + "</AWBNo><SBNumber>" + $("#txtSBNo").val() + "</SBNumber><VCTID>" + VCTId + "</VCTID><ISULD>False</ISULD><ConsignmentRowID>" + ConsignmentRowIDForSave + "</ConsignmentRowID><HouseRowId></HouseRowId><AWBULDNo></AWBULDNo><HAWB></HAWB><Package>" + $("#txPieces").val() + "</Package><GrossWt>" + $("#txtScaleWt").val() + "</GrossWt><WtUOM>" + WtUOM + "</WtUOM><TrolleyCode>" + IDENTIFIER + "</TrolleyCode><TrolleyWt>" + REFERENCE + "</TrolleyWt><IsSecured>" + isSecuredFlag + "</IsSecured><GroupId>" + $("#txtGroupId").val() + "</GroupId><DimUOM>" + $("#ddlUnit1").val() + "</DimUOM><DimDetails>" + inputRows + "</DimDetails><AirportCity>" + AirportCity + "</AirportCity><Culture>" + PreferredLanguage + "</Culture><UserId>" + UserId + "</UserId><NOG></NOG><CommSrNo>" + CommSrNo + "</CommSrNo><SHC1></SHC1><SHC2></SHC2><SHC3></SHC3><SHC4></SHC4><SHC5></SHC5><SHC6></SHC6><SHC7></SHC7><SHC8></SHC8><SHC9></SHC9></Root>";
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



function clearALL() {
    $('#txtScanAWB').val('');
    $('#txtSBNo').val('');
    $('#txtHAWB').val('');
    $('#txtGroupId').val('');
    $('#txPieces').val('');
    $('#txtScaleWt').val('');
    $('#txtCommodityType').val('');
    $('#ddlEquTrolley').val(0);
    $('#ddlAWBNo').val(0);

    //
    selectedAWBNo = '';


    $('#TextBoxesGroup').empty();
    $('#TextBoxesGroup').hide();
    // $('#TextBoxDiv1m').empty();
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

    $('#ddlAWBNo').val('0');
    //  $('#ddlAWBNo').empty();
    $('#NetWt').text('');
    $('#TareWt').text('');
    $('#lblVCTNo').text('');
    // $('#spnMsg').text('');
    dynamicTrCreate();
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


