

function GetRequest(){
    alert("Esta usando el script Get)")
    const url = 'localhost:8082/api/v1/users'
    const http = new XMLHttpRequest()

    http.open("GET", url)
    http.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
         var resultado = JSON.parse(this.responseText)
        
            console.log(resultado.name)
            alert("Este es el resultado"+resultado)
         }      
    }
    http.send()
}

function PostRequest(){
    const url = 'localhost:8082/api/v1/users'
    const http = new XMLHttpRequest()

    http.open("GET", url)
    http.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
         var resultado = JSON.parse(this.responseText)
        
            console.log(resultado.name)
         }      
    }
    http.send()
}

