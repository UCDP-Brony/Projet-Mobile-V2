
export interface Album {
  uuid? : string,
  name : string,
  albums? : Album[],
  desc? : string,
  userId : string,
  share?: string[],
  photos? : Photo[]
}

export interface Photo {
  uuid? : string,
  name : string,
  desc? : string,
  url? : string,
}
