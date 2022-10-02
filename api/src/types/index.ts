


// tipado de los dogs
export interface Dogs {
  id: string | number;
  name: string;
  height_min: number;
  height_max: number;
  weight_min: number;
  weight_max: number;
  life_min: number;
  life_max: number;
  img: string;
  temperament: string[];
  createDb?: boolean;
}

