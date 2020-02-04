export interface PixaBayImage {
  largeImageURL: string;
  webformatHeight: number;
  webformatWidth: number;
  likes: number;
  imageWidth: number;
  id: string;
  user_id: string;
  imageURL: string;
  views: number;
  comments: number;
  pageURL: string;
  imageHeight: number;
  webformatURL: string;
  id_hash: string;
  type: string;
  previewHeight: number;
  tags: string;
  downloads: number;
  user: string;
  favorites: number;
  vectorURL: string;
  imageSize: number;
  previewWidth: number;
  userImageURL: string;
  fullHDURL: string;
  previewURL: string;
}

export interface PixaBayResponse {
  total: number;
  totalHits: number;
  hits: Array<PixaBayImage>;
}

export interface GalleryImage {
  id: string;
  webformatURL:string;
  largeImageURL:string;
  user:string;
  tags:string;
  downloads:number;
  imageSize:number;
}

export interface ImageAPIResponse {
  total: number;
  totalHits: number;
  hits: Array<GalleryImage>;
}
