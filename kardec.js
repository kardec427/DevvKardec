        // Efeito de rolagem suave para os links de navegação
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                //Ele vai rolar suavemente para a seção correspondente
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Efeito de fade-in nas seções ao rolar
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => {
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        //sistema de curtidas e descurtidas nos cards de projeto
        // Adiciona eventos de clique para os botões de curtidas e descurtidas

document.querySelectorAll('.project-card').forEach((card, index) => {
  const likeBtn = card.querySelector('.like-btn');
  const dislikeBtn = card.querySelector('.dislike-btn');
  const likeCount = card.querySelector('.like-count');
  const dislikeCount = card.querySelector('.dislike-count');

  // Chaves únicas para cada projeto no localStorage
  const likeKey = `project${index}-like`;
  const dislikeKey = `project${index}-dislike`;

  // Carrega estado salvo
  const savedLike = localStorage.getItem(likeKey) === 'true';
  const savedDislike = localStorage.getItem(dislikeKey) === 'true';
  let likeTotal = parseInt(localStorage.getItem(`${likeKey}-count`) || '0');
  let dislikeTotal = parseInt(localStorage.getItem(`${dislikeKey}-count`) || '0');

  likeCount.textContent = likeTotal;
  dislikeCount.textContent = dislikeTotal;

  if (savedLike) likeBtn.classList.add('liked');
  if (savedDislike) dislikeBtn.classList.add('disliked');

  likeBtn.addEventListener('click', () => {
    const isLiked = likeBtn.classList.contains('liked');
    const isDisliked = dislikeBtn.classList.contains('disliked');

    if (isLiked) {
      likeTotal--;
      likeBtn.classList.remove('liked');
      localStorage.setItem(likeKey, false);
    } else {
      likeTotal++;
      likeBtn.classList.add('liked');
      localStorage.setItem(likeKey, true);
      if (isDisliked) {
        dislikeTotal--;
        dislikeBtn.classList.remove('disliked');
        localStorage.setItem(dislikeKey, false);
      }
    }

    likeCount.textContent = likeTotal;
    dislikeCount.textContent = dislikeTotal;

    localStorage.setItem(`${likeKey}-count`, likeTotal);
    localStorage.setItem(`${dislikeKey}-count`, dislikeTotal);
  });

  dislikeBtn.addEventListener('click', () => {
    const isDisliked = dislikeBtn.classList.contains('disliked');
    const isLiked = likeBtn.classList.contains('liked');

    if (isDisliked) {
      dislikeTotal--;
      dislikeBtn.classList.remove('disliked');
      localStorage.setItem(dislikeKey, false);
    } else {
      dislikeTotal++;
      dislikeBtn.classList.add('disliked');
      localStorage.setItem(dislikeKey, true);
      if (isLiked) {
        likeTotal--;
        likeBtn.classList.remove('liked');
        localStorage.setItem(likeKey, false);
      }
    }

    likeCount.textContent = likeTotal;
    dislikeCount.textContent = dislikeTotal;

    localStorage.setItem(`${likeKey}-count`, likeTotal);
    localStorage.setItem(`${dislikeKey}-count`, dislikeTotal);
  });
});

        // Efeito de hover nos cards de projeto