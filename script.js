// Cronômetro Digital
function startCountdown() {
  const targetDate = new Date("June 10, 2026 00:00:00").getTime();
  const countdown = document.getElementById("countdown");

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      countdown.innerHTML = "🎉 Pré-venda iniciada!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Atualizar imediatamente
  updateCountdown();

  // Atualizar a cada segundo
  setInterval(updateCountdown, 1000);
}

// Carregar NFTs da OpenSea
async function loadNFTs() {
  const contractAddress = "0x08D1dADc37836b53cca8C2B199Ae517a139A771c";
  const gallery = document.getElementById("nft-gallery");

  try {
    // URL da API da OpenSea
    const apiUrl = `https://api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}&limit=8`;

    const response = await fetch(apiUrl, {
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();

    // Verificar se há assets
    if (!data.assets || data.assets.length === 0) {
      gallery.innerHTML = '<p style="color: #ffcc00;">Nenhum NFT encontrado no momento.</p>';
      return;
    }

    // Renderizar cada NFT
    data.assets.forEach(nft => {
      const imageUrl = nft.image_url || nft.image_original_url || "https://via.placeholder.com/220?text=NFT";
      const name = nft.name || "NFT Sem Nome";
      const description = nft.description || "NFT da coleção World Cup Collection";

      const card = document.createElement("div");
      card.className = "nft-card";
      card.innerHTML = `
        <img src="${imageUrl}" alt="${name}" onerror="this.src='https://via.placeholder.com/220?text=NFT'" />
        <h3>${name}</h3>
        <p style="font-size:0.9em;">${description.substring(0, 80)}${description.length > 80 ? '...' : ''}</p>
      `;

      gallery.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar NFTs:", error);
    gallery.innerHTML = `
      <div style="color: #ffcc00; padding: 20px;">
        <p>⚠️ Não foi possível carregar os NFTs da OpenSea</p>
        <p style="font-size: 0.9em; color: #aaa;">Verifique sua conexão ou tente novamente mais tarde.</p>
      </div>
    `;
  }
}

// Interação de clique nos botões
function setupButtonInteractions() {
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1.05)';
      }, 150);
    });
  });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function() {
  startCountdown();
  loadNFTs();
  setupButtonInteractions();
});
