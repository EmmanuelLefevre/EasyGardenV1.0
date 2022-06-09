export interface LightningModel {
  id: number,
  name: string,
  status: boolean,
  garden: {
    id: string,
    name: string,
    user: {
      id: string,
      name: string
    }
  }
}

export interface SingleLightningModel{
  data: LightningModel
}

export interface DataLightningModel {
  data: LightningModel[]
}