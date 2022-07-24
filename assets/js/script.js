const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"), //Filters
filterName = document.querySelector(".filter-info .name"), //Change Filter name
filterValue = document.querySelector(".filter-info .value"), //Change Filter value
filterSlider = document.querySelector(".slider input"), //Change Filter value
previewImage = document.querySelector(".preview-image img"), //Image placeholder for display
chooseImgBtn = document.querySelector(".choose-img");


//Show selected value by default as
let brightness = 100, saturation = 100, inversation = 0, grayscale = 0;

// Display selected image
const loadImage = () => {
	let file = fileInput.files[0]; // Get the user selected file
	if(!file) return; // Return empty if the user doesn't select a file
	// console.log(file);
	previewImage.src = URL.createObjectURL(file); // Pass the file url to display
	
	// Reactivate all filters when a file is uploaded
	previewImage.addEventListener("load", () => {
		document.querySelector(".container").classList.remove("disable")
	});
}

//Filter buttons
filterOptions.forEach(option => {
	option.addEventListener("click", () => {
		// Add click event listener for all filter buttons
		document.querySelector(".filter .active").classList.remove("active");

		//Add active class to the current selected filter button
		option.classList.add("active");

		//Change the filter name
		filterName.innerText = option.innerText;

		if(option.id === "brightness") {
			filterSlider.max = "200";
			filterSlider.value = brightness;
			filterValue.innerText = `${brightness}%`;
		}else if(option.id === "saturation") {
			filterSlider.max = "200";
			filterSlider.value = saturation;
			filterValue.innerText = `${saturation}%`;
		}else if(option.id === "inversation") {
			filterSlider.max = "100";
			filterSlider.value = inversation;
			filterValue.innerText = `${inversation}%`;
		}else {
			filterSlider.max = "100";
			filterSlider.value = grayscale;
			filterValue.innerText = `${grayscale}%`;
		}
	});
});

//Change filter value according to slider position
const updateFilter = () => {
	//Value text
	filterValue.innerText = `${filterSlider.value}%`;

	//Get selected filter button
	const selectedFilter = document.querySelector(".filter .active");

	if(selectedFilter.id === "brightness") {
		brightness = filterSlider.value;
	}else if(selectedFilter.id === "saturation"){
		saturation = filterSlider.value;
	}else if(selectedFilter.id === "inversation"){
		inversation = filterSlider.value;
	}else {
		grayscale = filterSlider.value;
	}
}

fileInput.addEventListener("change", loadImage);

//Change filter value according to slider position
filterSlider.addEventListener("input", updateFilter);

chooseImgBtn.addEventListener("click", () => fileInput.click());