var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
const t_on = document.querySelectorAll(".traffic li")[0]; //교통정보 켜기버튼 변수로 저장 
const t_off = document.querySelectorAll(".traffic li")[1]; // 교통정보 끄기 버튼 저장 

var mapOption = { 
        center: new kakao.maps.LatLng(37.51271544089457, 127.05882788633194), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

//드래그로 지도 이동 가능 
setDraggable(true); 
//줌 가능 여부 
setZoomable(true);

var imageSrc = 'img/marker1.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(232, 99), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(116, 99)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(37.51271544089457, 127.05882788633194); // 마커가 표시될 위치입니다

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition, 
    image: markerImage // 마커이미지 설정 
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);



//교통정보 켜기 버튼 클릭했을 때 
t_on.addEventListener("click", e=>{
    e.preventDefault(); 
    let isOn = t_on.classList.contains("on"); 
    if(isOn) return; 
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
    //버튼 활성화 
    t_on.classList.add("on"); 
    t_off.classList.remove("on"); 
}); 

//교통정보 끄기 버튼 클릭했을 때 
t_off.addEventListener("click", e=>{
    e.preventDefault();
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 

    //버튼 활성화 
    t_on.classList.remove("on"); 
    t_off.classList.add("on"); 
})







  








// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);


//지동 드래그로 이동 가능 함수 정의 
function setDraggable(draggable) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(draggable);    
}

function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);    
}