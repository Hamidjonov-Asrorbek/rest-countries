// darkmode
const darkmode = document.querySelector(".darkmode");
const body = document.querySelector('body');
const dark_icon = document.querySelector('.dark_icon');
const ligth_icon = document.querySelector('.ligth_icon');
const darkText = document.querySelector(".dark__text");

const states = document.querySelector(".states");
const loader = document.querySelector('.loader');
const input = document.getElementById('input');
const search_error__text = document.querySelector('.search_error__text');
const select = document.getElementById('select');
const form = document.getElementById('searchForm');
const errorText = document.querySelector(".error_text");


// darkmode localStorage 

if (localStorage.getItem("darkMode") === "dark") {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    darkText.textContent = "Lightmode";
    dark_icon.classList.add("hidden");
    ligth_icon.classList.remove("hidden");
    dark_icon.classList.add("hidden");
} else if (localStorage.getItem("darkMode") === "light"){
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    darkText.textContent = "Darkmode";
    ligth_icon.classList.add("hidden");
    dark_icon.classList.remove("hidden");
}

darkmode.addEventListener( "click", (e) =>{
    e.preventDefault();
    if(document.body.classList.contains("light")){
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        darkText.textContent = "Lightmode";
        ligth_icon.classList.remove("hidden");
        dark_icon.classList.add("hidden");
        localStorage.setItem("darkMode", "dark");
    }
    else{
        document.body.classList.add('light');
        document.body.classList.remove('dark')
        darkText.textContent = "Darkmode";
        ligth_icon.classList.add("hidden");
        dark_icon.classList.remove("hidden");
        localStorage.setItem("darkMode", "light");
    }
})

// ************************************

loader.classList.remove('hidden');

// createState 
function createState(data){
    states.innerHTML = ""
    data.data.forEach((item) => {
        const state = document.createElement('div');
        state.classList.add('state');
        state.innerHTML = `
                <a href='/pages/about.html?slug=${item.name.slug}'>
                <img src=${item.flags.png} alt=""> <hr>
                <div class="state__text">
                    <p class="state__title">${item.name.common}</p>
                    <div class="state_desc">
                        <div class='state__desc_item'><p>Population: </p><span>${item.population}</span></div>
                        <div class='state__desc_item'><p>Region: </p><span>${item.region}</span></div>
                        <div class='state__desc_item'><p>Capital: </p><span>${item.capital}</span></div>
                    </div>
                </div>
                </a>
            `
        states.appendChild(state);
    });
}



    // form.addEventListener('submit', (event) =>{
    //     event.preventDefault();
    //     const url =`https://frontend-mentor-apis-6efy.onrender.com/countries?search=${input.value.trim()}`
    //         fetch(url)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             loader.classList.add('hidden');
    //             createState(data)})
    //         .catch((error) =>{
    //             loader.classList.add('hidden');
    //             // errorEL.classList.remove('hidden');
    //         });
    //         input.value = "";
    //     });


// select change
select.addEventListener('change', (e) =>{
    input.value = ""
    states.innerHTML = ""
    loader.classList.remove('hidden');

    getState(e.target.value);

    // search in select

})

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let url =`https://frontend-mentor-apis-6efy.onrender.com/countries?region=${select.value}&search=${input.value.trim()}`;
    loader.classList.remove('hidden');
    states.innerHTML = ""
    if(select.value == "All"){
        url =`https://frontend-mentor-apis-6efy.onrender.com/countries?search=${input.value.trim()}`;
    }  
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
            loader.classList.add('hidden');
            createState(data)})
        .catch((error) =>{
        });
});


function newError(){
    states.innerHTML = "Error"
}

// https://frontend-mentor-apis-6efy.onrender.com/countries?region=Asia&search=uzb


getState("All");

function getState(dataType){
    let urlData = `https://frontend-mentor-apis-6efy.onrender.com/countries?region=${dataType}`
    if(dataType=="All"){
        urlData = 'https://frontend-mentor-apis-6efy.onrender.com/countries'
    }
    fetch(urlData)
        .then((res) => res.json())
        .then((data) => {
            loader.classList.add('hidden');
            createState(data)})
        .catch((error) =>{
            loader.classList.add('hidden');
            // errorEL.classList.remove('hidden');
        });
}
