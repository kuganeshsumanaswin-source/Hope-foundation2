(function () {
  "use strict";

  const WHATSAPP_NUMBER = "919944500963";
  const INSTITUTE_NAME = "Hope Foundation";

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const enquiryForm = document.getElementById("enquiry-form");
  const courseSelect = document.getElementById("course");
  const formSuccess = document.getElementById("form-success");
  const courseEnquireButtons = document.querySelectorAll(".course-enquire");

  function buildWhatsAppUrl(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function closeNav() {
    if (!navToggle || !mainNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    mainNav.classList.remove("is-open");
  }

  function openNav() {
    if (!navToggle || !mainNav) return;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    mainNav.classList.add("is-open");
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.contains("is-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  courseEnquireButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const course = btn.getAttribute("data-course");
      if (courseSelect && course) {
        courseSelect.value = course;
      }
      const contact = document.getElementById("contact");
      if (contact) {
        contact.scrollIntoView({ behavior: "smooth" });
      }
      closeNav();
      const nameInput = document.getElementById("name");
      if (nameInput) nameInput.focus();
    });
  });

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + "-error");
    if (errorEl) errorEl.textContent = message;
    if (input) input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function clearErrors() {
    showError("name", "");
    showError("phone", "");
    showError("course", "");
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value;

    if (!name) {
      showError("name", "Please enter your name.");
      valid = false;
    }

    if (!phone) {
      showError("phone", "Please enter your phone number.");
      valid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
      showError("phone", "Enter a valid 10-digit mobile number.");
      valid = false;
    }

    if (!course) {
      showError("course", "Please select a course.");
      valid = false;
    }

    return valid
      ? { name: name, phone: phone, course: course, message: document.getElementById("message").value.trim() }
      : null;
  }

  function buildEnquiryMessage(data) {
    let text =
      "Hello " +
      INSTITUTE_NAME +
      ",\n\n" +
      "I would like to enquire about a course.\n\n" +
      "Name: " +
      data.name +
      "\n" +
      "Phone: " +
      data.phone +
      "\n" +
      "Course: " +
      data.course;

    if (data.message) {
      text += "\nMessage: " + data.message;
    }

    return text;
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = validateForm();
      if (!data) return;

      const message = buildEnquiryMessage(data);
      const url = buildWhatsAppUrl(message);

      window.open(url, "_blank", "noopener,noreferrer");

      if (formSuccess) {
        formSuccess.hidden = false;
      }

      const copied = await copyToClipboard(message);
      if (formSuccess && copied) {
        formSuccess.textContent =
          "Opening WhatsApp… Your enquiry was also copied to the clipboard as a backup.";
      }
    });
  }

  /* Institution bio video */
  const videoWrap = document.getElementById("video-player-wrap");
  const bioVideo = document.getElementById("bio-video");
  const playBtn = document.getElementById("video-play-btn");
  const videoPlaceholder = document.getElementById("video-placeholder");

  function showVideoPlaceholder() {
    if (!videoPlaceholder || !bioVideo) return;
    bioVideo.classList.add("is-hidden");
    bioVideo.hidden = true;
    videoPlaceholder.hidden = false;
    if (playBtn) playBtn.hidden = true;
  }

  function initYouTubeEmbed(videoId) {
    if (!videoWrap || !videoId) return;
    videoWrap.classList.add("is-youtube");
    if (bioVideo) bioVideo.remove();
    if (playBtn) playBtn.remove();
    if (videoPlaceholder) videoPlaceholder.hidden = true;

    const iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube.com/embed/" +
      videoId +
      "?rel=0&modestbranding=1";
    iframe.title = "Hope Foundation institution video";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    videoWrap.appendChild(iframe);
  }

  if (videoWrap) {
    const youtubeId = (videoWrap.getAttribute("data-youtube-id") || "").trim();
    if (youtubeId) {
      initYouTubeEmbed(youtubeId);
    } else if (bioVideo) {
      bioVideo.addEventListener("error", showVideoPlaceholder);
      bioVideo.addEventListener("loadeddata", function () {
        if (videoPlaceholder) videoPlaceholder.hidden = true;
      });

      if (playBtn) {
        playBtn.addEventListener("click", function () {
          bioVideo.play();
          videoWrap.classList.add("is-playing");
        });
      }

      bioVideo.addEventListener("play", function () {
        videoWrap.classList.add("is-playing");
      });

      bioVideo.addEventListener("pause", function () {
        videoWrap.classList.remove("is-playing");
      });

      bioVideo.addEventListener("ended", function () {
        videoWrap.classList.remove("is-playing");
      });

      bioVideo.addEventListener("loadedmetadata", function () {
        if (videoPlaceholder) videoPlaceholder.hidden = true;
        if (playBtn) playBtn.hidden = false;
      });
    }
  }

  const courseVideos = document.querySelectorAll(".course-video");
  courseVideos.forEach(function (video) {
    video.addEventListener("play", function () {
      courseVideos.forEach(function (other) {
        if (other !== video && !other.paused) {
          other.pause();
        }
      });
      if (bioVideo && !bioVideo.paused) {
        bioVideo.pause();
      }
    });
  });

  if (bioVideo && courseVideos.length) {
    bioVideo.addEventListener("play", function () {
      courseVideos.forEach(function (v) {
        v.pause();
      });
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
