export interface MapData {
  resultCode: number;
  resultMsg: string;
  result: MapResult[];
}

export interface MapResult {
  culturalPropertyId: number;
  nameKo: string;
  latitude: number;
  longitude: number;
  pinImage: string;
  starCount: number;
}

export interface RegionProperties {
  name: string;
}

export interface GwangjustageProps {
  mapDatas: MapResult[] | null;
}
