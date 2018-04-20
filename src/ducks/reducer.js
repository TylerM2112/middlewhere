const iState = {
    name: '',
    user_id: '',
    picture: null,
    email: null,
    address_count: 0,
    addresses: [],
    notifications: [],
}

const ADD_ADDRESS = "ADD_ADDRESS";
export function addAddress(data) {
    return {
        type: ADD_ADDRESS,
        payload: data,
    }
}

const UPDATE_ALL_ADDRESSES = "UPDATE_ALL_ADDRESSES";
export function updateAllAddresses(data) {
    return {
        type: UPDATE_ALL_ADDRESSES,
        payload: data,
    }
}

const REMOVE_ADDRESS = "REMOVE_ADDRESS";
export function removeAddress(data) {
    return {
        type: REMOVE_ADDRESS,
        payload: data,
    }
}

const UPDATE_ADDRESS = "UPDATE_ADDRESS"
export function updateAddress(data) {
    return {
        type: UPDATE_ADDRESS,
        payload: data
    }
}

const UPDATE_USER = "UPDATE_USER";
export function updateUser(data) {
    return {
        type: UPDATE_USER,
        payload: data,
    }
}

const FORCE_DEFAULT = "FORCE_DEFAULT";
export function forceDefault(data) {
    return {
        type: FORCE_DEFAULT,
        payload: data,
    }
}

const NOTIFICATION_UPDATE = "NOTIFICATION_UPDATE";
export function updateNotifications(data) {
    return {
        type: NOTIFICATION_UPDATE,
        payload: data,
    }
}
const LOGOUT_USER = "LOGOUT_USER";
export function logoutUser(data) {
    return {
        type: LOGOUT_USER,
        payload: data,
    }
}
 


//needing to dispatch action to store users in redux state in order to rerender friends


const GET_USER = "GET_USER";
export function getUser(data) {
    return {
        type: GET_USER,
        payload: data,
    }
}

export default function (state = iState, action) {
    let newState = { ...state };
    let addresses = state.addresses.slice();
    let addressObj = state.addresses.slice();
    let index = '';
    switch (action.type) {
        case UPDATE_ADDRESS:
            if (action.payload.defaultaddress == true) {
                newState.addresses.map(i => {
                    i.defaultaddress = false;
                })
            }
            index = newState.addresses.findIndex(e => e.auto_id === action.payload.auto_id);
            newState.addresses[index] = action.payload
            return newState;
            break;
        case UPDATE_USER:

            newState.name = action.payload.name;
            newState.user_id = action.payload.auto_id;
            newState.picture = action.payload.picture;
            newState.address_count = action.payload.address_count;
            newState.email = action.payload.email;

            if(action.payload.address_count == 0){console.log("hi");return newState}
            if(typeof action.payload.addresses === 'undefined'){ return newState}

            if (action.payload.addresses.length !== 0) {

                let addressArr = action.payload.addresses;
                addressObj = [];
                for (let i = 0; i < addressArr.length; i++) {
                    addressObj.push(addressArr[i]);
                }
                newState.addresses = addressObj;
            }
            return newState;
            break;

        case ADD_ADDRESS:
            if (action.payload.defaultaddress == true) {
                newState.addresses.map(i => {
                    i.defaultaddress = false;
                })
            }
            console.log(action.payload)
            const obj = {
                address1: action.payload.newAddress1,
                city: action.payload.newCity,
                state: action.payload.newState,
                postalcode: action.payload.newPostalcode,
                place: action.payload.newPlaceName,
                lat: action.payload.newLat,
                long: action.payload.newLong,
                auto_id: action.payload.auto_id,
                defaultaddress: newState.address_count === 0 ? true : action.payload.defaultaddress,
            }

            newState.addresses.push(obj)
            newState.address_count += 1;
            return newState;
            break;

        case REMOVE_ADDRESS:
            index = newState.addresses.findIndex(e => e.auto_id === action.payload);
            newState.addresses.splice(index, 1);
            newState.address_count -= 1;
            return newState;
            break;

        case UPDATE_ALL_ADDRESSES: 
            console.log(action.payload.data);    
            let addressArr = action.payload.data;
            addressObj = [];
            for (let i = 0; i < addressArr.length; i++) {
                addressObj.push(addressArr[i]);
            }
            newState.addresses = addressObj;
            return newState;
        
        case FORCE_DEFAULT:   
            newState.addresses[0].defaultaddress = true;
            return newState;
        
        case NOTIFICATION_UPDATE:
        console.log(action.payload)    
        let notificationArr = action.payload;
        let notificationObj = [];
        for (let i = 0; i < notificationArr.length; i++) {
            notificationObj.push(notificationArr[i]);
        }
        newState.notifications = notificationObj;
            return newState;
        
        case LOGOUT_USER:
            return {
            ...state,
            name: '',
            user_id: null,
            picture: null,
            email: null,
            address_count: 0,
            addresses: [],
            notifications: []
            }
        
        default:
            return state;
    }
}

