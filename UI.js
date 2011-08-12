function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) { createCookie(name,"",-1); }

function switchBookmarkOn() {
  $('#bookmark').addClass('active')
                .animate({ top: -45, }, 100);
}

function switchBookmarkOff() {
  $('#bookmark').removeClass('active')
                .animate({ top: -75, }, 100);
}

var current_section = {element:'#main_content', index:0};

$(function() {
  var h2_ceil = $("h2").length -1;
  // Bookmark
  var currentLabID = $('body').data('lab-id');
  if(readCookie(currentLabID)) { switchBookmarkOn(); }

  $('#index li').each(function(i, item){
    var item = $(item);
    if(readCookie(item.data('lab-id'))) { item.addClass('bookmark'); }
  });

  $('#bookmark').click(function() {
    var bookmark = $(this);
    if(bookmark.hasClass('active')) {
      switchBookmarkOff();
      eraseCookie(currentLabID);
      $('#index li[data-lab-id=' + currentLabID +']').removeClass('bookmark');
    } else {
      switchBookmarkOn();
      createCookie(currentLabID, '1', 365);
      $('#index li[data-lab-id=' + currentLabID +']').addClass('bookmark');
    }
  });

  $('#show_bookmarks').click(function() {
    var bookmark = $(this);
    if(bookmark.hasClass('active')) {
      bookmark.removeClass('active')
              .animate({ top: -20, }, 100);

      $('#no_bookmarks').fadeOut(100);
      $('#index li').fadeIn(100);
    } else {
      bookmark.addClass('active')
              .animate({ top: 0, }, 100);

      $('#index li:not(.bookmark)').fadeOut(100);
      if(!$('#index .bookmark').length) {
        $('#no_bookmarks').fadeIn(200);
      }
    }
  });


  // Lab Index
  $('#header .index_button a, #footer .index_button a, #pager .index_button a').click(function(e) {
    e.preventDefault();
    $('#index').fadeToggle(200);
  });

  $('#index ul').hover(
    function() { $(this).addClass('hover'); },
    function() { $(this).removeClass('hover'); }
  );


  $('#header .arrow a').click(function(e){
    var anchor = location.href.match('main_content') ? '' : '#main_content'
    window.location = '/' + $(this).attr('href') + anchor;
  });

  function nextPage()     { $('header .next a').click(); }
  function previousPage() { $('header .previous a').click(); }

  $(document).click(function(e) {
    if (!$(e.target).closest('#index, .index_button').length) {
      $('#index').fadeOut(100);
    }
  }).keyup(function(e) {
    if(e.keyCode == 27)                    { /* escape key */       $('#index').fadeOut(100); }
    if(e.keyCode == 76 || e.keyCode == 39) { /* l or right arrow */ nextPage(); }
    if(e.keyCode == 72 || e.keyCode == 37) { /* h or left arrow */  previousPage(); }
  });

  $('#main_content pre.instructions').each(function(i, pre) {
    var lines = pre.innerHTML.split("\n")
        container = $('<div class="instructions">');

    $.each(lines, function(i, line) {
      $('<pre>').html(line).appendTo(container);
    });

    $(pre).replaceWith(container);
  });

  window.pager = $('#pager');
  window.pagerShouldBeVisible = function(){
    return $(document).scrollTop() > 215;
  };
  $(window).scroll(function(e) {
    if(pagerShouldBeVisible()) {
      pager.fadeIn(200);
    } else {
      pager.fadeOut(100);
    }
  }).scroll();
});
