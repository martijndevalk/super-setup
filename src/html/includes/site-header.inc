<header role="banner" class="header">

    <div class="sticky">

        <div class="container">

            <div class="site-logo">
                <a href="/" class="site-logo__link">
                    <div class="svg-container">
                        <svg role="img" title="Aegon">
                           <use xlink:href="../img/img.svg#icon-aegon-logo"></use>
                        </svg>
                    </div>
                </a>
            </div>

            @@include('flyout-menu.inc')

            <language-selector class="language-selector">
                <button type="button" class="language-selector__flag-button js-button" v-lightbox-link="{ type:'js-lang' }">
                    <div class="language-selector__flag-button__icon">
                        <svg role="img">
                           <use xlink:href="../img/img.svg#icon-nl"></use>
                        </svg>
                    </div>
                    <div class="language-selector__flag-button__border">
                        <svg role="img">
                           <use xlink:href="../img/img.svg#icon-pulldown-left"></use>
                        </svg>
                    </div>
                </button>
            </language-selector>

            <hamburger-menu>
                <div class="hamburger-menu" role="button">
                    <div class="hamburger-menu__bar"></div>
                </div>
            </hamburger-menu>


            <div class="site-search">
                <button type="button" class="site-search__magnifier-button">
                    <svg role="img">
                       <use xlink:href="../img/img.svg#icon-magnifier"></use>
                    </svg>
                </button>
            </div>


            <div class="site-login">
                <button type="button" v-button class="button button--tertiary site-login__login-button waves-effect">
                    <svg role="img">
                        <use xlink:href="../img/img.svg#icon-lock"></use>
                    </svg>
                    <span class="site-login__login-button__label">Log In</span>
                </button>
            </div>

        </div>

    </div>

    <language-menu-notifcation>
        <div class="container">
            <a class="language-menu-notification__close js-close" href="#">
                <svg role="img">
                    <use xlink:href="../img/img.svg#icon-close-circle"></use>
                </svg>
            </a>
            <div class="language-menu-notification__info">
                <!-- RTE -->
                <p>You're viewing the careers section for <strong>The Netherlands</strong> and in <strong>Dutch</strong></p>
                <!-- END RTE -->
            </div>
            <div class="language-menu-notification__language">
                <div class="language-menu-notification__language__status">
                    <div class="language-menu-notification__language__status__icon">
                        <svg role="img">
                            <use xlink:href="../img/img.svg#icon-nl"></use>
                        </svg>
                    </div>
                    <strong>Nederland | Netherlands</strong>
                </div>
                <a v-lightbox-link="{ type:'js-lang' }" href="#" class="language-menu-notification__language__link js-link">Other country/language</a>
            </div>
        </div>
    </language-menu-notifcation>

</header>
