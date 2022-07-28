function SelectAllBookings()
{

    var count=1;
  db.collection('taxiBookings').onSnapshot((AllRecords)=>{
      const list = document.getElementById("taxibookingss")
      var div =""
      var html =""
      AllRecords.forEach(
          (CurrentRecord)=>
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
            <td>${CurrentRecord.data().TotalTaxiFare}</td>
           <td>${CurrentRecord.data().PickUpPoint}</td>
           
           
<td><button data-toggle="modal" data-target="#myModal2" class="btn btn-secondary" onclick="viewEachBooking('${CurrentRecord.id}')">More Details</button></td>

           </tr>
              
              `
     
             html+=div
             list.innerHTML=html
          }
          
        
      );
               

  });
}
function deleteOldBookings()
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    db.collection('taxiBookings').onSnapshot((AllRecords)=>{
      
       
          
          AllRecords.forEach(
              (CurrentRecord)=>
              {
                if(!(CurrentRecord.data().DateOfTrip==date))
                {
    
                    db.collection("taxiBookings").doc(CurrentRecord.id).delete()
                    console.log(CurrentRecord.id)
          
            }
              }
    
          );
         
    
      });
     
}
function resetTotNumP()
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    db.collection('taxis').onSnapshot((AllRecords)=>{
      
       
          
          AllRecords.forEach(
              (CurrentRecord)=>
              {
                if(!(CurrentRecord.data().TripDate==date))
                {
    
                    db.collection("taxis").doc(CurrentRecord.id).update({
                        numPassenger:  "0",
                      
                    })
          
            }
              }
    
          );
         
    
      });
     
}

var viewItem =""
function viewEachBooking(id)
{
    db.collection("taxiBookings").doc(id).get().then((info)=>{
        //get values from database
       
        document.getElementById("nextofkeen").innerHTML=info.data().NextOfKeen;
        document.getElementById("nextofkeennumber").innerHTML=info.data().KeenNumber;
        

        viewItem=id;
    })
}
