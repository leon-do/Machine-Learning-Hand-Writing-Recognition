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
                vm.base64toImg = response.data
            });

            //get test data
            $http({
                method:'GET',
                url: 'http://localhost:8000/getAnswer/test'
            }).then(function(response){
                vm.test = line2Grid(response.data)
            });


            //get distanceArr
            $http({
                method:'GET',
                url: 'http://localhost:8000/getAnswer/distanceArr'
            }).then(function(response){
                vm.distanceArr = response.data;
            });


            //get best match test data control
            $http({
                method:'GET',
                url: 'http://localhost:8000/getAnswer/control'
            }).then(function(response){
                vm.controlArr = line2Grid(response.data)
            });


            //get answer
            $http({
                method:'GET',
                url: 'http://localhost:8000/getAnswer/answer'
            }).then(function(response){
                vm.answer = response.data
            });


        });//post
    }//vm.postBase64


    vm.clrCanvas = function(){
        ctx.clearRect(0, 0, 420, 420);
    }

    
}


function line2Grid(arr){
    var string = '';
    for (var i = 0; i < arr.length; i++){
        if (i > 0 && i % 28 === 0){
            string = string + arr[i] + '\n';
        } else {
            string = string + arr[i];
        }
    }

    return string;
}