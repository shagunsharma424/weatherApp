import React, {useState,useEffect} from "react"
import "./WeatherApp.css"
export default function WeatherPage() {

    const [apiData, setapiData] = useState({})
    const [show, setshow] = useState(false)
    const [searchedData, setsearchedData] = useState("Delhi")
    
    // useEffect(() => {
    //     fecthApiData(searchedData)
    // }, [searchedData])

    const handleSearchedData=(event)=>{
        setsearchedData(event?.target?.value)
    }

    async function fecthApiData(searchedData){
            if(searchedData==""){setshow(false);return}   
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${searchedData}&appid=a4d1db1215c1340c0309d0250519cabd&units=metric`
            let result=await fetch(url)
            result=await result?.json()
            if(result?.message=="city not found"){
                setshow(false)
                return
            }
            setshow(true)
            setapiData(result)
            console.log("result",result)
    }

    function convertUnixToLocalTime(unixTimestamp, timezoneOffsetSeconds) {
    // Convert the Unix timestamp (UTC) to milliseconds
    const utcTime = new Date(unixTimestamp * 1000);
    const localTime = new Date(utcTime.getTime() + timezoneOffsetSeconds * 1000);  // Adjust the time by adding the timezone offset (in seconds, converted to milliseconds)
    let hours = localTime.getUTCHours(); // Get hours
    const minutes = localTime.getUTCMinutes().toString().padStart(2, '0'); // Get minutes
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
    }

    const handleKeyDown = (event) => {
        if (event?.key === 'Enter') {
            fecthApiData(searchedData)
        }
      };

    const WeatherData=()=>{
        return(
<           div>                   
                <img className="weatherIcon animate__pulse animate__animated animate__infinite mb-0" src={`${(apiData?.weather?.[0]?.main.toLowerCase())}.png`}/>
                <div className=" w-50 m-auto justify-content-start d-flex flex-column">
                    <p className=" mt-3"><i class="fas fa-temperature-low"></i>{Math.ceil(apiData?.main?.temp)}<sup>&#176;C</sup></p>
                    <p className=" "><i class="fas fa-tint"></i>{apiData?.main?.humidity}%</p>
                    <p><i class="fas fa-wind"></i> <span>{Math.ceil(apiData?.wind?.speed*3.6)}Km/h</span></p>
                    <p className=" "><i class="fas fa-sun"></i>{convertUnixToLocalTime(apiData?.sys?.sunrise, apiData?.timezone)}</p>
                    <p><i class="fas fa-cloud-moon"></i><span>{convertUnixToLocalTime(apiData?.sys?.sunset, apiData?.timezone)}</span></p>
                </div>     
            </div>
        )
    }

     console.log("setshow",show)
    
    return(<>
        <div class="container px-1 px-sm-4 py-5 mx-auto">
            <div class="row d-flex justify-content-center  rounded-lg">
                <div class="card text-center border-0 pt-4 px-4">
                    {/* Search filed */}
                    <div class="searchBarMainOutline input-group mb-5 ">
                        <input onKeyDown={handleKeyDown}  type="text"  class="searchBar "  placeholder="Enter city here" onChange={handleSearchedData} value={searchedData}/>
                        <div class="input-group-append"><button class="btn" onClick={()=>{fecthApiData(searchedData)}} type="button"><i class="fas fa-search text-white"></i></button></div>
                    </div>

                    {/* Weather data */}
                    {show?<WeatherData/> :<img src="404.png" className="mb-3"/>}
                </div>
            </div>
        </div>
    </>)
}


            