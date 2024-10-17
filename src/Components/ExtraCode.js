  {/* 5days data-? */}
          
            {/* <div class="row d-flex px-3 mt-auto">
                    <div class="d-flex flex-column block first-block">
                        <small class="text-muted mb-0">MON</small>
                        <div class="text-center"><img class="symbol-img" src="https://i.imgur.com/BeWfUuG.png"/></div>
                        <h6><strong>-30&#176;</strong></h6>
                    </div>   */}
                {/* <div class="d-flex flex-column block first-block">
                    <small class="text-muted mb-0">MON</small>
                    <div class="text-center"><img class="symbol-img" src="https://i.imgur.com/BeWfUuG.png"/></div>
                    <h6><strong>-30&#176;</strong></h6>
                </div> */}
                {/* <div class="d-flex flex-column block">
                    <small class="text-muted mb-0">TUE</small>
                    <div class="text-center"><img class="symbol-img" src="https://i.imgur.com/Shrg84B.png"/></div>
                    <h6><strong>-29&#176;</strong></h6>
                </div>
                <div class="d-flex flex-column block active">
                    <small class="text-muted mb-0">WED</small>
                    <div class="text-center"><img class="symbol-img" src="https://i.imgur.com/Shrg84B.png"/></div>
                    <h6><strong>-34&#176;</strong></h6>
                </div>
                <div class="d-flex flex-column block">
                    <small class="text-muted mb-0">THU</small>
                    <div class="text-center"><img class="symbol-img" src="https://i.imgur.com/BeWfUuG.png"/></div>
                    <h6><strong>-30&#176;</strong></h6>
                </div>
                <div class="d-flex flex-column block last-block">
                    <small class="text-muted mb-0">FRI</small>
                    <div class="text-center"><img class="symbol-img" src="https://i.imgur.com/BeWfUuG.png"/></div>
                    <h6><strong>-30&#176;</strong></h6>
                </div> */}
            {/* </div> */}



            // Big temperature
 {/* <h6 className=" ">{apiData?.weather?.[0].main}</h6> */}


//  Search via coordinates
// async function fecthApiData(searchedData){

//     let latData= 28.459497
//     let longData=77.026634
//       const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchedData}&format=json`)
//       const data = await response.json();
//       if (data.length > 0) {
//         latData= data[0].lat
//         longData= data[0].lon 
//       } else {
//         // Delhi coords
//          latData= 28.459497
//          longData=77.026634
//       }

//         console.log("latData",latData,"longData",longData)
//         const url=`https://api.openweathermap.org/data/2.5/weather?q=${searchedData}&appid=a4d1db1215c1340c0309d0250519cabd&units=metric`
//         // const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latData}&lon=${longData}&appid=a4d1db1215c1340c0309d0250519cabd&units=metric`
       
//         let result=await fetch(url)
//         result=await result?.json()
//         if(result?.message=="city not found")
//         {
//             setshow(false)
//             return
//         }
//         setshow(true)
//         setapiData(result)
//         console.log("result",result)
// }

{/* <div className=" w-50 m-auto justify-content-start d-flex flex-column">
<p className=" mt-3"><i class="fas fa-temperature-low"></i>{Math.ceil(apiData?.main?.temp)}<sup>&#176;C</sup></p>
<p className=" "><i class="fas fa-tint"></i>{apiData?.main?.humidity}%</p>
<p><i class="fas fa-wind"></i> <span>{Math.ceil(apiData?.wind?.speed*3.6)}Km/h</span></p>
<p className=" "><i class="fas fa-sun"></i>{convertUnixToLocalTime(apiData?.sys?.sunrise, apiData?.timezone)}</p>
<p><i class="fas fa-cloud-moon"></i><span>{convertUnixToLocalTime(apiData?.sys?.sunset, apiData?.timezone)}</span></p>
</div>    */}