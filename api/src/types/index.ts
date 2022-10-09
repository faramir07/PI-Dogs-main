
export type Temperament = {'name'?: string, 'id'?: number}

// tipado de los dogs
export interface DogsType {
  id?: string | number;
  name: string;
  height_min: number;
  height_max: number;
  weight_min: number;
  weight_max: number;
  life_min: number;
  life_max: number;
  img: string;
  temperament: Temperament[];
  createDb?: boolean;
}

