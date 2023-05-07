window.addEventListener('DOMContentLoaded', (event) => {
    const imageUpload = document.getElementById('imageUpload');
    const filterOptions = document.getElementsByName('filter');
    const pictureContainer = document.getElementById('pictureContainer');
    const picture = document.getElementById('picture');
    const downloadLink = document.getElementById('downloadLink');
  
    imageUpload.addEventListener('change', function (event) {
      const file = this.files[0];
      const reader = new FileReader();
  
      reader.onload = function (event) {
        picture.src = event.target.result;
        pictureContainer.classList.remove('filter-border', 'filter-shadow', 'filter-grayscale', 'filter-sepia', 'filter-invert');
        downloadLink.style.display = 'none';
      };
  
      reader.readAsDataURL(file);
    });
  
    filterOptions.forEach(function (option) {
      option.addEventListener('change', function () {
        const selectedFilter = this.value;
        picture.classList.remove('filter-border', 'filter-shadow', 'filter-grayscale', 'filter-sepia', 'filter-invert');
        downloadLink.style.display = 'none';
  
        if (selectedFilter === 'border') {
          picture.classList.add('filter-border');
          downloadLink.style.display = 'block';
        } else if (selectedFilter === 'shadow') {
          picture.classList.add('filter-shadow');
          downloadLink.style.display = 'block';
        } else if (selectedFilter === 'grayscale') {
          picture.classList.add('filter-grayscale');
          downloadLink.style.display = 'block';
        } else if (selectedFilter === 'sepia') {
          picture.classList.add('filter-sepia');
          downloadLink.style.display = 'block';
        } else if (selectedFilter === 'invert') {
          picture.classList.add('filter-invert');
          downloadLink.style.display = 'block';
        }
        
        picture.addEventListener('mouseover', function () {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = picture.width;
          canvas.height = picture.height;
          context.filter = getSelectedFilter();
          context.drawImage(picture, 0, 0, canvas.width, canvas.height);
  
          canvas.toBlob(function (blob) {
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.style.display = 'block';
          });
        });
      });
    });

    filterOptions.forEach(function (option){
      option.addEventListener('focus', () => {
        setInterval(() => {
          if(option.checked === true){
            const parent = option.parentElement
            parent.style.color = "#eac100"
          } else {
            const parent = option.parentElement
            parent.style.color = "white"
          }
        }, 10)
      })
    })
  
    function getSelectedFilter() {
      const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
  
      if (selectedFilter === 'border') {
        return 'url(#borderFilter)';
      } else if (selectedFilter === 'shadow') {
        return 'url(#shadowFilter)';
      } else if (selectedFilter === 'grayscale') {
        return 'grayscale(100%)';
      } else if (selectedFilter === 'sepia') {
        return 'sepia(100%)';
      } else if (selectedFilter === 'invert') {
        return 'invert(100%)';
      } else {
        return 'none';
      }
    }
  });
  
