function addDriver()
{
  var username = document.getElementById("d_email").value;
  var password = document.getElementById("pw").value;
  
  var name = document.getElementById("fname").value;
  var lastname = document.getElementById("lname").value;
  
  
  var numPlate = document.getElementById("numplate").value;
  var cnumber = document.getElementById("phone").value;
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
      if(numPlate.length!=8)
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
                    Approval : "Approved",
      
                    Status: "Not Departed",        
                    taxiDriverid :auth.currentUser.uid
      
              })
       
              },merge=true).then(()=>{
                  swal("Success!", "Taxi Succesfully added", "success")
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

function addAdmin()
{
  var username = document.getElementById("ademail").value;
  var password = document.getElementById("pword").value;
  
  var name = document.getElementById("adname").value;
  var lastname = document.getElementById("adsurname").value;
  
  var status = "Admin";
    
    
    

    var validName = /^[A-ZA-z]+$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
    
    
    if(name!=""&&lastname!=""&&username!=""&&password!="")
    {
      
     
     
        if (!validName.test(name))
        {
          swal("Input Error", "Invalid name, ensure the are white spaces and no digits", "error");
          
          
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
            
            
        },merge=true).then(()=>{
            swal("Success!", "New Admin has been added", "success")
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

function displayAdminInfo()
{
    auth.onAuthStateChanged((user)=>{
        if(user){
          console.log(firebase.auth().currentUser.email)
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                
              document.getElementById("adminuserame").value= firebase.auth().currentUser.email;
              

                document.getElementById("adminemail").value=info.data().Email;
                document.getElementById("adminname").value=info.data().Name;
                
                
                
                document.getElementById("adminsurname").value=info.data().Surname;
               

        })
    }
    })
   
    
}

function updateAdmindetails()
{
  var name = document.getElementById("adminname").value;
  var lastname =  document.getElementById("adminsurname").value;
  
  var username = document.getElementById("adminemail").value;
   

    

    var validName = /^[A-ZA-z]+$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
    
    
    if(name!=""&&lastname!=""&&username!="")
    {
      
     
     
        if (!validName.test(name))
        {
          swal("Input Error", "Invalid name, ensure the are white spaces and no digits", "error");
          
          
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
      

      else
      {
        {
           
          db.collection("users").doc(auth.currentUser.uid).update({
              Name: name,
              Surname: lastname,
              Email: username,
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
function signout()
{
    auth.signOut().then(()=>{
        window.location.href="../../index.html";
        
    }).catch(function(error){
        swal("User Login Error", "Could not sign not", "error");
    })

}


function selectTaxis()
{
  db.collection('taxis').onSnapshot((AllRecords)=>{
      
    var count=1;
      
      const list = document.getElementById("showtaxis")
      var div =""
      var html =""
      
      AllRecords.forEach(
          (CurrentRecord)=>
          {
            if(CurrentRecord.data().Approval=="Approved")
            {
            

              div =`
              <tr>
              <td>${count++}</td>          
<td>${CurrentRecord.data().DriverName} ${CurrentRecord.data().DrivrerSurname} </td>
<td>${CurrentRecord.data().Number_Plate}</td>
<td>${CurrentRecord.data().City}</td>
<td>${CurrentRecord.data().AssignedTrip}</td>

<td>${CurrentRecord.data().TimeOfTrip}</td>
<td>${CurrentRecord.data().TripDate}</td>
<td>${CurrentRecord.data().numPassenger}</td>
<td>${CurrentRecord.data().Capacity}</td>
<td>${CurrentRecord.data().Status}</td>



<td><button data-toggle="modal" data-target="#myModal2" class="btn btn-secondary" onclick="viewEachTaxi2('${CurrentRecord.id}')">Assign Trip</button></td>

<td><button data-toggle="modal" data-target="#myModal" class="btn btn-secondary" onclick="viewEachTaxi('${CurrentRecord.id}')">Make Changes</button></td>

</tr>
              `
             html+=div
             list.innerHTML=html
          
        }
          }

      );
  

  });

}
function countRequests()
{
  db.collection('taxis').onSnapshot((AllRecords)=>{
      
    var numrec=0;
       
      AllRecords.forEach(
          (CurrentRecord)=>
          {
            if(CurrentRecord.data().Approval=="Pending")
            {

              numrec++;
     
        }
          }

      );
      document.getElementById("reqCount").innerHTML=numrec.toString();

  });

}

function selectUnapproved()
{
  db.collection('taxis').onSnapshot((AllRecords)=>{
      
    var count=1;
    var numrec=0;
      
      const list = document.getElementById("showrequests")
      var div =""
      var html =""
      
      AllRecords.forEach(
          (CurrentRecord)=>
          {
            if(CurrentRecord.data().Approval=="Pending")
            {

              numrec++;
            

              div =`
              <tr>
              <td>${count++}</td>          
<td>${CurrentRecord.data().DriverName} ${CurrentRecord.data().DrivrerSurname} </td>

<td>${CurrentRecord.data().DriverPhone}</td>


<td>${CurrentRecord.data().City}</td>
<td>${CurrentRecord.data().Number_Plate}</td>
<td>${CurrentRecord.data().Approval}</td>




<td><button data-toggle="modal" data-target="#myModal2" class="btn btn-secondary" onclick="viewEachTaxiReq('${CurrentRecord.id}')">Approve/Reject Taxi</button></td>



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

function viewEachTaxi(id)
{
    db.collection("taxis").doc(id).get().then((info)=>{
        //get values from database

        viewItem=id;
        
    })
}
function viewEachTaxi2(id)
{
    db.collection("taxis").doc(id).get().then((info)=>{
        //get values from database
       
        document.getElementById("operate").value=info.data().City;
        

        viewItem=id;
    })
}
function AssignTrip()
{
  var newOptime = document.getElementById("ttime").value;
  var operatingTrip = document.getElementById("operate").value;
  var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    db.collection("taxis").doc(viewItem).update({
      
          AssignedTrip:operatingTrip,            
     TimeOfTrip: newOptime,                 
       TripDate : date ,    
    }, merge=true).then(()=>{
        swal("Assigned","Trip Assigned ","success")
      //  setTimeout(()=>{
      //    window.location.reload();
      //  },2000)
        
    })


}
function delivered()
{
  db.collection("taxis").doc(viewItem).update({
      
    Status: "Not Departed", 
    AssignedTrip:"N/A",            
    TimeOfTrip: "N/A",                 
      TripDate : "N/A" ,
      numPassenger:"0",
       
}, merge=true).then(()=>{
  swal("Success","Taxi Confirmed as Delivered ","success")
//  setTimeout(()=>{
//    window.location.reload();
//  },2000)
  
})
}

function depart()
{
  db.collection("taxis").doc(viewItem).update({
      
    Status: "Departed", 
       
}, merge=true).then(()=>{
  swal("Success","Taxi Confirmed as Departed ","success")
//  setTimeout(()=>{
//    window.location.reload();
//  },2000)
  
})

}

function updateTaxi()
{
    var newOpcity =  document.getElementById("opcity").value;
    var newOptime = document.getElementById("optime").value;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 
    db.collection("taxis").doc(viewItem).update({
      City : newOpcity,
                      
     TimeOfTrip: newOptime,                 
       TripDate : date ,    
    }, merge=true).then(()=>{
        swal("Updated","Product details updated","success")
      //  setTimeout(()=>{
      //    window.location.reload();
      //  },2000)
        
    })

}

function selectDrivers()
{
  db.collection('users').onSnapshot((AllRecords)=>{
      
    var count=1;
      
      const list = document.getElementById("showdrivers")
      var div =""
      var html =""
      
      AllRecords.forEach(
          (CurrentRecord)=>
          {
              if(CurrentRecord.data().Status=="Driver")
          {

              div =`
              <tr>
              <td>${count++}</td>          
<td>${CurrentRecord.data().Name} ${CurrentRecord.data().Surname} </td>

<td>${CurrentRecord.data().Email}</td>
<td>${CurrentRecord.data().Phone_number}</td>
<td>${CurrentRecord.data().Country}</td>
<td>${CurrentRecord.data().City}</td>
<td>${CurrentRecord.data().Number_Plate}</td>
<td>${CurrentRecord.data().Status}</td>




<td><a href="#" class="btn" onclick="deleteDriver('${CurrentRecord.id}')">Delete</a></td>

</tr>
              `
             html+=div
             list.innerHTML=html
          }
        }

      );

  });
}
function selectAdmins()
{
  db.collection('users').onSnapshot((AllRecords)=>{
      
    var count=1;
      
      const list = document.getElementById("showadmins")
      var div =""
      var html =""
      
      AllRecords.forEach(
          (CurrentRecord)=>
          {
              if(CurrentRecord.data().Status=="Admin")
          {

              div =`
              <tr>
                   
<td>${CurrentRecord.data().Name}  </td>
<td>${CurrentRecord.data().Surname}</td>
<td>${CurrentRecord.data().Email}</td>
<td>${CurrentRecord.data().Status}</td>



<td><a href="#" class="btn" onclick="deleteAdmin('${CurrentRecord.id}')">Delete</a></td>

</tr>
              `
             html+=div
             list.innerHTML=html
          }
        }

      );

  });
}

function deleteAdmin(id)
{
    swal({
        title: "Are you sure you want to delete admin?",
        
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {

        
        if (willDelete) {
            willDelete=db.collection("users").doc(id).delete()
          swal("Admin has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Admin not deleted");
        }
      });



 

}
function deleteDriver(id)
{
    swal({
        title: "Are you sure you want to delete driver?",
        
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {

        
        if (willDelete) {
            willDelete=db.collection("users").doc(id).delete()
          swal("Driver has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Driver not deleted");
        }
      });



 

}


function exportHTML()
{
       var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
       var footer = "</body></html>";
       var sourceHTML = header+document.getElementById("reportdrivers").innerHTML+footer;
       
       var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
       var fileDownload = document.createElement("a");
       document.body.appendChild(fileDownload);
       fileDownload.href = source;
       fileDownload.download = 'document.doc';
       fileDownload.click();
       document.body.removeChild(fileDownload);
    }

    function viewEachTaxiReq(id)
{
    db.collection("taxis").doc(id).get().then((info)=>{
        //get values from database
       
        document.getElementById("taxiReg").value=info.data().Number_Plate;
        

        viewItem=id;
    })
}
    function decide()
    {
      
     var decision= document.getElementById("decide").value

      db.collection("taxis").doc(viewItem).update({
      
        Approval: decision, 
           
    }, merge=true).then(()=>{
      swal("Success","Decision Succesfully Submitted","success")
      setTimeout(()=>{
        window.location.reload();
     },2000)
      
    })
      
    }
