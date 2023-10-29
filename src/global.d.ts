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

  type userInfoOnCloud = {
    name:string,
    email:string,
    isEmailVerified:boolean,
    isAnonymous:boolean,
    createAt:Date,
    emailVerificationSent:Date
  }

  type notificationHeaderIcon = 'ph-seal-warning' | 'ph-bell-ringing' | 'ph-warning-circle'

  type quantityMetrics = 'un' | 'kg' | 'g' | 'l' | 'ml' | 'oz'

  type typeItemTags = {
    quantity:number,
    quantityMetric:quantityMetrics,
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

  interface addDocToCloud {
    name:string,
    tags:typeItemTags,
    createAt:any
  }

  interface updateDocOnCloud {
    name:string,
    tags:typeItemTags
  }
}