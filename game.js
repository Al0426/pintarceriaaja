// ============================================
// DATABASE KONTEN
// ============================================
const DB = {
    hewan: [
        { e: '🐄', n: 'Sapi' }, { e: '🐱', n: 'Kucing' },
        { e: '🐔', n: 'Ayam' }, { e: '🦆', n: 'Bebek' },
        { e: '🐶', n: 'Anjing' }, { e: '🐑', n: 'Domba' },
        { e: '🐴', n: 'Kuda' }, { e: '🐷', n: 'Babi' },
        { e: '🐭', n: 'Tikus' }, { e: '🐘', n: 'Gajah' },
        { e: '🦁', n: 'Singa' }, { e: '🐵', n: 'Monyet' }
    ],
    buah: [
        { e: '🍎', n: 'Apel' }, { e: '🍌', n: 'Pisang' },
        { e: '🍊', n: 'Jeruk' }, { e: '🍇', n: 'Anggur' },
        { e: '🍓', n: 'Stroberi' }, { e: '🍉', n: 'Semangka' },
        { e: '🍑', n: 'Persik' }, { e: '🍒', n: 'Ceri' }
    ],
    warna: [
        { n: 'Merah', c: '#ff4444' }, { n: 'Biru', c: '#4488ff' },
        { n: 'Kuning', c: '#ffdd44' }, { n: 'Hijau', c: '#44cc44' },
        { n: 'Ungu', c: '#aa44ff' }, { n: 'Oranye', c: '#ff8844' }
    ],
    bentuk: [
        { n: 'Lingkaran', e: '⚫' }, { n: 'Kotak', e: '🟦' },
        { n: 'Segitiga', e: '🔺' }, { n: 'Bintang', e: '⭐' },
        { n: 'Hati', e: '❤️' }
    ],
    tubuh: [
        { e: '👁️', n: 'Mata' }, { e: '👃', n: 'Hidung' },
        { e: '👄', n: 'Mulut' }, { e: '👂', n: 'Telinga' },
        { e: '✋', n: 'Tangan' }, { e: '🦶', n: 'Kaki' }
    ],
    kendaraan: [
        { e: '🚗', n: 'Mobil' }, { e: '🚌', n: 'Bus' },
        { e: '🚲', n: 'Sepeda' }, { e: '✈️', n: 'Pesawat' },
        { e: '🚢', n: 'Kapal' }, { e: '🚂', n: 'Kereta' }
    ]
};

// ============================================
// STATE GAME
// ============================================
let state = {
    levelAktif: 1,
    mulaiKategori: 1,
    akhirKategori: 50,
    progress: JSON.parse(localStorage.getItem('progress') || '{}'),
    salahCount: 0,
    soalAktif: null
};

// Cache level yang sudah di-generate (PENTING!)
const cacheLevel = {};

// ============================================
// GENERATOR LEVEL - DIPERBAIKI!
// ============================================
function generateLevel(nomor) {
    // Cek cache dulu (HEMAT CPU!)
    if (cacheLevel[nomor]) return cacheLevel[nomor];
    
    let soal;
    if (nomor <= 50) soal = genSensorik(nomor);
    else if (nomor <= 150) soal = genToddler(nomor);
    else if (nomor <= 300) soal = genPreschoolA(nomor);
    else if (nomor <= 500) soal = genPreschoolB(nomor);
    else if (nomor <= 750) soal = genSchoolA(nomor);
    else soal = genSchoolB(nomor);
    
    // Simpan ke cache
    cacheLevel[nomor] = soal;
    return soal;
}

// Helper: pilih N item acak dari array (TANPA shuffle penuh)
function pilihItem(arr, n, seed) {
    const hasil = [];
    const used = new Set();
    let idx = seed % arr.length;
    
    while (hasil.length < n && hasil.length < arr.length) {
        if (!used.has(idx)) {
            hasil.push(arr[idx]);
            used.add(idx);
        }
        idx = (idx + 7) % arr.length; // Lompat 7 untuk variasi
    }
    return hasil;
}

// USIA 1-2 TAHUN
function genSensorik(n) {
    const tipe = n % 3;
    
    if (tipe === 0) {
        const h = DB.hewan[n % DB.hewan.length];
        return {
            tipe: 'tap_sound',
            instruksi: `Tekan ${h.n}`,
            emoji: '👆',
            opsi: [h],
            jawabanIdx: 0,
            suara: `Tekan gambar ${h.n}`
        };
    } else if (tipe === 1) {
        const benar = DB.hewan[n % DB.hewan.length];
        const opsi = pilihItem(DB.hewan, 3, n);
        // Pastikan jawaban benar ada di opsi
        if (!opsi.find(o => o.n === benar.n)) opsi[0] = benar;
        const jawabanIdx = opsi.findIndex(o => o.n === benar.n);
        return {
            tipe: 'find_item',
            instruksi: `Mana ${benar.n}?`,
            emoji: benar.e,
            opsi: opsi,
            jawabanIdx: jawabanIdx,
            suara: `Mana gambar ${benar.n}?`
        };
    } else {
        const benar = DB.buah[n % DB.buah.length];
        const opsi = pilihItem(DB.buah, 3, n);
        if (!opsi.find(o => o.n === benar.n)) opsi[0] = benar;
        const jawabanIdx = opsi.findIndex(o => o.n === benar.n);
        return {
            tipe: 'find_item',
            instruksi: `Mana ${benar.n}?`,
            emoji: benar.e,
            opsi: opsi,
            jawabanIdx: jawabanIdx,
            suara: `Mana gambar ${benar.n}?`
        };
    }
}

// USIA 2-3 TAHUN
function genToddler(n) {
    const tipe = n % 4;
    
    if (tipe === 0) {
        const benar = DB.warna[n % DB.warna.length];
        const opsi = pilihItem(DB.warna, 3, n);
        if (!opsi.find(o => o.n === benar.n)) opsi[0] = benar;
        const jawabanIdx = opsi.findIndex(o => o.n === benar.n);
        return {
            tipe: 'find_color',
            instruksi: `Mana warna ${benar.n}?`,
            emoji: '🎨',
            opsi: opsi,
            jawabanIdx: jawabanIdx,
            suara: `Mana warna ${benar.n}?`
        };
    } else if (tipe === 1) {
        const benar = DB.bentuk[n % DB.bentuk.length];
        const opsi = pilihItem(DB.bentuk, 3, n);
        if (!opsi.find(o => o.n === benar.n)) opsi[0] = benar;
        const jawabanIdx = opsi.findIndex(o => o.n === benar.n);
        return {
            tipe: 'find_shape',
            instruksi: `Mana bentuk ${benar.n}?`,
            emoji: benar.e,
            opsi: opsi,
            jawabanIdx: jawabanIdx,
            suara: `Mana bentuk ${benar.n}?`
        };
    } else if (tipe === 2) {
        const jumlah = (n % 3) + 1;
        const emoji = DB.hewan[n % DB.hewan.length].e;
        const tampilan = Array(jumlah).fill(emoji).join(' ');
        return {
            tipe: 'count',
            instruksi: `Ada berapa?`,
            emoji: '🔢',
            tampilan: tampilan,
            opsi: [{n:'1',e:'1'},{n:'2',e:'2'},{n:'3',e:'3'}],
            jawabanIdx: jumlah - 1,
            suara: `Hitung jumlahnya`
        };
    } else {
        const benar = DB.kendaraan[n % DB.kendaraan.length];
        const opsi = pilihItem(DB.kendaraan, 3, n);
        if (!opsi.find(o => o.n === benar.n)) opsi[0] = benar;
        const jawabanIdx = opsi.findIndex(o => o.n === benar.n);
        return {
            tipe: 'find_item',
            instruksi: `Mana ${benar.n}?`,
            emoji: benar.e,
            opsi: opsi,
            jawabanIdx: jawabanIdx,
            suara: `Mana gambar ${benar.n}?`
        };
    }
}

// USIA 3-4 TAHUN
function genPreschoolA(n) {
    const tipe = n % 3;
    
    if (tipe === 0) {
        const huruf = String.fromCharCode(65 + (n % 26));
        const opsi = [];
        opsi.push({n: huruf, e: huruf});
        for (let i = 1; i < 4; i++) {
            const h = String.fromCharCode(65 + ((n + i * 3) % 26));
            if (!opsi.find(o => o.n === h)) opsi.push({n: h, e: h});
        }
        while (opsi.length < 4) opsi.push({n: 'Z', e: 'Z'});
        return {
            tipe: 'find_letter',
            instruksi: `Mana huruf ${huruf}?`,
            emoji: '🔤',
            opsi: opsi,
            jawabanIdx: 0,
            suara: `Mana huruf ${huruf}?`
        };
    } else if (tipe === 1) {
        const angka = (n % 10) + 1;
        const opsi = [];
        opsi.push({n: angka.toString(), e: angka.toString()});
        for (let i = 1; i < 4; i++) {
            const a = ((n + i * 2) % 10) + 1;
            if (!opsi.find(o => o.n === a.toString())) opsi.push({n: a.toString(), e: a.toString()});
        }
        return {
            tipe: 'find_number',
            instruksi: `Mana angka ${angka}?`,
            emoji: '🔢',
            opsi: opsi,
            jawabanIdx: 0,
            suara: `Mana angka ${angka}?`
        };
    } else {
        const jumlah = (n % 10) + 1;
        const emoji = DB.buah[n % DB.buah.length].e;
        const tampilan = Array(jumlah).fill(emoji).join(' ');
        const opsi = [];
        for (let i = 0; i < 4; i++) {
            const a = ((n + i) % 10) + 1;
            opsi.push({n: a.toString(), e: a.toString()});
        }
        const jawabanIdx = opsi.findIndex(o => parseInt(o.n) === jumlah);
        return {
            tipe: 'count',
            instruksi: `Ada berapa?`,
            emoji: '🔢',
            tampilan: tampilan,
            opsi: opsi,
            jawabanIdx: jawabanIdx >= 0 ? jawabanIdx : 0,
            suara: `Hitung jumlahnya`
        };
    }
}

// USIA 4-5 TAHUN
function genPreschoolB(n) {
    const tipe = n % 2;
    
    if (tipe === 0) {
        const a = (n % 5) + 1;
        const b = ((n * 3) % 5) + 1;
        const hasil = a + b;
        const opsi = [];
        opsi.push({n: hasil.toString(), e: hasil.toString()});
        for (let i = 1; i < 4; i++) {
            const r = Math.max(1, hasil + (i % 2 === 0 ? i : -i));
            if (!opsi.find(o => o.n === r.toString())) opsi.push({n: r.toString(), e: r.toString()});
        }
        return {
            tipe: 'math',
            instruksi: `${a} + ${b} = ?`,
            emoji: '➕',
            opsi: opsi,
            jawabanIdx: 0,
            suara: `${a} tambah ${b} sama dengan berapa?`
        };
    } else {
        const a = (n % 5) + 1;
        const b = ((n * 2) % 5) + 1;
        const emoji = DB.buah[n % DB.buah.length].e;
        const benar = a > b ? 0 : 1;
        return {
            tipe: 'compare',
            instruksi: `Mana yang LEBIH BANYAK?`,
            emoji: '⚖️',
            opsi: [
                {e: Array(a).fill(emoji).join(' '), n: a},
                {e: Array(b).fill(emoji).join(' '), n: b}
            ],
            jawabanIdx: benar,
            suara: `Mana yang lebih banyak?`
        };
    }
}

// USIA 5-6 TAHUN
function genSchoolA(n) {
    const tipe = n % 3;
    
    if (tipe === 0) {
        const a = (n % 10) + 1;
        const b = ((n * 2) % 10) + 1;
        const hasil = a + b;
        const opsi = [{n: hasil.toString(), e: hasil.toString()}];
        for (let i = 1; i < 4; i++) {
            const r = Math.max(1, hasil + (i % 2 === 0 ? i : -i));
            if (!opsi.find(o => o.n === r.toString())) opsi.push({n: r.toString(), e: r.toString()});
        }
        return {
            tipe: 'math',
            instruksi: `${a} + ${b} = ?`,
            emoji: '➕',
            opsi: opsi,
            jawabanIdx: 0,
            suara: `${a} tambah ${b} sama dengan berapa?`
        };
    } else if (tipe === 1) {
        const a = (n % 10) + 5;
        const b = (n % 4) + 1;
        const hasil = a - b;
        const opsi = [{n: hasil.toString(), e: hasil.toString()}];
        for (let i = 1; i < 4; i++) {
            const r = Math.max(0, hasil + (i % 2 === 0 ? i : -i));
            if (!opsi.find(o => o.n === r.toString())) opsi.push({n: r.toString(), e: r.toString()});
        }
        return {
            tipe: 'math',
            instruksi: `${a} - ${b} = ?`,
            emoji: '➖',
            opsi: opsi,
            jawabanIdx: 0,
            suara: `${a} kurang ${b} sama dengan berapa?`
        };
    } else {
        const kata = DB.hewan[n % DB.hewan.length];
        const opsi = pilihItem(DB.hewan, 4, n);
        if (!opsi.find(o => o.n === kata.n)) opsi[0] = kata;
        const jawabanIdx = opsi.findIndex(o => o.n === kata.n);
        return {
            tipe: 'read_word',
            instruksi: `Baca: ${kata.n}`,
            emoji: '📖',
            opsi: opsi,
            jawabanIdx: jawabanIdx,
            suara: `Baca kata ${kata.n}, lalu tekan gambarnya`
        };
    }
}

// USIA 6-7 TAHUN
function genSchoolB(n) {
    const tipe = n % 3;
    
    if (tipe === 0) {
        const a = (n % 25) + 5;
        const b = ((n * 3) % 20) + 5;
        const hasil = a + b;
        const opsi = [{n: hasil.toString(), e: hasil.toString()}];
        for (let i = 1; i < 4; i++) {
            const r = Math.max(1, hasil + (i % 2 === 0 ? i*2 : -i*2));
            if (!opsi.find(o => o.n === r.toString())) opsi.push({n: r.toString(), e: r.toString()});
        }
        return {
            tipe: 'math',
            instruksi: `${a} + ${b} = ?`,
            emoji: '➕',
            opsi: opsi,
            jawabanIdx: 0,
            suara: `${a} tambah ${b} sama dengan berapa?`
        };
    } else if (tipe === 1) {
        const a = (n % 30) + 20;
        const b = (n % 15) + 5;
        const hasil = a - b;
        const opsi = [{n: hasil.toString(), e: hasil.toString()}];
        for (let i = 1; i < 4; i++) {
            const r = Math.max(0, hasil + (i % 2 === 0 ? i*2 : -i*2));
            if (!opsi.find(o => o.n === r.toString())) opsi.push({n: r.toString(), e: r.toString()});
        }
        return {
            tipe: 'math',
            instruksi: `${a} - ${b} = ?`,
            emoji: '➖',
            opsi: opsi,
            jawabanIdx: 0,
            suara: `${a} kurang ${b} sama dengan berapa?`
        };
    } else {
        const a = (n % 50) + 10;
        const b = ((n * 7) % 50) + 10;
        const benar = a > b ? 0 : 1;
        return {
            tipe: 'compare_number',
            instruksi: `Mana yang LEBIH BESAR?`,
            emoji: '📊',
            opsi: [
                {n: a.toString(), e: a.toString()},
                {n: b.toString(), e: b.toString()}
            ],
            jawabanIdx: benar,
            suara: `Mana angka yang lebih besar?`
        };
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function ucapkan(teks) {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel sebelumnya (PENTING!)
    window.speechSynthesis.cancel();
    
    const utter = new SpeechSynthesisUtterance(teks);
    utter.lang = 'id-ID';
    utter.rate = 0.9;
    utter.pitch = 1.1;
    utter.volume = 1;
    window.speechSynthesis.speak(utter);
}

function simpanProgress(level, bintang) {
    const current = state.progress[level] || 0;
    if (bintang > current) {
        state.progress[level] = bintang;
        localStorage.setItem('progress', JSON.stringify(state.progress));
    }
}

function dapatBintang() {
    if (state.salahCount === 0) return 3;
    if (state.salahCount === 1) return 2;
    return 1;
}

function levelTerbuka(n) {
    if (n === 1) return true;
    return state.progress[n - 1] && state.progress[n - 1] > 0;
}

// ============================================
// NAVIGASI LAYAR
// ============================================
function pindahLayar(id) {
    document.querySelectorAll('.layar').forEach(l => l.classList.remove('aktif'));
    document.getElementById(id).classList.add('aktif');
}

function keMenu() {
    pindahLayar('layar-menu');
}

function keLevel() {
    tampilkanGridLevel();
    pindahLayar('layar-level');
}

// ============================================
// MENU KATEGORI
// ============================================
document.querySelectorAll('.btn-kat').forEach(btn => {
    btn.addEventListener('click', () => {
        state.mulaiKategori = parseInt(btn.dataset.mulai);
        state.akhirKategori = parseInt(btn.dataset.akhir);
        tampilkanGridLevel();
        pindahLayar('layar-level');
    });
});

function tampilkanGridLevel() {
    document.getElementById('judul-level').textContent = 
        `Level ${state.mulaiKategori}-${state.akhirKategori}`;
    const grid = document.getElementById('grid-level');
    grid.innerHTML = '';
    
    for (let i = state.mulaiKategori; i <= state.akhirKategori; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn-level';
        const terbuka = levelTerbuka(i);
        if (!terbuka) btn.classList.add('terkunci');
        
        const bintang = state.progress[i] || 0;
        const bintangStr = '⭐'.repeat(bintang) + '☆'.repeat(3 - bintang);
        
        btn.innerHTML = `<div>${i}</div><div class="bintang-level">${bintangStr}</div>`;
        
        if (terbuka) {
            btn.addEventListener('click', () => mulaiLevel(i));
        }
        
        grid.appendChild(btn);
    }
}

// ============================================
// MAIN GAME - DIPERBAIKI!
// ============================================
function mulaiLevel(nomor) {
    state.levelAktif = nomor;
    state.salahCount = 0;
    state.soalAktif = generateLevel(nomor);
    
    document.getElementById('no-level').textContent = nomor;
    renderSoal();
    pindahLayar('layar-main');
    
    setTimeout(() => ulangInstruksi(), 400);
}

function renderSoal() {
    const soal = state.soalAktif;
    document.getElementById('instruksi-emoji').textContent = soal.emoji;
    document.getElementById('instruksi-teks').textContent = soal.instruksi;
    
    const area = document.getElementById('area-soal');
    area.innerHTML = '';
    
    // Tampilan khusus hitung
    if (soal.tampilan) {
        const div = document.createElement('div');
        div.style.cssText = 'grid-column:1/-1;background:white;border:2px solid #ddd;padding:15px;border-radius:15px;font-size:1.8em;text-align:center;margin-bottom:5px;';
        div.textContent = soal.tampilan;
        area.appendChild(div);
    }
    
    // Grid class
    const jml = soal.opsi.length;
    area.className = 'area-soal';
    if (jml === 2) area.classList.add('grid-2');
    else if (jml === 3) area.classList.add('grid-3');
    else if (jml === 4) area.classList.add('grid-4');
    
    // Render opsi
    soal.opsi.forEach((opsi, idx) => {
        const div = document.createElement('button');
        div.className = 'opsi';
        
        if (soal.tipe === 'find_color') {
            const w = document.createElement('div');
            w.className = 'opsi-warna';
            w.style.background = opsi.c;
            div.appendChild(w);
        } else if (soal.tipe === 'compare') {
            div.innerHTML = `<div style="font-size:0.6em;line-height:1.2;">${opsi.e}</div>`;
        } else {
            div.innerHTML = `<div class="opsi-teks">${opsi.e}</div>`;
        }
        
        // PENTING: simpan idx langsung, tidak perlu cari-cari lagi
        div.dataset.idx = idx;
        div.addEventListener('click', () => jawab(idx, div));
        area.appendChild(div);
    });
}

function ulangInstruksi() {
    if (state.soalAktif) ucapkan(state.soalAktif.suara);
}

// DIPERBAIKI: Logika jawaban jauh lebih sederhana!
function jawab(idx, elemen) {
    const soal = state.soalAktif;
    const benar = idx === soal.jawabanIdx; // LANGSUNG CEK!
    
    const feedback = document.getElementById('feedback');
    
    if (benar) {
        elemen.classList.add('benar');
        feedback.textContent = '✅';
        feedback.classList.add('tampil');
        ucapkan('Hebat!');
        
        setTimeout(() => {
            feedback.classList.remove('tampil');
            selesaiLevel();
        }, 900);
    } else {
        elemen.classList.add('salah');
        state.salahCount++;
        feedback.textContent = '❌';
        feedback.classList.add('tampil');
        ucapkan('Coba lagi');
        
        setTimeout(() => {
            feedback.classList.remove('tampil');
            elemen.classList.remove('salah');
        }, 600);
    }
}

function selesaiLevel() {
    const bintang = dapatBintang();
    simpanProgress(state.levelAktif, bintang);
    
    document.getElementById('hasil-bintang').textContent = 
        '⭐'.repeat(bintang) + '☆'.repeat(3 - bintang);
    
    const pesan = bintang === 3 ? 'Sempurna!' : 
                  bintang === 2 ? 'Bagus!' : 'Kerja bagus!';
    document.getElementById('hasil-teks').textContent = pesan;
    
    pindahLayar('layar-selesai');
}

function ulangiLevel() {
    mulaiLevel(state.levelAktif);
}

function lanjutLevel() {
    if (state.levelAktif < 1000) {
        mulaiLevel(state.levelAktif + 1);
    } else {
        keLevel();
    }
}

// ============================================
// INIT
// ============================================
console.log('🎮 Pintar Ceria LITE loaded!');
