var d = new Date()


var medchal = document.getElementById("medchal")

var today = "";
function findToday(){
    date = d.getDate()
    month = d.getMonth()+1
    year = d.getFullYear()
    if(date<=9)
        date = "0"+date
    if(month<=9)
        month = "0"+month
    today = date+"-"+ month+"-"+year
    return today ;
}

var result=""
function getVaccines(district_id,req){
    
    var url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+district_id +"&date="+today;
    req.open("GET",url)

    req.send();

    req.onload = function(){
        if(req.status==200){
            var res = JSON.parse(req.response);
            var totalCenters = res.centers.length;
            // console.log(res)
            var centers = res.centers;
            result="";
            for(var i=0;i<totalCenters;i++){
                
                var cemter_id =centers[i].center_id;
                var name = centers[i].name;
                var address = centers[i].address;
                var block_name = centers[i].block_name;
                var district_name = centers[i].district_name;
                var fee_type = centers[i].fee_type;
                var name = centers[i].name;
                var pincode = centers[i].pincode;
                var state_name = centers[i].state_name;

                var sl = centers[i].sessions.length;

                for(var j=0;j<sl;j++){
                    var sessions = centers[i].sessions[j];
                    var date = sessions.date;
                    var available_capacity = sessions.available_capacity;
                    var available_capacity_dose1 = sessions.available_capacity_dose1;
                    var available_capacity_dose2 = sessions.available_capacity_dose2;
                    var date = sessions.date;
                    var min_age_limit = sessions.min_age_limit;
                    var slots = sessions.slots;
                    var vaccine = sessions.vaccine;

                    var space ="\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
                    if(vaccine=="COVAXIN" && min_age_limit==45 && available_capacity_dose2>0){
                        result+= name  + space+ date + space+fee_type +"<br>";
                    }
                    
                }
            }
            
        }
    }

    return result;
}


var req2 = new XMLHttpRequest();

var resultMed =""

var prevResultMed="";

function hit(){
    resultMed = getVaccines(596,req2);

    medchal.innerHTML=resultMed;

    // console.log(resultMed)
    // console.log(prevResultMed)
    if(resultMed!=prevResultMed){
        Email.send({
            Host : "smtp.gmail.com",
            Username : "randomvaccine21@gmail.com",
            Password : "Random@21",
            To : 'sakethpavan21@gmail.com',
            From : "randomvaccine21@gmail.com",
            Subject : "Medchal Vaccine Centers",
            Body : resultMed
            }).then(
            message => {console.log("success Medchal")
                        }
        );

        prevResultMed=resultMed;
    }
}
  
console.log("Script Loaded")
findToday();
hit()
setInterval(findToday,1000*60*3);
setInterval(hit,1000*60*3);
