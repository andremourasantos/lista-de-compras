export {}

declare global {
  interface userInfo {
    fullName:string | null;
    imageURL:string | null,
    email:string | null,
    isAnonymous:boolean,
    isEmailVerified:boolean | null,
    uid:string | null,
    userList:itemInfoClient[] | null
  }

  type typeItemTags = {
    quantity:number,
    quantityMetric: 'un' | 'kg' | 'g' | 'l' | 'ml' | 'oz',
    price:number
  }

  type itemInfo = {
    name:string,
    tags:typeItemTags
  }

  type itemInfoClient = {
    name:string,
    tags:typeItemTags,
    id:string
  }
}