function updateSliderValue(slider) {
    // Get the ID of the slider element and find the corresponding value display element
    const sliderValueDisplay = document.getElementById(slider.id + 'Value');
    // Update the display text with the current slider value
    sliderValueDisplay.textContent = slider.value;
}

// Optional: You can add validation or form submission functionality if needed.
document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector('form'); // Select the form element

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Age mapping to convert age group to a specific value
        const ageMapping = {
            'under_18': 18,  // Added an entry for 'under_18'
            '18_24': 21,
            '25_34': 30,
            '35_44': 40,
            '45_54': 50,
            '55_64': 60,
            '65_over': 70
        };

        // Create a FormData object from the form
        const formData = new FormData(form);

        const selectedAge = formData.get('age');
        const ageValue = ageMapping[selectedAge];

        // Construct the JSON object to match the API's expected structure and ensure proper data types
        const data = {
            // Features
            'features': {
                age: parseFloat(ageValue), // float32
                dem_female: parseInt(formData.get('gender') === 'female' ? 1 : 0, 10), // int8
                race: parseInt(formData.get('race') === 'Black' ? 1 : 0, 10), // int8
                biomarkers: parseFloat(formData.get('biomarker')), // float32
                comorbidity: parseInt(formData.get('comorbidity'), 10), // int8
                lasix_dose_count_tm1: parseFloat(formData.get('lasix_dose_count_tm1')), // float32
                cre_tests_tm1: parseFloat(formData.get('cre_tests_tm1')), // float32
                crp_tests_tm1: parseFloat(formData.get('crp_tests_tm1')), // float32
                esr_tests_tm1: parseFloat(formData.get('esr_tests_tm1')), // float32
                ghba1c_tests_tm1: parseFloat(formData.get('ghba1c_tests_tm1')), // float32
                hct_tests_tm1: parseFloat(formData.get('hct_tests_tm1')), // float32
                ldl_tests_tm1: parseFloat(formData.get('ldl_tests_tm1')), // float32
                nt_bnp_tests_tm1: parseFloat(formData.get('nt_bnp_tests_tm1')), // float32
                sodium_tests_tm1: parseFloat(formData.get('sodium_tests_tm1')), // float32
                trig_tests_tm1: parseFloat(formData.get('trig_tests_tm1')) // float32
            },

            // Desired target
            desired_targets: [formData.get('output')],

            // Weights
            'weight': {
                age: parseFloat(document.getElementById('ageSlider').value) || 0, // float32
                dem_female: parseFloat(document.getElementById('genderSlider').value) || 0, // float32
                race: parseFloat(document.getElementById('raceSlider').value) || 0, // float32
                biomarkers: parseFloat(document.getElementById('biomarkerSlider').value) || 0, // float32
                comorbidity: parseFloat(document.getElementById('comorbiditySlider').value) || 0, // float32
                lasix_dose_count_tm1: parseFloat(document.getElementById('lasix_dose_count_tm1_Slider').value) || 0, // float32
                cre_tests_tm1: parseFloat(document.getElementById('cre_tests_tm1_Slider').value) || 0, // float32
                crp_tests_tm1: parseFloat(document.getElementById('crp_tests_tm1_Slider').value) || 0, // float32
                esr_tests_tm1: parseFloat(document.getElementById('esr_tests_tm1_Slider').value) || 0, // float32
                ghba1c_tests_tm1: parseFloat(document.getElementById('ghba1c_tests_tm1_Slider').value) || 0, // float32
                hct_tests_tm1: parseFloat(document.getElementById('hct_tests_tm1_Slider').value) || 0, // float32
                ldl_tests_tm1: parseFloat(document.getElementById('ldl_tests_tm1_Slider').value) || 0, // float32
                nt_bnp_tests_tm1: parseFloat(document.getElementById('nt_bnp_tests_tm1_Slider').value) || 0, // float32
                sodium_tests_tm1: parseFloat(document.getElementById('sodium_tests_tm1_Slider').value) || 0, // float32
                trig_tests_tm1: parseFloat(document.getElementById('trig_tests_tm1_Slider').value) || 0 // float32
            }
        };

        console.log('Form data:', formData);
        console.log('Form data:', JSON.stringify(formData));
        console.log('Data', JSON.stringify(data));

        // Send the data to the API via fetch. Replace with Azure endpoint when deploying.
        // fetch('https://healthscore-h6hdche4gyfbb5cn.southindia-01.azurewebsites.net/predict', {
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) // Send the JSON object
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
                }
                return response.json();
            })
            .then(result => {
                console.log('API call successful. Result object:', result);

                // Store form data and updated result in localStorage
                localStorage.setItem('data', JSON.stringify(data));
                localStorage.setItem('result', JSON.stringify(result));

                // Redirect to the result page
                window.location.href = '/result';
            })
            .catch(error => {
                console.error('Error occurred during API call:', error);

                // Display an error message to the user
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'An error occurred while processing your request. Please try again later.';
                errorMessage.style.color = 'red';
                form.appendChild(errorMessage);
            });
    });
});
