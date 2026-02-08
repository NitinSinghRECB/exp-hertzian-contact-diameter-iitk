function openProcedure() {
  document.getElementById("procedure").style.display = "flex";
}

function closeProcedure() {
  document.getElementById("procedure").style.display = "none";
}

function resetExperiment() {
  window.location.reload();
}

// ---------------------------------------------
// CLEAN VARIABLES — SVG REMOVED
// ---------------------------------------------
let holdTime = 0;
let appliedForce = 0;

let resultBtn = document.querySelector('#resultBtn');
let conclusionBtn = document.querySelector('#conclusionBtn');
let tableobs = document.querySelector('.parameter-block');

resultBtn.style.display = "none";
conclusionBtn.style.display = "none";

tableobs.style.display = 'none';

let heading = document.getElementById('heading');
let svgContainer = document.querySelector('.svg-container');

// ---------------------------------------------
// 2D VIEW (NO SVG)
// ---------------------------------------------
function display2d() {
  heading.innerText = '2D View (No SVG Loaded)';
  svgContainer.innerHTML = `
    <div class="info-message">
      <p>2D View graphics were removed as requested.</p>
    </div>
  `;
}

// ---------------------------------------------
// FORMULA POPUP
// ---------------------------------------------
function showformula() {
  document.getElementById("formulaModal").style.display = "flex";
}

function closeFormula() {
  document.getElementById("formulaModal").style.display = "none";
}

// ---------------------------------------------
// INPUT PANEL
// ---------------------------------------------
function textar() {
  document.getElementById("indentPanel").style.display = "block";
}

const forceInput = document.getElementById("forceInput");
const timeInput = document.getElementById("timeInput");
const submitBtn = document.getElementById("submitIndent");

function validateInputs() {
  const f = parseFloat(forceInput.value);
  const t = parseFloat(timeInput.value);

  submitBtn.disabled = !(f >= 0.1 && f <= 10 && t >= 0);
}

function submitIndent() {
  holdTime = parseFloat(timeInput.value);
  appliedForce = parseFloat(forceInput.value);

  submitBtn.disabled = true;

  tableobs.style.display = 'block';

  console.log("Force:", appliedForce, "kg");
  console.log("Hold Time:", holdTime, "s");

  resultBtn.style.display = "block";
  conclusionBtn.style.display = "block";
}

forceInput.addEventListener("input", validateInputs);
timeInput.addEventListener("input", validateInputs);

// STARTUP POPUP LOGIC
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("startupOverlay");
  const form = document.getElementById("startupForm");

  if (!overlay || !form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const choice = document.querySelector('input[name="choice"]:checked').value;
    if (choice === "youtube") {
      window.open("https://virtual-labs.github.io/exp-micro-scratching-iitk/", "_blank");
    }
    overlay.style.display = "none";
  });
});

// ---------------------------------------------
// MATERIAL SELECTION
// ---------------------------------------------
function showMaterialOptions() {
  document.getElementById("materialOptions").style.display = "block";
  document.getElementById("performIndentBtn").style.display = "none";

  const mild = document.getElementById("mildRadio");
  mild.checked = false;
  mild.disabled = false;
}

function materialSelected() {
  document.getElementById("mildRadio").disabled = true;
  document.getElementById("performIndentBtn").style.display = "block";
}

function showIndentPanel() {
  document.getElementById("indentPanel").style.display = "block";
}

// ---------------------------------------------
// RESULTS POPUP
// ---------------------------------------------
let slideIndex = 0;

function showResult() {
  document.getElementById("resultModal").style.display = "flex";
  showSlide(0);
}

function closeResult() {
  document.getElementById("resultModal").style.display = "none";
}

function showSlide(n) {
  const slides = document.querySelectorAll("#resultSlides .slide");
  slides.forEach(s => s.classList.remove("active"));

  slideIndex = Math.max(0, Math.min(n, slides.length - 1));
  slides[slideIndex].classList.add("active");
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

// ---------------------------------------------
// CONCLUSION POPUP
// ---------------------------------------------
function showConclusion() {
  document.getElementById("conclusionModal").style.display = "flex";
}

function closeConclusion() {
  document.getElementById("conclusionModal").style.display = "none";
}

// ---------------------------------------------
// CRACK MEASUREMENT POPUP
// ---------------------------------------------
let crackSlideIndex = 0;
let crackTimer = null;

const crackImages = ["img1.png", "img2.png", "img3.png", "img4.png"];

function openCrackMeasure() {
  document.getElementById("crackMeasureModal").style.display = "flex";

  crackSlideIndex = 0;
  showCrackSlide(0);

  const imgTag = document.getElementById("crackSeqImg");
  const nextBtn = document.getElementById("crackImgNextBtn");

  nextBtn.style.display = "none";

  let i = 0;
  imgTag.src = crackImages[i];

  crackTimer = setInterval(() => {
    i++;
    if (i >= crackImages.length) {
      clearInterval(crackTimer);
      nextBtn.style.display = "inline-block";
      return;
    }
    imgTag.src = crackImages[i];
  }, 500);
}

function showCrackSlide(n) {
  const slides = document.querySelectorAll("#crackSlides .slide");
  slides.forEach(s => s.classList.remove("active"));

  crackSlideIndex = Math.max(0, Math.min(n, slides.length - 1));
  slides[crackSlideIndex].classList.add("active");
}

function openCrackTableSlide() {
  showCrackSlide(1);
}

function closeCrackMeasure() {
  document.getElementById("crackMeasureModal").style.display = "none";
  clearInterval(crackTimer);
}





function showResult() {
  document.getElementById("resultModal").style.display = "flex";
}

function closeResult() {
  document.getElementById("resultModal").style.display = "none";
}











function showConclusion() {
  document.getElementById("conclusionModal").style.display = "flex";
}

function closeConclusion() {
  document.getElementById("conclusionModal").style.display = "none";
}























// SVG file paths
const FRAME_0 = "frame0.svg";  // indenter up
const FRAME_1 = "frame1.svg";  // indenter moving down
const FRAME_2 = "frame2.svg";  // elastic + plastic region
const FRAME_3 = "frame3.svg";  // final indentation

let indentSVG = document.getElementById("indentSVG");

// --------------------------------------------------------
// 1. SHOW MACHINE WHEN CLICK ON “2D VIEW”
// --------------------------------------------------------
function display2d() {
    document.getElementById("svgStage").style.display = "block";

    // Load starting machine (frame0)
    indentSVG.src = FRAME_0;

    // Reset position
    indentSVG.style.transform = "translateY(0px)";

    console.log("2D view loaded → Machine displayed.");
}

// Hold time will be assigned after submit
// let holdTime = 0;

function submitIndent() {
    holdTime = parseFloat(document.getElementById("timeInput").value);

    if (holdTime < 0) holdTime = 0;

    console.log("Hold Time Set:", holdTime);
}

// --------------------------------------------------------
// 2. WHEN USER CLICKS “INDENT”, START FULL ANIMATION
// --------------------------------------------------------
function movedown() {
    console.log("STEP 1 → Indenter moving down...");

    // Change machine to downward-frame
    indentSVG.src = FRAME_1;

    // Animate indenter downward
    indentSVG.style.transform = "translateY(90px)";

    // After animation → touch event
    setTimeout(() => {
        touchMaterial();
    }, 800);
}

// --------------------------------------------------------
// 3. WHEN INDENTER TOUCHES THE MATERIAL
// --------------------------------------------------------
function touchMaterial() {
    console.log("STEP 2 → Material touched! Switching to Elastic + Plastic SVG...");

    // Switch to frame2
    indentSVG.src = FRAME_2;

    // Slight extra movement to show indentation
    indentSVG.style.transform = "translateY(110px)";

    // Hold for selected duration
    setTimeout(() => {
        retractIndenter();
    }, holdTime * 1000);
}

// --------------------------------------------------------
// 4. INDENTER GOES BACK UP
// --------------------------------------------------------
function retractIndenter() {
    console.log("STEP 3 → Indenter retracting...");

    // Switch to final indentation SVG
    indentSVG.src = FRAME_3;

    // Move upward
    indentSVG.style.transform = "translateY(0px)";
}
