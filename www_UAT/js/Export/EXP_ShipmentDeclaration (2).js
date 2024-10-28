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
    $('#txtAWBNo').focus();
    if (window.localStorage.getItem("RoleIMPBinning") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    // document.addEventListener('deviceready', AddLocation, false);
    //document.addEventListener('deviceready', AddingTestLocation, false);
    selectedRowHAWBNo = amplify.store("selectedRowHAWBNo");
    selectedShpper = amplify.store("selectedShpper");
    ConsigneeLists = amplify.store("ConsigneeLists");
    AgentNameLists = amplify.store("AgentNameLists");
    // ImportDataList();

    //var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';

    //SHCSpanHtml(stringos);

    //$("#txtShipper").select2();
    //$("#txtConsignee").select2();
    //$("#txtAgentName").select2();
    getAgentList();
    getShiperList();
    getConsigneeList();
    GetCommodityDataV3();

    //$("input").keyup(function () {
    //    var string = $(this).val();
    //    // var string = $('#txtOrigin').val();
    //    if (string.match(/[`!₹@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    //        /*$('#txtOrigin').val('');*/
    //        $(this).val('');
    //        return true;    // Contains at least one special character or space
    //    } else {
    //        return false;
    //    }

    //});

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
    // $("#txtCommodity").select2();


    dynamicTrCreate();

    //var $input;
    //var formElements = new Array();
    $("#addButton").click(function () {
        // $('.clsEquTrolley').empty();
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

    $("#TextBoxesGroup select[name='part_no[]']").change(function () {


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
            // $('#addButton').attr('disabled', 'disabled');

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
            //$('#addButton').removeAttr('disabled');
        }
    });

    //$(".clsEquTrolley").change(function () {
    //    // alert($(this).val());

    //    var arr = $(this).val().split('~')
    //    var is1 = arr[0];
    //    var isFixed = arr[1];
    //    var isLength = arr[2];
    //    var isWidth = arr[3];
    //    var isHeight = arr[4];
    //    var isUnit = arr[5];
    //    var L;
    //    var W;
    //    var H;
    //    if (isFixed == 1) {
    //        $('#TextBoxesGroup tr').each(function () {
    //            $(this).find("input").each(function () {
    //                ItemCode = $(this).val();
    //                var id = $(this).attr('id');
    //                if (id.toString().indexOf('Length') != -1) {
    //                    L = isLength;
    //                    $(this).val(L).attr('disabled', 'disabled');
    //                }
    //                if (id.toString().indexOf('Width') != -1) {
    //                    W = isWidth;
    //                    $(this).val(W).attr('disabled', 'disabled');

    //                }
    //                if (id.toString().indexOf('Heigh') != -1) {
    //                    if (isHeight > 0) {
    //                        H = isHeight;
    //                        $(this).val(H).attr('disabled', 'disabled');
    //                    } else {
    //                        $(this).val('').removeAttr('disabled');
    //                    }

    //                }

    //            });
    //        });
    //        //30,75~1~10~70~0~c
    //        $('#ddlUnit1').val(isUnit);
    //       // $('#addButton').attr('disabled', 'disabled');

    //    } else {
    //        $('#TextBoxesGroup tr').each(function () {
    //            $(this).find("input").each(function () {
    //                ItemCode = $(this).val();
    //                var id = $(this).attr('id');
    //                if (id.toString().indexOf('Length') != -1) {
    //                    $(this).val('').removeAttr('disabled');
    //                }
    //                if (id.toString().indexOf('Width') != -1) {
    //                    $(this).val('').removeAttr('disabled');
    //                }
    //                if (id.toString().indexOf('Heigh') != -1) {
    //                    $(this).val('').removeAttr('disabled');

    //                }

    //            });
    //        });
    //        //$('#addButton').removeAttr('disabled');
    //    }


    //});

    GetAWBDetailSearch_V3();


});


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

    newTextBoxDiv.after().html('<td style="width: 30%;"><select name="part_no[]" class="clsEquTrolley form-control textpackges" id="ddlEquTrolley"></select></td><td><input  autocomplete="off" onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" onkeypress="MoveToLen(this);" type="number" /></td>' +
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

    newTextBoxDiv.after().html('<td style="width: 30%;"><select name="part_no[]" class="clsEquTrolley form-control textpackges" id="ddlEquTrolley"></select></td><td><input onkeyup="NumberOnly(event);ChkMaxLength(this, "4");" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" onkeypress="MoveToLen(this);" type="number" /></td>' +
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

    $("#TextBoxesGroup select[name='part_no[]']").change(function () {
       // alert($(this).val());
        var arr = $(this).val().split('~');
        console.log(arr)
        var is1 = arr[0];
        var isFixed = arr[1];
        var isLength = arr[2];
        var isWidth = arr[3];
        var isHeight = arr[4];
        var isUnit = arr[5];
        var L = '';
        var W = '';
        var H = '';
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
            // $('#addButton').attr('disabled', 'disabled');

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
            //$('#addButton').removeAttr('disabled');
        }
    });
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
    //var trolleyID = $(this).find('select.clsEquTrolley').val();
    //alert(trolleyID)
    inputRows = "";
    $("#TextBoxesGroup tr").find(".clsEquTrolley").each(function () {
        inputRows += "<Rows>"
        selectedVal = $(this).val();
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

        inputRows += "<REFERENCE_DATA_IDENTIFIER>" + isREFERENCE_DATA_IDENTIFIER + "</REFERENCE_DATA_IDENTIFIER>"
        inputRows += "<TrolleyFixed>" + isFixed + "</TrolleyFixed>"
        inputRows += "<TrolleyWt>" + isWeight + "</TrolleyWt>"

    });

    $('#TextBoxesGroup tr').each(function () {


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

    });
    inputRows += "</Rows>";
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


    //if ($('#txtAWBNo').val() == '') {
    //    return;
    //}

    //$('.clsEquTrolley').empty();
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
                console.log(xmlDoc);
                var Status;
                var flagforcheck2 = '0';
                var StrMessage;
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
                        $('#txtOrigin').val(Origin);
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
                        $('#txtFlightDate').val(ulddate);

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


                xmlDocForTrolley = xmlDoc;
                $(xmlDoc).find('Table4').each(function (index) {

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
                    if (ExpAwbRowId != '-1') {
                        $('.clsEquTrolley').trigger('change');
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
    passCommoId = commID;
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

function GetAWBDetailSave_V3() {

    //if ($('#txtAWBNo').val() == "") {
    //    $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
    //    return;
    //} else {
    //    $("#AllMsg").text('');
    //}


    if ($('#txtFlightNo').val() == "") {
        $("#AllMsg").text('Please enter all mandatory fields marked with an asterisk (*)').css({ 'color': 'red' });
        return;
    } else {
        $("#AllMsg").text('');
    }

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
    if ($('.clsEquTrolley').val() == "-1") {
        $("#AllMsg").text('Please select Trolley.').css({ 'color': 'red' });
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

    var InputXML = '<Root><EAID>0</EAID><AWBPrefix>' + AWBPrefix + '</AWBPrefix><AWBNo>' + AWBNo + '</AWBNo><Origin>' + $("#txtOrigin").val().toUpperCase() + '</Origin><Dest>' + $("#txtDestination").val().toUpperCase() + '</Dest><OffPoint>' + $("#txtOffpoint").val().toUpperCase() + '</OffPoint><ComSearchCode>' + passCommoId + '</ComSearchCode><FlightAirline>' + $("#txtAirline").val().toUpperCase() + '</FlightAirline><FlightNumber>' + $("#txtFlightNo").val().toUpperCase() + '</FlightNumber><FlightDate1>' + $("#txtFlightDate").val() + '</FlightDate1><Pieces>' + $("#txtPieces").val() + '</Pieces><GrWt>' + $("#txtGrWt").val() + '</GrWt><ChWt>' + $("#txtCharWt").val() + '</ChWt><Volume>' + $("#txtVolume").val() + '</Volume><DimUom>' + $("#ddlUnit1").val() + '</DimUom><DimDetails>' + inputRows + '</DimDetails><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><UserID>' + UserID + '</UserID>' + shipConAgtXML + '</Root > ';


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
    ConsigneeLists = [];
    AgentNameLists = [];
    $('#txtAWBNo').focus();
    let date = new Date();
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    var today = day + '-' + month + '-' + year;

    $('#txtFlightDate').val(today);

    $("#txtFlightDate").datepicker({
        shortYearCutoff: 1,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy',

    });

    shipperCode = [];
    consigneeCode = [];
    agentCode = [];

    A_List = [];
    S_List = [];
    C_List = [];

    $('#ddlFlightNo').empty();
    // $('#ddlCommodity').empty();
    $('#txtCommodity').val('');
    passCommoId = '';
    commodiyCode = [];
    $('#txtPieces').removeAttr('disabled', 'disabled');
    $('#txtGrWt').removeAttr('disabled', 'disabled');
    $('#txtCharWt').removeAttr('disabled', 'disabled');
    $('#txtVolume').removeAttr('disabled', 'disabled');
    $('#txtCommodity').removeAttr('disabled');
    GetCommodityDataV3();

    $('#txtAirline').val('');
    $('#txtFlightNo').val('');
    $('#txtOffpoint').val('');
    $('#TextBoxesGroup').empty();
    dynamicTrCreate();
}


function clearALL() {
    $('#txtAWBNo').val('');
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
    let date = new Date();
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    var today = day + '-' + month + '-' + year;
    $('#txtFlightDate').val(today);

    $("#txtFlightDate").datepicker({
        shortYearCutoff: 1,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy',

    });
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
    $('#TextBoxesGroup').empty();
    dynamicTrCreate();

    $('#txtPieces').removeAttr('disabled', 'disabled');
    $('#txtGrWt').removeAttr('disabled', 'disabled');
    $('#txtCharWt').removeAttr('disabled', 'disabled');
    $('#txtVolume').removeAttr('disabled', 'disabled');
    $('#txtCommodity').removeAttr('disabled');
    GetCommodityDataV3();
}


function clearALLNew() {

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
    ConsigneeLists = [];
    AgentNameLists = [];

    let date = new Date();
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    var today = day + '-' + month + '-' + year;
    $('#txtFlightDate').val(today);

    $("#txtFlightDate").datepicker({
        shortYearCutoff: 1,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy',

    });
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
}

function ClearIGM() {

    $('#ddlIGM').empty();
}

function clearBeforePopulate() {
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