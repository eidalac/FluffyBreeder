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

    /* ----- Load JS Color ----- */

    /* Init saved theme */
    let main_theme = localStorage.getItem('main-theme');
    main_theme = main_theme ? main_theme : '#009688';
    document.documentElement.style.setProperty('--main-theme', main_theme);
    let main_theme_text = localStorage.getItem('text-color');
    main_theme_text = main_theme_text ? main_theme_text : 'white';
    document.documentElement.style.setProperty('--text-color', main_theme_text);

    /* Prep jscolor */
    $('#options-btn').on("click", function(event){
      window.jscolor.install();
      $('#modal-jscolor')[0].jscolor.fromString(main_theme);
    });
    $('#jscolor-save').on("click", function(event){

      /* Save new color */
      $('#jscolor-save-info').remove()
      const color_value = $('#modal-jscolor')[0].value;
      localStorage.setItem('main-theme', color_value);
      main_theme = color_value;
      document.documentElement.style.setProperty('--main-theme', color_value);
      $('#jscolor-container').append('<span id="jscolor-save-info">Color saved.</span>');

      /* Check perceived brightness */
      const hexstr = color_value.replace('#','');
      const [r, g, b] = [parseInt(hexstr.substring(0, 2), 16), parseInt(hexstr.substring(2, 4), 16), parseInt(hexstr.substring(4, 6), 16)];

      const luminance = (0.2126*r + 0.7152*g + 0.0722*b);
      let text_color;
      let text_filter;

      console.log(luminance)
      if (luminance > 128) {
        text_color = "black";
        text_filter = 'invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)';
      } else {
        text_color = "white"
        text_filter = 'invert(100%) sepia(0%) saturate(2%) hue-rotate(167deg) brightness(108%) contrast(101%)';
      }
      
      /* Set text color */
      localStorage.setItem('text-color', text_color);
      document.documentElement.style.setProperty('--text-color', text_color);
    })
  });