export function updateLocalStorage(result){
    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log("updatelocalstorage");
    profile.data.result=result;
    localStorage.setItem('profile',JSON.stringify(profile));
}