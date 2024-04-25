const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('slug');
const card = document.querySelector('.card');
const loader = document.querySelector('.loader');
console.log(myParam);

// darkmode
const darkmode = document.querySelector(".darkmode");
const body = document.querySelector('body');
const dark_icon = document.querySelector('.dark_icon');
const ligth_icon = document.querySelector('.ligth_icon');
const darkText = document.querySelector(".dark__text")


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


function createStateItem(data){
        card.innerHTML = `
        <img src=${data.flags.png} width="560" height="401" alt="${data.flags.alt}">
                    <div class="card__text">
                        <h1 class="text__title">${data.name.common}</h1>
                        <div class="card__desc">
                        <div class="right_desc">
                        <div class='state__desc_item1'><p>Native Name:</p><span>${data.name.nativeName}</span></div>
                                <div class='state__desc_item1'><p>Population: </p><span>${data.population}</span></div>
                                <div class='state__desc_item1'><p>Region: </p><span>${data.region}</span></div>
                                <div class='state__desc_item1'><p>Sub Region: </p><span>${data.subregion}</span></div>
                                <div class='state__desc_item1'><p>Capital: </p><span>${data.capital}</span></div>
                            </div>
                            <div class="left_desc">
                                <div class='state__desc_item1'><p>Top Level Domain:</p><span>${data.cca3}</span></div>
                                <div class='state__desc_item1'><p>Currencies:</p><span>${data.currencies}</span></div>
                                <div class='state__desc_item1'><p>Languages:</p><span>${data.languages.slice(0, 3)}</span></div>
                            </div>
                        </div>
                        <div class='border_items'><p style="margin-right: 10px;">Border Countries:</p><div class="border__card"></div></div>
                `
                const border__card = document.querySelector('.border__card');
                data.borders.forEach((item) =>{
                    if(item.common.length){
                        border__card.innerHTML += `
                        <a href="./about.html?slug=${item.slug}" class="border_btn">${item.common}</a>
                        ` 
                    }
                    else {
                        border__card.innerHTML += `<a>Not found</a>`
                    }
                })
}

loader.classList.remove('hidden');
function getState(){
    let urlData = `https://frontend-mentor-apis-6efy.onrender.com/countries/${myParam}`
    fetch(urlData)
    .then((res) => res.json())
    .then((data) => {
        createStateItem(data)
        loader.classList.add('hidden')
    })
        .catch((error) =>{
            loader.classList.add('hidden');
            // errorEL.classList.remove('hidden');
        });
    console.log(urlData);
}
getState();