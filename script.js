const customCursor = document.querySelector('#customCursor');
const handCursor = document.querySelector('#handCursor');

  let mousestarted = false

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  if(!mousestarted){
    customCursor.style.left = x + "px";
    customCursor.style.top = y + "px";
    handCursor.style.left = x + "px";
    handCursor.style.top = y + "px";
  
    const clickable = e.target.closest("button, a, [role='button']");
  
    if (clickable) {
      customCursor.style.display = "none";
      handCursor.style.display = "block";
    } else {
      handCursor.style.display = "none";
      customCursor.style.display = "block";
    }
  }
});

document.addEventListener('mouseenter', ()=>{
  customCursor.style.display = "block";
}
)
document.addEventListener('mouseleave', ()=>{
  customCursor.style.display = "none";
}
)

// Product Btn Logics
const dropdown = document.querySelector("#productsDropdown");

let isOpen = false;

function toggleDropdown(e){
    if (e) e.stopPropagation();
  
  isOpen = !isOpen;
  if (isOpen) {
    dropdown.classList.remove("max-h-0");
    dropdown.classList.add("max-h-40");
  } else {
    dropdown.classList.add("max-h-0");
    dropdown.classList.remove("max-h-40");
  }  
};  

if (productsBtn) {
  productsBtn.addEventListener("click", toggleDropdown);
}

// Mobile click
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", toggleDropdown);
}

document.addEventListener("click",() =>{
    dropdown.classList.add("max-h-0");
    dropdown.classList.remove("max-h-40");
    isOpen = false
})    




// Login Logout Logic 

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

const closeBtn = document.querySelector('#closeBtn')
const loginModal = document.getElementById("loginModal");
const loginSubmit = document.getElementById("loginSubmit");

// open LoginDiv
function openLogin() {
  loginModal.classList.remove("hidden");
  loginModal.classList.add("flex");
}

// close Logindiv
function closeLogin() {
  loginModal.classList.add("hidden");
  loginModal.classList.remove("flex");
}

closeBtn.addEventListener('click', ()=>{
  closeLogin()
})

// fake login
loginSubmit.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email.includes("@")) {
    alert("Please enter a valid email include @");
    return;
  }

  if (!password) {
    alert("Password cannot be empty");
    return;
  }

  closeLogin();
  showLoading("Logging you in...");

  setTimeout(() => {
    localStorage.setItem("isLoggedIn", "true");

    
  const firstLetter = email.charAt(0).toUpperCase();
  localStorage.setItem("userInitial", firstLetter);
    hideLoading();
    window.location.href = "../FigmaDesignPage/figma.html";
  }, 1000);
});



document.getElementById("figmaDesignBtn").addEventListener("click", () => {
  if (!isLoggedIn()) {
    openLogin();
  } else {
    window.location.href = "../FigmaDesignPage/figma.html";
  }
});
document.getElementById("logoutBtn").addEventListener("click", () => {

  // not logged in, so open login
  if (!isLoggedIn()) {
    openLogin();
    return;
  }

  // logged in, so logout
  showLoading("Logging you out...");

  setTimeout(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInitial");

    updateAvatar();
    updateAuthButton();

    hideLoading();
  }, 800);
});




const loadingModal = document.getElementById("loadingModal");
const loadingText = document.getElementById("loadingText");

function showLoading(text) {
  loadingText.innerText = text;
  loadingModal.classList.remove("hidden");
  loadingModal.classList.add("flex");
}

function hideLoading() {
  loadingModal.classList.add("hidden");
  loadingModal.classList.remove("flex");
}

function updateAvatar() {
  const avatar = document.getElementById("userAvatar");
  const logo = document.getElementById("avatarLogo");

  if (!avatar) return;

  if (localStorage.getItem("isLoggedIn") === "true") {
    const letter = localStorage.getItem("userInitial") || "?";

    avatar.innerHTML = letter;
    avatar.classList.add("bg-black", "text-white");
    avatar.classList.remove("bg-gray-100");
  } else {
    avatar.innerHTML = `
      <img
        src="https://static.vecteezy.com/system/resources/previews/065/386/863/non_2x/figma-logo-square-outline-icon-figma-app-editable-transparent-background-premium-social-media-design-for-digital-download-free-png.png"
        class="h-6 w-6"
      />
    `;
    avatar.classList.remove("bg-black", "text-white");
    avatar.classList.add("bg-gray-100");
  }
}

updateAvatar();


const logoutBtn = document.getElementById("logoutBtn");

function updateAuthButton() {
  if (!logoutBtn) return;

  if (localStorage.getItem("isLoggedIn") === "true") {
    logoutBtn.innerText = "Log out";
  } else {
    logoutBtn.innerText = "Log in";
  }
}

updateAuthButton();
