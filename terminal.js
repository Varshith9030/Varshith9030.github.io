/* ============================================================
   varshith@offsec — interactive terminal
   pure JS, no deps, ~5KB
   ============================================================ */

(function () {
  'use strict';

  const body = document.getElementById('terminal-body');
  if (!body) return;

  // ---------- prompt rendering ----------
  const PROMPT_HTML =
    '<span class="t-prompt">' +
      '<span class="t-user">varshith</span>' +
      '<span class="t-host">@offsec</span>' +
      ':' +
      '<span class="t-path">~</span>' +
      '<span class="t-arrow">$</span>' +
    '</span>';

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function appendLine(html, cls) {
    const line = el('div', 't-line' + (cls ? ' ' + cls : ''), html);
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
    return line;
  }

  function appendPromptedCmd(cmdText) {
    appendLine(PROMPT_HTML + ' <span class="t-cmd">' + escapeHtml(cmdText) + '</span>');
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  // ---------- command implementations ----------
  const COMMANDS = {
    help: () => [
      { html: 'Available commands:', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: '  <span class="t-out-accent">whoami</span>      &mdash; quick intro', cls: 't-out' },
      { html: '  <span class="t-out-accent">skills</span>      &mdash; technical skills and tools', cls: 't-out' },
      { html: '  <span class="t-out-accent">projects</span>    &mdash; current open-source projects', cls: 't-out' },
      { html: '  <span class="t-out-accent">experience</span>  &mdash; current role', cls: 't-out' },
      { html: '  <span class="t-out-accent">certs</span>       &mdash; certifications', cls: 't-out' },
      { html: '  <span class="t-out-accent">contact</span>     &mdash; how to reach me', cls: 't-out' },
      { html: '  <span class="t-out-accent">cv</span>          &mdash; download my CV', cls: 't-out' },
      { html: '  <span class="t-out-accent">clear</span>       &mdash; clear the screen', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: '<span class="t-out-dim">Tip: use Tab to autocomplete, ↑/↓ for history.</span>', cls: 't-out' },
    ],

    whoami: () => [
      { html: '<span class="t-out-bright">Varshith Bonagiri</span> &middot; Offensive Security Practitioner', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: 'I break into things so the people building them can fix what matters.', cls: 't-out' },
      { html: 'Currently a <span class="t-out-accent">Junior Security Analyst at FireCompass</span>,', cls: 't-out' },
      { html: 'running end-to-end attack simulations against client environments.', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: '<span class="t-out-dim">Independent work: recon automation, web application security.</span>', cls: 't-out' },
    ],

    skills: () => [
      { html: '<span class="t-out-accent">Offensive Security:</span>', cls: 't-out' },
      { html: '  Penetration Testing, Red Team Operations, Vulnerability Assessment,', cls: 't-out' },
      { html: '  Adversary Emulation, Recon, Exploitation, Privilege Escalation,', cls: 't-out' },
      { html: '  Lateral Movement, Persistence, OWASP Top 10', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: '<span class="t-out-accent">Tools:</span>', cls: 't-out' },
      { html: '  Burp Suite, Metasploit, Nmap, Nessus, Nuclei, SQLMap,', cls: 't-out' },
      { html: '  OWASP ZAP, Acunetix, Hashcat, John the Ripper, Wireshark', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: '<span class="t-out-accent">Code:</span> Python, Bash, PowerShell, asyncio, aiohttp, Selenium', cls: 't-out' },
      { html: '<span class="t-out-accent">OS:</span>   Kali Linux, Parrot OS, RHEL, Windows', cls: 't-out' },
      { html: '<span class="t-out-accent">Frameworks:</span> MITRE ATT&amp;CK, OWASP, PTES, Cyber Kill Chain', cls: 't-out' },
    ],

    projects: () => [
      { html: '<span class="t-out-accent">[1]</span> <span class="t-out-bright">Subdomain Hunter</span> &mdash; May 2026', cls: 't-out' },
      { html: '    Recursive subdomain enumeration pipeline (9 tools + 25 APIs)', cls: 't-out' },
      { html: '    <a class="t-link" href="https://github.com/Varshith9030/subdomain-hunter" target="_blank" rel="noopener">github.com/Varshith9030/subdomain-hunter</a>', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: '<span class="t-out-accent">[2]</span> <span class="t-out-bright">Mega-Finder</span> &mdash; Nov 2025', cls: 't-out' },
      { html: '    Async recon scanner for .env leaks, exposed .git, S3 buckets,', cls: 't-out' },
      { html: '    Swagger, GraphQL introspection, CI/CD panels, JS secrets', cls: 't-out' },
      { html: '    <a class="t-link" href="https://github.com/Varshith9030/Mega-Finder" target="_blank" rel="noopener">github.com/Varshith9030/Mega-Finder</a>', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: '<span class="t-out-dim">See <a class="t-link" href="projects.html">~/projects</a> for full details.</span>', cls: 't-out' },
    ],

    experience: () => [
      { html: '<span class="t-out-accent">FireCompass</span> &middot; Junior Security Analyst', cls: 't-out' },
      { html: '<span class="t-out-dim">Jun 2026 &mdash; Present &middot; Bengaluru</span>', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: '  &gt; Deliver end-to-end adversary simulations &mdash; reconnaissance,', cls: 't-out' },
      { html: '    exploitation, lateral movement, persistence', cls: 't-out' },
      { html: '  &gt; Conduct vulnerability assessments on external and internal targets', cls: 't-out' },
      { html: '  &gt; Author client-facing disclosure reports with PoC exploits', cls: 't-out' },
      { html: '    and remediation guidance', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: '<span class="t-out-accent">FireCompass</span> &middot; Junior Security Analyst', cls: 't-out' },
      { html: '<span class="t-out-dim">Jun 2025 &mdash; Jun 2026 &middot; Bengaluru</span>', cls: 't-out' },
      { html: '', cls: 't-out' },
      { html: '  &gt; Executed adversary simulations across client environments;', cls: 't-out' },
      { html: '    converted to full-time based on engagement record and tooling contributions', cls: 't-out' },
    ],

    certs: () => [
      { html: '<span class="t-out-accent">[OFF]</span> TCM Security Practical Junior Penetration Tester (PJPT)  <span class="t-out-dim">May 2026</span>', cls: 't-out' },
      { html: '<span class="t-out-accent">[OFF]</span> CompTIA PenTest+                                        <span class="t-out-dim">Jan 2026</span>', cls: 't-out' },
      { html: '<span class="t-out-amber">[FND]</span> CompTIA Security+ (ce)                                  <span class="t-out-dim">Feb 2025</span>', cls: 't-out' },
      { html: '<span class="t-out-amber">[FND]</span> CompTIA Network+ (ce)                                   <span class="t-out-dim">Jul 2024</span>', cls: 't-out' },
      { html: '<span class="t-out-cyan">[SYS]</span> Red Hat System Administration I (RH124)                <span class="t-out-dim">Jun 2024</span>', cls: 't-out' },
    ],

    contact: () => [
      { html: '<span class="t-out-accent">email:</span>    <a class="t-link" href="mailto:bonagirivarshith@gmail.com">bonagirivarshith@gmail.com</a>', cls: 't-out' },
      { html: '<span class="t-out-accent">github:</span>   <a class="t-link" href="https://github.com/Varshith9030" target="_blank" rel="noopener">github.com/Varshith9030</a>', cls: 't-out' },
      { html: '<span class="t-out-accent">linkedin:</span> <a class="t-link" href="https://www.linkedin.com/in/varshithbonagiri/" target="_blank" rel="noopener">linkedin.com/in/varshithbonagiri</a>', cls: 't-out' },
      { html: '<span class="t-out-accent">location:</span> Bengaluru, India', cls: 't-out' },
    ],

    cv: () => [
      { html: '<span class="t-out-dim">No CV file is hosted on this site yet.</span>', cls: 't-out' },
      { html: 'Reach out via email for the latest copy:', cls: 't-out' },
      { html: '<a class="t-link" href="mailto:bonagirivarshith@gmail.com">bonagirivarshith@gmail.com</a>', cls: 't-out' },
    ],

    clear: () => {
      body.innerHTML = '';
      return [];
    },

    ls: () => [
      { html: '<span class="t-out-cyan">about/</span>     <span class="t-out-cyan">projects/</span>   <span class="t-out-cyan">writeups/</span>   <span class="t-out-dim">cv.pdf</span>', cls: 't-out' },
    ],

    pwd: () => [{ html: '/home/varshith', cls: 't-out' }],
    date: () => [{ html: new Date().toString(), cls: 't-out' }],
    echo: (args) => [{ html: escapeHtml(args.join(' ')), cls: 't-out' }],
    exit: () => [{ html: '<span class="t-out-dim">Nice try. You can\'t leave that easily.</span>', cls: 't-out' }],
    'sudo': () => [{ html: '<span class="t-out-error">varshith is not in the sudoers file. This incident will be reported.</span>', cls: 't-out' }],
    'rm': () => [{ html: '<span class="t-out-error">Permission denied.</span> <span class="t-out-dim">(nice try)</span>', cls: 't-out' }],
  };

  // command aliases
  COMMANDS['about']   = COMMANDS['whoami'];
  COMMANDS['skill']   = COMMANDS['skills'];
  COMMANDS['project'] = COMMANDS['projects'];
  COMMANDS['cert']    = COMMANDS['certs'];
  COMMANDS['exp']     = COMMANDS['experience'];
  COMMANDS['?']       = COMMANDS['help'];
  COMMANDS['h']       = COMMANDS['help'];

  // ---------- command execution ----------
  function runCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) {
      appendLine(PROMPT_HTML + ' ');
      return;
    }
    appendPromptedCmd(trimmed);

    const [cmd, ...args] = trimmed.split(/\s+/);
    const handler = COMMANDS[cmd.toLowerCase()];

    if (!handler) {
      appendLine(
        '<span class="t-out-error">bash: ' + escapeHtml(cmd) + ': command not found.</span> ' +
        '<span class="t-out-dim">Try <span class="t-out-accent">help</span>.</span>',
        't-out'
      );
      return;
    }

    const output = handler(args);
    output.forEach(line => appendLine(line.html, line.cls));
  }

  // ---------- input handling ----------
  const history = [];
  let historyIdx = -1;
  let inputEl = null;

  function makeInputLine() {
    const line = document.createElement('div');
    line.className = 't-line t-input-line';
    line.innerHTML = PROMPT_HTML + ' ';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 't-input';
    input.autocomplete = 'off';
    input.autocapitalize = 'off';
    input.spellcheck = false;
    input.setAttribute('aria-label', 'Terminal input');

    line.appendChild(input);
    body.appendChild(line);
    inputEl = input;

    input.addEventListener('keydown', onKey);
    input.focus();
    body.scrollTop = body.scrollHeight;
  }

  function onKey(e) {
    if (e.key === 'Enter') {
      const val = inputEl.value;
      inputEl.removeEventListener('keydown', onKey);
      // remove the live input row before printing the executed command line
      inputEl.parentElement.remove();
      inputEl = null;
      if (val.trim()) {
        history.push(val);
        historyIdx = history.length;
      }
      runCommand(val);
      makeInputLine();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      historyIdx = Math.max(0, historyIdx - 1);
      inputEl.value = history[historyIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      historyIdx = Math.min(history.length, historyIdx + 1);
      inputEl.value = history[historyIdx] || '';
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const v = inputEl.value.trim().toLowerCase();
      if (!v) return;
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(v));
      if (matches.length === 1) {
        inputEl.value = matches[0];
      } else if (matches.length > 1) {
        inputEl.removeEventListener('keydown', onKey);
        inputEl.parentElement.remove();
        inputEl = null;
        appendPromptedCmd(v);
        appendLine(matches.join('   '), 't-out-dim');
        makeInputLine();
        inputEl.value = v;
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      body.innerHTML = '';
      makeInputLine();
    }
  }

  // refocus terminal on click anywhere in body
  body.addEventListener('click', () => {
    if (inputEl) inputEl.focus();
  });

  // ---------- boot sequence ----------
  function typewriter(text, cls, speed, done) {
    const line = el('div', 't-line' + (cls ? ' ' + cls : ''), '');
    body.appendChild(line);
    let i = 0;
    function step() {
      if (i <= text.length) {
        line.innerHTML = text.slice(0, i);
        i++;
        body.scrollTop = body.scrollHeight;
        setTimeout(step, speed);
      } else {
        done && done();
      }
    }
    step();
  }

  function boot() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      // Skip animation for accessibility
      appendLine('<span class="t-out-dim">[ varshith@offsec : terminal initialized ]</span>');
      runCommand('whoami');
      makeInputLine();
      return;
    }

    const bootLines = [
      { text: 'Last login: ' + new Date().toUTCString() + ' on tty1', cls: 't-out-dim', speed: 4 },
      { text: '[ varshith@offsec ] phosphor terminal v1.0 ready.', cls: 't-out-accent', speed: 8 },
      { text: '', cls: '', speed: 0 },
    ];

    function next(idx) {
      if (idx >= bootLines.length) {
        // auto-run whoami
        appendPromptedCmd('whoami');
        setTimeout(() => {
          COMMANDS.whoami().forEach(line => appendLine(line.html, line.cls));
          appendLine('');
          appendLine('<span class="t-out-dim">Type <span class="t-out-accent">help</span> for a list of commands.</span>');
          appendLine('');
          makeInputLine();
        }, 300);
        return;
      }
      const ln = bootLines[idx];
      if (ln.speed === 0) {
        appendLine(ln.text || '&nbsp;', ln.cls);
        next(idx + 1);
      } else {
        typewriter(ln.text, ln.cls, ln.speed, () => next(idx + 1));
      }
    }

    next(0);
  }

  // start
  boot();
})();
