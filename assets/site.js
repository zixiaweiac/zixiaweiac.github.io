(() => {
  'use strict';
  const list = document.querySelector('#publication-list');
  if (!list) return;
  const toolbar = document.querySelector('.publication-tools');
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const papers = Array.from(list.querySelectorAll('.publication'));
  const count = document.querySelector('.publication-count');
  const empty = document.querySelector('.empty-state');
  if (!toolbar || !buttons.length || !count || !empty) return;
  function filterPapers(topic) {
    let visible = 0;
    for (const paper of papers) {
      const matches = topic === 'all' || paper.dataset.topics.split(/\s+/).includes(topic);
      paper.hidden = !matches;
      if (matches) visible++;
    }
    for (const button of buttons) {
      const active = button.dataset.filter === topic;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-active', active);
    }
    count.textContent = topic === 'all' ? `${visible} papers` : `${visible} of ${papers.length} papers`;
    empty.hidden = visible > 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => filterPapers(button.dataset.filter)));
  filterPapers('all');
  toolbar.hidden = false;
})();

