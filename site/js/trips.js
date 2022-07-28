

function displayTrips()
{
    
    auth.onAuthStateChanged((user)=>{

        if(user){
          db.collection("users").doc(user.uid).get().then((info)=>{

                    db.collection("taxiBookings").where("IDbooking", '==',user.uid).onSnapshot((have)=>{
                        const list =document.getElementById("tbody_mytrips")
                        var div ="";
                        var html ="";

                        have.forEach((CurrentRecord)=>{

                            div=`
                            <tr>
                          <td>${CurrentRecord.data().NameOfCommuter}<span>&nbsp;</span><span>&nbsp;</span></td> 
                          <td>${CurrentRecord.data().User_Name}<span>&nbsp;</span><span>&nbsp;</span></td>
                          <td>R${CurrentRecord.data().TotalTaxiFare}<span>&nbsp;</span><span>&nbsp;</span></td>
                          <td>${CurrentRecord.data().NumberOfCommuters}<span>&nbsp;</span><span>&nbsp;</span></td>
                          
                          <td>${CurrentRecord.data().DateOfTrip}<span>&nbsp;</span><span>&nbsp;</span></td>
                          <td>${CurrentRecord.data().TimeOfTrip}<span>&nbsp;</span><span>&nbsp;</span></td>
                          <td>${CurrentRecord.data().From_To}<span>&nbsp;</span><span>&nbsp;</span></td>
                          <td>${CurrentRecord.data().PickUpPoint}<span>&nbsp;</span><span>&nbsp;</span></td>
                          <td>${CurrentRecord.data().TaxiReg}<span>&nbsp;</span><span>&nbsp;</span></td>
                          <td>${CurrentRecord.data().Ref}<span>&nbsp;</span><span>&nbsp;</span></td>
                          
                          
                           </tr>
                      `                           
                            html += div
                         
                              list.innerHTML =html
                        
		            })
                

	            })
            })
        }
       
    })
   
}

function filterBydate()
{
  db.collection('taxiBookings').onSnapshot((AllRecords)=>{
      const list = document.getElementById("tbody_mytrips")
      var div =""
      var html =""
      AllRecords.forEach(
          (CurrentRecord)=>
          {
            if(CurrentRecord.data().DateOfTrip==document.getElementById("dateflt").value)
            {
            

              div =`
              <tr>
              <td>${CurrentRecord.data().NameOfCommuter}<span>&nbsp;</span><span>&nbsp;</span></td> 
              <td>${CurrentRecord.data().User_Name}<span>&nbsp;</span><span>&nbsp;</span></td>
              <td>R${CurrentRecord.data().TotalTaxiFare}<span>&nbsp;</span><span>&nbsp;</span></td>
              <td>${CurrentRecord.data().NumberOfCommuters}<span>&nbsp;</span><span>&nbsp;</span></td>
              
              <td>${CurrentRecord.data().DateOfTrip}<span>&nbsp;</span><span>&nbsp;</span></td>
              <td>${CurrentRecord.data().TimeOfTrip}<span>&nbsp;</span><span>&nbsp;</span></td>
              <td>${CurrentRecord.data().From_To}<span>&nbsp;</span><span>&nbsp;</span></td>
              <td>${CurrentRecord.data().PickUpPoint}<span>&nbsp;</span><span>&nbsp;</span></td>
              <td>${CurrentRecord.data().Ref}<span>&nbsp;</span><span>&nbsp;</span></td>

            </tr>
              `
             html+=div
             list.innerHTML=html
          }
          
        }
      );

  });
}