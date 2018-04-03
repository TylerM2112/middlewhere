const iState = {
    name:null,
    user_id:null,
    picture:null,
    address_count:0,
    addresses:[1,2],
}

const UPDATE_ADDRESS="UPDATE_ADDRESS"
export function updateAddress(data){
    return{
        type:UPDATE_ADDRESS,
        payload:data
    }
}

const UPDATE_USER = "UPDATE_USER";
export function updateUser(data){
    return{
        type:UPDATE_USER,
        payload:data,
    }
}

export default function (state=iState,action){
    let newState = {...state};
    let addresses = state.addresses.slice();
    let addressObj = state.addresses.slice();
    switch(action.type){

        case UPDATE_ADDRESS:
            addresses[0].address1 = action.payload.address1;
            newState.addresses = addresses;

            return newState;
        case UPDATE_USER:
            newState.name = action.payload.name;
            newState.user_id = action.payload.user_id;
            newState.picture = action.payload.picture;
            newState.address_count = action.payload.address_count;

            if(action.payload.address_count !== 0){

                let addressArr = action.payload.addresses;
                addressObj = [];
                for(let i = 0;i<addressArr.length;i++){
                    addressObj.push(addressArr[i]);
                }
                newState.addresses = addressObj;
            }

            return newState;
            break;
    
        default:
            return state;
    }

}