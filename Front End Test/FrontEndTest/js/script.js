var App = App || {};

App.BaseFunctions = {
    //TODODYLAN: Investigate where this is used
    InitPage: function (isLoggedIn) {
        App.BaseFunctions.SetupLoading();
        //App.BaseFunctions.InitWidgets();
        //App.BaseFunctions.BindGeneralNotifications(); <-- Causing errors (Q)
        App.BaseFunctions.SetupSelect();
        App.BaseFunctions.SetupPopoverHide();
        //TODODYLAN: I commented this out, not sure if we need this, Investigate
        //$("#container").bind('cssClassChanged', function () {
        //    setTimeout(function () {
        //        if ($("#mainnav-container").width() <= 100) {
        //            $("#brand-title-small").show();
        //            $("#brand-title-full").hide();
        //        }
        //        else {
        //            $("#brand-title-small").hide();
        //            $("#brand-title-full").show();
        //        }
        //        App.BaseFunctions.ResizeSplitter();
        //    }, 500);
        //});
        App.BaseFunctions.CheckSessionExpiry(isLoggedIn);
        window.onBeforeUnload = App.BaseFunctions.ShowLoading;
    },
    //TODODYLAN: Investigate where this is used
    CheckSessionExpiry: function (isLoggedIn) {
        if (isLoggedIn.toLowerCase() == "true") {
            $.get("/account/CheckUserSessionActive", function (response) {
                if (response.result) {
                    setTimeout(() => { App.BaseFunctions.CheckSessionExpiry(isLoggedIn); }, 60000);
                }
            }).fail(function () {
                var url = "/account/login?ReturnUrl=" + document.location.href;
                document.location.href = url;
            });
        }
    },
    //TODODYLAN: This css and html should still be added, I will add it to components
    ScrollTop: function () {
        $('.scroll-top').trigger("click");
    },
    //TODODYLAN: Dries needed this, but its not running anything? 
    SetupFormDirtyCheck: function () {
        //$('form').areYouSure(); 
    },
    //TODODYLAN: Investigate where this is used
    SetupPopoverHide: function () {
        $('body').on('click', function (e) {
            App.BaseFunctions.HidePopovers(e);
        });
    },
    //TODODYLAN: Investigate where this is used
    HidePopovers: function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    },
    //TODODYLAN: Investigate where this is used, I would recommend we DONT use a library for a select
    SetupSelect: function () {
        $(".addChosen").not(".no-chosen").chosen({ disable_search_threshold: 10, search_contains: true });
    },
    //TODODYLAN: Investigate where this is used
    ResizeSplitter: function () {
        $("#splitContainer").trigger("resize");
    },
    //TODODYLAN: this is a duplicate of what is used now, what is correct?
    //SetMenuFocus: function (navTitle, menuTab, menuSubTab) {
    //    if (menuTab != null && menuTab != "") {
    //        $("#" + menuTab).addClass("active-sub");
    //        $("#" + menuTab).find("ul").first().addClass("in");
    //    }
    //    if (menuSubTab != null && menuSubTab != "") {
    //        $("#" + menuSubTab).addClass("active-link");
    //    }
    //},
    SetMenuFocus: function (menuItem, menuSubItem) {
        if (menuItem != null && menuItem != "") {
            $("#" + menuItem).addClass("active");
            $("#" + menuItem).find("ul").first().addClass("in");
        }
        if (menuSubItem != null && menuSubItem != "") {
            $("#" + menuSubItem).addClass("active-link");
        }
    },
    //TODODYLAN: Investigate where this is used
    UnbindLoading: function () {
        $(document).off('ajaxSend');
        $(document).off('ajaxStop');
        $(document).off('ajaxError');
    },
    //TODODYLAN: Investigate where this is used
    SetupLoading: function () {
        $(document).ajaxSend(function (e, xhr, opt) {
            App.BaseFunctions.ShowLoading();
        });
        $(document).ajaxStop(function (e, xhr, opt) {
            App.BaseFunctions.HideLoading();
        });
        $(document).ajaxError(function (e, xhr, opt) {
            App.BaseFunctions.HideLoading();
        });
    },
    //TODODYLAN: I dont realy want to use spinners at all, we should try remove where these are called and talk to Rivon
    //ShowLoading: function () {
    //    $(".SpinnerContainer").show();
    //},
    //HideLoading: function () {
    //    $(".SpinnerContainer").hide();
    //},
    //TODODYLAN: should this be integrated?
    //InitWidgets: function () {
    //    if (App.Widgets != undefined) {
    //        for (var Widget in App.Widgets) {
    //            App.Widgets[Widget].InitWidget()
    //        }
    //    }
    //},
    //TODODYLAN: should this be integrated with current notifications?
    //ShowNotification: function (title, message, notificationType, url, delay) {
    //    $.notify(
    //        {
    //            title: "<strong>" + title + "</strong> ",
    //            message: message,
    //            url: url
    //        },
    //        {
    //            allow_dismiss: true,
    //            newest_on_top: true,
    //            type: notificationType,
    //            delay: (url == null || url == undefined) ? ((delay != null && delay != undefined) ? delay : 5000) : 120000,
    //            placement: {
    //                from: 'top',
    //                align: 'right'
    //            },
    //            offset: {
    //                y: 80,
    //                x: 20
    //            }
    //        });
    //},
    //TODODYLAN: should this be integrated with current notifications?
    //BindGeneralNotifications: function () {
    //    var connection = new signalR.HubConnectionBuilder().withUrl("/generalNotificationHub").build();

    //    connection.on("ReceiveGeneralNotification", function (title, message, type, url) {
    //        var strType = "";

    //        switch (type) {
    //            case "TYPE_SUCCESS": strType = "success"; break;
    //            case "TYPE_WARNING": strType = "warning"; break;
    //            case "TYPE_DANGER": strType = "danger"; break;
    //            case "TYPE_INFO": strType = "info"; break;
    //        }

    //        App.BaseFunctions.ShowNotification(title, message, strType, url);
    //    });

    //    connection.start().catch(function (err) {
    //        return console.error(err.toString());
    //    });
    //    connection.onclose(function (e) {
    //        connection.start().catch(function (err) {
    //            return console.error(err.toString());
    //        });
    //    });
    //},
}
$(document).ready(function () {
    var _outline = "_outline";
    var _filled = "_filled";
    //open side menu 
    $("#openMenu").on("click", function (e) {
        $(".nav-maximised, .nav-title-text, .nav-title-text:before").css({
            "display": 'initial',
        });
        $(".nav-minimised, .nav-open, .subnav-title").css({
            "display": 'none',
        });
        $(".nav-logo, .toggle-subNav").css({
            "border-bottom": "1px solid #c4e3ff",
        });
        $(".sidebar .nav, .sidebar .sidebar-nav").css({
            "width": '272px',
        });
        $(".app-body .main").css({
            "margin-left": "272px",
        });
        $(".app-body .sidebar").css({
            "-ms-flex": "0 0 272px",
            "flex": "0 0 272px",
        });
        $(".toggle-sub-nav").removeClass("minimised");
        $(".toggle-subNav").removeClass("minimised-subNav");
    });

    //close side menu
    $("#close").on("click", function () {
        if ($(window).width() < 992) {
            $("#close").attr("id", "mobileClose");
        }
        else {
            $("#mobileClose").attr("id", "close");
        }
        if ($(this).attr("id") == "mobileClose") {
            $(".sidebar").css({
                "margin-left": '-272px',
            });
        } else {
            $(".nav-maximised, .nav-title-text, .nav-title-text:before").css({
                "display": 'none',
            });
            $(".nav-minimised, .nav-open").css({
                "display": 'initial',
            });
            $(".subnav-title").css({
                "display": 'block',
            });
            $(".nav-logo, .toggle-subNav").css({
                "border-bottom": "none",
            });
            $(".sidebar .nav, .sidebar .sidebar-nav").css({
                "width": '64px',
            });
            $(".app-body .main").css({
                "margin-left": "64px",
            });
            $(".app-body .sidebar").css({
                "-ms-flex": "0 0 64px",
                "flex": "0 0 64px",
            });
            $(".toggle-sub-nav").addClass("minimised");
            $(".toggle-subNav").addClass("minimised-subNav");

            $(".toggle-sub-nav").removeClass("active");;
        }
    });


    $("#openMobileMenu").on("click", function () {
        $(".sidebar").css({
            "margin-left": '0px',
        });
        $("#close").attr("id", "mobileClose");
        $(".sidebar-nav").css({
            "margin-left": '0px',
        });
    });


    $(".toggle-subNav").on("click", function (e) {
        $(".toggle-subNav").each(function () {
            var image = $(this).find("img").attr("src");
            var n = image.indexOf('_');
            image = image.substring(0, n != -1 ? n : image.length);
            $(this).find("img").attr("src", image + _outline + ".svg");
        });
        console.log($(this));
        var toggleNav = $(this).next(".toggle-sub-nav");
        var toggleImg = $(this).find("img").attr("src").length != 0 ? $(this).find("img") : false;
        if ($(this).hasClass("rotated")) {
            toggleNav.removeClass("active");
            $(".toggle-subNav").removeClass("rotated");
        } else {
            $(".toggle-sub-nav").removeClass("active");
            $(".toggle-subNav").removeClass("rotated");
            var image = toggleImg.attr("src");
            var n = image.indexOf('_');
            image = image.substring(0, n != -1 ? n : image.length);
            toggleImg != false ? toggleImg.attr("src", image + _filled + ".svg") : "";
            toggleNav.toggleClass("active");
            $(".toggle-sub-nav").not(toggleNav).removeClass("active");
            $(this).addClass("rotated");
        }
    })

    $(document).on('mouseenter', '.minimised-subNav', function () {
        var fromTop = $(this).offset().top;
        $(".toggle-sub-nav").removeClass("active");
        $(".toggle-subNav").removeClass("rotated");
        $(".toggle-subNav").each(function () {
            var image = $(this).find("img").attr("src");
            var n = image.indexOf('_');
            image = image.substring(0, n != -1 ? n : image.length);
            $(this).find("img").attr("src", image + _outline + ".svg");
        });
        var toggleNav = $(this).next(".toggle-sub-nav.minimised");
        var toggleImg = $(this).find("img").attr("src").length != 0 ? $(this).find("img") : false;
        if (toggleNav.hasClass("active")) {
            toggleNav.removeClass("active");
            $(".toggle-subNav").removeClass("rotated");
        } else {
            toggleNav.css({
                "top": fromTop,
            });
            var image = toggleImg.attr("src");
            var n = image.indexOf('_');
            image = image.substring(0, n != -1 ? n : image.length);
            toggleImg != false ? toggleImg.attr("src", image + _filled + ".svg") : "";
            toggleNav.toggleClass("active");
            $(".toggle-sub-nav").not(toggleNav).removeClass("active");
            $(this).addClass("rotated");
        }
    }).on('mouseleave', '.minimised-subNav', function () {
        if (($(".subnav:hover").length != 0)) {
            $(document).on('mouseleave', '.subnav', function () {
                $(".toggle-sub-nav.minimised").removeClass("active");
            })
        }
        else {
            $(this).next(".toggle-sub-nav.minimised").removeClass("active");
        }
    });



    //Dropdown Has Link | stop a normal dropdown from navigating, but if the dropdown has a link too, then navigate
    $('.nav-dropdown-toggle').on('click', function (e) {
        var isLink = e.currentTarget.hasAttribute("href");
        if (isLink) {
            window.location = $(this)[0].href;
        }
    })

    //Breadcrumbs
    var str = location.href;
    if (~str.indexOf("?")) {
        var currentLocation = str.substring(0, str.indexOf('?')).split('/').slice(3);
    }
    else {
        var currentLocation = str.split('/').slice(3);
    }

    var parts = [{ "text": 'Dashboard', "link": '/' }];
    for (var i = 0; i < currentLocation.length; i++) {
        var text = currentLocation[i];
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.exec(text) != null) {
            var splitUppercases = text
                .replace(/(_|-)/g, ' ')
                .trim()
                .replace(/\w\S*/g, function (text) {
                    return text.charAt(0).toUpperCase() + text.substr(1)
                })
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') 
            var link = '/' + currentLocation.slice(0, i + 1).join('/');
            if (link != "/") {
                if (splitUppercases.length != 36) {
                    parts.push({ "text": splitUppercases, "link": link });
                }
            }
        }
    }

    var list = $(".load-breadcrumbs");
    for (var i = 0; i < parts.length; i++) {
        if (parts.length !== 1) {
            if (i + 1 == parts.length) {
                list.append(`
                    <a class="action">` + parts[i].text + `</a>
                `);
            } else {
                list.append(`
                    <a class="action" href="` + parts[i].link + `">` + parts[i].text + `</a>
                    <span class="divider"> / </span>
                `);
            }
        }
    }

    //Secondary Nav
    $("#secondary-navigation-menu-list > li").click(function (evt) {
        var list = $('#secondary-navigation-menu-list').children();
        if (!$(this).hasClass('secondary-dropdown')) {
            for (var i = 0; i < list.length; i++) {
                list.removeClass("active");
                $("[id*='block-']").css({
                    "display": "none",
                });
            }
            $(this).addClass("active");
            var itemIndex
            list.each(function (index) {
                if (!$(this).hasClass('secondary-dropdown')) {
                    if ($(this).hasClass("active")) {
                        itemIndex = index + 1;
                    }
                }
            })
            if (!$(this).hasClass('secondary-dropdown')) {
                $("#block-" + itemIndex).css({
                    "display": "initial",
                });
            }
        } else {
            list.removeClass("active");
            $(this).addClass("active");
        }
    });

});

var currentNotifications = [];
function pushToNotifications(data) {
    var timeId = ((Date.now() - Math.floor(Date.now() / 1000 / 60 / 60 / 24) * 24 * 60 * 60 * 1000) / 1000).toString().replace(".", "");
    var newData = { title: data.title, text: data.text, type: data.type, id: timeId}
    currentNotifications.push(newData);
    $("#allNotifications").append(`
            <div class="popup-notification" id="` + newData.id +`">
            <img src="/flite-core-theme/img/svg/` + newData.type + `_fill.svg" class="notificationType" />
            <div>
                <div>` + newData.title + `</div>
                <div>` + newData.text + `</div>
            </div>
            <img src="/flite-core-theme/img/svg/close.svg" class="notificationAction" onclick="toggleNotification(` + newData.id +`)" />
        </div>
    `);
    $("#" + newData.id).css({ "display": "inline-flex" });
    
    if (currentNotifications.length > 0) {
        for (var i = 0; i < currentNotifications.length; i++) {
            removeNotification(currentNotifications[i].id,i);
        }
    }
}
function removeNotification(id,index) {
    setTimeout(function () {
        $("#" + id).css({ "display": "none" });
        currentNotifications.splice(index);
    }, 5000);
}

function toggleNotification(id) {
    $("#" + id).css({"display":"none"});
}


$(document).ready(function () {
    $(".icon-edit-outline").on("click", function () {
        $("td").css({
            "padding": "0px 0px 0px 0px; !important"
        })
    })
})
