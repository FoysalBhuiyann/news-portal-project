let newsData = [];

const loadNews = (search = "01") => {
  const url = `https://openapi.programming-hero.com/api/news/category/01`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status) {
        newsData = data.data;
        createElemFromData();
      }
    });
};

const createElemFromData = () => {
  const newsContainer = document.getElementById("news-container");

  newsData.forEach((elem, index) => {
    const element = `
        <div class="card mb-3" onclick="showModal(${index})"" id="${elem.id}" style="max-width: 1140px;">
            <div class="row g-0" id="${elem.category_id}">

                <div class="col-sm-3 col-lg-3 col-xl-3 d-flex justify-content-center">
                    <img src="${elem.thumbnail_url}" class="img-fluid rounded-start" alt="..." style="max-width: 100%;max-height: 100%;">
                </div>

                <div class="col-sm-9 col-lg-9 col-xl-9">
                    <div class="card-body">
                        <h5 class="card-title fs-3 fw-bold">${elem.title}</h5>
                        <p class="card-text fs-6 fw-semibold pt-2">${elem.details}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago <span
                                    class="ps-5">
                                    View:${elem.total_view}</span> </small></p>
                    </div>
                </div>

            </div>
        </div>
        
        `;

    $("#news-container").append(element);
    // newsContainer.appendChild(element);
  });
};

const showModal = (id) => {
  console.log(id);
  const modalData = newsData[id];

  console.log(modalData);

  $("#newsModal").empty();

  const element = `
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="newsModalLabel">${modalData.title}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  ${modalData.details}
              </div>
              <div class="modal-body">
                  ${modalData.author.name}
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
              </div>
          </div>
      </div>
      `;

  $("#newsModal").append(element);

  const newsModal = new bootstrap.Modal(
    document.getElementById("newsModal"),
    // options
  );

  newsModal.show();

};

loadNews();
