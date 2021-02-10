let sendAvailable = true;
const emailPattern = /\S+@\S+\.\S+/;

function sendEmail(){
    const input = document.getElementById("email");
    const button = document.getElementById("emailCountDown");
    const alert = document.getElementById("emailAlert");

    if (sendAvailable){
        // Test whether the email address is valid
        if (emailPattern.test(input.value) && input.value.includes("@gatech.edu")){
            alert.innerText = "邮件已发送！如果没有收到，请检查垃圾邮件箱。"
            alert.classList.remove("alert-warning");
            if (!alert.classList.contains("alert-success")){
                alert.classList.add("alert-success")
            }
            alert.style.display = "block";

            sendAvailable = false;
            let num = 10;
            button.innerText = num;
            const timer = setInterval(() => {
                num = num - 1;
                button.innerText = num;
                if (num === 0){
                    button.innerText = "获取验证码";
                    clearInterval(timer);
                    sendAvailable = true;
                }
            }, 1000);
        } else {
            alert.innerText = "请输入正确的GT邮箱"
            alert.classList.remove("alert-success")
            if (!alert.classList.contains("alert-warning")){
                alert.classList.add("alert-warning")
            }
            alert.style.display = "block";
        }

        
    }
}

