(function () {
    document.addEventListener('deviceready', OnPageLoad, false);
}
)();
function OnPageLoad() {
    var Query = window.location.search;
    var TDG = Query.split('&')[0].split('=')[1];
    if ((TDG != "" )&& (TDG != undefined)) {
        $('#navhdrName').html("Cargo Acceptance");
    }
    else {
        $('#navhdrName').html("Cargo Acceptance");
    }
}