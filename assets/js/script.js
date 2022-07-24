const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"), //Filters
filterName = document.querySelector(".filter-info .name"), //Change Filter name
filterValue = document.querySelector(".filter-info .value"), //Change Filter value
filterSlider = document.querySelector(".slider input"), //Change Filter value
rotateOptions = document.querySelectorAll(".rotate button"), //Filters
previewImage = document.querySelector(".preview-image img"), //Image placeholder for display
resetFilterBtn = document.querySelector(".reset-filter"), //Reset button
chooseImgBtn = document.querySelector(".choose-img");
saveImgBtn = document.querySelector(".save-img");


//Show selected value by default as
let brightness = 100, saturation = 100, inversation = 0, grayscale = 0;


//Declaring Rotate buttons
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

//Apply the selected filter in the image
const applyFilters = () => {
	//Pass rotate value to the image
	previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;

	//Apply filters to the image selected and displayed
	previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversation}%) grayscale(${grayscale}%)`;
}


// Display selected image
const loadImage = () => {
	let file = fileInput.files[0]; // Get the user selected file
	if(!file) return; // Return empty if the user doesn't select a file
	// console.log(file);
	previewImage.src = URL.createObjectURL(file); // Pass the file url to display
	
	// Reactivate all filters when a file is uploaded
	previewImage.addEventListener("load", () => {
		resetFilterBtn.click(); //Reset to default
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

	//Call the apply function
	applyFilters();
}

//Rotate buttons
rotateOptions.forEach(option => {
	option.addEventListener("click", () => {
		// Add filters for rotate and click buttons
		if(option.id === "left") {
			//If left btn is clicked, decrement, increment or flip rotate value by -90 
			rotate -= 90;
		}else if(option.id == "right") {
			rotate += 90;
		}else if(option.id == 'vertical') {
			flipVertical = flipVertical === 1 ? -1 : 1; //Flip the image vertically
		}else{
			flipHorizontal = flipHorizontal === 1 ? -1 : 1; //Flip the image vertically
		}
		//Call the apply function
		applyFilters();
	});
});

//Reset back to default
const resetFilter = () => {
	brightness = 100; saturation = 100; inversation = 0; grayscale = 0;
	rotate = 0; flipHorizontal = 1; flipVertical = 1;
	filterOptions[0].click();
	//Call the apply function
	applyFilters();
}

//Save image button
const saveImage = () => {
	const canvas = document.createElement("canvas"); //creating a canvas element
	const ctx = canvas.getContext("2d");//canvas.getContext returns a drawing context on the canvas
	
	//Setting the width and height to the image
	canvas.width = previewImage.naturalWidth;
	canvas.height = previewImage.naturalHeight;

	//Applying user selected filters to the canvas filter
	ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversation}%) grayscale(${grayscale}%)`;
	
	ctx.translate(canvas.width / 2, canvas.height / 2); //translating canvas from center

	//Apply flip filters
	ctx.scale(flipHorizontal,flipVertical);

	//Apply rotation filters
	if(rotate !== 0) {
		ctx.rotate(rotate * Math.PI / 180);
	}

	ctx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	//Download image
	const link = document.createElement("a"); //creating an <a> element
	link.download = "edited.png"; // Passing <a> tag download value to "image.jpg"
	link.href = canvas.toDataURL(); // Passing <a> tag href value to canvas data url
	link.click(); //clicking <a> tag to the image download
}

fileInput.addEventListener("change", loadImage);

//Change filter value according to slider position
filterSlider.addEventListener("input", updateFilter);

//Reset button
resetFilterBtn.addEventListener("click", resetFilter);

//save image
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());