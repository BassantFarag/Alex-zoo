const formLogin=document.querySelector("form");
const emailInput=document.getElementById("email");
const passwordInput=document.getElementById("password");

formLogin.addEventListener("submit",function(e){
    e.preventDefault();

    const emailValue=emailInput.value.trim();
    const passwordValue=passwordInput.value.trim();

    if(emailValue===""||passwordValue===""){
        showNotification("please fill in all field","error");
        return;
    }

    let usersList=JSON.parse(localStorage.getItem("allUsers")) || [];

    const foundUser=usersList.find(user => user.email === emailValue);
    if(!foundUser){
        showNotification("this email don'y exist! pleaase register first .","error");

    }else if(foundUser.password !== passwordValue){
        showNotification("incorrect password ! try again ","error");

    }else{
        showNotification(`Welcome Back ,${foundUser.username}`,"success");
        localStorage.setItem("currentUser",foundUser);

        setTimeout(() => {
            window.location.href="index.html";
        }, 2000);
    }


})






function showNotification(message, type){
    const div_message=document.createElement("div");
    div_message.innerHTML=message;

    div_message.className=`fixed bottom-5  left-1/2 -translate-x-1/2  px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 transform translate-y-10 opacity-0 z-50`;

    if(type=="error"){
        div_message.classList.add("bg-red-500")
    }else{
        div_message.classList.add("bg-green-500")
    }

    document.body.appendChild(div_message);

    setTimeout(() => {
        div_message.classList.remove("translate-y-10","opacity-0");
    }, 100);

    setTimeout(()=>{
        div_message.classList.add("translate-y-10","opacity-0");
        setTimeout(()=>{
            div_message.remove();
        },300)
    },2500)
}