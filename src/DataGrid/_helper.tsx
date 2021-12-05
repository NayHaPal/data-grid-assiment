export const clone = (data:object)=>{
    return JSON.parse(JSON.stringify(data))
}