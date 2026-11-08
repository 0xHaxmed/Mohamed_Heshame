/**
 * HAXMED — Cybersecurity & Pentesting Portfolio
 * Brand Engine: Canvas Particles, 3D Tilt, Kali Terminal, Web3Forms
 */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     1. Interactive Background Canvas (Crimson Embers & Cyber Grid)
     ========================================================= */
  var canvas = document.getElementById("bgCanvas");
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var width = (canvas.width = window.innerWidth);
    var height = (canvas.height = window.innerHeight);

    var particles = [];
    var particleCount = Math.min(Math.floor(width / 22), 65);
    var mouse = { x: -1000, y: -1000, radius: 120 };

    window.addEventListener("resize", function () {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    window.addEventListener("mousemove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener("mouseout", function () {
      mouse.x = -1000;
      mouse.y = -1000;
    }, { passive: true });

    function Particle() {
      this.reset();
    }

    Particle.prototype.reset = function () {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = -(Math.random() * 0.6 + 0.2); // Floats upward like embers
      this.size = Math.random() * 2.2 + 0.8;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.fade = Math.random() * 0.006 + 0.003;
      // Crimson / Ruby color variance
      this.color = Math.random() > 0.4 ? "197, 31, 53" : "255, 51, 82";
    };

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.fade;

      // Mouse gentle repulsion / interaction
      var dx = mouse.x - this.x;
      var dy = mouse.y - this.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        var force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 1.5;
        this.y -= (dy / dist) * force * 1.5;
      }

      if (this.alpha <= 0 || this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
        this.y = height + 5;
      }
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + this.color + "," + this.alpha + ")";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(197, 31, 53, 0.7)";
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    var isTabActive = true;
    document.addEventListener("visibilitychange", function () {
      isTabActive = !document.hidden;
    });

    function renderCanvas() {
      if (isTabActive) {
        ctx.clearRect(0, 0, width, height);

        // Draw connecting cyber lines between close particles
        for (var a = 0; a < particles.length; a++) {
          for (var b = a + 1; b < particles.length; b++) {
            var dx = particles[a].x - particles[b].x;
            var dy = particles[a].y - particles[b].y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              var lineAlpha = (1 - dist / 100) * 0.12;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.strokeStyle = "rgba(197, 31, 53," + lineAlpha + ")";
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        particles.forEach(function (p) {
          p.update();
          p.draw();
        });
      }
      requestAnimationFrame(renderCanvas);
    }
    requestAnimationFrame(renderCanvas);
  }

  /* =========================================================
     2. 3D Tilt Effect on Cards ([data-tilt])
     ========================================================= */
  var tiltCards = document.querySelectorAll("[data-tilt]");
  if (tiltCards.length && !reduceMotion) {
    tiltCards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -6;
        var rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = "perspective(1000px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) scale3d(1.02, 1.02, 1.02)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });
  }

  /* =========================================================
     3. Sticky Navbar & Mobile Drawer
     ========================================================= */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 20) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  function closeMenu() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.contains("is-open") ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* =========================================================
     4. In-Page Router (Home <-> Case Studies)
     ========================================================= */
  window.goHome = function (sectionId) {
    var viewProject = document.getElementById("view-project");
    var viewHome = document.getElementById("view-home");
    if (viewProject) viewProject.style.display = "none";
    if (viewHome) viewHome.style.display = "";

    document.querySelectorAll(".project-detail").forEach(function (p) {
      p.classList.remove("is-active");
    });

    if (sectionId) {
      var el = document.getElementById(sectionId);
      if (el) {
        setTimeout(function () {
          el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        }, 20);
      }
    } else {
      window.scrollTo(0, 0);
    }
    if (menu) closeMenu();
  };

  window.openProject = function (slug) {
    document.querySelectorAll(".project-detail").forEach(function (p) {
      p.classList.remove("is-active");
    });
    var el = document.getElementById("detail-" + slug);
    if (!el) return;
    el.classList.add("is-active");
    var viewHome = document.getElementById("view-home");
    var viewProject = document.getElementById("view-project");
    if (viewHome) viewHome.style.display = "none";
    if (viewProject) viewProject.style.display = "block";
    window.scrollTo(0, 0);
  };

  /* Active nav link spy */
  var sectionIds = ["home", "about", "skills", "projects", "services", "contact"];
  var sections = sectionIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  var navLinks = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* =========================================================
     5. Scroll Reveal
     ========================================================= */
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* =========================================================
     6. Kali Linux Terminal Simulation
     ========================================================= */
  var terminalBody = document.getElementById("terminalBody");
  var terminalScript = [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "HAXMED // Junior Penetration Tester & Security Specialist" },
    { type: "cmd", text: "cat motto.txt" },
    { type: "out", text: "\"KNOWLEDGE IS POWER. ACCESS IS EVERYTHING.\"" },
    { type: "cmd", text: "pentest --scope perimeter" },
    { type: "out", text: "[+] Mapping attack surfaces: Web Apps & Internal Networks\n[+] Vulnerability research: OWASP Top 10, Auth Bypass, Exploits\n[+] Objective: Reduce risk before adversaries exploit it." },
    { type: "cmd", text: "system_status" },
    { type: "ok", text: "[*] OPERATIONAL READY • ARMED WITH ETHICAL EXPLOITS" }
  ];

  function renderStaticTerminal() {
    var html = "";
    terminalScript.forEach(function (line) {
      if (line.type === "cmd") {
        html += '<p class="line"><span class="prompt-user">HAXMED@kali</span>:<span class="prompt-path">~</span><span class="prompt-char">$</span> ' + line.text + '</p>';
      } else if (line.type === "ok") {
        html += '<p class="line line-ok">' + line.text.replace(/\n/g, "<br>") + '</p>';
      } else {
        html += '<p class="line line-output">' + line.text.replace(/\n/g, "<br>") + '</p>';
      }
    });
    html += '<p class="line"><span class="prompt-user">HAXMED@kali</span>:<span class="prompt-path">~</span><span class="prompt-char">$</span> <span class="cursor"></span></p>';
    terminalBody.innerHTML = html;
  }

  function typeText(text, el, done) {
    var idx = 0;
    (function step() {
      if (idx <= text.length) {
        el.textContent = text.slice(0, idx);
        idx++;
        setTimeout(step, 20);
      } else {
        done();
      }
    })();
  }

  function startTypingTerminal() {
    var i = 0;
    function next() {
      if (i >= terminalScript.length) {
        var cursorLine = document.createElement("p");
        cursorLine.className = "line";
        cursorLine.innerHTML = '<span class="prompt-user">HAXMED@kali</span>:<span class="prompt-path">~</span><span class="prompt-char">$</span> <span class="cursor"></span>';
        terminalBody.appendChild(cursorLine);
        return;
      }
      var line = terminalScript[i];
      var p = document.createElement("p");
      p.className = line.type === "ok" ? "line line-ok" : (line.type === "cmd" ? "line" : "line line-output");
      terminalBody.appendChild(p);

      if (line.type === "cmd") {
        var prompt = document.createElement("span");
        prompt.innerHTML = '<span class="prompt-user">HAXMED@kali</span>:<span class="prompt-path">~</span><span class="prompt-char">$</span> ';
        p.appendChild(prompt);
        var textSpan = document.createElement("span");
        textSpan.className = "line-cmd";
        p.appendChild(textSpan);
        typeText(line.text, textSpan, function () {
          i++;
          setTimeout(next, 200);
        });
      } else {
        p.innerHTML = line.text.replace(/\n/g, "<br>");
        i++;
        setTimeout(next, 240);
      }
    }
    next();
  }

  if (terminalBody) {
    reduceMotion ? renderStaticTerminal() : startTypingTerminal();
  }

  /* =========================================================
     7. Contact Form with Web3Forms AJAX Integration
     ========================================================= */
  var contactForm = document.getElementById("contactForm");
  var statusBox = document.getElementById("formStatus");
  var submitBtn = document.getElementById("submitBtn");

  function setFieldError(fieldId, hasError) {
    var field = document.getElementById(fieldId);
    if (field) field.classList.toggle("error", hasError);
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  if (contactForm && statusBox) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var projectType = document.getElementById("projectType").value;
      var message = document.getElementById("message").value.trim();
      var honeypot = document.getElementById("website").value;

      var valid = true;
      setFieldError("name", !name);
      if (!name) valid = false;

      var emailValid = isValidEmail(email);
      setFieldError("email", !emailValid);
      if (!emailValid) valid = false;

      setFieldError("projectType", !projectType);
      if (!projectType) valid = false;

      setFieldError("message", message.length < 5);
      if (message.length < 5) valid = false;

      if (honeypot) {
        contactForm.reset();
        return;
      }

      statusBox.className = "form-status";
      if (!valid) {
        statusBox.textContent = "Please fill in all required fields with valid information.";
        statusBox.classList.add("show", "fail");
        return;
      }

      // Show sending state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>TRANSMITTING INQUIRY...</span>";
      }

      // Web3Forms submission
      // To activate: replace YOUR_ACCESS_KEY_HERE with your free key from https://web3forms.com
      var accessKey = contactForm.getAttribute("data-access-key") || "YOUR_ACCESS_KEY_HERE";

      // If key is not yet configured, gracefully fallback to mailto or inform user
      if (accessKey === "YOUR_ACCESS_KEY_HERE") {
        setTimeout(function () {
          statusBox.innerHTML = "Message noted! (Access Key pending). You can also email me directly at: <a href='mailto:mohamedhesham1033@gmail.com' style='color:#FF3352;text-decoration:underline;'>mohamedhesham1033@gmail.com</a>";
          statusBox.classList.add("show", "success");
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "<span>SEND INQUIRY</span>";
          }
          contactForm.reset();
        }, 500);
        return;
      }

      var payload = {
        access_key: accessKey,
        name: name,
        email: email,
        service: projectType,
        message: message,
        subject: "Security Inquiry from " + name + " [" + projectType + "]",
        from_name: "HAXMED Security Portal"
      };

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          statusBox.textContent = "Transmission successful. Your message has been encrypted and received. I will respond promptly.";
          statusBox.classList.add("show", "success");
          contactForm.reset();
        } else {
          throw new Error(data.message || "Submission failed");
        }
      })
      .catch(function () {
        statusBox.innerHTML = "Direct transmission failed. Please reach me directly via email at <a href='mailto:mohamedhesham1033@gmail.com' style='color:#FF3352;text-decoration:underline;'>mohamedhesham1033@gmail.com</a>.";
        statusBox.classList.add("show", "fail");
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "<span>SEND INQUIRY</span>";
        }
      });
    });
  }

  /* =========================================================
     8. 1-Click Copy Email Button
     ========================================================= */
  var copyBtn = document.querySelector(".copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = copyBtn.getAttribute("data-copy-text") || "mohamedhesham1033@gmail.com";
      var originalHtml = copyBtn.innerHTML;

      function onCopied() {
        copyBtn.classList.add("copied");
        copyBtn.innerHTML = "<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5'><polyline points='20 6 9 17 4 12'></polyline></svg> COPIED";
        setTimeout(function () {
          copyBtn.classList.remove("copied");
          copyBtn.innerHTML = originalHtml;
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onCopied).catch(function () {
          fallbackCopy(text, onCopied);
        });
      } else {
        fallbackCopy(text, onCopied);
      }
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
    done();
  }

  /* =========================================================
     9. Count-Up Stats
     ========================================================= */
  var statNumbers = document.querySelectorAll(".stat-number");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    if (reduceMotion) {
      el.textContent = target.toLocaleString();
      return;
    }
    var duration = 1400;
    var startTime = null;
    function step(ts) {
      if (startTime === null) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  if (statNumbers.length) {
    if ("IntersectionObserver" in window) {
      var statsObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      statNumbers.forEach(function (el) { statsObserver.observe(el); });
    } else {
      statNumbers.forEach(animateCount);
    }
  }

})();
