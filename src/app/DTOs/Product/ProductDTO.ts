export class ProductDTO {
    constructor(
        public id: number,
        public createDate: Date,
        public productName: string,
        public price: number,
        public stock: number,
        public shortDescription: string,
        public description: string,
        public imageName: string,
        public isExist: boolean,
        public isSpecial: boolean,
        public isDiscounted: boolean,
        public weight: string,
        public barcode: string,
        public discountPercent: string,
        public productSelectedCategory:string
    ) {

    }

}