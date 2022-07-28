function displayUserInfo()
{
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                
              document.getElementById("fname").value=info.data().Name;
              

                document.getElementById("lname").value=info.data().Surname;
                document.getElementById("idnum").value=info.data().SA_ID_Num;
                document.getElementById("phone").value=info.data().Phone_number;
                
                
                document.getElementById("uemail").value=info.data().Email;
                document.getElementById("status").value=info.data().Status;

                

               document.getElementById("pp").src=info.data().Profilepic;

        })
    }
    })
   
}
function update()
{
    var newName =  document.getElementById("fname").value;
    var newSname =  document.getElementById("lname").value;
    var newEmail = document.getElementById("uemail").value;
    var newPhone = document.getElementById("phone").value;

    var validName = /^[A-ZA-z]+$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneno =  /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;
    
    
    if(newName!=""&&newSname!=""&&newPhone!=""&&newEmail!="")
    {
      
     
     
        if (!validName.test(newName))
        {
          swal("Input Error", "Invalid name, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
        if (!validName.test(newSname))
        {
          swal("Input Error", "Invalid Surname, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
      
     
        if (!newPhone.match(phoneno)) 
        {
          swal("Input Error", "Invalid phone number", "error"); 
          return false;
        }
      
        if (!newEmail.match(mailformat)) 
        {
          swal("Input Error", "Invalid email address", "error"); 
          return false;
        }
      

      else
      {
        {
           
          db.collection("users").doc(auth.currentUser.uid).update({
              Name: newName,
              Surname: newSname,
              Email: newEmail,
              Phone_number: newPhone,
          }, merge=true).then(()=>{
            swal("Updated","User details updated","success")
              setTimeout(()=>{
                window.location.reload();
              },2000)
              
          })   
        }
        
        
        
        return true;

        
      }
   
}
else
{

 swal("Missing Input","All Fields Are Required", "warning");
 return false;

 
}
}


