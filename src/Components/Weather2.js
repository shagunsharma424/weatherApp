import React, {useState,useEffect} from "react"
import "./WeatherApp2.css"
import { MagnifyingGlass } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Weather2() {

    const [apiData, setapiData] = useState([])
    const [show, setshow] = useState(false)
    const [searchedData, setsearchedData] = useState("Delhi")
    const date=new Date();
    const [sampleSearchData,setsampleSearchData]=useState(["122002","Kerala","Gurgaon - Delhi Expy, Sector 29 122007"])
    
    useEffect(() => {
        fecthApiData(searchedData)
    }, [])

    
    const handleSearchedData=(event)=>{
        setsearchedData(event?.target?.value)
    }

    const getLatLongFunctionFromApi = async (searchedData) => {
        try {
            setshow(true)
            let apiKey = 'AIzaSyBaUn22pwovCzOxH7Uthivbd8_ScMkaEAI';
            let baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchedData}&key=${apiKey}`;
            const response = await fetch(baseUrl);
            const data = await response?.json();
            
            if (data.status === 'OK') {
                const location = data.results[0].geometry.location;
                console.log("Location:", location);
                console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
                return location;
            } else {
                console.log('Error:', data.status);
                toast("Enter a valid city name, zip code, street name");
                setsearchedData("Delhi")
                return { lat: "28.459497", lng: "77.026634" }; // Default coordinates
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return { lat: "28.459497", lng: "77.026634" }; // Return default coordinates in case of error
        }
    };
    

    async function fecthApiData(searchedData) {
        if (searchedData === "") {
            toast("Enter a valid city name, zip code, street name");
            return;
        }
        try {
            setsampleSearchData((prev)=>[...prev,searchedData])
            const googleMapsApiResponse = await getLatLongFunctionFromApi(searchedData);
            console.log("Google Maps API response:", googleMapsApiResponse);
            const { lat, lng } = googleMapsApiResponse;
            let weatherDataApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=a4d1db1215c1340c0309d0250519cabd&units=metric`;
            let weatherResponse = await fetch(weatherDataApi);
            let weatherData = await weatherResponse.json();
            setapiData(weatherData.list);
            console.log("Weather Data:", weatherData);
            setshow(false);
        } catch (error) {
            console.error('Fetch API Data Error:', error);
        }
    }

    function convertUnixToLocalTime(unixTimestamp, timezoneOffsetSeconds) {
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

    const getDayAndMonth = (date) => {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthNames = [
          "January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"
        ];
    
        const dayName = dayNames[date.getDay()];
        const monthName = monthNames[date.getMonth()];
    
        return `${dayName}, ${monthName}`;
    };

    const WeatherData=()=>{
        return(
            <div>                   
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

    const getDay=(dat)=>{
        const date=new Date(dat)
        switch (date?.getDay()) {
            case 0: return "Sun";
            case 1: return "Mon";
            case 2: return "Tue";
            case 3: return "Wed";
            case 4: return "Thu";
            case 5: return "Fri";
            case 6: return "Sat";
            default: return "Invalid day";
        }
        
    }

    const getTIme=(timeValue)=>{
        const splitValue=timeValue.split(" ")[1].split(":")
        console.log("ddddddddddddddddd",splitValue)
        return `${splitValue[0]}:${splitValue[1]} ${((splitValue[0]>13)?"PM":"AM")}`
    }

    const getCurruntTIme=()=>{
        const date=new Date()
        return `${(date.getHours()<10?"0"+date.getHours():date.getHours())}:${(date.getMinutes())<10?"0"+date.getMinutes():date.getMinutes()} ${(date.getHours()>13?"PM":"AM")}`
        //  return `${(date.getHours()<10?"0"+date.getHours():date.getHours())}:${(date.getMinutes())<10?"0"+date.getMinutes():date.getMinutes()}:${(date.getSeconds()<10)?"0"+date.getSeconds():date.getSeconds()}`
    }

    const weatherIcon=()=>{
        
            try{
                if(apiData){
                const weatherType=apiData[1]?.weather?.[0]?.icon;
                console.log("apiDataapiDataapiData123",apiData[1]?.weather?.[0]?.icon)
                return `https://openweathermap.org/img/wn/${weatherType}@2x.png`
                    }  
                }catch{
                return `cloud.png`}
                }
       
    

     console.log("setshow",show)
     console.log("apiData",apiData)
    
    return(<>
       <div className={`${(!show?"mainDivForWather2": "mainDivForWather2Opacity")}`}>
            <div className="mainDivForWather2Div1">
                        <p className="text-center timerSize mb-0 pt-2  d-none d-lg-block">{getCurruntTIme()}</p>
                            <div className="row justify-content-between" >
                                <div className="col-12 col-lg-3 ml-lg-4">
                                    <p className="mb-0 marginTop "><span className="texppsert">{Math.ceil(apiData[1]?.main?.temp)}&#176;</span><img className="weatherIcon2 animate__pulse animate__animated animate__infinite mb-0 " 
                                    src={`cloud.png`}
                                    alt="cloudImages"
                                    src={weatherIcon()}
                                    /></p>
                                    <p className="weatherType d-none d-lg-block">{(apiData[1]?.weather?.[0].description)} / {Math.ceil(apiData[1]?.wind?.speed)}mps</p>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <p className=" mt-n1 text-center dayStyle mb-1">{getDayAndMonth(date)}</p>
                                    <div class="searchBarMainOutlin2 input-group mb-2 ">
                                        <input onKeyDown={handleKeyDown}  type="text"  class="searchBar "  placeholder="Enter city here" onChange={handleSearchedData} value={searchedData}/>
                                        <div class="input-group-append"><button class="btn" onClick={()=>{fecthApiData(searchedData)}} type="button"><i class="fas fa-search  faearch2 text-dark"></i></button></div>
                                    </div>
                                    <div className="row justify-content-center ml-2 mr-2">
                                        {sampleSearchData?.map((data)=>{return(<button onClick={()=>{setsearchedData(data)}} className="sampleButtons text-truncate ml-2 mb-2">{data}</button>)})}
                                    </div>
                                </div>
                                <div className="col-3 ">                
                                       
 
                                </div>
                            </div>
            </div>
            <div className="mainDivForWather2Div2">
            <div class="d-flex mx-1">
                { apiData && apiData?.map((data)=>{
                        return(
                            <div class=" tempDivWidth mx-1 ">
                            <p class="text-muted mb-0 ">{getDay(data.dt_txt)}</p>
                            <div class="text-center"> <img class="symbol-img animate__pulse animate__animated animate__infinite"
                             src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                             /></div>  
                            <p className="tempPara mb-0">{Math.ceil(data?.main?.temp)}&#176;C</p>
                            <p className="tempPara mb-0">{getTIme(data.dt_txt)}</p>
                            </div>
                        )
                    })
                }

                </div>
            </div>
           
           
        </div>
        {show && <div className="loadeDivr">
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
                />

            </div>}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
                
                />   
    </>)
}


            