const APIKEY = 'fd8662804c1d7656890c88c001f601a7'; //자신의 API

 
//현재날씨 api
  var weatherIcon = {
    '01' : 'fas fa-sun', 
    '02' : 'fas fa-cloud-sun',
    '03' : 'fas fa-cloud',
    '04' : 'fas fa-cloud-meatball',
    '09' : 'fas fa-cloud-sun-rain',
    '10' : 'fas fa-cloud-showers-heavy',
    '11' : 'fas fa-poo-storm',
    '13' : 'far fa-snowflake',
    '50' : 'fas fa-smog'
  };

$.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=SEOUL&appid=fd8662804c1d7656890c88c001f601a7&units=metric',  
    data : {},
    type:'GET',
    success: function(resp){
      

        var $Icon = (resp.weather[0].icon).substr(0,2);
        var $Temp = Math.floor(resp.main.temp) + 'º';
        var $City = resp.name;
        var $CminTemp = Math.floor(resp.main.temp_min) + 'º';
        var $CmaxTemp = Math.floor (resp.main.temp_max) + 'º';

        var $Wind = 'Wind  '+resp.wind.speed + 'm/s';
        var $Humidity = 'Humidity  ' +resp.main.humidity + '%';
        var $Cloud = 'Cloud  ' +resp.clouds.all + '%';

      
      
     
        $('.cicon').append('<i class="' + weatherIcon[$Icon] +'"></i>');
        $('.ctemp').prepend($Temp);
        $('.city').append($City);
        $('.cmintemp').append($CminTemp);
        $('.cmaxtemp').append($CmaxTemp);

        $('.wind').append($Wind);
        $('.humidity').append($Humidity);
        $('.cloud').append($Cloud);
        
    }   
   
  })




 

//위치정보를 기반으로 데이터 요청
function getDataByLocating(la, lon){
 const URL = 'http://api.openweathermap.org/data/2.5/weather?q=SEOUL&APPID=fd8662804c1d7656890c88c001f601a7&units=metric'  
 
  fetch(URL).then(function(resp){
    return resp.json();
  })
  .then(function(json){
    getDataByLocating(json);
  })
}


 
//위치정보를 실패했을때
function onGeoError(){

  city.textContent = '위치 정보를 불러오는데 실패했습니다.'
  Icon.src = 'fail.png'

}
 

 
//첫번째인자에는 getDataByLocating 함수가 , 두번째인자에는 onGeoError 함수가 들어간다.
navigator.geolocation.getCurrentPosition(function (position){

  const latitude = String(position.coords.latitude)
  const longitude = String(position.coords.longitude)

  getDataByLocating(latitude, longitude);
}, onGeoError);












 
