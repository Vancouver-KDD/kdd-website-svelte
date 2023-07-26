// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
}

declare namespace DB {
  interface Sponsor {
    name: string
    logo: Attachment
    link: string
  }

  interface Photo {
    id: string
    title: string
    description: string
    photos: Attachment[]
    EventsId: string
  }

  interface Stats {
    eventsCount: number
    members: number
  }

  interface Blog {
    id: string
    author: {id: string; email: string; name: string} | void
    date: string
    description: string | void
    published: boolean
    title: string | void
  }

  interface Event {
    id: string
    date: string
    duration: number
    title: string
    description: string
    joinLink: string
    location: string
    poster: Attachment
    PhotosIds: string[]
  }

  interface Organizer {
    name: string
    title: string
    profile: Attachment
    description: string
    socialMediaType: string
    socialMediaLink: string
    socialMediaType2: string
    socialMediaLink2: string
    published: boolean
    isDraft: boolean // deprecated
  }

  interface Contributor {
    name: string
    link: string
  }
}
