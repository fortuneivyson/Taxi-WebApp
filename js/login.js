
function signup()
{

    var username = document.getElementById("email").value;
    var password = document.getElementById("pword").value;
    var idNum = document.getElementById("idnumber").value;
    var name = document.getElementById("uname").value;
    var lastname = document.getElementById("sname").value;
    var gender = document.getElementById("gender").value;
    var cnumber = document.getElementById("phone").value;
    
    var status = document.getElementById("status").value;
  

    var validName = /^[A-ZA-z]+$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneno =  /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;
    var ex = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
    

    let genderVer = idNum.charAt(6);


    
    
    
    if(name!=""&&lastname!=""&&username!=""&&password!=""&&idNum!=""&&gender!=""&&cnumber!="")
    {
      
        if(parseInt(genderVer)<5 && document.getElementById("gender").value=="Male")
        {
            swal("Input Error", "Choose correct gender or recheck your ID", "error");
          
          
        return false;
        }
        if(parseInt(genderVer)>=5 && document.getElementById("gender").value=="Female")
        {
            swal("Input Error", "Choose correct gender or recheck your ID", "error");
          
          
        return false;
        }
     
        if (!validName.test(name))
        {
          swal("Input Error", "Invalid name, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
        if (!cnumber.match(phoneno)) 
        {
          swal("Input Error", "Invalid phone number", "error"); 
          return false;
        }
        if (!validName.test(lastname))
        {
          swal("Input Error", "Invalid Surname, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
        if (!idNum.match(ex)) 
        {
          swal("Input Error", "Invalid SA ID number", "error"); 
          return false;
        }
      
        if (!username.match(mailformat)) 
        {
          swal("Input Error", "Invalid email address", "error"); 
          return false;
        }
        if(password.length<6)
        {
          swal("Input Error", "6 characters or more are required for password", "error"); 
          return false;
        }
      

      else
      {
        {
           
            auth.createUserWithEmailAndPassword(username,password).then(()=>{
                db.collection("users").doc(auth.currentUser.uid).set({
                    Email: username, 
                    Name: name,
                    Surname : lastname,
                    Status: status,
                    Phone_number: cnumber,
                    Gender: gender,
                    SA_ID_Num : idNum,
                    
        
        
        
                },merge=true).then(()=>{
                    swal("Success!", "Welcome To The Taxi Rank App, Account is now active", "success")
                    setTimeout(()=>{
                        window.location.reload();
                      },2000)
        
                })
                
            });
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

function login()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("passw").value;

    auth.signInWithEmailAndPassword(username,password).then(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                db.collection("users").doc(user.uid).get().then((info)=>{
                    if(info.data().Status=="Commuter")
                    {
                        window.location.href="site/commuterHome.html";
                    }if(info.data().Status=="Admin")
                    {
                        window.location.href="site/admin/user.html";

                    }if(info.data().Status=="Driver")
                    {
                        window.location.href="site/driver/driverbookings.html";

                    }
                    
                })
                
               
            }
            
           
        
        })
        
        
    })
    .catch(function(error){
        swal("User Login Error", "Wrong Login Credentials", "error");
    })

            
}

function selectUsers()
{
  db.collection('users').onSnapshot((AllRecords)=>{
      
    var count=1;
      
      const list = document.getElementById("showusers")
      var div =""
      var html =""
      
      AllRecords.forEach(
          (CurrentRecord)=>
          {
              if(CurrentRecord.data().Status=="Commuter")
          {

              div =`
              <tr>
              <td>${count++}</td>          
<td>${CurrentRecord.data().Name} ${CurrentRecord.data().Surname} </td>

<td>${CurrentRecord.data().Email}</td>
<td>${CurrentRecord.data().Phone_number}</td>
<td>${CurrentRecord.data().SA_ID_Num}</td>
<td>${CurrentRecord.data().Gender}</td>

<td>${CurrentRecord.data().Status}</td>




<td><button data-toggle="modal" data-target="#myModal" class="btn btn-secondary" id="btnUpd" onclick="viewUser('${CurrentRecord.id}')">Update</button></td>

            

<td><a href="#" class="btn" id="btnDel" onclick="deleteUser('${CurrentRecord.id}')">Delete</a></td>

</tr>
              `
             html+=div
             list.innerHTML=html
          }
        }

      );

  });
}
var viewItem =""

function viewUser(id)
{
    db.collection("users").doc(id).get().then((info)=>{
        //get values from database
       
        document.getElementById("name").value=info.data().Name +" "+ info.data().Surname ;
        document.getElementById("uemail").value=info.data().Email;
        document.getElementById("uphone").value=info.data().Phone_number;
        document.getElementById("idnum").value=info.data().SA_ID_Num;
        

        viewItem=id;

       
    })
}



function updateUdetails()
{
    var newEmail = document.getElementById("uemail").value;
    var newPhone = document.getElementById("uphone").value;
  
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneno =  /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;
    
    
    if(newPhone!=""&&newEmail!="")
    {
     
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
           
            db.collection("users").doc(viewItem).update({
       
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


function deleteUser(id)
{
    swal({
        title: "Are you sure you want to delete user?",
        
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {

        
        if (willDelete) {
            willDelete=db.collection("users").doc(id).delete()
          swal("User has been deleted!", {
            icon: "success",
          });
        } else {
          swal("User not deleted");
        }
      });



 

}


function exportHTML()
{
    var allRows = document.getElementById('userss').rows;
    for (var i=0; i< allRows.length; i++) {
      allRows[i].deleteCell(-1);
      allRows[i].deleteCell(-1); 
      
    }
       var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
       var footer = "</body></html>";
       var sourceHTML = header+document.getElementById("reportUsers").innerHTML+footer;

   
       
       var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
       var fileDownload = document.createElement("a");
       document.body.appendChild(fileDownload);
       fileDownload.href = source;
       fileDownload.download = 'document.doc';
       fileDownload.click();
       document.body.removeChild(fileDownload);

       window.location.reload()

    }


function applyDriver()
{
    
    var username = document.getElementById("d_email").value;
    var password = document.getElementById("pw").value;
    
    var name = document.getElementById("fname").value;
    var lastname = document.getElementById("lname").value;
    
    
    var numPlate = document.getElementById("numplate").value;
    var cnumber = document.getElementById("uphone").value;
    var city = document.getElementById("city").value;
    var time = document.getElementById("time").value;
   
   
    var country = document.getElementById("country").value;
    var cap = document.getElementById("taxicapacity").value;
    
    
    var status = "Driver";
  

    var validName = /^[A-ZA-z]+$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneno =  /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;
   
    
    if(name!=""&&lastname!=""&&username!=""&&password!=""&&cnumber!=""&&numPlate!="")
    {
     
        if (!validName.test(name))
        {
          swal("Input Error", "Invalid name, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
        if(numPlate.length>8)
        {
            swal("Input Error", "Invalid number plate", "error");         
        return false;

        }

        if (!cnumber.match(phoneno)) 
        {
          swal("Input Error", "Invalid phone number", "error"); 
          return false;
        }
        if (!validName.test(lastname))
        {
          swal("Input Error", "Invalid Surname, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
        
      
        if (!username.match(mailformat)) 
        {
          swal("Input Error", "Invalid email address", "error"); 
          return false;
        }
        if(password.length<6)
        {
          swal("Input Error", "6 characters or more are required for password", "error"); 
          return false;
        }
      

      else
      {
        {
           
            auth.createUserWithEmailAndPassword(username,password).then(()=>{
                db.collection("users").doc(auth.currentUser.uid).set({
                    Email: username, 
                    Name: name,
                    Surname : lastname,
                    Status: status,
                    Phone_number: cnumber,
                    Number_Plate: numPlate,
                    
                    City : city,
                    Country : country,
                    
                }).then(()=>{
                  db.collection("taxis").add({
                    Number_Plate: numPlate,
                    AssignedTrip: "N/A",
                          
                    City : city,
                     DriverName : name,
                     DriverPhone :cnumber,                 
                    DrivrerSurname :lastname,                 
                     Number_Plate:numPlate,                 
                    TimeOfTrip: time,                 
                      TripDate : "N/A"  ,      
                      numPassenger  : "0" ,
                      Capacity : cap,
                      Approval : "Pending",
        
                      Status: "Not Departed",        
                      taxiDriverid :auth.currentUser.uid
        
                })
         
                },merge=true).then(()=>{
                    swal("Success!", "Your Application is under review", "success")
                    setTimeout(()=>{
                        window.location.reload();
                      },2000)
        
                })
                
            });
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

