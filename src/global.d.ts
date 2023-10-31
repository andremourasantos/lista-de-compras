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
    lastEmailVerificationSent:Date
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

  interface BeforeInstallPromptEvent extends Event {

    /**
     * Returns an array of DOMString items containing the platforms on which the event was dispatched.
     * This is provided for user agents that want to present a choice of versions to the user such as,
     * for example, "web" or "play" which would allow the user to chose between a web version or
     * an Android version.
     */
    readonly platforms: Array<string>;


    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed',
      platform: string
    }>;
  
    prompt(): Promise<void>;
  }
}