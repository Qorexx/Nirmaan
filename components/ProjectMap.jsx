"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Leaflet components so they only render on the client
// Otherwise Next.js SSR throws "window is not defined" errors since it tries to render the map on the server
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function ProjectMap({ projects = [] }) {
  const [L, setL] = useState(null);

  useEffect(() => {
    // Import Leaflet on the client to get access to the L.Icon class
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  // Default center of India
  const defaultCenter = [22.9734, 78.6569];

  if (!L) {
    return (
      <div className="h-[400px] w-full bg-[#0a1226] border border-[#1e293b] rounded-xl animate-pulse flex items-center justify-center text-[#64748b] font-mono text-sm">
        INITIALIZING SATELLITE FEED...
      </div>
    );
  }

  const customIconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png";
  const customShadowUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png";

  const customIcon = new L.Icon({
    iconUrl: customIconUrl,
    shadowUrl: customShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div style={{ height: 400, width: '100%', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border-1)', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-md)', marginBottom: 32 }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={4.5} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%", background: '#091124' }}
      >
        {/* Dark theme map tiles from CartoDB */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {projects.map((project, idx) => {
          if (!project.lat || !project.lng) return null;

          return (
            <Marker key={project.id || idx} position={[project.lat, project.lng]} icon={customIcon}>
              <Popup>
                <div style={{ fontFamily: 'var(--font-sans)', padding: 4 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 4px 0', color: '#0f172a' }}>{project.name}</h3>
                  <p style={{ fontSize: 12, margin: '0 0 8px 0', color: '#475569' }}>
                    Budget: ${(project.totalBudget).toLocaleString('en-US')}
                  </p>
                  <span style={{ 
                    fontSize: 10, 
                    fontWeight: 700, 
                    padding: '3px 8px', 
                    borderRadius: 12, 
                    backgroundColor: '#dcfce7', 
                    color: '#166534',
                    textTransform: 'uppercase'
                  }}>
                    {project.status || "ACTIVE"}
                  </span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
