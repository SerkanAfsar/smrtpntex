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
const colorTypes: Record<string, string> = {
  alpet: "#58ba1f",
  aytemiz: "#f70112",
  bp: "#fcdc00",
  lukoil: "#e71932",
  moil: "#382f84",
  "petrol ofisi": "#e71b23",
  shell: "#f4cf00",
  smartpoint: "#29567d",
  sunpet: "#e09200",
  total: "#8639e1",
  tp: "#fcffff",
  deneme: "black",
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
        const filteredData = ((data.records as StationType[]) || []).filter(
          (a) => a.IsActive == true,
        );
        setList(filteredData);
      }
    };
    process();
  }, []);

  const customIcon = (brandName: string) => {
    return {
      path: "M32,5A21,21,0,0,0,11,26c0,17,21,33,21,33S53,43,53,26A21,21,0,0,0,32,5Zm0,31A10,10,0,1,1,42,26,10,10,0,0,1,32,36Z",
      fillColor: colorTypes[brandName],
      fillOpacity: 1,
      scale: 0.5,
    };
  };

  const handleCloseInfoWindow = () => {
    setMarkerId(null);
  };
  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
      {list.map((item: StationType) => (
        <Marker
          icon={customIcon(item.BrandName?.toLocaleLowerCase() || "smartpoint")}
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
