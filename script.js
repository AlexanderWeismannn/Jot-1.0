// Get all button, font, formatting groups
let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// List of all the fonts
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
];

//Initialize Settings
const initializer = () => {
    highlighter(alignButtons,true);
    highlighter(spacingButtons,true);
    highlighter(formatButtons,false);
    highlighter(scriptButtons,true);

    //create options for font names
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // font size
    for(let i = 1; i < 7; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    // default size
    fontSizeRef.value = 3;
};

//main logic
const modifyText = (command, defaultUI, value) => {
    //executes command on the selected text
    document.execCommand(command,defaultUI,value);
};

// options w/ no value parameters
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id,false,null);
    });
});

//options with value parameters
advancedOptionButton.forEach((button) => {
    button.addEventListener("change",() => {
        modifyText(button.id, false,button.value)
    });
});

//link option
linkButton.addEventListener("click",() => {
    let userLink = prompt("Enter a URL");
    //if link its http then pass directly, otherwise add http
    if(/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink);
    }else{
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});


//highlight the clicked buttons
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            // needsRemoval = true means that only one button should be highlighed
            if(needsRemoval){
                let alreadyActive = false;

                //if the button clicked is already active
                if(button.classList.contains("active")){
                    alreadyActive = true;
                }

                //remove highlight from other buttons
                highlighterRemover(className);
                if(!alreadyActive){
                    //highlight clicked button
                    button.classList.add("active");
                }
            }else{
                // if other buttons can be highlighted
                button.classList.toggle("active");
            }
        });
    });
};
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

window.onload = initializer();