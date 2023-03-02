
/* 
    Fetch Universe Hub Using Funtions
*/
const fetchUniverseHub = () =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(URL)
    .then(res => res.json())
    .then(data => displayUniverseHub(data.data.tools))
}

/*

    Display Universe Data

*/

const displayUniverseHub = (universHub) =>{
  const unverseWrapper = document.getElementById('universe-wrappr');
   
  universHub = universHub.slice(0, 6);
  universHub.forEach(universe => {
    console.log(universe);
    const div = document.createElement('div');
    div.classList.add('col'); 
    const {image, features, name, published_in} = universe;
    
    div.innerHTML = ` 
    <div class="card p-3">
    <img src="${image}" class="card-img-top rounded-4" alt="...">
    <div class="card-body p-0">
      <h5 class="card-title pt-3">Features</h5> 
      <ol id="features-list"> 
     ${features}
      </ol>
      <div class="card-bottom d-flex justify-content-between border-top pt-4 mt-4">
        <div class="ai-left">
            <h5 class="card-title pb-2">${name}</h5>
            <h6 class="d-flex gap-2"><img src="images/date.png" alt="date"><span>${published_in}</span></h6>
        </div>
        <div class="ai-right">
        <button type="button" class="border border-0 p-3 rounded-circle bg-light" data-bs-toggle="modal" data-bs-target="#universeModal">
        <img src="images/arrow-icon.png" alt="Arrow">
        </button> 
        </div>
      </div> 
    </div>
  </div>
  
  `
  unverseWrapper.appendChild(div);
  });
  
}


/*

    Fetch Universe Hub Details
 
*/


/*

    See More All Universe

*/


fetchUniverseHub();