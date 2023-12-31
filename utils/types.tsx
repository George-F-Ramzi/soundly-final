export interface IArtist {
  id: number;
  name: string;
  followers: number;
  following: number;
  songs: number;
  cover: string;
}

export interface ISong {
  id: number;
  username: string;
  cover: string;
  song: string;
  likes: number;
  name: string;
  artist: number;
}

export interface IContextPlayer {
  setSong?: (song: ISong) => void;
}

export interface ITokenContext {
  setShow?: (value: boolean) => void;
  setToken?: (value: string) => void;
  setMe?: (value: IArtist) => void;
  token?: string;
  me?: IArtist;
}

export interface InboxCardType {
  id: number;
  trigger: number;
  notifier: number;
  message: string;
  song: number;
  cover: string;
  name: string;
}

export interface IComment {
  id: number;
  song: number;
  artist: number;
  details: string;
  name: string;
  cover: string;
}

export interface IToast {
  message: string;
  username: string;
  photo: string;
  song: number;
  artist: number;
}
