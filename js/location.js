var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
const t_on = document.querySelectorAll(".traffic li")[0]; //교통정보 켜기버튼 변수로 저장 
const t_off = document.querySelectorAll(".traffic li")[1]; // 교통정보 끄기 버튼 저장 
const branch_btns = document.querySelectorAll(".branch li"); 

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

 
let markerOptions = [
    {
        title: '본점', 
        latlng: new kakao.maps.LatLng(37.51271544089457, 127.05882788633194),
        imgSrc : "img/marker1.png",
        imgSize : new kakao.maps.Size(232, 99),
        imgPos : {offset: new kakao.maps.Point(116, 99)}, 
        button : branch_btns[0]
    },
    {
        title: '지점1', 
        latlng: new kakao.maps.LatLng(37.5103522798081,127.043930073359),
        imgSrc : "img/marker2.png",
        imgSize : new kakao.maps.Size(232, 99),
        imgPos : {offset: new kakao.maps.Point(116, 99)},
        button : branch_btns[1]
    },
    {
        title: '지점2', 
        latlng: new kakao.maps.LatLng(37.49708832523959,126.95306963071778),
        imgSrc : "img/marker3.png",
        imgSize : new kakao.maps.Size(232, 99),
        imgPos : {offset: new kakao.maps.Point(116, 99)},
        button : branch_btns[2]
    } 
];

//마커 이미지를 해당위치에 위치시킴   
for(let i=0; i< markerOptions.length; i++){
    let marker = new kakao.maps.Marker({
        map:map, 
        position:markerOptions[i].latlng, 
        title : markerOptions[i].title, 
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    })

    //브랜치 버튼을 클릭했을 때 
    branch_btns[i].addEventListener("click", e=>{
        e.preventDefault(); 
        //버튼 활성화 
        for(let btn of branch_btns){
            btn.classList.remove("on"); 
        }        
        branch_btns[i].classList.add("on"); 

        //해당 위치로 이동 
        moveTo(markerOptions[i].latlng)
    })
}

 




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


window.addEventListener("resize", ()=>{
    //현재 활성화 되어있는 버튼의 순서값을 구해서 
    //branch_btns - querySelectorAll 로 구한 유사배열 

    let active = document.querySelector(".branch li.on"); 
    const branch = Array.from(branch_btns); // 유사배열을 배열로 변환 
    let active_index = branch.indexOf(active); 
    console.log(active_index); 

    //인수값에 활성화순번 넣기 
    map.setCenter(markerOptions[active_index].latlng); 
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

function moveTo(target){
    let moveLatLon = target; 
    map.setCenter(moveLatLon); 
}
