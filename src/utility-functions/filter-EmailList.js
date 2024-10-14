// export const filterEmailList = (emailList, filter, favoritesIndexArray, readIndexArray) => {
//     const filters = {
//         UNREAD: (item) => !readIndexArray.includes(item.id),
//         READ: (item) => readIndexArray.includes(item.id),
//         FAVORITES: (item) => favoritesIndexArray.includes(item.id),
//     };

//     return emailList.filter(filters[filter]);

// };

export const filterEmailList = (emailList, filter, favoritesIndexArray, readIndexArray) => {
    const filters = {
        UNREAD: (item) => !readIndexArray.includes(item.id),
        READ: (item) => readIndexArray.includes(item.id),
        FAVORITES: (item) => favoritesIndexArray.includes(item.id),
    };

    const filterFunction = filters[filter];
    if (!filterFunction) {
        return emailList;
    }

    return emailList.filter(filterFunction);
};
