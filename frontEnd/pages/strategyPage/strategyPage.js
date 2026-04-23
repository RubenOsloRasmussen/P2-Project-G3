    async function loadHTML(targetId, url) {
        const response = await fetch(url);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const target = document.getElementById(targetId);

        Array.from(doc.body.childNodes).forEach(node => {
            target.appendChild(node.cloneNode(true));
        });
    }

    loadHTML("strategies-box-id", "strategytexts.html");
    loadHTML("strategies-side-id", "strategysidebar.html");

    function scrollToStrategy(event, id){
        event.preventDefault();

        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }


    /* Open overlay when clicking strategy illustration */
    document.addEventListener("click", function (event){
        const clickedImage = event.target.closest(".StrategyIllustrations img");
        if (!clickedImage) return;

        const overlay = document.getElementById("image-overlay-id");
        const overlayImage = document.getElementById("overlay-image-id");

        overlayImage.src = clickedImage.src;
        overlay.classList.remove("hidden");
    });

    /* Close overlay when clicking background or close button */
    document.getElementById("image-overlay-id").addEventListener("click", function (event){
        const isBackground = event.target.id === "image-overlay-id";
        const isCloseButton = event.target.classList.contains("OverlayCloseButton");

        if (isBackground || isCloseButton){
            this.classList.add("hidden");
            document.getElementById("overlay-image-id").src = "";
        }
    });