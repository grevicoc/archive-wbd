const cardDorayakis = document.querySelectorAll(".dashboard-card")
for (let cardDorayaki of cardDorayakis){
    cardDorayaki.addEventListener('click',()=>{
        console.log(document.location.href);
        const baseURL = document.location.href.split("/dashboard");
        document.location.href = baseURL[0] + '/dorayaki/get?id='+cardDorayaki.getAttribute('id');
        // document.location.pathname = '/dorayaki/'+cardDorayaki.getAttribute('id');
        // console.log(window.location.pathname);
    })
}