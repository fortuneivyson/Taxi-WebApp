function displayUserInfo()
{
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                
             
              document.getElementById("uname1").innerHTML=info.data().Name;

               

        })
    }
    })
   
}