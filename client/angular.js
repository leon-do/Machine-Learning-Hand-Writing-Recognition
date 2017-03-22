angular
    .module('myApp', [])
    .controller('myCtrl', myCtrl)


function myCtrl($http){
    var vm = this;
    vm.postBase64 = function(){
        //base64 is the long string
        var base64 = canvas.toDataURL()
        //post it
        $http.post('/api/base64',{base64: base64}).then(function(){


            //get base64 string
            $http({
                method:'GET',
                url: 'http://localhost:8000/base64toImg'
            }).then(function(response){
                vm.base64 = response
            });


            //get flattenImg
            $http({
                method:'GET',
                url: 'http://localhost:8000/flattenImg'
            }).then(function(response){
                vm.flattenImg = response.data
            });


            //get cropArray
            $http({
                method:'GET',
                url: 'http://localhost:8000/cropArray'
            }).then(function(response){
                vm.cropArray = response.data
            });


            //get cropArray
            $http({
                method:'GET',
                url: 'http://localhost:8000/getAnswer/distanceArr'
            }).then(function(response){
                vm.distanceArr = response.data
            });


            //get best match test data control
            $http({
                method:'GET',
                url: 'http://localhost:8000/getAnswer/control'
            }).then(function(response){
                vm.control = response.data
            });


            //get test data
            $http({
                method:'GET',
                url: 'http://localhost:8000/getAnswer/Test'
            }).then(function(response){
                vm.test = response.data
            });

            //get answer
            $http({
                method:'GET',
                url: 'http://localhost:8000/getAnswer/answer'
            }).then(function(response){
                vm.answer = response
            });


        });//post
    }//vm.postBase64


    vm.clrCanvas = function(){
        ctx.clearRect(0, 0, 420, 420);
    }

    
}