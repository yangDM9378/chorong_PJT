export interface MapData {
  resultCode: number;
  resultMsg: string;
  result: MapResult[];
}

interface MapResult {
  culturalPropertyId: number;
  nameKo: string;
  latitude: number;
  longitude: number;
  pinImage: string;
}
