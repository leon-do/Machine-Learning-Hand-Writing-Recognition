var arr = []

for (var i = 0; i < 10; i++){
    arr.push(euclideanDistance([1,2,3,4],[2,33,4,4,4]))
}

function euclideanDistance(arr1, arr2){
    var answer = Math.pow(arr2.map(function(a,i){ 
        return Math.pow(arr1[i] - arr2[i], 2);
    }).reduce(function(a,b){
        return a+b;
    }),0.5)

    return answer;
}


console.log(arr)