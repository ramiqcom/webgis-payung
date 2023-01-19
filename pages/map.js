import { useState, useEffect } from 'react';
import { Select, Checkbox } from './helper';
import Image from 'next/image';
import L from 'leaflet';

// ** Global variables ** //

let Map;

// Map data
let OSM;
let ESRISAT;
let Jalan;
let Sungai;
let Kontur;
let DEM;
let Bangunan;
let Pariwisata;
let Kerawanan;
let Desa;
let Dusun;
let PL;
let Pendidikan;
let Agama;
let Pemerintah;
let Olahraga;
let Kebakaran;

// ** Global variables ** //

// Main page
export default function Main() {

  useEffect(() => {
    leaflet();
  })

  return (
    <div style={{ height: '100vh', width: '100%', margin: '0' }}>
      <div id='map' style={{ height: '100vh', width: '80%', float: 'left'}} />

      <div id='panel' style={{ height: '100vh', width: '20%', float: 'right' }}>

        <div style={{ margin: '20px' }}>

          <h1 style={{ fontSize: '20px' }}>
            WebGIS Data Spasial <br/> Desa Payung
          </h1>

          <hr></hr>

          <Basemap />

          <h2 style={{ fontSize: '18px' }}>
            Daftar data
            &nbsp;
            <a href='/file/DESA_PAYUNG.zip' download>
              <button class="btn" style={{ display: 'inline-block' }}>
                <i class="fa fa-download"></i>
                &nbsp;
                Download data
              </button>
            </a>
          </h2> 

          <Layer />

        </div>

      </div>
    </div>
  )
}

// Basemap
function Basemap(){
  const [base, setBase] = useState('OpenStreetMap');

  function baseChange(value){
    const obj = value.target;
    const status =  obj.options[obj.selectedIndex].text;
    setBase(status);

    switch(status){
      case 'OpenStreetMap':
        ESRISAT.remove();
        OSM.addTo(Map);
        break;
      case 'Esri Satellite':
        OSM.remove();
        ESRISAT.addTo(Map);
    }
  }

  return (
    <div>
      Basemap 
      &nbsp;
      <Select 
        items={['OpenStreetMap', 'Esri Satellite']} 
        selected={base} 
        onChange={baseChange}
        placeholder='Basemap' 
      />
    </div>
  )
}

// Layer list
function Layer() {
  return (
    <div id='layer' >
        <dl>
        <dt><Admin /></dt>
        <dt><Tourist /></dt>
        <dt><Facility /></dt>
        <dt><Building /></dt>
        <dt><Network /></dt>
        <dt><Water /></dt>
        <dt><Topography /></dt>
        <dt><Landcover /></dt>
        <dt><ForestFire /></dt>
      </dl>

    </div>
  )
}

// ForestFire
function ForestFire() {
  const [forest, setForest] = useState(false);

  function change(value){
    const condition = value.target.checked;
    setForest(condition);

    if (condition === true){
      Kebakaran.addTo(Map);
    } else {
      Kebakaran.remove();
    }
  }

  return (
    <dl>
      <Checkbox checked={forest} id='hutan' label='Risiko Kebakaran Hutan' className='mainList' onChange={change} style={{ margin: '10px 0'}} />
      <dd>
        Rendah 
        &nbsp; 
        <div className='symbol draw' style={{ width: '150px', height: '20px', background: 'linear-gradient(to right, purple, blue, green, yellow, red)' }} /> 
        &nbsp; 
        Tinggi
      </dd>
    </dl>
  )
}

// Tourist
function Tourist() {
  const [tourist, setTourist] = useState(true);

  function change(value){
    const condition = value.target.checked;
    setTourist(condition);

    if (condition === true){
      Pariwisata.addTo(Map);
    } else {
      Pariwisata.remove();
    }
  }

  return (
    <dl>
      <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/camera-icon-design-template-119f4b8209203042e9ff053ab606148b_screen.jpg?ts=1625419191"
        style={{height: '20px', verticalAlign: 'bottom'}} 
      />
      <Checkbox checked={tourist} id='pariwisata' label='Pariwisata' className='mainList' onChange={change} style={{ margin: '10px 0'}}/>
    </dl>
  )
}

// Landcover
function Landcover() {
  const [lc, setLc] = useState(true);

  function change(value){
    const condition = value.target.checked;
    setLc(condition);

    if (condition === true){
      PL.addTo(Map);
    } else {
      PL.remove();
    }
  }

  return (
    <dl>
      <Checkbox checked={lc} id='penutuplahan' label='Penutup lahan' className='mainList' onChange={change} style={{ margin: '10px 0'}} />
      <dd>
        <div className='symbol drawl lc' style={{ background: 'pink' }}></div>
        Permukiman
      </dd>
      <dd>
        <div className='symbol drawl lc' style={{ background: 'forestgreen' }} />
        Hutan primer
      </dd>
      <dd>
        <div className='symbol drawl lc' style={{ background: 'yellowgreen' }} />
        Perkebunan
      </dd>
      <dd>
        <div className='symbol drawl lc' style={{ background: 'lightgreen' }} />
        Hutan rakyat
      </dd>
      <dd>
        <div className='symbol drawl lc' style={{ background: 'olive' }} />
        Semak belukar
      </dd>
      <dd>
        <div className='symbol drawl lc' style={{ background: 'greenyellow' }} />
        Rumput
      </dd>
      <dd>
        <div className='symbol drawl lc' style={{ background: 'gold' }} />
        Ladang/tegalan
      </dd>
      <dd>
        <div className='symbol drawl lc' style={{ background: 'aquamarine' }} />
        Sawah
      </dd>
      <dd>
        <div className='symbol drawl lc' style={{ background: 'lightskyblue' }} />
        Tubuh air
      </dd>
      <dd>
        <div className='symbol drawl lc' style={{ background: 'tan' }} />
        Lahan gundul
      </dd>
    </dl>
  )
}

// Admin list
function Admin() {
  // Hook function
  const [admin, setAdmin] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const [dusunCheck, setDusunCheck] = useState(true);
  const [desaCheck, setDesaCheck] = useState(true);

  // Main admin change disabled enable
  function change(value){
    const condition = value.target.checked;
    setAdmin(condition);
    setDisabled(!condition);

    if (condition === false){
      Dusun.remove();
      Desa.remove();
    } else {
      if (dusunCheck === true) {
        Dusun.addTo(Map);
      }
      if (desaCheck === true) {
        Desa.addTo(Map);
      }
    }
  }

  function changeDusun(value){
    const condition = value.target.checked;
    setDusunCheck(condition);

    if (condition === true){
      Dusun.addTo(Map);
    } else {
      Dusun.remove();
    }
  }

  function changeDesa(value){
    const condition = value.target.checked;
    setDesaCheck(condition);

    if (condition === true){
      Desa.addTo(Map);
    } else {
      Desa.remove();
    }
  }

  return (

    <dl>
      <Checkbox checked={admin} id='batasAdminAll' label='Batas administrasi' className='mainList' onChange={change} />

      <dd>
        <div className='symbol draw' style={{ width: '10px', height: '5px', background: 'black' }} />
        <div className='symbol draw' style={{ width: '10px', height: '5px', background: 'white' }} />
        <div className='symbol draw' style={{ width: '10px', height: '5px', background: 'black' }} />
        <div className='symbol draw' style={{ width: '10px', height: '5px', background: 'white' }} />
        <div className='symbol draw' style={{ width: '10px', height: '5px', background: 'black' }} />
        <Checkbox disabled={disabled} checked={dusunCheck} id='batasAdminDusun' className='subList' label='Batas administrasi dusun' onChange={changeDusun} />
      </dd>

      <dd>
        <div className='symbol draw' style={{ width: '50px', height: '5px', background: 'black' }} />
        <Checkbox disabled={disabled} checked={desaCheck} id='batasAdminDesa' className='subList' label='Batas administrasi desa' onChange={changeDesa} />
      </dd>

    </dl>

  )
}

// Facility list
function Facility() {
  // Hook function
  const [facility, setFacility] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const [eduCheck, setEduCheck] = useState(true);
  const [govCheck, setGovCheck] = useState(true);
  const [sportCheck, setSportCheck] = useState(true);
  const [religionCheck, setReligionCheck] = useState(true);

  // Main admin change disabled enable
  function change(value){
    const condition = value.target.checked;
    setFacility(condition);
    setDisabled(!condition);

    if (condition === false){
      Pendidikan.remove();
      Pemerintah.remove();
      Agama.remove();
      Olahraga.remove();
    } else {
      if (eduCheck === true) {
        Pendidikan.addTo(Map);
      }
      if (govCheck === true) {
        Pemerintah.addTo(Map);
      }
      if (sportCheck === true) {
        Olahraga.addTo(Map);
      }
      if (religionCheck === true) {
        Agama.addTo(Map);
      }
    }
  }

  // Function to change the value of check
  function changeEdu(value){
    const condition = value.target.checked;
    setEduCheck(condition);

    if (condition === true){
      Pendidikan.addTo(Map);
    } else {
      Pendidikan.remove();
    }
  }

  function changeGov(value){
    const condition = value.target.checked;
    setGovCheck(condition);

    if (condition === true){
      Pemerintah.addTo(Map);
    } else {
      Pemerintah.remove();
    }
  }

  function changeSport(value){
    const condition = value.target.checked;
    setSportCheck(condition);

    if (condition === true){
      Olahraga.addTo(Map);
    } else {
      Olahraga.remove();
    }
  }

  function changeReligion(value){
    const condition = value.target.checked;
    setReligionCheck(condition);

    if (condition === true){
      Agama.addTo(Map);
    } else {
      Agama.remove();
    }
  }

  return (
    <dl>
      <Checkbox checked={facility} id='fasilitasAll' label='Fasilitas' className='mainList' onChange={change} />
      
      <dd>
        <img src="https://i.pinimg.com/originals/e5/d5/c4/e5d5c4b5acb462a4080d3bf6f5f11652.jpg" className='symbol picture'/>
        <Checkbox disabled={disabled} checked={eduCheck} id='pendidikan' label='Pendidikan' onChange={changeEdu} />
      </dd>

      <dd>
        <img src="https://www.nicepng.com/png/detail/67-671618_government-building-icon-clip-art-government-clipart.png" className='symbol picture'/>
        <Checkbox disabled={disabled} checked={govCheck} id='pemerintah' label='Pemerintah' onChange={changeGov} />
      </dd>

      <dd>
        <img src="https://media.istockphoto.com/id/1017585410/vector/baseball-arena-icon-simple-style.jpg?s=612x612&w=0&k=20&c=kWEmmW9V3Juqa6dvRJK1zmTm5mE4UymmMbApqZtWVQU=" className='symbol picture'/>
        <Checkbox disabled={disabled} checked={sportCheck} id='olahraga' label='Olahraga' onChange={changeSport} />
      </dd>

      <dd>
        <img src="https://i.pinimg.com/736x/6b/23/0d/6b230d4c5dbc10b004b07ce6b501a29f.jpg" className='symbol picture'/>
        <Checkbox disabled={disabled} checked={religionCheck} id='religion' label='Agama' onChange={changeReligion} />
      </dd>
      
    </dl>
  )
}


// Building
function Building() {
  // Hook function
  const [building, setBuilding] = useState(true);

  // Change function
  function change(value) {
    const condition = value.target.checked;
    setBuilding(condition);

    if (condition === true){
      Bangunan.addTo(Map);
    } else {
      Bangunan.remove();
    }
  }

  return (
    <div>
      <div style={{ background: 'black', borderRadius: '50%', width: '10px', height: '10px'}} className='symbol draw' />
      <Checkbox checked={building} id='building' label='Bangunan' className='mainList' onChange={change} style={{ margin: '10px 0' }} />
    </div>

  )
}

// Network
function Network() {
  // Hook function
  const [network, setNetwork] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [road, setRoad] = useState(true);
  const [roadRisk, setRoadRisk] = useState(false);

  // Change function
  function change(value) {
    const condition = value.target.checked;
    setNetwork(condition);
    setDisabled(!condition);

    if (condition === false){
      Jalan.remove();
      Kerawanan.remove()
    } else {
      if (road === true) {
        Jalan.addTo(Map);
      }
      if (roadRisk === true) {
        Kerawanan.addTo(Map);
      }
    }
  }

  function changeRoad(value){
    const condition = value.target.checked;
    setRoad(condition)
    if (condition === true) {
      Jalan.addTo(Map);
    } else {
      Jalan.remove();
    }
  }

  function changeRoadRisk(value){
    const condition = value.target.checked;
    setRoadRisk(condition)
    if (condition === true) {
      Kerawanan.addTo(Map);
    } else {
      Kerawanan.remove();
    }
  }

  return (
    <dl>
      <Checkbox checked={network} id='network' label='Jaringan' className='mainList' onChange={change} />
      <dd>
        <div className='symbol draw' style={{ width: '50px', height: '5px', background: 'red' }} />
        <Checkbox disabled={disabled} checked={road} id='jalan' label='Jalan' onChange={changeRoad} style={{ margin: '10px 0' }} />
      </dd>
      <dd>
        <Checkbox disabled={disabled} checked={roadRisk} id='kerawanan' label='Kerawanan Jalan' onChange={changeRoadRisk} style={{ margin: '10px 0' }} />
        <dd>
          Rendah 
          &nbsp; 
          <div className='symbol draw' style={{ width: '150px', height: '5px', background: 'linear-gradient(to right, purple, blue, green, yellow, red)' }} /> 
          &nbsp; 
          Tinggi
        </dd>
      </dd>
    </dl>
  )
}

// Water list
function Water() {
  // Hook function
  const [water, setWater] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const [riverCheck, setRiverCheck] = useState(true);

  // Main admin change disabled enable
  function change(value){
    const condition = value.target.checked;
    setWater(condition);
    setDisabled(!condition)

    if (condition === false){
      Sungai.remove();
    } else {
      if (riverCheck === true) {
        Sungai.addTo(Map);
      }
    }
  }

  // Function to change the value of check
  function changeRiver(value){
    const condition = value.target.checked;
    setRiverCheck(condition);

    if (condition === true){
      Sungai.addTo(Map);
    } else {
      Sungai.remove();
    }
  }

  return (
    <dl>
      <Checkbox checked={water} id='waterAll' label='Tubuh air' className='mainList' onChange={change} />
      
      <dd>
        <div className='symbol draw' style={{ width: '50px', height: '5px', background: 'lightskyblue' }} />
        <Checkbox disabled={disabled} checked={riverCheck} id='sungai' label='Sungai' onChange={changeRiver} />
      </dd>
      
    </dl>
  )
}

// Topo list
function Topography() {
  // Hook function
  const [topo, setTopo] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const [contour, setContour] = useState(true);
  const [dem, setDEM] = useState(false);

  // Main admin change disabled enable
  function change(value){
    const condition = value.target.checked;
    setTopo(condition);
    setDisabled(!condition)

    if (condition === false){
      Kontur.remove();
      DEM.remove();
    } else {
      if (contour === true) {
        Kontur.addTo(Map);
      }
      if (dem === true) {
        DEM.addTo(Map);
      }
    }
  }

  // Function to change the value of check
  function changeContour(value){
    const condition = value.target.checked;
    setContour(condition);

    if (condition === true){
      Kontur.addTo(Map);
    } else {
      Kontur.remove();
    }
  }

  function changeDEM(value){
    const condition = value.target.checked;
    setDEM(condition);

    if (condition === true){
      DEM.addTo(Map);
    } else {
      DEM.remove();
    }
  }

  return (
    <dl>
      <Checkbox checked={topo} id='topoAll' label='Topografi' className='mainList' onChange={change} />
      
      <dd>
        <div className='symbol draw' style={{ width: '50px', height: '5px', background: 'brown' }} />
        <Checkbox disabled={disabled} checked={contour} id='contour' label='Kontur' onChange={changeContour} />
      </dd>

      <dd>
        <Checkbox disabled={disabled} checked={dem} id='dem' label='DEM' onChange={changeDEM} />
        <dd>
          Rendah 
          &nbsp; 
          <div className='symbol draw' style={{ width: '150px', height: '20px', background: 'linear-gradient(to right, purple, blue, green, yellow, red)' }} /> 
          &nbsp; 
          Tinggi
        </dd>
      </dd>

    </dl>
  )
}

// Leaflet map load function
function leaflet() {
  if (Map !== undefined) {
    Map.remove();
    Map = undefined;
  }

  // Map option
  const options = {
    center: [-6.826622, 108.369413],
    zoom: 16,
    maxZoom: 18,
    minZoom: 10
  };

  // Set leaflet div map
  Map = L.map('map', options);

  // Set map tilelayer
  OSM = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  )
  OSM.addTo(Map);

  ESRISAT =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

  const bounding = [[-6.807152596999970, 108.406191449999994], [-6.895044216999960, 108.354623255000007]];

  DEM = L.imageOverlay('/png/dem.png', bounding);
  Kebakaran = L.imageOverlay('/png/kebakaran.png', bounding);

  Desa = L.geoJSON(require('../data/geojson/desa.json'), {
    style: (data) => {
      return {
        color: 'black',
        fillOpacity: 0,
        weight: 2,
      }
    }
  })
  Desa.addTo(Map);

  PL = L.geoJSON(require('../data/geojson/pl.json'), {
    style: (data) => {
      switch (data.properties.class_id) {
        case 1: return {color: "pink", opacity: 0, fillOpacity: 1};
        case 2: return {color: "forestgreen", opacity: 0, fillOpacity: 1};
        case 3: return {color: "yellowgreen", opacity: 0, fillOpacity: 1};
        case 4: return {color: "lightgreen", opacity: 0, fillOpacity: 1};
        case 5: return {color: "olive", opacity: 0, fillOpacity: 1};
        case 6: return {color: "greenyellow", opacity: 0, fillOpacity: 1};
        case 7: return {color: "gold", opacity: 0, fillOpacity: 1};
        case 8: return {color: "aquamarine", opacity: 0, fillOpacity: 1};
        case 9: return {color: "lightskyblue", opacity: 0, fillOpacity: 1};
        case 10: return {color: "tan", opacity: 0, fillOpacity: 1};
      }
    }
  })
  PL.addTo(Map);

  Kontur =  L.geoJSON(require('../data/geojson/kontur.json'), {
    style: (data) => {
      return {
        color: 'brown',
        weight: 0.2,
      }
    }
  });
  Kontur.addTo(Map);

  Sungai =  L.geoJSON(require('../data/geojson/sungai.json'), {
    style: (data) => {
      return {
        color: 'lightskyblue',
      }
    }
  });
  Sungai.addTo(Map);

  Jalan =  L.geoJSON(require('../data/geojson/jalan.json'), {
    style: (data) => {
      return {
        color: 'red',
      }
    }
  });
  Jalan.addTo(Map);

  Kerawanan = L.geoJSON(require('../data/geojson/kerawanan.json'), {
    style: (data) => {
      switch (data.properties.kerawanan) {
        case 'Sangat rendah': return {color: "purple"};
        case 'Rendah': return {color: "blue"};
        case 'Sedang': return {color: "green"};
        case 'Tinggi': return {color: "gold"};
        case 'Sangat tinggi': return {color: "red"};
      }
    }
  });

  Bangunan =  L.geoJSON(require('../data/geojson/bangunan.json'), {
    pointToLayer: (feature, latlng) => {return L.circleMarker(latlng, {
      radius: 2,
      fillColor: "black",
      fillOpacity: 1,
      stroke: false
    })},
  });
  Bangunan.addTo(Map);

  const agamaicon = L.icon({
    iconUrl: 'https://i.pinimg.com/736x/6b/23/0d/6b230d4c5dbc10b004b07ce6b501a29f.jpg',
    iconSize: [20, 20], // size of the icon
  });

  Agama = L.geoJSON(require('../data/geojson/agama.json'), {
    pointToLayer: (feature, latlng) => {return L.marker(latlng, {
      icon: agamaicon
    })},
    onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.properties.nama);
    }
  });
  Agama.addTo(Map);

  const olahragaicon = L.icon({
    iconUrl: 'https://media.istockphoto.com/id/1017585410/vector/baseball-arena-icon-simple-style.jpg?s=612x612&w=0&k=20&c=kWEmmW9V3Juqa6dvRJK1zmTm5mE4UymmMbApqZtWVQU=',
    iconSize: [20, 20], // size of the icon
  });

  Olahraga = L.geoJSON(require('../data/geojson/olahraga.json'), {
    pointToLayer: (feature, latlng) => {return L.marker(latlng, {
      icon: olahragaicon
    })},
    onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.properties.nama);
    }
  });
  Olahraga.addTo(Map);

  const pemerintahicon = L.icon({
    iconUrl: 'https://www.nicepng.com/png/detail/67-671618_government-building-icon-clip-art-government-clipart.png',
    iconSize: [20, 20], // size of the icon
  });

  Pemerintah = L.geoJSON(require('../data/geojson/pemerintah.json'), {
    pointToLayer: (feature, latlng) => {return L.marker(latlng, {
      icon: pemerintahicon
    })},
    onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.properties.nama);
    }
  });
  Pemerintah.addTo(Map);

  const pendidikanIcon = L.icon({
    iconUrl: 'https://i.pinimg.com/originals/e5/d5/c4/e5d5c4b5acb462a4080d3bf6f5f11652.jpg',
    iconSize: [20, 20], // size of the icon
  });

  Pendidikan = L.geoJSON(require('../data/geojson/pendidikan.json'), {
    pointToLayer: (feature, latlng) => {return L.marker(latlng, {
      icon: pendidikanIcon
    })},
    onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.properties.nama);
    }
  });
  Pendidikan.addTo(Map);
  
  const touristIcon = L.icon({
    iconUrl: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/camera-icon-design-template-119f4b8209203042e9ff053ab606148b_screen.jpg?ts=1625419191',
    iconSize: [20, 20], // size of the icon
  });

  Pariwisata = L.geoJSON(require('../data/geojson/pariwisata.json'), {
    pointToLayer: (feature, latlng) => {return L.marker(latlng, {
      icon: touristIcon
    })},
    onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.properties.nama);
    }
  });
  Pariwisata.addTo(Map);

  Dusun = L.geoJSON(require('../data/geojson/dusun.json'), {
    style: (data) => {
      return {
        color: 'black',
        weight: 1,
        dashArray: '4 1 1 1 4',
        fillOpacity: 0
      }
    }
  })
  Dusun.addTo(Map);
}