console.log(chemicalSolvents);
myData = [
];
const main = document.getElementById('main');
const dropdown = document.getElementById('solventDropdown');
const popup = document.getElementById('solventPopup');
const detailsDiv = document.getElementById('solventDetails');
const closeButton = document.getElementById('closeButton');
const addButton = document.getElementById('addButton');
let currentMaterial;
// Create options for each solvent
chemicalSolvents.forEach(solvent => {
  const option = document.createElement('option');
  option.value = solvent.name;
  option.textContent = solvent.name;
  dropdown.appendChild(option);
});

// Event listener to handle selection
dropdown.addEventListener('change', function() {
  const selectedSolvent = chemicalSolvents.find(solvent => solvent.name === this.value);
  if (selectedSolvent) {
    console.log(selectedSolvent);
    detailsDiv.innerHTML = `
    <p>Name: ${selectedSolvent.name}</p>
    <p>Formula: ${selectedSolvent.formula}</p>
    <p>Molar Mass: ${selectedSolvent.molarMass}</p>
    <p>Density: ${selectedSolvent.density}</p>
    <p>Boiling Point: ${selectedSolvent.boilingPoint}</p>
    <p>Melting Point: ${selectedSolvent.meltingPoint}</p>
  `;
  currentMaterial = selectedSolvent;
  // Display the popup
  popup.style.display = 'block';
    this.value = '';
  }
});

closeButton.addEventListener('click', function() {
    // Hide the popup
    popup.style.display = 'none';
  });
  
  // Event listener for the add button
  addButton.addEventListener('click', function() {
    // Perform desired action when the add button is clicked
  
    myData.push({name:currentMaterial.name,text:""});
    console.log(myData);
    popup.style.display = 'none'
    updateMainData();
  
  });

  function updateMainData() {
    main.innerHTML = '';
    for (let i = 0; i < myData.length; i++) {
      const name = myData[i].name;
      const text = myData[i].text;
      const h4 = document.createElement('h4');
      const input = document.createElement('input');
      const addButton = document.createElement('button');
      const h5 = document.createElement('h5');
      const hr = document.createElement('hr');
  
      h4.textContent = name;
      input.type = 'text';
      input.value = myData[i].text;
      addButton.textContent = 'Add';
      h5.textContent = text;
  
      addButton.addEventListener('click', function() {
        const inputValue = input.value;
        console.log(`Value entered for ${name}: ${inputValue}`);
      myData[i].text = inputValue;
        
        console.log(myData[i]);
        if(addButton.style.display==""){
            h5.innerHTML=inputValue;
            input.style.display='none';
            addButton.style.display="none"
            console.log(addButton.style.display);
        }else{
          console.log(addButton.style.display);
        }
       
      });
      h5.addEventListener('click', function() {
    
        h5.innerHTML="";
        input.style.display='block';
        addButton.style.display=""
        input.value = myData[i].text;
        console.log(myData[i]);
      });
  
      main.appendChild(h4);
      main.appendChild(input);
     
      main.appendChild(h5);
      main.appendChild(addButton);
      main.appendChild(hr);
    }

    
  }
  