const iState = {
    name: '',
    user_id:4,
    picture:null,
    email:null,
    address_count:0,
    addresses:[1,2],
}

const ADD_ADDRESS = "ADD_ADDRESS";
export function addAddress(data){
    return{
        type:ADD_ADDRESS,
        payload:data,
    }
}

const REMOVE_ADDRESS = "REMOVE_ADDRESS";
export function removeAddress(data) { 
    return {
        type: REMOVE_ADDRESS,
        payload: data,
    }
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
    let index = '';
    switch(action.type){
        
        
        case UPDATE_ADDRESS:
            addresses[0].address1 = action.payload.address1;
            newState.addresses = addresses;

            return newState;
        
        case UPDATE_USER:
        console.log(action.payload.name)    
            newState.name = action.payload.name;
            newState.user_id = action.payload.auto_id;
            newState.picture = action.payload.picture;
            newState.address_count = action.payload.address_count;
            newState.email = action.payload.email;

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
        
        case ADD_ADDRESS:
            const obj = {
                address1: action.payload.newAddress1,
                city: action.payload.newCity,
                state: action.payload.newState,
                postalcode: action.payload.newPostalcode,
                place: action.payload.newPlaceName,
                lat: action.payload.newLat,
                long: action.payload.newLong,
                auto_id: action.payload.auto_id,
            }

            newState.addresses.push(obj)
            return newState;
            break;
        
        case REMOVE_ADDRESS:
        console.log("HEY ME", JSON.stringify(newState.addresses))    
            index = newState.addresses.findIndex(e => e.auto_id === action.payload);
            console.log("SNOT", index)
            newState.addresses.splice(index, 1);
            return newState;
        
        default:
            return state;
    }
}

