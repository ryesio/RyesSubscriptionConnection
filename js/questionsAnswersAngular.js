var questionsAnswersApp = angular.module("questionsAnswersApp", ['720kb.socialshare']);

questionsAnswersApp.controller("questionsAnswersController", function($scope, $http ) {
    $scope.formData               = {};
    $scope.formDataSocialMedia    = {};
    $scope.clientName             = clientName;
    $scope.campaignName           = campaignName;
    $scope.selectTextForDropDowns = selectTextForDropDowns;
    $scope.data                   = [];
    $scope.data.questionsAnswers  = [];
    $scope.currentYear            = new Date().getFullYear();
    $scope.days                   = [];
    $scope.years                  = [];
    $scope.months                 = [1,2,3,4,5,6,7,8,9,10,11,12];
    $scope.hideQuestions          = false;
    $scope.socialMedias           = {};
    $scope.showSocialMediaLinks   = false;
    $scope.socialMediaShared      = {};
    $scope.link                   = '';
    $scope.title                  = '';
    $scope.text                   = '';
    $scope.image                  = '';
    $scope.campaignId             = '';
    $scope.subscriberId           = '';

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
        $scope.email = $scope.formData.email;
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
                $scope.title = response.data.title;
                $scope.text = response.data.text;
                $scope.image = response.data.image;

                $scope.hideQuestions = true;
                $scope.showSocialMediaLinks = true;
                $scope.socialMedias = response.data.socialMedia;
                $scope.campaignId = response.data.campaignId;
                $scope.subscriberId = response.data.subscriberId;
                $scope.formData = {};
            }
            else
            {
                $scope.info = response.message;
            }
        });
    };

    $scope.updateSocialMediaShare = function(socialMediaName)
    {
        $scope.formDataSocialMedia.socialMedia = socialMediaName;
        $scope.formDataSocialMedia.subscriberId = $scope.subscriberId;
        $scope.formDataSocialMedia.campaignId = $scope.campaignId;
        console.log($scope.formDataSocialMedia);
        $http({
            method  : 'POST',
            url     : 'http://app.ryes.io/addSocialMedia',
            data    : $.param($scope.formDataSocialMedia),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(response) {

        });
    };

});
