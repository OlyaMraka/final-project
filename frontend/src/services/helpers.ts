export const getItemFromLocalStorage = <T>(key: string) => {
    const item = localStorage.getItem(key);
    if(!item){
        return {} as T;
    }
    const parsedItem = JSON.parse(item);
    return parsedItem as T;
};

export const removeTokenFromStorage = () => {
    localStorage.removeItem("token");
};
