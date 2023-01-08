// export const toPromise = <T>(data: T): Promise<T> => {  
//     return new Promise<T>(resolve => { resolve(data);  });
// };
import * as bcrypt from'bcryptjs';


export const comparePassword=(password:string,hash:string)=>{
    return bcrypt.compareSync(password,hash)
}

export const hasPassword=(password:string)=>{
    return bcrypt.hashSync(password,10)
}
