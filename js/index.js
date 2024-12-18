//^ Html elements
var body=document.getElementById('body');
console.log(body)
var siteName=document.getElementById('siteName');
var siteUrl=document.getElementById('siteUrl');
var bookmarkContainer=document.getElementById('bookmarkContainer');
var popup=document.querySelector('.box');

//* App variables

var nameRegex=/^[A-Z|| a-z]{3,}$/;
var urlRegex=/^(https?:\/\/)?(www\.)?[a-z]{3,}\.(com|net|dev)$/;
var bookmarkList = JSON.parse(localStorage.getItem("bookmarks")) || [];
displayBookmarks();

//dismiss popup
function dismiss(ev){
    popup.classList.remove('display-visible');
}

function addBookmark(){
   if(validate(nameRegex,siteName)&& validate(urlRegex,siteUrl)){
       bookmark={
           name:siteName.value,
           url: siteUrl.value,
        }
        bookmarkList.push(bookmark);
        localStorage.setItem("bookmarks" ,JSON.stringify(bookmarkList))
        console.log(bookmark);
        displayBookmark(bookmarkList.length-1);
        clear();
    }else{
        popup.classList.add('display-visible');
    }
}

function displayBookmark(index){
    var bookmarkHTML=`
    <tr class="text-center">
       <th scope="row">${index+1}</th>
       <td>${bookmarkList[index].name}</td>
       <td><a class="btn visit" href="https://${bookmarkList[index].url}" target="_blank">
       <span class="me-1"><i class="fa-solid fa-eye"></i></span> Visit</a></td>
       <td><button class="btn delete" onclick="deleteBookmark(${index})"><span class="me-1"><i class="fa-solid fa-trash-can"></i></span>Delete</button></td>
     </tr>     
   `
   bookmarkContainer.innerHTML+=bookmarkHTML;
    
}

function displayBookmarks(){
    for(var i=0 ; i<bookmarkList.length; i++){
       displayBookmark(i)
    }
}

function clear(){
    siteName.value="";
    siteUrl.value="";
    siteName.classList.remove('valid','is-valid');
    siteUrl.classList.remove('valid','is-valid');
}

function deleteBookmark(index){
    bookmarkList.splice(index,1);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarkList));
    bookmarkContainer.innerHTML=" ";
    displayBookmarks();
}

function validate(regex,element){
    if(regex.test(element.value)){
        element.classList.add("is-valid");
        element.classList.add('valid');
        element.classList.remove('is-invalid');
        element.classList.remove('invalid');
        return true;
    }else{
        element.classList.add('is-invalid');
        element.classList.add('invalid');
        element.classList.remove('is-valid');
        element.classList.remove('valid');
        return false;
    }
}

