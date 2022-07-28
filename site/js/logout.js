function signout()
{
    auth.signOut().then(()=>{
        window.location.href="../index.html";
        
    }).catch(function(error){
        swal("User Login Error", "Could not sign not", "error");
    })

}