
$(document).ready(function() {
   alert("jQuery esta funcionando !!");
 });

function GetRequest(){
    alert("Esta usando el script Get)");
    const url = 'localhost:8082/api/v1/users';


    /*
    const http = new XMLHttpRequest()

    http.open("GET", url)
    http.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
         var resultado = JSON.parse(this.responseText)
        
            console.log(resultado.name)
            alert("Este es el resultado"+resultado)
         }      
    }
    http.send()*/
}

function PostRequest(){
    const url = 'http://localhost:8082/api/v1/users/';
    $.ajax({
        type:'POST',
        url:url,
        data:({id:1, name:'Diego b'}),
        async:true,
        dataType:'json',
        /**headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },*/
        beforeSend:function(){
            alert('Before Send');
        },
        success:function(data){
            alert(data.status);
            console.log(data);
        },
        error: function (xhr, status) {
            alert("error");
        }
    })
    /*
    const http = new XMLHttpRequest()

    http.open("GET", url)
    http.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
         var resultado = JSON.parse(this.responseText)
        
            console.log(resultado.name)
         }      
    }
    http.send()*/
}

