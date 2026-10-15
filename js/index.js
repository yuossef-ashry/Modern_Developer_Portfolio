/* ============================================================
   Personal Portfolio - JavaScript Logic
   تم تطوير هذا الكود لتنفيذ المتطلبات التالية:
   1. تغيير الـ Active Link في Navbar عند الـ Scroll
   2. التبديل بين Dark Mode و Light Mode
   3. فلترة أعمال Portfolio باستخدام JavaScript (بدون Bootstrap)
   4. Carousel للـ Testimonials باستخدام JavaScript
   5. Settings Sidebar لتخصيص الألوان والخطوط
   6. زر Scroll to Top
   ============================================================ */
// ═══════════════════════════════════════════════════════════════
// 1. المتغيرات العامة (Global Variables)
// ═══════════════════════════════════════════════════════════════
// مدة الأنيميشن للـ Portfolio Filters بالملي ثانية
var PORTFOLIO_FILTERS_ANIMATION_DURATION = 300;
// جميع روابط الـ Navigation
var allLinks = document.querySelectorAll("nav a");
// عنصر الـ Navbar نفسه
var nav = document.querySelector("nav");
// ارتفاع الـ Navbar (هنحتاجه عشان نعرف نحدد active link)
var navHeight = nav.clientHeight;
// عنصر الـ html (عشان نضيف/نشيل class dark)
var html = document.querySelector("html");
// متغير لتخزين الـ Section النشط حالياً
var activeLink = "";
// بيانات الـ Sections المرتبطة بالروابط
var sectionsData = initializeSectionsData();
// زر تبديل الـ Theme (Dark/Light)
var themeToggleBtn = document.getElementById("theme-toggle-button");
// متغير لتجنب تشغيل الـ scroll handler كتير (Performance Optimization)
var ticking = false;
// قائمة روابط الـ Navbar (للـ Mobile menu)
var navLinks = document.getElementById("navLinks");
// زر فتح/قفل قائمة الـ Mobile
var navTogglerBtn = document.getElementById("navToggler");
// تحديث سنة الـ Copyright تلقائياً
document.getElementById("copyRightDate").innerText = new Date().getFullYear();
// ═══════════════════════════════════════════════════════════════
// 2. الـ Navbar Active Link أثناء الـ Scroll
// ═══════════════════════════════════════════════════════════════
/**
 * دالة لتهيئة بيانات الـ Sections:
 * بتجمع كل الـ <section> الموجودة في الصفحة
 * وترتبط كل section بالـ link بتاعها في الـ Navbar
 * @returns {Array} مصفوفة تحتوي على بيانات كل section
 */
function initializeSectionsData() {
  var sections = document.querySelectorAll("section");
  var data = [];
  for (var i = 0; i < sections.length; i++) {
    for (var j = 0; j < allLinks.length; j++) {
      // بنقارن id الـ section بالـ href بتاع الـ link
      if ("#" + sections[i].id === allLinks[j].getAttribute("href")) {
        data.push({
          id: sections[i].id,
          element: sections[i],      // الـ DOM element نفسه
          link: allLinks[j],          // الـ link المرتبط بيه
        });
        break; // لقينا الـ link، نطلع من اللوب الداخلية
      }
    }
  }
  return data;
}
/**
 * دالة لإزالة الـ active class من كل الروابط
 */
function clearActiveState() {
  allLinks.forEach(function (link) {
    link.classList.remove("active");
  });
}
/**
 * دالة لتحديد الـ Active Link حسب مكان الـ Scroll:
 * بتشوف أي section ظاهر حالياً في viewport عند ارتفاع الـ Navbar
 * وبتضيف الـ active class للـ link المرتبط بيه
 * 
 * ⚠️ ملاحظة: initializeSideTheme() بتتنده هنا مع كل scroll
 *    ده ممكن يكون performance issue شوية
 */
function setActiveLink() {
  initializeSideTheme(); // ⚠️ بتتنده مع كل scroll event
  for (var i = 0; i < sectionsData.length; i++) {
    var rect = sectionsData[i].element.getBoundingClientRect();
    // لو الـ section بيمر بمنطقة الـ Navbar
    if (rect.top <= navHeight && rect.bottom >= navHeight) {
      // لو نفس الـ link نشط قبل كده، مش محتاجين نعمل حاجة
      if (activeLink === sectionsData[i].id) return;
      activeLink = sectionsData[i].id;
      clearActiveState();
      sectionsData[i].link.classList.add("active");
      return;
    }
  }
  // لو مفيش section نشط، نشيل الـ active
  activeLink = "";
  clearActiveState();
}
/**
 * دالة الـ Scroll Handler مع requestAnimationFrame:
 * بتستخدم ticking flag عشان متشغلش الـ handler كتير
 * ده pattern شائع لتحسين الأداء (Scroll Throttling)
 */
function scrollingTrigger() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(function () {
    setActiveLink();
    ticking = false;
  });
}
// ═══════════════════════════════════════════════════════════════
// 3. Mobile Navbar Toggler
// ═══════════════════════════════════════════════════════════════
/**
 * دالة لفتح/قفل قائمة الـ Mobile:
 * لو القائمة مفتوحة تقفلها، ولو مقفولة تفتحها
 */
function handleNavToggler() {
  closeSettings(); // نقفل الـ Settings Sidebar لو مفتوحة
  if (navLinks.classList.contains("show-nav-links"))
    closeMenu();
  else navLinks.classList.add("show-nav-links");
}
/**
 * دالة لقفل قائمة الـ Mobile
 */
function closeMenu() {
  navLinks.classList.remove("show-nav-links");
}
// لما نضغط على أي link في الـ Mobile menu، نقفل القائمة
navLinks.addEventListener("click", function(e){
  if (e.target.getAttribute("role") !== "menuitem" ) return;
  closeMenu();
});
// ═══════════════════════════════════════════════════════════════
// 4. Dark / Light Mode Switch
// ═══════════════════════════════════════════════════════════════
/**
 * دالة لتبديل الـ Theme بين Dark و Light:
 * - لو html فيها class "dark" → نشيلها (نخلي Light)
 * - لو مفيش → نضيفها (نخلي Dark)
 * بنحفظ الاختيار في localStorage عشان يفضل ثابت بعد refresh
 */
function switchSideTheme() {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("SideTheme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("SideTheme", "dark");
  }
}
/**
 * دالة لتهيئة الـ Theme من localStorage عند تحميل الصفحة:
 * لو مفيش حاجة محفوظة، بنحفظ "dark" كـ default
 * 
 * ⚠️ ملاحظة: الدي دي بتتنده جوه setActiveLink() مع كل scroll
 *    يعني بتتنفذ مئات المرات! الأفضل تتنده مرة واحدة في load
 */
function initializeSideTheme() {
  if (!localStorage.getItem("SideTheme"))
    localStorage.setItem("SideTheme", "dark");
  if (localStorage.getItem("SideTheme") === "light") {
    html.classList.remove("dark");
  } else {
    html.classList.add("dark");
  }
}
// ربط الأحداث (Event Listeners)
themeToggleBtn.addEventListener("click", switchSideTheme);
window.addEventListener("load", setActiveLink);
window.addEventListener("scroll", scrollingTrigger);
navTogglerBtn.addEventListener("click", handleNavToggler);
// ═══════════════════════════════════════════════════════════════
// 5. Scroll to Top Button
// ═══════════════════════════════════════════════════════════════
var scrollToTopBtn = document.getElementById("scroll-to-top");
/**
 * IntersectionObserver عشان نعرف لما نبعد عن أول section:
 * - لو أول section ظاهر → نخفي زر Scroll to Top
 * - لو اختفى → نظهر الزر
 * 
 * rootMargin: "-navHeight 0px 0px 0px" يعني بنعتبر الـ Navbar
 * كأنه جزء من الـ viewport
 */
var scrollToTopObserver = new IntersectionObserver(function (e) {
  handleScrollToTopBtn(e);
}, initializeScrollToTopBtnSettings());
// بنراقب أول section (Home)
scrollToTopObserver.observe(sectionsData[0].element);
function initializeScrollToTopBtnSettings() {
  return { rootMargin: "-" + navHeight + "px 0px 0px 0px" };
}
function handleScrollToTopBtn(e) {
  if (e[0].isIntersecting) {
    scrollToTopBtn.classList.add("opacity-0"); // أول section ظاهر → خفي الزر
  } else {
    scrollToTopBtn.classList.remove("opacity-0"); // أول section اختفى → ظهر الزر
  }
}
/**
 * دالة للـ Scroll إلى أعلى الصفحة بسلاسة
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
// ═══════════════════════════════════════════════════════════════
// 6. Portfolio Filtering (Tabs & Navs بدون Bootstrap)
// ═══════════════════════════════════════════════════════════════
var portfolioFilters = document.getElementById("portfolio-filters"); // الحاوية بتاعة الأزرار
var filterBtns = document.querySelectorAll(".portfolio-filter");      // كل أزرار الفلترة
var items = document.querySelectorAll(".portfolio-item");             // عناصر الـ Portfolio
// الـ CSS classes للـ button النشط
var activeFilterBtnClasses = [
  "active",
  "bg-linear-to-r",
  "from-primary",
  "to-secondary",
  "text-white",
  "shadow-lg",
  "shadow-primary/50",
  "hover:shadow-primary/50",
];
// الـ CSS classes للـ button الغير نشط
var inactiveFilterBtnClasses = [
  "bg-white",
  "dark:bg-slate-800",
  "text-slate-600",
  "dark:text-slate-300",
  "border",
  "border-slate-300",
  "dark:border-slate-700",
  "dark:hover:bg-slate-700",
];
/**
 * دالة لمسح الـ timeouts المعلقة على عنصر:
 * بنستخدمها عشان نمنع conflict بين animations
 */
function clearItemTimeouts(item) {
  clearTimeout(item.hide);
  clearTimeout(item.show);
}
/**
 * دالة لتفعيل زر الفلترة (تغيير الـ styles)
 */
function activateFilterBtn(ele) {
  ele.classList.add(...activeFilterBtnClasses);
  ele.classList.remove(...inactiveFilterBtnClasses);
  ele.setAttribute("aria-pressed", "true"); // Accessibility
}
/**
 * دالة لإلغاء تفعيل زر الفلترة
 */
function disActivateFilterBtn(ele) {
  ele.classList.remove(...activeFilterBtnClasses);
  ele.classList.add(...inactiveFilterBtnClasses);
  ele.setAttribute("aria-pressed", "false");
}
/**
 * دالة لإلغاء تفعيل كل أزرار الفلترة
 */
function disActiveAllFilterBtn() {
  filterBtns.forEach(function (btn) {
    disActivateFilterBtn(btn);
  });
}
/**
 * دالة لإظهار العناصر المطابقة للفلتر
 * بنستخدم setTimeout عشان ندي وقت للـ animation
 */
function showMatchedItems(item) {
  item.classList.remove("myhidden"); // نشيل الـ opacity: 0
  clearItemTimeouts(item);
  item.show = setTimeout(function () {
    item.classList.remove("myd-none"); // نشيل الـ display: none
  }, PORTFOLIO_FILTERS_ANIMATION_DURATION);
}
/**
 * دالة لإخفاء العناصر الغير مطابقة
 */
function hideUnMatchedItems(item) {
  item.classList.add("myhidden"); // نضيف opacity: 0
  clearItemTimeouts(item);
  item.hide = setTimeout(function () {
    item.classList.add("myd-none"); // نضيف display: none بعد الانيميشن
  }, PORTFOLIO_FILTERS_ANIMATION_DURATION);
}
/**
 * دالة معالجة الفلترة:
 * - لو الزر اللي اتضغط عليه هو "all" → نظهر كل العناصر
 * - لو لأ → نخفي العناصر الغير مطابقة ونظهر المطابقة
 */
function handlePortfolioFiltering(e) {
  if (
    e.target.classList.contains("portfolio-filter") &&
    e.target.getAttribute("aria-pressed") !== "true"  // مش عايزين نعمل حاجة لو الزر نشط
  ) {
    var btn = e.target;
    disActiveAllFilterBtn();
    activateFilterBtn(btn);
    
    if (btn.getAttribute("data-filter") !== "all") {
      // فلترة حسب التصنيف
      items.forEach(function (item) {
        if (
          item.getAttribute("data-category") !== btn.getAttribute("data-filter")
        ) {
          hideUnMatchedItems(item);
        } else {
          showMatchedItems(item);
        }
      });
    } else {
      // "all" → نظهر كل العناصر
      items.forEach(function (item) {
        clearItemTimeouts(item);
        item.classList.remove("myd-none");
        item.classList.add("mycollapsed");
        item.show = setTimeout(function () {
          item.classList.remove("mycollapsed");
          item.classList.remove("myhidden");
        }, PORTFOLIO_FILTERS_ANIMATION_DURATION);
      });
    }
  }
}
// ربط الحدث على حاوية الأزرار (Event Delegation)
portfolioFilters.addEventListener("click", function (e) {
  handlePortfolioFiltering(e);
});
// ═══════════════════════════════════════════════════════════════
// 7. Testimonials Carousel
// ═══════════════════════════════════════════════════════════════
var carousel = document.getElementById("testimonials-carousel");       // حاوية الكاروسيل
var testimonialCards = document.querySelectorAll(".testimonial-card"); // كل الكروت
var carouselIndicator = document.getElementById("carouselIndicators"); // حاوية النقاط
var carouselIndicators = document.querySelectorAll(".carousel-indicator"); // النقاط
var nextBtn = document.getElementById("next-testimonial");  // زر التالي
var prevBtn = document.getElementById("prev-testimonial");  // زر السابق
var progress = 0;           // مقدار التحريك بالبكسل
var maxIndicators = carouselIndicators.length - 1; // آخر index للنقطة
var itemWidth;              // عرض كل كارت (بيتغير مع resize)
var currentIndex = 0;       // الـ index الحالي
var maxIndex = testimonialCards.length - initializeVisibleItems(); // آخر index ممكن
/**
 * دالة لتحديث عرض الكارت (بنحسبه من الـ DOM)
 */
function updateItemWidth() {
  itemWidth = testimonialCards[0].offsetWidth;
}
/**
 * دالة لتحديد عدد الكروت الظاهرة حسب عرض الشاشة:
 * - Desktop (≥1024px): 3 كروت
 * - Tablet (≥768px): 2 كروت
 * - Mobile: 1 كارت
 */
function initializeVisibleItems() {
  if (window.innerWidth >= 1024) return 3;
  else if (window.innerWidth >= 768) return 2;
  else return 1;
}
/**
 * دالة لتحديث الكاروسيل عند resize:
 * بنحدث maxIndex و itemWidth ولو currentIndex طلع برة المدي نعدله
 */
function handleCarouselMoveOnResize() {
  maxIndex = testimonialCards.length - initializeVisibleItems();
  updateItemWidth();
  if (currentIndex > maxIndex) currentIndex = maxIndex;
  progress = currentIndex * itemWidth;
  moveCarousel(progress);
}
/**
 * دالة لتحديث النقاط (Indicators):
 * النشطة بتبقى أكبر وبلون مختلف
 */
function updateIndicators() {
  carouselIndicators.forEach(function (item) {
    item.classList.remove("active", "bg-accent", "scale-125");
    item.classList.add("bg-slate-400", "dark:bg-slate-600");
  });
  if (currentIndex > maxIndicators || currentIndex < 0) return;
  carouselIndicators[currentIndex].classList.add(
    "active",
    "bg-accent",
    "scale-125",
  );
  carouselIndicators[currentIndex].classList.remove(
    "bg-slate-400",
    "dark:bg-slate-600",
  );
}
/**
 * دالة لتحريك الكاروسيل بـ translateX
 */
function moveCarousel(progress) {
  carousel.style.transform = `translateX(${progress}px)`;
  updateIndicators();
}
/**
 * دالة التحريك للأمام (Next)
 * لو وصلنا لآخر كارت، نرجع لأول واحد (Infinite Loop)
 */
function moveForward() {
  updateItemWidth();
  currentIndex++;
  if (currentIndex > maxIndex) {
    currentIndex = 0;
  }
  progress = currentIndex * itemWidth;
  moveCarousel(progress);
}
/**
 * دالة التحريك للخلف (Previous)
 */
function moveBack() {
  updateItemWidth();
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = maxIndex;
  }
  progress = currentIndex * itemWidth;
  moveCarousel(progress);
}
/**
 * دالة لما نضغط على نقطة (Indicator)
 */
function handleCarouselIndicator(e) {
  if (!e.target.classList.contains("carousel-indicator")) return;
  else if (currentIndex === +e.target.getAttribute("data-index")) return;
  updateItemWidth();
  currentIndex = +e.target.getAttribute("data-index");
  progress = currentIndex * itemWidth;
  moveCarousel(progress);
}
// ربط الأحداث
window.addEventListener("resize", handleCarouselMoveOnResize);
nextBtn.addEventListener("click", moveForward);
prevBtn.addEventListener("click", moveBack);
carouselIndicator.addEventListener("click", function (e) {
  handleCarouselIndicator(e);
});
// ═══════════════════════════════════════════════════════════════
// 8. Contact Form Validation
// ═══════════════════════════════════════════════════════════════
// Regex للتحقق من صحة الإيميل
var EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
var contactForm = document.querySelector("form");
// Object يجمع كل عناصر الفورم
var form = {
  fullName: document.getElementById("full-name"),
  email: document.getElementById("email"),
  projectDetails: document.getElementById("project-details"),
  errormsgs: document.querySelectorAll(".error-msg"),      // كل رسائل الخطأ
  msg: {
    fullName: document.getElementById("fullNameErrorMsg"),
    email: document.getElementById("emailErrorMsg"),
    projectDetails: document.getElementById("projectDetailsErrorMsg"),
  },
  inputs: document.querySelectorAll("form input"),
  textarea: document.querySelector("form textarea"),
  selectWrappers: document.querySelectorAll("form .custom-select-wrapper"),
  sendBtn : document.getElementById("sendBtn"),
};
// Custom Select (Dropdown مخصص)
var activeCustomSelect, icon;
/**
 * ⚠️ ملاحظة: الـ Array دي بتتكبر مع كل استخدام!
 * مش بتتفضى (clear) فهتجمع قيم كتير مع الوقت
 * ده ممكن يسبب memory leak بسيط
 */
var customSelectDefaultValueData = [];
/**
 * دالة لقفل الـ Custom Select المفتوح
 */
function hideCustomOptions() {
  activeCustomSelect?.classList.add("hidden");
  if (icon) {
    icon.style.transform = "rotate(0deg)"; // نرجع السهم لتحت
  }
}
/**
 * دالة معالجة الـ Custom Select:
 * - لو ضغطنا على الـ select itself → نفتح/نقفل
 * - لو ضغطنا على option → نحدد القيمة
 */
function handleCustomSelect(e, selectWrapper) {
  e.stopPropagation();
  if (e.target.closest(".custom-select")) {
    var select = e.target.closest(".custom-select");
    // نلاقي أيقونة السهم
    for (var i = 0; i < select.children.length; i++) {
      if (select.children[i].classList.contains("fa-chevron-down")) {
        icon = select.children[i];
        break;
      }
    }
    // نفتح/نقفل القائمة
    if (selectWrapper.children[1].classList.contains("custom-options")) {
      if (selectWrapper.children[1].classList.contains("hidden")) {
        hideCustomOptions(); // نقفل أي قائمة مفتوحة
        activeCustomSelect = selectWrapper.children[1];
        selectWrapper.children[1].classList.remove("hidden");
        icon.style.transform = "rotate(180deg)"; // السهم لفوق
      } else {
        selectWrapper.children[1].classList.add("hidden");
        icon.style.transform = "rotate(0deg)";
      }
    } else {
      // Fallback لو الـ children مش في الـ index المتوقع
      for (var i = 0; i < selectWrapper.children.length; i++) {
        if (selectWrapper.children[i].classList.contains("custom-options")) {
          if (selectWrapper.children[i].classList.contains("hidden")) {
            activeCustomSelect = selectWrapper.children[i];
            selectWrapper.children[i].classList.remove("hidden");
            icon.style.transform = "rotate(180deg)";
          } else {
            selectWrapper.children[i].classList.add("hidden");
            icon.style.transform = "rotate(0deg)";
          }
        }
      }
    }
  } else if (e.target.classList.contains("custom-option")) {
    // اختيار option
    customSelectDefaultValueData.push({
      defaultValue: selectWrapper.children[0].children[0].innerText,
      element: selectWrapper.children[0].children[0],
    });
    selectWrapper.children[0].children[0].innerText = e.target.innerText;
    icon.style.transform = "rotate(0deg)";
    hideCustomOptions();
  }
}
/**
 * دالة لإنشاء رسالة النجاح (Popup)
 */
function createSuccessMsg() {
  var divMsg = document.createElement("div");
  divMsg.className =
    "fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm";
  divMsg.innerHTML = `
      <div class="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700 shadow-2xl transform animate-fade-in">
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fa-solid fa-check text-4xl text-white"></i>
        </div>
        <h3 class="text-2xl font-bold mb-3">تم إرسال رسالتك بنجاح!</h3>
        <p class="text-slate-400 mb-6">شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.</p>
        <button class="success-popup-close bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
          حسناً
        </button>
      </div>
    `;
  document.body.appendChild(divMsg);
  divMsg
    .querySelector(".success-popup-close")
    .addEventListener("click", function () {
      clearAllErrorMsg();
      divMsg.remove();
    });
  // تلقائي يختفي بعد 3 ثواني
  setTimeout(() => {
    divMsg.remove();
  }, 3000);
}
/**
 * دالة لمسح كل رسائل الخطأ
 */
function clearAllErrorMsg() {
  form.errormsgs.forEach(function (ele) {
    if (!ele.classList.contains("myd-none")) {
      ele.classList.add("myd-none");
    }
  });
}
/**
 * دالة لمسح الفورم
 */
function clearForm() {
  clearAllErrorMsg();
  form.inputs.forEach(function (ele) {
    ele.value = "";
  });
  customSelectDefaultValueData.forEach(function (obj) {
    obj.element.innerText = obj.defaultValue;
  });
  form.textarea.value = "";
}
// دوال التحقق من صحة البيانات (Validation)
function validateName() {
  if (form.fullName.value.trim() === "") {
    form.msg.fullName.classList.remove("myd-none");
    form.msg.fullName.innerText = "يرجى إدخال الاسم الكامل";
    return false;
  } else {
    form.msg.fullName.classList.add("myd-none");
    return true;
  }
}
function validateEmail() {
  if (form.email.value.trim() === "") {
    form.msg.email.classList.remove("myd-none");
    form.msg.email.innerText = "يرجى إدخال البريد الإلكتروني";
    return false;
  } else if (!EMAIL_REGEX.test(form.email.value.trim())) {
    form.msg.email.classList.remove("myd-none");
    form.msg.email.innerText = "يرجى إدخال بريد الكتروني صالح";
    return false;
  } else {
    form.msg.email.classList.add("myd-none");
    return true;
  }
}
function validateDetails() {
  if (form.projectDetails.value.trim() === "") {
    form.msg.projectDetails.innerText = "يرجى إدخال تفاصيل المشروع";
    form.msg.projectDetails.classList.remove("myd-none");
    return false;
  } else if (form.projectDetails.value.trim().length < 10) {
    form.msg.projectDetails.innerText = "يرجى إدخال المزيد من التفاصيل";
    form.msg.projectDetails.classList.remove("myd-none");
    return false;
  } else {
    form.msg.projectDetails.classList.add("myd-none");
    return true;
  }
}
/**
 * دالة الإرسال:
 * لو كل التحققات نجحت → نعمل clear ونظهر رسالة النجاح
 */
function send() {
  var name = validateName();
  var email = validateEmail();
  var details = validateDetails();
  if (name && email && details) {
    clearForm();
    createSuccessMsg();
  }
}
// ربط أحداث الفورم
form.sendBtn.addEventListener("click", send);
form.selectWrappers.forEach(function (selectWrapper) {
  selectWrapper.addEventListener("click", function (e) {
    handleCustomSelect(e, selectWrapper);
  });
});
document.addEventListener("click", hideCustomOptions); // نفل أي select مفتوح لما نضغط برة
contactForm.addEventListener("submit", function (e) {
  e.preventDefault(); // نمنع الـ Submit العادي
});
form.fullName.addEventListener("blur", validateName);  // validate لما نخرج من الحقل
form.email.addEventListener("blur", validateEmail);
form.projectDetails.addEventListener("blur", validateDetails);
// ═══════════════════════════════════════════════════════════════
// 9. Settings Sidebar (Theme Colors & Fonts Customization)
// ═══════════════════════════════════════════════════════════════
var THEME_KEY_NAME = "theme";
var FONT_KEY_NAME = "font";
var root = document.querySelector(":root");  // عشان نغير CSS variables
var body = document.querySelector("body");
var settingsToggleBtn = document.getElementById("settings-toggle");  // زر الـ Gear
var closeSettingsBtn = document.getElementById("close-settings");    // زر الإغلاق
var settingsSidebar = document.getElementById("settings-sidebar");   // الـ Sidebar نفسه
// CSS Classes للـ Font Option النشط
var activeFontOptionClasses = [
  "active",
  "border-primary",
  "bg-slate-50",
  "dark:bg-slate-800",
];
var inActiveFontOptionClasses = ["border-slate-200", "dark:border-slate-700"];
// CSS Classes للـ Theme المختار (ring effect)
var activeThemeClasses = [
  "ring-2",
  "ring-primary",
  "ring-offset-2",
  "ring-offset-white",
  "dark:ring-offset-slate-900",
];
// قائمة الألوان المتاحة (HTML strings للأزرار)
var themes = [
  `<button class="theme-btn w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-900" title="Purple Blue" data-primary="#6366f1" data-secondary="#8b5cf6" style="background: linear-gradient(135deg, rgb(99, 102, 241), rgb(139, 92, 246));"></button>`,
  `<button class="theme-btn w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Pink Orange" data-primary="#ec4899" data-secondary="#f97316" style="background: linear-gradient(135deg, rgb(236, 72, 153), rgb(249, 115, 22));"></button>`,
  `<button class="theme-btn w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Green Emerald" data-primary="#10b981" data-secondary="#059669" style="background: linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105));"></button>`,
  `<button class="theme-btn w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Blue Cyan" data-primary="#3b82f6" data-secondary="#06b6d4" style="background: linear-gradient(135deg, rgb(59, 130, 246), rgb(6, 182, 212));"></button>`,
  `<button class="theme-btn w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Red Rose" data-primary="#ef4444" data-secondary="#f43f5e" style="background: linear-gradient(135deg, rgb(239, 68, 68), rgb(244, 63, 94));"></button>`,
  `<button class="theme-btn w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Amber Orange" data-primary="#f59e0b" data-secondary="#ea580c" style="background: linear-gradient(135deg, rgb(245, 158, 11), rgb(234, 88, 12));"></button>`,
];
var fontOptionsWrapper = document.getElementById("fontOptions");
var allFontOptions = document.querySelectorAll(".font-option");
var resetSettingsBtn = document.getElementById("reset-settings");
var themeColorsGrid = document.getElementById("theme-colors-grid");
// القيم الافتراضية
var defaultTheme = {
  title: "Purple Blue",
  primary: "#6366f1",
  secondary: "#8b5cf6",
};
var defaultFont = "tajawal";
var themeBtns; // هنملاها بعد ما نحط الـ HTML في الـ DOM
/**
 * دالة لفتح الـ Settings Sidebar:
 * بنحرك زر الـ Gear مع الـ Sidebar
 */
function openSetting() {
  if (settingsSidebar.classList.contains("translate-x-full")) {
    var settingsSidebarWidth = settingsSidebar.clientWidth;
    settingsToggleBtn.style = `transform: translate(-${settingsSidebarWidth}px,-50%)`;
    settingsSidebar.classList.remove("translate-x-full");
    settingsSidebar.setAttribute("aria-hidden", "false");
  }
}
/**
 * دالة لقفل الـ Settings Sidebar
 */
function closeSettings() {
  settingsToggleBtn.style = `transform: translateY(-50%)`;
  settingsSidebar.classList.add("translate-x-full");
  if (settingsSidebar.contains(document.activeElement)) {
    document.activeElement.blur(); // نشيل الـ focus
  }
  settingsSidebar.setAttribute("aria-hidden", "true");
}
/**
 * دالة لتفعيل Font معين
 */
function fontActivation(e) {
  var fontOptionBtn = e.target.closest(".font-option");
  if (!fontOptionBtn) return;           // مش font-option
  if (fontOptionBtn.classList.contains("active")) return; // نشط أصلاً
  disActivateAllFontOptions();
  fontOptionBtn.classList.remove(...inActiveFontOptionClasses);
  fontOptionBtn.classList.add(...activeFontOptionClasses);
  activateFont(fontOptionBtn.getAttribute("data-font"));
}
function disActivateAllFontOptions() {
  allFontOptions.forEach(function (ele) {
    ele.classList.remove(...activeFontOptionClasses);
    ele.classList.add(...inActiveFontOptionClasses);
  });
}
/**
 * دالة لتطبيق الخط على الـ body
 */
function applyFont(fontName) {
  var arr = body.className.split(" ");
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].includes("font-")) {
      body.classList.replace(arr[i], `font-${fontName}`);
      break;
    }
  }
}
/**
 * دالة للاقي الخط المخزن ونفعله
 */
function findAndUpdateAndActiveCurrentFont(fontName) {
  for (var i = 0; i < allFontOptions.length; i++) {
    if (allFontOptions[i].getAttribute("data-font") === fontName) {
      allFontOptions[i].classList.remove(...inActiveFontOptionClasses);
      allFontOptions[i].classList.add(...activeFontOptionClasses);
      applyFont(fontName);
      return;
    }
  }
}
/**
 * دالة لتهيئة الخط من localStorage
 */
function initializeFont() {
  var activeFont = localStorage.getItem(FONT_KEY_NAME);
  if (activeFont) {
    findAndUpdateAndActiveCurrentFont(activeFont);
  } else {
    findAndUpdateAndActiveCurrentFont(defaultFont);
  }
}
function activateFont(newFont) {
  if (localStorage.getItem(FONT_KEY_NAME) !== newFont) {
    localStorage.setItem(FONT_KEY_NAME, newFont);
  }
  applyFont(newFont);
}
/**
 * دالة معالجة اختيار Theme
 */
function handleTheme(e) {
  var ThemeBtn = e.target.closest(".theme-btn");
  if (!ThemeBtn) return;
  if (ThemeBtn.classList.contains("ring-2")) return; // نشط أصلاً
  disActivateAllThemeOptions();
  ThemeBtn.classList.add(...activeThemeClasses);
  var themeData = {
    title: ThemeBtn.getAttribute("title"),
    primary: ThemeBtn.getAttribute("data-primary"),
    secondary: ThemeBtn.getAttribute("data-secondary"),
  };
  updateThemeInLocalStorage(themeData);
  applyTheme(themeData);
}
function disActivateAllThemeOptions() {
  themeBtns.forEach(function (ele) {
    ele.classList.remove(...activeThemeClasses);
  });
}
function findAndUpdateAndActiveCurrentTheme(currentTheme) {
  disActivateAllThemeOptions();
  for (var i = 0; i < themeBtns.length; i++) {
    if (themeBtns[i].getAttribute("title") === currentTheme.title) {
      themeBtns[i].classList.add(...activeThemeClasses);
      updateThemeInLocalStorage(currentTheme);
      applyTheme(currentTheme);
      return;
    }
  }
}
/**
 * دالة لتهيئة الـ Theme من localStorage
 */
function initializeTheme() {
  var activeTheme = JSON.parse(localStorage.getItem(THEME_KEY_NAME));
  if (activeTheme) {
    findAndUpdateAndActiveCurrentTheme(activeTheme);
  } else {
    findAndUpdateAndActiveCurrentTheme(defaultTheme);
  }
}
function updateThemeInLocalStorage({ title, primary, secondary }) {
  var isThemeSet = JSON.parse(localStorage.getItem(THEME_KEY_NAME));
  if (isThemeSet?.title !== title && title !== defaultTheme.title) {
    localStorage.setItem(
      THEME_KEY_NAME,
      JSON.stringify({
        title: title,
        primary: primary,
        secondary: secondary,
      }),
    );
  }
}
/**
 * دالة لتطبيق الـ Theme على الـ CSS Variables
 */
function applyTheme({ primary, secondary }) {
  root.style.setProperty("--color-primary", primary);
  root.style.setProperty("--color-secondary", secondary);
}
/**
 * دالة إعادة الضبط (Reset):
 * ترجع كل حاجة للـ default وتمسح localStorage
 */
function resetOptions() {
  localStorage.removeItem(THEME_KEY_NAME);
  localStorage.removeItem(FONT_KEY_NAME);
  disActivateAllFontOptions();
  initializeFont();
  disActivateAllThemeOptions();
  initializeTheme();
}
/**
 * دالة تحميل الإعدادات عند فتح الصفحة:
 * بنحط الـ themes HTML في الـ DOM ونشتغل
 */
function loadSettings() {
  themeColorsGrid.innerHTML = themes.join("");
  themeBtns = document.querySelectorAll(".theme-btn");
  initializeFont();
  initializeTheme();
}
// ربط الأحداث
settingsToggleBtn.addEventListener("click", openSetting);
closeSettingsBtn.addEventListener("click", closeSettings);
fontOptionsWrapper.addEventListener("click", function (e) {
  fontActivation(e);
});
themeColorsGrid.addEventListener("click", function (e) {
  handleTheme(e);
});
resetSettingsBtn.addEventListener("click", resetOptions);
// بنشغل لما الـ DOM يخلص تحميل
window.addEventListener("DOMContentLoaded", loadSettings);
// لو ضغطنا برة الـ Sidebar والـ Gear → نقفل الـ Sidebar
document.addEventListener("click", function (e) {
  if (e.target.closest("#settings-toggle")) return;
  if (e.target.closest("#settings-sidebar")) return;
  closeSettings();
});
/* ============================================================
   نهاية الملف
   ============================================================ */