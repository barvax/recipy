console.log(chemicalSolvents);
const main = document.getElementById('main');
const dropdown = document.getElementById('solventDropdown');
const popup = document.getElementById('solventPopup');
const detailsDiv = document.getElementById('solventDetails');
const closeButton = document.getElementById('closeButton');
const addButton = document.getElementById('addButton');
let currentMaterial;

// Array to store the added data
const myData = [];

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
    updateMainData();
  }
});

closeButton.addEventListener('click', function() {
  // Hide the popup
  popup.style.display = 'none';
});

// Event listener for the add button
addButton.addEventListener('click', function() {
  // Perform desired action when the add button is clicked
  myData.push({ name: currentMaterial.name, text: "" });
  console.log(myData);
  popup.style.display = 'none';
  updateMainData();
});

function updateMainData() {
  main.innerHTML = '';

  // Create the table element
  const table = document.createElement('table');
  table.border = '1';

  // Create the table header row
  const headerRow = document.createElement('tr');

  // Create the header cell for the Material column
  const materialHeader = document.createElement('th');
  materialHeader.textContent = 'Material';
  headerRow.appendChild(materialHeader);

  // Create the remaining header cells
  for (let i = 1; i <= 9; i++) {
    const headerCell = document.createElement('th');
    headerCell.textContent = `Column ${i}`;
    headerRow.appendChild(headerCell);
  }

  // Append the header row to the table
  table.appendChild(headerRow);

  // Create a row for each material in myData
  myData.forEach(material => {
    // Create a new row
    const row = document.createElement('tr');

    // Create the first cell with the material name
    const materialCell = document.createElement('td');
    materialCell.textContent = material.name;
    row.appendChild(materialCell);

    // Create the remaining cells with input fields
    for (let i = 1; i <= 9; i++) {
      const inputCell = document.createElement('td');
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.value = material.text;
      inputCell.appendChild(inputField);
      row.appendChild(inputCell);
    }

    // Append the row to the table
    table.appendChild(row);
  });

  // Append the table to the main section
  main.appendChild(table);
}
const mainData = document.getElementById('mainData');
const segmentButton = document.getElementById('Add-segment');
const segmentPopup = document.getElementById('segmentPopup');
const segmentTitle = document.getElementById('segmentTitle');
const segmentInput = document.getElementById('segmentInput');
const segmentCloseButton = document.getElementById('segmentCloseButton');
const segmentAddButton = document.getElementById('segmentAddButton');


let selectedSegment = null;

// Event listener for Add Segment button
segmentButton.addEventListener('click', function() {
  segmentPopup.style.display = 'block';
  segmentTitle.textContent = 'Segment';
  segmentInput.value = '';

  selectedSegment = null;
});

// Event listener for Close button in Segment Popup
segmentCloseButton.addEventListener('click', function() {
  segmentPopup.style.display = 'none';
});

// Event listener for Add button in Segment Popup
segmentAddButton.addEventListener('click', function() {
  const segmentValue = segmentInput.value;
  console.log('Segment Value:', segmentValue);

  if (selectedSegment) {
    // Edit existing segment
    selectedSegment.querySelector('p').textContent = segmentValue;
  } else {
    // Create new segment
    const segmentDiv = document.createElement('div');
    const segmentTitleHeading = document.createElement('h3');
    const segmentText = document.createElement('p');

    // Set the segment title and text content
    segmentTitleHeading.textContent = `Segment ${main.children.length}`;
    segmentText.textContent = segmentValue;

    // Append the elements to the segment div
    segmentDiv.appendChild(segmentTitleHeading);
    segmentDiv.appendChild(segmentText);

    // Add click event listener to segment title
    segmentTitleHeading.addEventListener('click', function() {
      segmentPopup.style.display = 'block';
      segmentTitle.textContent = segmentTitleHeading.textContent.replace('Segment ', '');
      segmentInput.value = segmentText.textContent;

      selectedSegment = segmentDiv;
    });

    // Append the segment div to the main section
    main.appendChild(segmentDiv);
  }

  // Clear the input field
  segmentInput.value = '';

  // Hide the Segment Popup
  segmentPopup.style.display = 'none';
});
