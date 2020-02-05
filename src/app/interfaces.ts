/**
 *
 * Represents a Pixabay image result
 * @export
 * @interface PixaBayImage
 */
export interface PixaBayImage {
  largeImageURL: string;
  webformatHeight: number;
  webformatWidth: number;
  likes: number;
  imageWidth: number;
  id: number;
  user_id: number;
  imageURL?: string;
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
  vectorURL?: string;
  imageSize: number;
  previewWidth: number;
  userImageURL: string;
  fullHDURL?: string;
  previewURL: string;
}
/**
 * Represents a full response from the pixabay api
 *
 * @export
 * @interface PixaBayResponse
 */
export interface PixaBayResponse {
  total: number;
  totalHits: number;
  hits: Array<PixaBayImage>;
}
/**
 * Represents a generic image result from any image api.
 *
 * @export
 * @interface GalleryImage
 */
export interface GalleryImage {
  id: number;
  webformatURL:string;
  largeImageURL:string;
  user:string;
  tags:string;
  downloads:number;
  imageSize:number;
}
/**
 *Represents a generic response from any image api.
 *
 * @export
 * @interface ImageAPIResponse
 */
export interface ImageAPIResponse {
  total: number;
  totalHits: number;
  hits: Array<GalleryImage>;
}
