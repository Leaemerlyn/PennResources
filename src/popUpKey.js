export const popUpKey = new Map();

export const setDeleteKey = (newKey) => {
    popUpKey.set("delete", newKey)
};

export const setSignOutKey = (newKey) => {
    popUpKey.set("signout", newKey)
}

export const setSignInKey = (newKey) => {
    popUpKey.set("signin", newKey)
}