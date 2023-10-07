(function () {
  document
    .querySelector('#search-keyword')
    .addEventListener('keyup', function (e) {
      fetch(`https://api.idiots.band/api/search?keyword=${e.target.value}`)
        .then((x) => x.json())
        .then((data) => {
          console.log(JSON.stringify(data, null, 2));
          const htmlString = `${data
            .map(
              (d) =>
                `<div style="display: inline-block; width: 33%"><img src="${d.poster}" style="object-fit: cover; width: 100%;"></div>`
            )
            .join('')}`;
          document.querySelector('#search-result').innerHTML = htmlString;
        });
    });
})();
