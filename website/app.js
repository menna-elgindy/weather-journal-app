/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=3ad22056b4e37d3e916f7e6153ed9541&units=imperial';// Personal API Key for OpenWeatherMap API
const generateBtn = document.querySelector("#generate");
const zipCode = document.querySelector("#zip");
const userInput = document.querySelector("#feelings");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const resData = await response.json();
      return resData
    }catch(error) {
     // appropriately handle the error
    console.log("error", error);
    }
}

/*GET request to the OpenWeatherMap API*/
generateBtn.addEventListener("click",APIReq);

async function APIReq(){
 let CurrentZipCode = zipCode.value;
 let URL = baseURL+CurrentZipCode+apiKey;
 const res = await fetch (URL);

 try{
 		const data = await res.json();
 		const currentTemp = data.main.temp;
 		const newData ={temperature:currentTemp , date:newDate , userResponse:userInput.value};
 		const res1 = await postData('/postData',newData);
 		 await UpdateUI();

 }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }

}

/*Update the UI dynamically*/

async function UpdateUI(){
	 const getResponse = await fetch('/getData');//fetch the data from the app endpoint
  try{
    const allData = await getResponse.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = Math.round(allData.temperature)+ ' degrees';
    document.getElementById('content').innerHTML = allData.userResponse;

  }catch(error){
    console.log("error", error);
    // appropriately handle the error
  }
}


