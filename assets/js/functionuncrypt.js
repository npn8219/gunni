$(document).ready(function () {
    var t = $(".animElement"),
        e = $(window);
    e.on("scroll resize", function () {
        var a = e.height(),
            n = e.scrollTop(),
            s = n + a;
        $.each(t, function () {
            var t = $(this),
                e = t.outerHeight(),
                a = t.offset().top;
            a + e >= n && a <= s && t.addClass("in-view")
        })
    }), e.trigger("scroll"), $(window).on("hashchange", function (t) {
        history.replaceState("", document.title, t.originalEvent.oldURL)
    }), $(".tabsAnchor").on("click", "a", function (t) {
        var e = this.hash.slice(1);
        $(this).parent().find("a").removeClass("active"), $(this).addClass("active"), $(this).parent().next(".tabsContent").find("div").removeClass("active"), $("#tab" + e).addClass("active"), t.preventDefault()
    }), $("#toTop").click(function () {
        return $("html, body").animate({
            scrollTop: 0
        }, "slow"), !1
    }), $("#menuAnchor").on("click", function (t) {
        $("body").toggleClass("menuopen"), t.preventDefault()
    }), $("#menuClose").on("click", function (t) {
        $("body").removeClass("menuopen"), t.preventDefault()
    }), $("[data-toggle='modal']").on("click", function (t) {
        t.preventDefault();
        var e = $(this).data("target");
        $(e).toggleClass("open")
    }), $(".modal").find(".close").on("click", function (t) {
        t.preventDefault(), $(this).parent().removeClass("open"), $(this).parent().parent().parent().removeClass("open")
    })
});
var CedrusClass = {
    urlLoadPlayersList: full_url + "/ajax/getlistplayers.php",
    openModal: function (t, e) {
        $("#modalCedrusAllIndex").click(), $("#modal-title-cedrus").html(t), $("#modal-body-cedrus").html(e)
    },
    gotoLink: function (t) {
        window.location = t
    },
    openConfirm: function (t, e, a) {
        $("#modalCedrusAllIndex").click(), $("#modal-title-cedrus").html(t), $("#modal-body-cedrus").html(e)
    },
    resetCaptcha: function () {
        "undefined" != typeof grecaptcha ? grecaptcha.reset() : alert("no captcha avalible!")
    },
    resetNewCaptcha: function (t) {
        document.getElementById(t).src = full_url + "/captcha.php?" + Math.random()
    },
    disableSubmit: function () {
        $('input[type="submit"]').attr("disabled", "disabled")
    },
    undisableSubmit: function () {
        $('input[type="submit"]').removeAttr("disabled")
    },
    clearAllInput: function () {
        $('input[type="text"], input[type="password"]').val("")
    },
    loadPlayersList: function (t, e) {
        $.isNumeric(t) && t > 0 && ($(e).empty(), $.post(CedrusClass.urlLoadPlayersList, "serverid=" + t, function (t) {
            if (0 == t.type)
                for (var a in t.items) $(e).append(new Option(t.items[a].NickName, t.items[a].UserID));
            else CedrusClass.openConfirm("Lỗi cập nhật", t.content, []), $(fieldload).html(oldResult)
        }, "json"))
    }
};

function loaditemvip(t) {
    $("#itemvip").html('<center><img src="/assets/img/loader.gif" /></center>'), $("#loadingitem").html(""), $.ajax({
        url: full_url + "/ajax/getitem.php",
        type: "post",
        dateType: "text",
        data: {
            cate: t
        },
        success: function (t) {
            $("#itemvip").html(t)
        }
    })
}

function loadtop2(t) {
    $("#load-ranking-container").html('<center><img src="/assets/img/loader.gif" /></center>'), $("#loadingtop").html("");
    var e = t.value;
    $.ajax({
        url: full_url + "/ajax/gettop.php",
        type: "post",
        dateType: "text",
        data: {
            sv: e
        },
        success: function (t) {
            $("#load-ranking-container").html(t)
        }
    })
}

function quenpass() {
    $("#create-account-error-quen").css("display", "block"), $("#create-account-error-quen").html('Vui lòng đợi...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>'), $.ajax({
        url: config.app.createRoute('forgot-password'), // Updated URL
        type: "post",
        dateType: "text",
        data: {
            txtUser: $("#txtUser-Forgot").val(),
            txtOtp: $("#txtOtp").val(),
            txtPassword: $("#txtPassword-Forgot").val(),
            txtRePassword: $("#txtRePassword-Forgot").val(),
            txtCode: $("#txtCode-Forgot").val()
        },
        success: function (t) {
            $("#create-account-error-quen").html(t), "Đổi mật khẩu thành công" == t && (setTimeout(function () {
                window.location = "/"
            }, 1e3), setbackgourndCaptcha("captchaImageForgot"))
        },
        error: function (t) { // Added error handling
            let statusCode = t.status;
            if (statusCode == 401) {
                $("#create-account-error-quen").css('color', 'red');
                $("#create-account-error-quen").html("<p>Thông tin không chính xác</p>");
            } else if (statusCode == 422) {
                let errorMsg = "<p style='padding-bottom: 5px'>Lỗi:</p>";
                $.each(t.responseJSON.errors, function (key, value) {
                    errorMsg += `<p> - ${value} </p>`;
                });
                $("#create-account-error-quen").css('color', 'red');
                $("#create-account-error-quen").html(errorMsg);
            }
        }
    })
}

function doipass() {
    $("#change-pass-error").css("display", "block"), $("#change-pass-error").html('Vui lòng đợi...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>'), $.ajax({
        url: config.app.createRoute('change-password'), // Updated URL
        type: "post",
        dateType: "text",
        data: {
            txtPassword: $("#txtPassword-Change").val(),
            txtNewPassword: $("#txtNewPassword-Change").val(),
            txtRePassword: $("#txtRePassword-Change").val(),
            txtCode: $("#txtCode-ChangePass").val()
        },
        success: function (t) {
            $("#change-pass-error").html(t), setbackgourndCaptcha("captchaImageChangePass"), "Thành công." == t && setTimeout($("#closeChangePassModal").click(), 2e3)
        },
        error: function (t) { // Added error handling
            let statusCode = t.status;
            if (statusCode == 401) {
                $("#change-pass-error").css('color', 'red');
                $("#change-pass-error").html("<p>Mật khẩu hiện tại không chính xác</p>");
            } else if (statusCode == 422) {
                let errorMsg = "<p style='padding-bottom: 5px'>Lỗi:</p>";
                $.each(t.responseJSON.errors, function (key, value) {
                    errorMsg += `<p> - ${value} </p>`;
                });
                $("#change-pass-error").css('color', 'red');
                $("#change-pass-error").html(errorMsg);
            }
        }
    })
}

function login() {
    $("#sign-in-error").css("display", "block"), $("#sign-in-error").html('Vui lòng đợi...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>'), $.ajax({
        url: config.app.createRoute('login'),
        type: "post",
        dateType: "text",
        data: {
            username: $("#usernamelogin").val(),
            password: $("#passwordlogin").val()
        },
        success: function (t) {
            "OK" == t ? window.location = "/" : $("#sign-in-error").html(t)
        },
        error: function (t) {
            let statusCode = t.status;
            if (statusCode == 401) {
                $("#sign-in-error").css('color', 'red');
                $("#sign-in-error").html("<p>Tài khoản hoặc mật khẩu không chính xác</p>");
                $("#passwordlogin").val("");
            } else if (statusCode == 422) {
                let errorMsg = "<p style='padding-bottom: 5px'>Lỗi:</p>";
                $.each(t.responseJSON.errors, function (key, value) {
                    errorMsg += `<p> - ${value} </p>`;
                });
                $("#sign-in-error").css('color', 'red');
                $("#sign-in-error").html(errorMsg);
                $("#passwordlogin").val("");
            }
        }
    })
}

function getToken() {
    // This is a placeholder. In a real application, you would retrieve the token
    // from localStorage, a cookie, or another secure storage mechanism.
    return localStorage.getItem('authToken'); 
}

function logout() {
    $("#sign-in-error").css("display", "block"), $("#sign-in-error").html('Vui lòng đợi...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>'), $.ajax({
        url: config.app.createRoute('logout'),
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        type: "post",
        dateType: "text",
        success: function (t) {
            $("#sign-in-error").html(t), window.location.reload()
        },
        error: function (t) { // Added error handling
            let statusCode = t.status;
            if (statusCode == 401) {
                $("#sign-in-error").css('color', 'red');
                $("#sign-in-error").html("<p>Bạn chưa đăng nhập hoặc phiên đã hết hạn.</p>");
            } else {
                $("#sign-in-error").css('color', 'red');
                $("#sign-in-error").html("<p>Đã xảy ra lỗi khi đăng xuất.</p>");
            }
        }
    })
}

function postNews() {
    $("#sign-in-error").css("display", "block"), $("#sign-in-error").html('Vui lòng đợi...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>'), "" != $("#title").val() && "" != CKEDITOR.instances.post_content.getData() ? $.ajax({
        url: config.app.createRoute('post-news'), // Updated URL
        type: "post",
        dateType: "text",
        data: {
            title: $("#title").val(),
            thumnailurl: $("#thumnailurl").val(),
            typeTxt: $("#typeTxt").val(),
            post_content: CKEDITOR.instances.post_content.getData()
        },
        success: function (t) {
            $("#sign-in-error").html(t), "0" == t ? ($("#title").val(""), $("#thumnailurl").val(""), CKEDITOR.instances.post_content.setData(""), CedrusClass.openModal("Thông báo", "<font style='color:purple;font-size:large;font-weight:bold;'>Đăng bài thành công</font>")) : CedrusClass.openModal("Thông báo", "<font style='color:black;font-size:large;font-weight:bold;'>Đăng bài thất bại</font>")
        },
        error: function (t) { // Added error handling
            let statusCode = t.status;
            if (statusCode == 422) {
                let errorMsg = "<p style='padding-bottom: 5px'>Lỗi:</p>";
                $.each(t.responseJSON.errors, function (key, value) {
                    errorMsg += `<p> - ${value} </p>`;
                });
                $("#sign-in-error").css('color', 'red');
                $("#sign-in-error").html(errorMsg);
            } else {
                $("#sign-in-error").css('color', 'red');
                $("#sign-in-error").html("<p>Đã xảy ra lỗi khi đăng bài.</p>");
            }
        }
    }) : alert("Tiêu đề hoặc nội dung không được để trống")
}

function taomoi() {
    $("#title").val(""), CKEDITOR.instances.post_content.setData("")
}

function postNapthe() {
    $("#sign-in-error").css("display", "block"), $("#sign-in-error").html('Vui lòng đợi...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>'), 0 != typeCard ? "" == $("#menhgia_the").val() || $("#menhgia_the").val() < 1e4 ? CedrusClass.openModal("Thông báo", "Mệnh giá không hợp lệ") : "" != $("#txtSerial").val() && "" != $("#txtPasscard").val() ? "" != $("#txtCode").val() ? ($("#payButton").attr("disabled", 1), $("#napthe").LoadingOverlay("show"), $.ajax({
        url: config.app.createRoute('recharge'), // Updated URL
        type: "post",
        dateType: "text",
        data: {
            txtType: typeCard,
            txtSerial: $("#txtSerial").val(),
            txtPasscard: $("#txtPasscard").val(),
            txtCode: $("#txtCode").val(),
            menhgia_the: $("#menhgia_the").val()
        },
        success: function (t) {
            $("#napthe").LoadingOverlay("hide"), $("#payButton").removeAttr("disabled"), $("#sign-in-error").html(t), CedrusClass.openModal("Thông báo", t), setbackgourndCaptcha("captchaImageRecharge"), $.each($("input[type=text]"), function () {
                $(this).val("")
            })
        },
        error: function (t) { // Added error handling
            $("#napthe").LoadingOverlay("hide"), $("#payButton").removeAttr("disabled");
            let statusCode = t.status;
            if (statusCode == 422) {
                let errorMsg = "<p style='padding-bottom: 5px'>Lỗi:</p>";
                $.each(t.responseJSON.errors, function (key, value) {
                    errorMsg += `<p> - ${value} </p>`;
                });
                $("#sign-in-error").css('color', 'red');
                $("#sign-in-error").html(errorMsg);
                CedrusClass.openModal("Thông báo", errorMsg);
            } else {
                $("#sign-in-error").css('color', 'red');
                $("#sign-in-error").html("<p>Đã xảy ra lỗi khi nạp thẻ.</p>");
                CedrusClass.openModal("Thông báo", "<p>Đã xảy ra lỗi khi nạp thẻ.</p>");
            }
        }
    })) : CedrusClass.openModal("Thông báo", "Vui lòng nhập Captcha để tiếp tục") : CedrusClass.openModal("Thông báo", "Mã thẻ hoặc Serial không hợp lệ") : CedrusClass.openModal("Thông báo", "Vui lòng chọn loại thẻ")
}

function postDoixu() {
    $("#sign-in-error").css("display", "block"), $("#sign-in-error").html('Vui lòng đợi...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>'), "" == $("#txtServer").val() || $("#txtServer").val() < 0 ? CedrusClass.openModal("Thông báo", "Server không hợp lệ") : "" != $("#txtcharacter").val() ? "" == $("#txtCoin").val() || $("#txtCoin").val() < 0 ? CedrusClass.openModal("Thông báo", "Số Coin bạn nhập không hợp lệ") : "" != $("#txtCode").val() ? $.ajax({
        url: config.app.createRoute('change-money'), // Updated URL
        type: "post",
        dateType: "text",
        data: {
            txtServer: $("#txtServer").val(),
            txtcharacter: $("#txtcharacter").val(),
            txtCoin: $("#txtCoin").val(),
            txtPassword2: $("#txtPassword2").val(),
            txtCode: $("#txtCode").val()
        },
        success: function (t) {
            $("#sign-in-error").html(t), setbackgourndCaptcha("captchaImageChange"), CedrusClass.openModal("Thông báo", t), $.each($("input[type=text]"), function () {
                $(this).val("")
            })
        },
        error: function (t) { // Added error handling
            let statusCode = t.status;
            if (statusCode == 422) {
                let errorMsg = "<p style='padding-bottom: 5px'>Lỗi:</p>";
                $.each(t.responseJSON.errors, function (key, value) {
                    errorMsg += `<p> - ${value} </p>`;
                });
                $("#sign-in-error").css('color', 'red');
                $("#sign-in-error").html(errorMsg);
                CedrusClass.openModal("Thông báo", errorMsg);
            } else {
                $("#sign-in-error").css('color', 'red');
                $("#sign-in-error").html("<p>Đã xảy ra lỗi khi đổi xu.</p>");
                CedrusClass.openModal("Thông báo", "<p>Đã xảy ra lỗi khi đổi xu.</p>");
            }
        }
    }) : CedrusClass.openModal("Thông báo", "Vui lòng nhập Captcha để tiếp tục") : CedrusClass.openModal("Thông báo", "Nhân vật không hợp lệ")
}

function randomcaptcha(t, e) {
    return t + Math.floor((e - t) * Math.random())
}

function setbackgourndCaptcha(t) {
    document.getElementById(t).style.backgroundImage = "url('" + full_url + "/captcha.php?" + randomcaptcha(1e3, 1e10) + "')"
}

function checkPassForgot() {
    $("#txtPassword-Forgot").val().length < 6 ? ($("#create-account-error-quen").css("display", "block"), $("#create-account-error-quen").html("Mật khẩu phải từ 6 kí tự trở lên")) : $("#create-account-error-quen").css("display", "none")
}

function checkRePassForgot() {
    $("#txtRePassword-Forgot").val() != $("#txtPassword-Forgot").val() ? ($("#create-account-error-quen").css("display", "block"), $("#create-account-error-quen").html("Xác nhận mật khẩu không khớp")) : $("#create-account-error-quen").css("display", "none")
}

function checkUserForgot() {
    $.ajax({
        url: config.app.createRoute('check-username'), // Updated URL
        type: "post",
        dateType: "text",
        data: {
            txtUser: $("#txtUser-Forgot").val()
        },
        success: function (t) {
            "true" == t ? ($("#create-account-error-quen").css("display", "block"), $("#create-account-error-quen").html("Tài khoản không tồn tại trên hệ thống")) : $("#create-account-error-quen").css("display", "none")
        },
        error: function (t) { // Added error handling
            $("#create-account-error-quen").css('color', 'red');
            $("#create-account-error-quen").html("<p>Đã xảy ra lỗi khi kiểm tra tài khoản.</p>");
        }
    })
}

function checkPhoneChange() {
    if (!validatePhone()) return $("#regacc_phone_tooltip").css("display", "block"), void $("#regacc_phone_tooltip").html("Số điện thoại không hợp lệ");
    $("#regacc_phone_tooltip").css("display", "none"), $.ajax({
        url: config.app.createRoute('check-phone'), // Updated URL
        type: "post",
        dateType: "text",
        data: {
            txtPhone: $("#txtPhoneChange").val()
        },
        success: function (t) {
            "false" == t ? ($("#regacc_phone_tooltip").css("display", "block"), $("#regacc_phone_tooltip").html("Số điện thoại đã tồn tại")) : $("#regacc_phone_tooltip").css("display", "none")
        },
        error: function (t) { // Added error handling
            $("#regacc_phone_tooltip").css('color', 'red');
            $("#regacc_phone_tooltip").html("<p>Đã xảy ra lỗi khi kiểm tra số điện thoại.</p>");
        }
    })
}

function validatePhone() {
    // This function is currently referencing 'txtPhone-Reg' which is part of commented out code.
    // Assuming it should validate the phone number for the 'doisdt' function,
    // it should use 'txtPhone-changephone'.
    var t = document.getElementById("txtPhone-changephone").value; 
    if ($("#txtPhone-changephone").val().length < 10) return !1;
    return !!/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(t)
}

function checkPassChange() {
    $("#txtPassword-Change").val().length < 6 ? ($("#change_passs_tooltip").css("display", "block"), $("#change_passs_tooltip").html("Mật khẩu phải từ 6 kí tự trở lên")) : $("#change_passs_tooltip").css("display", "none")
}

function checkNewPassChange() {
    $("#txtNewPassword-Change").val().length < 6 ? ($("#change_newpasss_tooltip").css("display", "block"), $("#change_newpasss_tooltip").html("Mật khẩu mới phải từ 6 kí tự trở lên")) : $("#change_newpasss_tooltip").css("display", "none")
}

function checkNewRePassChange() {
    $("#txtNewRePassword-Change").val() != $("#txtNewPassword-Change").val() ? ($("#rechange_newpasss_tooltip").css("display", "block"), $("#rechange_newpasss_tooltip").html("Xác nhận mật khẩu không khớp")) : $("#rechange_newpasss_tooltip").css("display", "none")
}

function doipass2() {
    $("#change-pass2-error").css("display", "block"), $("#change-pass2-error").html('Vui lòng đợi...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>'), $.ajax({
        url: config.app.createRoute('change-password-2'), // Updated URL
        type: "post",
        dateType: "text",
        data: {
            txtOtp: $("#txtOtp2").val(),
            txtNewPassword: $("#txtNewPassword-Change2").val(),
            txtCode: $("#txtCode-ChangePass2").val()
        },
        success: function (t) {
            $("#change-pass2-error").html(t), setbackgourndCaptcha("captchaImageDoipass2"), "Thành công." == t && setTimeout($("#closeChangePassModal").click(), 2e3)
        },
        error: function (t) { // Added error handling
            let statusCode = t.status;
            if (statusCode == 422) {
                let errorMsg = "<p style='padding-bottom: 5px'>Lỗi:</p>";
                $.each(t.responseJSON.errors, function (key, value) {
                    errorMsg += `<p> - ${value} </p>`;
                });
                $("#change-pass2-error").css('color', 'red');
                $("#change-pass2-error").html(errorMsg);
            } else {
                $("#change-pass2-error").css('color', 'red');
                $("#change-pass2-error").html("<p>Đã xảy ra lỗi khi đổi mật khẩu cấp 2.</p>");
            }
        }
    })
}

function doisdt() {
    $("#change-sdt-error").css("display", "block"), $("#change-sdt-error").html('Vui lòng đợi...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>'), $.ajax({
        url: config.app.createRoute('change-phone'), // Updated URL
        type: "post",
        dateType: "text",
        data: {
            txtOtp: $("#txtOtp-changephone").val(),
            txtPhone: $("#txtPhone-changephone").val(),
            txtCode: $("#txtCode-changephone").val()
        },
        success: function (t) {
            $("#change-sdt-error").html(t), setbackgourndCaptcha("captchaImagedoiSDT"), "Thành công." == t && setTimeout($("#closeChangePassModal").click(), 2e3)
        },
        error: function (t) { // Added error handling
            let statusCode = t.status;
            if (statusCode == 422) {
                let errorMsg = "<p style='padding-bottom: 5px'>Lỗi:</p>";
                $.each(t.responseJSON.errors, function (key, value) {
                    errorMsg += `<p> - ${value} </p>`;
                });
                $("#change-sdt-error").css('color', 'red');
                $("#change-sdt-error").html(errorMsg);
            } else {
                $("#change-sdt-error").css('color', 'red');
                $("#change-sdt-error").html("<p>Đã xảy ra lỗi khi đổi số điện thoại.</p>");
            }
        }
    })
}

function openPage(t, e) {
    var a, n, s;
    for (n = document.getElementsByClassName("tabcontent"), a = 0; a < n.length; a++) n[a].style.display = "none";
    for (s = document.getElementsByClassName("tablinks"), a = 0; a < s.length; a++) s[a].className = s[a].className.replace(" active", "");
    document.getElementById(e).style.display = "block", t.currentTarget.className += " active"
}
