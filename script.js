/* =========================================
   BHUTAN HERITAGE MUSEUM
   JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle("open");

            if (
                navMenu.classList.contains("open")
            ) {

                menuToggle.textContent = "✕";

            } else {

                menuToggle.textContent = "☰";

            }

        }
    );


    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navMenu.classList.remove("open");

                menuToggle.textContent = "☰";

            }
        );

    });

}


/* =========================================
   DARK MODE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");


function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }


    if (
        document.body.classList.contains("dark")
    ) {

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    }

}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("museumTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

}


updateThemeIcon();


/* Toggle theme */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle("dark");


            const darkMode =
                document.body.classList.contains("dark");


            if (darkMode) {

                localStorage.setItem(
                    "museumTheme",
                    "dark"
                );

            } else {

                localStorage.setItem(
                    "museumTheme",
                    "light"
                );

            }


            updateThemeIcon();

        }
    );

}


/* =========================================
   COLLECTION FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(".filter");


const collectionCards =
    document.querySelectorAll(
        ".collection-card"
    );


filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            /* Remove active */

            filterButtons.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            /* Add active */

            button.classList.add("active");


            const selectedCategory =
                button.getAttribute(
                    "data-filter"
                );


            /* Filter cards */

            collectionCards.forEach(
                function (card) {

                    const cardCategory =
                        card.getAttribute(
                            "data-category"
                        );


                    if (
                        selectedCategory === "all" ||
                        selectedCategory === cardCategory
                    ) {

                        card.style.display =
                            "block";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

});


/* =========================================
   COLLECTION POPUP
========================================= */

const modal =
    document.getElementById("modal");


const modalTitle =
    document.getElementById("modalTitle");


const modalInfo =
    document.getElementById("modalInfo");


const modalClose =
    document.getElementById("modalClose");


const learnButtons =
    document.querySelectorAll(".learn-btn");


learnButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const title =
                button.getAttribute(
                    "data-title"
                );


            const info =
                button.getAttribute(
                    "data-info"
                );


            modalTitle.textContent =
                title;


            modalInfo.textContent =
                info;


            modal.classList.add("show");

        }
    );

});


/* Close modal */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        function () {

            modal.classList.remove("show");

        }
    );

}


/* Close by clicking outside */

if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                modal.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* Close with Escape */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   VISITOR PLANNER
========================================= */

const visitForm =
    document.getElementById("visitForm");


if (visitForm) {

    visitForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const visitors =
                document.getElementById(
                    "visitors"
                ).value;


            const visitType =
                document.getElementById(
                    "visitType"
                ).value;


            const interest =
                document.getElementById(
                    "interest"
                ).value;


            const result =
                document.getElementById(
                    "planResult"
                );


            const tourNames = {

                general: "General Tour",

                family: "Family Tour",

                student: "Student Tour"

            };


            const interestNames = {

                all: "all major museum collections",

                art: "traditional Bhutanese art",

                history: "Bhutanese history",

                culture:
                    "culture, festivals and traditions",

                royal:
                    "royal heritage"

            };


            let duration;


            if (interest === "all") {

                duration =
                    "approximately 2 hours";

            } else {

                duration =
                    "approximately 90 minutes";

            }


            result.innerHTML = `

                <strong>
                    ✨ Your Museum Route
                </strong>

                <br><br>

                👥 Visitors:
                ${visitors}

                <br>

                🎟️ Tour:
                ${tourNames[visitType]}

                <br>

                🏛️ Focus:
                ${interestNames[interest]}

                <br>

                ⏱️ Suggested time:
                ${duration}

            `;


            result.style.display = "block";

        }
    );

}


/* =========================================
   BACK TO TOP
========================================= */

const topButton =
    document.getElementById("topBtn");


window.addEventListener(
    "scroll",
    function () {

        if (!topButton) {
            return;
        }


        if (window.scrollY > 400) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    }
);


if (topButton) {

    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}