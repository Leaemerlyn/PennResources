export const popUpKey = new Map();

export const setDeleteKey = (newKey) => {
    popUpKey.set("delete", newKey)
};

export const setSignOutKey = (newKey) => {
    popUpKey.set("signout", newKey)
}