import React, { useRef, useEffect, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

function MapComponent() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const poiLayerRef = useRef(null);

  // Fix leaflet’s default icon path
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl:       require('leaflet/dist/images/marker-icon.png'),
    shadowUrl:     require('leaflet/dist/images/marker-shadow.png'),
  });

  const locations = useMemo(() => {
    return [
      { name: "New RA Hostel", coords: [26.504822, 80.232159] },
      { name: "Tutorial Block", coords: [26.510899, 80.232370] },
      { name: "Flight Lab", coords: [26.518817, 80.232378] },
      { name: "Indian Institute of Technology Kanpur", coords: [26.512255, 80.232939] },
      { name: "Faculty Building Parking", coords: [26.512787, 80.233751] },
      { name: "Institute Swimming Pool", coords: [26.505049, 80.231165] },
      { name: "P K Kelkar Library, IIT Kanpur", coords: [26.512363, 80.233904] },
      { name: "Institute Sports Stadium", coords: [26.509239, 80.233584] },
      { name: "Old Shopping Complex", coords: [26.511531, 80.236423] },
      { name: "Football/Hockey Fields", coords: [26.506171, 80.229774] },
      { name: "Water treatment area", coords: [26.502941, 80.228723] },
      { name: "Computer Centre", coords: [26.513625, 80.234435] },
      { name: "Main Auditorium", coords: [26.513090, 80.235978] },
      { name: "Biological Sciences and Bioengineering", coords: [26.510811, 80.231396] },
      { name: "Visitor Hostel", coords: [26.507382, 80.234588] },
      { name: "Health Centre", coords: [26.505311, 80.233666] },
      { name: "Students' Activity Centre", coords: [26.504950, 80.229838] },
      { name: "Block A", coords: [26.512115, 80.225248] },
      { name: "Block B", coords: [26.512416, 80.225119] },
      { name: "Visitors Hostel Extension", coords: [26.512302, 80.225115] },
      { name: "Block C", coords: [26.512288, 80.224771] },
      { name: "New SBRA Hostels", coords: [26.504198, 80.233134] },
      { name: "Old Lecture Hall Complex", coords: [26.511290, 80.233071] },
      { name: "Faculty Building", coords: [26.513010, 80.233071] },
      { name: "Cafe Coffee Day", coords: [26.511972, 80.234277] },
      { name: "Southern Labs", coords: [26.511525, 80.234816] },
      { name: "Core Lab", coords: [26.513668, 80.232773] },
      { name: "Northern Block Laboratories", coords: [26.514008, 80.233564] },
      { name: "Department of Chemical Engineering", coords: [26.514653, 80.232398] },
      { name: "DOAA Canteen", coords: [26.514416, 80.231789] },
      { name: "Academic Affairs Building (JEE/GATE)", coords: [26.514647, 80.231291] },
      { name: "Central Workshop", coords: [26.513991, 80.231268] },
      { name: "Advanced Centre For Materials Science", coords: [26.511477, 80.231402] },
      { name: "Western Labs", coords: [26.512327, 80.231760] },
      { name: "Community Centre", coords: [26.512320, 80.226079] },
      { name: "MT Market", coords: [26.512231, 80.230513] },
      { name: "Old SBRA", coords: [26.504585, 80.236066] },
      { name: "SBRA Jhoola Park", coords: [26.504155, 80.236054] },
      { name: "33 K.V.A. Substation", coords: [26.503813, 80.235414] },
      { name: "SBRA Staff Quarters", coords: [26.504181, 80.234729] },
      { name: "Kendriya Vidyalaya", coords: [26.508378, 80.236409] },
      { name: "ACES", coords: [26.513078, 80.232088] },
      { name: "Diamond Jubilee Academic Complex", coords: [26.516362, 80.231904] },
      { name: "Civil Engineering Lab", coords: [26.513072, 80.231293] },
      { name: "New Core Labs", coords: [26.516273, 80.231048] },
      { name: "Samtel Centre for Display Technologies", coords: [26.511749, 80.232063] },
      { name: "SIDBI", coords: [26.515291, 80.231086] },
      { name: "Western Lab Extension", coords: [26.513027, 80.231724] },
      { name: "Wind Tunnel Facility", coords: [26.515558, 80.231863] },
      { name: "Industrial & Management Engineering", coords: [26.514618, 80.233375] },
      { name: "Nuclear Physics Lab", coords: [26.514381, 80.233980] },
      { name: "Open Air Theatre", coords: [26.505017, 80.229355] },
      { name: "Mango Orchard", coords: [26.521927, 80.235368] },
      { name: "Oxidation Tank", coords: [26.523810, 80.235401] },
      { name: "Auditorium Grounds", coords: [26.512462, 80.235907] },
      { name: "Hall 8 Block H", coords: [26.504599, 80.228426] },
      { name: "Hall 8 Block E", coords: [26.504592, 80.227778] },
      { name: "Hall 8 Block A", coords: [26.505913, 80.227762] },
      { name: "Hall 8 Block B", coords: [26.505653, 80.227769] },
      { name: "Hall 8 Block C", coords: [26.505417, 80.227771] },
      { name: "Hall 8 Block D", coords: [26.505171, 80.227774] },
      { name: "Hall 8 Mess", coords: [26.504855, 80.227747] },
      { name: "Hall 8 Block G", coords: [26.504334, 80.228425] },
      { name: "Hall 8 Block F", coords: [26.504332, 80.227783] },
      { name: "Hall 9 Block A", coords: [26.507555, 80.226760] },
      { name: "Hall 9 Block B", coords: [26.507550, 80.226107] },
      { name: "Hall 9 Block C", coords: [26.507776, 80.226756] },
      { name: "Hall 9 Block D", coords: [26.507775, 80.226110] },
      { name: "Hall 9 Block E", coords: [26.508291, 80.226752] },
      { name: "Hall 9 Block F", coords: [26.508287, 80.226106] },
      { name: "Hall 9 Block G", coords: [26.508511, 80.226755] },
      { name: "Hall 9 Mess", coords: [26.508028, 80.226108] },
      { name: "Hall 9 Block H", coords: [26.508512, 80.226109] },
      { name: "C6", coords: [26.509604, 80.229449] },
      { name: "C3", coords: [26.509625, 80.230076] },
      { name: "C1", coords: [26.509624, 80.230561] },
      { name: "C4", coords: [26.509624, 80.229892] },
      { name: "C2", coords: [26.509623, 80.230377] },
      { name: "C5", coords: [26.509606, 80.229633] },
      { name: "Flight Lab", coords: [26.519174, 80.232365] },
      { name: "Electric Substation No 5", coords: [26.507465, 80.229750] },
      { name: "Faculty Apartment (C-Block)", coords: [26.503362, 80.233010] },
      { name: "Faculty Apartment (D-Block)", coords: [26.502904, 80.233015] },
      { name: "Faculty Apartment (A-Block)", coords: [26.504172, 80.232171] },
      { name: "Faculty Apartment (B-block)", coords: [26.503723, 80.232175] },
      { name: "IIT Kanpur Airstrip", coords: [26.520156, 80.232882] },
      { name: "Indoor Sports Complex", coords: [26.504908, 80.230332] },
      { name: "Hall 2 Block B", coords: [26.511157, 80.230016] },
      { name: "Hall 2 Block G", coords: [26.511259, 80.229378] },
      { name: "Hall 2 Block A", coords: [26.511030, 80.229388] },
      { name: "Hall 2 Block C", coords: [26.510839, 80.230208] },
      { name: "Hall 2 Block F", coords: [26.510378, 80.229348] },
      { name: "Hall 2 Block E", coords: [26.510234, 80.229933] },
      { name: "Hall 2 Block D", coords: [26.510318, 80.230336] },
      { name: "Shopping Center Parking Lot", coords: [26.511946, 80.235979] },
      { name: "Park 67", coords: [26.510287, 80.238418] },
      { name: "Kislaya Nursery School", coords: [26.510175, 80.236730] },
      { name: "Type 2 Community Centre", coords: [26.510298, 80.241238] },
      { name: "Type 2 community center parking lot", coords: [26.510275, 80.240728] },
      { name: "ACES ground", coords: [26.508871, 80.244223] },
      { name: "Old Sports Complex", coords: [26.508409, 80.231796] },
      { name: "Hall 9 Quad", coords: [26.508048, 80.226564] },
      { name: "Rajeev Motwani Building", coords: [26.514328, 80.234867] },
      { name: "HR Kadim Diwan Building", coords: [26.514026, 80.234818] },
      { name: "Computer Center Canteen", coords: [26.514109, 80.234283] },
      { name: "Football Field", coords: [26.506096, 80.229473] },
      { name: "Hockey Field", coords: [26.505931, 80.230251] },
      { name: "Snehan Child Care Centre", coords: [26.505234, 80.235722] },
      { name: "Counselling Service", coords: [26.506041, 80.235705] },
      { name: "Pronite Ground", coords: [26.503972, 80.229672] },
      { name: "Hall of Residence 10", coords: [26.506486, 80.226403] },
      { name: "Hall of Residence 11", coords: [26.504968, 80.226410] },
      { name: "Hall of Residence 5", coords: [26.509265, 80.228184] },
      { name: "Hall of Residence 9", coords: [26.507982, 80.226384] },
      { name: "Hall of Residence 7", coords: [26.506928, 80.228081] },
      { name: "Hall of Residence 3", coords: [26.508390, 80.229786] },
      { name: "Hall of Residence 2", coords: [26.510682, 80.229836] },
      { name: "Hall of Residence 1", coords: [26.509574, 80.231748] },
      { name: "Hall of Residence 4", coords: [26.507119, 80.231773] },
      { name: "Hall of Residence 8", coords: [26.505140, 80.228092] },
      { name: "Outreach Auditorium", coords: [26.509145, 80.234599] },
      { name: "Hall of Residence 12", coords: [26.511081, 80.227545] },
      { name: "Hall of Residence 13", coords: [26.510496, 80.226339] },
      { name: "Hall 5 Block C", coords: [26.510014, 80.228638] },
      { name: "Hall 5 Block D", coords: [26.510230, 80.228640] },
      { name: "Hall 5 Mess", coords: [26.509551, 80.227883] },
      { name: "Hall 5 Canteen", coords: [26.509410, 80.228398] },
      { name: "Hall 10 Mess", coords: [26.505891, 80.226007] },
      { name: "Hall 11 Mess", coords: [26.505529, 80.226010] },
      { name: "Engineering Science Building 2", coords: [26.515372, 80.233160] },
      { name: "New Shopping Center", coords: [26.504328, 80.231279] },
      { name: "Hall of Residence for Girls 1", coords: [26.507054, 80.233407] },
      { name: "Hall 5 Block F", coords: [26.510119, 80.228146] },
      { name: "Hall 5 Block E", coords: [26.509898, 80.228149] },
      { name: "Hall 5 Block B", coords: [26.509117, 80.228650] },
      { name: "Hall 5 Block A", coords: [26.508894, 80.228638] },
      { name: "Hall 5 Block I", coords: [26.508784, 80.228148] },
      { name: "Hall 5 Block H", coords: [26.509007, 80.228148] },
      { name: "Hall 5 Block G", coords: [26.509229, 80.228150] },
      { name: "Central AC Plant", coords: [26.515198, 80.230409] },
      { name: "Interdisciplinary Centre for Cyber Security and Cyber Defence of Critical Infrastructures", coords: [26.514607, 80.230422] },
      { name: "Central Store", coords: [26.513565, 80.230331] },
      { name: "Security Control Room", coords: [26.511597, 80.230452] },
      { name: "Diesel Generator Substation No 4", coords: [26.514846, 80.234860] },
      { name: "Institute Nursery", coords: [26.515700, 80.235764] },
      { name: "Campus D Shop", coords: [26.511772, 80.235939] },
      { name: "National Centre for Flexible Electronics", coords: [26.511882, 80.231074] },
      { name: "Electrical Maintenance Office (Hostel Area)", coords: [26.508453, 80.235047] },
      { name: "Department of Sustainable Energy Engineering", coords: [26.510127, 80.235874] },
      { name: "Hall 5 Multipurpose hall", coords: [26.509750, 80.227961] },
      { name: "Hall 10 Block A", coords: [26.506570, 80.226898] },
      { name: "Workshop", coords: [26.513944, 80.231722] },
      { name: "New Lecture Hall Complex", coords: [26.510784, 80.234009] },
      { name: "Electric Substation No 12", coords: [26.514887, 80.230396] },
      { name: "IIT Kanpur Technopark", coords: [26.515633, 80.230386] },
      { name: "Atmospheric Monitoring Station", coords: [26.515226, 80.234831] },
      { name: "Centre for Environmental Science & Engineering", coords: [26.515729, 80.234194] },
      { name: "Hall 10 Laundry Room", coords: [26.506311, 80.226422] },
      { name: "Hall 8 Block I", coords: [26.505900, 80.228540] },
      { name: "Hall 5 TV Room", coords: [26.509387, 80.228550] },
      { name: "Hall 11 Laundry Room", coords: [26.505262, 80.226251] },
      { name: "Old RA Hostel", coords: [26.505545, 80.232825] },
      { name: "Smart Grid Control Centre", coords: [26.504052, 80.235171] },
      { name: "Campus School", coords: [26.506193, 80.234717] },
      { name: "Rural Technology Action Group", coords: [26.514275, 80.230256] },
      { name: "Lecture Hall 16", coords: [26.510695, 80.233444] },
      { name: "Lecture Hall 17", coords: [26.510698, 80.233710] },
      { name: "Visitor's Hostel 2 (International Hostel)", coords: [26.511426, 80.225938] },
      { name: "Smart Grid Semi-Urban Field Pilot (Lanes 32 and 33)", coords: [26.514112, 80.237560] },
      { name: "State Bank of India", coords: [26.511655, 80.236707] },
      { name: "Hall 5 Reading Room", coords: [26.509435, 80.228274] },
      { name: "Hall 11 Block A", coords: [26.504870, 80.226900] },
      { name: "Hall 11 Block C", coords: [26.504854, 80.225997] },
      { name: "Hall 11 Block B", coords: [26.504439, 80.226454] },
      { name: "Hall 10 Block B", coords: [26.506985, 80.226447] },
      { name: "Hall 10 Block C", coords: [26.506562, 80.225989] },
      { name: "Lecture Hall 7", coords: [26.511663, 80.232901] },
      { name: "Lecture Hall 5", coords: [26.511518, 80.232628] },
      { name: "Lecture Hall 6", coords: [26.511386, 80.232618] },
      { name: "Lecture Hall 1", coords: [26.511199, 80.232813] },
      { name: "Lecture Hall 2", coords: [26.511203, 80.232993] },
      { name: "Lecture Hall 3", coords: [26.511385, 80.233180] },
      { name: "Lecture Hall 4", coords: [26.511526, 80.233174] },
      { name: "Lecture Hall 14", coords: [26.511011, 80.233192] },
      { name: "Lecture Hall 15", coords: [26.510895, 80.233338] },
      { name: "Lecture Hall 12", coords: [26.511140, 80.233332] },
      { name: "Lecture Hall 10", coords: [26.511242, 80.233441] },
      { name: "Lecture Hall 11", coords: [26.511126, 80.233575] },
      { name: "Lecture Hall 13", coords: [26.511024, 80.233467] },
      { name: "Gurdwara IIT Kanpur", coords: [26.507794, 80.242660] },
      { name: "Type 2 Apartments", coords: [26.508335, 80.241214] },
      { name: "Director's Residence", coords: [26.506971, 80.235940] },
      { name: "Electric Substation No 6", coords: [26.509974, 80.242594] },
      { name: "Events Ground", coords: [26.503776, 80.228487] },
      { name: "Visiting Faculty Apartments", coords: [26.507073, 80.239088] },
      { name: "Electric Substation No 1", coords: [26.512041, 80.230389] },
      { name: "NCC IIT Kanpur", coords: [26.517333, 80.230439] },
      { name: "Solar Energy Research Enclave", coords: [26.503820, 80.227003] },
      { name: "Old Sports Complex Gym", coords: [26.508498, 80.231352] },
      { name: "Hypersonic Experimental Aerodynamics Lab", coords: [26.515261, 80.232083] },
      { name: "Hall 3 Block 4", coords: [26.508047, 80.230366] },
      { name: "Hall 3 Block 3", coords: [26.508598, 80.230223] },
      { name: "Hall 3 Block 2", coords: [26.508909, 80.230003] },
      { name: "Hall 3 Block 1", coords: [26.508784, 80.229389] },
      { name: "Hall 3 Block 7", coords: [26.509021, 80.229387] },
      { name: "Hall 3 Block 6", coords: [26.508103, 80.229398] },
      { name: "Hall 3 Block 5", coords: [26.507963, 80.229992] },
      { name: "Hall 3 Mess", coords: [26.508441, 80.229515] },
      { name: "Hall 3 Canteen", coords: [26.508612, 80.229952] },
      { name: "Hall 3 TV Room", coords: [26.508276, 80.229928] },
      { name: "Hall of Residence for Girls 6", coords: [26.505264, 80.234469] },
      { name: "Hall 2 Mess", coords: [26.510684, 80.229493] },
      { name: "Hall 7 Mess", coords: [26.507229, 80.227854] },
      { name: "Hall 1 Mess", coords: [26.509475, 80.231937] },
      { name: "health center", coords: [26.505286, 80.233693] }
    ];
    // If this data never changes, leave dependency empty: []
    // If you fetch or recalculate it, add the relevant dependencies.
  }, []);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex,   setEndIndex]   = useState(1);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [26.51138333, 80.23493056],
        zoom: 17,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      poiLayerRef.current = L.layerGroup().addTo(mapRef.current);

      routingControlRef.current = L.Routing.control({
        waypoints: [],
        routeWhileDragging: false,
        showAlternatives: false,
        createMarker: () => null,
      }).addTo(mapRef.current);
    }
  }, []);

  const handleRoute = () => {
    if (!routingControlRef.current) return;
    poiLayerRef.current.clearLayers();

    const startCoords = locations[startIndex].coords;
    const endCoords   = locations[endIndex].coords;

    routingControlRef.current.setWaypoints([
      L.latLng(startCoords[0], startCoords[1]),
      L.latLng(endCoords[0],   endCoords[1]),
    ]);

    // Pass popup content as HTML strings
    L.marker(startCoords)
      .bindPopup(`<b>${locations[startIndex].name}</b>`)
      .addTo(poiLayerRef.current)
      .openPopup();

    L.marker(endCoords)
      .bindPopup(`<b>${locations[endIndex].name}</b>`)
      .addTo(poiLayerRef.current);
  };

  return (
    <div style={styles.controlsWrapper}>
      <div style={{ width: '100%', height: '100%' }}>
        <div style={styles.controlPanel}>
          <label style={{ marginRight: '8px' }}>Start:</label>
          <select
            value={startIndex}
            onChange={e => setStartIndex(+e.target.value)}
            style={styles.select}
          >
            {locations.map((loc, i) => (
              <option value={i} key={i}>{loc.name}</option>
            ))}
          </select>

          <label style={{ margin: '0 8px' }}>End:</label>
          <select
            value={endIndex}
            onChange={e => setEndIndex(+e.target.value)}
            style={styles.select}
          >
            {locations.map((loc, i) => (
              <option value={i} key={i}>{loc.name}</option>
            ))}
          </select>

          <button onClick={handleRoute} style={styles.button}>
            Calculate Route
          </button>
        </div>

        <div
          id="mapid"
          ref={mapContainerRef}
          style={styles.mapContainer}
        />
      </div>
    </div>
  );
}

const styles = {
  controlsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '8px',
    backgroundColor: '#f7f7f7',
    borderBottom: '1px solid #ccc'
  },
  controlPanel: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    background: '#f7f7f7',
    borderBottom: '1px solid #ccc',
    gap: '8px'
  },
  select: {
    padding: '6px',
    fontSize: '1rem'
  },
  button: {
    padding: '6px 12px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  mapContainer: {
    width: '100%',
    height: '600px',
    marginBottom: '16px'
  },
};

export default MapComponent;


  
  

  