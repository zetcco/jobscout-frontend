export const getQuery = (query) => {
    let out_query = ""
    Object.keys(query).forEach(key => {
        console.log(query[key])
        out_query += query[key].length === 0 ? '' : `${key}=${
            ((typeof query[key] === 'string') ? query[key] : query[key].map(obj => obj.id).join(","))
        }&` 
    })
    return out_query;
}