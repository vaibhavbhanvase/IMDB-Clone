var cl = console.log;

const showModalBtn = document.getElementById("showModalBtn");
const overlay = document.getElementById("overlay");
const myModal = document.getElementById("myModal");
const addMovies = document.getElementById("addMovies");
const title = document.getElementById("title");
const imgUrl = document.getElementById("imgUrl");
const rating = document.getElementById("rating");
const movieContainer = document.getElementById("movieContainer");

const myClose = [...document.querySelectorAll(".myClose")];


let movieArray = JSON.parse(localStorage.getItem("movieArray")) || [];
const temaplating = (arr) => {
    let result = '';
    arr.forEach(obj => {
        result += `
        <div class="col-sm-4">
        <div class="card">
            <div class="card-header">
                <h3>${obj.title}</h3>
            </div>
            <div class="card-body">
                <img src="${obj.imgUrl}" alt="${obj.title}" title="${obj.title}">
            </div>
            <div class="card-footer">
                <p class="text-right m-0 font-weight-bold">
                    ${obj.rating}/5
                </p>
            </div>
        </div>
    </div>
        `
    })
    movieContainer.innerHTML = result
}
temaplating(movieArray);

const modalHandler = (eve) =>{
    overlay.classList.toggle("show")
    myModal.classList.toggle("show")
}

const onAddMovieHandler = (eve) =>{
    eve.preventDefault()
    let obj = {
        title : title.value,
        imgUrl : imgUrl.value,
        rating : rating.value,
    }
    movieArray.unshift(obj);
    // cl(movieArray);
    
    title.value = "";
    imgUrl.value = "";
    rating.value = "";
    modalHandler();
    localStorage.setItem("movieArray",JSON.stringify(movieArray))
    temaplating(movieArray);
}

myClose.forEach(ele => {
    ele.addEventListener("click", modalHandler)
})


const ratingValueHandler = (eve) => {
    let val = eve.target.value;
    cl(val)
    if(val >= 1 && val <= 5){
        eve.target.nextElementSibling.classList.add("d-none")
        return
    }else{
        eve.target.nextElementSibling.classList.remove("d-none")
    }
}


showModalBtn.addEventListener("click", modalHandler);
// addMovie.addEventListener("click", onAddMovieHandler)
addMovies.addEventListener("submit", onAddMovieHandler)
rating.addEventListener("blur", ratingValueHandler)