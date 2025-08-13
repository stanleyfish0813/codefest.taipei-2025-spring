ts
/**
 * 獲獎團隊
 */
export interface PastWinningTeam extends HasThumbnail {
  id: number;
  /** 名次 */
  ranking: string;
  /** 團隊名稱 */
  team_name: string;
  /** 團隊成員 */
  team_members: string;
  /** 團隊簡介 */
  descriptions: {
    title: string;
    content: string;
  }[];
  /** 多圖連結 */
  image_list: string[];
}

/**
 * 照片回顧
 */
export interface PastPhoto extends HasThumbnail {
  id: number;
  /** 回顧名稱 */
  title: string;
  /** 多圖連結 */
  image_list: string[];
  /** 更多照片連結 */
  more_photos_url: string;
}

/**
 * 參賽影音回顧
 */
export interface PastVideo extends HasThumbnail {
  id: number;
  /** 日期 */
  date: string;
  /** 回顧名稱 */
  title: string;
  /** 回顧影片連結 */
  video_url: string;
}

/**
 * 擁有縮圖
 */
interface HasThumbnail {
  /** 回顧縮圖 */
  thumbnail: string;
}