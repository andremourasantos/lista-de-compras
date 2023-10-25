export {}

declare global {
  interface userInfo {
    fullName:string | null;
    imageURL:string | null,
    email:string | null,
    isAnonymous:boolean,
    isEmailVerified:boolean | null,
    uid:string | null
  }
}