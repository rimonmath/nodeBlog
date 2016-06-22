routerApp.controller('blogController', function($scope) {
    $scope.posts = [
        {
            title: "Post title 1",
            content: "post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here "
        }
        ,
        {
            title: "Post title 2",
            content: "post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here "
        }
        ,
        {
            title: "Post title 3",
            content: "post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here "
        }
        ,
        {
            title: "Post title 4",
            content: "post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here "
        }
        ,
        {
            title: "Post title 5",
            content: "post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here post1 content goes here "
        }

    ];    
});

routerApp.controller('registerController', function($scope, $http, $httpParamSerializerJQLike) {
    console.log("Register Controller...");
    $scope.user = {};

    $scope.register = function(){
        // console.log($scope.user);

        if($scope.user.full_name == "" || $scope.user.full_name == null){
            $scope.successMessage = "Full Name can't be empty!";
        } else if($scope.user.email == "" || $scope.user.email == null){
            $scope.successMessage = "Email can't be empty!";
        } else{
            $http({
                url: setup.nodeServerPath + '/crud/create/Users',
                method: 'POST',
                data: $httpParamSerializerJQLike({data: $scope.user}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(response) {
                console.log(response); 
                $scope.successMessage = "Successfully registered!";                     
            });
        }
    }

    $scope.clearMessage = function(){
        $scope.successMessage = "";
    };
});

routerApp.controller('usersController', function($scope, $http, $httpParamSerializerJQLike) {
    console.log("Users Controller..."); 

    $http.get( setup.nodeServerPath + "/crud/list/Users").then(function(response) {
       $scope.users = response.data;       
    });   

    $scope.selectUser = function(user){
        $scope.clickedUser = user;
    };
    $scope.deleteUser = function(){
        $http({
            url:  setup.nodeServerPath + '/crud/delete/Users',
            method: 'POST',
            data: $httpParamSerializerJQLike({_id: $scope.clickedUser._id}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(response) {
            console.log(response); 
            $http.get( setup.nodeServerPath + "/crud/list/Users").then(function(response) {
               $scope.users = response.data;       
            });            
        }); 
        $scope.successMessage = "Successfully deleted!";   
    };

    $scope.updateUser = function(){
        $http({
            url: 'http://localhost:8080/crud/update/Users',
            method: 'POST',
            data: $httpParamSerializerJQLike($scope.clickedUser),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(response) {
            console.log(response); 
            $http.get( setup.nodeServerPath + "/crud/list/Users").then(function(response) {
               $scope.users = response.data;       
            });  

            $scope.successMessage = "Successfully updated!";          
        }); 
    };

    $scope.clearMessage = function(){
        $scope.successMessage = "";
    };
});
