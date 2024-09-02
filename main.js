// Define
const allTxtare = document.getElementsByTagName('textarea');
const allButton = document.getElementsByTagName('button');

// Main functions

//// 1. for the two synchronous scrolling textarea
allTxtare[0].onscroll = function (e) {
    let perecent = allTxtare[0].scrollTop / (allTxtare[0].scrollHeight - allTxtare[0].clientHeight);
    allTxtare[1].scrollTop = (allTxtare[1].scrollHeight - allTxtare[1].clientHeight) * perecent;
};

//// 2. for spliting into array by new line
function generate() {
    let str1 = allTxtare[0].value;
    let str2 = allTxtare[1].value;
    let str3 = "";

    let arr1 = str1.split("\n");
    let arr2 = str2.split("\n");
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] == "") {
            arr2.splice(i, 0, ""); //add a blank line to the right
            str3 += arr1[i] + "\n";
        } else {
            str3 += arr1[i] + "\n" + arr2[i] + "\n";
        }
    }

    allTxtare[1].value = arr2.join("\n");
    document.getElementById("bilingual").innerText = str3;
}

//// 3. for coping function
function copyLyrics(id) {
    // Select the text field
    allTxtare[id].select();
    allTxtare[id].setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(allTxtare[id].value);

    allButton[id].innerHTML = "Copied!";
    allButton[id].disabled = true;

    // de-select the words in the textarea
    allTxtare[id].selectionStart = allTxtare[id].selectionEnd = -1;
    setTimeout(() => copyTxt(id), 1500);
}

function copyTxt(id) {
    allButton[id].innerHTML = "Copy";
    allButton[id].disabled = false;
}

function copyElementText() {
    let text = document.getElementById("bilingual").innerText;
    let elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    navigator.clipboard.writeText(elem.value);
    document.body.removeChild(elem);

    allButton[3].innerHTML = "Copied!";
    allButton[3].disabled = true;
    setTimeout(() => copyTxt(3), 1500);

    allTxtare[0].value = "";
    allTxtare[1].value = "";
}

// Button trigger
allButton[0].addEventListener('click', function() {
    copyLyrics(0, 'butL');
});

allButton[1].addEventListener('click', function() {
    copyLyrics(1, 'butR');
});

allButton[2].addEventListener('click', function() {
    generate();
});

allButton[3].addEventListener('click', function() {
    copyElementText();
});

