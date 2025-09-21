    // This is the new function that sets up the sync and messaging for the intensity slider
    function setupIntensitySlider(sliderId, numberId, postMessageCallback) {
        const slider = document.getElementById(sliderId);
        const numberInput = document.getElementById(numberId);

        slider.addEventListener('input', () => {
            const val = slider.value;
            numberInput.value = val;
            postMessageCallback(val);
        });

        numberInput.addEventListener('input', () => {
            const val = parseInt(numberInput.value);
            const min = parseInt(slider.min);
            const max = parseInt(slider.max);

            if (!isNaN(val) && val >= min && val <= max) {
                slider.value = val;
                postMessageCallback(val);
            }
        });
    }

    // Now, call the function for the intensity slider
    const appIframe = document.getElementById('app');
    setupIntensitySlider('intensity-slider', 'intensity-value', (val) => {
        appIframe.contentWindow.postMessage({ type: 'IntensityUpdate', intensity: val }, '*');
        console.log('Intensity:', val);
    });

    // Get the buttons for warm and cool colors
    const warmButton = document.getElementById('warm-button');
    const coolButton = document.getElementById('cool-button');

    // Add event listeners to handle button clicks and active state
    warmButton.addEventListener('click', () => {
        appIframe.contentWindow.postMessage({ type: 'SetWarm' }, '*');
        warmButton.classList.add('active');
        coolButton.classList.remove('active');
    });

    coolButton.addEventListener('click', () => {
        appIframe.contentWindow.postMessage({ type: 'SetCool' }, '*');
        coolButton.classList.add('active');
        warmButton.classList.remove('active');
    });


    // Get new environment buttons
const vacantButton = document.getElementById('vacant-button');
const interiorButton = document.getElementById('interior-button');

// Vacant button
vacantButton.addEventListener('click', () => {
    appIframe.contentWindow.postMessage({ type: 'SetEnvironment', env: 'vacant' }, '*');
    console.log("vacant");
    vacantButton.classList.add('active');
    interiorButton.classList.remove('active');
});

// Interior button
interiorButton.addEventListener('click', () => {
    appIframe.contentWindow.postMessage({ type: 'SetEnvironment', env: 'interior' }, '*');
    console.log("interior");
    interiorButton.classList.add('active');
    vacantButton.classList.remove('active');
});


// Dropdown toggle logic
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const isOpen = content.classList.contains('open');

        // Close all others
        document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('open'));
        document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('active'));

        // Toggle this one
        if (!isOpen) {
            content.classList.add('open');
            toggle.classList.add('active');
        }
    });
});


// Light selection buttons
const light1 = document.getElementById('Light1-button');
const light2 = document.getElementById('Light2-button');
const light3 = document.getElementById('Light3-button');

// Utility to set active state
function setActiveLight(button) {
    [light1, light2, light3].forEach(b => b.classList.remove('active'));
    button.classList.add('active');
}

// Event listeners
light1.addEventListener('click', () => {
    appIframe.contentWindow.postMessage({ type: 'SetLight', light: 'Light1' }, '*');
    // console.log(light);
    setActiveLight(light1);
});

light2.addEventListener('click', () => {
    appIframe.contentWindow.postMessage({ type: 'SetLight', light: 'Light2' }, '*');
    // console.log(light);
    setActiveLight(light2);
});

light3.addEventListener('click', () => {
    appIframe.contentWindow.postMessage({ type: 'SetLight', light: 'Light3' }, '*');
    // console.log(light);
    setActiveLight(light3);
});

