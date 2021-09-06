// todo: text scrambling for footer and socials


$(() => {

    // Some media queryes, and... yes, it handle by js))

    let screen = {
        width: 'default'
    };

    // Create a condition that targets viewports
    const tabletMediaQuery = window.matchMedia('(min-width: 577px) and (max-width: 768px)');
    const mobileMediaQuery = window.matchMedia('(max-width: 576px)');

    function handleTabletChange(e) {
        // Check if the media query is true
        if (e.matches) {
            screen.width = 'Tablet';
        } else {
            screen.width = 'default'
        }
        console.log(screen.width)
    }

    function handleMobileChange(e) {
        // Check if the media query is true
        if (e.matches) {
            screen.width = 'Mobile';
        }
        console.log(screen.width)
    }

    // Register event listener
    tabletMediaQuery.addListener(handleTabletChange);
    mobileMediaQuery.addListener(handleMobileChange);

    // Initial check
    handleTabletChange(tabletMediaQuery);
    handleMobileChange(mobileMediaQuery);

    const navMenu = $('#nav-menu');

    const navMenuLinks = navMenu.children('a');

    const mainContent = $('#content-wrapper')

    const contentSections = mainContent.children('.content');

    const btnClose = mainContent.children('.content__close');

    const photosInPortfolio = $('#portfolio__imagelist > li');

    const mosaicBoxes = $('#mosaic-animation-boxes');

    let credits = $('#credits');

    let mainBackground = $('#background-fill');

    const $grid = $('#portfolio__imagelist');

    const $filterOptions = $('.portfolio__sort li');

    // const sizer = $('#sizer');

    const Menu = (() => {

        const init = () => {
            // Photo by Krzysztof Kotkowicz on Unsplash
            mainBackground.css({ 'background': 'url(https://hokkubit.github.io/ewigkeit/images/default.jpg)', 'backgroundSize': 'cover' })
            preloadImages();
            initRandomPattern();
            initEventsHandler();

            // None of these need to be executed synchronously
            setTimeout(function() {
                // listen();
                setupFilters(); // Set up button clicks
            }, 100);

            // instantiate the plugin
            $grid.shuffle({
                itemSelector: '[class*="show"]',
            });
        }

        // предзагрузка бльших фоновых изображений
        const preloadImages = () => {
            photosInPortfolio.each(function(i) {
                $('<img/>').attr('src', $(this).children('img').data('bgimg'));
            });
        }


        const galeryHoverPattern = (menuItem) => {

            let menuItemOnHover = menuItem.attr("name");

            const coordinates = [
                { top: 220, left: 10 },
                { top: 220, left: 10 },
                { top: 220, left: 20 },
                { top: 220, left: 30 },
                { top: 220, left: 45 },
                { top: 220, left: 60 },
                { top: 220, left: 75 },
                { top: 220, left: 85 },
                { top: 220, left: 90 },
                { top: 220, left: 100 },
                { top: 220, left: 105 },
                { top: 220, left: 115 },
                { top: 220, left: 120 },
                { top: 220, left: 135 },
                { top: 220, left: 155 },
                { top: 220, left: 160 },
                { top: 220, left: 170 },
                { top: 240, left: 170 },
                { top: 250, left: 170 },
                { top: 260, left: 170 },
                { top: 260, left: 160 },
                { top: 260, left: 155 },
                { top: 260, left: 135 },
                { top: 260, left: 120 },
                { top: 260, left: 115 },
                { top: 260, left: 105 },
                { top: 260, left: 100 },
                { top: 260, left: 90 },
                { top: 260, left: 85 },
                { top: 260, left: 75 },
                { top: 260, left: 60 },
                { top: 260, left: 45 },
                { top: 260, left: 30 },
                { top: 260, left: 15 },
                { top: 250, left: 10 },
                { top: 250, left: 10 },
            ]
            mosaicBoxes.children().each(function(i) {

                let o = 0.02;

                let a = menuItemOnHover ? 0 : (Math.floor(Math.random() * 101) - 50);

                let $el = $(this);

                let top;
                let left;

                switch (menuItemOnHover) {
                    case "galery":
                        top = coordinates[i].top;
                        left = coordinates[i].left;
                        top = "" + top + "px";
                        left = "" + left + "px";
                        break;
                    case "media":
                        top = coordinates[i].top + 80;
                        left = coordinates[i].left + 60;
                        top = "" + top + "px";
                        left = "" + left + "px";
                        break;
                    case "contacts":
                        top = coordinates[i].top + 150;
                        left = coordinates[i].left + 140;
                        top = "" + top + "px";
                        left = "" + left + "px";
                        break;
                    default:
                        console.log('default');
                        break;
                }

                let param = {
                    width: '30px',
                    height: '30px',
                    zIndex: 7,
                    opacity: o,
                    top: top,
                    left: left
                };

                function animateOut() {
                    return new Promise((resolve, reject) => {
                        $el.animate(param, 300, 'swing', $el.css({ 'transform': 'rotate(' + a + 'deg)' }))
                        resolve()
                    })
                }

                animateOut().then(() => { mosaicBoxes.children().fadeOut(400) })

                // $el.animate(param, 300, 'swing', $el.css({ 'transform': 'rotate(' + a + 'deg)' }));

            });
        }

        const initRandomPattern = () => {
            for (let i = 0; i < 36; ++i) {
                let opacity = 0.2,
                    t = Math.floor(Math.random() * 500) + 5,
                    l = Math.floor(Math.random() * 1200) + 5,
                    angle = Math.floor(Math.random() * 111) - 60;

                let box = $('<div>').css({
                    opacity: opacity,
                    zIndex: 11,
                    top: t + 'px',
                    left: l + 'px'
                });

                box.css({ WebkitTransform: 'rotate3d(1, 1, 1,' + angle + 'deg)' });
                box.css({ '-moz-transform': 'rotate3d(1, 1, 1,' + angle + 'deg)' });
                // box.css({ '-moz-transform': 'skewX(' + skew + 'deg)' });
                box.appendTo(mosaicBoxes);

            }
        }


        const disperse = () => {
            mosaicBoxes.children().each(function(i) {
                let o = 0.2,
                    top = Math.floor(Math.random() * 500) + 5, // between 5 and 200
                    left = Math.floor(Math.random() * 1200) + 5, // between 5 and 700
                    angle = Math.floor(Math.random() * 111) - 60, // between -50 and 50
                    // skew = Math.floor(Math.random() * 50) - 25,
                    $el = $(this),
                    param = {
                        width: '30px',
                        height: '30px',
                        opacity: o,
                        zIndex: 11,
                        top: top + 'px',
                        left: left + 'px'
                    };
                $el.animate(param, 400, 'swing', $el.css({ 'transform': 'rotate3d(1, 1, 1,' + angle + 'deg)' }));

            });
        }

        const disperseMenu = () => {
            mosaicBoxes.children().each(function(i) {
                let $el = $(this);
                let o = 0.1,
                    top = Math.floor(Math.random() * 100) + 300,
                    left = Math.floor(Math.random() * 600) + 630,
                    a = Math.floor(Math.random() * 101) - 50,
                    param = {
                        width: '30px',
                        height: '30px',
                        opacity: o,
                        top: top + 'px',
                        left: left + 'px'
                    };

                $el.animate(param, 300, 'swing', $el.css({ 'transform': 'rotate(' + a + 'deg)' }));

            });
        }

        const initEventsHandler = () => {

            navMenuLinks.on('mouseenter', (e) => {
                let el = $(e.target);
                galeryHoverPattern(el);
                // el.addClass("onHover");
            });

            navMenuLinks.on('mouseleave', (e) => {
                let el = $(e.target);
                let offsetX = el.offset().left;
                let offsetY = el.offset().top;
                if (!navMenu.data('open')) {
                    mosaicBoxes.children().fadeIn(300);
                        // disperseMenu(offsetX, offsetY);
                        // disperse();
                }
            });


            navMenuLinks.bind('click', function(e) {

                mosaicBoxes.children().fadeIn(300);

                if (navMenu.data('open')) {
                    mosaicBoxes.children().fadeIn(100, () => {
                        contentSections.hide();
                        mainContent.hide();
                    });
                    disperseMenu();
                    navMenu.data('open', false);
                }

                const $this = $(this),
                    menuItemIndex = $this.index();

                if (!navMenu.data('open')) {
                    if (navMenu.data('moving')) return false;
                    navMenu.data('moving', true);

                    $.when(openItem(menuItemIndex, 500, 'swing')).done(() => {
                        navMenu.data({
                            open: true,
                            moving: false
                        });
                        showContentItem(menuItemIndex);
                        mosaicBoxes.children().fadeOut(500);
                    });
                } else
                    showContentItem(menuItemIndex);
                return false;
            });

            // Close window and call disperse func
            btnClose.bind('click', (e) => {
                navMenu.data('open', false);
                mosaicBoxes.children().fadeIn(100, () => {
                    contentSections.hide();
                    mainContent.hide();
                });

                disperse();
                return false;
            });

            // Get image path and additional data by clicking thumbnail
            photosInPortfolio.bind('click', function(e) {
                const imageSource = $(this).children('img').data('bgimg');
                const imageProfile = $(this).children('img').data('profile');
                const imageText = $(this).children('img').data('text');
                changeBGImage(imageSource, imageProfile, imageText);
                return false;
            });

        }

        // Change bg
        const changeBGImage = (img, size, text) => {

            let arr = mainBackground.attr('style').split(' ');
            let src = arr[5].slice(5, -2);
            if (src[0] == '.') src = src.slice(3);
            if (src === img) return false

            credits.fadeOut('300', () => {
                credits.text(text);
            })

            mainBackground.fadeOut('400', function() {
                mainBackground.css('background', `url(${img})`);

                if (size == 'photocard') {
                    mainBackground.css({
                        'backgroundSize': 'contain',
                        'backgroundPosition': '30% center',
                        'backgroundRepeat': 'no-repeat',
                    });
                } else if (size == 'cover') {
                    mainBackground.css({
                        'backgroundSize': 'cover',
                        'backgroundRepeat': 'no-repeat',
                        'backgroundPosition': 'center 30%'
                    });
                }
            });

            mainBackground.fadeIn('600');

            credits.fadeIn('400');

        }

        // This shows a content item when there is already one shown:
        const showContentItem = (sectionIndex) => {
            contentSections.hide();
            mainContent.show();
            contentSections.eq(sectionIndex).show();
            listen();
        }

        // moves the boxes to the right side
        const openItem = (pos, speed, easing) => {
            return $.Deferred(
                function(dfd) {
                    mosaicBoxes.children().each(function(i) {
                        let $el = $(this);
                        let param = {};
                        if (screen.width == 'default') {
                            param = {
                                width: '100px',
                                height: '100px',
                                top: 20 + 100 * Math.floor(i / 6),
                                left: 740 + 100 * (i % 6),
                                opacity: .3,
                            };
                        } else if (screen.width == 'Tablet') {
                            param = {
                                width: '100px',
                                height: '100px',
                                top: 20 + 100 * Math.floor(i / 6),
                                left: 20 + 100 * (i % 6),
                                opacity: .3,
                            };
                        } else if (screen.width == 'Mobile'){
                            param = {
                                width: '100px',
                                height: '100px',
                                top: 40 + 100 * Math.floor(i / 6),
                                left: 10 + 100 * (i % 6),
                                opacity: .3,
                            };
                        }


                        $el.animate(param, speed, easing, dfd.resolve);
                        $el.css({ WebkitTransform: 'rotate(0deg)' });
                        $el.css({ '-moz-transform': 'rotate(0deg)' });
                    });
                }
            ).promise();
        }



        const setupFilters = () => {
            let $btns = $filterOptions.children();
            $btns.on('click', function(e) {
                e.preventDefault();

                let $this = $(this);
                let isActive = $this.hasClass('active');
                let group = isActive ? 'all' : $this.data('group');

                // Hide current label, show current label in title
                if (!isActive) {
                    $('.portfolio__sort li a').removeClass('active');
                }

                $this.toggleClass('active');

                // Filter elements
                $grid.shuffle('shuffle', group);
            });

            $btns = null;
        };



        const listen = () => {
            const debouncedLayout = $.throttle(300, function() {
                $grid.shuffle('update');
            });

            // Get all images inside shuffle
            $grid.find('img').each(function() {
                let proxyImage;

                // Image already loaded
                if (this.complete && this.naturalWidth !== undefined) {
                    return;
                }

                // If none of the checks above matched, simulate loading on detached element.
                proxyImage = new Image();
                $(proxyImage).on('load', function() {
                    $(this).off('load');
                    debouncedLayout();
                });

                proxyImage.src = this.src;
            });

            setTimeout(function() {
                debouncedLayout();
            }, 500);
        };

        return {
            init: init
        };

    })();


    Menu.init();

});