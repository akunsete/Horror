function startGame() {
    // Tambahkan animasi fadeOut pada overlay
    document.querySelector('.overlay').style.animation = 'fadeOut 1s ease-in-out';

    // Tunggu hingga animasi selesai sebelum melakukan navigasi
    setTimeout(function() {
        window.location.href = 'game.html';
    }, 1000); // Sesuaikan dengan durasi animasi fadeOut
}
