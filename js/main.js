
/* 
    Fetch Universe Hub Using Funtions
*/
const fetchUniverseHub = (datalimit, sortBydate) =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;  
    fetch(URL) 
    .then(res => res.json())
    .then(data => displayUniverseHub(data.data.tools, datalimit, sortBydate)) 
}

/*
    Display All Universe Data
*/

let showUniverseDisplay = 6;
let sortType = 'ascending';
const displayUniverseHub = (universHub, datalimit, sortBydate) =>{ 
  const unverseWrapper = document.getElementById('universe-wrappr');  
  unverseWrapper.innerHTML = "";
 const seeMore = document.getElementById('see-more');  

//Sort By Date
 if (sortBydate) {
    data = universHub.sort(function(a, b){
        if (sortBydate === 'ascending') { 
        return new Date(b.published_in) - new Date(a.published_in);
        } else {
        return new Date(a.published_in) - new Date(b.published_in);
        }
    })
    }
 //Data Limit & Slice
 if(datalimit && universHub.length > 6) {
    seeMore.classList.remove('d-none'); 
    universHub = universHub.slice(0, 6); 
 }else {
    seeMore.classList.add('d-none'); 
 }

  // Get Universe Item by Foreah funtions
  universHub.forEach(universe => {
    const div = document.createElement('div'); 
    div.classList.add('col');   
    const {image, features, name, published_in, id} = universe;  
    div.innerHTML = ` 
    <div class="card p-3">
    <div class="universe-img">
    <img src="${image}" class="card-img-top rounded-4" alt="...">
    </div>
    <div class="card-body p-0">
      <h5 class="card-title pt-3">Features</h5> 
      <ol id="features-list">  
      ${features
        .map(
        (feature, index) => `
        ${index + 1}. ${feature}
        `
        )
        .join(" <br> ")}
      </ol>
      <div class="card-bottom d-flex justify-content-between border-top pt-4 mt-4">
        <div class="ai-left">
            <h5 class="card-title pb-2">${name}</h5>
            <h6 class="d-flex gap-2"><img src="images/date.png" alt="date"><span>${published_in}</span></h6>
        </div>
        <div class="ai-right">
        <button type="button" onclick="fetchUniverseDetails('${id}')" class="border border-0 p-3 rounded-circle bg-light" data-bs-toggle="modal" data-bs-target="#universeModal">
        <img src="images/arrow-icon.png" alt="Arrow">
        </button> 
        </div>
      </div> 
    </div>
  </div>
  
  `
  unverseWrapper.appendChild(div); 
  });
  LoadingSpinner(false);
}

/*
    Fetch Universe Hub Details
*/

const fetchUniverseDetails = (universeId) =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${universeId}`;  
    fetch(URL)
    .then(res => res.json())
    .then(data => displayUniverseDetails(data.data)) 
}

/* 
    Display Universe Hub Details  
*/

const displayUniverseDetails = (singleData) =>{    

    // Object distructuring
    const {description, pricing, input_output_examples, image_link, accuracy, features, integrations} = singleData;  
    const descriptionTitle = document.getElementById('universeModalLabel');
    descriptionTitle.innerHTML = description;
    const univerImage = document.getElementById('universe-img');
    univerImage.innerHTML =` <img class="w-100" src="${image_link[0] ? image_link[0] : 'No Found Image'}"> `
    const exampleTitle = document.getElementById('example-title');
    const exampleContent = document.getElementById('example-content');
    if(input_output_examples === null || input_output_examples === ""){
        exampleTitle.innerText = 'Can you give any example?';
        exampleContent.innerText = 'No! Not Yet! Take a break!!!';
    }else{
        exampleTitle.innerHTML = input_output_examples[0].input; 
        exampleContent.innerHTML = input_output_examples[0].output;
    } 
    const basicPrice = document.getElementById('basic-price'); 
    const proPrice = document.getElementById('pro-price');
    const enterPrice = document.getElementById('enterprice');
    if(pricing === null){
        basicPrice.innerText = 'Free Of Cost/Basic';
        proPrice.innerText = 'Free Of Cost/Pro';
        enterPrice.innerText = 'Free of Cost /Enterprise';
    }else if(pricing[0].price === 'No cost' || pricing[1].price === 'No cost' || pricing[2].price === 'Contact us'){
        basicPrice.innerText = 'Free Of Cost/Basic';
        proPrice.innerText = 'Free Of Cost/Pro';
        enterPrice.innerText = 'Free of Cost /Enterprise';
    } 
    else{
        basicPrice.innerHTML = pricing[0].price; 
        proPrice.innerHTML =  pricing[1].price; 
        enterPrice.innerHTML = pricing[2].price;
    }
     
    //Accuracy Button 
    const btnAccuracy = document.getElementById('btn-accuracy');  
    const btn = document.getElementById('btn-acc-wrapper'); 
     if(accuracy.score === null || accuracy.score === ""){
        btn.style.display = "none"; 
     }else{
        btnAccuracy.innerHTML = 100 * accuracy.score;
        btn.style.display = "block";
     }
      
    //Get Features List
    const featuresList = document.getElementById('single-features-wrapper');
    featuresList.innerHTML = ""; 
    const featuresValue = Object.values(features); 
    featuresValue.map(item =>{
        const li = document.createElement('li');
        li.innerHTML = item.feature_name ? item.feature_name : 'No data Found';
        featuresList.appendChild(li); 
    }) 

    //Get Integrations list 
    const integrationsList = document.getElementById('intergration-list');
    integrationsList.innerHTML = "";    
    const integrationName = integrations;  
    if(integrationName){
    integrations.map(listItem =>{
        const li = document.createElement('li'); 
            li.innerHTML = listItem; 
        integrationsList.appendChild(li); 
    }) 
    }else{
    integrationsList.innerHTML = "No data Found";    
    }     
}

/*
    Default load data using funtions
*/
const LoadingData = (dataLimit) => {
    fetchUniverseHub(dataLimit);
}

/*
    Get speener functions
*/
const LoadingSpinner = isLoading => {
    const spinner = document.getElementById('spenner');
    if (isLoading === true) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}

/*
    Short By Date
*/

const sortByDate = () =>{ 
 fetchUniverseHub(showUniverseDisplay, sortType);
 sortType == 'ascending' ? sortType = 'descending' : sortType = 'ascending'; 
}

/*
    See More Button All Universe Item
*/
const showDefaultLimit = fetchUniverseHub(6);
document.getElementById('btn-seemore').addEventListener('click', function(){
    LoadingSpinner(true);
    fetchUniverseHub();
});