const questions = [
    {
        question: "Apakah kamu merasa ada yang mengikutimu?",
        answers: {
            yes: "Oh, itu pasti hanya imajinasimu. Coba periksa kembali.",
            no: "Bagus, mungkin kamu hanya merasa cemas. Namun, tetap berhati-hati."
        }
    },
    {
        question: "Pernahkah kamu mendengar suara aneh di malam hari?",
        answers: {
            yes: "Coba periksa sumber suara tersebut, mungkin ada sesuatu yang tidak biasa.",
            no: "Mungkin suara itu tidak penting, tetapi tetap waspada terhadap suara sekitar."
        }
    },
    {
        question: "Apakah kamu pernah merasa ada seseorang di belakangmu saat kamu sendirian?",
        answers: {
            yes: "Periksa kembali, mungkin ada seseorang yang mengikutimu. Pastikan lingkungan sekitar aman.",
            no: "Bagus, mungkin kamu hanya merasa cemas. Namun, tetap perhatikan lingkunganmu."
        }
    },
    {
        question: "Apakah Kamu Sangat Takut Dengan Kegelapan?",
        answers: {
            yes: "Coba Penjam Matamu Selama 20 Detik, Setelah Itu Lanjutkan Permainan",
            no: "Kalau Begitu Coba Matikan Lampu di Sekitarmu Dan Bilang 'Come Here' "
        }
    },
    {
        question: "Apakah lampu di rumahmu tiba-tiba mati tanpa alasan?",
        answers: {
            yes: "Periksa instalasi listrikmu. Mungkin ada masalah teknis atau sesuatu yang lebih serius.",
            no: "Bagus, itu berarti sistem listrikmu berfungsi dengan baik. Namun, tetap waspada terhadap masalah listrik di masa depan."
        }
    },
    {
        question: "Pernahkah kamu merasa seperti ada sesuatu yang bergerak di sudut matamu?",
        answers: {
            yes: "Periksa sekelilingmu. Mungkin ada sesuatu yang benar-benar bergerak di sekitar kamu.",
            no: "Bagus, mungkin hanya ilusi atau kelelahan mata. Namun, pastikan untuk tetap awas terhadap lingkungan sekitar."
        }
    },
    {
        question: "Apakah kamu merasa ada perubahan suhu tiba-tiba di ruangmu?",
        answers: {
            yes: "Periksa ventilasi atau sumber dingin/panas di sekitar. Mungkin ada sesuatu yang menyebabkan perubahan suhu.",
            no: "Bagus, suhu di ruanganmu tetap stabil. Namun, perhatikan jika terjadi perubahan suhu yang mencurigakan di masa depan."
        }
    },
    {
        question: "Pernahkah kamu melihat bayangan aneh di dinding atau cermin?",
        answers: {
            yes: "Coba periksa apakah ada sumber cahaya atau objek yang dapat menyebabkan bayangan tersebut.",
            no: "Bagus, mungkin hanya imajinasi atau refleksi biasa. Namun, pastikan tidak ada objek yang menyebabkan ilusi bayangan."
        }
    },
    {
        question: "Apakah kamu merasa ada tangan dingin yang menyentuhmu saat kamu sendirian?",
        answers: {
            yes: "Periksa apakah ada sumber dingin di sekitar. Jika tidak, mungkin ada sesuatu yang lebih aneh terjadi.",
            no: "Bagus, mungkin hanya perasaanmu saja. Namun, pastikan tidak ada sesuatu yang mencurigakan di sekitar."
        }
    },
    {
        question: "Pernahkah kamu melihat pintu atau jendela bergerak sendiri tanpa alasan?",
        answers: {
            yes: "Periksa mekanisme pintu atau jendela. Mungkin ada gangguan teknis atau sesuatu yang lebih mengganggu.",
            no: "Bagus, itu berarti pintu dan jendela berfungsi dengan baik. Namun, tetap waspada jika kejadian serupa terjadi lagi."
        }
    },
    {
        question: "Apakah Kamu Suka Suara Yang Seram?",
        answers: {
            yes: "Ternyata Kamu Penakut Ya:>>",
            no: "......................."
        }
    },
    {
        question: "SIHEIHDHSKNEJPOWERU0IJW:>",
        answers: {
            yes: ":>>>>>>>>>>>>>> .......",
            no: ":<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
        }
    },
    {
        question: "Waduh Maaf Nih Tadi Ada Sistem Error Sepertinya,Kalau Begitu Kamu Suka Darah Gak?",
        answers: {
            yes: "Bagus:>",
            no: "....., Padahal Darah Kamu Sepertinya Enak...."
        }
    },
    {
        question: "Baiklah, A",
        answers: {
            yes: "Bagus:>",
            no: "....., Padahal Darah Kamu Sepertinya Enak...."
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
