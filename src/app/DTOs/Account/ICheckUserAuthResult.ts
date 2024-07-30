export interface ICheckUserAuthResult{
    status:string,
    data:{
        userId:number,
        firstname:string,
        lastname:string,
        email:string,
        address:string,
        phone:string,
    }
}