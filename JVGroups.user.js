// ==UserScript==
// @name        JVGroups
// @author      Snizzle
// @version     1.1
// @downloadURL https://github.com/Snizzle-jvc/JVGroups/raw/master/JVGroups.user.js
// @updateURL   https://github.com/Snizzle-jvc/JVGroups/raw/master/JVGroups.user.js
// @supportURL  http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=Snizzle;Snitchzzle
// @copyright   2018, Snizzle
// @licence     MIT
// @description Classer les forumeurs par catégorie
// @grant       GM_addStyle
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match       *://www.jeuxvideo.com/*
// @run-at      document-end
// ==/UserScript==

$(function(a) {
  function g() {
    a("#gmPopupContainer").remove();
    a("#gmPopupContainer2").remove();
    a(".overlay").remove();
  }
  function l() {
    for (var c = JSON.parse(localStorage.getItem("jvgroup")) || [], d = "<option disabled selected>Choisir ou cr\u00e9er un groupe</option>", b = 0; b < c.length; b++) {
      d += "<option value='" + c[b].group + "'>" + c[b].group + "</option>";
    }
    a("#saved_groups").html(d);
  }
  function h(c) {
    var d = JSON.parse(localStorage.getItem("jvgroup")) || [], b = d.findIndex(function(a, b) {
      return a.pseudo.includes(c);
    }), m = d[b].pseudo.indexOf(c);
    d[b].pseudo.splice(m, 1);
    localStorage.setItem("jvgroup", JSON.stringify(d));
    a("#logs").text(c + " supprim\u00e9 de son groupe").css("color", "green");
  }
  function k() {
    a(".jvgroup").each(function() {
      var c = JSON.parse(localStorage.getItem("jvgroup")), d = a(this).prev().html().trim().toLowerCase(), b = c.findIndex(function(a, b) {
        return a.pseudo.includes(d);
      });
      -1 !== b && a(this).text(c[b].group);
    });
  }
  null === localStorage.getItem("jvgroup") && localStorage.setItem("jvgroup", "[]");
  a(".col-right").prepend('<div class="panel panel-jv-forum panel-jvg"><div class="panel-heading panel-heading-jvg">Groupes</div><div class="panel-body panel-body-jvg" style="text-align:center;"><div class="scrollable-content bloc-info-forum scroll-jvg" style="text-align:start;"></div></div></div>');
  var e = JSON.parse(localStorage.getItem("jvgroup")) || [];
  "" != e && "" != e[0].pseudo || a(".scroll-jvg").html("Aucun groupe");
  (function() {
    for (var a = 0; a < e.length; a++) {
      "" == e[a].pseudo && (e.splice([a], 1), localStorage.setItem("jvgroup", JSON.stringify(e)));
    }
  })();
  a(".infos-pseudo h1").after('<span class="jvgroup" title="Ajouter ce pseudo \u00e0 un groupe" style="color:black;height: 14px;background: #dddddd;font-size: 10px;line-height: 0.2;margin: 14px 0px 0px 20px;text-transform: uppercase;display:inline-block;font-weight: 700;text-align: center;vertical-align: middle;cursor: pointer;background-image: none;border: 0.0625rem solid transparent;white-space: nowrap;padding: 0.375rem 0.75rem;"></span>');
  a(".bloc-pseudo-msg").after('<span class="jvgroup" title="Ajouter ce pseudo \u00e0 un groupe" style="color:black;height: 14px;background: #dddddd;font-size: 10px;line-height: 0.2;margin: 14px 0px 0px 20px;text-transform: uppercase;display:inline-block;font-weight: 700;text-align: center;vertical-align: middle;cursor: pointer;background-image: none;border: 0.0625rem solid transparent;white-space: nowrap;padding: 0.375rem 0.75rem;"></span>');
  for (var f = 0; f < e.length; f++) {
    a(".scroll-jvg").append('<a class="xXx lien-jv groupname" id="' + e[f].group + '" style="margin: 0px 5px 5px 0;cursor:pointer">' + e[f].group + " (" + e[f].pseudo.length + ") </a>");
  }
  a(".groupname").click(function() {
    var c = JSON.parse(localStorage.getItem("jvgroup")) || [], d = a(this).attr("id"), b = c.findIndex(function(a, b) {
      return a.group === d;
    });
    a("body").append('<div class="overlay"></div><div id="gmPopupContainer2"><form><h4>Membres de ' + d + '</h4><h5>Cliquez sur un pseudo pour le supprimer du groupe</h5><p id="logs"></p><a class="xXx lien-jv members" style="margin: 0px 5px 5px 0;cursor:pointer;color: black;">' + c[b].pseudo.join("<a class='xXx lien-jv members'style='margin: 0px 5px 5px 0;cursor:pointer;color: black;'>") + '</a><h5><button id="closegmPopupContainer" type="button">Fermer & refresh</button></h5></form></div>');
    a(".overlay").click(function() {
      g();
    });
    a("#closegmPopupContainer").click(function() {
      location.reload();
    });
    a(".members").click(function(b) {
      b.preventDefault();
      b = a(this).html();
      h(b);
      a(this).remove();
    });
    GM_addStyle(".members:hover{color:red!important;}.overlay {background: black;height: 100%;width: 100%;position: fixed;top: 0;left: 0;opacity: 0.7;z-index: 5;} #gmPopupContainer2 {overflow-wrap: break-word;max-width: 25%;min-width: 25%;position:fixed;top:40%;left:40%;padding:2em;background:#d2d2d2fa;border:1px solid #b5b5b5;z-index:777;box-shadow: 2px 2px 18px -6px;}#gmPopupContainer button{cursor:pointer;margin:1em 1em 0;border:1px outset buttonface;}");
  });
  a(".jvgroup").click(function() {
    var c = a(this).prev().html().trim().toLowerCase();
    a("body").append('<div class="overlay"></div><div id="gmPopupContainer"><form><p id="logs"></p><select id="saved_groups" style=" margin-right: 10px;"></select><input type="text" class="selected_group" placeholder="Nom du groupe"><button id="addToGroup" type="button">Ajouter ce pseudo \u00e0 ce groupe</button><button id="removePseudo" type="button">Supprimer du groupe actuel</button><br><h5><button id="gmCloseDlgBtn" type="button">Fermer & refresh</button></h5></form></div>');
    a("#logs").text(c + " actuellement dans le groupe : " + a(this).html());
    var d = e.findIndex(function(a, d) {
      return a.pseudo.includes(c);
    });
    a("#saved_groups").change(function() {
      a(".selected_group").val(a(this).val());
    });
    l();
    a(".selected_group").bind("keydown", function(a) {
      13 == a.keyCode && a.preventDefault();
    });
    0 <= d ? a("#removePseudo").show() : a("#removePseudo").hide();
    a("#removePseudo").click(function() {
      h(c);
      a(this).hide();
    });
    a("input").on("keypress", function(b) {
      var c = String.fromCharCode(b.charCode ? b.charCode : b.which);
      if (/["|'~`!@#$%^&()_={}[\]:;,.<>+\/?-]/.test(c) || a.isNumeric(c)) {
        return b.preventDefault(), !1;
      }
    });
    a(".overlay").click(function() {
      g();
      k();
    });
    a("#addToGroup").click(function() {
      var b = JSON.parse(localStorage.getItem("jvgroup")), d = a(".selected_group").val(), e = b.findIndex(function(a, b) {
        return a.pseudo.includes(c);
      }), f = b.findIndex(function(a, b) {
        return a.group === d;
      });
      "" !== d ? (-1 == f ? (b.push({group:d, pseudo:[c]}), a("#logs").text(c + " ajout\u00e9 \u00e0 : " + d).css("color", "green")) : b[f].pseudo.includes(c) || (b[f].pseudo.push(c), a("#logs").text(c + " ajout\u00e9 \u00e0 : " + d).css("color", "green")), 0 <= e && b[e].group !== d && (console.log(e), f = b[e].pseudo.indexOf(c), b[e].pseudo.splice(f, 1), a("#logs").text(c + " ajout\u00e9 \u00e0 : " + d + " et supprim\u00e9 de son ancien groupe").css("color", "green")), a("#removePseudo").show()) : 
      a("#logs").text("Erreur: veuillez renseigner un nom de groupe").css("color", "red");
      localStorage.setItem("jvgroup", JSON.stringify(b));
    });
    a("#gmCloseDlgBtn").click(function() {
      location.reload();
    });
    GM_addStyle(".overlay {background: black;height: 100%;width: 100%;position: fixed;top: 0;left: 0;opacity: 0.7;z-index: 5;} #gmPopupContainer {overflow-wrap: break-word;position:fixed;top:40%;left:30%;padding:2em;background:#d2d2d2fa;border:1px solid #b5b5b5;z-index:777;box-shadow: 2px 2px 18px -6px;}#gmPopupContainer button{cursor:pointer;margin:1em 1em 0;border:1px outset buttonface;}");
  });
  k();
});
