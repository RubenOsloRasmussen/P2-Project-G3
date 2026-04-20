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

loadHTML("strategies_Box_id", "strategytexts.html");
loadHTML("strategies_Side_id", "strategysidebar.html");
