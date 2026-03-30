export interface ILocation {
  _id?: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  createdAt?: string;
  updatedAt?: string;
  message:string;
  status:boolean
}

export interface ILocationPayload {
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

export interface ILocationState {
  loading: boolean;
  data: ILocation | null;
  error: string | null;
}
