$(document).ready(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    $("#enquiryForm").submit(function (e) {
        e.preventDefault();
        var email = $("#email").val();
        var question = $("#question").val();
        if (email != "" && question != "") {


            var apiRequest = $.ajax({
                type: "POST",
                url: "https://solvershome.herokuapp.com/api/messages",
                // url:"http://localhost:8080/api/messages",
                contentType: "application/x-www-form-urlencoded",
                data: {
                    email: email,
                    question: question
                },
                success: function (data) {
                    $("#successAlert").show();
                    $("#errorAlert").hide();
                    $("#email").val("");
                    $("#question").val("");
                },
                error: function (error) {
                    console.log(1);
                    $("#successAlert").hide();
                    $("#errorAlert").html("<strong>Failed.</strong> Please try again later.");
                    $("#errorAlert").show();
                }
            });
        } else {
            $("#successAlert").hide();
            $("#errorAlert").show();
        }
    });
});