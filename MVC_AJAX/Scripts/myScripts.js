function youWon() {
    var message = "You Won!";
    return message;
}
function showWinningAlert() {
    alert(youWon());
}

function randomizeHeadings() {
    $("h1").each(setRandomStyle);
}

function setRandomStyle() {
    $(this).addClass(randomStyle);
}

function randomStyle() {
    var styles = ["text-info", "text-success", "text-danger"];
    return (randomElement(styles));
}

function randomElement(array) {
    var index = Math.floor(Math.random() * array.length);
    return (array[index]);
}

function revertHeadings() {
    $("h1").removeClass("text-info")
        .removeClass("text-success")
        .removeClass("text-danger");
}
function showH2() {
    $("h2").css("visibility", "visible");;
}

function AjaxFunc1() {
    $.ajax({ url: "api/service", success: ajaxhandler1, error: ajaxErrHandler1 });
}

function AjaxFunc2() {
    $.ajax({ url: "api/service/5", success: ajaxhandler2, error: ajaxErrHandler2 });
}

function AjaxFunc3() {
    $("#button8").prop("disabled", true);
    $("#Ajax3").html("Loading...");
    $("#Ajax3").css("visibility", "visible");;

    var data = { "name": "Adam", "occupation": "Sawing Wood" };
    var jsonString = JSON.stringify(data);
    $.ajax({
        url: "api/service",
        method: "POST",
        contentType: "application/json",
        data: jsonString,
        success: ajaxhandler3,
        error: ajaxErrHandler1
    });
}

function AjaxFunc4() {
    $("#button9").prop("disabled", true);
    $("#Ajax4").html('<img src="../../Images/ajax-loader.gif"/>');
    $("#Ajax4").css("text-align", "center");
    $("#Ajax4").css("visibility", "visible");

    var data = { "name": "Adam", "occupation": "Sawing Wood" };
    var jsonString = JSON.stringify(data);
    $.ajax({
        url: "api/service/",
        method: "POST",
        contentType: "application/json",
        data: jsonString,
        success: ajaxhandler4,
        error: ajaxErrHandler3
    });
}

function AjaxFunc5() {
    $("#button10").prop("disabled", true);
    $("#Ajax5").html("Loading...");
    $("#Ajax5").css("visibility", "visible");;

    var data = { "name": "Adam", "occupation": "Sawing Wood" };
    var jsonString = JSON.stringify(data);
    $.ajax({
        url: "api/start/task/",
        method: "POST",
        contentType: "application/json",
        data: jsonString,
        success: ajaxhandler5,
        error: ajaxErrHandler4
    });
}

function checkProcess() {
    $.ajax({
        url: "api/check/task/?id=" + encodeURI(processId),
        success: function(data) {
            if (data.toString() == "Done") {
                endProcess();
            } else {
                window.setTimeout(checkProcess, 1000);
            }
        },
        error: ajaxErrHandler3
    });
}

function endProcess() {
    $.ajax({
        url: "api/result/task/?id=" + encodeURI(processId),
        success: ajaxhandler6,
        error: ajaxErrHandler3
    });
}

function ajaxhandler1(text) { 
    $("#Ajax1").html("Text Recieved: " + text);
    $("#Ajax1").css("visibility", "visible");;

}

function ajaxhandler2(text) {
    //this should not ever happen
    $("#Ajax2").html(text + "I am not an Error");
    $("#Ajax2").css("visibility", "visible");;
}

function ajaxhandler3(text) {
    $("#Ajax3").html("I am returned Json: " + text);
    $("#Ajax3").css("visibility", "visible");
    $("#button8").prop("disabled", false);
}

function ajaxhandler4(text) {
    $("#Ajax4").html("I am returned Json: " + text);
    $("#Ajax4").css("text-align", "left");
    $("#Ajax4").css("visibility", "visible");
    $("#button9").prop("disabled", false);
}

var processId;

function ajaxhandler5(data) {
    processId = data;
    window.setTimeout(checkProcess, 1000);
}

function ajaxhandler6(text) {
    $("#Ajax5").html("I am returned Json: " + text);
    $("#Ajax5").css("visibility", "visible");
    $("#button10").prop("disabled", false);
}

function ajaxErrHandler1() {
    alert("Ajax Error");
    $("#button8").prop("disabled", false);
}
function ajaxErrHandler2(jqXHR, text, error) {
    $("#Ajax2").html("Ajax Error. Status:  " + error);
    $("#Ajax2").css("visibility", "visible");
}

function ajaxErrHandler3(jqXHR, text, error) {
    $("#Ajax4").html("Ajax Error. Status:  " + error);
    $("#Ajax4").css("visibility", "visible");
    $("#button9").prop("disabled", false);
}

function ajaxErrHandler4(jqXHR, text, error) {
    $("#Ajax5").html("Ajax Error. Status:  " + error);
    $("#Ajax5").css("visibility", "visible");
    $("#button10").prop("disabled", false);
}

//sets handlers when the page is in state of readiness
$(function () {
    $("#button1").click(randomizeHeadings);
    $("#button2").click(revertHeadings);
    $("#button3").click(showWinningAlert);
    $("#button4").click(function () { $("h2").css("visibility", "hidden"); });
    $("#button5").click(showH2);

    $("#Ajax1").css("visibility", "hidden");
    $("#button6").click(AjaxFunc1);

    $("#Ajax2").css("visibility", "hidden");
    $("#button7").click(AjaxFunc2);

    $("#Ajax3").css("visibility", "hidden");
    $("#button8").click(AjaxFunc3);

    $("#Ajax4").css("visibility", "hidden");
    $("#button9").click(AjaxFunc4);

    $("#Ajax5").css("visibility", "hidden");
    $("#button10").click(AjaxFunc5);
});