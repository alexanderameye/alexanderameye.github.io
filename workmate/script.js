function addItem() {
    var ul = document.getElementById("options-list");
    var candidate = document.getElementById("options");
    var li = document.createElement("li");

    if (candidate.value != "") {
        li.setAttribute('id', candidate.value);
        li.appendChild(document.createTextNode(candidate.value));
        ul.appendChild(li);
    }
}

function removeItem() {
    var ul = document.getElementById("options-list");
    var candidate = document.getElementById("options");
    var item = document.getElementById(candidate.value);
    ul.removeChild(item);
}

function AddUser() {
    var url = "https://studev.groept.be/api/a18_sd308/AddUser/";
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    $.get(url + username + "/" + email + "/" + password + "/.php", alert("User added"));
}

function AddQuestion() {
    var url = "https://studev.groept.be/api/a18_sd308/AddQuestion/";
    var title = document.getElementById("title").value;
    var type = document.getElementById("type").value;
    var reward = document.getElementById("reward").value;
    $.get(url + title.replace(/\s/g, "+") + "/" + type + "/" + reward + "/.php", function(data) {
        alert("Question added")

        $.getJSON("https://studev.groept.be/api/a18_sd308/GetQuestionId/" + title.replace(/\s/g, "+") + "/.php", function(data) {
            var ul = document.getElementById("options-list");
            var items = ul.getElementsByTagName("li");
            for (var i = 0; i < items.length; ++i) {
                var text = document.getElementById(i.candidate.value).value;
                $.get("https://studev.groept.be/api/a18_sd308/AddOption/" + text.replace(/\s/g, "+") + "/" + data[0].question_id + "/.php");
            }
        })



    });


}