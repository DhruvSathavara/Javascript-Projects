let user = document.getElementById("uername");
let password = document.getElementById("password");
let x = 1;

function validateform(){
    if(user.value == ""){
        document.getElementById("usererror").innerHTML = "User Nmae is empaty.";
        x = 0;

    }else if (user.value.length < 3){
        document.getElementById("usererror").innerHTML = "User Nmae recquired min 3 char.";
        x = 0;

    }else{
        document.getElementById("usererror").innerHTML = "";
        x = 1;
        
    }if(password.value == ""){
        document.getElementById("passerror").innerHTML = "Password is empaty.";
        x = 0;

    }else{
        document.getElementById("passerror").innerHTML = "";
        x = 1;
    }

    if(x){
        return true;
        
    }else{
        return false;
    }
    
}