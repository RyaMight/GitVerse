// ===== LOADER =====
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1200);
});

// ===== PARTICLES =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    o: Math.random() * 0.5 + 0.2
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,240,255,${p.o})`;
    ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(0,240,255,${0.08 * (1 - dist / 120)})`;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scroll-progress').style.width = (window.scrollY / h * 100) + '%';
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 500);
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.innerHTML = navLinks.classList.contains('open') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}));

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== TYPING ANIMATION =====
const typingLines = [
  '$ git init',
  '$ git add .',
  '$ git commit -m "first commit"',
  '$ git push origin main',
  '> Siap menjadi developer handal? 🚀'
];
let lineIdx = 0, charIdx = 0;
const typingEl = document.getElementById('hero-typing');

function typeWriter() {
  if (lineIdx < typingLines.length) {
    const line = typingLines[lineIdx];
    if (charIdx < line.length) {
      typingEl.innerHTML = line.substring(0, charIdx + 1) + '<span class="cursor"></span>';
      charIdx++;
      setTimeout(typeWriter, 50 + Math.random() * 40);
    } else {
      setTimeout(() => { charIdx = 0; lineIdx++; typeWriter(); }, 1800);
    }
  } else {
    lineIdx = 0; typeWriter();
  }
}
setTimeout(typeWriter, 1500);

// ===== AUDIO PLAYER (SpeechSynthesis with Chunking) =====
const tracks = [
  {
    title: 'Pengenalan Git & Version Control',
    ep: 'Episode 1',
    text: 'Selamat datang di GitVerse Academy. Di episode pertama ini, kita akan membahas apa itu Git dan Version Control. Git adalah sistem version control terdistribusi yang diciptakan oleh Linus Torvalds pada tahun 2005. Version control adalah sistem yang mencatat setiap perubahan pada file dari waktu ke waktu, sehingga kamu bisa kembali ke versi sebelumnya kapan saja. Bayangkan kamu sedang menulis dokumen, dan kamu bisa menyimpan setiap versi perubahannya. Itulah konsep dasar version control. Dengan Git, setiap developer memiliki salinan lengkap dari seluruh riwayat proyek di komputer masing-masing. Ini membuat Git sangat cepat dan bisa digunakan bahkan tanpa koneksi internet. Git sangat penting dalam dunia pemrograman modern karena memungkinkan tim developer bekerja bersama tanpa saling mengganggu.'
  },
  {
    title: 'Git Init, Add, dan Commit',
    ep: 'Episode 2',
    text: 'Di episode kedua ini, kita akan belajar tiga perintah dasar Git yang paling penting. Pertama, git init. Perintah ini digunakan untuk membuat repository Git baru di folder proyek kamu. Cukup buka terminal, masuk ke folder proyek, dan ketik git init. Maka Git akan mulai melacak perubahan di folder tersebut. Kedua, git add. Setelah kamu mengubah atau membuat file baru, gunakan git add untuk menambahkan file ke staging area. Staging area adalah tempat persiapan sebelum perubahan disimpan. Kamu bisa menggunakan git add titik untuk menambahkan semua file sekaligus. Ketiga, git commit. Perintah ini menyimpan snapshot dari semua perubahan yang ada di staging area. Selalu tambahkan pesan deskriptif dengan flag minus m, contohnya: git commit minus m first commit. Ketiga perintah ini adalah fondasi dari workflow Git yang harus kamu kuasai.'
  },
  {
    title: 'Branching dan Merging',
    ep: 'Episode 3',
    text: 'Episode ketiga membahas konsep branching dan merging di Git. Branch atau cabang memungkinkan kamu mengembangkan fitur baru secara terpisah dari kode utama. Branch utama biasanya bernama main atau master. Untuk membuat branch baru, gunakan perintah git branch nama-branch. Untuk pindah ke branch tersebut, gunakan git checkout nama-branch. Saat kamu bekerja di branch terpisah, perubahan yang kamu buat tidak akan mempengaruhi branch utama. Setelah fitur selesai dan sudah diuji, kamu bisa menggabungkan branch fitur ke branch utama menggunakan perintah git merge. Terkadang, saat menggabungkan branch, terjadi konflik karena perubahan yang bertentangan. Ini disebut merge conflict. Kamu harus menyelesaikan konflik tersebut secara manual sebelum merge bisa diselesaikan. Branching adalah salah satu fitur paling powerful di Git.'
  },
  {
    title: 'Git Push, Pull, dan Clone',
    ep: 'Episode 4',
    text: 'Di episode keempat, kita membahas cara berinteraksi dengan remote repository. Git push digunakan untuk mengupload commit dari repository lokal ke remote repository seperti GitHub. Contohnya: git push origin main. Git pull digunakan untuk mengambil dan menggabungkan perubahan terbaru dari remote repository ke repository lokal kamu. Ini penting saat bekerja dalam tim agar kode kamu selalu up to date. Git clone digunakan untuk menyalin seluruh repository dari remote ke komputer kamu. Contohnya: git clone diikuti URL repository. Perintah ini sangat berguna saat kamu ingin berkontribusi ke proyek open source atau memulai proyek dari template yang sudah ada. Ketiga perintah ini adalah jembatan antara komputer lokal kamu dan server remote seperti GitHub.'
  },
  {
    title: 'GitHub untuk Kolaborasi',
    ep: 'Episode 5',
    text: 'Episode terakhir membahas GitHub sebagai platform kolaborasi. GitHub adalah layanan hosting berbasis cloud untuk repository Git. Dengan GitHub, kamu bisa menyimpan kode secara online, berkolaborasi dengan developer lain, dan berkontribusi ke proyek open source. Fitur penting GitHub antara lain: Pull Request, yaitu cara mengusulkan perubahan kode ke repository orang lain. Issues, untuk melaporkan bug atau meminta fitur baru. GitHub Actions, untuk otomatisasi seperti testing dan deployment. Dan GitHub Pages, untuk hosting website statis secara gratis. Untuk memulai, buat akun di github dot com, lalu buat repository baru. Hubungkan repository lokal kamu dengan perintah git remote add origin diikuti URL repository. Setelah itu, kamu bisa mulai push kode ke GitHub. Terima kasih sudah mendengarkan seluruh episode GitVerse Academy. Selamat belajar dan terus berlatih!'
  }
];

let currentTrack = 0, isPlaying = false, audioProgress = 0, audioInterval = null;
let speechChunks = [], currentChunkIdx = 0, chromeKeepAlive = null;
const synth = window.speechSynthesis;
let voicesLoaded = false;

// Pre-load voices
function loadVoices() {
  const voices = synth.getVoices();
  if (voices.length > 0) voicesLoaded = true;
}
loadVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = loadVoices;
}

// Split text into sentences for Chrome compatibility (Chrome cuts off after ~15s)
function splitIntoChunks(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
  let current = '';
  for (const sentence of sentences) {
    if ((current + sentence).length > 200) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function formatTime(secs) {
  const m = Math.floor(secs / 60), s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function getEstimatedDuration(text) {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 2.5);
}

function updateTrackUI() {
  const track = tracks[currentTrack];
  document.getElementById('audio-title').textContent = track.title;
  document.getElementById('audio-artist').textContent = `GitVerse Academy • ${track.ep}`;
  const estDur = getEstimatedDuration(track.text);
  document.getElementById('audio-duration').textContent = formatTime(estDur);
  document.getElementById('audio-current-time').textContent = '0:00';
  document.getElementById('audio-progress-fill').style.width = '0%';
  audioProgress = 0;
  document.querySelectorAll('.track-item').forEach((t, i) => t.classList.toggle('active', i === currentTrack));
}

function stopSpeech() {
  synth.cancel();
  clearInterval(audioInterval);
  clearInterval(chromeKeepAlive);
  speechChunks = [];
  currentChunkIdx = 0;
  isPlaying = false;
  document.getElementById('audio-play').innerHTML = '<i class="fas fa-play"></i>';
}

function getBestVoice() {
  const voices = synth.getVoices();
  // Priority: Indonesian > English (US) > any English > first available
  return voices.find(v => v.lang === 'id-ID')
      || voices.find(v => v.lang.startsWith('id'))
      || voices.find(v => v.lang === 'en-US')
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0] || null;
}

function speakChunk(idx) {
  if (idx >= speechChunks.length || !isPlaying) {
    // All chunks done
    clearInterval(audioInterval);
    clearInterval(chromeKeepAlive);
    document.getElementById('audio-progress-fill').style.width = '100%';
    document.getElementById('audio-current-time').textContent = formatTime(audioProgress);
    isPlaying = false;
    document.getElementById('audio-play').innerHTML = '<i class="fas fa-play"></i>';
    // Auto-next after 2 seconds
    setTimeout(() => {
      if (!isPlaying) {
        currentTrack = (currentTrack + 1) % tracks.length;
        updateTrackUI();
      }
    }, 2000);
    return;
  }

  const utt = new SpeechSynthesisUtterance(speechChunks[idx]);
  utt.lang = 'id-ID';
  utt.rate = 1;
  utt.pitch = 1;
  const voice = getBestVoice();
  if (voice) utt.voice = voice;

  utt.onend = () => {
    currentChunkIdx++;
    speakChunk(currentChunkIdx);
  };

  utt.onerror = (e) => {
    if (e.error !== 'canceled') {
      currentChunkIdx++;
      speakChunk(currentChunkIdx);
    }
  };

  synth.speak(utt);
}

function startSpeech() {
  stopSpeech();
  isPlaying = true;
  document.getElementById('audio-play').innerHTML = '<i class="fas fa-pause"></i>';

  const track = tracks[currentTrack];
  speechChunks = splitIntoChunks(track.text);
  currentChunkIdx = 0;

  const estDur = getEstimatedDuration(track.text);
  audioProgress = 0;

  audioInterval = setInterval(() => {
    if (!isPlaying) return;
    audioProgress++;
    document.getElementById('audio-progress-fill').style.width = Math.min((audioProgress / estDur * 100), 99) + '%';
    document.getElementById('audio-current-time').textContent = formatTime(audioProgress);
  }, 1000);

  // Chrome workaround: keep synth alive by calling resume every 10s
  chromeKeepAlive = setInterval(() => {
    if (synth.speaking && !synth.paused) {
      synth.pause();
      synth.resume();
    }
  }, 10000);

  speakChunk(0);
}

function togglePlay() {
  if (isPlaying) {
    stopSpeech();
  } else {
    startSpeech();
  }
}

document.getElementById('audio-play').addEventListener('click', togglePlay);
document.getElementById('audio-next').addEventListener('click', () => { stopSpeech(); currentTrack = (currentTrack + 1) % tracks.length; updateTrackUI(); });
document.getElementById('audio-prev').addEventListener('click', () => { stopSpeech(); currentTrack = (currentTrack - 1 + tracks.length) % tracks.length; updateTrackUI(); });
document.querySelectorAll('.track-item').forEach(t => t.addEventListener('click', () => {
  stopSpeech();
  currentTrack = parseInt(t.dataset.track);
  updateTrackUI();
  startSpeech();
}));

// ===== TERMINAL SIMULATOR =====
const terminalBody = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');
let gitState = { initialized: false, files: [], staged: [], commits: [], branch: 'main', branches: ['main'] };

const cmdResponses = {
  'help': () => `<span class="success">Perintah yang tersedia:</span>
  git init        - Inisialisasi repository
  git add .       - Tambah semua file ke staging
  git add [file]  - Tambah file tertentu
  git status      - Lihat status repository
  git commit -m   - Simpan perubahan
  git push        - Upload ke remote
  git pull        - Download dari remote
  git log         - Lihat riwayat commit
  git branch      - Lihat/buat branch
  git checkout    - Pindah branch
  git clone [url] - Clone repository
  git diff        - Lihat perubahan
  git merge       - Gabungkan branch
  ls              - Lihat file
  pwd             - Direktori saat ini
  clear           - Bersihkan terminal
  whoami          - Siapa kamu?`,

  'git init': () => {
    gitState.initialized = true;
    gitState.files = ['index.html', 'style.css', 'script.js', 'README.md'];
    return '<span class="success">Initialized empty Git repository in ~/project/.git/</span>';
  },
  'git add .': () => {
    if (!gitState.initialized) return '<span class="error">fatal: not a git repository (or any parent up to mount point /)</span>';
    gitState.staged = [...gitState.files];
    return '<span class="success">Added all files to staging area.</span>';
  },
  'git status': () => {
    if (!gitState.initialized) return '<span class="error">fatal: not a git repository</span>';
    let o = `On branch <span class="success">${gitState.branch}</span>\n`;
    if (gitState.staged.length) {
      o += '\nChanges to be committed:\n';
      gitState.staged.forEach(f => o += `  <span class="success">new file:   ${f}</span>\n`);
    } else if (gitState.files.length) {
      o += '\nUntracked files:\n';
      gitState.files.forEach(f => o += `  <span class="error">${f}</span>\n`);
    } else o += '\nnothing to commit, working tree clean';
    return o;
  },
  'git log': () => {
    if (!gitState.commits.length) return '<span class="error">fatal: your current branch has no commits yet</span>';
    return gitState.commits.map((c, i) => {
      const hash = Math.random().toString(16).substr(2, 7);
      return `<span class="amber">commit ${hash}${i === 0 ? ' (HEAD -> ' + gitState.branch + ')' : ''}</span>\nAuthor: GitStudent <student@gitverse.academy>\n\n    ${c}`;
    }).join('\n\n');
  },
  'git push': () => {
    if (!gitState.commits.length) return '<span class="error">error: src refspec main does not match any</span>';
    return `Enumerating objects: ${gitState.commits.length * 3}, done.
Counting objects: 100% (${gitState.commits.length * 3}/${gitState.commits.length * 3}), done.
Delta compression using up to 8 threads
Compressing objects: 100%, done.
Writing objects: 100%, done.
<span class="success">To https://github.com/gitverse/project.git
   abc1234..def5678  ${gitState.branch} -> ${gitState.branch}</span>`;
  },
  'git pull': () => '<span class="success">Already up to date.</span>',
  'git branch': () => gitState.branches.map(b => b === gitState.branch ? `* <span class="success">${b}</span>` : `  ${b}`).join('\n'),
  'git diff': () => {
    if (!gitState.initialized) return '<span class="error">fatal: not a git repository</span>';
    return `<span class="error">--- a/index.html</span>
<span class="success">+++ b/index.html</span>
<span class="cyan">@@ -1,3 +1,5 @@</span>
 &lt;html&gt;
<span class="success">+  &lt;head&gt;&lt;title&gt;GitVerse&lt;/title&gt;&lt;/head&gt;</span>
 &lt;body&gt;
<span class="success">+  &lt;h1&gt;Hello Git!&lt;/h1&gt;</span>
 &lt;/body&gt;`;
  },
  'git remote -v': () => `origin  https://github.com/gitverse/project.git (fetch)
origin  https://github.com/gitverse/project.git (push)`,
  'ls': () => gitState.initialized ? gitState.files.concat(['.git/']).join('  ') : 'Documents  Downloads  project',
  'pwd': () => '/home/gitverse/project',
  'whoami': () => '<span class="success">git-student</span> 🎓',
  'clear': () => 'CLEAR'
};

function processCommand(cmd) {
  cmd = cmd.trim();
  if (!cmd) return;

  // Add command line to output
  const cmdLine = document.createElement('div');
  cmdLine.className = 'terminal-line';
  cmdLine.innerHTML = `<span class="prompt">gitverse</span><span class="path">@academy</span><span class="prompt">:~/project$ </span><span class="cmd">${cmd}</span>`;

  const inputLine = terminalBody.querySelector('.terminal-input-line');
  terminalBody.insertBefore(cmdLine, inputLine);

  // Process
  let response = '';
  const commitMatch = cmd.match(/^git commit -m ["'](.+)["']$/);
  const branchMatch = cmd.match(/^git branch (\S+)$/);
  const checkoutMatch = cmd.match(/^git checkout (\S+)$/);
  const cloneMatch = cmd.match(/^git clone (\S+)$/);
  const addFileMatch = cmd.match(/^git add (\S+)$/);
  const mergeMatch = cmd.match(/^git merge (\S+)$/);

  if (cmdResponses[cmd]) {
    response = cmdResponses[cmd]();
  } else if (commitMatch) {
    if (!gitState.initialized) response = '<span class="error">fatal: not a git repository</span>';
    else if (!gitState.staged.length) response = '<span class="error">nothing to commit (create/copy files and use "git add" to track)</span>';
    else {
      gitState.commits.unshift(commitMatch[1]);
      gitState.staged = [];
      response = `<span class="success">[${gitState.branch} ${Math.random().toString(16).substr(2,7)}] ${commitMatch[1]}
 ${gitState.files.length} files changed, ${Math.floor(Math.random()*200)+50} insertions(+)</span>`;
    }
  } else if (branchMatch) {
    if (!gitState.initialized) response = '<span class="error">fatal: not a git repository</span>';
    else { gitState.branches.push(branchMatch[1]); response = `<span class="success">Created branch '${branchMatch[1]}'</span>`; }
  } else if (checkoutMatch) {
    if (gitState.branches.includes(checkoutMatch[1])) { gitState.branch = checkoutMatch[1]; response = `<span class="success">Switched to branch '${checkoutMatch[1]}'</span>`; }
    else response = `<span class="error">error: pathspec '${checkoutMatch[1]}' did not match any branch</span>`;
  } else if (cloneMatch) {
    response = `Cloning into 'project'...
remote: Enumerating objects: 156, done.
remote: Counting objects: 100% (156/156), done.
<span class="success">Receiving objects: 100% (156/156), 1.45 MiB, done.
Resolving deltas: 100% (89/89), done.</span>`;
  } else if (addFileMatch && addFileMatch[1] !== '.') {
    if (!gitState.initialized) response = '<span class="error">fatal: not a git repository</span>';
    else { gitState.staged.push(addFileMatch[1]); response = `<span class="success">Added '${addFileMatch[1]}' to staging area.</span>`; }
  } else if (mergeMatch) {
    response = `<span class="success">Merge made by the 'ort' strategy.
 3 files changed, 42 insertions(+), 7 deletions(-)</span>`;
  } else {
    response = `<span class="error">command not found: ${cmd}</span>\nKetik <span class="success">'help'</span> untuk daftar perintah.`;
  }

  if (response === 'CLEAR') {
    terminalBody.innerHTML = '';
    const newInputLine = document.createElement('div');
    newInputLine.className = 'terminal-input-line';
    newInputLine.innerHTML = `<span class="prompt">gitverse</span><span class="path">@academy</span><span class="prompt">:~/project$ </span><input type="text" id="terminal-input" autocomplete="off" spellcheck="false">`;
    terminalBody.appendChild(newInputLine);
    const newInput = document.getElementById('terminal-input');
    newInput.addEventListener('keydown', handleTerminalKey);
    newInput.focus();
    return;
  }

  if (response) {
    const outLine = document.createElement('div');
    outLine.className = 'terminal-line';
    outLine.innerHTML = `<span class="output">${response}</span>`;
    terminalBody.insertBefore(outLine, inputLine);
  }

  terminalInput.value = '';
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

const cmdHistory = [];
let historyIdx = -1;

function handleTerminalKey(e) {
  if (e.key === 'Enter') {
    const val = terminalInput.value;
    if (val.trim()) cmdHistory.unshift(val);
    historyIdx = -1;
    processCommand(val);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIdx < cmdHistory.length - 1) { historyIdx++; terminalInput.value = cmdHistory[historyIdx]; }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIdx > 0) { historyIdx--; terminalInput.value = cmdHistory[historyIdx]; }
    else { historyIdx = -1; terminalInput.value = ''; }
  }
}

terminalInput.addEventListener('keydown', handleTerminalKey);
terminalBody.addEventListener('click', () => terminalInput.focus());

// ===== QUIZ SYSTEM =====
const questions = [
  { q: 'Apa itu Git?', o: ['Bahasa pemrograman', 'Sistem version control terdistribusi', 'Framework JavaScript', 'Database management system'], a: 1 },
  { q: 'Command untuk membuat repository baru?', o: ['git new', 'git create', 'git init', 'git start'], a: 2 },
  { q: 'Apa fungsi "git add"?', o: ['Menghapus file', 'Menambahkan file ke staging area', 'Mengupload file ke GitHub', 'Membuat branch baru'], a: 1 },
  { q: 'Apa fungsi "git commit"?', o: ['Mengupload ke server', 'Menyimpan snapshot perubahan', 'Menghapus history', 'Membuat repository baru'], a: 1 },
  { q: 'Apa itu GitHub?', o: ['Compiler Git', 'Text editor', 'Platform hosting repository Git', 'Bahasa pemrograman'], a: 2 },
  { q: 'Command untuk mengupload ke remote repository?', o: ['git upload', 'git send', 'git push', 'git deploy'], a: 2 },
  { q: 'Apa itu branch dalam Git?', o: ['Folder project', 'Cabang pengembangan independen', 'File konfigurasi', 'Remote repository'], a: 1 },
  { q: 'Command untuk melihat status repository?', o: ['git info', 'git check', 'git status', 'git view'], a: 2 },
  { q: 'Apa fungsi "git clone"?', o: ['Membuat backup', 'Menyalin repository dari remote', 'Menghapus repository', 'Mengupdate repository'], a: 1 },
  { q: 'Apa itu merge conflict?', o: ['Error di Git', 'Konflik saat menggabungkan perubahan yang bertentangan', 'Branch yang rusak', 'Repository yang corrupt'], a: 1 }
];

let currentQ = 0, score = 0, quizDone = false;
const letters = ['A', 'B', 'C', 'D'];

function renderQuestion() {
  if (currentQ >= questions.length) { showResults(); return; }
  const q = questions[currentQ];
  document.getElementById('quiz-progress-fill').style.width = (currentQ / questions.length * 100) + '%';
  document.getElementById('quiz-progress-text').textContent = `${currentQ} / ${questions.length}`;
  document.getElementById('quiz-area').innerHTML = `
    <div class="quiz-card">
      <div class="quiz-question">${currentQ + 1}. ${q.q}</div>
      <div class="quiz-options">
        ${q.o.map((opt, i) => `<div class="quiz-option" data-idx="${i}"><span class="quiz-option-letter">${letters[i]}</span><span>${opt}</span></div>`).join('')}
      </div>
    </div>`;
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      if (quizDone) return;
      const idx = parseInt(opt.dataset.idx);
      const correct = questions[currentQ].a;
      document.querySelectorAll('.quiz-option').forEach(o => {
        const oi = parseInt(o.dataset.idx);
        if (oi === correct) o.classList.add('correct');
        else if (oi === idx && idx !== correct) o.classList.add('wrong');
        o.style.pointerEvents = 'none';
      });
      if (idx === correct) score++;
      setTimeout(() => { currentQ++; renderQuestion(); }, 1200);
    });
  });
}

function showResults() {
  document.getElementById('quiz-progress-fill').style.width = '100%';
  document.getElementById('quiz-progress-text').textContent = `${questions.length} / ${questions.length}`;
  const pct = Math.round(score / questions.length * 100);
  const badges = [
    { name: 'First Commit', icon: '🎯', earned: score >= 1 },
    { name: 'Git Explorer', icon: '🔍', earned: score >= 5 },
    { name: 'Merge Master', icon: '👑', earned: score >= 8 },
    { name: 'Git Legend', icon: '🏆', earned: score === 10 }
  ];
  let msg = pct === 100 ? 'Sempurna! Kamu adalah Git Master! 🎉' : pct >= 70 ? 'Hebat! Kamu sudah menguasai dasar-dasar Git!' : pct >= 50 ? 'Lumayan! Terus belajar untuk meningkatkan skor.' : 'Jangan menyerah! Pelajari materi lagi dan coba ulang.';
  document.getElementById('quiz-area').innerHTML = `
    <div class="quiz-score-card">
      <h3>🎓 Hasil Quiz</h3>
      <div class="quiz-score-number">${pct}%</div>
      <p>${score} dari ${questions.length} jawaban benar — ${msg}</p>
      <div class="quiz-badges">
        ${badges.map(b => `<span class="badge ${b.earned ? 'earned' : 'locked'}">${b.icon} ${b.name}</span>`).join('')}
      </div>
      <button class="btn-primary" onclick="currentQ=0;score=0;quizDone=false;renderQuestion();"><i class="fas fa-redo"></i> Ulangi Quiz</button>
    </div>`;
}

renderQuestion();
