const saveOptions = () => {
    const passLength = document.getElementById("pass-length").value;

    chrome.storage.sync.set({ passLength: passLength }, () => {
        const status = document.getElementById("status");
        status.textContent = "Options saved.";
        setTimeout(() => {
            status.textContent = "";
        }, 750);
    });
};

const restoreOptions = () => {
    chrome.storage.sync.get({ passLength: 32 }, (items) => {
        document.getElementById("pass-length").value = items.passLength;
    });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
