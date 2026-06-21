// Database konten
const DATA = {
    hewan: [
        {nama: 'Sapi', gambar: ''},
        {nama: 'Kucing', gambar: '🐱'},
        {nama: 'Ayam', gambar: '🐔'},
        {nama: 'Bebek', gambar: '🦆'},
        {nama: 'Anjing', gambar: '🐶'},
        {nama: 'Kuda', gambar: '🐴'},
        {nama: 'Gajah', gambar: '🐘'},
        {nama: 'Singa', gambar: '🦁'}
    ],
    buah: [
        {nama: 'Apel', gambar: '🍎'},
        {nama: 'Pisang', gambar: ''},
        {nama: 'Jeruk', gambar: '🍊'},
        {nama: 'Anggur', gambar: '🍇'},
        {nama: 'Stroberi', gambar: ''},
        {nama: 'Semangka', gambar: '🍉'}
    ],
    warna: [
        {nama: 'Merah', kode: '#ff4444'},
        {nama: 'Biru', kode: '#4488ff'},
        {nama: 'Kuning', kode: '#ffdd44'},
        {nama: 'Hijau', kode: '#44cc44'},
        {nama: 'Ungu', kode: '#aa44ff'},
        {nama: 'Oranye', kode: '#ff8844'}
    ]
};

// State game
let state = {
    level: 1,
    mulai: 1,
    akhir: 50,
    salah: 0,
    soal: null,
    progress: JSON.parse(localStorage.getItem('progress') || '{}')
};

// Generate level
function buatLevel(n) {
    if (n <= 50) return levelSensorik(n);
    if (n <= 150) return levelBalita(n);
    if (n <= 300) return levelTK(n);
    if (n <= 500) return levelSD1(n);
    if (n <= 750) return levelSD2(n);
    return levelSD3(n);
}

function levelSensorik(n) {
    const hewan = DATA.hewan[n % DATA.hewan.length];
    return {
        tipe: 'tekan',
        tanya: 'Tekan ' + hewan.nama + '! 👆',
        display: hewan.gambar,
        opsi: [hewan],
        jawaban: 0
    };
}

function levelBalita(n) {
    const idx = n % DATA.hewan.length;
    const benar = DATA.hewan[idx];
    const opsi = [benar];
    for (let i = 1; i < 3; i++) {
        const r = DATA.hewan[(idx + i * 2) % DATA.hewan.length];
        if (!opsi.find(o => o.nama === r.nama)) opsi.push(r);
    }
    while (opsi.length < 3) opsi.push(DATA.hewan[(n + opsi.length) % DATA.hewan.length]);
    
    return {
        tipe: 'pilih',
        tanya: 'Mana ' + benar.nama + '? ',
        display: benar.gambar,
        opsi: acak(opsi),
        jawaban: 0
    };
}

function levelTK(n) {
    const tipe = n % 2;
    if (tipe === 0) {
        const warna = DATA.warna[n % DATA.warna.length];
        const opsi = [warna];
        for (let i = 1; i < 3; i++) {
            const r = DATA.warna[(n + i * 2) % DATA.warna.length];
            if (!opsi.find(o => o.nama === r.nama)) opsi.push(r);
        }
        return {
            tipe: 'warna',
            tanya: 'Mana warna ' + warna.nama + '? 🎨',
            display: '🎨',
            opsi: acak(opsi),
            jawaban: 0
        };
    } else {
        const jumlah = (n % 5) + 1;
        const emoji = DATA.buah[n % DATA.buah.length].gambar;
        const tampilan = Array(jumlah).fill(emoji).join(' ');
        const opsi = [];
        for (let i = 1; i <= 3; i++) opsi.push({nama: i.toString(), gambar: i.toString()});
        return {
            tipe: 'hitung',
            tanya: 'Ada berapa? 🔢',
            display: tampilan,
            opsi: acak(opsi),
            jawaban: opsi.findIndex(o => parseInt(o.nama) === jumlah)
        };
    }
}

function levelSD1(n) {
    const a = (n % 5) + 1;
    const b = ((n * 3) % 5) + 1;
    const hasil = a + b;
    const opsi = [{nama: hasil.toString(), gambar: hasil.toString()}];
    for (let i = 1; i < 4; i++) {
        const r = Math.max(1, hasil + (i % 2 === 0 ? i : -i));
        if (!opsi.find(o => o.nama === r.toString())) opsi.push({nama: r.toString(), gambar: r.toString()});
    }
    return {
        tipe: 'matematika',
        tanya: a + ' + ' + b + ' = ? ➕',
        display: '🧮',
        opsi: acak(opsi),
        jawaban: 0
    };
}

function levelSD2(n) {
    const a = (n % 10) + 1;
    const b = ((n * 2) % 10) + 1;
    const hasil = a + b;
    const opsi = [{nama: hasil.toString(), gambar: hasil.toString()}];
    for (let i = 1; i < 4; i++) {
        const r = Math.max(1, hasil + (i % 2 === 0 ? i : -i));
        if (!opsi.find(o => o.nama === r.toString())) opsi.push({nama: r.toString(), gambar: r.toString()});
    }
    return {
        tipe: 'matematika',
        tanya: a + ' + ' + b + ' = ? ➕',
        display: '',
        opsi: acak(opsi),
        jawaban: 0
    };
}

function levelSD3(n) {
    const a = (n % 20) + 5;
    const b = ((n * 3) % 15) + 5;
    const hasil = a + b;
    const opsi = [{nama: hasil.toString(), gambar: hasil.toString()}];
    for (let i = 1; i < 4; i++) {
        const r = Math.max(1, hasil + (i % 2 === 0 ? i * 2 : -i * 2));
        if (!opsi.find(o => o.nama === r.toString())) opsi.push({nama: r.toString(), gambar: r.toString()});
    }
    return {
        tipe: 'matematika',
        tanya: a + ' + ' + b + ' = ? ➕',
        display: '🧮',
        opsi: acak(opsi),
        jawaban: 0
    };
}

// Helper: acak array
function acak(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Tampilkan layar
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function showMenu() {
    showScreen('menu');
}

function showLevels() {
    renderLevels();
    showScreen('levels');
}

function startGame(mulai, akhir) {
    state.mulai = mulai;
    state.akhir = akhir;
    showLevels();
}

function renderLevels() {
    document.getElementById('levelTitle').textContent = 'Level ' + state.mulai + '-' + state.akhir;
    const grid = document.getElementById('levelGrid');
    grid.innerHTML = '';
    
    const totalLevel = state.akhir - state.mulai + 1;
    const selesaiCount = Object.keys(state.progress).filter(k => {
        const num = parseInt(k);
        return num >= state.mulai && num <= state.akhir && state.progress[k];
    }).length;
    
    const progressPercent = (selesaiCount / totalLevel) * 100;
    document.getElementById('progressFill').style.width = progressPercent + '%';
    
    for (let i = state.mulai; i <= state.akhir; i++) {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        
        const selesai = state.progress[i];
        if (selesai) {
            btn.classList.add('completed');
            btn.textContent = i + ' ⭐';
        } else if (i === 1 || state.progress[i - 1]) {
            btn.textContent = i;
        } else {
            btn.classList.add('locked');
            btn.textContent = i;
        }
        
        if (i === 1 || state.progress[i - 1]) {
            btn.onclick = () => mainLevel(i);
        }
        
        grid.appendChild(btn);
    }
}

function mainLevel(n) {
    state.level = n;
    state.salah = 0;
    state.soal = buatLevel(n);
    
    document.getElementById('currentLevel').textContent = n;
    document.getElementById('questionText').textContent = state.soal.tanya;
    document.getElementById('questionDisplay').textContent = state.soal.display;
    document.getElementById('feedback').textContent = '';
    
    const opsiDiv = document.getElementById('options');
    opsiDiv.innerHTML = '';
    
    state.soal.opsi.forEach((opsi, idx) => {
        const btn = document.createElement('div');
        btn.className = 'option';
        
        if (state.soal.tipe === 'warna') {
            btn.style.background = opsi.kode;
            btn.style.height = '80px';
            btn.style.borderRadius = '50%';
        } else {
            btn.textContent = opsi.gambar;
        }
        
        btn.onclick = () => jawab(idx, btn);
        opsiDiv.appendChild(btn);
    });
    
    showScreen('game');
}

function jawab(idx, elemen) {
    const soal = state.soal;
    const benar = idx === soal.jawaban;
    
    if (benar) {
        elemen.classList.add('correct');
        document.getElementById('feedback').textContent = '🎉 Benar!';
        buatKonfeti();
        setTimeout(selesaiLevel, 1200);
    } else {
        elemen.classList.add('wrong');
        state.salah++;
        document.getElementById('feedback').textContent = '😅 Coba lagi!';
        setTimeout(() => {
            elemen.classList.remove('wrong');
            document.getElementById('feedback').textContent = '';
        }, 800);
    }
}

function selesaiLevel() {
    const bintang = state.salah === 0 ? 3 : state.salah === 1 ? 2 : 1;
    const sekarang = state.progress[state.level] || 0;
    if (bintang > sekarang) {
        state.progress[state.level] = bintang;
        localStorage.setItem('progress', JSON.stringify(state.progress));
    }
    
    document.getElementById('stars').textContent = '⭐'.repeat(bintang) + '☆'.repeat(3 - bintang);
    
    const pesan = bintang === 3 ? 'Sempurna! Kamu Hebat! 🌟' : 
                  bintang === 2 ? 'Bagus Sekali! ' : 'Kerja Bagus! ';
    document.getElementById('doneText').textContent = pesan;
    
    buatKonfetiBanyak();
    showScreen('done');
}

function nextLevel() {
    if (state.level < 1000) {
        mainLevel(state.level + 1);
    } else {
        showLevels();
    }
}

// Efek Konfeti
function buatKonfeti() {
    const container = document.getElementById('confetti');
    const warna = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff88cc'];
    
    for (let i = 0; i < 20; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = warna[Math.floor(Math.random() * warna.length)];
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(piece);
        
        setTimeout(() => piece.remove(), 3000);
    }
}

function buatKonfetiBanyak() {
    const container = document.getElementById('confetti');
    const warna = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff88cc', '#aa44ff'];
    
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = warna[Math.floor(Math.random() * warna.length)];
        piece.style.animationDelay = Math.random() * 1 + 's';
        piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(piece);
        
        setTimeout(() => piece.remove(), 4000);
    }
}

// Init
console.log('🎮 Game Edukasi Anak siap dimainkan!');
