angular.module('webmakerApp', ['ngRoute', 'ui.bootstrap', 'webmakerApp.services',
  'webmakerAngular.login', 'localization', 'ngScrollSpy', 'angularMoment', 'wmMakeApiAngular'])
  .config(['$routeProvider', '$locationProvider', 'makeApiProvider', 'CONFIG',
    function ($routeProvider, $locationProvider, makeApiProvider, CONFIG) {
      makeApiProvider.options.apiURL = CONFIG.makeApiUrl;

      $routeProvider
        .when('/:locale?/explore', {
          templateUrl: '/views/explore.html',
          controller: 'exploreController',
          title: 'Explore'
        })
        .when('/:locale?/resources', {
          templateUrl: '/views/resources.html',
          controller: 'resourcesHomeController',
          title: 'Resources'
        })
        .when('/:locale?/mentor', {
          templateUrl: '/views/mentor.html',
          controller: 'mentorController',
          title: 'Mentor'
        })
        .when('/:locale?/literacy', {
          templateUrl: '/views/literacy.html',
          controller: 'literacyController',
          title: 'WebLiteracyMap'
        })
        .when('/:locale?/resources/literacy/:id', {
          templateUrl: '/views/competency.html',
          controller: 'competencyController'
        })
        .when('/:locale?/tools', {
          templateUrl: '/views/tools.html',
          controller: 'toolsController',
          title: 'Tools'
        })
        .when('/:locale?/madewithcode-:mwc', {
          templateUrl: '/views/madewithcode.html',
          controller: 'mwcController',
          title: 'Made with Code'
        })
        .when('/:locale?/admin/badges', {
          templateUrl: '/views/admin/badges-main.html',
          controller: 'badgesAdminController',
          title: 'Badges Admin'
        })
        .when('/:locale?/admin/badges/:badge', {
          templateUrl: '/views/admin/badges-badge.html',
          controller: 'badgesAdminBadgeController',
          title: 'Badges Admin'
        })
        .when('/:locale?/signup/:auth?', {
          templateUrl: '/views/signup.html',
          controller: 'homeController',
          title: 'Webmaker - Sign Up'
        })
        .when('/:locale?/appmaker', {
          templateUrl: '/views/appmaker.html',
          controller: 'appmakerController',
          title: 'Discover Appmaker'
        })
        .when('/:locale?/make-your-own', {
          templateUrl: '/views/make-your-own.html',
          controller: 'makeYourOwnController',
          title: 'TeachTemplates'
        })
        .when('/:locale?/feedback', {
          templateUrl: '/views/feedback.html',
          controller: 'feedbackController',
          title: 'Feedback'
        })
        .when('/:locale?/getinvolved', {
          templateUrl: '/views/getinvolved.html',
          controller: 'getinvolvedController',
          title: 'Get Involved'
        })
        .when('/:locale?/about', {
          templateUrl: '/views/about.html',
          controller: 'aboutController',
          title: 'About'
        })
        .when('/:locale?/hackyourschool-:mwc', {
          templateUrl: '/views/hack-your-school.html',
          controller: 'mwcController',
          title: 'Hack Your School'
        })
        .when('/:locale?/privacy', {
          templateUrl: '/views/privacy.html',
          controller: 'homeController',
          title: 'Privacy Policy'
        })
        .when('/:locale?/terms', {
          templateUrl: '/views/terms.html',
          controller: 'homeController',
          title: 'Terms of Use'
        })
        .when('/:locale?', {
          templateUrl: '/views/home.html',
          controller: 'homeController',
          title: 'Webmaker'
        })
        .otherwise({
          redirectTo: '/'
        });

      // html5mode
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
    }
  ])
  .run(['$rootScope', '$http', '$routeParams', '$location', 'CONFIG', 'weblit',
    function ($rootScope, $http, $routeParams, $location, CONFIG, weblit) {
      $rootScope.title = 'Webmaker';

      // feed supported langs to meta
      $rootScope.languages = CONFIG.supported_languages;
      $rootScope.currentPath = $location.path();

      // Configure CSRF token
      $http.defaults.headers.common['X-CSRF-Token'] = CONFIG.csrf;

      // Set locale information
      if (CONFIG.supported_languages.indexOf(CONFIG.lang) > 0) {
        $rootScope.lang = CONFIG.lang;
      } else {
        $rootScope.lang = CONFIG.defaultLang;
      }
      $rootScope.direction = CONFIG.direction;
      $rootScope.arrowDir = CONFIG.direction === 'rtl' ? "left" : "right";

      // Set base url
      $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        // Reset the page title when route changes
        $rootScope.title = current.$$route.title || 'Webmaker';

        $rootScope.baseUrl = '/';
        if ($routeParams.locale) {
          $rootScope.baseUrl += ($routeParams.locale + '/');
        }
      });

      // Set up content for competency
      $http
        .get('/data/content.json')
        .success(function (data) {
          $rootScope.content = data;
          $rootScope.contentReady = true;
        })
        .error(function (err) {
          console.log(err);
        });

      $http
        .get('/data/madewithcode.json')
        .success(function (data) {
          $rootScope.madewithcode = data;
          $rootScope.mwcReady = true;
        })
        .error(function (err) {
          console.log(err);
        });
    }
  ]);
