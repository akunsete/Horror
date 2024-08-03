const questions = [
    {
        question: "SIHEIHDHSKNEJPOWERU0IJW:>",
        answers: {
            yes: ":>>>>>>>>>>>>>> .......",
            no: ":<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
        }
    },
    {
        question: "Di mana kamu tinggal?",
        answers: {
            yes: "Apakah kamu merasa tempat tinggalmu aman? Coba periksa jika ada sesuatu yang tidak biasa di sekitar.",
            no: "Bagus, pastikan untuk selalu memperhatikan lingkungan sekitarmu dan waspadai hal-hal yang mencurigakan."
        }
    },
];

let currentQuestionIndex = 0;

function typeWriter(element, text, i, callback) {
    if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1) + '<span class="typing"></span>';
        setTimeout(() => typeWriter(element, text, i + 1, callback), 50);
    } else if (callback) {
        setTimeout(callback, 700);
    }
}

function showButtons() {
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.style.display = 'flex'; // Show buttons
}

function hideButtons() {
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.style.display = 'none'; // Hide buttons
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, showError);
    } else {
        showLocationQuestion("Geolocation tidak didukung oleh browser ini.");
    }
}

function showLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Use a reverse geocoding API to get the location name from coordinates
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            const location = data.display_name || "Lokasi tidak diketahui";
            showLocationQuestion(location);
        })
        .catch(() => {
            showLocationQuestion("Lokasi tidak dapat ditemukan");
        });
}

function showLocationQuestion(location) {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';
    hideButtons();
    typeWriter(questionContainer, `Kamu tinggal di ${location}. Apakah kamu merasa tempat tinggalmu aman?`, 0, () => {
        showButtons();
        const yesButton = document.querySelector('button[onclick="handleResponse(\'yes\')"]');
        const noButton = document.querySelector('button[onclick="handleResponse(\'no\')"]');
        yesButton.onclick = () => showAnswer('yes');
        noButton.onclick = () => showAnswer('no');
    });
}

function showError(error) {
    let errorMsg = "Unknown error";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMsg = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMsg = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMsg = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMsg = "An unknown error occurred.";
            break;
    }
    showLocationQuestion(`Geolocation Error: ${errorMsg}`);
}

function handleResponse(response) {
    const questionContainer = document.getElementById('questionContainer');
    const imageContainer = document.getElementById('imageContainer');
    
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = '';
        hideButtons(); // Hide buttons before showing the question
        typeWriter(questionContainer, question.question, 0, () => {
            showButtons(); // Show buttons after the question is fully typed
            const yesButton = document.querySelector('button[onclick="handleResponse(\'yes\')"]');
            const noButton = document.querySelector('button[onclick="handleResponse(\'no\')"]');
            yesButton.onclick = () => showAnswer('yes');
            noButton.onclick = () => showAnswer('no');
        });
    } else {
        questionContainer.innerHTML = '';
        typeWriter(questionContainer, "Semua pertanyaan telah dijawab.", 0, () => {
            setTimeout(() => {
                // Redirect to the exit page after a delay
                window.location.href = "exit.html"; // Replace with your desired exit URL
            }, 3000); // Delay before redirecting
        });
    }
}

function showAnswer(answerType) {
    const questionContainer = document.getElementById('questionContainer');
    const question = questions[currentQuestionIndex];
    const imageContainer = document.getElementById('imageContainer');
    
    if (question) {
        const answer = question.answers[answerType];
        questionContainer.innerHTML = '';
        hideButtons(); // Hide buttons while showing the answer
        typeWriter(questionContainer, answer, 0, () => {
            if (question.question === "SIHEIHDHSKNEJPOWERU0IJW:>") {
                setTimeout(() => {
                    imageContainer.style.display = 'flex'; // Show the scary image
                    setTimeout(() => {
                        imageContainer.style.opacity = '0'; // Fade out effect
                        setTimeout(() => {
                            imageContainer.style.display = 'none'; // Hide the image
                            imageContainer.style.opacity = '1'; // Reset opacity
                            currentQuestionIndex++;
                            handleResponse(); // Proceed to the next question
                        }, 1000); // Duration for fade-out
                    }, 3000); // Duration for showing the image
                }, 500); // Initial delay
            } else {
                currentQuestionIndex++;
                if (currentQuestionIndex === questions.length - 1) {
                    getLocation(); // Trigger location question before final question
                } else {
                    setTimeout(() => handleResponse(), 3000); // Proceed to next question
                }
            }
        });
    }
}



// Initialize the first question
handleResponse();
