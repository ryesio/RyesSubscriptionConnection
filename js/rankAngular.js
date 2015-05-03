var rankApp = angular.module("rankApp", []);

rankApp.controller("rankController", function($scope, $http) {
    $scope.formData     = {};
    $scope.clientName   = clientName;
    $scope.campaignName = campaignName;

    $scope.submit = function(){
        $scope.formData.client_name = $scope.clientName;
        $scope.formData.campaign_name = $scope.campaignName;
        $scope.info = '';
        $http({
            method  : 'POST',
            url     : 'http://app.ryes.io/getRank',
            data    : $.param($scope.formData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(response) {
            if(response.success == 'success')
            {
                $scope.info = "You are ranked: " + response.message +"!";
            }
            else
            {
                $scope.questions = false;
                $scope.info = response.message;
            }
        })
        .error(function(response){
            $scope.info = response.message;
        });
    }
});
