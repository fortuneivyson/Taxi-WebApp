function SelectDriverBookings()
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    console.log(date)
    var numP;

    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                numP=info.data().Number_Plate;
            
                console.log(numP)

                    
    var count=1;
    db.collection('taxiBookings').onSnapshot((AllRecords)=>{
        const list = document.getElementById("taxibookingss")
        var div =""
        var html =""
        AllRecords.forEach(
            (CurrentRecord)=>
            {
              if(CurrentRecord.data().TaxiReg==numP && CurrentRecord.data().DateOfTrip==date)
              {
           
                div=`
                <tr>
                <td>${count++}</td>
                <td>${CurrentRecord.data().NameOfCommuter}</td>
             <td>${CurrentRecord.data().User_Name}</td>
              <td>${CurrentRecord.data().Phone}</td>
            <td>${CurrentRecord.data().From_To}</td>
            <td>${CurrentRecord.data().DateOfTrip}</td>
               <td>${CurrentRecord.data().TimeOfTrip}</td>
               <td>${CurrentRecord.data().NumberOfCommuters}</td>
              <td>${CurrentRecord.data().TotalTaxiFare}</td>
             <td>${CurrentRecord.data().PickUpPoint}</td>
             
             
  <td><button data-toggle="modal" data-target="#myModal2" class="btn btn-secondary" onclick="viewEachBooking('${CurrentRecord.id}')">More Details</button></td>
  
             </tr>
                
                `
       
               html+=div
               list.innerHTML=html
            }
            
          }
        );
                 
  
    });

        })
    }
    })


}

function displayDriverInfo()
{
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                
              document.getElementById("driveruserame").value=firebase.auth().currentUser.email;
              

                document.getElementById("driveremail").value=info.data().Email;
                document.getElementById("drivername").value=info.data().Name;
                
                document.getElementById("phone").value=info.data().Phone_number;
                
                document.getElementById("driversurname").value=info.data().Surname;
                document.getElementById("numplate").value=info.data().Number_Plate;
               

        })
    }
    })
   
    
}

function signout()
{
    auth.signOut().then(()=>{
        window.location.href="../../index.html";
        
    }).catch(function(error){
        swal("User Login Error", "Could not sign not", "error");
    })

}

function updateDriver()
{
   

    var newEmail=document.getElementById("driveremail").value;
    var newName = document.getElementById("drivername").value;
    var newPhone = document.getElementById("phone").value;
    var newSurn = document.getElementById("driversurname").value;

    db.collection("users").doc(viewItem).update({
      Email : newEmail,
         Surname:newSurn,             
     Name: newName,                 
       Phone_number : newPhone ,    
    }, merge=true).then(()=>{
        swal("Updated","Driver details updated","success")
        setTimeout(()=>{
          window.location.reload();
        },2000)
        
    })

}

function updateD()
{
    
    var newEmail=document.getElementById("driveremail").value;
    var newName = document.getElementById("drivername").value;
    var newPhone = document.getElementById("phone").value;
    var newSurn = document.getElementById("driversurname").value;

   
    var validName = /^[A-ZA-z]+$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneno =  /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;
    
    
    if(newName!=""&&newSurn!=""&&newPhone!=""&&newEmail!="")
    {
      
        if (!validName.test(newName))
        {
          swal("Input Error", "Invalid name, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
        if (!validName.test(newSurn))
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
              Surname: newSurn,
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



function markTaxiDeparted()
{
    var numP;
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
        
                numP=info.data().Number_Plate;
        
        //get the exact doc id of the taxi where the number plate on the select box is equal to the one on db 
         db.collection("taxis").where("Number_Plate", "==", numP)
 .get()
 .then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
         
         
         docuid =doc.id;

         db.collection("taxis").doc(docuid).update({
            Status: "Departed",
            
            
           
         }).then(()=>{
            swal("Success","Taxi Confirmed as Departed ","success")
         })
     });
 })
})
        }  
  })
}

function completeTrip()
{
 

var numP;
auth.onAuthStateChanged((user)=>{
    if(user){
        db.collection("users").doc(user.uid).get().then((info)=>{
    
            numP=info.data().Number_Plate;
        
            console.log(numP)

    //get the exact doc id of the taxi where the number plate on the select box is equal to the one on db 
                db.collection("taxis").where("Number_Plate", "==", numP)
            .get()
            .then((querySnapshot)=> {
            querySnapshot.forEach(function(doc) {
   
     docuid =doc.id;

        db.collection("taxis").doc(docuid).update({
          Status: "Not Departed", 
            AssignedTrip:"N/A",            
            TimeOfTrip: "N/A",                 
              TripDate : "N/A" ,
              numPassenger:"0",
       
     }).then(()=>{
        swal("Success","Trip Completed ","success")
     })
 });
})
})
    }  
})

}

function getPassengers()
{
    var numP;
auth.onAuthStateChanged((user)=>{
    if(user){
        db.collection("users").doc(user.uid).get().then((info)=>{
    
            numP=info.data().Number_Plate;
        
            console.log(numP)

    //get the exact doc id of the taxi where the number plate on the select box is equal to the one on db 
                db.collection("taxis").where("Number_Plate", "==", numP)
            .get()
            .then((querySnapshot)=> {
            querySnapshot.forEach(function(doc) {
   
     docuid =doc.id;

     db.collection("taxis").doc(docuid).get().then((info)=>{
        //get values from database
       
        document.getElementById("tot").innerHTML=info.data().numPassenger;
        
 
       
     })
 });
})
})
    }  
})
}


