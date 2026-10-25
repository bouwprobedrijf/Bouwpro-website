document.addEventListener("DOMContentLoaded", function () {
    const calculator = document.getElementById("stukadoorCalculator");
    const result = document.getElementById("stukadoorResult");

    if (!calculator || !result) {
        console.error("De calculator of het resultaatveld is niet gevonden.");
        return;
    }

    calculator.addEventListener("submit", function (event) {
        event.preventDefault();

        const binnen = Number(document.getElementById("binnen").value) || 0;
        const buiten = Number(document.getElementById("buiten").value) || 0;

        const prijsBinnen = binnen * 17;
        const prijsBuiten = buiten * 20;
        const totaal = prijsBinnen + prijsBuiten;

        const euro = new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2
        });

       const bericht = `Hallo BouwPro Bedrijf,

Ik wil graag een offerte aanvragen voor stukadoorwerk.

Stucwerk binnenmuren: ${binnen} m² = ${euro.format(prijsBinnen)}
Buitenstucwerk: ${buiten} m² = ${euro.format(prijsBuiten)}

Totaalindicatie: ${euro.format(totaal)} exclusief btw.
Materialen zijn inbegrepen.

Graag ontvang ik een definitieve offerte.`;

        const whatsappLink =
            "https://wa.me/31613704182?text=" +
            encodeURIComponent(bericht);

        result.innerHTML = `
            <h2>Uw prijsindicatie</h2>
            <p><strong>${euro.format(totaal)} excl. btw</strong></p>
            <p>Inclusief materialen.</p>
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn">
                Vraag een offerte aan via WhatsApp
            </a>
        `;

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});
