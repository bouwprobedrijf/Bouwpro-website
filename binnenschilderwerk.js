const paintCalculator = document.getElementById("paintCalculator");

const ceilingChoice = document.getElementById("ceilingArea");
const ceilingGroup = document.getElementById("ceilingAreaGroup");
const ceilingInput = document.getElementById("ceilingM2");
const wallCondition = document.getElementById("wallCondition");
const wallRepairGroup = document.getElementById("wallRepairGroup");
const wallRepairInput = document.getElementById("wallRepair");

function toggleWallRepair() {
    const showRepair = wallCondition.value === "extra";

    wallRepairGroup.style.display = showRepair ? "block" : "none";

    if (!showRepair) {
        wallRepairInput.value = "none";
    }
}

wallCondition.addEventListener("change", toggleWallRepair);

toggleWallRepair();

function toggleCeilingField() {
    const needsCeiling = ceilingChoice.value === "yes";

    ceilingGroup.style.display = needsCeiling ? "block" : "none";
    ceilingInput.required = needsCeiling;

    if (!needsCeiling) {
        ceilingInput.value = "";
    }
}

ceilingChoice.addEventListener("change", toggleCeilingField);

toggleCeilingField();

window.addEventListener("pageshow", function () {
    toggleCeilingField();
});


paintCalculator.addEventListener("submit", function (event) {
    event.preventDefault();

    const baseRate = 14;
    const extraPreparationRate = 6;
    const majorRepairRate = 6;

    const wallArea = Number(
        document.getElementById("wallArea").value
    );

    const ceilingArea =
        ceilingChoice.value === "yes"
            ? Number(ceilingInput.value)
            : 0;

    const wallCondition =
        document.getElementById("wallCondition").value;

    const wallRepair =
        document.getElementById("wallRepair").value;

        let total = wallArea * baseRate;

    if (wallArea <= 0) {
        alert("Vul een geldige muuroppervlakte in.");
        return;
    }

    if (ceilingChoice.value === "yes" && ceilingArea <= 0) {
        alert("Vul de oppervlakte van het plafond in.");
        return;
    }



    if (
        wallCondition === "large" ||
        wallRepair === "large" ||
        wallRepair === "both"
    ) {
        total += wallArea * majorRepairRate;
    }

    if (wallRepair === "filler" || wallRepair === "both") {
        total += wallArea * extraPreparationRate;
    }

    total += ceilingArea * baseRate;

    const formattedTotal = new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR"
    }).format(total);
    
const wallRepairLabels = {
    none: "Geen extra werkzaamheden",
    filler: "Muren volledig plamuren",
    large: "Grote beschadigingen herstellen",
    both: "Plamuren en grote beschadigingen herstellen"
};

const wallConditionLabels = {
    good: "Goed – kleine gaatjes en normaal schuurwerk",
    extra: "Extra voorbereiding nodig",
    large: "Grote beschadigingen of veel herstelwerk"
};

const wallRepairLabel =
    wallRepairLabels[wallRepair] || wallRepair;

const wallConditionLabel =
    wallConditionLabels[wallCondition] || wallCondition;

const ceilingLabel =
    ceilingChoice.value === "yes" ? "Ja" : "Nee";

const message = [
    "Hallo BouwPro Bedrijf,",
    "",
    "Ik wil graag een offerte aanvragen voor binnenschilderwerk.",
    "",
    "- Muuroppervlakte: " + wallArea + " m²",
    "- Plafond schilderen: " + ceilingLabel,
    "- Plafondoppervlakte: " + ceilingArea + " m²",
    "- Staat van de muren: " + wallConditionLabel,
    "- Extra werkzaamheden: " + wallRepairLabel,
    "- Berekende prijsindicatie: " + formattedTotal,
    "",
    "Kunt u mijn aanvraag beoordelen en mij een offerte sturen?",
    "",
    "Met vriendelijke groet"
].join("\n");

const whatsappLink =
    "https://wa.me/31613704182?text=" +
    encodeURIComponent(message);


    document.getElementById("priceResult").innerHTML = `
        <div class="result-card">
            <h2>Uw prijsindicatie</h2>
            <p class="result-total">${formattedTotal}</p>
            <p>Dit is een vrijblijvende prijsindicatie.</p>
            <p>De definitieve prijs wordt bepaald na beoordeling van de werkzaamheden.</p>
            <a class="calculate-button whatsapp-button"
   href="${whatsappLink}"
   target="_blank"
   rel="noopener noreferrer">
    Vraag een offerte aan via WhatsApp
</a>
        </div>
    `;
    document.getElementById("priceResult").scrollIntoView({
    behavior: "smooth",
    block: "start"
});
});