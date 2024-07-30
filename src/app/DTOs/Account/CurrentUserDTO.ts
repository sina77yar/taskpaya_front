export class CurrentUser {
    constructor(
        public userId: number,
        public firstname:string,
        public lastname:string,
        public address?:string,
        public email?:string,
        public phone?:string,
    ) {

    }
}