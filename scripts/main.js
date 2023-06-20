const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.+-_";

const CheckPassfield = () => {
    let passwordField = document.querySelectorAll("input[type=password]") || null;
    if (passwordField !== null) {
        passwordField.forEach((field) => {
            ReplacePasswordField(field);
        });
    }
};

/**
 *
 * @param {Element} field
 */
const ReplacePasswordField = (field) => {
    let classes = field.classList;
    let styles = field.style;
    let id = field.id;
    const NewPasswordField = document.createElement("input");
    NewPasswordField.type = "image";
    NewPasswordField.style = styles;
    NewPasswordField.classList = classes;
    NewPasswordField.id = id + "-image-field";
    NewPasswordField.parentId = id;
    NewPasswordField.addEventListener("change", ReadImageAsText);
    field.parentElement.appendChild(NewPasswordField);
    field.style.display = "none";
};

const ReadImageAsText = (evt) => {
    let newPasswordField = evt.currentTarget;
    let image = newPasswordField.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        let newPassword = GenerateNewPassword(reader.result);
        let oldPasswordField = document.getElementById(newPasswordField.parentId);
        oldPasswordField.value = newPassword;
    };
    reader.readAsDataURL(image);
};

const GenerateNewPassword = (seed) => {
    let newRng = new Math.seedrandom(seed);
    let newPassword = "";
    let length = 128;
    for (var i = 0, n = characters.length; i < length; ++i) {
        newPassword += characters.charAt(Math.floor(newRng() * n));
    }
    return newPassword;
};

chrome.scripting.executeScript({
    target: { tabId: GetCurrentTabId() },
    function: CheckPassfield,
});
