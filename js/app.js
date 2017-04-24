// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

// ngMaterial och ngMessages dependencies krävs för md-datepicker's funktionalitet. 
// angularMoment krävs av amDifference för att räkna ut
// skillnaden mellan in- och utcheckningsdatumen
angular.module('starter', ['ionic', 'ngMaterial', 'ngMessages', 'angularMoment'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'hotelCtrl',
        templateUrl: 'home.html'
      })
      .state('bookning', {
        url: '/bookning',
        controller: 'hotelCtrl',
        templateUrl: 'bookning.html'
      })
      .state('allaRum', {
        url: '/allaRum',
        controller: 'hotelCtrl',
        templateUrl: 'allaRum.html'
      })
      .state('rumdetaljer', {
        url: '/rumdetaljer/:aId',
        controller: 'hotelCtrl',
        templateUrl: 'rumdetaljer.html'
      })

      .state('uppgifter', {
        url: '/uppgifter',
        controller: 'hotelCtrl',
        templateUrl: 'uppgifter.html'
      })
      .state('bekraftelse', {
        url: '/bekraftelse',
        controller: 'hotelCtrl',
        templateUrl: 'bekraftelse.html'
      });
    $urlRouterProvider.otherwise('/home');
  })

  /**
   * factory service används för att lagra objektets data utanför kontroller. objektet kan sedan injekteras 
   * i en eller flera kontroller och är tillgänglig i hela applikationen
   */
  .factory('Sammanfattning', function () {
    sammanfattning = {};
    sammanfattning.minDate = '',
      sammanfattning.minDateUt = '',
      sammanfattning.namn = '';
    sammanfattning.efternamn = '';
    sammanfattning.epost = '';
    sammanfattning.mobil = '';
    sammanfattning.fullrum = '';
    return sammanfattning;
  })

  /*applikationens kontroller. kontroller styr flödet av data i applikationen och är ett JavaScript objekt
  och innehåller objektets funktioner och egenskaper */
  .controller('hotelCtrl', function ($scope, $location, $http, $state, Sammanfattning) {
    $http.get('js/rum.json').success(function (data) {//hämta data från JSON fil
      $scope.rum = data; // spara data från JSON i $scope.rum variabeln vilket sedan anropas från ng-repeat
      $scope.myDate = new Date(); //variabeln med det aktuella datumet
      $scope.whichrum = $state.params.aId; //aktuella rummet
      $scope.input = Sammanfattning; //en kopia av sammanfattnings objekt

      /*funktion som skapar ett objekt-en kopia av det valda rummet. Anropas från '/allarum'
      vyn via ng-click när användaren klickar på ion-item i ion-list. Rumobjektet
      kopieras till sammanfattning objektet.*/
      $scope.kopieraRum = function (rum) {
        sammanfattning.fullrum = rum;
      };

      //minsta tillåtna datum för incheckning - det aktuella datumet
      $scope.minDate = new Date($scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate()
      );

      //minsta tillåtna datum för utcheckning - det aktuella datumet plus en dag
      $scope.minDateUt = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate() + 1
      );

      /*funktion goUppgifter skickar användaren till '/uppgifter' vyn.
      Anropas via ng-click från '/rumdetaljer' vyn*/
      $scope.goUppgifter = function () {
        $location.path("/uppgifter")
      };

      /*funktion goBekraftelse skickar användaren till '/allaRum' vyn.
           Anropas via ng-click från '/bookning' vyn*/
      $scope.goAllaRum = function () {
        $location.path("/allaRum")
      };

      /* funktion goBekraftelse skickar användaren till '/bekraftelse' vyn.
       Anropas via ng-click från '/uppgifter' vyn*/
      $scope.goBekraftelse = function () {
        $location.path("/bekraftelse")
      };

      /*funktion goBookning skickar användaren till '/bookning' vyn.
      Anropas via ng-click från '/home' vyn*/
      $scope.goBookning = function () {
        $location.path("/bookning")
      };

      /* funktion goToStart skickar användaren till '/home' vyn och rensar all input data såsom <form>,
      <md-datepicker>,<md-select>. Anropas via ng-click från '/bekraftelse' vyn*/
      $scope.goToStart = function () {
        document.location.href = "index.html";
      };

    });
  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
