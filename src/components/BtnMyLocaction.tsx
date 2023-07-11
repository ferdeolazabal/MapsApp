import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const BtnMyLocaction = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
    if (!isMapReady || !userLocation) return;

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <button
      style={{
        cursor: "pointer",
        position: "fixed",
        right: "20px",
        top: "20px",
        zIndex: 999,
      }}
      onClick={onClick}
      className="btn btn-primary"
    >
      <i className="bi bi-record-circle" />
    </button>
  );
};
