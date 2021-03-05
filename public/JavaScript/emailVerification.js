let sendAvailable = true;
console.log("hi");
const emailPattern = /\S+@\S+\.\S+/;

async function sendEmail(recaptchaChallengeResponse){
    const input = document.getElementById("email");
    const button = document.getElementById("emailCountDown");
    const alert = document.getElementById("emailAlert");

    const showError = (msg) => {
        alert.innerText = msg;
        alert.classList.remove("alert-success");
        if (!alert.classList.contains("alert-warning")){
            alert.classList.add("alert-warning");
        }
        alert.style.display = "block";
    }

    const showInfo = (msg) => {
        alert.innerText = msg;
        alert.classList.remove("alert-warning");
        if (!alert.classList.contains("alert-success")){
            alert.classList.add("alert-success");
        }
        alert.style.display = "block";
    }

    if (sendAvailable){
        // Test whether the email address is valid
        if (emailPattern.test(input.value) && input.value.endsWith("@gatech.edu")){
            try {
                const req = await fetch(`/send_verification?mail=${input.value}&recaptchaResponse=${recaptchaChallengeResponse}`);
                const res = await req.json();

                if (res.error && res.message) {
                    showError(res.message);
                } else {
                    showInfo(res.message);
                }
            } catch (e) {
                showError(e.message);
            } finally {
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
            }
        } else {
            showError("请输入正确的GT邮箱");
        }
    }
}

