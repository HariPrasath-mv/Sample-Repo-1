    // Script for Gradient
    window.onload = function () {
        const colorCount = document.getElementById('colorCount');
        const hexValues = document.getElementById('hexValues');
        const angleSlider = document.getElementById('angleSlider');
        const angleLabel = document.getElementById('angleLabel');
        const direction = document.getElementById('direction');
        const applyDirection = document.getElementById('applyDirection');
        const gradient = document.getElementById('gradient');
        const gradientValue = document.getElementById('gradientValue');
        const copyButton = document.getElementById('copyButton');
        const restoreButton = document.getElementById('restoreButton');
        const gradientInput = document.getElementById('gradientInput');
        const applyGradient = document.getElementById('applyGradient');

        let dir = '0deg';

        function updateGradient() {
            let angle = angleSlider.value;
            let colors = [];
            for (let i = 0; i < hexValues.children.length; i++) {
                colors.push(hexValues.children[i].value);
            }
            let gradientString = `linear-gradient(${dir}, ${colors.join(',')})`;
            gradient.style.background = gradientString;
            gradientValue.value = gradientString;
            angleLabel.textContent = `${angle}deg`;
        }

        applyGradient.addEventListener('click', function () {
            let gradientValue = gradientInput.value;
            gradient.style.background = gradientValue;

            // Extract color values from the gradient
            let colorValues = gradientValue.match(/#[a-fA-F0-9]{6}/g);

            // Extract angle from the gradient
            let angle = gradientValue.match(/(\d+)deg/);
            if (angle) {
                angleSlider.value = angle[1];
                dir = `${angle[1]}deg`;
                angleLabel.textContent = `${angle[1]}deg`; // Update angleLabel
            }

            // Update colorCount and hexValues according to the number of color values
            colorCount.value = colorValues.length;
            hexValues.innerHTML = '';
            for (let i = 0; i < colorValues.length; i++) {
                let input = document.createElement('input');
                input.type = 'text';
                input.value = colorValues[i];
                input.addEventListener('input', updateGradient);
                hexValues.appendChild(input);
            }
            updateGradient(); // Reflect changes
        });

        colorCount.addEventListener('change', function () {
            let currentColors = Array.from(hexValues.children).map(input => input.value);
            hexValues.innerHTML = '';
            for (let i = 0; i < colorCount.value; i++) {
                let input = document.createElement('input');
                input.type = 'text';
                input.value = currentColors[i] || '#'; // Use existing value if it exists, otherwise default to '#'
                input.addEventListener('input', updateGradient);
                hexValues.appendChild(input);
            }
            updateGradient();
        });

        angleSlider.addEventListener('input', function () {
            dir = `${angleSlider.value}deg`;
            updateGradient();
        });

        applyGradient.addEventListener('click', function () {
            let gradientValue = gradientInput.value;
            gradient.style.background = gradientValue;
        });

        applyDirection.addEventListener('click', function () {
            dir = direction.value;
            angleSlider.value = 0; // Reset angleSlider
            angleLabel.textContent = '0deg'; // Reset angleLabel
            updateGradient();
        });

        restoreButton.addEventListener('click', function () {
            for (let i = 0; i < hexValues.children.length; i++) {
                hexValues.children[i].value = '#';
            }
            dir = '0deg';
            gradient.style.background = 'linear-gradient(0deg, #ffffff, #ffffff)';
            gradientValue.value = 'linear-gradient(0deg, #ffffff, #ffffff)';
            angleSlider.value = 0; // Reset angleSlider
            angleLabel.textContent = '0deg'; // Reset angleLabel
            gradientInput.value = ''; // Reset gradientInput
        });

        copyButton.addEventListener('click', function () {
            gradientValue.select();
            document.execCommand('copy');
        });

        // Initialize with 2 color inputs
        colorCount.dispatchEvent(new Event('change'));

        // script for hex colors
        const redSlider = document.getElementById('red');
        const greenSlider = document.getElementById('green');
        const blueSlider = document.getElementById('blue');
        const alphaSlider = document.getElementById('alpha');
        const colorBox = document.getElementById('colorBox');
        const colorCode = document.getElementById('colorCode');
        const popup = document.getElementById('popup');

        // Set initial slider values
        redSlider.value = 0;
        greenSlider.value = 0;
        blueSlider.value = 0;
        alphaSlider.value = 1;

        function setColor() {
            const r = parseInt(redSlider.value);
            const g = parseInt(greenSlider.value);
            const b = parseInt(blueSlider.value);
            const a = parseFloat(alphaSlider.value);

            colorBox.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
            colorCode.innerText = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
        }

        redSlider.addEventListener('input', setColor);
        greenSlider.addEventListener('input', setColor);
        blueSlider.addEventListener('input', setColor);
        alphaSlider.addEventListener('input', setColor);

        colorBox.addEventListener('click', function () {
            navigator.clipboard.writeText(colorCode.innerText.slice(1)); // remove the '#' from the color code
            popup.style.visibility = 'visible';
            setTimeout(function () {
                popup.style.visibility = 'hidden';
            }, 1000); // popup disappears after 1 second
        });

        setColor();

        // for color finder
        document.getElementById('hexInput').addEventListener('input', function () {
            var hexValue = this.value;
            document.getElementById('colorbox2').style.backgroundColor = hexValue;
        });

        document.getElementById('ref_btn').addEventListener('click', refreshTextbox);


        function changeColor() {
            var hexValue = document.getElementById('hexInput').value;
            document.getElementById('colorbox2').style.backgroundColor = hexValue;
        }

        function refreshTextbox() {
            // Reset hexInput and colorbox2
            document.getElementById('hexInput').value = '#';  // default color
            document.getElementById('colorbox2').style.backgroundColor = '#000000ff';

            // Reset color sliders
            redSlider.value = 0;
            greenSlider.value = 0;
            blueSlider.value = 0;
            alphaSlider.value = 1;

            // Update color box and color code
            setColor();

            // Update gradient
            updateGradient();

            // Reset colorbox1
            document.getElementById('colorbox1').style.backgroundColor = '#ffffff';
        }
    };
    // script for rgba color picker
    var rgbaColor = '';

    function updateColor() {
        var r = document.getElementById('r').value;
        var g = document.getElementById('g').value;
        var b = document.getElementById('b').value;
        var a = document.getElementById('a').value;
        rgbaColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

        document.getElementById('colorbox').style.backgroundColor = rgbaColor;
        document.getElementById('colorInput').value = rgbaColor;
    }

    function updateGrey() {
        var grey = document.getElementById('grey').value;
        var a = document.getElementById('a').value;
        rgbaColor = 'rgba(' + grey + ',' + grey + ',' + grey + ',' + a + ')';

        document.getElementById('r').value = grey;
        document.getElementById('g').value = grey;
        document.getElementById('b').value = grey;

        document.getElementById('colorbox').style.backgroundColor = rgbaColor;
        document.getElementById('colorInput').value = rgbaColor;
    }

    function applyColor() {
        rgbaColor = document.getElementById('colorInput').value;
        var rgbaValues = rgbaColor.substring(5, rgbaColor.length - 1).split(',');
        document.getElementById('r').value = parseInt(rgbaValues[0]);
        document.getElementById('g').value = parseInt(rgbaValues[1]);
        document.getElementById('b').value = parseInt(rgbaValues[2]);
        document.getElementById('a').value = parseFloat(rgbaValues[3]);
        document.getElementById('grey').value = parseInt(rgbaValues[0]);
        updateColor();
    }

    function restoreColor() {
        document.getElementById('r').value = 0;
        document.getElementById('g').value = 0;
        document.getElementById('b').value = 0;
        document.getElementById('a').value = 1;
        document.getElementById('grey').value = 255;
        document.body.style.backgroundColor = 'rgba(255,255,255,1)';
        document.getElementById('colorbox').style.backgroundColor = '';
        document.getElementById('colorInput').value = '';
    }

    function generateColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var a = 1; // Keep alpha at 1
        rgbaColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

        document.getElementById('r').value = r;
        document.getElementById('g').value = g;
        document.getElementById('b').value = b;
        document.getElementById('a').value = a;
        document.getElementById('grey').value = (r + g + b) / 3;

        document.getElementById('colorbox').style.backgroundColor = rgbaColor;
        document.getElementById('colorInput').value = rgbaColor;
    }

    function copyToClipboard() {
        var textarea = document.createElement('textarea');
        textarea.id = 'tempElement';
        textarea.style.height = 0;
        document.body.appendChild(textarea);
        textarea.value = rgbaColor;
        var selector = document.querySelector('#tempElement');
        selector.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // Get the modal
        var modal = document.getElementById("myModal");
        var modalText = document.getElementById("modalText");

        // Open the modal
        modal.style.display = "block";
        modalText.innerHTML = 'Color copied to clipboard: ' + rgbaColor;

        // Close the modal after 1 second
        setTimeout(function () {
            modal.style.display = "none";
        }, 1000);
    }
