$( document ).ready(function() {

		/* Sidebar */
		/*  Check if mobile */
		var mq = window.matchMedia('(min-width: 767px)');
		if (mq.matches) {openSidebar();} else {closeSidebar();}
		$('#openNav').on("click", window.openSidebar);
		$('#close-dropdown-btn').on("click", window.closeSidebar);

    /* Show/Sort/Filter */
		$('.dropdown-btn').on("click", window.toggleButton);

    /* Close Subsort */
    $('.subsort-btn .sortbutton').on("click", window.closeSubsort);

    /* Remove titles */
    $('#filter-reset-btn').on("click", window.removeTitle)
    $('#sort-reset-btn').on("click", window.removeTitle)

    /* Prepare html for info container */
    $('body').append('<div class="info-container"></div>');
  
    /* Render info for traits */
    $('.info-toggle').on("click", function (e) {
      let $target = $(e.target);
      console.log($target);
      if(!$(this).hasClass('info-active')) {
        const $infoContainer = $('.info-container');
        $(this).addClass('info-active');
        $infoContainer.addClass('info-active');
  
        /* Get info text to render in container */
        let info_id = $(this).attr('data-info');
        let info_text = getInfo(info_id);
        $infoContainer.html(`<span>${info_text}</span>`);
        renderInfo(e);
      } else {
        $('.info-active').removeClass('info-active');
      }
      });
  
    /* Hide info */
    $('html').on("click", function (e) {
      let $target = $(e.target);
      // if(!$target.closest('.info-toggle').length && !$target.closest('.info-container').length && !$target.closest('.macro-checkbox').length) {
      //   $('.info-active').removeClass('info-active');
      // }
      if(!$target.closest('.info-toggle').length && !$target.closest('.macro-checkbox').length) {
        $('.info-active').removeClass('info-active');
      }
    });
  });