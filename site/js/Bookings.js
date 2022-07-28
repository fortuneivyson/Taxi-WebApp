function preBook()
{
   
    var taxiNumPlate = document.getElementById("availableTaxis").value;
    var numP = document.getElementById("numPersons").value;

    if(taxiNumPlate=="")
    {
        swal("Taxi Selection Error", "You need to choose an available taxi", "error");
          
          
        return false;
    }
    if(taxiNumPlate!="")
    {

   

    db.collection("taxis").where("Number_Plate", "==", taxiNumPlate)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            
            docuid =doc.id;
            console.log(docuid);
            //get the current passenger value
            console.log(doc.data().numPassenger);
            console.log(doc.data().Capacity);
            newNumP = parseInt(numP)+ parseInt(doc.data().numPassenger);
            spacesleft = 0;
            spacesleft=parseInt(doc.data().Capacity)-parseInt(doc.data().numPassenger)


            if(newNumP>parseInt(doc.data().Capacity))
        {
            swal("Taxi Booking Error","This taxi can only carry up to "+(doc.data().Capacity)+" people, "+ spacesleft+" spaces left please wait for the next available taxi","error")
        }
        else
        {
            bookTaxi()

        }
        
           
        
    })
            
        
        })
    }
}
function bookTaxi()
{


    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var bookingDateTime = date+' '+time;

    var tripTime = document.getElementById("timetrip").value;
    var tripDate = date;
    var registeredName ;
    var userName;
    var phone = document.getElementById("phone").value;
    var loc = document.getElementById("departure").value;
    var phyAddress = document.getElementById("pickup").value;
    var taxiAmt = document.getElementById("taxiFare").value;
    var notess = document.getElementById("notes").value;
    var totFare = document.getElementById("check-amt").innerHTML;
    var numP = document.getElementById("numPersons").value;
    var taxiNumPlate = document.getElementById("availableTaxis").value;
    var newNumP=0;
    var keenname = document.getElementById("nextname").value;
    var exp = document.getElementById("expiration-date").value;
    var cvv = document.getElementById("cvv").value;
    var keenphone = document.getElementById("nextphone").value;
    var card = document.getElementById("cardno").value;
    var nameC = document.getElementById("namecard").value;
    var phoneno =  /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;
    var validName = /^[A-ZA-z]+$/;
    var cardnoFmtVisa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

    
    var docuid;
    let ref=(Date.now() + Math.random());
    
    
    if(phone!=""&&keenname!=""&&keenphone!=""&&loc!=""&&phyAddress!=""&&tripTime!=""&&nameC!=""&&exp!=""&&cvv!="")
    {
      
        if (!validName.test(keenname))
        {
          swal("Input Error", "Invalid keen name, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
        if (!validName.test(nameC))
        {
          swal("Input Error", "Invalid name on card, ensure the are white spaces and no digits", "error");
          
          
        return false;
  
        }
        if(!card.match(cardnoFmtVisa))
            {
                swal("Card Number Error","Not a valid Visa/Mastercard credit card number!","error");
                return false;
            }
  
        
        
        
  
        if (!keenphone.match(phoneno)) 
        {
          swal("Input Error", "Invalid phone number for next of keen", "error"); 
          return false;
        }
        else
        {
    
        
        auth.onAuthStateChanged((user)=>{
    
            if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
    
                userName = info.data().Email;
                registeredName = info.data().Name +" "+ info.data().Surname;
                
                
    
            db.collection("taxiBookings").add({
                User_Name:userName,
                NameOfCommuter: registeredName,
                DateBookingMade : bookingDateTime,
                DateOfTrip: tripDate,   
                TimeOfTrip: tripTime,
                Phone : phone,
                From_To : loc,
                TaxiReg : taxiNumPlate, 
                PickUpPoint : phyAddress,
                TaxiFare : taxiAmt,
                TotalTaxiFare : totFare,
                NumberOfCommuters : numP,
                DriverNotes : notess,
                NextOfKeen : keenname,
                KeenNumber : keenphone, 
                IDbooking:user.uid,
                Ref : ref
            }).then(()=>{
               //get the exact doc id of the taxi where the number plate on the select box is equal to the one on db 
                db.collection("taxis").where("Number_Plate", "==", taxiNumPlate)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                
                
                docuid =doc.id;
                console.log(docuid);
                //get the current passenger value
                console.log(doc.data().numPassenger);
                console.log(doc.data().Capacity);
                newNumP = parseInt(numP)+ parseInt(doc.data().numPassenger);
                spacesleft = 0;
                spacesleft=parseInt(doc.data().Capacity)-parseInt(doc.data().numPassenger)
    
    
            
                db.collection("taxis").doc(docuid).update({
                    numPassenger:  newNumP,
                  
                })
            });
        })
                
            
            }).then(()=>{
                    swal("Payment Completed","Your Booking has been made, Ref: "+ref, "success");
                    sendEmail();
                    
                    setTimeout(()=>{
                        window.location.href="mytrips.html"
                    },2000)
                });
            
            })
           
    
    }
    
        
    })
    
    
    }
        

    }
    else
{

 swal("Missing Input","All Fields Are Required", "warning");
 return false;

 
}
 

}   
        
function availTaxis()
{
 var taxis=[];

 while ((document.getElementById('availableTaxis')).options.length > 0) {
    (document.getElementById('availableTaxis').remove(0));
    }
 
 db.collection('taxis').onSnapshot((AllRecords)=>{
   
    AllRecords.forEach(
        (CurrentRecord)=>
        {
          if(document.getElementById("departure").value==CurrentRecord.data().AssignedTrip)
          {
          
            taxis.push(CurrentRecord.data().Number_Plate)

        
           
        }
       
      }
      
      
    );
    var pickUpSelect = document.getElementById('availableTaxis');
   
    console.log(taxis)
     for (var x=0;x<taxis.length;x++)
     {
   
        pickUpSelect.options[pickUpSelect.options.length] = new Option(taxis[x], taxis[x]);

     }

});
} 


function loadPhone()
{
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
           
                document.getElementById("phone").value=info.data().Phone_number;
   
        })
    }
    })
    
}
function sendEmail()
{
    var Username ;
    
    var Umessage;
    
    var loc = document.getElementById("departure").value;
    var phyAddress = document.getElementById("pickup").value;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var tripDate = date;
    

    const serviceID = 'default_service';
   const templateID = 'template_tap0zgk';
    

    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
           
                Username=info.data().Name +" "+ info.data().Surname ;
                Umessage= Username + " has just made a booking trip ("+loc+") on "+tripDate+" to be picked up at "+phyAddress;
   

                function sending(Username,Umessage)
                {
                    emailjs.send('default_service','template_hsvqdtv',{
                        to_name:"Admin", from_name:Username, message:Umessage
                    })//.then(()=>{
                        //alert("Message sent")
             
                   // })
                }
             
             sending(Username,Umessage);
             


        })
    }
    })
    


    

   
  
}