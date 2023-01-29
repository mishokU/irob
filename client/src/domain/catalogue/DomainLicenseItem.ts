export class DomainLicenseItem {

    type: string | undefined
    mediaUrl: string | undefined
    name: string | undefined
    avatarUrl: string | undefined
    date: string | undefined
    shortDescription: string | undefined
    creationDate: string | undefined
    contentAuthor: string | undefined

    constructor(name: string, shortDescription: string, contentAuthor: string, creationDate: string) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.contentAuthor = contentAuthor;
        this.creationDate = creationDate
    }

}