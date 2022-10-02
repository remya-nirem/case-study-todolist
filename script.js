//login form validation with callback. Function called from form button click event
function validateform(callback) {
    var uname = document.getElementById("username");
    var pswd = document.getElementById("password");
    var err = document.getElementById("errmsg");

    if(uname.value.trim() === ""){
        err.innerHTML ="Please enter Username";
        uname.focus();
    }
    else if (pswd.value.trim() === ""){
        err.innerHTML = "Please enter Password";
        pswd.focus();
    }
    else if(uname.value != 'admin' || pswd.value != '12345'){
        err.innerHTML = "Username or password not matching.";
    }
    else {
        callback();
    }
}

function loginsuccess(){
    window.location.replace("todo.html");
}

// todo page logout link click event for redirect to login page
function gotologin(){
    window.location.replace("login.html");
}

// list the tasks as dynamic checkboxes with click event from API when todo page loads
function loadtodolist(){  
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //const jsonObj = JSON.parse(this.responseText);
            // const data = jsonObj.filter(obj => obj.userId ==1);
            const data = JSON.parse(this.responseText);            
            var ulcontainer = document.getElementById('tasklist');

            for (var i=0;i<data.length;i++){
                var list = document.createElement('li');
                list.setAttribute("class","list-group-item");

                var dvlist = document.createElement('div');
                dvlist.setAttribute("class","custom-control custom-checkbox");
                
                var checkbox = document.createElement('input');
                checkbox.setAttribute("class","custom-control-input");
                checkbox.type = 'checkbox';
                checkbox.id = 'chkbox' + data[i].id;
                checkbox.name = 'chkbox' + data[i].id;
                checkbox.value = data[i].title;

                if(data[i].completed === true){
                    checkbox.checked = true;
                    checkbox.disabled = true;
                } 
                else {
                    checkbox.addEventListener("click", chkNumbers, false);
                }               
            
                var label = document.createElement('label');
                label.setAttribute("class","cursor-pointer font-italic d-block custom-control-label");
                label.htmlFor = 'chkbox' + data[i].id;
                label.appendChild(document.createTextNode(data[i].title));                                
                
                dvlist.appendChild(checkbox);
                dvlist.appendChild(label);
                list.appendChild(dvlist);
                ulcontainer.appendChild(list);
            }               
        }
    };
    xhttp.send();    
}


// promise() for checking 5 tasks selected alert message display
var count = 0;
function taskMessage(cnt){
    if(cnt == 5){
        alert("Congrats. 5 Tasks have been Successfully Completed!!!");
    }
}

function chkNumbers(){
    var chkBox = this;
    
    let chkNumPromise = new Promise(function(resolve,reject){
        if(chkBox.checked == true) {
            resolve(++count);
        }
        else {
            reject(--count);                     
        }    
    });

    chkNumPromise.then(
        function(value) { taskMessage(value);}
    )  
    .catch(
        function(error) { console.log("task deselected");}
    )
        
    //method2 - promise
    //     if(chkBox.checked){
    //         count++;
    //     }   
    //     else {
    //         count--;
    //     }

    //     let chkNumPromise = new Promise(function(resolve,reject){
    //         if(count == 5){
    //             resolve("Congrats. 5 Tasks have been Successfully Completed!!!");
    //         }
    //         else {
    //             reject("Less than 5 or more than 5 tasks selected")
    //         }        
    //     });
    
    //    chkNumPromise.then(
    //         function(value) {displayMessage(value);} 
    //    )    
}