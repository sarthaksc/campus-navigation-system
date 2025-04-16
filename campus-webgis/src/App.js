import React from 'react';
import MapComponent from './components/MapComponent';
function App() {
  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <header style={styles.navbar}>
        <h2 style={styles.logo}>Campus Navigator</h2>
        <nav>
          <ul style={styles.navList}>
            <li><a href="#map-section" style={styles.navLink}>Map</a></li>
            <li><a href="#about" style={styles.navLink}>About</a></li>
            <li><a href="#contact" style={styles.navLink}>Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>Explore Your Campus with Ease</h1>
          <p style={styles.heroSubtitle}>
            An interactive WebGIS built with Leaflet and OpenStreetMap
          </p>
          <a href="#map-section" style={styles.heroButton}>Get Started</a>
        </div>
      </section>

      {/* MAP SECTION (Placeholder) */}
      <section id="map-section" style={styles.mapSection}>
        <h2>Campus Map</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Here you can integrate your Leaflet map. For example, you could create a <code>&lt;MapComponent /&gt;</code> that wraps Leaflet's initialization logic and displays it here.
        </p>
        <div style={styles.mapPlaceholder}>
          {/* <MapComponent /> */}
          <MapComponent />
          {/* Placeholder for Leaflet or any map library integration */}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={styles.aboutSection}>
        <h2>About This Project</h2>
        <p style={{ maxWidth: '700px', margin: '0 auto' }}>
          Our WebGIS project uses open-source technologies to provide 
          interactive campus navigation. With data from OpenStreetMap 
          and routing functionality from Leaflet Routing Machine, 
          students and visitors can easily find the shortest routes to 
          departments, libraries, and more.
        </p>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={styles.footer}>
        <p>© {new Date().getFullYear()} Campus WebGIS. Powered by React & OpenStreetMap.</p>
      </footer>
    </div>
  );
}

/* INLINE STYLES for simplicity (you can move them to a separate CSS file) */
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    margin: 0,
    padding: 0
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#333',
    color: '#fff',
    padding: '1rem 2rem'
  },
  logo: {
    margin: 0
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    margin: 0,
    padding: 0
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 500
  },
  heroSection: {
    position: 'relative',
    height: '80vh',
    background: 'url("https://iitk.ac.in/futurestudents/static/images/Infrastructure/libr.png") no-repeat center center / cover'
  },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '0 2rem'
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    maxWidth: '600px',
    marginBottom: '2rem'
  },
  heroButton: {
    background: '#ffa726',
    color: '#333',
    textDecoration: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  mapSection: {
    padding: '4rem 2rem',
    textAlign: 'center',
    backgroundColor: '#fafafa'
  },
  mapPlaceholder: {
    margin: '2rem auto',
    width: '80%',
    height: '400px',
    backgroundColor: '#ddd',
    border: '2px dashed #999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  aboutSection: {
    padding: '4rem 2rem',
    textAlign: 'center'
  },
  footer: {
    background: '#333',
    color: '#ccc',
    textAlign: 'center',
    padding: '1rem'
  }
};

export default App;
