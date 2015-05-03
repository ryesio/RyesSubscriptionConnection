var questionsAnswersApp = angular.module("questionsAnswersApp", []);

questionsAnswersApp.controller("questionsAnswersController", function($scope, $http, $location ) {
    $scope.formData               = {};
    $scope.clientName             = clientName;
    $scope.campaignName           = campaignName;
    $scope.selectTextForDropDowns = selectTextForDropDowns;
    $scope.data                   = [];
    $scope.data.questionsAnswers  = [];
    $scope.currentYear            = new Date().getFullYear();
    $scope.days                   = [];
    $scope.years                  = [];
    $scope.months                 = [1,2,3,4,5,6,7,8,9,10,11,12];
    $scope.link                   = '';
    $scope.hideQuestions          = false;

    for(j=0; j<=30; j++)
    {
        if(j <9){
            thisDay = j+1;
            $scope.days[j] = '0' + thisDay;
        }
        else
        {
            $scope.days[j] = j+1;
        }
    }
    for(i=0; i<115; i++)
    {
        $scope.years[i] = $scope.currentYear-i;
    }

    $http({
        method  : 'POST',
        url     : 'http://app.ryes.io/getQuestionsAnswers',
        data    : $.param({ clientName : $scope.clientName, campaignName: $scope.campaignName }),
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
        .success(function(response) {

            if(response.success == 'success')
            {
                $scope.$watch(function()
                {
                    $scope.questionsAnswers = response.data.campaignQuestionsAnswers;
                    $scope.countries = response.data.countries;
                })
            }
            else
            {
                $scope.hideQuestions = true;
                $scope.info = response.message;
            }
    });

    $scope.submit = function(){
        $scope.formData.referred_by_code = window.location.href.toString().split("?ref=")[1];
        $scope.formData.client_name = $scope.clientName;
        $scope.formData.campaign_name = $scope.campaignName;
        $scope.link = '';
        $scope.info = '';
        $http({
            method  : 'POST',
            url     : 'http://app.ryes.io/addSubscriber',
            data    : $.param($scope.formData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(response) {
            if(response.success == 'success')
            {
                $scope.link = response.data.link;
            }
            else
            {
                $scope.info = response.message;
            }
        });
    }
});
