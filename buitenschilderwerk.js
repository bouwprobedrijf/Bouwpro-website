
const calculator = document.getElementById("exteriorCalculator");
const priceResult = document.getElementById("priceResult");

calculator.addEventListener("submit", function (event) {
    event.preventDefault();

    // Aantallen ophalen
    const kozijnen = Number(document.getElementById("kozijnen").value) || 0;
    const deuren = Number(document.getElementById("deuren").value) || 0;
    const boeidelen = Number(document.getElementById("boeidelen").value) || 0;
    const buitenmuur = Number(document.getElementById("buitenmuur").value) || 0;
    const houtrot = Number(document.getElementById("houtrot").value) || 0;
    const steiger = document.getElementById("steiger").value;

    // Prijzen exclusief btw
    const prijsKozijnen = kozijnen * 250;
    const prijsDeuren = deuren * 320;
    const prijsBoeidelen = boeidelen * 35;
    const prijsBuitenmuur = buitenmuur * 35;
    const prijsHoutrot = houtrot * 100;

    const totaal =
        prijsKozijnen +
        prijsDeuren +
        prijsBoeidelen +
        prijsBuitenmuur +
        prijsHoutrot;

    // Bedragen opmaken
    const euro = new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 2
    });

    let bericht = `
Prijsindicatie buitenschilderwerk - BouwPro Bedrijf

Kozijnen: ${kozijnen} x €250 = ${euro.format(prijsKozijnen)}
Buitendeuren: ${deuren} x €320 = ${euro.format(prijsDeuren)}
Boeidelen: ${boeidelen} meter x €35 = ${euro.format(prijsBoeidelen)}
Buitenmuur: ${buitenmuur} m² x €35 = ${euro.format(prijsBuitenmuur)}
Kleine houtrotreparaties: ${houtrot} plek(ken), vanaf ${euro.format(prijsHoutrot)}

Totaalindicatie: ${euro.format(totaal)} exclusief btw.
`;

    if (steiger === "ja") {
        bericht += `
Let op: eventuele kosten voor een steiger of hoogwerker zijn niet inbegrepen.
`;
    }

    bericht += `
De prijs is een indicatie. De definitieve prijs wordt bepaald na beoordeling van de werkzaamheden.
`;

    const whatsappLink =
        "https://wa.me/31613704182?text=" +
        encodeURIComponent(bericht);

    priceResult.innerHTML = `
        <h2>Uw prijsindicatie</h2>
        <p><strong>${euro.format(totaal)} excl. btw</strong></p>
        <p>Inclusief verf en materialen. Eventuele steiger- of hoogwerkkosten zijn niet inbegrepen.</p>
        <p>Houtrotreparaties zijn berekend vanaf €100 per plek.</p>
        <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn">
            Vraag een offerte aan via WhatsApp
        </a>
    `;
    priceResult.scrollIntoView({
    behavior: "smooth",
    block: "center"
});

    if (steiger === "ja") {
        priceResult.insertAdjacentHTML(
            "beforeend",
            "<p>Let op: eventuele kosten voor een steiger of hoogwerker worden apart berekend.</p>"
        );
    }
});