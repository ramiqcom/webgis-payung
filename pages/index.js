import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

// ** Global variables ** //

let Map;

// Map data
let Road;
let Sungai;

// ** Global variables ** //

// App
export default function Home() {
  return (
    <>
      <Head>
        <title>WebGIS Data Spasial Desa Payung</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

      
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossOrigin=""
      />

      <Script 
        src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
        crossOrigin=""
        onLoad={leaflet}
      />

      <Main />
    </>
  )
}

// Main page
function Main() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div id='map' style={{ height: '100vh', width: '80%', float: 'left'}} />
      <div id='panel' style={{ height: '100vh', width: '20%', float: 'right' }}>

        <div style={{ margin: '30px' }}>

          <h1 style={{ fontSize: '25px' }}>
            WebGIS Data Spasial Desa
          </h1>

          <h2 style={{ fontSize: '20px' }}>
            Daftar data
          </h2> 

          <Layer />
        </div>

      </div>
    </div>
  )
}

// Checkbox class
function Checkbox(props) {
  return (
    <label>
      <input type="checkbox" checked={props.checked} onChange={props.onChange} disabled={props.disabled} id={props.id} />
      {props.label}
    </label>
  )
}

// Layer list
function Layer() {
  return (
    <div id='layer' >

      <dl>
        <dt><Toponym /></dt>
        <dt><Admin /></dt>
        <dt><Building /></dt>
        <dt><Facility /></dt>
        <dt><Network /></dt>
        <dt><Water /></dt>
      </dl>

    </div>
  )
}

// Toponyms
function Toponym() {
  // Hook function
  const [toponym, setToponym] = useState(true);

  // Change function
  function change(value) {
    const condition = value.target.checked;
    setToponym(condition);
  }

  return (
    <Checkbox checked={toponym} id='toponim' label='Toponim' className='mainList' onChange={change} style={{ margin: '10px 0'}} />
  )
}

// Admin list
function Admin() {
  // Hook function
  const [admin, setAdmin] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const [blokCheck, setBlokCheck] = useState(true);
  const [dusunCheck, setDusunCheck] = useState(true);
  const [desaCheck, setDesaCheck] = useState(true);

  // Main admin change disabled enable
  function change(value){
    const condition = value.target.checked;
    setAdmin(condition);
    setDisabled(!condition);
  }

  // Function to change the value of check
  function changeBlok(value){
    const condition = value.target.checked;
    setBlokCheck(condition);
  }

  function changeDusun(value){
    const condition = value.target.checked;
    setDusunCheck(condition);
  }

  function changeDesa(value){
    const condition = value.target.checked;
    setDesaCheck(condition);
  }

  return (

    <dl>
      <Checkbox checked={admin} id='batasAdminAll' label='Batas administrasi' className='mainList' onChange={change} />

      <dd>
        <Checkbox disabled={disabled} checked={blokCheck} id='batasAdminBlok' className='subList' label='Batas administrasi blok' onChange={changeBlok} />
      </dd>

      <dd>
        <Checkbox disabled={disabled} checked={dusunCheck} id='batasAdminDusun' className='subList' label='Batas administrasi dusun' onChange={changeDusun} />
      </dd>

      <dd>
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
  const [healthCheck, setHealthCheck] = useState(true);
  const [transCheck, setTransCheck] = useState(true);

  // Main admin change disabled enable
  function change(value){
    const condition = value.target.checked;
    setFacility(condition);
    setDisabled(!condition)
  }

  // Function to change the value of check
  function changeEdu(value){
    const condition = value.target.checked;
    setEduCheck(condition);
  }

  function changeHealth(value){
    const condition = value.target.checked;
    setHealthCheck(condition);
  }

  function changeTrans(value){
    const condition = value.target.checked;
    setTransCheck(condition);
  }

  return (
    <dl>
      <Checkbox checked={facility} id='fasilitasAll' label='Fasilitas' className='mainList' onChange={change} />
      
      <dd>
        <Checkbox disabled={disabled} checked={eduCheck} id='pendidikan' label='Pendidikan' onChange={changeEdu} />
      </dd>

      <dd>
        <Checkbox disabled={disabled} checked={healthCheck} id='kesehatan' label='Kesehatan' onChange={changeHealth} />
      </dd>

      <dd>
        <Checkbox disabled={disabled} checked={transCheck} id='transportasi' label='Transportasi' onChange={changeTrans} />
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
  }

  return (
    <Checkbox checked={building} id='building' label='Bangunan' className='mainList' onChange={change} style={{ margin: '10px 0' }} />
  )
}

// Network
function Network() {
  // Hook function
  const [road, setRoad] = useState(true);

  // Change function
  function change(value) {
    const condition = value.target.checked;
    setRoad(condition);

    if (condition == true){
      Road.addTo(Map);
    } else {
      Road.remove();
    }
  }

  return (
    <div>
      <Checkbox checked={road} id='jalan' label='Jalan' className='mainList' onChange={change} style={{ margin: '10px 0' }} />
      &nbsp;
      &nbsp;
      <hr width='20%' color="orange" size='5' style={{ display: 'inline-block' }} /> 
      &nbsp;
      &nbsp;
      <a href="/shp/1_jalan.zip" download>
        <button class="btn"><i class="fa fa-download"></i></button>
      </a>
    </div>
  )
}

// Facility list
function Water() {
  // Hook function
  const [water, setWater] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const [riverCheck, setRiverCheck] = useState(true);
  const [pondCheck, setPondCheck] = useState(true);

  // Main admin change disabled enable
  function change(value){
    const condition = value.target.checked;
    setWater(condition);
    setDisabled(!condition)

    if (condition == true){
      Sungai.addTo(Map);
    } else {
      Sungai.remove();
    }
  }

  // Function to change the value of check
  function changeRiver(value){
    const condition = value.target.checked;
    setRiverCheck(condition);

    if (condition == true){
      Sungai.addTo(Map);
    } else {
      Sungai.remove();
    }
  }

  function changePond(value){
    const condition = value.target.checked;
    setPondCheck(condition);
  }

  return (
    <dl>
      <Checkbox checked={water} id='waterAll' label='Tubuh air' className='mainList' onChange={change} />
      
      <dd>
        <Checkbox disabled={disabled} checked={riverCheck} id='sungai' label='Sungai' onChange={changeRiver} />
        &nbsp;
        &nbsp;
        <hr width='20%' color="dodgerblue" size='5' style={{ display: 'inline-block' }} /> 
        &nbsp;
        &nbsp;
        <a href="/shp/2_sungai.zip" download>
          <button class="btn"><i class="fa fa-download"></i></button>
        </a>

      </dd>

      <dd>
        <Checkbox disabled={disabled} checked={pondCheck} id='kolam' label='Kolam' onChange={changePond} />
      </dd>
      
    </dl>
  )
}

// Leaflet map load function
async function leaflet() {
  // Map option
  const options = {
    center: [-6.825859868104941, 108.36123697530323],
    zoom: 15
  }

  // Set leaflet div map
  Map = L.map('map', options);

  // Set map tilelayer
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFtaXFjb20iLCJhIjoiY2wxYWE4ZDJvMXZ3ZjNvcXoyOTF3djg4NSJ9.JjGI0JReWbRMM8z--zMl-g', 
    {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  ).addTo(Map);

  // Fetch data
  let response = await fetch('/api/geodata');
  let result = await response.json();
  
  Sungai = L.geoJSON(result.sungai, {
    style: (data) => {
      return {
        color: 'dodgerblue',
      }
    }
  });
  Sungai.addTo(Map);

  Road = L.geoJSON(result.jalan, {
    style: (data) => {
      return {
        color: 'orange',
      }
    }
  });
  Road.addTo(Map);
}