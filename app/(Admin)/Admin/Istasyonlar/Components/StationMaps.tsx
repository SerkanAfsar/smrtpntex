import { GetAllStationsService } from "@/Services/StationService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import { StationType } from "@/Types/Station.Types";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 39.056,
  lng: 35.3213,
};
export default function StationMaps({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    language: "tr",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });
  if (!isNaN(Number(latitude)) && !isNaN(Number(longitude))) {
    center.lat = Number(latitude);
    center.lng = Number(longitude);
  } else {
    return null;
  }

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
      <Marker
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        }}
        // onClick={() => setMarkerId(item.Id)}
        position={{ lat: Number(latitude), lng: Number(longitude) }}
      ></Marker>
    </GoogleMap>
  ) : (
    <div>Yükleniyor...</div>
  );
}
