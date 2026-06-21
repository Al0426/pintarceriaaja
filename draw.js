# 🐛 BUG DITEMUKAN: TITIK-TITIK TIDAK MUNCUL!

Masalahnya ada di **HTML dan CSS**. Container titik menggunakan class `titik` yang membuat ukurannya jadi 30x30px (kecil) padahal seharusnya memenuhi seluruh canvas. Jadi titik-titiknya ada tapi **tersembunyi**.

Berikut perbaikan lengkapnya:

---

## 🔧 FIX 1: Update `index.html`

Cari bagian layar menggambar, **ganti** dengan ini:

```html
<!-- LAYAR MENU MENGGAMBAR -->
<div id="menu-gambar" class="screen">
    <div class="header-levels">
        <button class="btn-kembali" onclick="showMenu()">⬅️</button>
        <h2>🎨 Game Menggambar</h2>
    </div>
    <div class="pilih-gambar-grid" id="pilihGambarGrid"></div>
</div>

<!-- LAYAR MENGGAMBAR -->
<div id="layar-menggambar" class="screen">
    <div class="header-game">
        <button class="btn-kembali" onclick="showMenuGambar()">✕</button>
        <div class="level-badge" id="judulGambar">Menggambar</div>
        <div class="tombol-aksi-mini">
            <button class="btn-mini" onclick="resetGambar()">🔄</button>
            <button class="btn-mini" onclick="simpanGambar()">💾</button>
        </div>
    </div>
    
    <div class="canvas-container">
        <canvas id="canvasGambar"></canvas>
        <!-- PERBAIKAN: Container titik TANPA class "titik" -->
        <div class="titik-container" id="titikContainer"></div>
    </div>
    
    <div class="tools-menggambar">
        <div class="info-langkah">
            <span id="langkahTeks">Sentuh titik 1 untuk mulai</span>
            <span id="progressTitik">0/0</span>
        </div>
        
        <div class="warna-picker" id="warnaPicker">
            <div class="warna-btn active" data-warna="#333333" style="background:#333"></div>
            <div class="warna-btn" data-warna="#ff4444" style="background:#ff4444"></div>
            <div class="warna-btn" data-warna="#4488ff" style="background:#4488ff"></div>
            <div class="warna-btn" data-warna="#44cc44" style="background:#44cc44"></div>
            <div class="warna-btn" data-warna="#ffdd44" style="background:#ffdd44"></div>
            <div class="warna-btn" data-warna="#ff8844" style="background:#ff8844"></div>
            <div class="warna-btn" data-warna="#aa44ff" style="background:#aa44ff"></div>
            <div class="warna-btn" data-warna="#ff88cc" style="background:#ff88cc"></div>
        </div>
        
        <div class="slider-ukuran">
            <span>🖌️</span>
            <input type="range" id="ukuranKuas" min="2" max="20" value="5">
            <span id="ukuranTeks">5px</span>
        </div>
        
        <div class="mode-buttons">
            <button class="btn-mode active" id="btnHubung" onclick="setMode('hubung')">🔗 Hubungkan</button>
            <button class="btn-mode" id="btnBebas" onclick="setMode('bebas')">✏️ Bebas</button>
            <button class="btn-mode" id="btnHapus" onclick="setMode('hapus')">🧹 Hapus</button>
        </div>
    </div>
    
    <div id="selesaiGambar" class="selesai-gambar hidden">
        <div class="box-selesai-gambar">
            <div class="emoji-besar">🎉</div>
            <h2>Hebat! Gambar Selesai!</h2>
            <button class="btn-aksi btn-main" onclick="tutupSelesaiGambar()">🎨 Lanjut Mewarnai</button>
            <button class="btn-aksi btn-pilih" onclick="simpanGambar()">💾 Simpan</button>
        </div>
    </div>
</div>
```

---

## 🔧 FIX 2: Update `style.css` (Bagian Menggambar)

**Hapus** semua CSS menggambar yang lama, lalu **ganti** dengan ini:

```css
/* ===== GAME MENGGAMBAR ===== */
.pilih-gambar-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    max-width: 500px;
    margin: 20px auto;
    padding: 0 10px;
}

.kartu-gambar {
    background: white;
    border-radius: 20px;
    padding: 20px 10px;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 6px 15px rgba(0,0,0,0.2);
    transition: all 0.3s;
    border: 3px solid transparent;
}

.kartu-gambar:active {
    transform: scale(0.95);
    border-color: #667eea;
}

.kartu-gambar .emoji-besar {
    font-size: 3em;
    margin-bottom: 5px;
}

.kartu-gambar .nama-gambar {
    font-weight: bold;
    color: #333;
    font-size: 0.9em;
}

.kartu-gambar .level-gambar {
    font-size: 0.75em;
    color: #888;
    margin-top: 3px;
}

/* CANVAS */
.canvas-container {
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 10px auto;
    aspect-ratio: 1;
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    overflow: hidden;
}

#canvasGambar {
    width: 100%;
    height: 100%;
    display: block;
    touch-action: none;
}

/* PERBAIKAN: Container titik */
.titik-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

/* PERBAIKAN: Setiap titik */
.titik {
    position: absolute;
    width: 36px;
    height: 36px;
    background: #ff4444;
    border: 3px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.4);
    z-index: 10;
    transition: all 0.3s;
}

.titik.aktif {
    background: #4caf50;
    width: 44px;
    height: 44px;
    font-size: 16px;
    animation: pulseTitik 0.8s infinite;
    box-shadow: 0 0 0 8px rgba(76, 175, 80, 0.3), 0 3px 10px rgba(0,0,0,0.4);
}

.titik.selesai {
    background: #2196F3;
    width: 28px;
    height: 28px;
    font-size: 11px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

/* Garis putus-putus panduan */
.titik-garis {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
}

@keyframes pulseTitik {
    0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 8px rgba(76,175,80,0.3), 0 3px 10px rgba(0,0,0,0.4); }
    50% { transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 0 0 15px rgba(76,175,80,0.15), 0 3px 10px rgba(0,0,0,0.4); }
}

/* TOOLS */
.tools-menggambar {
    max-width: 500px;
    margin: 15px auto;
    background: white;
    border-radius: 20px;
    padding: 15px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.info-langkah {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    font-weight: bold;
    color: #333;
    font-size: 1em;
}

.warna-picker {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: 12px;
    flex-wrap: wrap;
}

.warna-btn {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.2s;
}

.warna-btn:active {
    transform: scale(0.9);
}

.warna-btn.active {
    border-color: #333;
    transform: scale(1.15);
}

.slider-ukuran {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    font-size: 0.9em;
}

.slider-ukuran input {
    flex: 1;
    height: 6px;
    -webkit-appearance: none;
    background: #ddd;
    border-radius: 5px;
    outline: none;
}

.slider-ukuran input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    background: #667eea;
    border-radius: 50%;
    cursor: pointer;
}

.mode-buttons {
    display: flex;
    gap: 8px;
}

.btn-mode {
    flex: 1;
    padding: 10px;
    border: 2px solid #ddd;
    background: white;
    border-radius: 10px;
    font-size: 0.85em;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
}

.btn-mode.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.btn-mode:active {
    transform: scale(0.95);
}

.tombol-aksi-mini {
    display: flex;
    gap: 5px;
}

.btn-mini {
    background: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1.2em;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

/* SELESAI GAMBAR */
.selesai-gambar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.selesai-gambar.hidden {
    display: none;
}

.box-selesai-gambar {
    background: white;
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    max-width: 350px;
    animation: slideIn 0.5s;
}

@media (max-width: 480px) {
    .pilih-gambar-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

---

## 🔧 FIX 3: Update `draw.js` (INI PALING PENTING!)

**Hapus semua isi** file `draw.js`, ganti dengan ini:

```javascript
// ============================================
// DATABASE GAMBAR
// ============================================
const GAMBAR_DB = [
    {
        nama: 'Kucing',
        emoji: '🐱',
        level: 'Mudah',
        titik: [
            {x: 50, y: 25}, {x: 65, y: 18}, {x: 75, y: 35},
            {x: 78, y: 55}, {x: 70, y: 70}, {x: 55, y: 78},
            {x: 45, y: 78}, {x: 30, y: 70}, {x: 22, y: 55},
            {x: 25, y: 35}, {x: 35, y: 18}
        ],
        warnaDefault: '#FFA500'
    },
    {
        nama: 'Ikan',
        emoji: '🐟',
        level: 'Mudah',
        titik: [
            {x: 15, y: 50}, {x: 30, y: 30}, {x: 55, y: 28},
            {x: 75, y: 35}, {x: 88, y: 50}, {x: 75, y: 65},
            {x: 55, y: 72}, {x: 30, y: 70}, {x: 15, y: 50}
        ],
        warnaDefault: '#4488ff'
    },
    {
        nama: 'Bintang',
        emoji: '⭐',
        level: 'Sedang',
        titik: [
            {x: 50, y: 10}, {x: 58, y: 38}, {x: 88, y: 38},
            {x: 65, y: 55}, {x: 73, y: 85}, {x: 50, y: 68},
            {x: 27, y: 85}, {x: 35, y: 55}, {x: 12, y: 38},
            {x: 42, y: 38}
        ],
        warnaDefault: '#FFD700'
    },
    {
        nama: 'Rumah',
        emoji: '🏠',
        level: 'Mudah',
        titik: [
            {x: 15, y: 55}, {x: 50, y: 20}, {x: 85, y: 55},
            {x: 85, y: 90}, {x: 15, y: 90}, {x: 15, y: 55}
        ],
        warnaDefault: '#ff4444'
    },
    {
        nama: 'Hati',
        emoji: '❤️',
        level: 'Mudah',
        titik: [
            {x: 50, y: 82}, {x: 22, y: 55}, {x: 15, y: 35},
            {x: 25, y: 22}, {x: 40, y: 22}, {x: 50, y: 38},
            {x: 60, y: 22}, {x: 75, y: 22}, {x: 85, y: 35},
            {x: 78, y: 55}, {x: 50, y: 82}
        ],
        warnaDefault: '#ff4444'
    },
    {
        nama: 'Kupu-kupu',
        emoji: '🦋',
        level: 'Sulit',
        titik: [
            {x: 50, y: 35}, {x: 35, y: 18}, {x: 15, y: 25},
            {x: 12, y: 45}, {x: 25, y: 58}, {x: 40, y: 55},
            {x: 50, y: 50}, {x: 60, y: 55}, {x: 75, y: 58},
            {x: 88, y: 45}, {x: 85, y: 25}, {x: 65, y: 18},
            {x: 50, y: 35}
        ],
        warnaDefault: '#aa44ff'
    },
    {
        nama: 'Pohon',
        emoji: '🌳',
        level: 'Sedang',
        titik: [
            {x: 42, y: 90}, {x: 58, y: 90}, {x: 58, y: 62},
            {x: 78, y: 52}, {x: 82, y: 32}, {x: 68, y: 18},
            {x: 50, y: 22}, {x: 32, y: 18}, {x: 18, y: 32},
            {x: 22, y: 52}, {x: 42, y: 62}, {x: 42, y: 90}
        ],
        warnaDefault: '#44cc44'
    },
    {
        nama: 'Matahari',
        emoji: '☀️',
        level: 'Mudah',
        titik: [
            {x: 50, y: 15}, {x: 72, y: 22}, {x: 85, y: 42},
            {x: 82, y: 65}, {x: 65, y: 80}, {x: 42, y: 82},
            {x: 22, y: 70}, {x: 15, y: 48}, {x: 25, y: 28},
            {x: 50, y: 15}
        ],
        warnaDefault: '#FFD700'
    },
    {
        nama: 'Bunga',
        emoji: '🌸',
        level: 'Sedang',
        titik: [
            {x: 50, y: 45}, {x: 50, y: 22}, {x: 68, y: 32},
            {x: 72, y: 50}, {x: 62, y: 65}, {x: 50, y: 68},
            {x: 38, y: 65}, {x: 28, y: 50}, {x: 32, y: 32},
            {x: 50, y: 22}
        ],
        warnaDefault: '#ff88cc'
    },
    {
        nama: 'Roket',
        emoji: '🚀',
        level: 'Sulit',
        titik: [
            {x: 50, y: 8}, {x: 62, y: 28}, {x: 66, y: 55},
            {x: 78, y: 78}, {x: 62, y: 72}, {x: 56, y: 90},
            {x: 44, y: 90}, {x: 38, y: 72}, {x: 22, y: 78},
            {x: 34, y: 55}, {x: 38, y: 28}, {x: 50, y: 8}
        ],
        warnaDefault: '#ff8844'
    }
];

// ============================================
// STATE
// ============================================
let drawState = {
    gambarAktif: null,
    canvas: null,
    ctx: null,
    mode: 'hubung',
    warnaAktif: '#333333',
    ukuranKuas: 5,
    sedangMenggambar: false,
    titikSekarang: 0,
    titikTerhubung: [],
    lastX: 0,
    lastY: 0
};

// ============================================
// INIT
// ============================================
function initGameMenggambar() {
    const grid = document.getElementById('pilihGambarGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    GAMBAR_DB.forEach((gambar, idx) => {
        const kartu = document.createElement('div');
        kartu.className = 'kartu-gambar';
        kartu.innerHTML = `
            <div class="emoji-besar">${gambar.emoji}</div>
            <div class="nama-gambar">${gambar.nama}</div>
            <div class="level-gambar">${gambar.level}</div>
        `;
        kartu.onclick = () => mulaiMenggambar(idx);
        grid.appendChild(kartu);
    });
}

function showMenuGambar() {
    showScreen('menu-gambar');
}

// ============================================
// MULAI MENGGAMBAR
// ============================================
function mulaiMenggambar(idx) {
    drawState.gambarAktif = GAMBAR_DB[idx];
    drawState.titikSekarang = 0;
    drawState.titikTerhubung = [];
    drawState.mode = 'hubung';
    drawState.warnaAktif = '#333333';
    
    document.getElementById('judulGambar').textContent = drawState.gambarAktif.nama;
    document.getElementById('selesaiGambar').classList.add('hidden');
    
    // Reset mode buttons
    document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
    document.getElementById('btnHubung').classList.add('active');
    
    showScreen('layar-menggambar');
    
    // Tunggu layar tampil dulu, baru setup canvas
    setTimeout(() => {
        setupCanvas();
        gambarGarisPanduan();
        renderTitik();
        updateInfoLangkah();
    }, 200);
}

function setupCanvas() {
    const canvas = document.getElementById('canvasGambar');
    const container = canvas.parentElement;
    
    // Set ukuran canvas sesuai container
    const size = container.offsetWidth;
    canvas.width = size;
    canvas.height = size;
    
    drawState.canvas = canvas;
    drawState.ctx = canvas.getContext('2d');
    drawState.ctx.lineCap = 'round';
    drawState.ctx.lineJoin = 'round';
    
    // Isi background putih
    drawState.ctx.fillStyle = 'white';
    drawState.ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Event mouse
    canvas.onmousedown = (e) => mulaiGambar(e);
    canvas.onmousemove = (e) => sedangGambar(e);
    canvas.onmouseup = () => selesaiGambarAksi();
    canvas.onmouseout = () => selesaiGambarAksi();
    
    // Event touch (untuk HP)
    canvas.ontouchstart = (e) => {
        e.preventDefault();
        mulaiGambar(e.touches[0]);
    };
    canvas.ontouchmove = (e) => {
        e.preventDefault();
        sedangGambar(e.touches[0]);
    };
    canvas.ontouchend = (e) => {
        e.preventDefault();
        selesaiGambarAksi();
    };
}

function getPos(e) {
    const canvas = drawState.canvas;
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
}

// ============================================
// GAMBAR GARIS PANDUAN (PUTUS-PUTUS)
// ============================================
function gambarGarisPanduan() {
    const ctx = drawState.ctx;
    const canvas = drawState.canvas;
    const titik = drawState.gambarAktif.titik;
    
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    titik.forEach((t, idx) => {
        const px = (t.x / 100) * canvas.width;
        const py = (t.y / 100) * canvas.height;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.setLineDash([]);
}

// ============================================
// RENDER TITIK-TITIK (INI YANG DIPERBAIKI!)
// ============================================
function renderTitik() {
    const container = document.getElementById('titikContainer');
    container.innerHTML = '';
    
    const titik = drawState.gambarAktif.titik;
    
    titik.forEach((t, idx) => {
        const el = document.createElement('div');
        el.className = 'titik';
        el.id = 'titik-' + idx;
        el.style.left = t.x + '%';
        el.style.top = t.y + '%';
        el.textContent = (idx + 1);
        container.appendChild(el);
    });
    
    // Aktifkan titik pertama
    const first = document.getElementById('titik-0');
    if (first) {
        first.classList.add('aktif');
    }
}

// ============================================
// AKSI MENGGAMBAR
// ============================================
function mulaiGambar(e) {
    drawState.sedangMenggambar = true;
    const pos = getPos(e);
    drawState.lastX = pos.x;
    drawState.lastY = pos.y;
    
    // Jika mode hubung, cek apakah klik di titik
    if (drawState.mode === 'hubung') {
        cekKlikTitik(pos);
    }
}

function sedangGambar(e) {
    if (!drawState.sedangMenggambar) return;
    
    // Jangan gambar garis saat mode hubung (garis dibuat otomatis)
    if (drawState.mode === 'hubung') return;
    
    const pos = getPos(e);
    const ctx = drawState.ctx;
    
    ctx.beginPath();
    ctx.moveTo(drawState.lastX, drawState.lastY);
    ctx.lineTo(pos.x, pos.y);
    
    if (drawState.mode === 'hapus') {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = drawState.ukuranKuas * 4;
    } else {
        ctx.strokeStyle = drawState.warnaAktif;
        ctx.lineWidth = drawState.ukuranKuas;
    }
    
    ctx.stroke();
    drawState.lastX = pos.x;
    drawState.lastY = pos.y;
}

function selesaiGambarAksi() {
    drawState.sedangMenggambar = false;
}

// ============================================
// CEK KLIK TITIK
// ============================================
function cekKlikTitik(pos) {
    const titik = drawState.gambarAktif.titik;
    const canvas = drawState.canvas;
    const radius = 35; // Area klik yang besar untuk anak-anak
    
    const idxTarget = drawState.titikSekarang;
    if (idxTarget >= titik.length) return;
    
    const t = titik[idxTarget];
    const pixelX = (t.x / 100) * canvas.width;
    const pixelY = (t.y / 100) * canvas.height;
    
    const jarak = Math.sqrt(
        Math.pow(pos.x - pixelX, 2) + Math.pow(pos.y - pixelY, 2)
    );
    
    if (jarak < radius) {
        hubungkanTitik(idxTarget);
    }
}

// ============================================
// HUBUNGKAN TITIK
// ============================================
function hubungkanTitik(idx) {
    const titik = drawState.gambarAktif.titik;
    const canvas = drawState.canvas;
    const ctx = drawState.ctx;
    
    const t = titik[idx];
    const pixelX = (t.x / 100) * canvas.width;
    const pixelY = (t.y / 100) * canvas.height;
    
    // Tandai titik selesai
    const titikEl = document.getElementById('titik-' + idx);
    if (titikEl) {
        titikEl.classList.remove('aktif');
        titikEl.classList.add('selesai');
    }
    
    // Gambar garis dari titik sebelumnya
    if (drawState.titikTerhubung.length > 0) {
        const prevIdx = drawState.titikTerhubung[drawState.titikTerhubung.length - 1];
        const prevT = titik[prevIdx];
        const prevX = (prevT.x / 100) * canvas.width;
        const prevY = (prevT.y / 100) * canvas.height;
        
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(pixelX, pixelY);
        ctx.strokeStyle = drawState.gambarAktif.warnaDefault;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
    
    drawState.titikTerhubung.push(idx);
    drawState.titikSekarang = idx + 1;
    
    // Aktifkan titik berikutnya
    if (drawState.titikSekarang < titik.length) {
        const nextEl = document.getElementById('titik-' + drawState.titikSekarang);
        if (nextEl) nextEl.classList.add('aktif');
    }
    
    updateInfoLangkah();
    
    // Cek apakah selesai
    if (drawState.titikTerhubung.length === titik.length) {
        setTimeout(() => {
            document.getElementById('selesaiGambar').classList.remove('hidden');
            buatKonfetiBanyak();
        }, 500);
    }
}

// ============================================
// INFO LANGKAH
// ============================================
function updateInfoLangkah() {
    const total = drawState.gambarAktif.titik.length;
    const sekarang = drawState.titikSekarang;
    
    document.getElementById('progressTitik').textContent = sekarang + '/' + total;
    
    if (sekarang < total) {
        document.getElementById('langkahTeks').textContent = 
            '👆 Sentuh titik ' + (sekarang + 1);
    } else {
        document.getElementById('langkahTeks').textContent = '✅ Selesai!';
    }
}

// ============================================
// MODE & TOOLS
// ============================================
function setMode(mode) {
    drawState.mode = mode;
    document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
    
    if (mode === 'hubung') document.getElementById('btnHubung').classList.add('active');
    if (mode === 'bebas') document.getElementById('btnBebas').classList.add('active');
    if (mode === 'hapus') document.getElementById('btnHapus').classList.add('active');
}

function resetGambar() {
    if (!drawState.canvas) return;
    drawState.titikSekarang = 0;
    drawState.titikTerhubung = [];
    
    const ctx = drawState.ctx;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, drawState.canvas.width, drawState.canvas.height);
    
    gambarGarisPanduan();
    renderTitik();
    updateInfoLangkah();
    
    document.getElementById('titikContainer').style.display = 'block';
    document.getElementById('selesaiGambar').classList.add('hidden');
}

function simpanGambar() {
    const canvas = drawState.canvas;
    const link = document.createElement('a');
    link.download = 'gambar-' + drawState.gambarAktif.nama + '.png';
    link.href = canvas.toDataURL();
    link.click();
}

function tutupSelesaiGambar() {
    document.getElementById('selesaiGambar').classList.add('hidden');
    document.getElementById('titikContainer').style.display = 'none';
    setMode('bebas');
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Warna picker
    document.querySelectorAll('.warna-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.warna-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            drawState.warnaAktif = btn.dataset.warna;
        };
    });
    
    // Ukuran kuas
    const slider = document.getElementById('ukuranKuas');
    if (slider) {
        slider.oninput = () => {
            drawState.ukuranKuas = parseInt(slider.value);
            const teks = document.getElementById('ukuranTeks');
            if (teks) teks.textContent = slider.value + 'px';
        };
    }
});

window.addEventListener('load', () => {
    initGameMenggambar();
});
```

---

## ✅ APA YANG DIPERBAIKI

| Masalah | Sebelum | Sesudah |
|---------|---------|---------|
| Container titik | Pakai class `.titik` (30x30px) | Pakai class `.titik-container` (100% x 100%) |
| Ukuran titik | 30px, sulit disentuh anak | **36px**, titik aktif **44px** |
| Area klik | 30px radius | **35px radius** (lebih mudah) |
| Garis panduan | Tidak ada | **Garis putus-putus** menunjukkan bentuk |
| Titik aktif | Tidak jelas | **Hijau berkedip** dengan glow effect |
| Titik selesai | Sama | **Biru kecil** |
| Instruksi | "Hubungkan titik 1 ke 2" | **"👆 Sentuh titik 1"** (lebih jelas untuk anak) |

---

## 🚀 CARA UPDATE

1. **Edit `index.html`** → ganti bagian layar menggambar
2. **Edit `style.css`** → ganti bagian CSS menggambar
3. **Edit `draw.js`** → ganti SELURUH isi
4. **Commit semua**
5. Tunggu 1-2 menit
6. **Clear cache browser** (Ctrl+Shift+R)
7. Test game menggambar

Sekarang anak-anak pasti bisa melihat dan menyentuh titik-titiknya! 🎯
