let registerForm=document.querySelector("form");
let usernameInput =document.getElementById("user_name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");


registerForm.addEventListener('submit',function(e){
    e.preventDefault();

    const usernameValue=usernameInput.value.trim();
    const emailValue=emailInput.value.trim();
    const passwordValue=passwordInput.value.trim();

    if(usernameValue==="" ||emailValue===""||passwordValue===""){
        showNotification("Please fill in all fields!", "error");
        return;
    }

    const newUser={
        id:Date.now(),
        username:usernameValue,
        email:emailValue,
        password:passwordValue
    };

    let usersList=JSON.parse(localStorage.getItem("allUsers"))||[];

    const isEmailExist=usersList.some(user => user.email === emailValue );
    if(isEmailExist){
        showNotification("this email is already registered ", "error");
        return;
    }

    usersList.push(newUser);
    localStorage.setItem("allUsers",JSON.stringify(usersList));

    showNotification("Registration successful! Redirecting...", "success");

    setTimeout(()=>{
        window.location.href="Login.html"
    },2000);

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