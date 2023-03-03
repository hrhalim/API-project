
/* 
    Fetch Universe Hub Using Funtions
*/
const fetchUniverseHub = (datalimit) =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tools`; 
    fetch(URL)
    .then(res => res.json())
    .then(data => displayUniverseHub(data.data.tools, datalimit))
}


/*

    Display All Universe Data

*/


const displayUniverseHub = (universHub, datalimit) =>{
    console.log(universHub);
  const unverseWrapper = document.getElementById('universe-wrappr');  
  unverseWrapper.innerHTML = "";
 const seeMore = document.getElementById('see-all');  
 
 //Data Limit & Slice
 if(datalimit && universHub.length > 6) {
    seeMore.classList.remove('d-none'); 
    universHub = universHub.slice(0, 6); 
 }else {
    seeMore.classList.add('d-none'); 
 }

  // Get Universe Item by Foreah funtions
  universHub.forEach(universe => {
    // console.log(universe);
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
    console.log(URL);
    fetch(URL)
    .then(res => res.json())
    .then(data => displayUniverseDetails(data.data)) 
}

/* 

    Display Universe Hub Details  

*/

const displayUniverseDetails = (singleData) =>{  

    console.log(singleData);

    // Object distructuring
    const {description, pricing, input_output_examples, image_link, accuracy, features, integrations} = singleData; 
    
    const descriptionTitle = document.getElementById('universeModalLabel');
    descriptionTitle.innerHTML = description;
    const univerImage = document.getElementById('universe-img');
    univerImage.innerHTML =` <img class="w-100" src="${image_link[0]}"> `


    const exampleTitle = document.getElementById('example-title');
    const exampleContent = document.getElementById('example-content');
    if(input_output_examples === null){
        exampleTitle.innerText = 'Can you give any example?';
        exampleContent.innerText = 'No! Not Yet! Take a break!!!';
    }else{
        exampleTitle.innerHTML = input_output_examples[0].input ? input_output_examples[0].input : 'No Data Fond'; 
        exampleContent.innerHTML = input_output_examples[0].output ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!';
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
        basicPrice.innerHTML = pricing[0].price ? pricing[0].price : 'Free Of Cost/Basic'; 
        proPrice.innerHTML =  pricing[1].price ? pricing[1].price : 'Free Of Cost/Pro'; 
        enterPrice.innerHTML = pricing[2].price ? pricing[2].price : 'Free of Cost /Enterprise';
    }
     
    //Accuracy Button validation
    const btnAccuracy = document.getElementById('btn-accuracy');  
    const btn = document.getElementById('btn-acc-wrapper'); 
     if(accuracy.score === null){
        btn.style.display = "none"; 
     }else{
        btnAccuracy.innerHTML = 100 * accuracy.score ? 100 * accuracy.score : "";
        btn.style.display = "block";
     }
      
    //Get Features List
    const featuresList = document.getElementById('single-features-wrapper');
    featuresList.innerHTML = ""; 
    const FeaturesValue = Object.values(features); 
    FeaturesValue.map(item =>{
        const li = document.createElement('li');
        li.innerHTML = item.feature_name ? item.feature_name : 'No data Found';
        featuresList.appendChild(li); 
    }) 


    //Get Integrations list 
    const integrationsList = document.getElementById('intergration-list');
    integrationsList.innerHTML = "";   
        integrations.map(listItem =>{
            const li = document.createElement('li'); 
                li.innerHTML = listItem ? listItem : 'No data Found';
             
            integrationsList.appendChild(li); 
        })  



}


/*

    Default load data using funtions

*/
const LoadingData = (dataLimit) => {
    fetchUniverseHub(dataLimit);
}

/*

    Get speener data

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

    See More Button All Universe Item

*/
const showDefaultLimit = fetchUniverseHub(6);
document.getElementById('btn-seemore').addEventListener('click', function(){
    LoadingSpinner(true);
    fetchUniverseHub();
});




document.getElementById('sortByDate').addEventListener('click', function(){
    shortdate();
})