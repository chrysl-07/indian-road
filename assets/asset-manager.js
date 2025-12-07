// Dummy sample assets (you can edit)
const assets = [
  {
    id: "road_segment",
    name: "Road Segment",
    description: "Straight road section",
    parameters: {
      lanes: 2,
      speed_limit: 40
    }
  },
  {
    id: "intersection",
    name: "Intersection",
    description: "4-way junction",
    parameters: {
      signal_timing: 30,
      pedestrian_delay: 10
    }
  },
  {
    id: "speed_breaker",
    name: "Speed Breaker",
    description: "Raised bump to control speed",
    parameters: {
      height: 0.15,
      width: 2
    }
  }
];

// DOM references
const assetItemsDiv = document.getElementById("assetItems");
const previewArea = document.getElementById("previewArea");
const parametersPanel = document.getElementById("parametersPanel");
const parametersContent = document.getElementById("parametersContent");

let currentAsset = null;

// Load assets into left side list
function renderAssetList() {
  assetItemsDiv.innerHTML = "";

  assets.forEach((asset) => {
    const div = document.createElement("div");
    div.className = "asset-item";
    div.textContent = asset.name;

    div.onclick = () => selectAsset(asset, div);

    assetItemsDiv.appendChild(div);
  });
}

// Handle asset selection
function selectAsset(asset, element) {
  currentAsset = asset;

  // Highlight selected item
  document.querySelectorAll(".asset-item").forEach((item) => {
    item.classList.remove("active");
  });
  element.classList.add("active");

  // Update preview area
  previewArea.innerHTML = `
    <h3>${asset.name}</h3>
    <p>${asset.description}</p>
  `;

  // Update parameters
  parametersPanel.classList.remove("hidden");
  renderParameters(asset);
}

// Render sliders for parameters
function renderParameters(asset) {
  parametersContent.innerHTML = "";

  Object.entries(asset.parameters).forEach(([key, value]) => {
    const row = document.createElement("div");
    row.className = "param-row";

    row.innerHTML = `
      <div class="param-label">${key.replace(/_/g, " ")}</div>
      <input type="range" min="0" max="100" value="${value * 10}" class="slider" 
        onchange="updateParameter('${asset.id}', '${key}', this.value)">
    `;

    parametersContent.appendChild(row);
  });
}

// Update parameter value
function updateParameter(assetId, key, newVal) {
  const asset = assets.find(a => a.id === assetId);
  asset.parameters[key] = newVal / 10;
}

// Initialize page
renderAssetList();
