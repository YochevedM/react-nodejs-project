export const loadState = () =>{
    try{
        const serializedData = sessionStorage.getItem('state');
        if(serializedData == null){
            return undefined;
        }
        return JSON.parse(serializedData)
    } catch(err){
        return null;
    }
}

export const saveState = (state)=>{
    try{
        const serializedData = JSON.stringify(state);
        sessionStorage.setItem('state', serializedData)
    } catch(err){
        console.log(err);
    }
}