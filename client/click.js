angular
    .module('myApp', [])
    .controller('myCtrl', myCtrl)


function myCtrl($http){
    this.postBase64 = function(){
        //base64 is the long string
        var base64 = canvas.toDataURL()
        //post it
        $http.post('/api/base64',{base64: base64}).success(function(data, status){
            $window.location.reload();
        })
    }
}


// $("#clr").on('click',function(){
//     ctx.clearRect(0, 0, 420, 420);
// })



// $('#analyze').on('click', function(){
//     $.post('/api/base64', {base64: canvas.toDataURL()})
// })