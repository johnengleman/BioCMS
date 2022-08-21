export interface Saint {
  name: string;
  image_main: {
    id: string;
  };
  biography: string;
  birth_date: string;
  birth_location: string;
  death_date: string;
  death_location: string;
  photos: {
    directus_files_id: {
      id: string;
    };
  }[];
}
