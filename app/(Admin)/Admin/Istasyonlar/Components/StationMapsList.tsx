import { GetAllStationsService } from "@/Services/StationService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import { StationType } from "@/Types/Station.Types";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 39.056,
  lng: 35.3213,
};
export default function StationMapsList() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    language: "tr",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const [list, setList] = useState<StationType[]>([]);
  const [markerId, setMarkerId] = useState<number | null>(null);

  useEffect(() => {
    const process = async () => {
      const result: ResponseResult<PaginationType<StationType>> =
        await GetAllStationsService({
          searchType: {
            pageIndex: 1,
            pageSize: 99999,
          },
        });
      if (result.IsSuccess) {
        const data = result.Data as PaginationType<StationType>;
        setList(data.records as StationType[]);
      }
    };
    process();
  }, []);

  const handleCloseInfoWindow = () => {
    setMarkerId(null);
  };
  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
      {list.map((item: StationType) => (
        <Marker
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
          onClick={() => setMarkerId(item.Id)}
          key={item.Id}
          position={{ lat: Number(item.Latitude), lng: Number(item.Longitude) }}
        >
          {markerId === item.Id && (
            <InfoWindow onCloseClick={handleCloseInfoWindow}>
              <div className="flex flex-col items-start justify-start gap-3">
                <h3 className="font-bold">{item.Title}</h3>
                <div className="flex items-center justify-between gap-3">
                  <b>Marka:</b>
                  <span>{item.BrandName}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <b>İstasyon Kodu:</b>
                  <span>{item.AffiliateCode}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <b>İstasyon Numarası:</b>
                  <span>{item.StationNumber}</span>
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <div>Yükleniyor...</div>
  );
}
