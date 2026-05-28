// ==================== COUNTDOWN TIMER ====================
function startCountdown() {
  const targetDate = new Date("June 10, 2026 00:00:00").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
      document.getElementById("countdown").innerHTML = '<h2 style="color: #ffcc00; text-shadow: 0 0 10px #ffcc00;">🎉 Pré-venda Ativa!</h2>';
    }
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ==================== LOAD NFTs FROM OPENSEA ====================
async function loadNFTs() {
  const contractAddress = "0x08D1dADc37836b53cca8C2B199Ae517a139A771c";
  const gallery = document.getElementById("nft-gallery");

  try {
    const apiUrl = `https://api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}&limit=12`;

    const response = await fetch(apiUrl, {
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.assets || data.assets.length === 0) {
      gallery.innerHTML = '<p style="color: #ffcc00; text-align: center; grid-column: 1/-1;">Nenhum NFT encontrado no momento.</p>';
      return;
    }

    gallery.innerHTML = '';

    data.assets.forEach((nft, index) => {
      const imageUrl = nft.image_url || nft.image_original_url || "https://via.placeholder.com/250?text=NFT";
      const name = nft.name || `NFT #${nft.token_id}`;
      const collection = nft.collection?.name || "Coleção";

      const card = document.createElement("div");
      card.className = "nft-card";
      card.innerHTML = `
        <img src="${imageUrl}" alt="${name}" onerror="this.src='https://via.placeholder.com/250?text=NFT+Error'" />
        <div class="nft-card-content">
          <h3>${name}</h3>
          <p>${collection}</p>
        </div>
      `;

      gallery.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar NFTs:", error);
    gallery.innerHTML = `
      <div style="color: #ffcc00; text-align: center; grid-column: 1/-1; padding: 50px;">
        <p style="font-size: 1.2em;">⚠️ Não foi possível carregar os NFTs</p>
        <p style="font-size: 0.9em; color: #aaa;">Tente novamente mais tarde</p>
      </div>
    `;
  }
}

// ==================== SIMULATOR ====================
function updateTotal() {
  const count = parseInt(document.getElementById("nft-count").value) || 1;
  const type = document.getElementById("nft-type").value;

  const prices = {
    common: 50,
    rare: 150,
    epic: 500
  };

  const basePrice = prices[type] * count;
  const platformFee = basePrice * 0.05;
  const gasFee = 10;
  const total = basePrice + platformFee + gasFee;

  document.getElementById("base-cost").textContent = `${basePrice.toFixed(2)} USD`;
  document.getElementById("platform-fee").textContent = `${platformFee.toFixed(2)} USD`;
  document.getElementById("gas-fee").textContent = `${gasFee.toFixed(2)} USD`;
  document.getElementById("final-total").textContent = `${total.toFixed(2)} USD`;
  document.getElementById("total-price").textContent = `${total.toFixed(2)} USD`;
}

// ==================== FAQ ACCORDION ====================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Fechar outros items
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
        }
      });

      // Toggle item atual
      item.classList.toggle('active');
    });
  });
}

// ==================== NAVBAR HAMBURGER ====================
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ==================== SCROLL TO TOP ====================
function initScrollTop() {
  const scrollTop = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTop.classList.add('show');
    } else {
      scrollTop.classList.remove('show');
    }
  });

  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==================== PRESALE FORM ====================
function initPresaleForm() {
  const form = document.querySelector('.presale-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      
      if (email) {
        alert(`✅ Email cadastrado: ${email}\nVocê será notificado quando a pré-venda iniciar!`);
        form.reset();
      }
    });
  }
}

// ==================== MINT BUTTONS ====================
function initMintButtons() {
  const mintButtons = document.querySelectorAll('.mint-card button');

  mintButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.mint-card');
      const title = card.querySelector('h3').textContent;
      
      // Animação de click
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 100);

      alert(`🎉 Iniciando abertura de ${title}...\n\nEsta é uma demonstração. Conecte sua carteira para comprar de verdade!`);
    });
  });
}

// ==================== WALLET BUTTONS ====================
function initWalletButtons() {
  const walletButtons = document.querySelectorAll('.wallet-btn');

  walletButtons.forEach(button => {
    button.addEventListener('click', () => {
      const wallet = button.textContent.trim();
      alert(`🔗 Tentando conectar ${wallet}...\n\nEsta é uma demonstração. Implemente a integração Web3 para conectar de verdade!`);
    });
  });
}

// ==================== SIMULATOR INPUTS ====================
function initSimulator() {
  const nftCount = document.getElementById('nft-count');
  const nftType = document.getElementById('nft-type');

  if (nftCount && nftType) {
    nftCount.addEventListener('change', updateTotal);
    nftCount.addEventListener('input', updateTotal);
    nftType.addEventListener('change', updateTotal);
  }

  // Atualizar total inicial
  updateTotal();
}

// ==================== INIT ALL ====================
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Inicializando World Cup Collection NFT...');

  // Inicializar todas as funcionalidades
  startCountdown();
  loadNFTs();
  initFAQ();
  initNavbar();
  initScrollTop();
  initPresaleForm();
  initMintButtons();
  initWalletButtons();
  initSimulator();

  console.log('✅ World Cup Collection NFT pronto!');
});

// ==================== SMOOTH SCROLL (FALLBACK) ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
