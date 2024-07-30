export class  ProductGallery {
    constructor(
        public id: number,
        public createDate: Date,
        public lastUpdateDate: Date,
        public productName: string,
        public imageName: string,
        public isDeleted: boolean,
    ) {

    }

}