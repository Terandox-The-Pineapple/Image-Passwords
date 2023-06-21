const iPCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.+-_";

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
    let id = field.id || null;
    let name = field.id === null ? field.name : null;
    const NewPasswordField = document.createElement("input");
    NewPasswordField.type = "file";
    NewPasswordField.accept = "image/png, image/gif, image/jpeg";
    NewPasswordField.style = styles;
    NewPasswordField.classList = classes;
    NewPasswordField.id = (id !== null ? id : name) + "-image-field";
    NewPasswordField.parentId = id !== null ? id : name;
    NewPasswordField.idType = id !== null ? "id" : "name";
    NewPasswordField.addEventListener("change", ReadImageAsText);
    field.parentNode.insertBefore(NewPasswordField, field);
    field.style.display = "none";
};

const ReadImageAsText = (evt) => {
    let newPasswordField = evt.currentTarget;
    let image = newPasswordField.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        let newPassword = GenerateNewPassword(reader.result);
        let oldPasswordField = newPasswordField.idType === "id" ? document.getElementById(newPasswordField.parentId) : document.getElementsByName(newPasswordField.parentId)[0];
        oldPasswordField.value = newPassword;
    };
    reader.readAsDataURL(image);
};

const GenerateNewPassword = (seed) => {
    return chrome.storage.sync.get({ passLength: 32 }, (items) => {
        let length = items.passLength;
        let newRng = new Math.seedrandom(seed);
        let newPassword = "";
        for (var i = 0, n = iPCharacters.length; i < length; ++i) {
            newPassword += iPCharacters.charAt(Math.floor(newRng() * n));
        }
        return newPassword;
    });
};

CheckPassfield();
