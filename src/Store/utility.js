export const UpdateObject =(oldObject, UpdateProperties) =>{
    return {
       ...oldObject,
       ...UpdateProperties
    }
}