export function updateLocalStorage(result){
    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log("updatelocalstorage");
    profile.data.result=result;
    localStorage.setItem('profile',JSON.stringify(profile));
}
export function getNameLocalStorage(id){
    const IdName= JSON.parse(localStorage.getItem('userIdAndName')).data;
    return IdName[id];
}
export function getDomainNameLocalStorage(id){
    const IdName= JSON.parse(localStorage.getItem('domainIdAndName')).data;
    return IdName[id];
}